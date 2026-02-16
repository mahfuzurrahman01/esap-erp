import { ApiEndpoint } from "@/server/client"
import {
  SalaryStructure,
  SalaryStructureCreateInput,
  SalaryStructureDataResponse,
  SalaryStructureQueryOptions,
  SalaryStructureUpdateInput,
} from "@/types/hrms/payroll-configuration/salary-structure.types"
import HttpClient from "@/utils/axios"

export const SalaryStructureService = {
  all: (params: Partial<SalaryStructureQueryOptions>) => {
    return HttpClient.get<SalaryStructureDataResponse>(
      ApiEndpoint.hr.fetchAllSalaryStructures,
      params
    )
  },

  get: (id: number) => {
    return HttpClient.get<SalaryStructure>(
      ApiEndpoint.hr.fetchSalaryStructureById(id)
    )
  },

  create: (input: SalaryStructureCreateInput) =>
    HttpClient.post<SalaryStructure>(
      ApiEndpoint.hr.createSalaryStructure,
      input
    ),

  update: (input: SalaryStructureUpdateInput) =>
    HttpClient.put<SalaryStructure>(
      `${ApiEndpoint.hr.updateSalaryStructure}`,
      input
    ),

  delete: (id: number) =>
    HttpClient.delete(`${ApiEndpoint.hr.deleteSalaryStructure(id)}`),

  bulkDelete: (ids: number[]) =>
    HttpClient.bulkDelete(`${ApiEndpoint.hr.deleteSalaryStructures}`, ids),
}
