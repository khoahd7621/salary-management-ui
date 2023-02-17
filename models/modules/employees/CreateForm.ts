import { Moment } from 'moment';

export interface CreateForm {
  employeeName: string;
  image: string;
  dateOfBirth: Moment;
  address: string;
  identifyNumber: number;
  phoneNumber: string;
}
