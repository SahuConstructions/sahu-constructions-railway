import { PrismaService } from '../prisma/prisma.service';
export declare class AdminService {
    private prisma;
    constructor(prisma: PrismaService);
    getSystemOverview(): Promise<{
        totalEmployees: number;
        totalLeaves: number;
        totalTimesheets: number;
        totalReimbursements: number;
        totalPayrolls: any;
    }>;
    getRecentActivity(): Promise<{
        recentLeaves: ({
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
        } & {
            status: string;
            createdAt: Date;
            id: number;
            employeeId: number;
            managerId: number | null;
            type: string;
            startDate: Date;
            endDate: Date;
            days: number;
            hrId: number | null;
        })[];
        recentTimesheets: ({
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
        } & {
            status: import(".prisma/client").$Enums.TimesheetStatus;
            createdAt: Date;
            id: number;
            employeeId: number;
            date: Date;
            hours: number;
            comments: string | null;
            project: string;
            task: string;
            reviewedById: number | null;
        })[];
        recentReimbursements: ({
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
        })[];
    }>;
    getAdminSummary(): Promise<{
        leaves: (import(".prisma/client").Prisma.PickEnumerable<import(".prisma/client").Prisma.LeaveGroupByOutputType, "status"[]> & {
            _count: {
                status: number;
            };
        })[];
        reimbursements: (import(".prisma/client").Prisma.PickEnumerable<import(".prisma/client").Prisma.ReimbursementGroupByOutputType, "status"[]> & {
            _count: {
                status: number;
            };
        })[];
        timesheets: (import(".prisma/client").Prisma.PickEnumerable<import(".prisma/client").Prisma.TimesheetGroupByOutputType, "status"[]> & {
            _count: {
                status: number;
            };
        })[];
    }>;
}
