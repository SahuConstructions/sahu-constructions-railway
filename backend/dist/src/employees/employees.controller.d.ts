import { EmployeesService } from './employees.service';
export declare class EmployeesController {
    private employeesService;
    constructor(employeesService: EmployeesService);
    create(body: any): Promise<{
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
    findOne(id: string): Promise<{
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
    update(id: string, body: any): Promise<{
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
    remove(id: string): Promise<{
        ok: boolean;
        message: string;
    }>;
    resetPassword(id: number): Promise<{
        ok: boolean;
        message: string;
        employee: string;
        email: string;
        tempPassword: string;
    }>;
}
