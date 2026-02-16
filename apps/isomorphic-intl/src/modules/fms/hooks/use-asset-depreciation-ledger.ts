"use client"

import { keepPreviousData, useQuery } from "@tanstack/react-query"

import { createQueryKeys } from "@/server/service/query-config"

import { AssetDepreciationLedgerService } from "../service/asset-depreciation-ledger.service"
import {
  AssetDepreciationLedgerPaginator,
  AssetDepreciationLedgerQueryOptions,
} from "../types"

const ASSET_DEPRECIATION_LEDGER_KEYS = createQueryKeys(
  "asset-depreciation-ledger"
)

export function useAssetDepreciationLedgerList(
  options?: Partial<AssetDepreciationLedgerQueryOptions>
) {
  const queryKey = [ASSET_DEPRECIATION_LEDGER_KEYS.all, options]

  return useQuery<AssetDepreciationLedgerPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return AssetDepreciationLedgerService.all(
        Object.assign({}, queryKey[1], pageParam)
      )
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}
