import { PrismaService } from '../prisma/prisma.service';
import { ActionLeaveDto } from './dto/action-leave.dto';
export declare class LeavesService {
    private prisma;
    constructor(prisma: PrismaService);
    myLeaves(userId: number): Promise<({
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
            id: number;
            userId: number;
            action: string;
            role: string;
            comments: string | null;
            leaveId: number;
        })[];
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
    })[]>;
    pending(user: any): Promise<({
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
            id: number;
            userId: number;
            action: string;
            role: string;
            comments: string | null;
            leaveId: number;
        })[];
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
    })[]>;
    action(user: any, leaveId: number, dto: ActionLeaveDto): Promise<{
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
    }>;
    getSummary(): Promise<{
        total: number;
        byStatus: {
            status: string;
            count: number;
        }[];
        byType: {
            type: string;
            count: number;
        }[];
    }>;
    getAudit(leaveId: number): Promise<({
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
        id: number;
        userId: number;
        action: string;
        role: string;
        comments: string | null;
        leaveId: number;
    })[]>;
    calculateEntitlement(employeeId: number): Promise<{
        annual: number;
        sick: number;
        other: number;
    }>;
    getLeaveBalance(employeeId: number): Promise<{
        entitlement: {
            annual: number;
            sick: number;
            other: number;
        };
        used: {
            annual: number;
            sick: number;
            other: number;
        };
        remaining: {
            annual: number;
            sick: number;
            other: number;
        };
        confirmed: boolean;
    }>;
    getEmployeeByUserId(userId: number): Promise<{
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
    }>;
    getManagerTeamBalances(userId: number): Promise<any[]>;
    getAllLeaveBalances(): Promise<any[]>;
    apply(userId: number, dto: any): Promise<{
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
    }>;
}
