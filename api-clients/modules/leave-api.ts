import { ApiRoutes } from '~/models/constants/Routes';
import { CreatePayload, Leave, UpdatePayload } from '~/models/modules/leaves';
import axiosClient from '../axios-client-v2';

const routes = ApiRoutes.leavesV2;

export const leaveApi = {
  getAll: (): Promise<Leave[]> => {
    return axiosClient.get(`/${routes}/all`);
  },
  getById: (leaveTimeId: string): Promise<Leave> => {
    return axiosClient.get(`/${routes}/${leaveTimeId}?id=${leaveTimeId}`);
  },
  create: (leave: CreatePayload) => {
    return axiosClient.post(`/${routes}`, leave);
  },
  update: (leave: UpdatePayload) => {
    return axiosClient.put(`/${routes}`, leave);
  },
  delete: (leaveTimeId: string) => {
    return axiosClient.delete(`/${routes}/${leaveTimeId}`, {
      data: { id: leaveTimeId },
    });
  },
};
