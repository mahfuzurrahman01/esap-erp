"use client"

import { keepPreviousData, useQuery } from "@tanstack/react-query"

import { createQueryKeys } from "@/server/service/query-config"

import { ticketsReport } from "../service/tickets-report.service"
import {
  TicketsReportPaginator,
  TicketsReportQueryOptions,
} from "../types/tickets-report"

export const TicketsREPORT_KEYS = createQueryKeys("TicketsReport")

export function useTicketsReportList(
  options?: Partial<TicketsReportQueryOptions>
) {
  const queryKey = [TicketsREPORT_KEYS.all, options]

  return useQuery<TicketsReportPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return ticketsReport.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    throwOnError: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}
