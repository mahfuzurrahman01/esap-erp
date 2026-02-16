import {
  ReturnProcess,
  ReturnProcessPaginator,
  ReturnProcessQueryOptions,
} from "@/modules/scm/types/logistics-and-transport/return-process/return-process-types"
import { ApiEndpoint } from "@/server/client"
import HttpClient from "@/utils/axios"

export const ReturnProcessService = {
  all: (params?: Partial<ReturnProcessQueryOptions>) => {
    return HttpClient.get<ReturnProcessPaginator>(
      ApiEndpoint.scm.getAllReturnRequest,
      params
    )
  },
  get: (id: number) =>
    HttpClient.get<ReturnProcess>(ApiEndpoint.scm.getReturnRequestById(id)),
  create: (input: ReturnProcess) =>
    HttpClient.post<ReturnProcess>(ApiEndpoint.scm.createReturnRequest, input),
  update: (input: ReturnProcess) =>
    HttpClient.put<ReturnProcess>(ApiEndpoint.scm.updateReturnRequest, input),
  delete: (id: number) =>
    HttpClient.delete(ApiEndpoint.scm.deleteReturnRequest(id)),
  bulkDelete: (ids: number[]): Promise<void> => {
    return HttpClient.bulkDelete(ApiEndpoint.scm.bulkDeleteReturnRequest, ids)
  },
}
