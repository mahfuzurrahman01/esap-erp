"use client"

import { useEffect, useState } from "react"

import { atom, useAtom } from "jotai"
import { SubmitHandler } from "react-hook-form"

import { DEFAULT_STOCK_VALUES } from "@/modules/scm/constants/stock-constants"
import { useProductById } from "@/modules/scm/hooks"
import {
  useCreateStock,
  useStockById,
  useUpdateStock,
} from "@/modules/scm/hooks/inventory/stock/use-stock"
import { useRequisitionStore } from "@/modules/scm/store/requisition-store"
import { Product } from "@/modules/scm/types/inventory/products/products-types"
import { Stock } from "@/modules/scm/types/inventory/stock-overview/stock-overview-types"

export const unitStockValueAtom = atom<number>(0)

interface UseStockFormProps {
  id: number
  initialData?: Stock
  mode?: "create" | "edit" | "view"
}

export const useStockForm = ({ id, mode = "create" }: UseStockFormProps) => {
  const isFieldDisabled = mode === "view"

  const [formValues, setFormValues] = useState(DEFAULT_STOCK_VALUES)
  const [totalStockValue, setTotalStockValue] = useState(0)

  const [unitStockValue, setUnitStockValue] = useAtom(unitStockValueAtom)
  const { selectedProductTemplate } = useRequisitionStore()

  const { data: productDetails, isLoading: isProductDetailsLoading } =
    useProductById(selectedProductTemplate) as {
      data: Product | undefined
      isLoading: boolean
    }

  const { data: stockDetails, isLoading: isStockDetailsLoading } = useStockById(
    id
  ) as {
    data: Stock | undefined
    isLoading: boolean
  }

  useEffect(() => {
    if (productDetails) {
      const newUnitValue =
        productDetails.productType === "good-finished"
          ? (productDetails.cost ?? 0)
          : (productDetails.purchasePrice ?? 0)

      setUnitStockValue(newUnitValue) // Update the atom value
      const total = newUnitValue * (formValues.currentQuantity || 0)
      setTotalStockValue(total)
      setFormValues({
        ...formValues,
        productId: productDetails.id,
        unitStockValue: newUnitValue,
        totalStockValue: total,
      })
    }
  }, [productDetails])

  useEffect(() => {
    if (stockDetails) {
      setFormValues({
        ...stockDetails,
        productId: stockDetails.productId || 0,
        currentQuantity: stockDetails.currentQuantity || 0,
        reorderLevel: stockDetails.reorderLevel || 0,
        reorderQuantity: stockDetails.reorderQuantity || 0,
        stockValuationMethod: stockDetails.stockValuationMethod || "",
        entryType: stockDetails.entryType || "",
        status: stockDetails.status || "",
        unitStockValue: stockDetails.unitStockValue || 0,
        totalStockValue: stockDetails.totalStockValue || 0,
      })
    }
  }, [stockDetails])

  const { mutateAsync: createStockEntry, isPending: isCreating } =
    useCreateStock()

  const { mutateAsync: updateStock, isPending: isUpdating } = useUpdateStock()

  const getFormValues = () => formValues

  const onSubmit: SubmitHandler<Stock> = async (formData: Stock) => {
    const submissionData = {
      ...formData,
      unitStockValue: unitStockValue,
      totalStockValue: (formData.currentQuantity || 0) * unitStockValue,
    }

    if (mode === "edit") {
      await updateStock({ data: { ...submissionData, id: id || 0 } })
    } else {
      await createStockEntry(submissionData)
    }
  }

  return {
    isFieldDisabled,
    onSubmit,
    getFormValues,
    formValues, // Add this to expose form values to the UI
    totalStockValue, // Add this to expose the total value
    isLoading:
      isCreating ||
      isUpdating ||
      isProductDetailsLoading ||
      isStockDetailsLoading,
  }
}
