import {
  WorkOrder,
  WorkOrderPaginator,
  WorkOrderQueryOptions,
} from "@/modules/scm/types/production-control/work-order-tracking/work-order-types"
import { ApiEndpoint } from "@/server/client"
import HttpClient from "@/utils/axios"

export const WorkOrderService = {
  all: (params?: Partial<WorkOrderQueryOptions>) => {
    return HttpClient.get<WorkOrderPaginator>(
      ApiEndpoint.scm.getAllWorkOrder,
      params
    )
  },
  get: (id: number) =>
    HttpClient.get<WorkOrder>(ApiEndpoint.scm.getWorkOrderById(id)),
  create: (input: WorkOrder) =>
    HttpClient.post<WorkOrder>(ApiEndpoint.scm.createWorkOrder, input),
  update: (input: WorkOrder) =>
    HttpClient.put<WorkOrder>(ApiEndpoint.scm.updateWorkOrder, input),
  delete: (id: number) =>
    HttpClient.delete(ApiEndpoint.scm.deleteWorkOrder(id)),
  bulkDelete: (ids: number[]): Promise<void> => {
    return HttpClient.bulkDelete(ApiEndpoint.scm.bulkDeleteWorkOrder, ids)
  },
}
