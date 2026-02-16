import { ApiEndpoint } from "@/server/client"
import {
  SalaryRule,
  SalaryRuleDataResponse,
  SalaryRuleQueryOptions,
} from "@/types/hrms/payroll-configuration/salary-rules.types"
import HttpClient from "@/utils/axios"

export const SalaryRuleService = {
  all: (params: Partial<SalaryRuleQueryOptions>) => {
    return HttpClient.get<SalaryRuleDataResponse>(
      ApiEndpoint.hr.fetchAllSalaryRules,
      params
    )
  },

  get: (id: number) => {
    return HttpClient.get<SalaryRule>(ApiEndpoint.hr.fetchSalaryRuleById(id))
  },

  create: (input: SalaryRule) =>
    HttpClient.post<SalaryRule>(ApiEndpoint.hr.createSalaryRule, input),

  update: (input: SalaryRule) =>
    HttpClient.put<SalaryRule>(`${ApiEndpoint.hr.updateSalaryRule}`, input),

  delete: (id: number) =>
    HttpClient.delete(`${ApiEndpoint.hr.deleteSalaryRule(id)}`),

  bulkDelete: (ids: number[]) =>
    HttpClient.bulkDelete(`${ApiEndpoint.hr.deleteSalaryRules}`, ids),
}
