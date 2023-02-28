export interface CreatePayload {
  startDate: string;
  endDate: string;
  reason: string;
  employeeId: string;
}

export interface UpdatePayload extends CreatePayload {
  leaveTimeId: string;
}
