"use client"

import { keepPreviousData, useQuery } from "@tanstack/react-query"

import { createQueryKeys } from "@/server/service/query-config"

import { LeadsReport } from "../service/leads-report.service"
import {
  LeadsReportPaginator,
  LeadsReportQueryOptions,
} from "../types/leads-report"

export const LEADSREPORT_KEYS = createQueryKeys("LeadsReport")

export function useLeadsByCompany(options?: Partial<LeadsReportQueryOptions>) {
  const queryKey = [LEADSREPORT_KEYS.all, options]

  return useQuery<LeadsReportPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return LeadsReport.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

export function useLeadsByStatus(options?: Partial<LeadsReportQueryOptions>) {
  const queryKey = [LEADSREPORT_KEYS.all, options]

  return useQuery<LeadsReportPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return LeadsReport.allByStatus(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    throwOnError: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}
