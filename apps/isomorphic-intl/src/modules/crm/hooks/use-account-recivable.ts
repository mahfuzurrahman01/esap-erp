"use client"

import {
  keepPreviousData,
  useQuery,
} from "@tanstack/react-query"

import {
  createQueryKeys,
} from "@/server/service/query-config"

import { AccountRecivablePaginator, AccountRecivableQueryOptions } from "../types/account-recivable"
import { accountRecivable } from "../service/account-recivable.service"

export const SALES_ORDER_KEYS = createQueryKeys("AccountRecivable")

export function useAccountRecivableList(
  options?: Partial<AccountRecivableQueryOptions>
) {
  const queryKey = [SALES_ORDER_KEYS.all, options]

  return useQuery<AccountRecivablePaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return accountRecivable.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    throwOnError: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}