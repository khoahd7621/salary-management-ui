import { ApiRoutes } from '~/models/constants/Routes';
import { CreatePayload, Overtime, UpdatePayload } from '~/models/modules/overtimes';
import axiosClient from '../axios-client';

const routes = ApiRoutes.overtimes;

export const overtimeApi = {
  getAll: (): Promise<Overtime[]> => {
    return axiosClient.get(`/${routes}/all`);
  },
  getById: (overtimeId: string): Promise<Overtime> => {
    return axiosClient.get(`/${routes}/${overtimeId}?id=${overtimeId}`);
  },
  create: (overtime: CreatePayload) => {
    return axiosClient.post(`/${routes}`, overtime);
  },
  update: (overtime: UpdatePayload) => {
    return axiosClient.put(`/${routes}/${overtime.id}`, overtime);
  },
  delete: (overtimeId: string) => {
    return axiosClient.delete(`/${routes}/${overtimeId}`, {
      data: { id: overtimeId },
    });
  },
};
