"use client"

import { keepPreviousData, useQuery } from "@tanstack/react-query"

import { createQueryKeys } from "@/server/service/query-config"

import { campaignsReport } from "../service/campaigns-report.service"
import {
  CampaignReportPaginator,
  CampaignReportQueryOptions,
} from "../types/campaign-report"

export const CampaignsREPORT_KEYS = createQueryKeys("CampaignsReport")

export function useCampaignsReportList(
  options?: Partial<CampaignReportQueryOptions>
) {
  const queryKey = [CampaignsREPORT_KEYS.all, options]

  return useQuery<CampaignReportPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return campaignsReport.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    throwOnError: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}
