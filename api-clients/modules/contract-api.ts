import { AppRoutes } from '~/models/constants/Routes';
import { Contract, CreatePayload } from '~/models/modules/contracts';
import { PaginationResponse } from '~/models/modules/PaginationResponse';
import axiosClient from '../axios-client';

export const contractApi = {
  getAllWithPagination: (): Promise<PaginationResponse<Contract[]>> => {
    return axiosClient.get(`/${AppRoutes.contracts}`);
  },
  create: (payload: CreatePayload) => {
    return axiosClient.post(`/${AppRoutes.contracts}`, payload);
  },
  delete: (contractId: string) => {
    return axiosClient.delete(`/${AppRoutes.contracts}/${contractId}`);
  },
};
