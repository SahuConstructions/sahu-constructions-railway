import { PrismaService } from '../prisma/prisma.service';
export declare class ReimbursementsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: number, dto: {
        amount: number;
        description?: string;
        receiptUrl?: string;
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
    getMyReimbursements(userId: number): Promise<({
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
    listAll(user?: any): Promise<({
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
    resolve(id: number, userId: number, status: 'APPROVED' | 'REJECTED', notes?: string): Promise<{
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
    getHistory(id: number): Promise<({
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
    getById(id: number): Promise<{
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
}
