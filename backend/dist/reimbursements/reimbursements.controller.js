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
exports.ReimbursementsController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const reimbursements_service_1 = require("./reimbursements.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const user_decorator_1 = require("../auth/user.decorator");
const upload_service_1 = require("../uploads/upload.service");
let ReimbursementsController = class ReimbursementsController {
    constructor(service, uploadService) {
        this.service = service;
        this.uploadService = uploadService;
    }
    async create(user, file, body) {
        let receiptUrl;
        try {
            if (file) {
                const upload = await this.uploadService.uploadBuffer(file.buffer, 'reimbursements', file.originalname.replace(/\.[^/.]+$/, ''));
                receiptUrl = upload.secure_url;
            }
            const reimbursement = await this.service.create(user.userId ?? user.sub, {
                amount: parseFloat(String(body.amount)),
                description: body.description,
                receiptUrl,
            });
            return { ok: true, reimbursement };
        }
        catch (err) {
            console.error('Reimbursement upload error:', err);
            throw err;
        }
    }
    async myReimbursements(user) {
        return this.service.getMyReimbursements(user.userId ?? user.sub);
    }
    async listAll(user) {
        return this.service.listAll(user);
    }
    async resolve(id, user, body) {
        return this.service.resolve(id, user.userId ?? user.sub, body.status, body.notes);
    }
    async history(id) {
        return this.service.getHistory(id);
    }
    async downloadReceipt(id, res) {
        const r = await this.service.getById(id);
        if (!r || !r.receiptUrl)
            throw new common_1.NotFoundException('Receipt not found');
        if (r.receiptUrl.startsWith('http'))
            return res.redirect(r.receiptUrl);
        throw new common_1.NotFoundException('Invalid receipt file');
    }
};
exports.ReimbursementsController = ReimbursementsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('receipt')),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ReimbursementsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('me'),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReimbursementsController.prototype, "myReimbursements", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReimbursementsController.prototype, "listAll", null);
__decorate([
    (0, common_1.Post)(':id/resolve'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, user_decorator_1.User)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], ReimbursementsController.prototype, "resolve", null);
__decorate([
    (0, common_1.Get)(':id/history'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ReimbursementsController.prototype, "history", null);
__decorate([
    (0, common_1.Get)(':id/receipt'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ReimbursementsController.prototype, "downloadReceipt", null);
exports.ReimbursementsController = ReimbursementsController = __decorate([
    (0, common_1.Controller)('reimbursements'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [reimbursements_service_1.ReimbursementsService,
        upload_service_1.UploadService])
], ReimbursementsController);
//# sourceMappingURL=reimbursements.controller.js.map