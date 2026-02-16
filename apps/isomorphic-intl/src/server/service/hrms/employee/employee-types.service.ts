import { ApiEndpoint } from "@/server/client"
import {
  EmployeeType,
  EmployeeTypeDataResponse,
  EmployeeTypeQueryOptions,
} from "@/types/hrms/employee/employee-types.types"
import HttpClient, { ApiEndpoint as ApiBase } from "@/utils/axios"
import { EmployeeTypePostData } from "@/validators/hrms/employee-types.schema"

export const EmployeeTypeService = {
  all: (params: Partial<EmployeeTypeQueryOptions>) => {
    return HttpClient.get<EmployeeTypeDataResponse>(
      ApiEndpoint.hr.fetchAllEmployeeTypes,
      params,
      ApiBase.HRMS
    )
  },
  create: (input: EmployeeTypePostData) =>
    HttpClient.post<EmployeeType>(
      ApiEndpoint.hr.createEmployeeType,
      input,
      false,
      ApiBase.HRMS
    ),
  update: (input: EmployeeType) =>
    HttpClient.put<EmployeeType>(
      `${ApiEndpoint.hr.updateEmployeeType}`,
      input,
      false,
      ApiBase.HRMS
    ),
  delete: (id: number) =>
    HttpClient.delete(`${ApiEndpoint.hr.deleteEmployeeType(id)}`, ApiBase.HRMS),
  bulkDelete: (ids: number[]) =>
    HttpClient.bulkDelete(
      `${ApiEndpoint.hr.deleteEmployeeTypes}`,
      ids,
      ApiBase.HRMS
    ),
}
