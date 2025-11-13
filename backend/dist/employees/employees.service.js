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
exports.EmployeesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = require("bcrypt");
let EmployeesService = class EmployeesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        return this.prisma.employee.findMany({
            include: { user: true },
        });
    }
    async findOne(id) {
        return this.prisma.employee.findUnique({
            where: { id },
            include: { user: true },
        });
    }
    async createEmployee(dto) {
        const allowedRoles = ['USER', 'MANAGER', 'HR', 'ADMIN'];
        const requestedRole = dto.role ? dto.role.toUpperCase() : 'USER';
        if (!allowedRoles.includes(requestedRole)) {
            throw new common_1.BadRequestException(`Invalid role. Allowed values: ${allowedRoles.join(', ')}`);
        }
        const existingUser = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });
        if (existingUser) {
            throw new common_1.BadRequestException('Email already exists. Please use a unique email.');
        }
        const tempPasswordPlain = 'SC@' + Math.floor(1000 + Math.random() * 9000);
        const hashedTemp = await bcrypt.hash(tempPasswordPlain, 10);
        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                password: hashedTemp,
                tempPassword: hashedTemp,
                role: requestedRole,
            },
        });
        const employee = await this.prisma.employee.create({
            data: {
                userId: user.id,
                name: dto.name,
                phone: dto.phone,
                managerId: dto.managerId || null,
                basicSalary: dto.basicSalary || 0,
                hra: dto.hra || 0,
                otherAllowance: dto.otherAllowance || 0,
                pf: dto.pf || 0,
                pt: dto.pt || 0,
                designation: dto.designation || null,
                department: dto.department || null,
                location: dto.location || null,
                dob: dto.dob ? new Date(dto.dob) : null,
                pfNumber: dto.pfNumber || null,
                uan: dto.uan || null,
                joinDate: dto.joinDate ? new Date(dto.joinDate) : undefined,
                inTime: dto.inTime || null,
                outTime: dto.outTime || null,
            },
        });
        return {
            ok: true,
            message: '✅ Employee created successfully',
            employee,
            credentials: {
                email: user.email,
                tempPassword: tempPasswordPlain,
            },
        };
    }
    async updateEmployee(id, dto) {
        return this.prisma.employee.update({
            where: { id },
            data: dto,
        });
    }
    async removeEmployee(id) {
        const employee = await this.prisma.employee.findUnique({
            where: { id },
            include: { user: true },
        });
        if (!employee) {
            throw new common_1.BadRequestException('Employee not found');
        }
        await this.prisma.$transaction([
            this.prisma.attendance.deleteMany({
                where: { employeeId: id },
            }),
            this.prisma.leave.deleteMany({
                where: { employeeId: id },
            }),
            this.prisma.timesheet.deleteMany({
                where: { employeeId: id },
            }),
            this.prisma.employeeSalary.deleteMany({
                where: { employeeId: id },
            }),
            this.prisma.reimbursement.deleteMany({
                where: { employeeId: id },
            }),
            this.prisma.payrollLineItem.deleteMany({
                where: { employeeId: id },
            }),
            this.prisma.employee.delete({
                where: { id },
            }),
            this.prisma.user.delete({
                where: { id: employee.userId },
            }),
        ]);
        return {
            ok: true,
            message: '✅ Employee and all related records deleted successfully',
        };
    }
    async resetEmployeePassword(employeeId) {
        const employee = await this.prisma.employee.findUnique({
            where: { id: employeeId },
            include: { user: true },
        });
        if (!employee)
            throw new common_1.BadRequestException('Employee not found');
        const tempPasswordPlain = 'SC@' + Math.floor(1000 + Math.random() * 9000);
        const hashedTemp = await bcrypt.hash(tempPasswordPlain, 10);
        await this.prisma.user.update({
            where: { id: employee.userId },
            data: {
                password: hashedTemp,
                tempPassword: hashedTemp,
            },
        });
        return {
            ok: true,
            message: 'Temporary password generated successfully.',
            employee: employee.name,
            email: employee.user.email,
            tempPassword: tempPasswordPlain,
        };
    }
};
exports.EmployeesService = EmployeesService;
exports.EmployeesService = EmployeesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EmployeesService);
//# sourceMappingURL=employees.service.js.map