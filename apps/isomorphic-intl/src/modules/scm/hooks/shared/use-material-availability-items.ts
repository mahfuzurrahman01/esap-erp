"use client"

import { useState } from "react"

import { DEFAULT_MATERIAL_AVAILABILITY_ITEM_VALUES } from "../../constants/material-availability-constants"
import { MaterialRequirementsPlanningItem } from "../../types/production-control/materials-requirements-planning/material-requirements-planning-types"

export const useMaterialAvailabilityItems = (
  initialItems: MaterialRequirementsPlanningItem[] = []
) => {
  const [materialAvailabilityItems, setMaterialAvailabilityItems] =
    useState<MaterialRequirementsPlanningItem[]>(initialItems)

  const handleMaterialAvailabilityItemsChange = (
    index: number,
    field: string,
    value: any
  ) => {
    setMaterialAvailabilityItems((prev) => {
      const updated = [...prev]
      updated[index] = { ...updated[index], [field]: value }
      return updated
    })
  }

  const handleMaterialAvailabilityItemsDelete = (index: number) => {
    setMaterialAvailabilityItems((prevItems) =>
      prevItems.filter((_, i) => i !== index)
    )
  }

  const handleMaterialAvailabilityItemsAdd = () => {
    setMaterialAvailabilityItems((prevItems) => [
      ...prevItems,

      {
        ...DEFAULT_MATERIAL_AVAILABILITY_ITEM_VALUES,
      },
    ])
  }

  return {
    materialAvailabilityItems,
    setMaterialAvailabilityItems,
    handleMaterialAvailabilityItemsChange,
    handleMaterialAvailabilityItemsDelete,
    handleMaterialAvailabilityItemsAdd,
  }
}
