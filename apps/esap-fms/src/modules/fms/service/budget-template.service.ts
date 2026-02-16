import {
  BudgetTemplateList,
  BudgetTemplatePaginator,
  BudgetTemplateQueryOptions,
} from "@/modules/fms/types"
import { ApiEndpoint } from "@/server/client"
import HttpClient, { ApiEndpoint as EndpointType } from "@/utils/axios"

export const budgetTemplate = {
  all: (params: Partial<BudgetTemplateQueryOptions>) => {
    return HttpClient.get<BudgetTemplatePaginator>(
      ApiEndpoint.fms.budgetDistribution,
      params,
      EndpointType.FMS
    )
  },
  get: (id: number) =>
    HttpClient.get<BudgetTemplateList>(
      ApiEndpoint.fms.budgetDistributionById(id),
      undefined,
      EndpointType.FMS
    ),
  create: (input: BudgetTemplateList) =>
    HttpClient.post<BudgetTemplateList>(
      ApiEndpoint.fms.createBudgetDistribution,
      input,
      false,
      EndpointType.FMS
    ),
  update: (input: BudgetTemplateList) =>
    HttpClient.put<BudgetTemplateList>(
      ApiEndpoint.fms.updateBudgetDistribution,
      input,
      false,
      EndpointType.FMS
    ),
  delete: (id: number) =>
    HttpClient.delete(
      ApiEndpoint.fms.deleteBudgetDistribution(id),
      EndpointType.FMS
    ),

  bulk: (ids: number[]) =>
    HttpClient.bulkDelete<BudgetTemplateList>(
      ApiEndpoint.fms.bulkBudgetDistribution,
      ids,
      EndpointType.FMS
    ),
}
