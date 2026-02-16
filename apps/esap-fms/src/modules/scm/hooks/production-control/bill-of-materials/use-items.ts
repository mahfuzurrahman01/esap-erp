"use client"

import { useRouter } from "next/navigation"
import { useCallback } from "react"

import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import toast from "react-hot-toast"

import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/config/constants"
import { routes } from "@/config/routes"
import { ItemService } from "@/modules/scm/service/production-control/bill-of-materials/items.service"
import {
  Item,
  ItemPaginator,
  ItemQueryOptions,
} from "@/modules/scm/types/production-control/bill-of-materials/items-types"
import {
  DEFAULT_QUERY_OPTIONS,
  createQueryKeys,
} from "@/server/service/query-config"

const ITEM_KEYS = createQueryKeys("item")

export function useItemsList(options?: Partial<ItemQueryOptions>) {
  const queryKey = [ITEM_KEYS.all, options]

  return useQuery<ItemPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return ItemService.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function useItemById(id: number) {
  return useQuery({
    queryKey: [ITEM_KEYS.detail(id)],
    queryFn: () => ItemService.get(id),
    enabled: !!id,
    ...DEFAULT_QUERY_OPTIONS,
  })
}

export function useCreateItem() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: Item): Promise<Item> => ItemService.create(data),
    onMutate: async (newItem) => {
      await queryClient.cancelQueries({
        queryKey: [ITEM_KEYS.all],
        exact: false,
      })
      const queryKey = [
        ITEM_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]
      const previousItems = queryClient.getQueryData<ItemPaginator>(queryKey)
      queryClient.setQueryData<ItemPaginator>(queryKey, (old) => {
        if (!old)
          return {
            data: [newItem],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [...old.data, { ...newItem, id: Date.now() }],
          count: old.count + 1,
        }
      })
      return { previousItems }
    },
    onSuccess: () => {
      toast.success(t("form-created-successfully"))
      router.push(routes.scm.productionControl.settings.item)
    },
    onError: (err: any, newItem, context) => {
      if (context?.previousItems) {
        const queryKey = [
          ITEM_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousItems)
      }
      if (err.response?.status === 400) {
        toast.error(t("form-data-already-exists"))
      } else if (err.response?.status === 404) {
        toast.error(t("form-not-found"))
      } else if (err.response?.status === 403) {
        toast.error(t("form-forbidden"))
      } else if (err.response?.status === 401) {
        toast.error(t("form-unauthorized"))
      } else if (err.response?.status === 500) {
        toast.error(t("form-server-error"))
      } else {
        toast.error(err.response.data)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [ITEM_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateItem() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")
  const router = useRouter()
  return useMutation({
    mutationFn: ({ data }: { data: Item }) => ItemService.update(data),
    onMutate: async ({ data }) => {
      await queryClient.cancelQueries({
        queryKey: [ITEM_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: [ITEM_KEYS.detail(data.id!)],
      })
      const queryKey = [
        ITEM_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]
      const previousItems = queryClient.getQueryData<ItemPaginator>(queryKey)
      const previousItem = queryClient.getQueryData<Item>(
        ITEM_KEYS.detail(data.id!)
      )
      queryClient.setQueryData<ItemPaginator>(queryKey, (old) => {
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
      queryClient.setQueryData(ITEM_KEYS.detail(data.id!), data)
      return { previousItems, previousItem }
    },
    onError: (err: any, variables, context) => {
      if (context?.previousItems) {
        const queryKey = [
          ITEM_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousItems)
      }
      if (context?.previousItem) {
        queryClient.setQueryData(
          ITEM_KEYS.detail(variables.data.id!),
          context.previousItem
        )
      }
      toast.error(t("form-updating-error"))
      // toast.error(err.response.data)
    },
    onSettled: (data) => {
      queryClient.invalidateQueries({
        queryKey: [ITEM_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: [ITEM_KEYS.detail(data.id!)],
        })
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ITEM_KEYS.all,
      })
      queryClient.invalidateQueries({
        queryKey: [ITEM_KEYS.detail(data.id!)],
      })
      toast.success(t("form-updated-successfully"))
      router.push(routes.scm.productionControl.settings.item)
    },
  })
}

export function useDeleteItem() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => ItemService.delete(id),
    onMutate: async (id) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [ITEM_KEYS.all],
        exact: false,
      })

      const queryKey = [
        ITEM_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousItems = queryClient.getQueryData<ItemPaginator>(queryKey)

      // Optimistically remove the stock transfer from the list
      queryClient.setQueryData<ItemPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => item.id !== id),
          count: old.count - 1,
        }
      })

      return { previousItems }
    },

    onSuccess: () => {
      toast.success(t("form-successfully-deleted"))
    },

    onError: (err: any, variables, context) => {
      if (context?.previousItems) {
        const queryKey = [
          ITEM_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousItems)
      }
      toast.error(t("form-error-delete"))
      // toast.error(err?.response?.data)
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [ITEM_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeleteItem() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    // Change mutationFn to accept an array of IDs
    mutationFn: (ids: number[]) => ItemService.bulkDelete(ids),
    onMutate: async (ids) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [ITEM_KEYS.all],
        exact: false,
      })

      const queryKey = [
        ITEM_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousItems = queryClient.getQueryData<ItemPaginator>(queryKey)

      // Optimistically remove multiple items from the list
      queryClient.setQueryData<ItemPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => !ids.includes(item.id!)),
          count: old.count - ids.length,
        }
      })

      return { previousItems }
    },

    onSuccess: (_, ids) => {
      const count = ids.length
      toast.success(
        count === 1
          ? t("form-successfully-deleted")
          : t("form-successfully-bulk-deleted", { count })
      )
    },

    onError: (err: any, variables, context) => {
      if (context?.previousItems) {
        const queryKey = [
          ITEM_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousItems)
      }
      toast.error(t("form-error-bulk-delete"))
      // toast.error(err?.response?.data)
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [ITEM_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useItemsOperations() {
  const queryClient = useQueryClient()

  const invalidateItemsQueries = useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: ["items-list"],
    })
  }, [queryClient])

  return {
    invalidateItemsQueries,
  }
}
