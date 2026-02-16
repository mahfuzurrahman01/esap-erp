"use client"

import { useRouter } from "next/navigation"
import { routes } from "@/config/routes"
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

import { ZatcaCategoryService } from "../service/zatca-category.service"
import {
  ZatcaCategoryList,
  ZatcaCategoryPaginator,
  ZatcaCategoryQueryOptions,
} from "../types"

const ZATCA_CATEGORY_KEYS = createQueryKeys("zatca-category")

export function useZatcaCategoryList(
  options?: Partial<ZatcaCategoryQueryOptions>
) {
  const queryKey = [ZATCA_CATEGORY_KEYS.all, options]

  return useQuery<ZatcaCategoryPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return ZatcaCategoryService.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function useZatcaCategoryById(id: number) {
  return useQuery<ZatcaCategoryList, Error>({
    queryKey: ZATCA_CATEGORY_KEYS.detail(id),
    queryFn: () => ZatcaCategoryService.get(id),
    enabled: !!id,
  })
}

export function useCreateZatcaCategory() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: ZatcaCategoryList): Promise<ZatcaCategoryList> =>
      ZatcaCategoryService.create(data),
    onMutate: async (newZatcaCategory) => {
      await queryClient.cancelQueries({
        queryKey: [ZATCA_CATEGORY_KEYS.all],
        exact: false,
      })

      const queryKey = [
        ZATCA_CATEGORY_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousZatcaCategories =
        queryClient.getQueryData<ZatcaCategoryPaginator>(queryKey)

      queryClient.setQueryData<ZatcaCategoryPaginator>(queryKey, (old) => {
        if (!old)
          return {
            data: [newZatcaCategory],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [...old.data, { ...newZatcaCategory, id: Date.now() }],
          count: old.count + 1,
        }
      })

      return { previousZatcaCategories }
    },
    onSuccess: async (response) => {
      // const newCompanyId = response.id
      toast.success(
        <Text as="b">{t("form-zatca-category-successfully-created")}</Text>
      )
      router.push(routes.fms.zatcaCategory)
    },
    onError: (err, newZatcaCategory, context) => {
      if (context?.previousZatcaCategories) {
        const queryKey = [
          ZATCA_CATEGORY_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousZatcaCategories)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [ZATCA_CATEGORY_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateZatcaCategory() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: ZatcaCategoryList }) =>
      ZatcaCategoryService.update(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({
        queryKey: [ZATCA_CATEGORY_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: ZATCA_CATEGORY_KEYS.detail(id),
      })

      const queryKey = [
        ZATCA_CATEGORY_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousZatcaCategories =
        queryClient.getQueryData<ZatcaCategoryPaginator>(queryKey)
      const previousZatcaCategory = queryClient.getQueryData<ZatcaCategoryList>(
        ZATCA_CATEGORY_KEYS.detail(id)
      )

      queryClient.setQueryData<ZatcaCategoryPaginator>(queryKey, (old) => {
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

      queryClient.setQueryData(ZATCA_CATEGORY_KEYS.detail(id), data)

      return { previousZatcaCategories, previousZatcaCategory }
    },
    onSuccess: async (response) => {
      const newRuleId = response.id
      toast.success(
        <Text as="b">{t("form-zatca-category-successfully-updated")}</Text>
      )
      // router.push(`${routes.fms.zatcaCategory}/${newRuleId}`)
    },
    onError: (err, variables, context) => {
      if (context?.previousZatcaCategories) {
        const queryKey = [
          ZATCA_CATEGORY_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousZatcaCategories)
      }
      if (context?.previousZatcaCategory) {
        queryClient.setQueryData(
          ZATCA_CATEGORY_KEYS.detail(variables.id),
          context.previousZatcaCategory
        )
      }
    },
    onSettled: (data) => {
      queryClient.invalidateQueries({
        queryKey: [ZATCA_CATEGORY_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: ZATCA_CATEGORY_KEYS.detail(data.id),
        })
      }
    },
  })
}

export function useDeleteZatcaCategory() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => ZatcaCategoryService.delete(id),
    onMutate: async (id) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [ZATCA_CATEGORY_KEYS.all],
        exact: false,
      })

      const queryKey = [
        ZATCA_CATEGORY_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousZatcaCategories =
        queryClient.getQueryData<ZatcaCategoryPaginator>(queryKey)

      // Optimistically remove the ZatcaCategory from the list
      queryClient.setQueryData<ZatcaCategoryPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => item.id !== id),
          count: old.count - 1,
        }
      })

      return { previousZatcaCategories }
    },

    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-zatca-category-successfully-deleted")}</Text>
      )
    },

    onError: (err, variables, context) => {
      // @ts-ignore
      const errorMessage = err?.response?.data?.message;
      if (errorMessage?.includes('referenced')) {
        toast.error(
          <Text as="b">
            {t("form-zatca-category-cannot-delete-referenced")}
          </Text>
        );
      } else {
        toast.error(
          <Text as="b">
            {t("form-zatca-category-failed-to-delete")}
          </Text>
        );
      }
      if (context?.previousZatcaCategories) {
        const queryKey = [
          ZATCA_CATEGORY_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousZatcaCategories)
      }
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [ZATCA_CATEGORY_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeleteZatcaCategory() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (ids: number[]) => ZatcaCategoryService.bulk(ids),
    onMutate: async (ids) => {
      await queryClient.cancelQueries({
        queryKey: [ZATCA_CATEGORY_KEYS.all],
        exact: false,
      })

      const queryKey = [
        ZATCA_CATEGORY_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousZatcaCategories =
        queryClient.getQueryData<ZatcaCategoryPaginator>(queryKey)
      queryClient.setQueryData<ZatcaCategoryPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => !ids.includes(item.id as number)),
          count: old.count - ids.length,
        }
      })

      return { previousZatcaCategories }
    },
    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-zatca-category-deleted-successfully")}</Text>
      )
    },
    onError: (err, variables, context) => {
      // @ts-ignore
      const errorMessage = err?.response?.data?.message;
      if (errorMessage?.includes('REFERENCE constraint')) {
        toast.error(
          <Text as="b">
            {t("form-zatca-category-cannot-delete-referenced")}
          </Text>
        );
      } else {
        toast.error(
          <Text as="b">
            {t("form-zatca-category-failed-to-delete")}
          </Text>
        );
      }
      if (context?.previousZatcaCategories) {
        const queryKey = [
          ZATCA_CATEGORY_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousZatcaCategories)
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [ZATCA_CATEGORY_KEYS.all],
        exact: false,
      })
    },
  })
}
