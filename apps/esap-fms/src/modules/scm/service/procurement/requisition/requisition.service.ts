import {
  Requisition,
  RequisitionInput,
  RequisitionPaginator,
  RequisitionQueryOptions,
  RequisitionUpdate,
} from "@/modules/scm/types/procurement/requisition/requisition-types"
import { ApiEndpoint } from "@/server/client"
import HttpClient from "@/utils/axios"

export const RequisitionService = {
  all: (params: Partial<RequisitionQueryOptions>) =>
    HttpClient.get<RequisitionPaginator>(
      ApiEndpoint.scm.getAllRequisition,
      params
    ),
  get: (id: number) =>
    HttpClient.get<Requisition>(ApiEndpoint.scm.getRequisitionById(id)),

  create: (input: RequisitionInput) =>
    HttpClient.post<RequisitionInput>(
      ApiEndpoint.scm.createRequisition,
      input,
      true
    ),

  update: (input: RequisitionUpdate) =>
    HttpClient.put<RequisitionUpdate>(
      ApiEndpoint.scm.updateRequisition,
      input,
      true
    ),

  delete: (id: number) =>
    HttpClient.delete<Requisition>(ApiEndpoint.scm.deleteRequisition(id)),

  bulkDelete: (ids: number[]): Promise<void> => {
    return HttpClient.bulkDelete(ApiEndpoint.scm.bulkDeleteRequisition, ids)
  },

  search: (params: {
    pageIndex: number
    pageSize: number
    searchTerm: string
  }) =>
    HttpClient.get<RequisitionPaginator>(
      ApiEndpoint.scm.searchRequisition(params),
      {
        params,
      }
    ),

  // export: (params: Partial<RequisitionQueryOptions>) =>
  //   HttpClient.get<Blob>(ApiEndpoint.scm.exportRequisition, {
  //     params,
  //     responseType: "blob",
  //   }),
}
