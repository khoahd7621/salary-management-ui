import { Dayjs } from 'dayjs';

export interface UpdateForm {
  employeeId: string;
  employeeName: string;
  image: string;
  dateOfBirth: Dayjs;
  address: string;
  identifyNumber: number;
  phoneNumber: string;
}
