import { PrismaService } from "../prisma/prisma.service";
export declare class TimesheetsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: number, data: {
        project: string;
        task: string;
        hours?: number;
        date: Date;
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
    getMyTimesheets(userId: number): Promise<{
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
    getAllTimesheets(): Promise<({
        employee: {
            user: {
                email: string;
            };
            id: number;
            name: string;
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
    getMonthlySummary(year: number, month: number): Promise<{
        employeeId: number;
        name: string;
        email: string;
        daysWorked: number;
        totalHours: number;
        leaveDays: number;
        totalWorkingDays: number;
        absentDays: number;
    }[]>;
    takeAction(user: any, id: number, action: string, comments?: string): Promise<{
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
    getDailyHours(userId: number, date: string): Promise<{
        hours: number;
    }>;
}
