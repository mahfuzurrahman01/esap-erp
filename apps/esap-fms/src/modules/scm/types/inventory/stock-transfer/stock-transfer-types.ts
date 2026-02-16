import {
  PaginatedResponse,
  QueryOptions,
} from "@/modules/scm/types/common.types"

export interface StockTransferDetails {
  id?: number
  stockTransferId?: number
  inventoryId?: number
  productId?: number
  productName?: string
  currentStock?: number
  quantity?: number
}

export interface StockTransfer {
  createdBy?: string
  createdDate?: string
  updatedBy?: string
  updatedDate?: string
  id?: number
  stockTransferNo?: string
  transferToWarehouseId?: number
  transferToWarehouse?: string
  transferFromWarehouseId?: number
  transferFromWarehouse?: string
  status?: string
  approvalStatus?: string
  transferDate?: string
  stockTransferDetails: StockTransferDetails[]
}

export interface StockTransferQueryOptions extends QueryOptions {
  stockTransferNo?: string
  status?: string
}

export type StockTransferPaginator = PaginatedResponse<StockTransfer>
