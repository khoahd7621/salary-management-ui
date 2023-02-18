import { Moment } from 'moment';

export interface UpdateForm {
  employeeId: string;
  employeeName: string;
  image: string;
  dateOfBirth: Moment;
  address: string;
  identifyNumber: number;
  phoneNumber: string;
}
