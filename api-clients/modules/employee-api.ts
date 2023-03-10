import { Employee, Payload } from '~/models/modules/employees';
import axiosClient from '../axios-client';

export const employeeApi = {
  getAll: (): Promise<Employee[]> => {
    return axiosClient.get('/employees/all');
  },
  getById: (employeeId: string): Promise<Employee> => {
    return axiosClient.get(`/employees/${employeeId}`);
  },
  create: (employee: Payload) => {
    return axiosClient.post('/employees', {
      employee_name: employee.employeeName,
      image: employee.image,
      day_of_birth: employee.dateOfBirth,
      address: employee.address,
      identify_number: employee.identifyNumber,
      phoneNumber: employee.phoneNumber,
      email: employee.email,
    });
  },
  update: (employeeId: string, employee: Payload) => {
    return axiosClient.put('/employees/update', {
      id: employeeId,
      employee_name: employee.employeeName,
      image: employee.image,
      day_of_birth: employee.dateOfBirth,
      address: employee.address,
      identify_number: employee.identifyNumber,
      phoneNumber: employee.phoneNumber,
      email: employee.email,
    });
  },
  delete: (employeeId: string) => {
    return axiosClient.delete('/employees/delete', {
      data: { id: employeeId },
    });
  },
};
