import { Employee, PayloadCreate, PayloadUpdate } from '~/models/modules/employees';
import axiosClient from '../axios-client';

export const employeeApi = {
  getAll: (): Promise<Employee[]> => {
    return axiosClient.get('/employees/all');
  },
  getById: (employeeId: string): Promise<Employee> => {
    return axiosClient.get(`/employees/${employeeId}`);
  },
  create: (employee: PayloadCreate) => {
    return axiosClient.post('/employees', {
      employee_name: employee.employeeName,
      image: employee.image,
      day_of_birth: employee.dateOfBirth,
      address: employee.address,
      identify_number: employee.identifyNumber,
      phoneNumber: employee.phoneNumber,
    });
  },
  update: (employee: PayloadUpdate) => {
    return axiosClient.put('/employees/update', {
      id: employee.employeeId,
      employee_name: employee.employeeName,
      image: employee.image,
      day_of_birth: employee.dateOfBirth,
      address: employee.address,
      identify_number: employee.identifyNumber,
      phoneNumber: employee.phoneNumber,
    });
  },
  delete: (employeeId: string) => {
    return axiosClient.delete('/employees/delete', {
      data: { id: employeeId },
    });
  },
};
