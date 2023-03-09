export interface CreatePayload {
  file: string;
  startDate: string;
  endDate: string;
  job: string;
  basicSalary: number;
  bhxh: number;
  bhyt: number;
  bhtn: number;
  tax: number;
  partnerId: string;
  partnerPrice: number;
  employeeId: string;
  contractType: string;
  salaryType: string;
}

export interface UpdatePayload extends CreatePayload {
  id: string;
}
