import { PayrollService } from './payroll.service';
export declare class PayrollController {
    private readonly payrollService;
    constructor(payrollService: PayrollService);
    createPayroll(dto: {
        month: number;
        year: number;
    }): Promise<{
        id: number;
        createdAt: Date;
        status: import(".prisma/client").$Enums.PayrollStatus;
        year: number;
        month: number;
        updatedAt: Date;
        note: string | null;
    }>;
    listPayrolls(): Promise<{
        id: number;
        createdAt: Date;
        status: import(".prisma/client").$Enums.PayrollStatus;
        year: number;
        month: number;
        updatedAt: Date;
        note: string | null;
    }[]>;
    getPayroll(id: number): Promise<{
        items: ({
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
            hra: number | null;
            otherAllowance: number | null;
            pf: number | null;
            pt: number | null;
            employeeId: number;
            payrollRunId: number;
            basic: number | null;
            lopDays: number | null;
            gross: number;
            netPay: number;
            details: import("@prisma/client/runtime/library").JsonValue;
            isPaid: boolean;
            paymentId: number | null;
        })[];
    } & {
        id: number;
        createdAt: Date;
        status: import(".prisma/client").$Enums.PayrollStatus;
        year: number;
        month: number;
        updatedAt: Date;
        note: string | null;
    }>;
    calculate(id: number): Promise<{
        items: {
            id: number;
            hra: number | null;
            otherAllowance: number | null;
            pf: number | null;
            pt: number | null;
            employeeId: number;
            payrollRunId: number;
            basic: number | null;
            lopDays: number | null;
            gross: number;
            netPay: number;
            details: import("@prisma/client/runtime/library").JsonValue;
            isPaid: boolean;
            paymentId: number | null;
        }[];
    } & {
        id: number;
        createdAt: Date;
        status: import(".prisma/client").$Enums.PayrollStatus;
        year: number;
        month: number;
        updatedAt: Date;
        note: string | null;
    }>;
    finalize(id: number): Promise<{
        items: ({
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
        } & {
            id: number;
            hra: number | null;
            otherAllowance: number | null;
            pf: number | null;
            pt: number | null;
            employeeId: number;
            payrollRunId: number;
            basic: number | null;
            lopDays: number | null;
            gross: number;
            netPay: number;
            details: import("@prisma/client/runtime/library").JsonValue;
            isPaid: boolean;
            paymentId: number | null;
        })[];
    } & {
        id: number;
        createdAt: Date;
        status: import(".prisma/client").$Enums.PayrollStatus;
        year: number;
        month: number;
        updatedAt: Date;
        note: string | null;
    }>;
    publish(id: number): Promise<{
        items: ({
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
            hra: number | null;
            otherAllowance: number | null;
            pf: number | null;
            pt: number | null;
            employeeId: number;
            payrollRunId: number;
            basic: number | null;
            lopDays: number | null;
            gross: number;
            netPay: number;
            details: import("@prisma/client/runtime/library").JsonValue;
            isPaid: boolean;
            paymentId: number | null;
        })[];
    } & {
        id: number;
        createdAt: Date;
        status: import(".prisma/client").$Enums.PayrollStatus;
        year: number;
        month: number;
        updatedAt: Date;
        note: string | null;
    }>;
    updatePayrollLineItem(id: number, dto: any): Promise<{
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
    } & {
        id: number;
        hra: number | null;
        otherAllowance: number | null;
        pf: number | null;
        pt: number | null;
        employeeId: number;
        payrollRunId: number;
        basic: number | null;
        lopDays: number | null;
        gross: number;
        netPay: number;
        details: import("@prisma/client/runtime/library").JsonValue;
        isPaid: boolean;
        paymentId: number | null;
    }>;
    getMyPayslips(userId: number): Promise<({
        payrollLineItem: {
            payrollRun: {
                id: number;
                createdAt: Date;
                status: import(".prisma/client").$Enums.PayrollStatus;
                year: number;
                month: number;
                updatedAt: Date;
                note: string | null;
            };
        } & {
            id: number;
            hra: number | null;
            otherAllowance: number | null;
            pf: number | null;
            pt: number | null;
            employeeId: number;
            payrollRunId: number;
            basic: number | null;
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
    previewPayslip(id: number): Promise<{
        url: string;
    }>;
    downloadPayslip(id: number): Promise<{
        url: string;
    }>;
}
