import { Dayjs } from 'dayjs';

export interface FormData {
  file: any;
  applyDate: Dayjs[];
  job: string;
  basicSalary: number;
  salaryType: string;
  bhxh: number;
  bhyt: number;
  bhtn: number;
  tax: number;
  companyId: string;
  companyPrice: number;
  employeeId: string;
  type: string;
}
