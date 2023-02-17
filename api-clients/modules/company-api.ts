import { Company } from '~/models/modules/companies';
import axiosClient from '../axios-client';

export const companyApi = {
  getAll: (): Promise<Company[]> => {
    return axiosClient.get('/companies/all');
  },
  getById: (companyId: string): Promise<Company> => {
    return axiosClient.get(`/companies/${companyId}`);
  },
  create: (companyName: string) => {
    return axiosClient.post('/companies', { company_name: companyName });
  },
  delete: (companyId: string) => {
    return axiosClient.delete('/companies/delete', {
      data: { id: companyId },
    });
  },
  update: (companyId: string, companyName: string) => {
    return axiosClient.put('/companies/update', {
      id: companyId,
      company_name: companyName,
    });
  },
};
