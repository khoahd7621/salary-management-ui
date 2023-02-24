export interface CreatePayload {
  name: string;
  startDate: string;
  endDate: string;
  isPaid: boolean;
}

export interface UpdatePayload extends CreatePayload {
  id: string;
}
