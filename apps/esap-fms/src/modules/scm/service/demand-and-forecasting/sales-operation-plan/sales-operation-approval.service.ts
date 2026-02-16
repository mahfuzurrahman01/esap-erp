import {
  SalesOperationApproval,
  SalesOperationApprovalPaginator,
  SalesOperationApprovalQueryOptions,
} from "@/modules/scm/types/demand-and-forecasting/sales-operation-plan/sales-operation-approval-types"
import { ApiEndpoint } from "@/server/client"
import HttpClient from "@/utils/axios"

export const SalesOperationApprovalService = {
  all: (params: Partial<SalesOperationApprovalQueryOptions>) =>
    HttpClient.get<SalesOperationApprovalPaginator>(
      ApiEndpoint.scm.getAllSalesOperationApproval,
      params
    ),
  get: (id: number) =>
    HttpClient.get<SalesOperationApproval>(
      ApiEndpoint.scm.getSalesOperationApprovalById(id)
    ),
  create: (input: SalesOperationApproval) =>
    HttpClient.post<SalesOperationApproval>(
      ApiEndpoint.scm.createSalesOperationApproval,
      input
    ),
  update: (input: SalesOperationApproval) =>
    HttpClient.put<SalesOperationApproval>(
      ApiEndpoint.scm.updateSalesOperationApproval,
      input
    ),
  delete: (id: number) =>
    HttpClient.delete(ApiEndpoint.scm.deleteSalesOperationApproval(id)),
  bulkDelete: (ids: number[]): Promise<void> => {
    return HttpClient.bulkDelete(
      ApiEndpoint.scm.bulkDeleteSalesOperationApproval,
      ids
    )
  },
  search: (
    params: Partial<SalesOperationApprovalQueryOptions> & { searchTerm: string }
  ) =>
    HttpClient.get<SalesOperationApprovalPaginator>(
      ApiEndpoint.scm.getAllSalesOperationApproval,
      {
        params,
      }
    ),
}
