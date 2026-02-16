import {
  PurchasedOrderApproval,
  PurchasedOrderApprovalPaginator,
  PurchasedOrderApprovalQueryOptions,
} from "@/modules/scm/types/procurement/purchased-order/purchased-order-approval-types"
import { ApiEndpoint } from "@/server/client"
import HttpClient from "@/utils/axios"

export const PurchasedOrderApprovalService = {
  all: (params: Partial<PurchasedOrderApprovalQueryOptions>) =>
    HttpClient.get<PurchasedOrderApprovalPaginator>(
      ApiEndpoint.scm.getAllPurchaseOrderApproval,
      params
    ),
  get: (id: number) =>
    HttpClient.get<PurchasedOrderApproval>(
      ApiEndpoint.scm.getPurchaseOrderApprovalById(id)
    ),
  create: (input: PurchasedOrderApproval) =>
    HttpClient.post<PurchasedOrderApproval>(
      ApiEndpoint.scm.createPurchaseOrderApproval,
      input
    ),
  update: (input: PurchasedOrderApproval) =>
    HttpClient.put<PurchasedOrderApproval>(
      ApiEndpoint.scm.updatePurchaseOrderApproval,
      input
    ),
  delete: (id: number) =>
    HttpClient.delete(ApiEndpoint.scm.deletePurchaseOrderApproval(id)),
  bulkDelete: (ids: number[]): Promise<void> => {
    return HttpClient.bulkDelete(
      ApiEndpoint.scm.bulkDeletePurchaseOrderApproval,
      ids
    )
  },
}
