export interface CreatePayload {
  name: string;
  startDate: string;
  endDate: string;
}

export interface UpdatePayload extends CreatePayload {
  id: string;
}
