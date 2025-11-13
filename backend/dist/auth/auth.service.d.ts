import { PrismaService } from "../prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<{
        id: number;
        email: string;
        role: import(".prisma/client").$Enums.Role;
        employeeId: number;
        mustReset: boolean;
    }>;
    login(userObj: {
        id: number;
        email: string;
        role: string;
        mustReset?: boolean;
    }): Promise<{
        accessToken: string;
        refreshToken: string;
        expiresIn: string;
        mustReset: boolean;
    }>;
    changePassword(userId: number, oldPassword: string, newPassword: string): Promise<{
        message: string;
    }>;
    refresh(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
        expiresIn: string;
        mustReset: boolean;
    }>;
}
