import {
  PaginatedResponse,
  QueryOptions,
} from "@/modules/scm/types/common.types"

import { SalesOperationApproval } from "./sales-operation-approval-types"

export interface SalesOperationPlan {
  createdDate?: string
  updatedDate?: string
  id?: number
  forecastId?: number
  inventoryId?: number
  sku?: string
  productId?: number
  productName?: string
  salesDataIntegration?: string
  forecastPeriod?: string
  currentSalesData?: number
  adjustedForecast?: number
  plannedSalesTarget?: number
  demandVariationPercentage?: number
  approvalStatus?: string
  forecastReviewApproval?: SalesOperationApproval
}

export interface SalesOperationPlanQueryOptions extends QueryOptions {
  sku?: string
  productName?: string
  forecastPeriod?: string
  currentSalesData?: string
  approvalStatus?: string
}

export type SalesOperationPlanPaginator = PaginatedResponse<SalesOperationPlan>
