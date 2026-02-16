"use client"

import { keepPreviousData, useQuery } from "@tanstack/react-query"

import { createQueryKeys } from "@/server/service/query-config"

import { FixedAssetRegisterService } from "../service/fixed-asset-register.service"
import {
  FixedAssetRegisterPaginator,
  FixedAssetRegisterQueryOptions,
} from "../types"

const FIXED_ASSET_REGISTER_KEYS = createQueryKeys("fixed-asset-register")

export function useFixedAssetRegisterList(
  options?: Partial<FixedAssetRegisterQueryOptions>
) {
  const queryKey = [FIXED_ASSET_REGISTER_KEYS.all, options]

  return useQuery<FixedAssetRegisterPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return FixedAssetRegisterService.all(
        Object.assign({}, queryKey[1], pageParam)
      )
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}
