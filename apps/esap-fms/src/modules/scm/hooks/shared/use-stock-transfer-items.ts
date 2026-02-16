"use client"

import { useState } from "react"
import { DEFAULT_STOCK_TRANSFER_DETAILS } from "../../constants/stock-transfer-constants"
import { StockTransferDetails } from "../../types/inventory/stock-transfer/stock-transfer-types"


export const useStockTransferItems = (
  initialItems: StockTransferDetails[] = []
) => {
  const [stockTransferItems, setStockTransferItems] =
    useState<StockTransferDetails[]>(initialItems)

  const handleStockTransferItemsChange = (
    index: number,
    field: string,
    value: any
  ) => {
    setStockTransferItems((prev) => {
      const updated = [...prev]
      updated[index] = { ...updated[index], [field]: value }
      return updated
    })
  }

  const handleStockTransferItemsDelete = (index: number) => {
    setStockTransferItems((prevItems) =>
      prevItems.filter((_, i) => i !== index)
    )
  }

  const handleStockTransferItemsAdd = () => {
    setStockTransferItems((prevItems) => [
      ...prevItems,
      {
        ...DEFAULT_STOCK_TRANSFER_DETAILS,
        stockTransferId: 0,
        inventoryId: 0,
        productId: 0,
        currentStock: 0,
        quantity: 0,
      },



    ])
  }

  return {
    stockTransferItems,
    setStockTransferItems,
    handleStockTransferItemsChange,
    handleStockTransferItemsDelete,
    handleStockTransferItemsAdd,
  }
}
