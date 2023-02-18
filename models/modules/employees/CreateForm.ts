import { Moment } from 'moment';

export interface CreateForm {
  employeeName: string;
  image: any;
  dateOfBirth: Moment;
  address: string;
  identifyNumber: number;
  phoneNumber: string;
}
