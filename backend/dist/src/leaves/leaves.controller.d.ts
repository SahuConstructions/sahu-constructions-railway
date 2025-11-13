import { LeavesService } from './leaves.service';
import { CreateLeaveDto } from './dto/create-leave.dto';
import { ActionLeaveDto } from './dto/action-leave.dto';
export declare class LeavesController {
    private leavesService;
    constructor(leavesService: LeavesService);
    apply(req: any, dto: CreateLeaveDto): Promise<{
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
    myLeaves(req: any): Promise<({
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
    pending(req: any): Promise<({
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
    action(req: any, id: number, dto: ActionLeaveDto): Promise<{
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
