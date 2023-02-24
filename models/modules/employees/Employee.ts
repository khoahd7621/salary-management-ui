export interface Employee {
  employeeId: string;
  name: string;
  image: string;
  dateOfBirth: string;
  address: string;
  identifyNumber: number;
  isActive: boolean;
  phoneNumber: string;
  code: string;
  contracts?: any[];
  leaveLogs?: any[];
  overtimeLogs?: any[];
  payrolls?: any[];
}
