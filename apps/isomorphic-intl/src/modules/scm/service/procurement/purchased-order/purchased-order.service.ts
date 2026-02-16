import {
  PurchasedOrder,
  PurchasedOrderInput,
  PurchasedOrderPaginator,
  PurchasedOrderUpdate,
} from "@/modules/scm/types/procurement/purchased-order/purchased-order-types"
import { ApiEndpoint } from "@/server/client"
import HttpClient from "@/utils/axios"

export const PurchasedOrderService = {
  all: (params: Partial<PurchasedOrderPaginator>) =>
    HttpClient.get<PurchasedOrderPaginator>(
      ApiEndpoint.scm.getAllPurchaseOrder,
      params
    ),
  get: (id: number) =>
    HttpClient.get<PurchasedOrder>(ApiEndpoint.scm.getPurchaseOrderById(id)),
  create: (input: PurchasedOrderInput) =>
    HttpClient.post<PurchasedOrderInput>(
      ApiEndpoint.scm.createPurchaseOrder,
      input,
      true
    ),
  update: (input: PurchasedOrderUpdate) =>
    HttpClient.put<PurchasedOrderUpdate>(
      ApiEndpoint.scm.updatePurchaseOrder,
      input,
      true
    ),
  delete: (id: number) =>
    HttpClient.delete(ApiEndpoint.scm.deletePurchaseOrder(id)),
  bulkDelete: (ids: number[]): Promise<void> => {
    return HttpClient.bulkDelete(ApiEndpoint.scm.bulkDeletePurchaseOrder, ids)
  },
  search: (params: { pageIndex: number; pageSize: number; search?: string }) =>
    HttpClient.get<PurchasedOrderPaginator>(
      ApiEndpoint.scm.searchPurchaseOrder(params),
      {
        params,
      }
    ),
}
