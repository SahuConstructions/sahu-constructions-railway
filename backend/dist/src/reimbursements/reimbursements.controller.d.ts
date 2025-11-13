import { ReimbursementsService } from './reimbursements.service';
import { Response } from 'express';
import { UploadService } from '../uploads/upload.service';
export declare class ReimbursementsController {
    private service;
    private uploadService;
    constructor(service: ReimbursementsService, uploadService: UploadService);
    create(user: any, file: Express.Multer.File, body: {
        amount: number;
        description?: string;
    }): Promise<{
        ok: boolean;
        reimbursement: {
            amount: number;
            description: string | null;
            receiptUrl: string | null;
            status: import(".prisma/client").$Enums.ReimbursementStatus;
            createdAt: Date;
            resolvedAt: Date | null;
            notes: string | null;
            id: number;
            employeeId: number;
            resolvedById: number | null;
        };
    }>;
    myReimbursements(user: any): Promise<({
        actions: ({
            user: {
                createdAt: Date;
                id: number;
                email: string;
                password: string;
                role: import(".prisma/client").$Enums.Role;
                tempPassword: string | null;
            };
        } & {
            createdAt: Date;
            notes: string | null;
            id: number;
            userId: number;
            reimbursementId: number;
            action: string;
        })[];
    } & {
        amount: number;
        description: string | null;
        receiptUrl: string | null;
        status: import(".prisma/client").$Enums.ReimbursementStatus;
        createdAt: Date;
        resolvedAt: Date | null;
        notes: string | null;
        id: number;
        employeeId: number;
        resolvedById: number | null;
    })[]>;
    listAll(user: any): Promise<({
        employee: {
            createdAt: Date;
            id: number;
            userId: number;
            name: string;
            phone: string | null;
            managerId: number | null;
            joinDate: Date;
            confirmed: boolean;
            inTime: string | null;
            outTime: string | null;
            basicSalary: number | null;
            hra: number | null;
            otherAllowance: number | null;
            pf: number | null;
            pt: number | null;
            designation: string | null;
            department: string | null;
            location: string | null;
            dob: Date | null;
            pfNumber: string | null;
            uan: string | null;
        };
        resolvedBy: {
            createdAt: Date;
            id: number;
            email: string;
            password: string;
            role: import(".prisma/client").$Enums.Role;
            tempPassword: string | null;
        };
        actions: ({
            user: {
                createdAt: Date;
                id: number;
                email: string;
                password: string;
                role: import(".prisma/client").$Enums.Role;
                tempPassword: string | null;
            };
        } & {
            createdAt: Date;
            notes: string | null;
            id: number;
            userId: number;
            reimbursementId: number;
            action: string;
        })[];
    } & {
        amount: number;
        description: string | null;
        receiptUrl: string | null;
        status: import(".prisma/client").$Enums.ReimbursementStatus;
        createdAt: Date;
        resolvedAt: Date | null;
        notes: string | null;
        id: number;
        employeeId: number;
        resolvedById: number | null;
    })[]>;
    resolve(id: number, user: any, body: {
        status: 'APPROVED' | 'REJECTED';
        notes?: string;
    }): Promise<{
        amount: number;
        description: string | null;
        receiptUrl: string | null;
        status: import(".prisma/client").$Enums.ReimbursementStatus;
        createdAt: Date;
        resolvedAt: Date | null;
        notes: string | null;
        id: number;
        employeeId: number;
        resolvedById: number | null;
    }>;
    history(id: number): Promise<({
        user: {
            createdAt: Date;
            id: number;
            email: string;
            password: string;
            role: import(".prisma/client").$Enums.Role;
            tempPassword: string | null;
        };
    } & {
        createdAt: Date;
        notes: string | null;
        id: number;
        userId: number;
        reimbursementId: number;
        action: string;
    })[]>;
    downloadReceipt(id: number, res: Response): Promise<void>;
}
