import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
export declare class AttendanceController {
    private attendanceService;
    constructor(attendanceService: AttendanceService);
    punch(req: any, file: Express.Multer.File, dto: CreateAttendanceDto): Promise<{
        ok: boolean;
        record: {
            id: number;
            createdAt: Date;
            location: string | null;
            type: string;
            employeeId: number;
            timestamp: Date;
            selfieUrl: string | null;
            deviceId: string | null;
        };
    }>;
    getMyAttendance(req: any): Promise<{
        ok: boolean;
        records: {
            id: number;
            location: string;
            type: string;
            timestamp: Date;
            selfieUrl: string;
        }[];
    }>;
    summary(): Promise<{
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
    monthly(year: number): Promise<any[]>;
    daily(year: number, month: number): Promise<any[]>;
    employeeDetail(id: number, year: number, month: number): Promise<{
        date: string;
        inTime: any;
        inLocation: any;
        inSelfie: any;
        outTime: any;
        outLocation: any;
        outSelfie: any;
        hours: number;
    }[]>;
    getManagerAttendanceView(req: any, date?: string): Promise<{
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
