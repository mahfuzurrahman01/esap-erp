"use client"

import { useEffect, useState } from "react"

import { useAtom } from "jotai"
import { SubmitHandler } from "react-hook-form"

import { DEFAULT_STOCK_TRANSFER_VALUES } from "@/modules/scm/constants/stock-transfer-constants"
import {
  useCreateStockTransfer,
  useStockTransferById,
  useUpdateStockTransfer,
} from "@/modules/scm/hooks"
import { useStockById } from "@/modules/scm/hooks/inventory/stock/use-stock"
import { useStockTransferItems } from "@/modules/scm/hooks/shared/use-stock-transfer-items"
import { stockItemsId } from "@/modules/scm/store/global-store-state"
import { Stock } from "@/modules/scm/types/inventory/stock-overview/stock-overview-types"
import { StockTransfer } from "@/modules/scm/types/inventory/stock-transfer/stock-transfer-types"
import toast from "react-hot-toast"
import { useTranslations } from "next-intl"

interface UseStockTransferFromProps {
  id: number
  mode?: "create" | "edit" | "view"
}

export const useStockTransferFrom = ({
  id,
  mode = "create",
}: UseStockTransferFromProps) => {
  const isFieldDisabled = mode === "view"

  const t = useTranslations("form")

  const [formValues, setFormValues] = useState(DEFAULT_STOCK_TRANSFER_VALUES)

  const [stockItems] = useAtom(stockItemsId)

  const {
    stockTransferItems,
    setStockTransferItems,
    handleStockTransferItemsChange,
    handleStockTransferItemsDelete,
    handleStockTransferItemsAdd,
  } = useStockTransferItems()

  const {
    data: stockTransferDetails,
    isLoading: isStockTransferDetailsLoading,
  } = useStockTransferById(id) as {
    data: StockTransfer | undefined
    isLoading: boolean
  }

  const { data: stockDetails, isLoading: isStockDetailsLoading } = useStockById(
    stockItems
  ) as {
    data: Stock | undefined
    isLoading: boolean
  }


  // Add this effect to handle product selection updates
  useEffect(() => {
    if (stockDetails && !isStockDetailsLoading) {
      setStockTransferItems((prevItems) => {
        return prevItems.map((item) => {
          if (item.inventoryId === stockDetails.id) {
            return {
              ...item,
              productId: stockDetails.productId,
              currentStock: stockDetails.currentQuantity,
            }
          }
          return item
        })
      })
    }
  }, [stockDetails, isStockDetailsLoading])

  useEffect(() => {
    if (stockTransferDetails && !isStockTransferDetailsLoading) {
      setStockTransferItems(stockTransferDetails.stockTransferDetails)
      setFormValues({
        ...stockTransferDetails,
        id: stockTransferDetails.id,
      })
    }
  }, [stockTransferDetails, isStockTransferDetailsLoading])

  const getFormValues = () => formValues

  const { mutateAsync: createStockTransfer, isPending: isCreatePending } =
    useCreateStockTransfer()

  const { mutateAsync: updateStockTransfer, isPending: isUpdatePending } =
    useUpdateStockTransfer()

  const onSubmit: SubmitHandler<StockTransfer> = async (data) => {
    // Validate that all items have valid quantities
    const hasInvalidQuantities = stockTransferItems.some((item) => {
      const quantity = Number(item.quantity) || 0
      const currentStock = Number(item.currentStock) || 0
      return quantity <= 0 || quantity > currentStock
    })

    if (hasInvalidQuantities) {
      // Instead of throwing an error, return early with a toast notification
      toast.error(t("form-quantity-cannot-exceed-current-stock-and-must-be-greater-than-zero"))
      return
    }
    const formatData = {
      ...data,
      status: "pending",
      stockTransferDetails: stockTransferItems,
    }

    if (mode === "edit" && stockTransferDetails) {
      await updateStockTransfer({
        data: {
          ...formatData,
          id: stockTransferDetails.id,
          stockTransferDetails: stockTransferItems,
        },
      })
    } else {
      await createStockTransfer(formatData as StockTransfer)
    }
  }

  return {
    onSubmit,
    getFormValues,
    stockTransferItems,
    setStockTransferItems,
    handleStockTransferItemsChange,
    handleStockTransferItemsDelete,
    handleStockTransferItemsAdd,
    isFieldDisabled,
    isLoading:
      isStockTransferDetailsLoading ||
      isCreatePending ||
      isUpdatePending ||
      isStockDetailsLoading,
  }
}
