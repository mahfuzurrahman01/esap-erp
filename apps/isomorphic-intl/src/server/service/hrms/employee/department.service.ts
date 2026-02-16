import { ApiEndpoint } from "@/server/client"
import {
  Department,
  DepartmentQueryOptions,
  DepartmentsDataResponse,
} from "@/types/hrms/employee/department.types"
import HttpClient, { ApiEndpoint as ApiBase } from "@/utils/axios"

export const DepartmentService = {
  all: (params: Partial<DepartmentQueryOptions>) => {
    return HttpClient.get<DepartmentsDataResponse>(
      ApiEndpoint.hr.fetchAllDepartments,
      params,
      ApiBase.HRMS
    )
  },
  create: (input: Department) =>
    HttpClient.post<Department>(
      ApiEndpoint.hr.createDepartment,
      input,
      false,
      ApiBase.HRMS
    ),
  update: (input: Department) =>
    HttpClient.put<Department>(
      `${ApiEndpoint.hr.updateDepartment}`,
      input,
      false,
      ApiBase.HRMS
    ),
  delete: (id: number) =>
    HttpClient.delete(`${ApiEndpoint.hr.deleteDepartment(id)}`, ApiBase.HRMS),
  bulkDelete: (ids: number[]) =>
    HttpClient.bulkDelete(
      `${ApiEndpoint.hr.deleteDepartments}`,
      ids,
      ApiBase.HRMS
    ),
}
