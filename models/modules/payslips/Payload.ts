export interface Payload {
  employeeId: string;
  contractId: string;
  baseSalary: number;
  workHours: number;
  otHours: number;
  leaveHours: number;
  socialInsurance: number;
  accidentInsurance: number;
  healthInsurance: number;
  paidDate: string;
  salaryAmount: number;
  bonus: number;
  deductions: number;
  payrollPeriodStart: string;
  payrollPeriodEnd: string;
  note: string;
  paidType: string;
}
