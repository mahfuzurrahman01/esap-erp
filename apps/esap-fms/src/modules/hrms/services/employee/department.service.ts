import { ApiEndpoint } from "@/server/client"
import {
  Department,
  DepartmentQueryOptions,
  DepartmentsDataResponse,
} from "@/types/hrms/employee/department.types"
import HttpClient from "@/utils/axios"

export const DepartmentService = {
  all: (params: Partial<DepartmentQueryOptions>) => {
    return HttpClient.get<DepartmentsDataResponse>(
      ApiEndpoint.hr.fetchAllDepartments,
      params
    )
  },
  create: (input: Department) =>
    HttpClient.post<Department>(ApiEndpoint.hr.createDepartment, input),
  update: (input: Department) =>
    HttpClient.put<Department>(`${ApiEndpoint.hr.updateDepartment}`, input),
  delete: (id: number) =>
    HttpClient.delete(`${ApiEndpoint.hr.deleteDepartment(id)}`),
  bulkDelete: (ids: number[]) =>
    HttpClient.bulkDelete(`${ApiEndpoint.hr.deleteDepartments}`, ids),
}
