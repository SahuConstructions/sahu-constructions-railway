import { LeavesService } from './leaves.service';
import { CreateLeaveDto } from './dto/create-leave.dto';
import { ActionLeaveDto } from './dto/action-leave.dto';
export declare class LeavesController {
    private leavesService;
    constructor(leavesService: LeavesService);
    apply(req: any, dto: CreateLeaveDto): Promise<{
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
    myLeaves(req: any): Promise<({
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
            action: string;
            comments: string | null;
            leaveId: number;
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
    pending(req: any): Promise<({
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
            role: string;
            createdAt: Date;
            userId: number;
            action: string;
            comments: string | null;
            leaveId: number;
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
    action(req: any, id: number, dto: ActionLeaveDto): Promise<{
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
    summary(): Promise<{
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
    getAudit(id: number): Promise<({
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
        action: string;
        comments: string | null;
        leaveId: number;
    })[]>;
    getLeaveBalance(userId: number): Promise<{
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
    getManagerTeamBalances(req: any): Promise<any[]>;
    getAllBalances(): Promise<any[]>;
}
