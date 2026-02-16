"use client"

import { useRouter } from "next/navigation"

import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import toast from "react-hot-toast"

import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/config/constants"
import { category } from "@/modules/crm/service/category.service"
import {
  CategoryList,
  CategoryPaginator,
  CategoryQueryOptions,
} from "@/modules/crm/types/category"
import {
  DEFAULT_QUERY_OPTIONS,
  createQueryKeys,
} from "@/server/service/query-config"

export const CATEGORY_KEYS = createQueryKeys("category")

export function useCategoryList(options?: Partial<CategoryQueryOptions>) {
  const queryKey = [CATEGORY_KEYS.all, options]

  return useQuery<CategoryPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return category.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    throwOnError: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

export function useCategoryById(id: any) {
  return useQuery({
    queryKey: [CATEGORY_KEYS.detail(id)],
    queryFn: () => category.get(id),
    enabled: !!id,
    ...DEFAULT_QUERY_OPTIONS,
  })
}

export function useCreateCategory() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: any): Promise<any> => category.create(data),
    onMutate: async (newCategory) => {
      await queryClient.cancelQueries({
        queryKey: [CATEGORY_KEYS.all],
        exact: false,
      })

      const queryKey = [
        CATEGORY_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousCountries =
        queryClient.getQueryData<CategoryPaginator>(queryKey)

      queryClient.setQueryData<CategoryPaginator>(queryKey, (old: any) => {
        if (!old)
          return {
            data: [newCategory],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [...old.data, { ...newCategory, id: Date.now() }],
          count: old.count + 1,
        }
      })

      return { previousCountries }
    },
    onSuccess: () => {
      toast.success(t("form-category-created-successfully"))
      router.refresh()
    },
    onError: (err, newCategory, context) => {
      toast.error(t("form-failed-to-create-category"))
      if (context?.previousCountries) {
        const queryKey = [
          CATEGORY_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousCountries)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [CATEGORY_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateCategory() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: ({ id, data }: { id: any; data: any }) =>
      category.update(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({
        queryKey: [CATEGORY_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: CATEGORY_KEYS.detail(id),
      })

      const queryKey = [
        CATEGORY_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousCountries =
        queryClient.getQueryData<CategoryPaginator>(queryKey)
      const previousCategory = queryClient.getQueryData<CategoryList>(
        CATEGORY_KEYS.detail(id)
      )

      queryClient.setQueryData<CategoryPaginator>(queryKey, (old: any) => {
        if (!old)
          return {
            data: [data],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: old.data.map((item: any) =>
            item.id === id ? { ...item, ...data } : item
          ),
        }
      })

      queryClient.setQueryData(CATEGORY_KEYS.detail(id), data)

      return { previousCountries, previousCategory }
    },
    onSuccess: () => {
      toast.success(t("form-category-updated-successfully"))
      router.refresh()
    },
    onError: (err, variables, context) => {
      toast.error(t("form-failed-to-update-category"))
      if (context?.previousCountries) {
        const queryKey = [
          CATEGORY_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousCountries)
      }
      if (context?.previousCategory) {
        queryClient.setQueryData(
          CATEGORY_KEYS.detail(variables.id),
          context.previousCategory
        )
      }
    },
    onSettled: (data: any) => {
      queryClient.invalidateQueries({
        queryKey: [CATEGORY_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: CATEGORY_KEYS.detail(data.id),
        })
      }
    },
  })
}

export function useDeleteCategory() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: any) => category.delete(id),
    onMutate: async (id) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [CATEGORY_KEYS.all],
        exact: false,
      })

      const queryKey = [
        CATEGORY_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousCountries =
        queryClient.getQueryData<CategoryPaginator>(queryKey)

      // Optimistically remove the COA from the list
      queryClient.setQueryData<CategoryPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => item.id !== id),
          count: old.count - 1,
        }
      })

      return { previousCountries }
    },

    onSuccess: () => {
      toast.success(t("form-category-deleted-successfully"))
    },

    onError: (err:any, variables, context) => {
      if(err.response.data.details){
        toast.error(err.response.data.details)
      }else{
        toast.error(t("form-failed-to-delete-category"))
      }
      if (context?.previousCountries) {
        const queryKey = [
          CATEGORY_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousCountries)
      }
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [CATEGORY_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeleteCategory() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    // Change mutationFn to accept an array of IDs
    mutationFn: (ids: number[]) => category.bulkDelete(ids),
    onMutate: async (ids) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [CATEGORY_KEYS.all],
        exact: false,
      })

      const queryKey = [
        CATEGORY_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousItems = queryClient.getQueryData<CategoryPaginator>(queryKey)

      // Optimistically remove multiple items from the list
      queryClient.setQueryData<CategoryPaginator>(queryKey, (old) => {
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
          CATEGORY_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousItems)
      }
      if(err.response.data.details){
        toast.error(err.response.data.details)
      }else{
        toast.error(t("form-error-bulk-delete"))
      }
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [CATEGORY_KEYS.all],
        exact: false,
      })
    },
  })
}
