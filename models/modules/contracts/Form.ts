import { Dayjs } from 'dayjs';

export interface CreateForm {
  file: any;
  applyDate: Dayjs[];
  job: string;
  basicSalary: number;
  salaryType: string;
  bhxh: number;
  companyId: string;
  companyPrice: number;
  employeeId: string;
  type: string;
}
