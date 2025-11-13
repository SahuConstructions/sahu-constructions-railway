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
exports.LeavesController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_guard_1 = require("../auth/roles.guard");
const roles_decorator_1 = require("../auth/roles.decorator");
const leaves_service_1 = require("./leaves.service");
const create_leave_dto_1 = require("./dto/create-leave.dto");
const action_leave_dto_1 = require("./dto/action-leave.dto");
let LeavesController = class LeavesController {
    constructor(leavesService) {
        this.leavesService = leavesService;
    }
    async apply(req, dto) {
        return this.leavesService.apply(req.user.userId, dto);
    }
    async myLeaves(req) {
        return this.leavesService.myLeaves(req.user.userId);
    }
    async pending(req) {
        return this.leavesService.pending(req.user);
    }
    async action(req, id, dto) {
        return this.leavesService.action(req.user, id, dto);
    }
    async summary() {
        return this.leavesService.getSummary();
    }
    async getAudit(id) {
        return this.leavesService.getAudit(id);
    }
    async getLeaveBalance(userId) {
        const employee = await this.leavesService.getEmployeeByUserId(userId);
        return this.leavesService.getLeaveBalance(employee.id);
    }
    async getManagerTeamBalances(req) {
        return this.leavesService.getManagerTeamBalances(req.user.userId);
    }
    async getAllBalances() {
        return this.leavesService.getAllLeaveBalances();
    }
};
exports.LeavesController = LeavesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_leave_dto_1.CreateLeaveDto]),
    __metadata("design:returntype", Promise)
], LeavesController.prototype, "apply", null);
__decorate([
    (0, common_1.Get)('me'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LeavesController.prototype, "myLeaves", null);
__decorate([
    (0, common_1.Get)('pending'),
    (0, roles_decorator_1.Roles)('MANAGER', 'HR', 'ADMIN'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LeavesController.prototype, "pending", null);
__decorate([
    (0, common_1.Post)(':id/action'),
    (0, roles_decorator_1.Roles)('MANAGER', 'HR', 'ADMIN'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, action_leave_dto_1.ActionLeaveDto]),
    __metadata("design:returntype", Promise)
], LeavesController.prototype, "action", null);
__decorate([
    (0, common_1.Get)('report/summary'),
    (0, roles_decorator_1.Roles)('ADMIN'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LeavesController.prototype, "summary", null);
__decorate([
    (0, common_1.Get)(':id/audit'),
    (0, roles_decorator_1.Roles)('ADMIN', 'MANAGER', 'HR'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], LeavesController.prototype, "getAudit", null);
__decorate([
    (0, common_1.Get)('balance/:id'),
    (0, roles_decorator_1.Roles)('HR', 'MANAGER', 'ADMIN', 'USER'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], LeavesController.prototype, "getLeaveBalance", null);
__decorate([
    (0, common_1.Get)('balances/manager'),
    (0, roles_decorator_1.Roles)('MANAGER'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LeavesController.prototype, "getManagerTeamBalances", null);
__decorate([
    (0, common_1.Get)('balances/hr'),
    (0, roles_decorator_1.Roles)('HR', 'ADMIN'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LeavesController.prototype, "getAllBalances", null);
exports.LeavesController = LeavesController = __decorate([
    (0, common_1.Controller)('leaves'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [leaves_service_1.LeavesService])
], LeavesController);
//# sourceMappingURL=leaves.controller.js.map