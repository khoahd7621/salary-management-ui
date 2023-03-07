export interface Payload {
  employeeId: string;
  contractId: string;
  note: string;
  paidType: string;
  paidDate: string;
  standardWorkHours: number;
  realityWorkHours: number;
  baseSalary: number;
  baseSalaryPerHour: number;
  tax: number;
  socialInsurance: number;
  accidentInsurance: number;
  healthInsurance: number;
  overtimeHours: number;
  ovetimeSalaryPerHour: number;
  totalBonus: number;
  totalDeductions: number;
  leaveHours: number;
  finalIncome: number;
  periodStartDate: string;
  periodEndDate: string;
}
