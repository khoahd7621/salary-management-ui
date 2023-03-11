import { Employee } from '../employees';

export interface Overtime {
  overtimeId: string;
  overtimeDay: string;
  hours: number;
  status: string;
  isDeleted: boolean;
  employeeId: string;
  employee: Employee;
}
