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
exports.ReimbursementsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let ReimbursementsService = class ReimbursementsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, dto) {
        const employee = await this.prisma.employee.findUnique({
            where: { userId },
        });
        if (!employee)
            throw new common_1.NotFoundException('Employee not found');
        return this.prisma.reimbursement.create({
            data: {
                employeeId: employee.id,
                amount: dto.amount,
                description: dto.description,
                receiptUrl: dto.receiptUrl,
                status: 'PENDING_MANAGER',
            },
        });
    }
    async getMyReimbursements(userId) {
        const employee = await this.prisma.employee.findUnique({
            where: { userId },
        });
        if (!employee)
            throw new common_1.NotFoundException(`Employee not found for userId ${userId}`);
        return this.prisma.reimbursement.findMany({
            where: { employeeId: employee.id },
            orderBy: { createdAt: 'desc' },
            include: { actions: { include: { user: true } } },
        });
    }
    async listAll(user) {
        const where = {};
        if (user?.role === 'MANAGER')
            where.status = 'PENDING_MANAGER';
        else if (user?.role === 'HR')
            where.status = 'PENDING_HR';
        else if (user?.role === 'FINANCE')
            where.status = 'PENDING_FINANCE';
        return this.prisma.reimbursement.findMany({
            where,
            include: {
                employee: true,
                resolvedBy: true,
                actions: { include: { user: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async resolve(id, userId, status, notes) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: { role: true },
        });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        const reimbursement = await this.prisma.reimbursement.findUnique({ where: { id } });
        if (!reimbursement)
            throw new common_1.NotFoundException('Reimbursement not found');
        const { role } = user;
        const current = reimbursement.status;
        let newStatus = current;
        if (status === 'REJECTED') {
            newStatus = 'REJECTED';
        }
        else {
            switch (role) {
                case client_1.Role.MANAGER:
                    if (current !== 'PENDING_MANAGER')
                        throw new common_1.ForbiddenException('Only pending manager items can be approved by a manager');
                    newStatus = 'PENDING_HR';
                    break;
                case client_1.Role.HR:
                    if (current !== 'PENDING_HR')
                        throw new common_1.ForbiddenException('Only pending HR items can be approved by HR');
                    newStatus = 'PENDING_FINANCE';
                    break;
                case client_1.Role.FINANCE:
                    if (current !== 'PENDING_FINANCE')
                        throw new common_1.ForbiddenException('Only pending finance items can be approved by finance');
                    newStatus = 'APPROVED';
                    break;
                default:
                    throw new common_1.ForbiddenException('User not authorized to approve reimbursements');
            }
        }
        const updated = await this.prisma.reimbursement.update({
            where: { id },
            data: {
                status: newStatus,
                resolvedById: userId,
                resolvedAt: new Date(),
                notes,
            },
        });
        await this.prisma.reimbursementAction.create({
            data: {
                reimbursementId: id,
                userId,
                action: status === 'APPROVED'
                    ? `Approved (${role})`
                    : `Rejected (${role})`,
                notes,
            },
        });
        return updated;
    }
    async getHistory(id) {
        return this.prisma.reimbursementAction.findMany({
            where: { reimbursementId: id },
            include: { user: true },
            orderBy: { createdAt: 'desc' },
        });
    }
    async getById(id) {
        return this.prisma.reimbursement.findUnique({ where: { id } });
    }
};
exports.ReimbursementsService = ReimbursementsService;
exports.ReimbursementsService = ReimbursementsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ReimbursementsService);
//# sourceMappingURL=reimbursements.service.js.map