import { StockTransfer, StockTransferDetails } from "../types/inventory/stock-transfer/stock-transfer-types";

export const DEFAULT_STOCK_TRANSFER_VALUES: StockTransfer = {
  transferFromWarehouseId: 0,
  transferToWarehouseId: 0,
  status: "pending",
  transferDate: "",
  stockTransferDetails: [],
}


export const DEFAULT_STOCK_TRANSFER_DETAILS: StockTransferDetails = {
  inventoryId: 0,
  productId: 0,
  currentStock: 0,
  quantity: 0,
}