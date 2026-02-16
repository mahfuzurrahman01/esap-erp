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
  AssetRepairList,
  AssetRepairPaginator,
  AssetRepairQueryOptions,
} from "@/modules/fms/types/asset-repair"
import { createQueryKeys } from "@/server/service/query-config"

import { AssetRepairService } from "../service/asset-repair.service"

const ASSET_REPAIR_KEYS = createQueryKeys("asset-repair")

export function useAssetRepairList(options?: Partial<AssetRepairQueryOptions>) {
  const queryKey = [ASSET_REPAIR_KEYS.all, options]

  return useQuery<AssetRepairPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return AssetRepairService.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function useAssetRepairById(id: number) {
  return useQuery<AssetRepairList, Error>({
    queryKey: ASSET_REPAIR_KEYS.detail(id),
    queryFn: () => AssetRepairService.get(id),
    enabled: !!id,
  })
}

export function useCreateAssetRepair() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: AssetRepairList): Promise<AssetRepairList> =>
      AssetRepairService.create(data),
    onMutate: async (newAssetRepair) => {
      await queryClient.cancelQueries({
        queryKey: [ASSET_REPAIR_KEYS.all],
        exact: false,
      })

      const queryKey = [
        ASSET_REPAIR_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousAssetRepairs =
        queryClient.getQueryData<AssetRepairPaginator>(queryKey)

      queryClient.setQueryData<AssetRepairPaginator>(queryKey, (old) => {
        if (!old)
          return {
            data: [newAssetRepair],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [...old.data, { ...newAssetRepair, id: Date.now() }],
          count: old.count + 1,
        }
      })

      return { previousAssetRepairs }
    },
    onSuccess: async () => {
      toast.success(
        <Text as="b">{t("form-asset-repair-successfully-created")}</Text>
      )
      router.push(`${routes.fms.assetRepair}/`)
    },
    onError: (err, newAssetRepair, context) => {
      toast.error(<Text as="b">{t("form-asset-repair-failed-to-create")}</Text>)
      if (context?.previousAssetRepairs) {
        const queryKey = [
          ASSET_REPAIR_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousAssetRepairs)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [ASSET_REPAIR_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateAssetRepair() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: AssetRepairList) => AssetRepairService.update(data),
    onMutate: async (data) => {
      await queryClient.cancelQueries({
        queryKey: [ASSET_REPAIR_KEYS.all],
        exact: false,
      })

      // Only cancel queries if id exists
      if (data.id) {
        await queryClient.cancelQueries({
          queryKey: ASSET_REPAIR_KEYS.detail(data.id),
        })
      }

      const queryKey = [
        ASSET_REPAIR_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousAssetRepairs = queryClient.getQueryData<AssetRepairPaginator>(queryKey)

      // Only get previous country data if id exists
      const previousAssetRepair = data.id
        ? queryClient.getQueryData<AssetRepairList>(ASSET_REPAIR_KEYS.detail(data.id))
        : undefined

      queryClient.setQueryData<AssetRepairPaginator>(queryKey, (old) => {
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
        queryClient.setQueryData(ASSET_REPAIR_KEYS.detail(data.id), data)
      }

      return { previousAssetRepair, previousAssetRepairs }
    },
    onSuccess: async () => {
      toast.success(
        <Text as="b">{t("form-asset-repair-successfully-updated")}</Text>
      )
      router.push(`${routes.fms.assetRepair}`)
    },
    onError: (err, variables, context) => {
      if (context?.previousAssetRepairs) {
        const queryKey = [
          ASSET_REPAIR_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousAssetRepairs)
      }
      if (context?.previousAssetRepair && variables.id) {
        queryClient.setQueryData(ASSET_REPAIR_KEYS.detail(variables.id), context.previousAssetRepair)
      }
    },
    onSettled: (data) => {
      queryClient.invalidateQueries({
        queryKey: [ASSET_REPAIR_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: ASSET_REPAIR_KEYS.detail(data.id),
        })
      }
    },
  })
}

export function useDeleteAssetRepair() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => AssetRepairService.delete(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({
        queryKey: [ASSET_REPAIR_KEYS.all],
        exact: false,
      })

      const queryKey = [
        ASSET_REPAIR_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousAssetRepairs =
        queryClient.getQueryData<AssetRepairPaginator>(queryKey)

      queryClient.setQueryData<AssetRepairPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => item.id !== id),
          count: old.count - 1,
        }
      })

      return { previousAssetRepairs }
    },
    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-asset-repair-successfully-deleted")}</Text>
      )
    },
    onError: (err, variables, context) => {
      if (context?.previousAssetRepairs) {
        const queryKey = [
          ASSET_REPAIR_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousAssetRepairs)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [ASSET_REPAIR_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeleteAssetRepair() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (ids: number[]) => AssetRepairService.bulk(ids),
    onMutate: async (ids) => {
      await queryClient.cancelQueries({
        queryKey: [ASSET_REPAIR_KEYS.all],
        exact: false,
      })

      const queryKey = [
        ASSET_REPAIR_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousAssetRepairs =
        queryClient.getQueryData<AssetRepairPaginator>(queryKey)

      queryClient.setQueryData<AssetRepairPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => !ids.includes(item.id as number)),
          count: old.count - ids.length,
        }
      })

      return { previousAssetRepairs }
    },
    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-asset-repairs-deleted-successfully")}</Text>
      )
    },
    onError: (err, variables, context) => {
      toast.error(
        <Text as="b">{t("form-asset-repairs-failed-to-delete")}</Text>
      )
      if (context?.previousAssetRepairs) {
        const queryKey = [
          ASSET_REPAIR_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousAssetRepairs)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [ASSET_REPAIR_KEYS.all],
        exact: false,
      })
    },
  })
}
