import { PrismaService } from '../prisma/prisma.service';
export declare class EmployeesService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<({
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
    })[]>;
    findOne(id: number): Promise<{
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
    createEmployee(dto: {
        name: string;
        email: string;
        phone?: string;
        role?: string;
        managerId?: number;
        basicSalary?: number;
        hra?: number;
        otherAllowance?: number;
        pf?: number;
        pt?: number;
        designation?: string;
        department?: string;
        location?: string;
        dob?: Date;
        pfNumber?: string;
        uan?: string;
        joinDate?: Date;
        inTime?: string;
        outTime?: string;
    }): Promise<{
        ok: boolean;
        message: string;
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
        credentials: {
            email: string;
            tempPassword: string;
        };
    }>;
    updateEmployee(id: number, dto: any): Promise<{
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
    removeEmployee(id: number): Promise<{
        ok: boolean;
        message: string;
    }>;
    resetEmployeePassword(employeeId: number): Promise<{
        ok: boolean;
        message: string;
        employee: string;
        email: string;
        tempPassword: string;
    }>;
}
