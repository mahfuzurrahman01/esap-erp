"use client"

import { useState } from "react"

import { ProductItemsUtils } from "@/modules/scm/utils/items-calculation"
import { InvoiceItemDtos } from "../../types/invoices"
import { SalesOrderDetail } from "../../types/sales-order"


export const useProductItems = (initialItems: InvoiceItemDtos[] = []) => {
  const { calculateRowTotal } = ProductItemsUtils()

  const [productItems, setProductItems] = useState<any[]>([
      {
        id: "",
        productId: "",
        quantity: 0,
        unitPrice: 0,
        totalPrice: 0,
      },
    ])

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
        productId: 0,
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
