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
            id: number;
            createdAt: Date;
            description: string | null;
            employeeId: number;
            status: import(".prisma/client").$Enums.ReimbursementStatus;
            amount: number;
            receiptUrl: string | null;
            resolvedAt: Date | null;
            notes: string | null;
            resolvedById: number | null;
        };
    }>;
    myReimbursements(user: any): Promise<({
        actions: ({
            user: {
                id: number;
                email: string;
                password: string;
                role: import(".prisma/client").$Enums.Role;
                createdAt: Date;
                tempPassword: string | null;
            };
        } & {
            id: number;
            createdAt: Date;
            userId: number;
            action: string;
            notes: string | null;
            reimbursementId: number;
        })[];
    } & {
        id: number;
        createdAt: Date;
        description: string | null;
        employeeId: number;
        status: import(".prisma/client").$Enums.ReimbursementStatus;
        amount: number;
        receiptUrl: string | null;
        resolvedAt: Date | null;
        notes: string | null;
        resolvedById: number | null;
    })[]>;
    listAll(user: any): Promise<({
        employee: {
            id: number;
            createdAt: Date;
            name: string;
            userId: number;
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
        actions: ({
            user: {
                id: number;
                email: string;
                password: string;
                role: import(".prisma/client").$Enums.Role;
                createdAt: Date;
                tempPassword: string | null;
            };
        } & {
            id: number;
            createdAt: Date;
            userId: number;
            action: string;
            notes: string | null;
            reimbursementId: number;
        })[];
        resolvedBy: {
            id: number;
            email: string;
            password: string;
            role: import(".prisma/client").$Enums.Role;
            createdAt: Date;
            tempPassword: string | null;
        };
    } & {
        id: number;
        createdAt: Date;
        description: string | null;
        employeeId: number;
        status: import(".prisma/client").$Enums.ReimbursementStatus;
        amount: number;
        receiptUrl: string | null;
        resolvedAt: Date | null;
        notes: string | null;
        resolvedById: number | null;
    })[]>;
    resolve(id: number, user: any, body: {
        status: 'APPROVED' | 'REJECTED';
        notes?: string;
    }): Promise<{
        id: number;
        createdAt: Date;
        description: string | null;
        employeeId: number;
        status: import(".prisma/client").$Enums.ReimbursementStatus;
        amount: number;
        receiptUrl: string | null;
        resolvedAt: Date | null;
        notes: string | null;
        resolvedById: number | null;
    }>;
    history(id: number): Promise<({
        user: {
            id: number;
            email: string;
            password: string;
            role: import(".prisma/client").$Enums.Role;
            createdAt: Date;
            tempPassword: string | null;
        };
    } & {
        id: number;
        createdAt: Date;
        userId: number;
        action: string;
        notes: string | null;
        reimbursementId: number;
    })[]>;
    downloadReceipt(id: number, res: Response): Promise<void>;
}
