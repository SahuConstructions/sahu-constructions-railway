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
exports.PayrollController = void 0;
const common_1 = require("@nestjs/common");
const payroll_service_1 = require("./payroll.service");
let PayrollController = class PayrollController {
    constructor(payrollService) {
        this.payrollService = payrollService;
    }
    async createPayroll(dto) {
        return this.payrollService.createPayrollRun(dto.month, dto.year);
    }
    async listPayrolls() {
        return this.payrollService.listPayrollRuns();
    }
    async getPayroll(id) {
        return this.payrollService.getPayrollRun(id);
    }
    async calculate(id) {
        return this.payrollService.calculatePayroll(id);
    }
    async finalize(id) {
        return this.payrollService.finalizePayroll(id);
    }
    async publish(id) {
        return this.payrollService.publishPayroll(id);
    }
    async updatePayrollLineItem(id, dto) {
        return this.payrollService.updatePayrollLineItem(id, dto);
    }
    async getMyPayslips(userId) {
        return this.payrollService.getMyPayslips(userId);
    }
    async previewPayslip(id) {
        const payslip = await this.payrollService.getPayslip(id);
        if (!payslip || !payslip.pdfUrl)
            throw new common_1.NotFoundException('Payslip not found');
        return { url: payslip.pdfUrl };
    }
    async downloadPayslip(id) {
        const payslip = await this.payrollService.getPayslip(id);
        if (!payslip || !payslip.pdfUrl)
            throw new common_1.NotFoundException('Payslip not found');
        let downloadUrl = payslip.pdfUrl;
        if (downloadUrl.includes('/upload/')) {
            downloadUrl = downloadUrl.replace('/upload/', '/upload/fl_attachment/');
        }
        return { url: downloadUrl };
    }
};
exports.PayrollController = PayrollController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PayrollController.prototype, "createPayroll", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PayrollController.prototype, "listPayrolls", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PayrollController.prototype, "getPayroll", null);
__decorate([
    (0, common_1.Post)(':id/calculate'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PayrollController.prototype, "calculate", null);
__decorate([
    (0, common_1.Post)(':id/finalize'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PayrollController.prototype, "finalize", null);
__decorate([
    (0, common_1.Post)(':id/publish'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PayrollController.prototype, "publish", null);
__decorate([
    (0, common_1.Patch)('line-item/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], PayrollController.prototype, "updatePayrollLineItem", null);
__decorate([
    (0, common_1.Get)('mypayslips/:userId'),
    __param(0, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PayrollController.prototype, "getMyPayslips", null);
__decorate([
    (0, common_1.Get)('payslip/:lineItemId/preview'),
    __param(0, (0, common_1.Param)('lineItemId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PayrollController.prototype, "previewPayslip", null);
__decorate([
    (0, common_1.Get)('payslip/:lineItemId/download'),
    __param(0, (0, common_1.Param)('lineItemId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PayrollController.prototype, "downloadPayslip", null);
exports.PayrollController = PayrollController = __decorate([
    (0, common_1.Controller)('payroll'),
    __metadata("design:paramtypes", [payroll_service_1.PayrollService])
], PayrollController);
//# sourceMappingURL=payroll.controller.js.map