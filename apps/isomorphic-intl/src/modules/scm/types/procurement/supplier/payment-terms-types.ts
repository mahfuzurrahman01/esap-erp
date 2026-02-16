import {
  PaginatedResponse,
  QueryOptions,
} from "@/modules/scm/types/common.types"

export interface PaymentTerms {
  id?: number
  name: string
  description: string
  status?: boolean
}

export interface PaymentTermsQueryOptions extends QueryOptions {}

export type PaymentTermsPaginator = PaginatedResponse<PaymentTerms>
