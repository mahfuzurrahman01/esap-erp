"use client"

import { keepPreviousData, useQuery } from "@tanstack/react-query"

import {
  BomStockReportsPaginator,
  BomStockReportsQueryOptions,
} from "@/modules/scm/types/feature-reports/bom-stock-reports"
import {
  CostManagementPaginator,
  CostManagementQueryOptions,
} from "@/modules/scm/types/feature-reports/cost-management"
import {
  ForecastReviewAnalyticsPaginator,
  ForecastReviewAnalyticsQueryOptions,
} from "@/modules/scm/types/feature-reports/forecast-review-analytics"
import {
  FreightReportPaginator,
  FreightReportQueryOptions,
} from "@/modules/scm/types/feature-reports/freight-report"
import {
  InventoryShortageStoragePaginator,
  InventoryShortageStorageQueryOptions,
} from "@/modules/scm/types/feature-reports/inventory-shortage-storage"
import {
  ProductionPlanningReportPaginator,
  ProductionPlanningReportQueryOptions,
} from "@/modules/scm/types/feature-reports/production-planning-report"
import {
  PurchaseAnalyticsPaginator,
  PurchaseAnalyticsQueryOptions,
} from "@/modules/scm/types/feature-reports/purchase-analytics"
import {
  PurchaseOrderTrendsPaginator,
  PurchaseOrderTrendsQueryOptions,
} from "@/modules/scm/types/feature-reports/purchase-order-trends"
import {
  StockAnalyticsReportPaginator,
  StockAnalyticsReportQueryOptions,
} from "@/modules/scm/types/feature-reports/stock-analytics-report"

import { FeatureReportsService } from "../../service/feature-reports/feature-reports.service"
import {
  AccountPayableReportsPaginator,
  AccountPayableReportsQueryOptions,
} from "../../types/feature-reports/account-payable-reports"

const FEATURE_REPORT_KEYS = {
  all: "feature-report",
  forecast: "forecast-review-analytics",
  purchaseAnalytics: "purchase-analytics",
  purchaseOrderTrends: "purchase-order-trends",
  freight: "freight-report",
  productionPlanning: "production-planning",
  bomDetailsSummary: "bom-details-summary",
  billOfMaterialSummary: "bill-of-material-summary",
  stockAnalytics: "stock-analytics-report",
  inventoryShortage: "inventory-shortage-report",
  accountsPayable: "accounts-payable-report",
}

export function useForecastReviewAnalytics(
  options?: Partial<ForecastReviewAnalyticsQueryOptions>
) {
  const queryKey = [FEATURE_REPORT_KEYS.forecast, options]

  return useQuery<ForecastReviewAnalyticsPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return FeatureReportsService.getForecastingReviewAnalytics(
        Object.assign({}, queryKey[1], pageParam)
      )
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function usePurchaseAnalytics(
  options?: Partial<PurchaseAnalyticsQueryOptions>
) {
  const queryKey = [FEATURE_REPORT_KEYS.purchaseAnalytics, options]

  return useQuery<PurchaseAnalyticsPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return FeatureReportsService.getPurchaseAnalytics(
        Object.assign({}, queryKey[1], pageParam)
      )
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function usePurchaseOrderTrendsReport(
  options?: Partial<PurchaseOrderTrendsQueryOptions>
) {
  const queryKey = [FEATURE_REPORT_KEYS.purchaseOrderTrends, options]

  return useQuery<PurchaseOrderTrendsPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return FeatureReportsService.getPurchaseOrderTrendsReport(
        Object.assign({}, queryKey[1], pageParam)
      )
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function useFreightReport(options?: Partial<FreightReportQueryOptions>) {
  const queryKey = [FEATURE_REPORT_KEYS.freight, options]

  return useQuery<FreightReportPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return FeatureReportsService.getFreightReport(
        Object.assign({}, queryKey[1], pageParam)
      )
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function useProductionPlanning(
  options?: Partial<ProductionPlanningReportQueryOptions>
) {
  const queryKey = [FEATURE_REPORT_KEYS.productionPlanning, options]

  return useQuery<ProductionPlanningReportPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return FeatureReportsService.getProductionPlanning(
        Object.assign({}, queryKey[1], pageParam)
      )
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function useBomStock(options?: Partial<BomStockReportsQueryOptions>) {
  const queryKey = [FEATURE_REPORT_KEYS.bomDetailsSummary, options]

  return useQuery<BomStockReportsPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return FeatureReportsService.getBomStock(
        Object.assign({}, queryKey[1], pageParam)
      )
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function useCostManagementReport(
  options?: Partial<CostManagementQueryOptions>
) {
  const queryKey = [FEATURE_REPORT_KEYS.billOfMaterialSummary, options]

  return useQuery<CostManagementPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return FeatureReportsService.getCostManagementReport(
        Object.assign({}, queryKey[1], pageParam)
      )
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function useStockAnalyticsReport(
  options?: Partial<StockAnalyticsReportQueryOptions>
) {
  const queryKey = [FEATURE_REPORT_KEYS.stockAnalytics, options]

  return useQuery<StockAnalyticsReportPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return FeatureReportsService.getStockAnalyticsReport(
        Object.assign({}, queryKey[1], pageParam)
      )
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function useInventoryShortageReport(
  options?: Partial<InventoryShortageStorageQueryOptions>
) {
  const queryKey = [FEATURE_REPORT_KEYS.inventoryShortage, options]

  return useQuery<InventoryShortageStoragePaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return FeatureReportsService.getInventoryShortageReport(
        Object.assign({}, queryKey[1], pageParam)
      )
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function useAccountPayableReport(
  options?: Partial<AccountPayableReportsQueryOptions>
) {
  const queryKey = [FEATURE_REPORT_KEYS.accountsPayable, options]

  return useQuery<AccountPayableReportsPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return FeatureReportsService.getAccountPayableReport(
        Object.assign({}, queryKey[1], pageParam)
      )
    },

    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}
