"use client"

import { useState } from "react"

import { DEFAULT_PURCHASE_INVOICE_PRODUCT_ITEMS_VALUES } from "@/modules/scm/constants/purchase-invoice-constants"

import { BillOfMaterialItems } from "../../types/production-control/bill-of-materials/bill-of-materials-type"

export const useProductMaterial = (
  initialItems: BillOfMaterialItems[] = []
) => {
  const [productItems, setProductItems] =
    useState<BillOfMaterialItems[]>(initialItems)

  const handleProductItemChange = (
    index: number,
    field: string,
    value: any
  ) => {
    setProductItems((prevItems) => {
      const newItems = [...prevItems]
      newItems[index] = {
        ...newItems[index],
        [field]:
          field === "quantity" || field === "unitCost"
            ? parseFloat(value) || 0
            : value,
      }

      // Update total cost whenever quantity or unitCost changes
      if (field === "quantity" || field === "unitCost") {
        const quantity = field === "quantity" ? value : newItems[index].quantity
        const unitCost = field === "unitCost" ? value : newItems[index].unitCost
        newItems[index].totalCost =
          (parseFloat(quantity) || 0) * (parseFloat(unitCost) || 0)
      }

      return newItems
    })
  }

  const handleProductItemDelete = (index: number) => {
    setProductItems((prevItems) => prevItems.filter((_, i) => i !== index))
  }

  const handleProductItemAdd = () => {
    setProductItems((prevItems) => [
      ...prevItems,
      {
        ...DEFAULT_PURCHASE_INVOICE_PRODUCT_ITEMS_VALUES,
        productId: 0,
        itemUnitId: 0,
        quantity: 0,
        unitCost: 0,
        totalCost: 0,
      },
    ])
  }

  return {
    productItems,
    setProductItems,
    handleProductItemChange,
    handleProductItemDelete,
    handleProductItemAdd,
  }
}
