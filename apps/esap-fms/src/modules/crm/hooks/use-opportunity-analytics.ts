"use client"

import { keepPreviousData, useQuery } from "@tanstack/react-query"

import { createQueryKeys } from "@/server/service/query-config"
import {
  DashboardReportPaginator,
  DashboardReportQueryOptions,
} from "../types/dashboard-report"
import { amountBySource, amountByStage, amountByUser, dealByStage, dealsAnalytics, lostRevenueAnalytics, monthlyRevenueAnalytics, revenueByUser } from "../service/opportunity-analytics.service"

export const MONTHLY_REVENUE_ANALYTICS_KEYS = createQueryKeys("monthlyRevenueAnalytics")
export const DEALS_ANALYTICS_KEYS = createQueryKeys("dealsAnalytics")
export const LOST_REVENUE_ANALYTICS_KEYS = createQueryKeys("lostRevenueAnalytics")
export const REVENUE_BY_USER_KEYS = createQueryKeys("revenueByUser")
export const DEAL_BY_STAGE_KEYS = createQueryKeys("dealByStage")
export const AMOUNT_BY_USER_KEYS = createQueryKeys("amountByUser")
export const AMOUNT_BY_STAGE_KEYS = createQueryKeys("amountByStage")
export const AMOUNT_BY_SOURCE_KEYS = createQueryKeys("amountBySource")

export function useMonthlyRevenueAnalytics(
  options?: Partial<DashboardReportQueryOptions>
) {
  const queryKey = [MONTHLY_REVENUE_ANALYTICS_KEYS.all, options]

  return useQuery<DashboardReportPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return monthlyRevenueAnalytics.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    throwOnError: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

export function useDealsAnalytics(
  options?: Partial<DashboardReportQueryOptions>
) {
  const queryKey = [DEALS_ANALYTICS_KEYS.all, options]

  return useQuery<DashboardReportPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return dealsAnalytics.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    throwOnError: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

export function useLostRevenueAnalytics(
  options?: Partial<DashboardReportQueryOptions>
) {
  const queryKey = [LOST_REVENUE_ANALYTICS_KEYS.all, options]

  return useQuery<DashboardReportPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return lostRevenueAnalytics.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    throwOnError: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

export function useRevenueByUser(
  options?: Partial<DashboardReportQueryOptions>
) {
  const queryKey = [REVENUE_BY_USER_KEYS.all, options]

  return useQuery<DashboardReportPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return revenueByUser.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    throwOnError: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

export function useDealByStage(
  options?: Partial<DashboardReportQueryOptions>
) {
  const queryKey = [DEAL_BY_STAGE_KEYS.all, options]

  return useQuery<DashboardReportPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return dealByStage.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    throwOnError: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

export function useAmountByUser(
  options?: Partial<DashboardReportQueryOptions>
) {
  const queryKey = [AMOUNT_BY_USER_KEYS.all, options]

  return useQuery<DashboardReportPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return amountByUser.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    throwOnError: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

export function useAmountBySource(
  options?: Partial<DashboardReportQueryOptions>
) {
  const queryKey = [AMOUNT_BY_SOURCE_KEYS.all, options]

  return useQuery<DashboardReportPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return amountBySource.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    throwOnError: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

export function useAmountByStage(
  options?: Partial<DashboardReportQueryOptions>
) {
  const queryKey = [AMOUNT_BY_STAGE_KEYS.all, options]

  return useQuery<DashboardReportPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return amountByStage.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    throwOnError: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}