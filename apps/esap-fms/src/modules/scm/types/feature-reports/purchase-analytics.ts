import { PaginatedResponse, QueryOptions } from "@/modules/scm/types/common.types";

export interface PurchaseAnalytics {
  id?: number
  sl?: number
  supplierName?: string
  paymentTerms?: string
  orderAmount?: number
}

export interface PurchaseAnalyticsQueryOptions extends QueryOptions {
  fromDate?: string
  toDate?: string
  supplierName?: string
  paymentTerms?: string
}

export type PurchaseAnalyticsPaginator = PaginatedResponse<PurchaseAnalytics>