import { PrismaService } from '../prisma/prisma.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { AttendanceGateway } from './attendance.gateway';
import { UploadService } from '../uploads/upload.service';
export declare class AttendanceService {
    private prisma;
    private gateway;
    private uploadService;
    constructor(prisma: PrismaService, gateway: AttendanceGateway, uploadService: UploadService);
    private reverseGeocodeIfNeeded;
    private shortenAddress;
    create(userId: number, dto: CreateAttendanceDto & {
        selfieFilePath?: string;
    }): Promise<{
        id: number;
        createdAt: Date;
        location: string | null;
        type: string;
        timestamp: Date;
        deviceId: string | null;
        selfieUrl: string | null;
        employeeId: number;
    }>;
    getSummary(): Promise<{
        total: number;
        byType: {
            type: string;
            count: number;
        }[];
        byEmployee: {
            name: string;
            email: string;
            employeeId: number;
            count: number;
        }[];
    }>;
    getMonthlySummary(year: number): Promise<any[]>;
    getDailySummary(year: number, month: number): Promise<any[]>;
    getEmployeeSummary(year: number, month: number): Promise<{
        employeeId: number;
        name: string;
        email: string;
        daysWorked: number;
        leaveDays: number;
        weeklyOffs: number;
        totalWorkingDays: number;
    }[]>;
    getEmployeeDetail(employeeId: number, year: number, month: number): Promise<{
        date: string;
        inTime: any;
        inLocation: any;
        inSelfie: any;
        outTime: any;
        outLocation: any;
        outSelfie: any;
        hours: number;
    }[]>;
    findByEmployee(userId: number): Promise<{
        id: number;
        location: string;
        type: string;
        timestamp: Date;
        selfieUrl: string;
    }[]>;
    getManagerAttendanceView(userId: number, date?: string): Promise<{
        summary: {
            present: number;
            late: number;
            absent: number;
        };
        data: {
            employeeId: number;
            employeeName: string;
            status: string;
            inTime: Date;
            outTime: Date;
            hours: string;
            inSelfie: string;
            outSelfie: string;
            location: string;
        }[];
    }>;
    getHRAttendanceView(date?: string): Promise<{
        summary: {
            present: number;
            late: number;
            absent: number;
        };
        data: {
            employeeId: number;
            employeeName: string;
            status: string;
            inTime: Date;
            outTime: Date;
            hours: string;
            inSelfie: string;
            outSelfie: string;
            location: string;
        }[];
    }>;
}
