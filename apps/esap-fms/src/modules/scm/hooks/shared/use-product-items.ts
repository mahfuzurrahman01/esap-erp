"use client"

import { useState } from "react"

import { DEFAULT_PURCHASE_INVOICE_PRODUCT_ITEMS_VALUES } from "@/modules/scm/constants/purchase-invoice-constants"
import { InvoiceItemDtos } from "@/modules/scm/types/procurement/invoice/invoice-types"
import { ProductItemsUtils } from "@/modules/scm/utils/items-calculation"


export const useProductItems = (initialItems: InvoiceItemDtos[] = []) => {
  const { calculateRowTotal } = ProductItemsUtils()
  const [productItems, setProductItems] =
    useState<InvoiceItemDtos[]>(initialItems)

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
          field === "quantity" || field === "unitPrice"
            ? parseFloat(value) || 0
            : value,
      }

      if (field === "quantity" || field === "unitPrice") {
        newItems[index].totalPrice = calculateRowTotal(index, newItems)
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
        unitPrice: 0,
        totalPrice: 0,
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
