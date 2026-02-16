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
import { AssetMovementService } from "@/modules/fms/service/asset-movement.service"
import {
  AssetMovementList,
  AssetMovementPaginator,
  AssetMovementQueryOptions,
} from "@/modules/fms/types"
import { createQueryKeys } from "@/server/service/query-config"

const ASSET_MOVEMENT_KEYS = createQueryKeys("asset-movement")

export function useAssetMovementList(
  options?: Partial<AssetMovementQueryOptions>
) {
  const queryKey = [ASSET_MOVEMENT_KEYS.all, options]

  return useQuery<AssetMovementPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return AssetMovementService.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function useAssetMovementById(id: number) {
  return useQuery<AssetMovementList, Error>({
    queryKey: ASSET_MOVEMENT_KEYS.detail(id),
    queryFn: () => AssetMovementService.get(id),
    enabled: !!id,
  })
}

export function useCreateAssetMovement() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: AssetMovementList): Promise<AssetMovementList> =>
      AssetMovementService.create(data),
    onMutate: async (newAssetMovement) => {
      await queryClient.cancelQueries({
        queryKey: [ASSET_MOVEMENT_KEYS.all],
        exact: false,
      })

      const queryKey = [
        ASSET_MOVEMENT_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousAssetMovements =
        queryClient.getQueryData<AssetMovementPaginator>(queryKey)

      queryClient.setQueryData<AssetMovementPaginator>(queryKey, (old) => {
        if (!old)
          return {
            data: [newAssetMovement],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [...old.data, { ...newAssetMovement, id: Date.now() }],
          count: old.count + 1,
        }
      })

      return { previousAssetMovements }
    },
    onSuccess: async (response) => {
      const newAssetMovementId = response.id
      queryClient.setQueryData(ASSET_MOVEMENT_KEYS.detail(newAssetMovementId!), response)
      toast.success(
        <Text as="b">{t("form-asset-movement-successfully-created")}</Text>
      )
      router.push(`${routes.fms.assetMovement}`)
    },
    onError: (err, newBankTransaction, context) => {
      toast.error(
        <Text as="b">{t("form-asset-movement-failed-to-create")}</Text>
      )
      if (context?.previousAssetMovements) {
        const queryKey = [
          ASSET_MOVEMENT_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousAssetMovements)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [ASSET_MOVEMENT_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateAssetMovement() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: AssetMovementList) => AssetMovementService.update(data),
    onMutate: async (data) => {
      await queryClient.cancelQueries({
        queryKey: [ASSET_MOVEMENT_KEYS.all],
        exact: false,
      })

      // Only cancel queries if id exists
      if (data.id) {
        await queryClient.cancelQueries({
          queryKey: ASSET_MOVEMENT_KEYS.detail(data.id),
        })
      }

      const queryKey = [
        ASSET_MOVEMENT_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousAssetMovements = queryClient.getQueryData<AssetMovementPaginator>(queryKey)

      // Only get previous country data if id exists
      const previousAssetMovement = data.id
        ? queryClient.getQueryData<AssetMovementList>(ASSET_MOVEMENT_KEYS.detail(data.id))
        : undefined

      queryClient.setQueryData<AssetMovementPaginator>(queryKey, (old) => {
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
        queryClient.setQueryData(ASSET_MOVEMENT_KEYS.detail(data.id), data)
      }

      return { previousAssetMovement, previousAssetMovements }
    },
    onSuccess: async () => {
      toast.success(
        <Text as="b">{t("form-asset-movement-successfully-updated")}</Text>
      )
      router.push(`${routes.fms.assetMovement}`)
    },
    onError: (err, variables, context) => {
      if (context?.previousAssetMovements) {
        const queryKey = [
          ASSET_MOVEMENT_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousAssetMovements)
      }
      if (context?.previousAssetMovement && variables.id) {
        queryClient.setQueryData(ASSET_MOVEMENT_KEYS.detail(variables.id), context.previousAssetMovement)
      }
    },
    onSettled: (data) => {
      queryClient.invalidateQueries({
        queryKey: [ASSET_MOVEMENT_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: ASSET_MOVEMENT_KEYS.detail(data.id),
        })
      }
    },
  })
}

export function useDeleteAssetMovement() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => AssetMovementService.delete(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({
        queryKey: [ASSET_MOVEMENT_KEYS.all],
        exact: false,
      })

      const queryKey = [
        ASSET_MOVEMENT_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousAssetMovements =
        queryClient.getQueryData<AssetMovementPaginator>(queryKey)

      queryClient.setQueryData<AssetMovementPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => item.id !== id),
          count: old.count - 1,
        }
      })

      return { previousAssetMovements }
    },
    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-asset-movement-successfully-deleted")}</Text>
      )
    },
    onError: (err, variables, context) => {
      if (context?.previousAssetMovements) {
        const queryKey = [
          ASSET_MOVEMENT_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousAssetMovements)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [ASSET_MOVEMENT_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeleteAssetMovement() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (ids: number[]) => AssetMovementService.bulk(ids),
    onMutate: async (ids) => {
      await queryClient.cancelQueries({
        queryKey: [ASSET_MOVEMENT_KEYS.all],
        exact: false,
      })

      const queryKey = [
        ASSET_MOVEMENT_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousAssetMovements =
        queryClient.getQueryData<AssetMovementPaginator>(queryKey)

      // Optimistically remove the bank transactions from the list
      queryClient.setQueryData<AssetMovementPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => !ids.includes(item.id as number)),
          count: old.count - ids.length,
        }
      })

      return { previousAssetMovements }
    },
    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-asset-movements-deleted-successfully")}</Text>
      )
    },
    onError: (err, variables, context) => {
      toast.error(<Text as="b">{t("form-assets-failed-to-delete")}</Text>)
      if (context?.previousAssetMovements) {
        const queryKey = [
          ASSET_MOVEMENT_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousAssetMovements)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [ASSET_MOVEMENT_KEYS.all],
        exact: false,
      })
    },
  })
}
