"use client"

import { useQuery } from "@tanstack/react-query"

import { createQueryKeys } from "@/server/service/query-config"

import { AssetRepairHistory, AssetRepairHistoryQueryOptions } from "../types"
import { AssetRepairHistoryService } from "../service/asset-repair-history.service"

const ASSET_REPAIR_HISTORY_KEYS = createQueryKeys("asset-repair-history")

export function useAssetRepairHistoryList(query?: AssetRepairHistoryQueryOptions) {
    return useQuery<AssetRepairHistory[], Error>({
        queryKey: [...ASSET_REPAIR_HISTORY_KEYS.all, query],
        queryFn: () => AssetRepairHistoryService.all(query),
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    })
}