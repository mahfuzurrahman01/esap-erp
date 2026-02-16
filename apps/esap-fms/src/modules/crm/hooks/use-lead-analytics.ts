"use client"

import { keepPreviousData, useQuery } from "@tanstack/react-query"

import { createQueryKeys } from "@/server/service/query-config"
import {
  DashboardReportPaginator,
  DashboardReportQueryOptions,
} from "../types/dashboard-report"
import { industryLeadAnalytics, monthlyLeadAnalytics, todayLeadAnalytics, topLeadSource, weeklyleads } from "../service/lead-analytics.service"

export const TODAY_LEAD_ANALYTICS_KEYS = createQueryKeys("todayLeadAnalytics")
export const THIS_WEEK_LEAD_ANALYTICS_KEYS = createQueryKeys("weeklyleads")
export const TOP_LEAD_SOURCE_KEYS = createQueryKeys("topLeadSource")
export const MONTHLY_LEAD_ANALYTICS_KEY = createQueryKeys("monthlyLeadAnalytics")
export const INDUSTRY_LEAD_ANALYTICS_KEY = createQueryKeys("industryLeadAnalytics")

export function useTodayLeadAnalytics(
  options?: Partial<DashboardReportQueryOptions>
) {
  const queryKey = [TODAY_LEAD_ANALYTICS_KEYS.all, options]

  return useQuery<DashboardReportPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return todayLeadAnalytics.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    throwOnError: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

export function useThisWeekLeadAnalytics(
  options?: Partial<DashboardReportQueryOptions>
) {
  const queryKey = [THIS_WEEK_LEAD_ANALYTICS_KEYS.all, options]

  return useQuery<DashboardReportPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return weeklyleads.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    throwOnError: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

export function useTopLeadSource(
  options?: Partial<DashboardReportQueryOptions>
) {
  const queryKey = [TOP_LEAD_SOURCE_KEYS.all, options]

  return useQuery<DashboardReportPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return topLeadSource.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    throwOnError: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

export function useMonthlyLeadAnalytics(
  options?: Partial<DashboardReportQueryOptions>
) {
  const queryKey = [MONTHLY_LEAD_ANALYTICS_KEY.all, options]

  return useQuery<DashboardReportPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return monthlyLeadAnalytics.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    throwOnError: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

export function useIndustryLeadAnalytics(
  options?: Partial<DashboardReportQueryOptions>
) {
  const queryKey = [INDUSTRY_LEAD_ANALYTICS_KEY.all, options]

  return useQuery<DashboardReportPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return industryLeadAnalytics.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    throwOnError: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}