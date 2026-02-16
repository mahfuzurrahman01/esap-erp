import { ApiEndpoint } from "@/server/client"
import {
  Payslip,
  payslipPaginatedResponse,
  payslipQueryOptions,
} from "@/types/hrms/payroll/payslip.types"
import HttpClient from "@/utils/axios"

export const PayslipService = {
  all: (params: Partial<payslipQueryOptions>) => {
    return HttpClient.get<payslipPaginatedResponse>(
      ApiEndpoint.hr.fetchAllPayslips,
      params
    )
  },

  get: (id: number) => {
    return HttpClient.get<Payslip>(ApiEndpoint.hr.fetchPayslipById(id))
  },

  create: (input: Payslip) =>
    HttpClient.post<Payslip>(ApiEndpoint.hr.createPayslip, input),

  update: (input: Payslip) =>
    HttpClient.put<Payslip>(`${ApiEndpoint.hr.updatePayslip}`, input),

  delete: (id: number) =>
    HttpClient.delete(`${ApiEndpoint.hr.deletePayslip(id)}`),

  bulkDelete: (ids: number[]) =>
    HttpClient.bulkDelete(`${ApiEndpoint.hr.deletePayslips}`, ids),
  updatePayslipStatus: (input: { serialNumber: string; status: string }) =>
    HttpClient.patch(`${ApiEndpoint.hr.updatePayslipStatus}`, input),
}
