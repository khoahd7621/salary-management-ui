import { Dayjs } from 'dayjs';

export interface CreateForm {
  file: any;
  applyDate: Dayjs[];
  job: string;
  basicSalary: number;
  salaryType: string;
  bhxh: number;
  bhyt: number;
  bhtn: number;
  companyId: string;
  companyPrice: number;
  employeeId: string;
  type: string;
}

export interface UpdateForm extends CreateForm {
  id: string;
}
