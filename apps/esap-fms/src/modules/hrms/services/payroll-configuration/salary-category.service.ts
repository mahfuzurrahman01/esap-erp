import { ApiEndpoint } from "@/server/client"
import {
  SalaryCategory,
  SalaryCategoryDataResponse,
  SalaryCategoryQueryOptions,
} from "@/types/hrms/payroll-configuration/salary-category.types"
import HttpClient from "@/utils/axios"

export const SalaryCategoryService = {
  all: (params: Partial<SalaryCategoryQueryOptions>) => {
    return HttpClient.get<SalaryCategoryDataResponse>(
      ApiEndpoint.hr.fetchAllSalaryCategories,
      params
    )
  },
  get: (id: number) => {
    return HttpClient.get<SalaryCategory>(
      ApiEndpoint.hr.fetchSalaryCategory(id)
    )
  },
  create: (input: SalaryCategory) =>
    HttpClient.post<SalaryCategory>(ApiEndpoint.hr.createSalaryCategory, input),
  update: (input: SalaryCategory) =>
    HttpClient.put<SalaryCategory>(
      `${ApiEndpoint.hr.updateSalaryCategory}`,
      input
    ),
  delete: (id: number) =>
    HttpClient.delete(`${ApiEndpoint.hr.deleteSalaryCategory(id)}`),
  bulkDelete: (ids: number[]) =>
    HttpClient.bulkDelete(`${ApiEndpoint.hr.deleteSalaryCategories}`, ids),
}
