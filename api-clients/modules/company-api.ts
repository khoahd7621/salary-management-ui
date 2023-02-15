import { Company } from '~/models/modules/companies';
import axiosClient from '../axios-client';

export const companyApi = {
  getAll: (): Promise<Company[]> => {
    return axiosClient.get('/companys/getAllCompanys');
  },
};
