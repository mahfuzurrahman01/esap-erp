import {
  Shipment,
  ShipmentPaginator,
  ShipmentQueryOptions,
} from "@/modules/scm/types/logistics-and-transport/shipment/shipment-types"
import { ApiEndpoint } from "@/server/client"
import HttpClient from "@/utils/axios"

export const ShipmentService = {
  all: (params?: Partial<ShipmentQueryOptions>) => {
    return HttpClient.get<ShipmentPaginator>(
      ApiEndpoint.scm.getAllShipment,
      params
    )
  },
  get: (id: number) =>
    HttpClient.get<Shipment>(ApiEndpoint.scm.getShipmentById(id)),
  create: (input: Shipment) =>
    HttpClient.post<Shipment>(ApiEndpoint.scm.createShipment, input),
  update: (input: Shipment) =>
    HttpClient.put<Shipment>(ApiEndpoint.scm.updateShipment, input),
  patch: (input: Shipment) =>
    HttpClient.patch<Shipment>(ApiEndpoint.scm.patchShipmentReceived, input),
  delete: (id: number) => HttpClient.delete(ApiEndpoint.scm.deleteShipment(id)),
  bulkDelete: (ids: number[]): Promise<void> => {
    return HttpClient.bulkDelete(ApiEndpoint.scm.bulkDeleteShipment, ids)
  },
}
