import { ApiRoutes } from '~/models/constants/Routes';
import { Leave, Payload } from '~/models/modules/leaves/v2';
import axiosClientV2 from '../axios-client-v2';

const routes = ApiRoutes.leavesV2;

export const leaveApi = {
  getAll: (): Promise<Leave[]> => {
    return axiosClientV2.get(`/${routes}`);
  },
  getById: (leaveTimeId: string): Promise<Leave> => {
    return axiosClientV2.get(`/${routes}/${leaveTimeId}`);
  },
  create: (leave: Payload) => {
    return axiosClientV2.post(`/${routes}`, leave);
  },
  update: (leaveTimeId: string, leave: Payload) => {
    return axiosClientV2.put(`/${routes}/${leaveTimeId}`, leave);
  },
  delete: (leaveTimeId: string) => {
    return axiosClientV2.delete(`/${routes}/${leaveTimeId}`);
  },
};
