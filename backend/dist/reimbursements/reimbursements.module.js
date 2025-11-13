"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReimbursementsModule = void 0;
const common_1 = require("@nestjs/common");
const reimbursements_service_1 = require("./reimbursements.service");
const reimbursements_controller_1 = require("./reimbursements.controller");
const prisma_module_1 = require("../prisma/prisma.module");
const upload_module_1 = require("../uploads/upload.module");
let ReimbursementsModule = class ReimbursementsModule {
};
exports.ReimbursementsModule = ReimbursementsModule;
exports.ReimbursementsModule = ReimbursementsModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, upload_module_1.UploadModule],
        controllers: [reimbursements_controller_1.ReimbursementsController],
        providers: [reimbursements_service_1.ReimbursementsService],
    })
], ReimbursementsModule);
//# sourceMappingURL=reimbursements.module.js.map