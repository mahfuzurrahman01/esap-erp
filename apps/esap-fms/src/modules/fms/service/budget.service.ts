import {
  BudgetList,
  BudgetPaginator,
  BudgetQueryOptions,
} from "@/modules/fms/types"
import { ApiEndpoint } from "@/server/client"
import HttpClient, { ApiEndpoint as EndpointType } from "@/utils/axios"

export const BudgetService = {
  all: (params: Partial<BudgetQueryOptions>) => {
    return HttpClient.get<BudgetPaginator>(
      ApiEndpoint.fms.budget,
      params,
      EndpointType.FMS
    )
  },
  get: (id: number) =>
    HttpClient.get<BudgetList>(
      ApiEndpoint.fms.budgetById(id),
      undefined,
      EndpointType.FMS
    ),
  create: (input: BudgetList) =>
    HttpClient.post<BudgetList>(
      ApiEndpoint.fms.createBudget,
      input,
      false,
      EndpointType.FMS
    ),
  update: (input: BudgetList) =>
    HttpClient.put<BudgetList>(
      ApiEndpoint.fms.updateBudget,
      input,
      false,
      EndpointType.FMS
    ),
  delete: (id: number) =>
    HttpClient.delete(ApiEndpoint.fms.deleteBudget(id), EndpointType.FMS),

  bulk: (ids: number[]) =>
    HttpClient.bulkDelete<BudgetList>(
      ApiEndpoint.fms.bulkBudget,
      ids,
      EndpointType.FMS
    ),
}
