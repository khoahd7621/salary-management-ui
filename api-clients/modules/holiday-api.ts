import { AppRoutes } from '~/models/constants/Routes';
import { CreatePayload, Holiday, UpdatePayload } from '~/models/modules/holidays';
import axiosClient from '../axios-client';

const routes = AppRoutes.holidays;

export const holidayApi = {
  getAll: (): Promise<Holiday[]> => {
    return axiosClient.get(`/${routes}/get-all`);
  },
  getById: (holidayId: string): Promise<Holiday> => {
    return axiosClient.get(`/${routes}/${holidayId}`);
  },
  create: (holiday: CreatePayload) => {
    return axiosClient.post(`/${routes}`, {
      name: holiday.name,
      startDate: holiday.startDate,
      endDate: holiday.endDate,
    });
  },
  update: (holiday: UpdatePayload) => {
    return axiosClient.put(`/${routes}/update`, {
      id: holiday.id,
      name: holiday.name,
      startDate: holiday.startDate,
      endDate: holiday.endDate,
    });
  },
  delete: (holidayId: string) => {
    return axiosClient.delete(`/${routes}/delete`, {
      data: { id: holidayId },
    });
  },
};
