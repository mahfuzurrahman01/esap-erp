import {
  WorkCenter,
  WorkCenterPaginator,
  WorkCenterQueryOptions,
} from "@/modules/scm/types/production-control/work-order-tracking/work-center-types"
import { ApiEndpoint } from "@/server/client"
import HttpClient from "@/utils/axios"

export const WorkCenterService = {
  all: (params?: Partial<WorkCenterQueryOptions>) => {
    return HttpClient.get<WorkCenterPaginator>(
      ApiEndpoint.scm.getAllWorkCenter,
      params
    )
  },
  get: (id: number) =>
    HttpClient.get<WorkCenter>(ApiEndpoint.scm.getWorkCenterById(id)),
  create: (input: WorkCenter) =>
    HttpClient.post<WorkCenter>(ApiEndpoint.scm.createWorkCenter, input),
  update: (input: WorkCenter) =>
    HttpClient.put<WorkCenter>(ApiEndpoint.scm.updateWorkCenter, input),
  delete: (id: number) =>
    HttpClient.delete(ApiEndpoint.scm.deleteWorkCenter(id)),
  bulkDelete: (ids: number[]): Promise<void> => {
    return HttpClient.bulkDelete(ApiEndpoint.scm.bulkDeleteWorkCenter, ids)
  },
}
