import { AppRoutes } from '~/models/constants/Routes';
import { Contract, CreatePayload, UpdatePayload } from '~/models/modules/contracts';
import { PaginationResponse } from '~/models/modules/PaginationResponse';
import axiosClient from '../axios-client';

export type GetPagination = {
  pageNumber: number;
  pageSize: number;
  sortBy: string | undefined;
  isDesc: boolean | undefined;
};

export const contractApi = {
  getAllWithPagination: (param: GetPagination): Promise<PaginationResponse<Contract[]>> => {
    let query = '';
    if (param.sortBy) {
      query += `sortBy=${param.sortBy}&isDesc=${param.isDesc}`;
    }
    return axiosClient.get(
      `/${AppRoutes.contracts}?pageNumber=${param.pageNumber}&pageSize=${param.pageSize}&${query}`
    );
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
