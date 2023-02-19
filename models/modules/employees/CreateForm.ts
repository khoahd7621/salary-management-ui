import { Dayjs } from 'dayjs';

export interface CreateForm {
  employeeName: string;
  image: any;
  dateOfBirth: Dayjs;
  address: string;
  identifyNumber: number;
  phoneNumber: string;
}
