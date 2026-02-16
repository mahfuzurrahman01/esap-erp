import { ApiEndpoint } from "@/server/client"
import {
  EmploymentType,
  EmploymentTypeDataResponse,
  EmploymentTypeQueryOptions,
} from "@/types/hrms/employee/employment-types.types"
import HttpClient from "@/utils/axios"
import { EmploymentPostFormInput } from "@/validators/hrms/employment-types.schema"

export const EmploymentTypeService = {
  all: (params: Partial<EmploymentTypeQueryOptions>) => {
    return HttpClient.get<EmploymentTypeDataResponse>(
      ApiEndpoint.hr.fetchAllEmploymentTypes,
      params
    )
  },
  create: (input: EmploymentPostFormInput) =>
    HttpClient.post<EmploymentType>(ApiEndpoint.hr.createEmploymentType, input),
  update: (input: EmploymentType) =>
    HttpClient.put<EmploymentType>(
      `${ApiEndpoint.hr.updateEmploymentType}`,
      input
    ),
  delete: (id: number) =>
    HttpClient.delete(`${ApiEndpoint.hr.deleteEmploymentType(id)}`),
  bulkDelete: (ids: number[]) =>
    HttpClient.bulkDelete(`${ApiEndpoint.hr.deleteEmploymentTypes}`, ids),
}
