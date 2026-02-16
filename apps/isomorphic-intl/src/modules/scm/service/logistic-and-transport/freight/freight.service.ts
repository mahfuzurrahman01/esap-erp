import {
  Freight,
  FreightPaginator,
  FreightQueryOptions,
} from "@/modules/scm/types/logistics-and-transport/freight/freight-types"
import { ApiEndpoint } from "@/server/client"
import HttpClient from "@/utils/axios"

export const FreightService = {
  all: (params?: Partial<FreightQueryOptions>) => {
    return HttpClient.get<FreightPaginator>(
      ApiEndpoint.scm.getAllFreight,
      params
    )
  },
  get: (id: number) =>
    HttpClient.get<Freight>(ApiEndpoint.scm.getFreightById(id)),
  create: (input: Freight) =>
    HttpClient.post<Freight>(ApiEndpoint.scm.createFreight, input),
  update: (input: Freight) =>
    HttpClient.put<Freight>(ApiEndpoint.scm.updateFreight, input),
  delete: (id: number) => HttpClient.delete(ApiEndpoint.scm.deleteFreight(id)),
  bulkDelete: (ids: number[]): Promise<void> => {
    return HttpClient.bulkDelete(ApiEndpoint.scm.bulkDeleteFreight, ids)
  },
}
