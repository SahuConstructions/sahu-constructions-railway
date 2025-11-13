"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new client_1.PrismaClient();
async function main() {
    const users = [
        { email: 'admin@sahu.com', password: 'Password123!', role: client_1.Role.ADMIN, name: 'Admin User' },
        { email: 'manager@sahu.com', password: 'Password123!', role: client_1.Role.MANAGER, name: 'Manager User' },
        { email: 'hr@sahu.com', password: 'Password123!', role: client_1.Role.HR, name: 'HR User' },
        { email: 'employee@sahu.com', password: 'Password123!', role: client_1.Role.USER, name: 'Employee User' },
        { email: 'finance@sahu.com', password: 'Password123!', role: client_1.Role.FINANCE, name: 'Finance User' },
    ];
    const createdUsers = {};
    for (const u of users) {
        const hashedPassword = await bcrypt.hash(u.password, 10);
        let user = await prisma.user.findUnique({ where: { email: u.email } });
        if (!user) {
            user = await prisma.user.create({
                data: {
                    email: u.email,
                    password: hashedPassword,
                    role: u.role,
                    employee: {
                        create: {
                            name: u.name,
                            phone: '9999999999',
                        },
                    },
                },
                include: { employee: true },
            });
            console.log(`✅ Created ${u.role}: ${u.email}`);
        }
        else {
            user = await prisma.user.findUnique({
                where: { email: u.email },
                include: { employee: true },
            });
            console.log(`ℹ️ ${u.role} already exists: ${u.email}`);
        }
        createdUsers[u.role] = user;
    }
    if (createdUsers['USER'] && createdUsers['MANAGER']) {
        await prisma.employee.update({
            where: { id: createdUsers['USER'].employee.id },
            data: { managerId: createdUsers['MANAGER'].employee.id },
        });
        console.log(`🔗 Linked ${createdUsers['USER'].email} to manager ${createdUsers['MANAGER'].email}`);
    }
    let salaryStruct = await prisma.salaryStructure.findFirst();
    if (!salaryStruct) {
        salaryStruct = await prisma.salaryStructure.create({
            data: {
                name: 'Default Structure',
                components: {
                    create: [
                        {
                            key: 'basic',
                            label: 'Basic',
                            type: client_1.ComponentType.EARNING,
                            valueType: client_1.ValueType.FIXED,
                            value: 20000,
                            order: 1,
                        },
                        {
                            key: 'hra',
                            label: 'HRA',
                            type: client_1.ComponentType.EARNING,
                            valueType: client_1.ValueType.PERCENTAGE,
                            value: 20,
                            order: 2,
                        },
                        {
                            key: 'conveyance',
                            label: 'Conveyance',
                            type: client_1.ComponentType.EARNING,
                            valueType: client_1.ValueType.FIXED,
                            value: 1600,
                            order: 3,
                        },
                        {
                            key: 'pf',
                            label: 'PF',
                            type: client_1.ComponentType.DEDUCTION,
                            valueType: client_1.ValueType.PERCENTAGE,
                            value: 12,
                            order: 10,
                        },
                    ],
                },
            },
        });
        console.log('✅ Created Default Salary Structure');
    }
    const employees = await prisma.employee.findMany();
    for (const emp of employees) {
        const existingSalary = await prisma.employeeSalary.findFirst({
            where: { employeeId: emp.id },
        });
        if (!existingSalary) {
            await prisma.employeeSalary.create({
                data: {
                    employeeId: emp.id,
                    structureId: salaryStruct.id,
                    basic: 20000,
                    effectiveFrom: new Date(),
                },
            });
            console.log(`💰 Salary assigned to ${emp.name}`);
        }
    }
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map