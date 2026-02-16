import {
  PaginatedResponse,
  QueryOptions,
} from "@/modules/scm/types/common.types"

export interface ReturnProcess {
  createdDate?: string
  updatedDate?: string
  id?: number
  shipmentId?: number
  productId?: number
  productName?: string
  reasonForReturn?: string
  quantityReturned?: number
  requestDate?: string
  returnStatus?: string
  approvalStatus?: string
}

export interface ReturnProcessQueryOptions extends QueryOptions {
  productName?: string
  returnStatus?: string
}

export type ReturnProcessPaginator = PaginatedResponse<ReturnProcess>
