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
exports.TimesheetsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const timesheets_service_1 = require("./timesheets.service");
const roles_decorator_1 = require("../auth/roles.decorator");
const roles_guard_1 = require("../auth/roles.guard");
let TimesheetsController = class TimesheetsController {
    constructor(timesheetsService) {
        this.timesheetsService = timesheetsService;
    }
    async create(req, body) {
        const userId = req.user.userId;
        return this.timesheetsService.create(userId, {
            project: body.project,
            task: body.task,
            hours: body.hours,
            date: new Date(body.date),
        });
    }
    async getMyTimesheets(req) {
        const userId = req.user.userId;
        return this.timesheetsService.getMyTimesheets(userId);
    }
    async getAll() {
        return this.timesheetsService.getAllTimesheets();
    }
    async report(year, month) {
        return this.timesheetsService.getMonthlySummary(+year, +month);
    }
    async takeAction(req, id, body) {
        return this.timesheetsService.takeAction(req.user, id, body.action, body.comments);
    }
    async getDailyHours(req, date) {
        const userId = req.user.userId;
        return this.timesheetsService.getDailyHours(userId, date);
    }
};
exports.TimesheetsController = TimesheetsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TimesheetsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)("me"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TimesheetsController.prototype, "getMyTimesheets", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)("MANAGER", "HR", "ADMIN"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TimesheetsController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)("report/:year/:month"),
    (0, roles_decorator_1.Roles)("MANAGER", "HR", "ADMIN"),
    __param(0, (0, common_1.Param)("year")),
    __param(1, (0, common_1.Param)("month")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], TimesheetsController.prototype, "report", null);
__decorate([
    (0, common_1.Post)(":id/action"),
    (0, roles_decorator_1.Roles)("MANAGER", "HR", "ADMIN"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object]),
    __metadata("design:returntype", Promise)
], TimesheetsController.prototype, "takeAction", null);
__decorate([
    (0, common_1.Get)("daily-hours/:date"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)("date")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], TimesheetsController.prototype, "getDailyHours", null);
exports.TimesheetsController = TimesheetsController = __decorate([
    (0, common_1.Controller)("timesheets"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [timesheets_service_1.TimesheetsService])
], TimesheetsController);
//# sourceMappingURL=timesheets.controller.js.map