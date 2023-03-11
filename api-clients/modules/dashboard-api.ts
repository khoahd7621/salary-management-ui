import { ApiRoutes } from '~/models/constants/Routes';
import { Revenue, TotalData } from '~/models/modules/dashboard';
import { Data } from '~/models/modules/dashboard/Data';
import axiosClient from '../axios-client';

const route = ApiRoutes.dashboard;

export const dashboardApi = {
  getTotalData: (): Promise<TotalData> => {
    return axiosClient.get(`/${route}/total-data`);
  },
  getContractData: (): Promise<Data[]> => {
    return axiosClient.get(`/${route}/contract-data`);
  },
  getPayslipByType: (): Promise<Data[]> => {
    return axiosClient.get(`/${route}/payslip-by-type`);
  },
  getRevenueAndCost: (): Promise<Revenue[]> => {
    return axiosClient.get(`/${route}/revenue-and-cost`);
  },
};
