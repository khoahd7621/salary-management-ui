export interface CreatePayload {
  overtimeDate: string;
  hours: number;
  employeeId: string;
}

export interface UpdatePayload extends CreatePayload {
  id: string;
}
