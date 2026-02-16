import { ApiEndpoint } from "@/server/client"
import {
  EmployeeType,
  EmployeeTypeDataResponse,
  EmployeeTypeQueryOptions,
} from "@/types/hrms/employee/employee-types.types"
import HttpClient from "@/utils/axios"
import { EmployeeTypePostData } from "@/validators/hrms/employee-types.schema"

export const EmployeeTypeService = {
  all: (params: Partial<EmployeeTypeQueryOptions>) => {
    return HttpClient.get<EmployeeTypeDataResponse>(
      ApiEndpoint.hr.fetchAllEmployeeTypes,
      params
    )
  },
  create: (input: EmployeeTypePostData) =>
    HttpClient.post<EmployeeType>(ApiEndpoint.hr.createEmployeeType, input),
  update: (input: EmployeeType) =>
    HttpClient.put<EmployeeType>(`${ApiEndpoint.hr.updateEmployeeType}`, input),
  delete: (id: number) =>
    HttpClient.delete(`${ApiEndpoint.hr.deleteEmployeeType(id)}`),
  bulkDelete: (ids: number[]) =>
    HttpClient.bulkDelete(`${ApiEndpoint.hr.deleteEmployeeTypes}`, ids),
}
