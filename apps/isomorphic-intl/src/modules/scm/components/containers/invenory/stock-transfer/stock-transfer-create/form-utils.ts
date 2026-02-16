import {
  StockTransfer,
  StockTransferDetails,
} from "@/modules/scm/types/inventory/stock-transfer/stock-transfer-types"

const defaultStockTransferDetails: StockTransferDetails = {
  id: 0,
  stockTransferId: 0,
  inventoryId: 0,
  productId: 0,
  productName: "",
  currentStock: 0,
  quantity: 0,
}

export const defaultStockTransfer: StockTransfer = {
  createdBy: "",
  createdDate: "",
  updatedBy: "",
  updatedDate: "",
  id: 0,
  transferToWarehouseId: 0,
  transferToWarehouse: "",
  transferFromWarehouseId: 0,
  transferFromWarehouse: "",
  status: "",
  transferDate: new Date().toISOString(),
  stockTransferDetails: [defaultStockTransferDetails],
}
