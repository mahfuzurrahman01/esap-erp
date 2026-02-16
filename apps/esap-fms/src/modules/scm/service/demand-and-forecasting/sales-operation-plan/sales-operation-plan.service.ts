import {
  SalesOperationPlan,
  SalesOperationPlanPaginator,
  SalesOperationPlanQueryOptions,
} from "@/modules/scm/types/demand-and-forecasting/sales-operation-plan/sales-operation-plan-types"
import { ApiEndpoint } from "@/server/client"
import HttpClient from "@/utils/axios"

export const SalesOperationPlanService = {
  all: (params?: Partial<SalesOperationPlanQueryOptions>) => {
    return HttpClient.get<SalesOperationPlanPaginator>(
      ApiEndpoint.scm.getAllSalesOperationPlan,
      params
    )
  },
  get: (id: number) =>
    HttpClient.get<SalesOperationPlan>(
      ApiEndpoint.scm.getSalesOperationPlanById(id)
    ),
  create: (input: SalesOperationPlan) =>
    HttpClient.post<SalesOperationPlan>(
      ApiEndpoint.scm.createSalesOperationPlan,
      input
    ),
  update: (input: SalesOperationPlan) =>
    HttpClient.put<SalesOperationPlan>(
      ApiEndpoint.scm.updateSalesOperationPlan,
      input
    ),
  delete: (id: number) =>
    HttpClient.delete(ApiEndpoint.scm.deleteSalesOperationPlan(id)),
  bulkDelete: (ids: number[]): Promise<void> => {
    return HttpClient.bulkDelete(
      ApiEndpoint.scm.bulkDeleteSalesOperationPlan,
      ids
    )
  },
}
