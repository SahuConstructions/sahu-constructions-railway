import { PrismaService } from '../prisma/prisma.service';
import { UploadService } from '../uploads/upload.service';
export declare class PayrollService {
    private prisma;
    private uploadService;
    constructor(prisma: PrismaService, uploadService: UploadService);
    createPayrollRun(month: number, year: number): Promise<{
        status: import(".prisma/client").$Enums.PayrollStatus;
        createdAt: Date;
        id: number;
        year: number;
        month: number;
        updatedAt: Date;
        note: string | null;
    }>;
    listPayrollRuns(): Promise<{
        status: import(".prisma/client").$Enums.PayrollStatus;
        createdAt: Date;
        id: number;
        year: number;
        month: number;
        updatedAt: Date;
        note: string | null;
    }[]>;
    getPayrollRun(id: number): Promise<{
        items: ({
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
            payslip: {
                id: number;
                payrollLineItemId: number;
                pdfUrl: string | null;
                generatedAt: Date;
                published: boolean;
                publishedAt: Date | null;
            };
        } & {
            id: number;
            employeeId: number;
            hra: number | null;
            otherAllowance: number | null;
            pf: number | null;
            pt: number | null;
            basic: number | null;
            payrollRunId: number;
            lopDays: number | null;
            gross: number;
            netPay: number;
            details: import("@prisma/client/runtime/library").JsonValue;
            isPaid: boolean;
            paymentId: number | null;
        })[];
    } & {
        status: import(".prisma/client").$Enums.PayrollStatus;
        createdAt: Date;
        id: number;
        year: number;
        month: number;
        updatedAt: Date;
        note: string | null;
    }>;
    calculatePayroll(id: number): Promise<{
        items: {
            id: number;
            employeeId: number;
            hra: number | null;
            otherAllowance: number | null;
            pf: number | null;
            pt: number | null;
            basic: number | null;
            payrollRunId: number;
            lopDays: number | null;
            gross: number;
            netPay: number;
            details: import("@prisma/client/runtime/library").JsonValue;
            isPaid: boolean;
            paymentId: number | null;
        }[];
    } & {
        status: import(".prisma/client").$Enums.PayrollStatus;
        createdAt: Date;
        id: number;
        year: number;
        month: number;
        updatedAt: Date;
        note: string | null;
    }>;
    finalizePayroll(id: number): Promise<{
        items: ({
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
            id: number;
            employeeId: number;
            hra: number | null;
            otherAllowance: number | null;
            pf: number | null;
            pt: number | null;
            basic: number | null;
            payrollRunId: number;
            lopDays: number | null;
            gross: number;
            netPay: number;
            details: import("@prisma/client/runtime/library").JsonValue;
            isPaid: boolean;
            paymentId: number | null;
        })[];
    } & {
        status: import(".prisma/client").$Enums.PayrollStatus;
        createdAt: Date;
        id: number;
        year: number;
        month: number;
        updatedAt: Date;
        note: string | null;
    }>;
    publishPayroll(id: number): Promise<{
        items: ({
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
            payslip: {
                id: number;
                payrollLineItemId: number;
                pdfUrl: string | null;
                generatedAt: Date;
                published: boolean;
                publishedAt: Date | null;
            };
        } & {
            id: number;
            employeeId: number;
            hra: number | null;
            otherAllowance: number | null;
            pf: number | null;
            pt: number | null;
            basic: number | null;
            payrollRunId: number;
            lopDays: number | null;
            gross: number;
            netPay: number;
            details: import("@prisma/client/runtime/library").JsonValue;
            isPaid: boolean;
            paymentId: number | null;
        })[];
    } & {
        status: import(".prisma/client").$Enums.PayrollStatus;
        createdAt: Date;
        id: number;
        year: number;
        month: number;
        updatedAt: Date;
        note: string | null;
    }>;
    private getMonthName;
    updatePayrollLineItem(id: number, dto: any): Promise<{
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
        id: number;
        employeeId: number;
        hra: number | null;
        otherAllowance: number | null;
        pf: number | null;
        pt: number | null;
        basic: number | null;
        payrollRunId: number;
        lopDays: number | null;
        gross: number;
        netPay: number;
        details: import("@prisma/client/runtime/library").JsonValue;
        isPaid: boolean;
        paymentId: number | null;
    }>;
    getPayslip(lineItemId: number): Promise<{
        id: number;
        payrollLineItemId: number;
        pdfUrl: string | null;
        generatedAt: Date;
        published: boolean;
        publishedAt: Date | null;
    }>;
    getMyPayslips(userId: number): Promise<({
        payrollLineItem: {
            payrollRun: {
                status: import(".prisma/client").$Enums.PayrollStatus;
                createdAt: Date;
                id: number;
                year: number;
                month: number;
                updatedAt: Date;
                note: string | null;
            };
        } & {
            id: number;
            employeeId: number;
            hra: number | null;
            otherAllowance: number | null;
            pf: number | null;
            pt: number | null;
            basic: number | null;
            payrollRunId: number;
            lopDays: number | null;
            gross: number;
            netPay: number;
            details: import("@prisma/client/runtime/library").JsonValue;
            isPaid: boolean;
            paymentId: number | null;
        };
    } & {
        id: number;
        payrollLineItemId: number;
        pdfUrl: string | null;
        generatedAt: Date;
        published: boolean;
        publishedAt: Date | null;
    })[]>;
}
