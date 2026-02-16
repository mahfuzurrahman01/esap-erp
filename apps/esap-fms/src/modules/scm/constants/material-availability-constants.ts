import {
  MaterialRequirementsPlanning,
  MaterialRequirementsPlanningItem,
} from "../types/production-control/materials-requirements-planning/material-requirements-planning-types"

export const DEFAULT_MATERIAL_AVAILABILITY_VALUES: MaterialRequirementsPlanning =
  {
    scheduledProductionStart: "",
    scheduledProductionEnd: "",
    materialRequirementItems: [],
  }

export const DEFAULT_MATERIAL_AVAILABILITY_ITEM_VALUES: MaterialRequirementsPlanningItem =
  {
    inventoryId: 0,
    productId: 0,
    itemUnitId: 0,
    requiredQuantity: 0,
    availableQuantity: 0,
    shortage: 0,
    unitCost: 0,
  }
