import { ApiEndpoint } from "@/server/client"
import {
  Employee,
  EmployeeFullDetails,
  EmployeeQueryOptions,
  EmployeesDataResponse,
} from "@/types/hrms/employee/employee.types"
import HttpClient from "@/utils/axios"

export const EmployeeService = {
  all: (params: Partial<EmployeeQueryOptions>) => {
    return HttpClient.get<EmployeesDataResponse>(
      ApiEndpoint.hr.fetchAllEmployees,
      params
    )
  },
  get: (id: number) =>
    HttpClient.get<EmployeeFullDetails>(
      `${ApiEndpoint.hr.fetchEmployeeById(id)}`
    ),
  create: (input: Employee) =>
    HttpClient.post<Employee>(ApiEndpoint.hr.createEmployee, input, true),
  update: (input: Employee) =>
    HttpClient.put<Employee>(`${ApiEndpoint.hr.updateEmployee}`, input, true),

  delete: (id: number) =>
    HttpClient.delete(`${ApiEndpoint.hr.deleteEmployee(id)}`),
  bulkDelete: (ids: number[]) =>
    HttpClient.bulkDelete(`${ApiEndpoint.hr.deleteEmployees}`, ids),
}
