import { TimesheetsService } from "./timesheets.service";
export declare class TimesheetsController {
    private timesheetsService;
    constructor(timesheetsService: TimesheetsService);
    create(req: any, body: {
        project: string;
        task: string;
        hours: number;
        date: string;
    }): Promise<{
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
    }>;
    getMyTimesheets(req: any): Promise<{
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
    }[]>;
    getAll(): Promise<({
        employee: {
            id: number;
            name: string;
            user: {
                email: string;
            };
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
    })[]>;
    report(year: number, month: number): Promise<{
        employeeId: number;
        name: string;
        email: string;
        daysWorked: number;
        totalHours: number;
        leaveDays: number;
        totalWorkingDays: number;
        absentDays: number;
    }[]>;
    takeAction(req: any, id: number, body: {
        action: string;
        comments?: string;
    }): Promise<{
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
    }>;
    getDailyHours(req: any, date: string): Promise<{
        hours: number;
    }>;
}
