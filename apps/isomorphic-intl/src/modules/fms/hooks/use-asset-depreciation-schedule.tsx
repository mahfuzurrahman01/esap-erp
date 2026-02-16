"use client"

import { useRouter } from "next/navigation"

import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import { toast } from "react-hot-toast"
import { Text } from "rizzui"

import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/config/constants"
import { routes } from "@/config/routes"
import {
  AssetDepreciationList,
  AssetDepreciationPaginator,
  AssetDepreciationQueryOptions,
} from "@/modules/fms/types/asset-depreciation-schedule"
import { createQueryKeys } from "@/server/service/query-config"

import { AssetDepreciationService } from "../service/asset-depreciation-schedule.service"

const ASSET_DEPRECIATION_KEYS = createQueryKeys("asset-depreciation-schedule")

export function useAssetDepreciationList(
  options?: Partial<AssetDepreciationQueryOptions>
) {
  const queryKey = [ASSET_DEPRECIATION_KEYS.all, options]

  return useQuery<AssetDepreciationPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return AssetDepreciationService.all(
        Object.assign({}, queryKey[1], pageParam)
      )
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function useAssetDepreciationById(id: number) {
  return useQuery<AssetDepreciationList, Error>({
    queryKey: ASSET_DEPRECIATION_KEYS.detail(id),
    queryFn: () => AssetDepreciationService.get(id),
    enabled: !!id,
  })
}

export function useDeleteAssetDepreciation() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => AssetDepreciationService.delete(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({
        queryKey: [ASSET_DEPRECIATION_KEYS.all],
        exact: false,
      })

      const queryKey = [
        ASSET_DEPRECIATION_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousAssetDepreciations =
        queryClient.getQueryData<AssetDepreciationPaginator>(queryKey)

      queryClient.setQueryData<AssetDepreciationPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => item.id !== id),
          count: old.count - 1,
        }
      })

      return { previousAssetDepreciations }
    },
    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-asset-depreciation-successfully-deleted")}</Text>
      )
    },
    onError: (err, variables, context) => {
      if (context?.previousAssetDepreciations) {
        const queryKey = [
          ASSET_DEPRECIATION_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousAssetDepreciations)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [ASSET_DEPRECIATION_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeleteAssetDepreciation() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (ids: number[]) => AssetDepreciationService.bulk(ids),
    onMutate: async (ids) => {
      await queryClient.cancelQueries({
        queryKey: [ASSET_DEPRECIATION_KEYS.all],
        exact: false,
      })

      const queryKey = [
        ASSET_DEPRECIATION_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousAssetDepreciations =
        queryClient.getQueryData<AssetDepreciationPaginator>(queryKey)

      // Optimistically remove the bank transactions from the list
      queryClient.setQueryData<AssetDepreciationPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => !ids.includes(item.id as number)),
          count: old.count - ids.length,
        }
      })

      return { previousAssetDepreciations }
    },
    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-assets-depreciation-deleted-successfully")}</Text>
      )
    },
    onError: (err, variables, context) => {
      toast.error(
        <Text as="b">{t("form-assets-depreciation-failed-to-delete")}</Text>
      )
      if (context?.previousAssetDepreciations) {
        const queryKey = [
          ASSET_DEPRECIATION_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousAssetDepreciations)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [ASSET_DEPRECIATION_KEYS.all],
        exact: false,
      })
    },
  })
}
