import { PaginatedResponse, QueryOptions } from "@/modules/scm/types/common.types";





export interface MaterialRequirementsPlanningItem {
  id?: number
  materialRequirementPlanId?: number
  inventoryId?: number
  sku?: string
  productId?: number
  productName?: string
  itemUnitId?: number
  itemUnitName?: string
  requiredQuantity?: number
  availableQuantity?: number
  shortage?: number
  unitCost?: number
}

export interface MaterialRequirementsPlanning {
  id?: number
  createdDate?: string
  updatedDate?: string
  scheduledProductionStart?: string
  scheduledProductionEnd?: string
  approvalStatus?: string
  materialRequirementItems?: MaterialRequirementsPlanningItem[]
}

export interface MaterialRequirementsPlanningQueryOptions extends QueryOptions {
  productName?: string
  approvalStatus?: string
}

export type MaterialRequirementsPlanningPaginator =
  PaginatedResponse<MaterialRequirementsPlanning>