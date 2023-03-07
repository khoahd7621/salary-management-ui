import { Contract } from '../contracts';
import { Type } from './Type';

export interface Payslip {
  payHistoryId: string;
  note: string;
  paidType: Type;
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
  contract: Contract;
}
