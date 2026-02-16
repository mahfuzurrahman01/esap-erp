import {
  RequisitionApproval,
  RequisitionApprovalPaginator,
  RequisitionApprovalQueryOptions,
} from "@/modules/scm/types/procurement/requisition/requisition-approval-types"
import { ApiEndpoint } from "@/server/client"
import HttpClient from "@/utils/axios"

export const RequisitionApprovalService = {
  all: (params: Partial<RequisitionApprovalQueryOptions>) =>
    HttpClient.get<RequisitionApprovalPaginator>(
      ApiEndpoint.scm.getAllRequisitionApproval,
      params
    ),
  get: (id: number) =>
    HttpClient.get<RequisitionApproval>(
      ApiEndpoint.scm.getRequisitionApprovalById(id)
    ),
  create: (input: RequisitionApproval) =>
    HttpClient.post<RequisitionApproval>(
      ApiEndpoint.scm.createRequisitionApproval,
      input
    ),
  update: (input: RequisitionApproval) =>
    HttpClient.put<RequisitionApproval>(
      ApiEndpoint.scm.updateRequisitionApproval,
      input
    ),
  delete: (id: number) =>
    HttpClient.delete(ApiEndpoint.scm.deleteRequisitionApproval(id)),
  bulkDelete: (ids: number[]): Promise<void> => {
    return HttpClient.bulkDelete(
      ApiEndpoint.scm.bulkDeleteRequisitionApproval,
      ids
    )
  },
}
