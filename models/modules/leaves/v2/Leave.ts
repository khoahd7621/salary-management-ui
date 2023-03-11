import { Employee } from '../../employees';

export interface Leave {
  leaveLogId: string;
  date: string;
  hours: number;
  reason: string;
  employee: Employee;
}
