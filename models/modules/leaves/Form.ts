import { Dayjs } from 'dayjs';

export interface FormData {
  applyDate: Dayjs[];
  reason: string;
  status: string;
  employeeId: string;
}
