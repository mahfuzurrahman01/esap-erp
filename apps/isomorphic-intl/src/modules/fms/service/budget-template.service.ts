import {
  BudgetTemplateList,
  BudgetTemplatePaginator,
  BudgetTemplateQueryOptions,
} from "@/modules/fms/types"
import { ApiEndpoint } from "@/server/client"
import HttpClient, { ApiEndpoint as ApiBase } from "@/utils/axios"

export const budgetTemplate = {
  all: (params: Partial<BudgetTemplateQueryOptions>) => {
    return HttpClient.get<BudgetTemplatePaginator>(
      ApiEndpoint.fms.budgetDistribution,
      params,
      ApiBase.FMS
    )
  },
  get: (id: number) =>
    HttpClient.get<BudgetTemplateList>(
      ApiEndpoint.fms.budgetDistributionById(id),
      undefined,
      ApiBase.FMS
    ),
  create: (input: BudgetTemplateList) =>
    HttpClient.post<BudgetTemplateList>(
      ApiEndpoint.fms.createBudgetDistribution,
      input,
      false,
      ApiBase.FMS
    ),
  update: (input: BudgetTemplateList) =>
    HttpClient.put<BudgetTemplateList>(
      ApiEndpoint.fms.updateBudgetDistribution,
      input,
      false,
      ApiBase.FMS
    ),
  delete: (id: number) =>
    HttpClient.delete(
      ApiEndpoint.fms.deleteBudgetDistribution(id),

      ApiBase.FMS
    ),

  bulk: (ids: number[]) =>
    HttpClient.bulkDelete<BudgetTemplateList>(
      ApiEndpoint.fms.bulkBudgetDistribution,
      ids,
      ApiBase.FMS
    ),
}
