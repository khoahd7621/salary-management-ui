import { Contract } from '../contracts';

export interface Salary {
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
