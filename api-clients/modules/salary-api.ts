import { ApiRoutes } from '~/models/constants/Routes';
import { CreatePayload, Salary } from '~/models/modules/salaries';
import axiosClient from '../axios-client';

export const salaryApi = {
  calculateSalary: ({ employeeId, type, date }: CreatePayload): Promise<Salary> => {
    return axiosClient.post(`/${ApiRoutes.salaries}/${employeeId}`, {
      date,
      type,
    });
  },
};
