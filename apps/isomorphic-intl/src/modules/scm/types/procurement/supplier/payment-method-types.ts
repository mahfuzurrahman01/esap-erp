import {
  PaginatedResponse,
  QueryOptions,
} from "@/modules/scm/types/common.types"

export interface PaymentMethod {
  createdDate?: string
  updatedDate?: string
  id?: number
  name: string
  description: string
  status?: boolean
}

export interface PaymentMethodQueryOptions extends QueryOptions {}

export type PaymentMethodPaginator = PaginatedResponse<PaymentMethod>
