import { SalaryType } from './SalaryType';
import { Status } from './Status';
import { Type } from './Type';

export interface CreatePayload {
  file: string;
  startDate: string;
  endDate: string;
  job: string;
  basicSalary: number;
  bhxh: number;
  partnerId: string;
  partnerPrice: number;
  employeeId: string;
  contractType: Type;
  salaryType: SalaryType;
  status: Status;
}
