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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const attendance_service_1 = require("./attendance.service");
const create_attendance_dto_1 = require("./dto/create-attendance.dto");
const platform_express_1 = require("@nestjs/platform-express");
const roles_decorator_1 = require("../auth/roles.decorator");
const multer_1 = require("multer");
const path_1 = require("path");
let AttendanceController = class AttendanceController {
    constructor(attendanceService) {
        this.attendanceService = attendanceService;
    }
    async punch(req, file, dto) {
        const userId = req.user.userId;
        const record = await this.attendanceService.create(userId, {
            ...dto,
            selfieFilePath: file?.path,
        });
        return {
            ok: true,
            record,
        };
    }
    async getMyAttendance(req) {
        const userId = req.user.userId;
        const records = await this.attendanceService.findByEmployee(userId);
        return { ok: true, records };
    }
    async summary() {
        return this.attendanceService.getSummary();
    }
    async monthly(year) {
        return this.attendanceService.getMonthlySummary(year);
    }
    async daily(year, month) {
        return this.attendanceService.getDailySummary(year, month);
    }
    async employeeDetail(id, year, month) {
        return this.attendanceService.getEmployeeDetail(Number(id), Number(year), Number(month));
    }
    async getManagerAttendanceView(req, date) {
        const userId = req.user.userId;
        return this.attendanceService.getManagerAttendanceView(userId, date);
    }
    async getHRAttendanceView(date) {
        return this.attendanceService.getHRAttendanceView(date);
    }
};
exports.AttendanceController = AttendanceController;
__decorate([
    (0, common_1.Post)('punch'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('selfie', {
        storage: (0, multer_1.diskStorage)({
            destination: './temp_uploads',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                cb(null, uniqueSuffix + (0, path_1.extname)(file.originalname));
            },
        }),
    })),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, create_attendance_dto_1.CreateAttendanceDto]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "punch", null);
__decorate([
    (0, common_1.Get)('me'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "getMyAttendance", null);
__decorate([
    (0, common_1.Get)('report/summary'),
    (0, roles_decorator_1.Roles)('ADMIN'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "summary", null);
__decorate([
    (0, common_1.Get)('report/monthly/:year'),
    (0, roles_decorator_1.Roles)('ADMIN', 'HR'),
    __param(0, (0, common_1.Param)('year')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "monthly", null);
__decorate([
    (0, common_1.Get)('report/daily/:year/:month'),
    (0, roles_decorator_1.Roles)('ADMIN', 'HR'),
    __param(0, (0, common_1.Param)('year')),
    __param(1, (0, common_1.Param)('month')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "daily", null);
__decorate([
    (0, common_1.Get)('report/employee-detail/:id/:year/:month'),
    (0, roles_decorator_1.Roles)('HR', 'ADMIN'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('year')),
    __param(2, (0, common_1.Param)('month')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "employeeDetail", null);
__decorate([
    (0, common_1.Get)('manager-view'),
    (0, roles_decorator_1.Roles)('MANAGER', 'ADMIN'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "getManagerAttendanceView", null);
__decorate([
    (0, common_1.Get)('hr-view'),
    (0, roles_decorator_1.Roles)('HR', 'ADMIN'),
    __param(0, (0, common_1.Query)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "getHRAttendanceView", null);
exports.AttendanceController = AttendanceController = __decorate([
    (0, common_1.Controller)('attendance'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [attendance_service_1.AttendanceService])
], AttendanceController);
//# sourceMappingURL=attendance.controller.js.map