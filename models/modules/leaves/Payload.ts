export interface CreatePayload {
  startDate: string;
  endDate: string;
  reason: string;
  status: string;
  employeeId: string;
}

export interface UpdatePayload extends CreatePayload {
  leaveTimeId: string;
}
