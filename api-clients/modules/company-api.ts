import { Company, Payload } from '~/models/modules/companies';
import axiosClient from '../axios-client';

export const companyApi = {
  getAll: (): Promise<Company[]> => {
    return axiosClient.get('/companies/all');
  },
  getById: (companyId: string): Promise<Company> => {
    return axiosClient.get(`/companies/${companyId}`);
  },
  create: (company: Payload) => {
    return axiosClient.post('/companies', {
      address: company.address,
      company_name: company.companyName,
      phone: company.phone,
      email: company.email,
    });
  },
  delete: (companyId: string) => {
    return axiosClient.delete('/companies/delete', {
      data: { id: companyId },
    });
  },
  update: (companyId: string, payload: Payload) => {
    return axiosClient.put('/companies/update', {
      id: companyId,
      company_name: payload.companyName,
      company_address: payload.address,
      phone: payload.phone,
      email: payload.email,
    });
  },
};
