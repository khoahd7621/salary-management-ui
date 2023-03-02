import { Salary } from '~/models/modules/salaries';
import axiosClient from '../axios-client';

export const salaryApi = {
  calculateSalary: (employeeId: string, salaryType: string): Promise<Salary> => {
    return axiosClient.get(`/${employeeId}/${salaryType}`);
  },
};
