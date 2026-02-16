import {
  ReturnProcessApproval,
  ReturnProcessApprovalPaginator,
  ReturnProcessApprovalQueryOptions,
} from "@/modules/scm/types/logistics-and-transport/return-process/return-process-approval-types"
import { ApiEndpoint } from "@/server/client"
import HttpClient from "@/utils/axios"

export const ReturnProcessApprovalService = {
  all: (params?: Partial<ReturnProcessApprovalQueryOptions>) => {
    return HttpClient.get<ReturnProcessApprovalPaginator>(
      ApiEndpoint.scm.getAllReturnApproval,
      params
    )
  },
  get: (id: number) =>
    HttpClient.get<ReturnProcessApproval>(
      ApiEndpoint.scm.getReturnApprovalById(id)
    ),
  create: (input: ReturnProcessApproval) =>
    HttpClient.post<ReturnProcessApproval>(
      ApiEndpoint.scm.createReturnApproval,
      input
    ),
  update: (input: ReturnProcessApproval) =>
    HttpClient.put<ReturnProcessApproval>(
      ApiEndpoint.scm.updateReturnApproval,
      input
    ),
  delete: (id: number) =>
    HttpClient.delete(ApiEndpoint.scm.deleteReturnApproval(id)),
  bulkDelete: (ids: number[]): Promise<void> => {
    return HttpClient.bulkDelete(ApiEndpoint.scm.bulkDeleteReturnApproval, ids)
  },
}
