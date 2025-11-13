import { PrismaService } from '../prisma/prisma.service';
export declare class ReimbursementsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: number, dto: {
        amount: number;
        description?: string;
        receiptUrl?: string;
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
    getMyReimbursements(userId: number): Promise<({
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
    listAll(user?: any): Promise<({
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
    resolve(id: number, userId: number, status: 'APPROVED' | 'REJECTED', notes?: string): Promise<{
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
    getHistory(id: number): Promise<({
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
    getById(id: number): Promise<{
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
}
