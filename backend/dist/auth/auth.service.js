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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async validateUser(email, password) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user)
            return null;
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        let isTempPassword = false;
        if (user.tempPassword) {
            const tempMatch = user.tempPassword === password ||
                (await bcrypt.compare(password, user.tempPassword));
            if (tempMatch)
                isTempPassword = true;
        }
        if (!isPasswordMatch && !isTempPassword)
            return null;
        const employee = await this.prisma.employee.findUnique({
            where: { userId: user.id },
        });
        console.log(`[Auth] Login detected: ${email}, tempPass=${isTempPassword}, role=${user.role}`);
        return {
            id: user.id,
            email: user.email,
            role: user.role,
            employeeId: employee?.id ?? null,
            mustReset: isTempPassword,
        };
    }
    async login(userObj) {
        const payload = { email: userObj.email, sub: userObj.id, role: userObj.role };
        const accessToken = this.jwtService.sign(payload, {
            expiresIn: process.env.JWT_EXPIRES_IN || "3600s",
        });
        const refreshToken = this.jwtService.sign({ sub: userObj.id }, { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d" });
        return {
            accessToken,
            refreshToken,
            expiresIn: process.env.JWT_EXPIRES_IN || "3600s",
            mustReset: userObj.mustReset || false,
        };
    }
    async changePassword(userId, oldPassword, newPassword) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user)
            throw new common_1.BadRequestException("User not found");
        const isTempPassword = user.tempPassword && oldPassword === user.tempPassword;
        const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isTempPassword && !isPasswordMatch) {
            throw new common_1.BadRequestException("Old password is incorrect");
        }
        const hashed = await bcrypt.hash(newPassword, 10);
        await this.prisma.user.update({
            where: { id: userId },
            data: { password: hashed, tempPassword: null },
        });
        return { message: "✅ Password changed successfully" };
    }
    async refresh(refreshToken) {
        try {
            const decoded = this.jwtService.verify(refreshToken, {
                secret: process.env.JWT_SECRET,
            });
            const user = await this.prisma.user.findUnique({ where: { id: decoded.sub } });
            if (!user)
                throw new common_1.UnauthorizedException("User not found for refresh token");
            return this.login({ id: user.id, email: user.email, role: user.role });
        }
        catch {
            throw new common_1.UnauthorizedException("Invalid refresh token");
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map