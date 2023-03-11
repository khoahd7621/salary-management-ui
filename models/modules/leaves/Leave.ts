import { Employee } from '../employees';

export interface Leave {
  leaveTimeId: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: string;
  isDeleted: boolean;
  employeeId: string;
  employee: Employee;
}
