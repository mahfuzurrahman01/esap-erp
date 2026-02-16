import { ApiEndpoint } from "@/server/client"
import {
  EmployeeContract,
  EmployeeContractDataResponse,
  EmployeeContractQueryOptions,
} from "@/types/hrms/payroll/employee-contract.types"
import HttpClient from "@/utils/axios"

export const EmployeeContractService = {
  all: (params: Partial<EmployeeContractQueryOptions>) => {
    return HttpClient.get<EmployeeContractDataResponse>(
      ApiEndpoint.hr.fetchAllEmployeeContracts,
      params
    )
  },

  getByEmployeeId: (id: number) => {
    return HttpClient.get<EmployeeContract>(
      ApiEndpoint.hr.fetchEmployeeContractByEmployeeId(id)
    )
  },

  get: (id: number) => {
    return HttpClient.get<EmployeeContract>(
      ApiEndpoint.hr.fetchEmployeeContractById(id)
    )
  },

  create: (input: EmployeeContract) =>
    HttpClient.post<EmployeeContract>(
      ApiEndpoint.hr.createEmployeeContract,
      input
    ),

  update: (input: EmployeeContract) =>
    HttpClient.put<EmployeeContract>(
      `${ApiEndpoint.hr.updateEmployeeContract}`,
      input
    ),

  delete: (id: number) =>
    HttpClient.delete(`${ApiEndpoint.hr.deleteEmployeeContract(id)}`),

  bulkDelete: (ids: number[]) =>
    HttpClient.bulkDelete(`${ApiEndpoint.hr.deleteEmployeeContracts}`, ids),
}
