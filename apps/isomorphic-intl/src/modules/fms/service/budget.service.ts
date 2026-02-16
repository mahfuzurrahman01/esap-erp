import {
  BudgetList,
  BudgetPaginator,
  BudgetQueryOptions,
} from "@/modules/fms/types"
import { ApiEndpoint } from "@/server/client"
import HttpClient, { ApiEndpoint as ApiBase } from "@/utils/axios"

export const BudgetService = {
  all: (params: Partial<BudgetQueryOptions>) => {
    return HttpClient.get<BudgetPaginator>(
      ApiEndpoint.fms.budget,
      params,
      ApiBase.FMS
    )
  },
  get: (id: number) =>
    HttpClient.get<BudgetList>(
      ApiEndpoint.fms.budgetById(id),
      undefined,
      ApiBase.FMS
    ),
  create: (input: BudgetList) =>
    HttpClient.post<BudgetList>(
      ApiEndpoint.fms.createBudget,
      input,
      false,
      ApiBase.FMS
    ),
  update: (input: BudgetList) =>
    HttpClient.put<BudgetList>(
      ApiEndpoint.fms.updateBudget,
      input,
      false,
      ApiBase.FMS
    ),
  delete: (id: number) =>
    HttpClient.delete(ApiEndpoint.fms.deleteBudget(id), ApiBase.FMS),

  bulk: (ids: number[]) =>
    HttpClient.bulkDelete<BudgetList>(
      ApiEndpoint.fms.bulkBudget,
      ids,
      ApiBase.FMS
    ),
}
