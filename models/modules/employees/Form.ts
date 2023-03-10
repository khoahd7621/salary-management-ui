import { Dayjs } from 'dayjs';

export interface FormData {
  employeeName: string;
  image: any;
  dateOfBirth: Dayjs;
  address: string;
  identifyNumber: number;
  phoneNumber: string;
  email: string;
}
