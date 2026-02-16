"use client"

import { useState } from "react"

import { DEFAULT_WORK_ORDER_DETAILS_VALUES } from "../../constants/work-order-constants"
import { WorkOrderDetails } from "../../types/production-control/work-order-tracking/work-order-types"

export const useWorkOrderItems = (initialItems: WorkOrderDetails[] = []) => {
  const [workOrderItems, setWorkOrderItems] =
    useState<WorkOrderDetails[]>(initialItems)

  const handleWorkOrderItemsChange = (
    index: number,
    field: string,
    value: any
  ) => {
    setWorkOrderItems((prev) => {
      const updated = [...prev]
      updated[index] = { ...updated[index], [field]: value }
      return updated
    })
  }

  const handleWorkOrderItemsDelete = (index: number) => {
    setWorkOrderItems((prevItems) => prevItems.filter((_, i) => i !== index))
  }

  const handleWorkOrderItemsAdd = () => {
    setWorkOrderItems((prevItems) => [
      ...prevItems,

      {
        ...DEFAULT_WORK_ORDER_DETAILS_VALUES,
      },
    ])
  }

  return {
    workOrderItems,
    setWorkOrderItems,
    handleWorkOrderItemsChange,
    handleWorkOrderItemsDelete,
    handleWorkOrderItemsAdd,
  }
}
