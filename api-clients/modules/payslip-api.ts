import { ApiRoutes } from '~/models/constants/Routes';
import { PaginationResponse } from '~/models/modules/PaginationResponse';
import { Payload, Payslip } from '~/models/modules/payslips';
import axiosClient from '../axios-client';

const routes = ApiRoutes.payslips;

export const payslipApi = {
  getAll: (): Promise<PaginationResponse<Payslip[]>> => {
    return axiosClient.get(`/${routes}`);
  },
  getById: (payslipId: string): Promise<Payslip> => {
    return axiosClient.get(`/${routes}/${payslipId}`);
  },
  create: (payslip: Payload) => {
    return axiosClient.post(`/${routes}`, payslip);
  },
  update: (payslipId: string, payslip: Payload) => {
    return axiosClient.put(`/${routes}/${payslipId}`, payslip);
  },
  delete: (payslipId: string) => {
    return axiosClient.delete(`/${routes}/${payslipId}`);
  },
};
