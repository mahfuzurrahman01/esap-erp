"use client"

import { useQuery } from "@tanstack/react-query"

import { createQueryKeys } from "@/server/service/query-config"

import { AssetMovementHistory, AssetMovementHistoryQueryOptions } from "../types"
import { AssetMovementHistoryService } from "../service/asset-movement-history.service"

const ASSET_MOVEMENT_HISTORY_KEYS = createQueryKeys("asset-movement-history")

export function useAssetMovementHistoryList(query?: AssetMovementHistoryQueryOptions) {
    return useQuery<AssetMovementHistory[], Error>({
        queryKey: [...ASSET_MOVEMENT_HISTORY_KEYS.all, query],
        queryFn: () => AssetMovementHistoryService.all(query),
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    })
}