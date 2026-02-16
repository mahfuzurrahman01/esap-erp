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
import { createQueryKeys } from "@/server/service/query-config"

import { AssetCategoryService } from "../service/asset-category.service"
import {
  AssetCategoryList,
  AssetCategoryPaginator,
  AssetCategoryQueryOptions,
} from "../types"

const ASSET_CATEGORY_KEYS = createQueryKeys("assetCategory")

export function useAssetCategoryList(
  options?: Partial<AssetCategoryQueryOptions>
) {
  const queryKey = [ASSET_CATEGORY_KEYS.all, options]

  return useQuery<AssetCategoryPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return AssetCategoryService.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function useAssetCategoryById(id: number) {
  return useQuery<AssetCategoryList, Error>({
    queryKey: ASSET_CATEGORY_KEYS.detail(id),
    queryFn: () => AssetCategoryService.get(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function useCreateAssetCategory() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: AssetCategoryList): Promise<AssetCategoryList> =>
      AssetCategoryService.create(data),
    onMutate: async (newAssetCategory) => {
      await queryClient.cancelQueries({
        queryKey: [ASSET_CATEGORY_KEYS.all],
        exact: false,
      })

      const queryKey = [
        ASSET_CATEGORY_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousAssetCategories =
        queryClient.getQueryData<AssetCategoryPaginator>(queryKey)

      queryClient.setQueryData<AssetCategoryPaginator>(queryKey, (old) => {
        if (!old)
          return {
            data: [newAssetCategory],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [...old.data, { ...newAssetCategory, id: Date.now() }],
          count: old.count + 1,
        }
      })

      return { previousAssetCategories }
    },
    onSuccess: async (response) => {
      const newAssetCategoryId = response.id
      queryClient.setQueryData(ASSET_CATEGORY_KEYS.detail(newAssetCategoryId!), response)
      toast.success(
        <Text as="b">{t("form-asset-category-successfully-created")}</Text>
      )
    },
    onError: (err, newBankTransaction, context) => {
      toast.error(
        <Text as="b">{t("form-asset-category-failed-to-create")}</Text>
      )
      if (context?.previousAssetCategories) {
        const queryKey = [
          ASSET_CATEGORY_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousAssetCategories)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [ASSET_CATEGORY_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateAssetCategory() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: AssetCategoryList) =>
      AssetCategoryService.update(data),
    onMutate: async (data) => {
      await queryClient.cancelQueries({
        queryKey: [ASSET_CATEGORY_KEYS.all],
        exact: false,
      })

      // Only cancel queries if id exists
      if (data.id) {
        await queryClient.cancelQueries({
          queryKey: ASSET_CATEGORY_KEYS.detail(data.id),
        })
      }

      const queryKey = [
        ASSET_CATEGORY_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousAssetCategories =
        queryClient.getQueryData<AssetCategoryPaginator>(queryKey)

      // Only get previous country data if id exists
      const previousAssetCategory = data.id
        ? queryClient.getQueryData<AssetCategoryList>(
          ASSET_CATEGORY_KEYS.detail(data.id)
        )
        : undefined

      queryClient.setQueryData<AssetCategoryPaginator>(queryKey, (old) => {
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
        queryClient.setQueryData(
          ASSET_CATEGORY_KEYS.detail(data.id),
          data
        )
      }

      return { previousAssetCategories, previousAssetCategory }
    },
    onSuccess: async () => {
      toast.success(
        <Text as="b">{t("form-asset-category-successfully-updated")}</Text>
      )
      router.refresh()
    },
    onError: (err, variables, context) => {
      if (context?.previousAssetCategories) {
        const queryKey = [
          ASSET_CATEGORY_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousAssetCategories)
      }
      if (context?.previousAssetCategory && variables.id) {
        queryClient.setQueryData(
          ASSET_CATEGORY_KEYS.detail(variables.id),
          context.previousAssetCategory
        )
      }
    },
    onSettled: (data) => {
      queryClient.invalidateQueries({
        queryKey: [ASSET_CATEGORY_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: ASSET_CATEGORY_KEYS.detail(data.id),
        })
      }
    },
  })
}

export function useDeleteAssetCategory() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => AssetCategoryService.delete(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({
        queryKey: [ASSET_CATEGORY_KEYS.all],
        exact: false,
      })

      const queryKey = [
        ASSET_CATEGORY_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousAssetCategories =
        queryClient.getQueryData<AssetCategoryPaginator>(queryKey)

      queryClient.setQueryData<AssetCategoryPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => item.id !== id),
          count: old.count - 1,
        }
      })

      return { previousAssetCategories }
    },
    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-asset-category-successfully-deleted")}</Text>
      )
    },
    onError: (err, variables, context) => {
      if (context?.previousAssetCategories) {
        const queryKey = [
          ASSET_CATEGORY_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousAssetCategories)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [ASSET_CATEGORY_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeleteAssetCategory() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (ids: number[]) => AssetCategoryService.bulk(ids),
    onMutate: async (ids) => {
      await queryClient.cancelQueries({
        queryKey: [ASSET_CATEGORY_KEYS.all],
        exact: false,
      })

      const queryKey = [
        ASSET_CATEGORY_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousAssetCategories =
        queryClient.getQueryData<AssetCategoryPaginator>(queryKey)

      // Optimistically remove the bank transactions from the list
      queryClient.setQueryData<AssetCategoryPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => !ids.includes(item.id as number)),
          count: old.count - ids.length,
        }
      })

      return { previousAssetCategories }
    },
    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-asset-category-deleted-successfully")}</Text>
      )
    },
    onError: (err, variables, context) => {
      toast.error(
        <Text as="b">{t("form-asset-category-failed-to-delete")}</Text>
      )
      if (context?.previousAssetCategories) {
        const queryKey = [
          ASSET_CATEGORY_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousAssetCategories)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [ASSET_CATEGORY_KEYS.all],
        exact: false,
      })
    },
  })
}
