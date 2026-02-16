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
  AssetList,
  AssetPaginator,
  AssetQueryOptions,
} from "@/modules/fms/types/asset"
import { createQueryKeys } from "@/server/service/query-config"

import { AssetService } from "../service/asset.service"

const ASSET_KEYS = createQueryKeys("asset")

export function useAssetList(options?: Partial<AssetQueryOptions>) {
  const queryKey = [ASSET_KEYS.all, options]

  return useQuery<AssetPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return AssetService.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function useAssetById(id: number) {
  return useQuery<AssetList, Error>({
    queryKey: ASSET_KEYS.detail(id),
    queryFn: () => AssetService.get(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function useCreateAsset() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: AssetList): Promise<AssetList> =>
      AssetService.create(data),
    onMutate: async (newAsset) => {
      await queryClient.cancelQueries({
        queryKey: [ASSET_KEYS.all],
        exact: false,
      })

      const queryKey = [
        ASSET_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousAssets = queryClient.getQueryData<AssetPaginator>(queryKey)

      queryClient.setQueryData<AssetPaginator>(queryKey, (old) => {
        if (!old)
          return {
            data: [newAsset],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [...old.data, { ...newAsset, id: Date.now() }],
          count: old.count + 1,
        }
      })

      return { previousAssets }
    },
    onSuccess: async () => {
      toast.success(<Text as="b">{t("form-asset-created-successfully")}</Text>)
      router.push(`${routes.fms.asset}`)
    },
    onError: (err, newAsset, context) => {
      toast.error(<Text as="b">{t("form-asset-failed-to-create")}</Text>)
      if (context?.previousAssets) {
        const queryKey = [
          ASSET_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousAssets)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [ASSET_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateAsset() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: AssetList) => AssetService.update(data),
    onMutate: async (data) => {
      await queryClient.cancelQueries({
        queryKey: [ASSET_KEYS.all],
        exact: false,
      })

      // Only cancel queries if id exists
      if (data.id) {
        await queryClient.cancelQueries({
          queryKey: ASSET_KEYS.detail(data.id),
        })
      }

      const queryKey = [
        ASSET_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousAssets = queryClient.getQueryData<AssetPaginator>(queryKey)

      // Only get previous country data if id exists
      const previousAsset = data.id
        ? queryClient.getQueryData<AssetList>(ASSET_KEYS.detail(data.id))
        : undefined

      queryClient.setQueryData<AssetPaginator>(queryKey, (old) => {
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
        queryClient.setQueryData(ASSET_KEYS.detail(data.id), data)
      }

      return { previousAsset, previousAssets }
    },
    onSuccess: async () => {
      toast.success(
        <Text as="b">{t("form-asset-successfully-updated")}</Text>
      )
      router.push(`${routes.fms.asset}`)
    },
    onError: (err, variables, context) => {
      if (context?.previousAssets) {
        const queryKey = [
          ASSET_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousAssets)
      }
      if (context?.previousAsset && variables.id) {
        queryClient.setQueryData(ASSET_KEYS.detail(variables.id), context.previousAsset)
      }
    },
    onSettled: (data) => {
      queryClient.invalidateQueries({
        queryKey: [ASSET_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: ASSET_KEYS.detail(data.id),
        })
      }
    },
  })
}

export function useDeleteAsset() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => AssetService.delete(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({
        queryKey: [ASSET_KEYS.all],
        exact: false,
      })

      const queryKey = [
        ASSET_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousAssets = queryClient.getQueryData<AssetPaginator>(queryKey)

      queryClient.setQueryData<AssetPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => item.id !== id),
          count: old.count - 1,
        }
      })

      return { previousAssets }
    },
    onSuccess: () => {
      toast.success(<Text as="b">{t("form-asset-deleted-successfully")}</Text>)
    },
    onError: (err, variables, context) => {
      // @ts-ignore
      toast.error(<Text as="b">{err.response?.data?.message}</Text>)
      if (context?.previousAssets) {
        const queryKey = [
          ASSET_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousAssets)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [ASSET_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeleteAsset() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (ids: number[]) => AssetService.bulk(ids),
    onMutate: async (ids) => {
      await queryClient.cancelQueries({
        queryKey: [ASSET_KEYS.all],
        exact: false,
      })

      const queryKey = [
        ASSET_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousAssets = queryClient.getQueryData<AssetPaginator>(queryKey)

      // Optimistically remove the bank transactions from the list
      queryClient.setQueryData<AssetPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => !ids.includes(item.id as number)),
          count: old.count - ids.length,
        }
      })

      return { previousAssets }
    },
    onSuccess: () => {
      toast.success(<Text as="b">{t("form-assets-deleted-successfully")}</Text>)
    },
    onError: (err, variables, context) => {
      // @ts-ignore
      const errorMessage = err?.response?.data?.message;
      if (errorMessage?.includes('REFERENCE constraint')) {
        toast.error(
          <Text as="b">
            {t("form-asset-cannot-delete-referenced")}
          </Text>
        );
      } else {
        toast.error(
          <Text as="b">
            {t("form-asset-failed-to-delete")}
          </Text>
        );
      }
      if (context?.previousAssets) {
        const queryKey = [
          ASSET_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousAssets)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [ASSET_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useCheckProductAsset() {
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (productId: number) => AssetService.checkProductAsset(productId),
    onSuccess: (data) => {
      if (data === true) {
        toast.error(<Text as="b">{t("form-product-not-available")}</Text>)
      }
    },
    onError: () => {
      toast.error(<Text as="b">{t("form-product-check-failed")}</Text>)
    },
  })
}

export function useAssetListWithoutMovement(options?: Partial<AssetQueryOptions>) {
  const queryKey = [ASSET_KEYS.all, options]

  return useQuery<AssetPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return AssetService.getAssetWithoutMovement(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}