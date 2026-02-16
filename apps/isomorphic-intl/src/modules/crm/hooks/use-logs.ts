"use client"

import {
  keepPreviousData,
  useQuery,
} from "@tanstack/react-query"

import { logs } from "@/modules/crm/service/logs.service"
import { LogsPaginator, LogsQueryOptions } from "@/modules/crm/types/logs"
import {
  createQueryKeys,
} from "@/server/service/query-config"

export const Logs_KEYS = createQueryKeys("Logs")

export function useLogList(options?: Partial<LogsQueryOptions>) {
  const queryKey = [Logs_KEYS.all, options]

  return useQuery<LogsPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return logs.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    throwOnError: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}
