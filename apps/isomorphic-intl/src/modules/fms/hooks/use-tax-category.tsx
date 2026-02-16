"use client"

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

import { TaxCategoryService } from "../service/tax-category.service"
import {
  TaxCategoryList,
  TaxCategoryPaginator,
  TaxCategoryQueryOptions,
} from "../types/tax-category"

const TAX_CATEGORY_KEYS = createQueryKeys("tax-category")

export function useTaxCategoryList(options?: Partial<TaxCategoryQueryOptions>) {
  const queryKey = [TAX_CATEGORY_KEYS.all, options]

  return useQuery<TaxCategoryPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return TaxCategoryService.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

export function useTaxCategoryById(id: number) {
  return useQuery<TaxCategoryList, Error>({
    queryKey: TAX_CATEGORY_KEYS.detail(id),
    queryFn: () => TaxCategoryService.get(id),
    enabled: !!id,
  })
}

export function useCreateTaxCategory() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: TaxCategoryList): Promise<TaxCategoryList> =>
      TaxCategoryService.create(data),
    onMutate: async (newTaxCategory) => {
      await queryClient.cancelQueries({
        queryKey: [TAX_CATEGORY_KEYS.all],
        exact: false,
      })

      const queryKey = [
        TAX_CATEGORY_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousTaxCategories =
        queryClient.getQueryData<TaxCategoryPaginator>(queryKey)

      queryClient.setQueryData<TaxCategoryPaginator>(queryKey, (old) => {
        if (!old)
          return {
            data: [newTaxCategory],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [...old.data, { ...newTaxCategory, id: Date.now() }],
          count: old.count + 1,
        }
      })

      return { previousTaxCategories }
    },
    onSuccess: async () => {
      toast.success(
        <Text as="b">{t("form-tax-category-successfully-created")}</Text>
      )
    },
    onError: (err, newTaxCategory, context) => {
      if (context?.previousTaxCategories) {
        const queryKey = [
          TAX_CATEGORY_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousTaxCategories)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [TAX_CATEGORY_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateTaxCategory() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: TaxCategoryList }) =>
      TaxCategoryService.update(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({
        queryKey: [TAX_CATEGORY_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: TAX_CATEGORY_KEYS.detail(id),
      })

      const queryKey = [
        TAX_CATEGORY_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousTaxCategories =
        queryClient.getQueryData<TaxCategoryPaginator>(queryKey)
      const previousTaxCategory = queryClient.getQueryData<TaxCategoryList>(
        TAX_CATEGORY_KEYS.detail(id)
      )

      queryClient.setQueryData<TaxCategoryPaginator>(queryKey, (old) => {
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
            item.id === id ? { ...item, ...data } : item
          ),
        }
      })

      queryClient.setQueryData(TAX_CATEGORY_KEYS.detail(id), data)

      return { previousTaxCategories, previousTaxCategory }
    },
    onSuccess: async () => {
      toast.success(
        <Text as="b">{t("form-tax-category-successfully-updated")}</Text>
      )
    },
    onError: (err, variables, context) => {
      if (context?.previousTaxCategories) {
        const queryKey = [
          TAX_CATEGORY_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousTaxCategories)
      }
      if (context?.previousTaxCategory) {
        queryClient.setQueryData(
          TAX_CATEGORY_KEYS.detail(variables.id),
          context.previousTaxCategory
        )
      }
    },
    onSettled: (data) => {
      queryClient.invalidateQueries({
        queryKey: [TAX_CATEGORY_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: TAX_CATEGORY_KEYS.detail(data.id),
        })
      }
    },
  })
}

export function useDeleteTaxCategory() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => TaxCategoryService.delete(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({
        queryKey: [TAX_CATEGORY_KEYS.all],
        exact: false,
      })

      const queryKey = [
        TAX_CATEGORY_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousTaxCategories =
        queryClient.getQueryData<TaxCategoryPaginator>(queryKey)

      // Optimistically remove the COA from the list
      queryClient.setQueryData<TaxCategoryPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => item.id !== id),
          count: old.count - 1,
        }
      })

      return { previousTaxCategories }
    },

    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-tax-category-successfully-deleted")}</Text>
      )
    },

    onError: (err, variables, context) => {
      // @ts-ignore
      const errorMessage = err?.response?.data?.message;
      if (errorMessage?.includes('referenced')) {
        toast.error(
          <Text as="b">
            {t("form-tax-category-cannot-delete-referenced")}
          </Text>
        );
      } else {
        toast.error(
          <Text as="b">
            {t("form-tax-category-failed-to-delete")}
          </Text>
        );
      }
      if (context?.previousTaxCategories) {
        const queryKey = [
          TAX_CATEGORY_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousTaxCategories)
      }
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [TAX_CATEGORY_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeleteTaxCategory() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (ids: number[]) => TaxCategoryService.bulk(ids),
    onMutate: async (ids) => {
      await queryClient.cancelQueries({
        queryKey: [TAX_CATEGORY_KEYS.all],
        exact: false,
      })

      const queryKey = [
        TAX_CATEGORY_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousTaxCategories =
        queryClient.getQueryData<TaxCategoryPaginator>(queryKey)
      queryClient.setQueryData<TaxCategoryPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => !ids.includes(item.id as number)),
          count: old.count - ids.length,
        }
      })

      return { previousTaxCategories }
    },
    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-tax-category-deleted-successfully")}</Text>
      )
    },
    onError: (err, variables, context) => {
      // @ts-ignore
      const errorMessage = err?.response?.data?.message;
      if (errorMessage?.includes('REFERENCE constraint')) {
        toast.error(
          <Text as="b">
            {t("form-tax-category-cannot-delete-referenced")}
          </Text>
        );
      } else {
        toast.error(
          <Text as="b">
            {t("form-tax-category-failed-to-delete")}
          </Text>
        );
      }
      if (context?.previousTaxCategories) {
        const queryKey = [
          TAX_CATEGORY_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousTaxCategories)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [TAX_CATEGORY_KEYS.all],
        exact: false,
      })
    },
  })
}
