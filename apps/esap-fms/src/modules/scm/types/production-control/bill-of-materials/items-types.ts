import {
  PaginatedResponse,
  QueryOptions,
} from "@/modules/scm/types/common.types"

export interface Item {
  createdDate?: string
  updatedDate?: string
  id?: number
  itemCode?: string
  itemName?: string
  description?: string
  unitPrice?: number
}

export interface ItemQueryOptions extends QueryOptions {}

export type ItemPaginator = PaginatedResponse<Item>
