import { Company } from '../companies';
import { Employee } from '../employees';
import { SalaryType } from './SalaryType';
import { Status } from './Status';
import { Type } from './Type';

export interface Contract {
  contractId: string;
  file: string;
  startDate: string;
  endDate: string;
  job: string;
  basicSalary: number;
  bhxh: number;
  tax: number;
  partnerId: string;
  partnerPrice: number;
  employeeId: string;
  bhyt: number;
  bhtn: number;
  salaryType: SalaryType;
  contractStatus: Status;
  contractType: Type;
  employee: Employee;
  partner: Company;
}
