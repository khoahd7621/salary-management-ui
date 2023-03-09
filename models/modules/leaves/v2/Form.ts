import { Dayjs } from 'dayjs';

export interface FormData {
  employeeId: string;
  leaveDate: Dayjs;
  leaveHours: number;
  reason: string;
}
