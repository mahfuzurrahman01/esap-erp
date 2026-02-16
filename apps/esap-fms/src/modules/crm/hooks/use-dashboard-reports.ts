"use client"

import { keepPreviousData, useQuery } from "@tanstack/react-query"

import { createQueryKeys } from "@/server/service/query-config"
import {
  DashboardReportPaginator,
  DashboardReportQueryOptions,
} from "../types/dashboard-report"
import { analyticLeadSummary, customerSummary, dashboardUserReport, dealPipelineSummary, leadSourceOverview, leadTargetOverview, profileSaleOverview, revenueTargetOverview, salesRevenueOverview, threeMonthsLead } from "../service/dashboard-user-report.service"
import { dashboardSummary } from "../service/dashboard-report.service"

export const DASHBOARD_SUMMARY_REPORT_KEYS = createQueryKeys("dashboardSummary")
export const DASHBOARD_USER_REPORT_KEYS = createQueryKeys("dashboardUser")
export const ANALYTIC_LEAD_SUMMARY = createQueryKeys("analyticLeadSummary")
export const SALES_REVENUE_OVERVIEW = createQueryKeys("salesRevenueOverview")
export const DEAL_PIPELINE_OVERVIEW = createQueryKeys("dealPipelineSummary")
export const CUSTOMER_OVERVIEW = createQueryKeys("customerSummary")
export const LEAD_TARGET_OVERVIEW = createQueryKeys("leadTargetOverview")
export const REVENUE_TARGET_OVERVIEW = createQueryKeys("revenueTargetOverview")
export const THREE_MONTHS_LEAD = createQueryKeys("threeMonthsLead")
export const LEAD_SOURCE_OVERVIEW = createQueryKeys("leadSourceOverview")
export const PROFILE_SALE_OVERVIEW = createQueryKeys("profileSaleOverview")

export function useDashboardSummaryList(
  options?: Partial<DashboardReportQueryOptions>
) {
  const queryKey = [DASHBOARD_SUMMARY_REPORT_KEYS.all, options]

  return useQuery<DashboardReportPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return dashboardSummary.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

export function useDashboardTopUserReport(
  options?: Partial<DashboardReportQueryOptions>
) {
  const queryKey = [DASHBOARD_USER_REPORT_KEYS.all, options]

  return useQuery<DashboardReportPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return dashboardUserReport.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    throwOnError: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

export function useAnalyticLeadSummary(
  options?: Partial<DashboardReportQueryOptions>
) {
  const queryKey = [ANALYTIC_LEAD_SUMMARY.all, options]

  return useQuery<DashboardReportPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return analyticLeadSummary.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    throwOnError: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

export function useSalesRevenueOverview(
  options?: Partial<DashboardReportQueryOptions>
) {
  const queryKey = [SALES_REVENUE_OVERVIEW.all, options]

  return useQuery<DashboardReportPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return salesRevenueOverview.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    throwOnError: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

export function useDealPipelineOverview(
  options?: Partial<DashboardReportQueryOptions>
) {
  const queryKey = [DEAL_PIPELINE_OVERVIEW.all, options]

  return useQuery<DashboardReportPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return dealPipelineSummary.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    throwOnError: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

export function useCustomerOverview(
  options?: Partial<DashboardReportQueryOptions>
) {
  const queryKey = [CUSTOMER_OVERVIEW.all, options]

  return useQuery<DashboardReportPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return customerSummary.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    throwOnError: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

export function useLeadTargetOverview(
  options?: Partial<DashboardReportQueryOptions>
) {
  const queryKey = [LEAD_TARGET_OVERVIEW.all, options]

  return useQuery<DashboardReportPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return leadTargetOverview.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    throwOnError: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

export function useRevenueTargetOverview(
  options?: Partial<DashboardReportQueryOptions>
) {
  const queryKey = [REVENUE_TARGET_OVERVIEW.all, options]

  return useQuery<DashboardReportPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return revenueTargetOverview.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    throwOnError: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

export function useThreeMonthsLead(
  options?: Partial<DashboardReportQueryOptions>
) {
  const queryKey = [THREE_MONTHS_LEAD.all, options]

  return useQuery<DashboardReportPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return threeMonthsLead.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    throwOnError: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

export function useLeadSourceOverview(
  options?: Partial<DashboardReportQueryOptions>
) {
  const queryKey = [LEAD_SOURCE_OVERVIEW.all, options]

  return useQuery<DashboardReportPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return leadSourceOverview.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    throwOnError: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

export function useProfileSaleOverview(
  options?: Partial<DashboardReportQueryOptions>
) {
  const queryKey = [PROFILE_SALE_OVERVIEW.all, options]

  return useQuery<DashboardReportPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return profileSaleOverview.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    throwOnError: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}
