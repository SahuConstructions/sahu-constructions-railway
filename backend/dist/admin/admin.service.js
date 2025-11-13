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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AdminService = class AdminService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getSystemOverview() {
        const [employees, leaves, timesheets, reimbursements, payrolls] = await Promise.all([
            this.prisma.employee.count(),
            this.prisma.leave.count(),
            this.prisma.timesheet.count(),
            this.prisma.reimbursement.count(),
            this.prisma.payroll.count(),
        ]);
        return {
            totalEmployees: employees,
            totalLeaves: leaves,
            totalTimesheets: timesheets,
            totalReimbursements: reimbursements,
            totalPayrolls: payrolls,
        };
    }
    async getRecentActivity() {
        const activities = await Promise.all([
            this.prisma.leave.findMany({
                take: 5,
                orderBy: { createdAt: 'desc' },
                include: { employee: true },
            }),
            this.prisma.timesheet.findMany({
                take: 5,
                orderBy: { createdAt: 'desc' },
                include: { employee: true },
            }),
            this.prisma.reimbursement.findMany({
                take: 5,
                orderBy: { createdAt: 'desc' },
                include: { employee: true },
            }),
        ]);
        return {
            recentLeaves: activities[0],
            recentTimesheets: activities[1],
            recentReimbursements: activities[2],
        };
    }
    async getAdminSummary() {
        const leavesByStatus = await this.prisma.leave.groupBy({
            by: ['status'],
            _count: { status: true },
        });
        const reimbursementsByStatus = await this.prisma.reimbursement.groupBy({
            by: ['status'],
            _count: { status: true },
        });
        const timesheetsByStatus = await this.prisma.timesheet.groupBy({
            by: ['status'],
            _count: { status: true },
        });
        return {
            leaves: leavesByStatus,
            reimbursements: reimbursementsByStatus,
            timesheets: timesheetsByStatus,
        };
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminService);
//# sourceMappingURL=admin.service.js.map