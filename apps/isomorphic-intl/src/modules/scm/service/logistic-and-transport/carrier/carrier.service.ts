import {
  Carrier,
  CarrierPaginator,
  CarrierQueryOptions,
} from "@/modules/scm/types/logistics-and-transport/carriers/carriers-types"
import { ApiEndpoint } from "@/server/client"
import HttpClient from "@/utils/axios"

export const CarrierService = {
  all: (params?: Partial<CarrierQueryOptions>) => {
    return HttpClient.get<CarrierPaginator>(
      ApiEndpoint.scm.getAllCarriers,
      params
    )
  },
  get: (id: number) =>
    HttpClient.get<Carrier>(ApiEndpoint.scm.getCarrierById(id)),
  create: (input: Carrier) =>
    HttpClient.post<Carrier>(ApiEndpoint.scm.createCarrier, input),
  update: (input: Carrier) =>
    HttpClient.put<Carrier>(ApiEndpoint.scm.updateCarrier, input),
  delete: (id: number) => HttpClient.delete(ApiEndpoint.scm.deleteCarrier(id)),
  bulkDelete: (ids: number[]): Promise<void> => {
    return HttpClient.bulkDelete(ApiEndpoint.scm.bulkDeleteCarrier, ids)
  },
}
