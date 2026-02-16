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
  AssetMaintenanceList,
  AssetMaintenancePaginator,
  AssetMaintenanceQueryOptions,
} from "@/modules/fms/types/asset-maintenance"
import { createQueryKeys } from "@/server/service/query-config"

import { AssetMaintenanceService } from "../service/asset-maintenance.service"

const ASSET_MAINTENANCE_KEYS = createQueryKeys("asset-maintenance")

export function useAssetMaintenanceList(
  options?: Partial<AssetMaintenanceQueryOptions>
) {
  const queryKey = [ASSET_MAINTENANCE_KEYS.all, options]

  return useQuery<AssetMaintenancePaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return AssetMaintenanceService.all(
        Object.assign({}, queryKey[1], pageParam)
      )
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function useAssetMaintenanceById(id: number) {
  return useQuery<AssetMaintenanceList, Error>({
    queryKey: ASSET_MAINTENANCE_KEYS.detail(id),
    queryFn: () => AssetMaintenanceService.get(id),
    enabled: !!id,
  })
}

export function useCreateAssetMaintenance() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: AssetMaintenanceList): Promise<AssetMaintenanceList> =>
      AssetMaintenanceService.create(data),
    onMutate: async (newAssetMaintenance) => {
      await queryClient.cancelQueries({
        queryKey: [ASSET_MAINTENANCE_KEYS.all],
        exact: false,
      })

      const queryKey = [
        ASSET_MAINTENANCE_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousAssetMaintenances =
        queryClient.getQueryData<AssetMaintenancePaginator>(queryKey)

      queryClient.setQueryData<AssetMaintenancePaginator>(queryKey, (old) => {
        if (!old)
          return {
            data: [newAssetMaintenance],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [...old.data, { ...newAssetMaintenance, id: Date.now() }],
          count: old.count + 1,
        }
      })

      return { previousAssetMaintenances }
    },
    onSuccess: async () => {
      toast.success(
        <Text as="b">{t("form-asset-maintenance-successfully-created")}</Text>
      )
      router.push(`${routes.fms.assetMaintenance}`)
    },
    onError: (err, newBankTransaction, context) => {
      toast.error(
        <Text as="b">{t("form-asset-maintenance-failed-to-create")}</Text>
      )
      if (context?.previousAssetMaintenances) {
        const queryKey = [
          ASSET_MAINTENANCE_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousAssetMaintenances)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [ASSET_MAINTENANCE_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateAssetMaintenance() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: AssetMaintenanceList) => AssetMaintenanceService.update(data),
    onMutate: async (data) => {
      await queryClient.cancelQueries({
        queryKey: [ASSET_MAINTENANCE_KEYS.all],
        exact: false,
      })

      // Only cancel queries if id exists
      if (data.id) {
        await queryClient.cancelQueries({
          queryKey: ASSET_MAINTENANCE_KEYS.detail(data.id),
        })
      }

      const queryKey = [
        ASSET_MAINTENANCE_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousAssetMaintenances = queryClient.getQueryData<AssetMaintenancePaginator>(queryKey)

      // Only get previous country data if id exists
      const previousAssetMaintenance = data.id
        ? queryClient.getQueryData<AssetMaintenanceList>(ASSET_MAINTENANCE_KEYS.detail(data.id))
        : undefined

      queryClient.setQueryData<AssetMaintenancePaginator>(queryKey, (old) => {
        if (!old)
          return {
            data: [data],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: old.data.map((item) =>
            item.id === data.id ? { ...item, ...data } : item
          ),
        }
      })

      // Only set query data if id exists
      if (data.id) {
        queryClient.setQueryData(ASSET_MAINTENANCE_KEYS.detail(data.id), data)
      }

      return { previousAssetMaintenance, previousAssetMaintenances }
    },
    onSuccess: async () => {
      toast.success(
        <Text as="b">{t("form-asset-successfully-updated")}</Text>
      )
      router.push(`${routes.fms.assetMaintenance}`)
    },
    onError: (err, variables, context) => {
      if (context?.previousAssetMaintenances) {
        const queryKey = [
          ASSET_MAINTENANCE_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousAssetMaintenances)
      }
      if (context?.previousAssetMaintenance && variables.id) {
        queryClient.setQueryData(ASSET_MAINTENANCE_KEYS.detail(variables.id), context.previousAssetMaintenance)
      }
    },
    onSettled: (data) => {
      queryClient.invalidateQueries({
        queryKey: [ASSET_MAINTENANCE_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: ASSET_MAINTENANCE_KEYS.detail(data.id),
        })
      }
    },
  })
}


export function useDeleteAssetMaintenance() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => AssetMaintenanceService.delete(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({
        queryKey: [ASSET_MAINTENANCE_KEYS.all],
        exact: false,
      })

      const queryKey = [
        ASSET_MAINTENANCE_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousAssetMaintenances =
        queryClient.getQueryData<AssetMaintenancePaginator>(queryKey)

      queryClient.setQueryData<AssetMaintenancePaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => item.id !== id),
          count: old.count - 1,
        }
      })

      return { previousAssetMaintenances }
    },
    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-asset-maintenance-successfully-deleted")}</Text>
      )
    },
    onError: (err, variables, context) => {
      if (context?.previousAssetMaintenances) {
        const queryKey = [
          ASSET_MAINTENANCE_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousAssetMaintenances)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [ASSET_MAINTENANCE_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeleteAssetMaintenance() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (ids: number[]) => AssetMaintenanceService.bulk(ids),
    onMutate: async (ids) => {
      await queryClient.cancelQueries({
        queryKey: [ASSET_MAINTENANCE_KEYS.all],
        exact: false,
      })

      const queryKey = [
        ASSET_MAINTENANCE_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousAssetMaintenances =
        queryClient.getQueryData<AssetMaintenancePaginator>(queryKey)

      // Optimistically remove the bank transactions from the list
      queryClient.setQueryData<AssetMaintenancePaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => !ids.includes(item.id as number)),
          count: old.count - ids.length,
        }
      })

      return { previousAssetMaintenances }
    },
    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-assets-maintenance-deleted-successfully")}</Text>
      )
    },
    onError: (err, variables, context) => {
      toast.error(
        <Text as="b">{t("form-assets-maintenance-failed-to-delete")}</Text>
      )
      if (context?.previousAssetMaintenances) {
        const queryKey = [
          ASSET_MAINTENANCE_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousAssetMaintenances)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [ASSET_MAINTENANCE_KEYS.all],
        exact: false,
      })
    },
  })
}
