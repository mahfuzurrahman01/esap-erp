import {
  PaginatedResponse,
  QueryOptions,
} from "@/modules/scm/types/common.types"

export interface Shipment {
  createdDate?: string
  updatedDate?: string
  id?: number
  stockTransferId?: number
  trackingNo?: string
  carrierId?: number
  carrierName?: string
  shipmentDate?: string
  expectedDeliveryDate?: string
  currentStatus?: string
  receivedStatus?: string
  receivedNote?: string
}

export interface ShipmentQueryOptions extends QueryOptions {
  shipmentId?: string
  carrierName?: string
}

export type ShipmentPaginator = PaginatedResponse<Shipment>
