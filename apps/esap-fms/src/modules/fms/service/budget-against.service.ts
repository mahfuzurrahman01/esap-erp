import { ApiEndpoint } from "@/server/client"
import HttpClient, { ApiEndpoint as EndpointType } from "@/utils/axios"

import {
  BudgetAgainstList,
  BudgetAgainstPaginator,
  BudgetAgainstQueryOptions,
} from "../types/budget-against"

export const BudgetAgainstService = {
  all: (params: Partial<BudgetAgainstQueryOptions>) => {
    return HttpClient.get<BudgetAgainstPaginator>(
      ApiEndpoint.fms.budgetAgainst,
      params,
      EndpointType.FMS
    )
  },
  get: (id: number) =>
    HttpClient.get<BudgetAgainstList>(
      ApiEndpoint.fms.budgetAgainstById(id),
      undefined,
      EndpointType.FMS
    ),
  create: (input: BudgetAgainstList) =>
    HttpClient.post<BudgetAgainstList>(
      ApiEndpoint.fms.createBudgetAgainst,
      input,
      false,
      EndpointType.FMS
    ),
  update: (input: BudgetAgainstList) =>
    HttpClient.put<BudgetAgainstList>(
      ApiEndpoint.fms.updateBudgetAgainst,
      input,
      false,
      EndpointType.FMS
    ),
  delete: (id: number) =>
    HttpClient.delete<BudgetAgainstList>(
      ApiEndpoint.fms.deleteBudgetAgainst(id),
      EndpointType.FMS
    ),

  bulk: (ids: number[]) =>
    HttpClient.bulkDelete<BudgetAgainstList>(
      ApiEndpoint.fms.bulkBudgetAgainst,
      ids,
      EndpointType.FMS
    ),
}
