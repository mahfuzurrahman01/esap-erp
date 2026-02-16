"use client"

import { useState } from "react"

import { DEFAULT_STOCK_TRANSFER_DETAILS } from "../../constants/stock-transfer-constants"
import { StockTransferDetails } from "../../types/inventory/stock-transfer/stock-transfer-types"

export const useStockTransferItems = (
  initialItems: StockTransferDetails[] = []
) => {
  const [stockTransferItems, setStockTransferItems] =
    useState<StockTransferDetails[]>(initialItems)

  const [validationErrors, setValidationErrors] = useState<
    Record<number, string>
  >({})

  const validateQuantity = (
    index: number,
    currentStock: number,
    quantity: number
  ): boolean => {
    if (quantity <= 0) {
      setValidationErrors((prev) => ({
        ...prev,
        [index]: "Quantity must be greater than zero",
      }))
      return false
    }
    if (quantity > currentStock) {
      setValidationErrors((prev) => ({
        ...prev,
        [index]: `Transfer quantity cannot exceed current stock (${currentStock})`,
      }))
      return false
    }
    setValidationErrors((prev) => {
      const newErrors = { ...prev }
      delete newErrors[index]
      return newErrors
    })
    return true
  }

  const handleStockTransferItemsChange = (
    index: number,
    field: string,
    value: any
  ) => {
    setStockTransferItems((prev) => {
      const updated = [...prev]
      updated[index] = { ...updated[index], [field]: value }

      if (field === "quantity") {
        const currentStock = Number(updated[index].currentStock) || 0
        const quantity = Number(value) || 0
        validateQuantity(index, currentStock, quantity)
      }

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
    validationErrors,
  }
}
