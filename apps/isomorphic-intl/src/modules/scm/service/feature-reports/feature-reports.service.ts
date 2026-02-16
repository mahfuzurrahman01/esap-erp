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
import { ApiEndpoint } from "@/server/client"
import HttpClient, { ApiEndpoint as ApiBase } from "@/utils/axios"

import {
  AccountPayableReportsPaginator,
  AccountPayableReportsQueryOptions,
} from "../../types/feature-reports/account-payable-reports"

export const FeatureReportsService = {
  getForecastingReviewAnalytics: (
    params: Partial<ForecastReviewAnalyticsQueryOptions>
  ) =>
    HttpClient.get<ForecastReviewAnalyticsPaginator>(
      ApiEndpoint.scm.getForecastingReviewAnalytics,
      params
    ),
  getPurchaseAnalytics: (params: Partial<PurchaseAnalyticsQueryOptions>) =>
    HttpClient.get<PurchaseAnalyticsPaginator>(
      ApiEndpoint.scm.getPurchaseAnalytics,
      params
    ),
  getPurchaseOrderTrendsReport: (
    params: Partial<PurchaseOrderTrendsQueryOptions>
  ) =>
    HttpClient.get<PurchaseOrderTrendsPaginator>(
      ApiEndpoint.scm.getPurchaseOrderTrendsReport,
      params
    ),
  getFreightReport: (params: Partial<FreightReportQueryOptions>) =>
    HttpClient.get<FreightReportPaginator>(
      ApiEndpoint.scm.getFreightReport,
      params
    ),
  getProductionPlanning: (
    params: Partial<ProductionPlanningReportQueryOptions>
  ) =>
    HttpClient.get<ProductionPlanningReportPaginator>(
      ApiEndpoint.scm.getProductionPlanning,
      params
    ),
  getBomStock: (params: Partial<BomStockReportsQueryOptions>) =>
    HttpClient.get<BomStockReportsPaginator>(
      ApiEndpoint.scm.getBomStock,
      params
    ),
  getCostManagementReport: (params: Partial<CostManagementQueryOptions>) =>
    HttpClient.get<CostManagementPaginator>(
      ApiEndpoint.scm.getCostManagementReport,
      params
    ),
  getStockAnalyticsReport: (
    params: Partial<StockAnalyticsReportQueryOptions>
  ) =>
    HttpClient.get<StockAnalyticsReportPaginator>(
      ApiEndpoint.scm.getStockAnalyticsReport,
      params
    ),
  getInventoryShortageReport: (
    params: Partial<InventoryShortageStorageQueryOptions>
  ) =>
    HttpClient.get<InventoryShortageStoragePaginator>(
      ApiEndpoint.scm.getInventoryShortageReport,
      params
    ),
  getAccountPayableReport: (
    params: Partial<AccountPayableReportsQueryOptions>
  ) =>
    HttpClient.get<AccountPayableReportsPaginator>(
      ApiEndpoint.scm.getAccountPayableReport,
      params,
      ApiBase.SCM
    ),
}
