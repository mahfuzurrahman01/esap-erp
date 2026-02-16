import { ApiEndpoint } from "@/server/client"
import {
  SalaryStructureType,
  SalaryStructureTypeCreateInput,
  SalaryStructureTypeDataResponse,
  SalaryStructureTypeQueryOptions,
  SalaryStructureTypeUpdateInput,
} from "@/types/hrms/payroll-configuration/salary-structure-type.types"
import HttpClient from "@/utils/axios"

export const SalaryStructureTypeService = {
  all: (params: Partial<SalaryStructureTypeQueryOptions>) => {
    return HttpClient.get<SalaryStructureTypeDataResponse>(
      ApiEndpoint.hr.fetchAllSalaryStructureTypes,
      params
    )
  },

  create: (input: SalaryStructureTypeCreateInput) =>
    HttpClient.post<SalaryStructureType>(
      ApiEndpoint.hr.createSalaryStructureType,
      input
    ),

  update: (input: SalaryStructureTypeUpdateInput) =>
    HttpClient.put<SalaryStructureType>(
      `${ApiEndpoint.hr.updateSalaryStructureType}`,
      input
    ),

  delete: (id: number) =>
    HttpClient.delete(`${ApiEndpoint.hr.deleteSalaryStructureType(id)}`),

  bulkDelete: (ids: number[]) =>
    HttpClient.bulkDelete(`${ApiEndpoint.hr.deleteSalaryStructureTypes}`, ids),
}
