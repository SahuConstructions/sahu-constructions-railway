import { PrismaService } from '../prisma/prisma.service';
import { ActionLeaveDto } from './dto/action-leave.dto';
export declare class LeavesService {
    private prisma;
    constructor(prisma: PrismaService);
    myLeaves(userId: number): Promise<({
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
            role: string;
            createdAt: Date;
            userId: number;
            leaveId: number;
            action: string;
            comments: string | null;
        })[];
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
    })[]>;
    pending(user: any): Promise<({
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
            role: string;
            createdAt: Date;
            userId: number;
            leaveId: number;
            action: string;
            comments: string | null;
        })[];
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
    })[]>;
    action(user: any, leaveId: number, dto: ActionLeaveDto): Promise<{
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
            id: number;
            email: string;
            password: string;
            role: import(".prisma/client").$Enums.Role;
            createdAt: Date;
            tempPassword: string | null;
        };
    } & {
        id: number;
        role: string;
        createdAt: Date;
        userId: number;
        leaveId: number;
        action: string;
        comments: string | null;
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
    }>;
    getManagerTeamBalances(userId: number): Promise<any[]>;
    getAllLeaveBalances(): Promise<any[]>;
    apply(userId: number, dto: any): Promise<{
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
    }>;
}
