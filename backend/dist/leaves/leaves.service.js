"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeavesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const dayjs = require("dayjs");
let LeavesService = class LeavesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async myLeaves(userId) {
        const employee = await this.prisma.employee.findUnique({
            where: { userId },
        });
        if (!employee)
            throw new common_1.ForbiddenException('Employee not found');
        return this.prisma.leave.findMany({
            where: { employeeId: employee.id },
            include: { actions: { include: { user: true } } },
            orderBy: { createdAt: 'desc' },
        });
    }
    async pending(user) {
        if (user.role === 'MANAGER') {
            const managerEmp = await this.prisma.employee.findUnique({
                where: { userId: user.userId },
            });
            return this.prisma.leave.findMany({
                where: { employee: { managerId: managerEmp?.id } },
                include: { actions: { include: { user: true } }, employee: true },
                orderBy: { createdAt: 'desc' },
            });
        }
        if (user.role === 'HR') {
            return this.prisma.leave.findMany({
                where: { status: 'PendingHR' },
                include: { actions: { include: { user: true } }, employee: true },
                orderBy: { createdAt: 'desc' },
            });
        }
        if (user.role === 'ADMIN') {
            return this.prisma.leave.findMany({
                include: { actions: { include: { user: true } }, employee: true },
                orderBy: { createdAt: 'desc' },
            });
        }
        return [];
    }
    async action(user, leaveId, dto) {
        const leave = await this.prisma.leave.findUnique({
            where: { id: leaveId },
        });
        if (!leave)
            throw new common_1.NotFoundException('Leave not found');
        let newStatus = null;
        let auditAction = null;
        if (user.role === 'MANAGER' && leave.status === 'PendingManager') {
            newStatus =
                dto.action === 'approve' ? 'PendingHR' : 'RejectedByManager';
            auditAction = dto.action === 'approve' ? 'APPROVED_BY_MANAGER' : 'REJECTED_BY_MANAGER';
        }
        if (user.role === 'HR' && leave.status === 'PendingHR') {
            newStatus =
                dto.action === 'approve' ? 'Approved' : 'RejectedByHR';
            auditAction = dto.action === 'approve' ? 'APPROVED_BY_HR' : 'REJECTED_BY_HR';
        }
        if (user.role === 'ADMIN') {
            newStatus = dto.action === 'approve' ? 'Approved' : 'RejectedByAdmin';
            auditAction = dto.action === 'approve' ? 'APPROVED_BY_ADMIN' : 'REJECTED_BY_ADMIN';
        }
        if (!newStatus || !auditAction) {
            throw new common_1.ForbiddenException('You cannot act on this leave');
        }
        const updated = await this.prisma.leave.update({
            where: { id: leaveId },
            data: {
                status: newStatus,
                ...(user.role === 'MANAGER' ? { managerId: user.userId } : {}),
                ...(user.role === 'HR' ? { hrId: user.userId } : {}),
            },
        });
        await this.prisma.leaveAction.create({
            data: {
                leaveId,
                userId: user.userId,
                role: user.role,
                action: auditAction,
                comments: dto.comments,
            },
        });
        return updated;
    }
    async getSummary() {
        const total = await this.prisma.leave.count();
        const byStatus = await this.prisma.leave.groupBy({
            by: ['status'],
            _count: { _all: true },
        });
        const byType = await this.prisma.leave.groupBy({
            by: ['type'],
            _count: { _all: true },
        });
        return {
            total,
            byStatus: byStatus.map((s) => ({ status: s.status, count: s._count._all })),
            byType: byType.map((t) => ({ type: t.type, count: t._count._all })),
        };
    }
    async getAudit(leaveId) {
        return this.prisma.leaveAction.findMany({
            where: { leaveId },
            include: { user: true },
            orderBy: { createdAt: 'asc' },
        });
    }
    async calculateEntitlement(employeeId) {
        const employee = await this.prisma.employee.findUnique({
            where: { id: employeeId },
        });
        if (!employee)
            throw new common_1.NotFoundException("Employee not found");
        const joinDate = dayjs(employee.joinDate);
        const months = dayjs().diff(joinDate, "month");
        if (!employee.confirmed && months < 6) {
            return { annual: 12, sick: 5, other: 0 };
        }
        else {
            return { annual: 24, sick: 5, other: 16 };
        }
    }
    async getLeaveBalance(employeeId) {
        const employee = await this.prisma.employee.findUnique({
            where: { id: employeeId },
        });
        if (!employee)
            throw new common_1.NotFoundException("Employee not found");
        const joinDate = new Date(employee.joinDate);
        const months = (new Date().getTime() - joinDate.getTime()) / (1000 * 60 * 60 * 24 * 30);
        const isConfirmed = employee.confirmed || months >= 6;
        const entitlement = isConfirmed
            ? { annual: 24, sick: 5, other: 16 }
            : { annual: 12, sick: 5, other: 0 };
        const leaves = await this.prisma.leave.findMany({
            where: {
                employeeId,
                status: { in: ["Approved", "ApprovedByHR", "ApprovedByManager", "ApprovedByAdmin"] },
            },
            select: { type: true, days: true },
        });
        const used = { annual: 0, sick: 0, other: 0 };
        for (const l of leaves) {
            const t = l.type.toLowerCase();
            if (t.includes("annual"))
                used.annual += l.days;
            else if (t.includes("sick"))
                used.sick += l.days;
            else
                used.other += l.days;
        }
        const remaining = {
            annual: Math.max(entitlement.annual - used.annual, 0),
            sick: Math.max(entitlement.sick - used.sick, 0),
            other: Math.max(entitlement.other - used.other, 0),
        };
        return {
            entitlement,
            used,
            remaining,
            confirmed: isConfirmed,
        };
    }
    async getEmployeeByUserId(userId) {
        const emp = await this.prisma.employee.findUnique({ where: { userId } });
        if (!emp)
            throw new common_1.NotFoundException("Employee not found");
        return emp;
    }
    async getManagerTeamBalances(userId) {
        const manager = await this.prisma.employee.findUnique({
            where: { userId },
            include: { subordinates: true },
        });
        if (!manager)
            throw new common_1.NotFoundException("Manager not found");
        const balances = [];
        for (const emp of manager.subordinates) {
            const balance = await this.getLeaveBalance(emp.id);
            balances.push({
                employeeId: emp.id,
                name: emp.name,
                ...balance,
            });
        }
        return balances;
    }
    async getAllLeaveBalances() {
        const employees = await this.prisma.employee.findMany();
        const balances = [];
        for (const emp of employees) {
            const balance = await this.getLeaveBalance(emp.id);
            balances.push({
                employeeId: emp.id,
                name: emp.name,
                confirmed: emp.confirmed,
                ...balance,
            });
        }
        return balances;
    }
    async apply(userId, dto) {
        const employee = await this.prisma.employee.findUnique({ where: { userId } });
        if (!employee)
            throw new common_1.ForbiddenException("Employee not found");
        const start = new Date(dto.startDate);
        const end = new Date(dto.endDate);
        const days = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
        if (days <= 0)
            throw new common_1.ForbiddenException("Invalid date range");
        const balance = await this.getLeaveBalance(employee.id);
        const type = dto.type.toLowerCase();
        let remaining = 0;
        if (type.includes("annual"))
            remaining = balance.remaining.annual;
        else if (type.includes("sick"))
            remaining = balance.remaining.sick;
        else
            remaining = balance.remaining.other;
        if (remaining < days) {
            throw new common_1.ForbiddenException(`❌ Not enough ${dto.type} balance (Available: ${remaining})`);
        }
        const leave = await this.prisma.leave.create({
            data: {
                employeeId: employee.id,
                type: dto.type,
                startDate: start,
                endDate: end,
                days,
                status: "PendingManager",
            },
        });
        await this.prisma.leaveAction.create({
            data: {
                leaveId: leave.id,
                userId,
                role: "EMPLOYEE",
                action: "APPLY",
                comments: dto.reason,
            },
        });
        return leave;
    }
};
exports.LeavesService = LeavesService;
exports.LeavesService = LeavesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LeavesService);
//# sourceMappingURL=leaves.service.js.map