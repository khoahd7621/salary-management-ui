import { AxiosProgressEvent } from 'axios';
import { AppRoutes } from '~/models/constants/Routes';
import { CreatePayload, Holiday, UpdatePayload } from '~/models/modules/holidays';
import axiosClient from '../axios-client';

const routes = AppRoutes.holidays;

export const holidayApi = {
  getAll: (): Promise<Holiday[]> => {
    return axiosClient.get(`/${routes}`);
  },
  getById: (holidayId: string): Promise<Holiday> => {
    return axiosClient.get(`/${routes}/${holidayId}?id=${holidayId}`);
  },
  create: (holiday: CreatePayload) => {
    return axiosClient.post(`/${routes}`, {
      holidayName: holiday.name,
      startDate: holiday.startDate,
      endDate: holiday.endDate,
    });
  },
  import: (file: any, onUploadProgress: (_progressEvent: AxiosProgressEvent) => void): Promise<string> => {
    const form = new FormData();
    form.append('file', file);
    return axiosClient.post(`/${routes}/import`, form, {
      onUploadProgress: onUploadProgress,
    });
  },
  update: (holiday: UpdatePayload) => {
    return axiosClient.put(`/${routes}/${holiday.id}`, {
      holidayName: holiday.name,
      startDate: holiday.startDate,
      endDate: holiday.endDate,
    });
  },
  delete: (holidayId: string) => {
    return axiosClient.delete(`/${routes}/${holidayId}`, {
      data: { id: holidayId },
    });
  },
};
