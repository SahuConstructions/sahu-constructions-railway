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
                id: number;
                createdAt: Date;
                name: string;
                phone: string | null;
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
                managerId: number | null;
                userId: number;
            };
        } & {
            id: number;
            createdAt: Date;
            managerId: number | null;
            type: string;
            employeeId: number;
            startDate: Date;
            endDate: Date;
            days: number;
            status: string;
            hrId: number | null;
        })[];
        recentTimesheets: ({
            employee: {
                id: number;
                createdAt: Date;
                name: string;
                phone: string | null;
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
                managerId: number | null;
                userId: number;
            };
        } & {
            id: number;
            createdAt: Date;
            employeeId: number;
            status: import(".prisma/client").$Enums.TimesheetStatus;
            date: Date;
            hours: number;
            comments: string | null;
            project: string;
            task: string;
            reviewedById: number | null;
        })[];
        recentReimbursements: ({
            employee: {
                id: number;
                createdAt: Date;
                name: string;
                phone: string | null;
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
                managerId: number | null;
                userId: number;
            };
        } & {
            id: number;
            createdAt: Date;
            employeeId: number;
            description: string | null;
            status: import(".prisma/client").$Enums.ReimbursementStatus;
            amount: number;
            receiptUrl: string | null;
            resolvedAt: Date | null;
            notes: string | null;
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
