"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayrollService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const upload_service_1 = require("../uploads/upload.service");
const client_1 = require("@prisma/client");
const PDFDocument = require("pdfkit");
const streamBuffers = require("stream-buffers");
let PayrollService = class PayrollService {
    constructor(prisma, uploadService) {
        this.prisma = prisma;
        this.uploadService = uploadService;
    }
    async createPayrollRun(month, year) {
        return this.prisma.payrollRun.create({
            data: { month, year, status: client_1.PayrollStatus.DRAFT },
        });
    }
    async listPayrollRuns() {
        return this.prisma.payrollRun.findMany({
            orderBy: { createdAt: 'desc' },
        });
    }
    async getPayrollRun(id) {
        const run = await this.prisma.payrollRun.findUnique({
            where: { id },
            include: { items: { include: { employee: true, payslip: true } } },
        });
        if (!run)
            throw new common_1.NotFoundException('Payroll run not found');
        return run;
    }
    async calculatePayroll(id) {
        const payroll = await this.prisma.payrollRun.findUnique({
            where: { id },
            include: { items: true },
        });
        if (!payroll)
            throw new Error('Payroll run not found');
        if (payroll.status !== 'DRAFT')
            return payroll;
        const employees = await this.prisma.employee.findMany();
        const items = [];
        for (const emp of employees) {
            if (!emp.basicSalary)
                continue;
            const basic = emp.basicSalary;
            const hra = emp.hra ?? basic * 0.1;
            const otherAllowance = emp.otherAllowance ?? 2000;
            const pf = emp.pf ?? basic * 0.12;
            const pt = emp.pt ?? 200;
            const lopDays = 0;
            const gross = basic + hra + otherAllowance;
            const deductions = pf + pt;
            const netPay = gross - deductions;
            items.push({
                payrollRunId: id,
                employeeId: emp.id,
                basic,
                hra,
                otherAllowance,
                pf,
                pt,
                lopDays,
                gross,
                netPay,
                details: { calculated: true },
            });
        }
        await this.prisma.payrollLineItem.deleteMany({ where: { payrollRunId: id } });
        await this.prisma.payrollLineItem.createMany({ data: items });
        return this.prisma.payrollRun.update({
            where: { id },
            data: { status: 'CALCULATED' },
            include: { items: { include: { employee: true } } },
        });
    }
    async finalizePayroll(id) {
        const payroll = await this.prisma.payrollRun.findUnique({ where: { id } });
        if (!payroll)
            throw new Error('Payroll run not found');
        if (payroll.status !== 'CALCULATED')
            throw new Error('Payroll must be CALCULATED before finalizing');
        return this.prisma.payrollRun.update({
            where: { id },
            data: { status: 'FINALIZED' },
            include: { items: { include: { employee: true } } },
        });
    }
    async publishPayroll(id) {
        const payroll = await this.prisma.payrollRun.findUnique({
            where: { id },
            include: { items: { include: { employee: true } } },
        });
        if (!payroll)
            throw new Error("Payroll run not found");
        if (payroll.status !== "FINALIZED")
            throw new Error("Payroll must be FINALIZED before publishing");
        for (const item of payroll.items) {
            try {
                const doc = new PDFDocument({ margin: 40, size: "A4" });
                const bufferStream = new streamBuffers.WritableStreamBuffer({
                    initialSize: 100 * 1024,
                    incrementAmount: 10 * 1024,
                });
                doc.pipe(bufferStream);
                const pageWidth = 595.28;
                const leftMargin = 50;
                const rightMargin = 50;
                const contentWidth = pageWidth - leftMargin - rightMargin;
                doc.fontSize(18).font("Helvetica-Bold").fillColor("#153E75");
                doc.text("Sahu Construction", leftMargin, 40, {
                    align: "center",
                    width: contentWidth,
                });
                doc.fontSize(9).font("Helvetica").fillColor("black");
                doc.text("D-107, 1st Floor, Sanpada Railway Station, Opp. G-Square Business Park, Sanpada, Navi Mumbai - 400705, Maharashtra, INDIA.", { align: "center", width: contentWidth, lineGap: 2 });
                doc.moveDown(0.5);
                doc.fontSize(12).font("Helvetica-Bold");
                doc.text(`Salary slip for the month of ${this.getMonthName(payroll.month)} ${payroll.year}`, { align: "center", underline: true, width: contentWidth });
                const topY = doc.y + 12;
                const colGap = 20;
                const colWidth = (contentWidth - colGap) / 2;
                const leftColX = leftMargin;
                const rightColX = leftMargin + colWidth + colGap;
                const lineHeight = 14;
                doc.fontSize(10).font("Helvetica");
                const emp = {
                    ...item.employee,
                    dob: item.employee?.dob ?? null,
                    pfNumber: item.employee?.pfNumber ?? "—",
                    uan: item.employee?.uan ?? "—",
                    department: item.employee?.department ?? "Engineering",
                    designation: item.employee?.designation ?? "Staff",
                    location: item.employee?.location ?? "Ghansoli",
                };
                let y = topY;
                doc.text(`Name: ${emp.name}`, leftColX, y, { width: colWidth });
                y += lineHeight;
                doc.text(`DOB: ${emp.dob ? new Date(emp.dob).toLocaleDateString("en-IN") : "—"}`, leftColX, y, { width: colWidth });
                y += lineHeight;
                doc.text(`Parent Department: ${emp.department}`, leftColX, y, {
                    width: colWidth,
                });
                y += lineHeight;
                doc.text(`Designation: ${emp.designation}`, leftColX, y, {
                    width: colWidth,
                });
                y += lineHeight;
                doc.text(`Location: ${emp.location}`, leftColX, y, { width: colWidth });
                y = topY;
                doc.text(`P F No: ${emp.pfNumber}`, rightColX, y, {
                    width: colWidth,
                    align: "right",
                });
                y += lineHeight;
                doc.text(`UAN: ${emp.uan}`, rightColX, y, {
                    width: colWidth,
                    align: "right",
                });
                y += lineHeight;
                doc.text(`Total Days: 31`, rightColX, y, {
                    width: colWidth,
                    align: "right",
                });
                y += lineHeight;
                doc.text(`Days Paid: 30`, rightColX, y, {
                    width: colWidth,
                    align: "right",
                });
                y += lineHeight;
                doc.text(`LOP Days: ${item.lopDays ?? 0}`, rightColX, y, {
                    width: colWidth,
                    align: "right",
                });
                doc.moveDown(2);
                const tableTop = doc.y + 6;
                const earnColX = leftMargin;
                const earnPartW = 160;
                const earnAmtW = 80;
                const dedColX = earnColX + earnPartW + earnAmtW;
                const dedPartW = 160;
                const dedAmtW = 80;
                const cellHeight = 18;
                doc.rect(earnColX, tableTop, earnPartW + earnAmtW + dedPartW + dedAmtW, cellHeight).stroke();
                doc.font("Helvetica-Bold").fontSize(11);
                doc.text("Earnings", earnColX + 6, tableTop + 4, {
                    width: earnPartW + earnAmtW,
                });
                doc.text("Deductions", dedColX + 3, tableTop + 4, {
                    width: dedPartW + dedAmtW,
                });
                let rowY = tableTop + cellHeight;
                doc.fontSize(9).font("Helvetica-Bold");
                doc.rect(earnColX, rowY, earnPartW, cellHeight).stroke();
                doc.rect(earnColX + earnPartW, rowY, earnAmtW, cellHeight).stroke();
                doc.rect(dedColX, rowY, dedPartW, cellHeight).stroke();
                doc.rect(dedColX + dedPartW, rowY, dedAmtW, cellHeight).stroke();
                doc.text("Particulars", earnColX + 6, rowY + 4);
                doc.text("Total", earnColX + earnPartW, rowY + 4, {
                    width: earnAmtW - 6,
                    align: "right",
                });
                doc.text("Particulars", dedColX + 6, rowY + 4);
                doc.text("Total", dedColX + dedPartW, rowY + 4, {
                    width: dedAmtW - 6,
                    align: "right",
                });
                rowY += cellHeight;
                const basic = Number(item.basic || item.gross * 0.6 || 0);
                const hra = Number(item.hra || basic * 0.1 || 0);
                const otherAllowance = Number(item.otherAllowance || 0);
                const pf = Number(item.pf || basic * 0.12 || 0);
                const pt = Number(item.pt ?? 200);
                const earnings = [
                    ["Basic", basic],
                    ["House Rent Allowance", hra],
                    ["Other Allowance", otherAllowance],
                ];
                const deductions = [
                    ["Provident Fund", pf],
                    ["Profession Tax", pt],
                ];
                const maxRows = Math.max(earnings.length, deductions.length);
                doc.font("Helvetica").fontSize(9);
                for (let i = 0; i < maxRows; i++) {
                    doc.rect(earnColX, rowY, earnPartW, cellHeight).stroke();
                    doc.rect(earnColX + earnPartW, rowY, earnAmtW, cellHeight).stroke();
                    doc.rect(dedColX, rowY, dedPartW, cellHeight).stroke();
                    doc.rect(dedColX + dedPartW, rowY, dedAmtW, cellHeight).stroke();
                    if (earnings[i]) {
                        const [label, val] = earnings[i];
                        doc.text(label, earnColX + 6, rowY + 4);
                        doc.text(Number(val).toFixed(2), earnColX + earnPartW, rowY + 4, {
                            width: earnAmtW - 6,
                            align: "right",
                        });
                    }
                    if (deductions[i]) {
                        const [label, val] = deductions[i];
                        doc.text(label, dedColX + 6, rowY + 4);
                        doc.text(Number(val).toFixed(2), dedColX + dedPartW, rowY + 4, {
                            width: dedAmtW - 6,
                            align: "right",
                        });
                    }
                    rowY += cellHeight;
                }
                const totalEarnings = basic + hra + otherAllowance;
                const totalDeductions = pf + pt;
                const netPay = totalEarnings - totalDeductions;
                doc.rect(earnColX, rowY, earnPartW, cellHeight).fillAndStroke("#f2f2f2", "black");
                doc.rect(earnColX + earnPartW, rowY, earnAmtW, cellHeight).fillAndStroke("#f2f2f2", "black");
                doc.rect(dedColX, rowY, dedPartW, cellHeight).fillAndStroke("#f2f2f2", "black");
                doc.rect(dedColX + dedPartW, rowY, dedAmtW, cellHeight).fillAndStroke("#f2f2f2", "black");
                doc.fillColor("black").font("Helvetica-Bold");
                doc.text("Total Earnings", earnColX + 6, rowY + 4);
                doc.text(totalEarnings.toFixed(2), earnColX + earnPartW, rowY + 4, {
                    width: earnAmtW - 6,
                    align: "right",
                });
                doc.text("Total Deductions", dedColX + 6, rowY + 4);
                doc.text(totalDeductions.toFixed(2), dedColX + dedPartW, rowY + 4, {
                    width: dedAmtW - 6,
                    align: "right",
                });
                rowY += cellHeight + 10;
                doc.font("Helvetica-Bold").fontSize(11);
                doc.text(`Net amount Rs. ${netPay.toFixed(2)}`, leftMargin, rowY + 10, {
                    width: contentWidth,
                    align: "left",
                });
                doc.font("Helvetica").fontSize(9).fillColor("gray");
                doc.text("This is a computer generated payslip and does not require any signature.", leftMargin, rowY + 40, { align: "center", width: contentWidth });
                doc.end();
                await new Promise((resolve) => bufferStream.on("finish", () => resolve()));
                const pdfBuffer = bufferStream.getContents();
                const upload = await this.uploadService.uploadBuffer(pdfBuffer, "sahu_construction/payslips", `payslip-${item.employeeId}-${payroll.id}`);
                await this.prisma.payslip.upsert({
                    where: { payrollLineItemId: item.id },
                    update: { pdfUrl: upload.secure_url, published: true, publishedAt: new Date() },
                    create: { payrollLineItemId: item.id, pdfUrl: upload.secure_url, published: true, publishedAt: new Date() },
                });
            }
            catch (err) {
                console.error(`❌ Failed to generate payslip for ${item.employeeId}`, err);
            }
        }
        return this.prisma.payrollRun.update({
            where: { id },
            data: { status: "PUBLISHED" },
            include: { items: { include: { employee: true, payslip: true } } },
        });
    }
    getMonthName(month) {
        return new Date(0, month - 1).toLocaleString('en-US', { month: 'short' });
    }
    async updatePayrollLineItem(id, dto) {
        const lineItem = await this.prisma.payrollLineItem.findUnique({ where: { id } });
        if (!lineItem)
            throw new common_1.NotFoundException('Line item not found');
        const basic = dto.basic ?? lineItem.basic ?? 0;
        const hra = dto.hra ?? lineItem.hra ?? 0;
        const otherAllowance = dto.otherAllowance ?? lineItem.otherAllowance ?? 0;
        const pf = dto.pf ?? lineItem.pf ?? 0;
        const pt = dto.pt ?? lineItem.pt ?? 0;
        const lopDays = dto.lopDays ?? lineItem.lopDays ?? 0;
        const gross = basic + hra + otherAllowance;
        const deductions = pf + pt;
        const netPay = gross - deductions;
        return this.prisma.payrollLineItem.update({
            where: { id },
            data: { basic, hra, otherAllowance, pf, pt, lopDays, gross, netPay },
            include: { employee: true },
        });
    }
    async getPayslip(lineItemId) {
        return this.prisma.payslip.findUnique({
            where: { payrollLineItemId: lineItemId },
        });
    }
    async getMyPayslips(userId) {
        const employee = await this.prisma.employee.findUnique({ where: { userId } });
        if (!employee)
            throw new common_1.NotFoundException('Employee not found');
        return this.prisma.payslip.findMany({
            where: { payrollLineItem: { employeeId: employee.id } },
            include: { payrollLineItem: { include: { payrollRun: true } } },
            orderBy: { publishedAt: 'desc' },
        });
    }
};
exports.PayrollService = PayrollService;
exports.PayrollService = PayrollService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        upload_service_1.UploadService])
], PayrollService);
//# sourceMappingURL=payroll.service.js.map