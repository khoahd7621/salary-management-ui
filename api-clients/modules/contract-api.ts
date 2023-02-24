import { AppRoutes } from '~/models/constants/Routes';
import { Contract, CreatePayload, UpdatePayload } from '~/models/modules/contracts';
import { PaginationResponse } from '~/models/modules/PaginationResponse';
import axiosClient from '../axios-client';

export const contractApi = {
  getAllWithPagination: (): Promise<PaginationResponse<Contract[]>> => {
    return axiosClient.get(`/${AppRoutes.contracts}`);
  },
  getById: (contractId: string): Promise<Contract> => {
    return axiosClient.get(`/${AppRoutes.contracts}/${contractId}`);
  },
  create: (payload: CreatePayload) => {
    return axiosClient.post(`/${AppRoutes.contracts}`, payload);
  },
  update: (payload: UpdatePayload) => {
    return axiosClient.put(`/${AppRoutes.contracts}/${payload.id}`, payload);
  },
  delete: (contractId: string) => {
    return axiosClient.delete(`/${AppRoutes.contracts}/${contractId}`);
  },
};
