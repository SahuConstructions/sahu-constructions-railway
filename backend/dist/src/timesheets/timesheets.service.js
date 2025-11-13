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
exports.TimesheetsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let TimesheetsService = class TimesheetsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, data) {
        const employee = await this.prisma.employee.findUnique({ where: { userId } });
        if (!employee)
            throw new Error("Employee not found");
        const startOfDay = new Date(data.date);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(data.date);
        endOfDay.setHours(23, 59, 59, 999);
        const attendance = await this.prisma.attendance.findMany({
            where: {
                employeeId: employee.id,
                timestamp: { gte: startOfDay, lte: endOfDay },
            },
            orderBy: { timestamp: "asc" },
        });
        let autoHours = 0;
        if (attendance.length >= 2) {
            const firstIn = attendance.find((a) => a.type === "IN") || attendance[0];
            const lastOut = attendance.reverse().find((a) => a.type === "OUT") || attendance[attendance.length - 1];
            autoHours =
                (new Date(lastOut.timestamp).getTime() -
                    new Date(firstIn.timestamp).getTime()) /
                    (1000 * 60 * 60);
            autoHours = Math.max(0, Number(autoHours.toFixed(2)));
        }
        const finalHours = autoHours > 0 ? autoHours : data.hours ?? 0;
        return this.prisma.timesheet.create({
            data: {
                employeeId: employee.id,
                project: data.project,
                task: data.task,
                hours: finalHours,
                date: data.date,
                status: "PendingManager",
            },
        });
    }
    async getMyTimesheets(userId) {
        const employee = await this.prisma.employee.findUnique({ where: { userId } });
        if (!employee)
            throw new Error("Employee not found");
        return this.prisma.timesheet.findMany({
            where: { employeeId: employee.id },
            orderBy: { date: "desc" },
        });
    }
    async getAllTimesheets() {
        return this.prisma.timesheet.findMany({
            include: {
                employee: { select: { id: true, name: true, user: { select: { email: true } } } },
            },
            orderBy: { date: "desc" },
        });
    }
    async getMonthlySummary(year, month) {
        const start = new Date(year, month - 1, 1);
        const end = new Date(year, month, 0, 23, 59, 59, 999);
        const employees = await this.prisma.employee.findMany({
            include: { user: { select: { email: true } } },
        });
        const attendance = await this.prisma.attendance.findMany({
            where: { timestamp: { gte: start, lte: end } },
        });
        const leaves = await this.prisma.leave.findMany({
            where: {
                startDate: { gte: start, lte: end },
                status: { in: ["Approved", "ApprovedByHR", "ApprovedByManager", "ApprovedByAdmin"] },
            },
        });
        const daysInMonth = new Date(year, month, 0).getDate();
        const summary = employees.map((emp) => {
            const empAttendance = attendance.filter((a) => a.employeeId === emp.id);
            const dates = Array.from(new Set(empAttendance.map((a) => a.timestamp.toISOString().substring(0, 10))));
            let totalHours = 0;
            for (const date of dates) {
                const records = empAttendance.filter((a) => a.timestamp.toISOString().startsWith(date));
                if (records.length >= 2) {
                    const firstIn = records.find((r) => r.type === "IN") || records[0];
                    const lastOut = [...records].reverse().find((r) => r.type === "OUT") || records[records.length - 1];
                    const diff = (lastOut.timestamp.getTime() - firstIn.timestamp.getTime()) / (1000 * 60 * 60);
                    totalHours += diff > 0 ? diff : 0;
                }
            }
            const leaveDays = leaves
                .filter((l) => l.employeeId === emp.id)
                .reduce((sum, l) => sum + l.days, 0);
            return {
                employeeId: emp.id,
                name: emp.name,
                email: emp.user.email,
                daysWorked: dates.length,
                totalHours: Number(totalHours.toFixed(2)),
                leaveDays,
                totalWorkingDays: daysInMonth,
                absentDays: Math.max(daysInMonth - dates.length - leaveDays, 0),
            };
        });
        return summary;
    }
    async takeAction(user, id, action, comments) {
        const ts = await this.prisma.timesheet.findUnique({ where: { id } });
        if (!ts)
            throw new common_1.NotFoundException("Timesheet not found");
        let newStatus = ts.status;
        if (user.role === "MANAGER") {
            if (ts.status !== "PendingManager")
                throw new common_1.ForbiddenException("Already reviewed by manager");
            newStatus = action === "approve" ? "PendingHR" : "RejectedByManager";
        }
        else if (user.role === "HR") {
            if (ts.status !== "PendingHR")
                throw new common_1.ForbiddenException("Already processed by HR");
            newStatus = action === "approve" ? "Approved" : "RejectedByHR";
        }
        else if (user.role === "ADMIN") {
            newStatus = action === "override" ? "Overridden" : ts.status;
        }
        return this.prisma.timesheet.update({
            where: { id },
            data: {
                status: newStatus,
                comments,
                reviewedById: user.userId,
            },
        });
    }
    async getDailyHours(userId, date) {
        const employee = await this.prisma.employee.findUnique({ where: { userId } });
        if (!employee)
            throw new common_1.NotFoundException("Employee not found");
        const startOfDay = new Date(`${date}T00:00:00.000Z`);
        const endOfDay = new Date(`${date}T23:59:59.999Z`);
        const records = await this.prisma.attendance.findMany({
            where: {
                employeeId: employee.id,
                timestamp: { gte: startOfDay, lte: endOfDay },
            },
            orderBy: { timestamp: "asc" },
        });
        if (records.length === 0)
            return { hours: 0 };
        const firstIn = records.find((r) => r.type === "IN") || records[0];
        const lastOut = [...records].reverse().find((r) => r.type === "OUT") ||
            records[records.length - 1];
        if (!firstIn || !lastOut)
            return { hours: 0 };
        const diff = (lastOut.timestamp.getTime() - firstIn.timestamp.getTime()) /
            (1000 * 60 * 60);
        const hours = Math.max(0, Number(diff.toFixed(2)));
        return { hours };
    }
};
exports.TimesheetsService = TimesheetsService;
exports.TimesheetsService = TimesheetsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TimesheetsService);
//# sourceMappingURL=timesheets.service.js.map