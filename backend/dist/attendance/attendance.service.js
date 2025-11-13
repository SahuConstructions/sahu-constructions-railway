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
exports.AttendanceService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const attendance_gateway_1 = require("./attendance.gateway");
const upload_service_1 = require("../uploads/upload.service");
const node_fetch_1 = require("node-fetch");
let AttendanceService = class AttendanceService {
    constructor(prisma, gateway, uploadService) {
        this.prisma = prisma;
        this.gateway = gateway;
        this.uploadService = uploadService;
    }
    async reverseGeocodeIfNeeded(location) {
        if (!location)
            return 'Unknown location';
        if (/[A-Za-z]/.test(location))
            return location;
        try {
            const [lat, lon] = location.split(',').map((n) => parseFloat(n.trim()));
            if (isNaN(lat) || isNaN(lon))
                return location;
            const res = await (0, node_fetch_1.default)(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`, { headers: { 'User-Agent': 'Sahu-Construction-App/1.0' } });
            const data = (await res.json());
            if (data.display_name) {
                return data.display_name;
            }
            return `${lat}, ${lon}`;
        }
        catch (err) {
            console.error('❌ Reverse geocoding failed:', err);
            return location;
        }
    }
    shortenAddress(address) {
        if (!address)
            return 'Unknown location';
        const parts = address.split(',').map(p => p.trim());
        return parts.slice(0, 4).join(', ');
    }
    async create(userId, dto) {
        const employee = await this.prisma.employee.findUnique({ where: { userId } });
        if (!employee)
            throw new Error('Employee not found');
        let selfieUrl = dto.selfieUrl || null;
        if (dto.selfieFilePath) {
            try {
                const uploaded = await this.uploadService.uploadToCloudinary(dto.selfieFilePath, 'attendance_selfies');
                selfieUrl = uploaded.secure_url;
            }
            catch (err) {
                console.error('❌ Cloudinary upload failed:', err);
            }
        }
        const fullLocation = await this.reverseGeocodeIfNeeded(dto.location);
        const readableLocation = this.shortenAddress(fullLocation);
        const saved = await this.prisma.attendance.create({
            data: {
                employeeId: employee.id,
                type: dto.type,
                timestamp: new Date(dto.timestamp),
                location: readableLocation,
                deviceId: dto.deviceId,
                selfieUrl,
            },
        });
        this.gateway.sendNewPunch({
            ...saved,
            employee: { id: employee.id, name: employee.name },
        });
        return saved;
    }
    async getSummary() {
        const total = await this.prisma.attendance.count();
        const byType = await this.prisma.attendance.groupBy({
            by: ['type'],
            _count: { _all: true },
        });
        const byEmployee = await this.prisma.attendance.groupBy({
            by: ['employeeId'],
            _count: { _all: true },
        });
        const employees = await this.prisma.employee.findMany({
            select: { id: true, name: true, user: { select: { email: true } } },
        });
        const empMap = Object.fromEntries(employees.map((e) => [e.id, { name: e.name, email: e.user.email }]));
        return {
            total,
            byType: byType.map((t) => ({ type: t.type, count: t._count._all })),
            byEmployee: byEmployee.map((b) => ({
                employeeId: b.employeeId,
                count: b._count._all,
                ...empMap[b.employeeId],
            })),
        };
    }
    async getMonthlySummary(year) {
        const records = await this.prisma.attendance.findMany({
            where: {
                timestamp: {
                    gte: new Date(`${year}-01-01`),
                    lt: new Date(`${year + 1}-01-01`),
                },
            },
            include: {
                employee: { select: { id: true, name: true, user: { select: { email: true } } } },
            },
            orderBy: { timestamp: 'asc' },
        });
        const summary = {};
        for (const r of records) {
            const month = r.timestamp.toISOString().substring(0, 7);
            const key = `${r.employeeId}-${month}`;
            if (!summary[key]) {
                summary[key] = {
                    employeeId: r.employeeId,
                    name: r.employee.name,
                    email: r.employee.user.email,
                    month,
                    inCount: 0,
                    outCount: 0,
                    total: 0,
                };
            }
            if (r.type === 'IN')
                summary[key].inCount += 1;
            if (r.type === 'OUT')
                summary[key].outCount += 1;
            summary[key].total += 1;
        }
        return Object.values(summary);
    }
    async getDailySummary(year, month) {
        const monthStr = month.toString().padStart(2, '0');
        const startDate = new Date(`${year}-${monthStr}-01`);
        const endDate = new Date(`${year}-${monthStr}-31`);
        const records = await this.prisma.attendance.findMany({
            where: {
                timestamp: { gte: startDate, lt: endDate },
            },
            include: {
                employee: { select: { id: true, name: true, user: { select: { email: true } } } },
            },
            orderBy: { timestamp: 'asc' },
        });
        const summary = {};
        for (const r of records) {
            const date = r.timestamp.toISOString().substring(0, 10);
            const key = `${r.employeeId}-${date}`;
            if (!summary[key]) {
                summary[key] = {
                    employeeId: r.employeeId,
                    name: r.employee.name,
                    email: r.employee.user.email,
                    date,
                    inCount: 0,
                    outCount: 0,
                    total: 0,
                };
            }
            if (r.type === 'IN')
                summary[key].inCount += 1;
            if (r.type === 'OUT')
                summary[key].outCount += 1;
            summary[key].total += 1;
        }
        return Object.values(summary);
    }
    async getEmployeeSummary(year, month) {
        const monthStr = month.toString().padStart(2, '0');
        const startDate = new Date(`${year}-${monthStr}-01`);
        const endDate = new Date(`${year}-${monthStr}-31`);
        const employees = await this.prisma.employee.findMany({
            include: { user: true },
        });
        const leaves = await this.prisma.leave.findMany({
            where: { startDate: { gte: startDate, lt: endDate } },
        });
        const attendance = await this.prisma.attendance.findMany({
            where: { timestamp: { gte: startDate, lt: endDate } },
        });
        const daysInMonth = new Date(year, month, 0).getDate();
        return employees.map((emp) => {
            const empAttendance = attendance.filter((a) => a.employeeId === emp.id);
            const empLeaves = leaves.filter((l) => l.employeeId === emp.id);
            const leaveDays = empLeaves.reduce((sum, l) => sum + l.days, 0);
            const weeklyOffs = Math.floor(daysInMonth / 7);
            const daysWorked = new Set(empAttendance.map((a) => a.timestamp.toISOString().substring(0, 10))).size;
            return {
                employeeId: emp.id,
                name: emp.name,
                email: emp.user.email,
                daysWorked,
                leaveDays,
                weeklyOffs,
                totalWorkingDays: daysInMonth - leaveDays - weeklyOffs,
            };
        });
    }
    async getEmployeeDetail(employeeId, year, month) {
        const start = new Date(year, month - 1, 1);
        const end = new Date(year, month, 0, 23, 59, 59, 999);
        const attendance = await this.prisma.attendance.findMany({
            where: { employeeId, timestamp: { gte: start, lte: end } },
            orderBy: { timestamp: 'asc' },
        });
        const days = {};
        attendance.forEach((a) => {
            const date = a.timestamp.toISOString().substring(0, 10);
            if (!days[date])
                days[date] = { in: null, out: null };
            if (a.type === 'IN' && !days[date].in)
                days[date].in = a;
            if (a.type === 'OUT')
                days[date].out = a;
        });
        return Object.entries(days).map(([date, record]) => {
            let hours = 0;
            if (record.in?.timestamp && record.out?.timestamp) {
                hours =
                    (record.out.timestamp.getTime() - record.in.timestamp.getTime()) /
                        (1000 * 60 * 60);
            }
            return {
                date,
                inTime: record.in?.timestamp || null,
                inLocation: record.in?.location || null,
                inSelfie: record.in?.selfieUrl || null,
                outTime: record.out?.timestamp || null,
                outLocation: record.out?.location || null,
                outSelfie: record.out?.selfieUrl || null,
                hours: Number(hours.toFixed(2)),
            };
        });
    }
    async findByEmployee(userId) {
        const employee = await this.prisma.employee.findUnique({ where: { userId } });
        if (!employee)
            throw new Error('Employee not found');
        return this.prisma.attendance.findMany({
            where: { employeeId: employee.id },
            orderBy: { timestamp: 'desc' },
            select: {
                id: true,
                type: true,
                timestamp: true,
                location: true,
                selfieUrl: true,
            },
        });
    }
    async getManagerAttendanceView(userId, date) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: { employee: true },
        });
        if (!user?.employee) {
            throw new Error("Manager is not linked to an employee record.");
        }
        const managerId = user.employee.id;
        const targetDate = date ? new Date(date) : new Date();
        const startOfDay = new Date(targetDate);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(targetDate);
        endOfDay.setHours(23, 59, 59, 999);
        const employees = await this.prisma.employee.findMany({
            where: { managerId },
            include: {
                attendances: {
                    where: { timestamp: { gte: startOfDay, lte: endOfDay } },
                    orderBy: { timestamp: 'asc' },
                },
            },
        });
        const summary = { present: 0, late: 0, absent: 0 };
        const data = employees.map((emp) => {
            const records = emp.attendances;
            let status = 'Absent';
            let inTime = null;
            let outTime = null;
            let inSelfie = null;
            let outSelfie = null;
            let hours = null;
            if (records.length > 0) {
                const first = records[0];
                const last = records[records.length - 1];
                inTime = new Date(first.timestamp);
                outTime = records.length > 1 ? new Date(last.timestamp) : null;
                inSelfie = first.selfieUrl || null;
                outSelfie = last.selfieUrl || null;
                let thresholdHour = 10;
                let thresholdMinute = 0;
                if (emp.inTime && typeof emp.inTime === 'string') {
                    const [hh, mm] = emp.inTime.split(':').map((n) => parseInt(n, 10));
                    if (!isNaN(hh))
                        thresholdHour = hh;
                    if (!isNaN(mm))
                        thresholdMinute = mm;
                }
                const checkInMinutes = inTime.getHours() * 60 + inTime.getMinutes();
                const thresholdMinutes = thresholdHour * 60 + thresholdMinute;
                if (checkInMinutes > thresholdMinutes) {
                    status = 'Late';
                    summary.late++;
                }
                else {
                    status = 'Present';
                }
                summary.present++;
                if (inTime && outTime) {
                    const diffMs = outTime.getTime() - inTime.getTime();
                    hours = (diffMs / (1000 * 60 * 60)).toFixed(2);
                }
            }
            else {
                summary.absent++;
            }
            return {
                employeeId: emp.id,
                employeeName: emp.name,
                status,
                inTime,
                outTime,
                hours,
                inSelfie,
                outSelfie,
                location: records[0]?.location || '-',
            };
        });
        return { summary, data };
    }
    async getHRAttendanceView(date) {
        const targetDate = date ? new Date(date) : new Date();
        const startOfDay = new Date(targetDate);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(targetDate);
        endOfDay.setHours(23, 59, 59, 999);
        const employees = await this.prisma.employee.findMany({
            include: {
                attendances: {
                    where: { timestamp: { gte: startOfDay, lte: endOfDay } },
                    orderBy: { timestamp: 'asc' },
                },
            },
        });
        const summary = { present: 0, late: 0, absent: 0 };
        const data = employees.map((emp) => {
            const records = emp.attendances;
            let status = 'Absent';
            let inTime = null;
            let outTime = null;
            let inSelfie = null;
            let outSelfie = null;
            let hours = null;
            if (records.length > 0) {
                const first = records[0];
                const last = records[records.length - 1];
                inTime = new Date(first.timestamp);
                outTime = records.length > 1 ? new Date(last.timestamp) : null;
                inSelfie = first.selfieUrl || null;
                outSelfie = last.selfieUrl || null;
                let thresholdHour = 10;
                let thresholdMinute = 0;
                if (emp.inTime && typeof emp.inTime === 'string') {
                    const [hh, mm] = emp.inTime.split(':').map((n) => parseInt(n, 10));
                    if (!isNaN(hh))
                        thresholdHour = hh;
                    if (!isNaN(mm))
                        thresholdMinute = mm;
                }
                const checkInMinutes = inTime.getHours() * 60 + inTime.getMinutes();
                const thresholdMinutes = thresholdHour * 60 + thresholdMinute;
                if (checkInMinutes > thresholdMinutes) {
                    status = 'Late';
                    summary.late++;
                }
                else {
                    status = 'Present';
                }
                summary.present++;
                if (inTime && outTime) {
                    const diffMs = outTime.getTime() - inTime.getTime();
                    hours = (diffMs / (1000 * 60 * 60)).toFixed(2);
                }
            }
            else {
                summary.absent++;
            }
            return {
                employeeId: emp.id,
                employeeName: emp.name,
                status,
                inTime,
                outTime,
                hours,
                inSelfie,
                outSelfie,
                location: records[0]?.location || '-',
            };
        });
        return { summary, data };
    }
};
exports.AttendanceService = AttendanceService;
exports.AttendanceService = AttendanceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        attendance_gateway_1.AttendanceGateway,
        upload_service_1.UploadService])
], AttendanceService);
//# sourceMappingURL=attendance.service.js.map