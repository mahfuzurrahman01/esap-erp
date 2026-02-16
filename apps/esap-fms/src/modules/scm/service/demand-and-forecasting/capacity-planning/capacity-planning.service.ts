import {
  CapacityPlanning,
  CapacityPlanningPaginator,
  CapacityPlanningQueryOptions,
} from "@/modules/scm/types/demand-and-forecasting/capacity-planning/capacity-planning-types"
import { ApiEndpoint } from "@/server/client"
import HttpClient from "@/utils/axios"

export const CapacityPlanningService = {
  all: (params?: Partial<CapacityPlanningQueryOptions>) => {
    return HttpClient.get<CapacityPlanningPaginator>(
      ApiEndpoint.scm.getAllCapacityPlanning,
      params
    )
  },
  get: (id: number) =>
    HttpClient.get<CapacityPlanning>(
      ApiEndpoint.scm.getCapacityPlanningById(id)
    ),
  create: (input: CapacityPlanning) =>
    HttpClient.post<CapacityPlanning>(
      ApiEndpoint.scm.createCapacityPlanning,
      input
    ),
  update: (input: CapacityPlanning) =>
    HttpClient.put<CapacityPlanning>(
      ApiEndpoint.scm.updateCapacityPlanning,
      input
    ),
  delete: (id: number) =>
    HttpClient.delete(ApiEndpoint.scm.deleteCapacityPlanning(id)),
  bulkDelete: (ids: number[]): Promise<void> => {
    return HttpClient.bulkDelete(
      ApiEndpoint.scm.bulkDeleteCapacityPlanning,
      ids
    )
  },
}
