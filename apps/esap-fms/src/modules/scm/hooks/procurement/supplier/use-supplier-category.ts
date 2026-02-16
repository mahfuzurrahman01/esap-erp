"use client";

import { useCallback } from "react";



import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";



import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/config/constants";
import { SupplierCategoryService } from "@/modules/scm/service/procurement/supplier/supplier-category.service";
import { SupplierCategory, SupplierCategoryPaginator, SupplierCategoryQueryOptions } from "@/modules/scm/types/procurement/supplier/supplier-category-types";
import { DEFAULT_QUERY_OPTIONS, createQueryKeys } from "@/server/service/query-config";





const SUPPLIER_CATEGORY_KEYS = createQueryKeys("supplier-category")

export function useSupplierCategoryList(
  options?: Partial<SupplierCategoryQueryOptions>
) {
  const queryKey = [SUPPLIER_CATEGORY_KEYS.all, options]

  return useQuery<SupplierCategoryPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return SupplierCategoryService.all(
        Object.assign({}, queryKey[1], pageParam)
      )
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function useSupplierCategoryById(id: number) {
  return useQuery({
    queryKey: [SUPPLIER_CATEGORY_KEYS.detail(id)],
    queryFn: () => SupplierCategoryService.get(id),
    enabled: !!id,
    ...DEFAULT_QUERY_OPTIONS,
  })
}

export function useCreateSupplierCategory() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: SupplierCategory): Promise<SupplierCategory> =>
      SupplierCategoryService.create(data),
    onMutate: async (newSupplierCategory) => {
      await queryClient.cancelQueries({
        queryKey: [SUPPLIER_CATEGORY_KEYS.all],
        exact: false,
      })
      const queryKey = [
        SUPPLIER_CATEGORY_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]
      const previousSupplierCategory =
        queryClient.getQueryData<SupplierCategoryPaginator>(queryKey)
      queryClient.setQueryData<SupplierCategoryPaginator>(queryKey, (old) => {
        if (!old)
          return {
            data: [newSupplierCategory],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [
            ...old.data,
            {
              ...newSupplierCategory,
              id: Date.now(),
            },
          ],
          count: old.count + 1,
        }
      })
      return { previousSupplierCategory }
    },
    onSuccess: () => {
      toast.success(t("form-successfully-created"))
    },
    onError: (err: any, newSupplierCategory, context) => {
      if (context?.previousSupplierCategory) {
        const queryKey = [
          SUPPLIER_CATEGORY_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousSupplierCategory)
      }
      if (err.response?.status === 400) {
        toast.error(t("form-data-already-exists"))
      } else if (err.response?.status === 404) {
        toast.error(t("form-not-found"))
      } else if (err.response?.status === 403) {
        toast.error(t("form-forbidden"))
      } else if (err.response?.status === 401) {
        toast.error(t("form-unauthorized"))
      } else if (err.response?.status === 409) {
        toast.error(t("form-conflict"))
      } else if (err.response?.status === 422) {
        toast.error(t("form-validation-failed"))
      } else if (err.response?.status === 429) {
        toast.error(t("form-too-many-requests"))
      } else if (err.response?.status === 500) {
        toast.error(t("form-server-error"))
      } else if (err.response?.status === 502) {
        toast.error(t("form-bad-gateway"))
      } else if (err.response?.status === 503) {
        toast.error(t("form-service-unavailable"))
      } else if (err.response?.status === 504) {
        toast.error(t("form-gateway-timeout"))
      } else {
        toast.error(err.response?.data || t("form-unknown-error"))
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [SUPPLIER_CATEGORY_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateSupplierCategory() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: ({ data }: { data: SupplierCategory }) =>
      SupplierCategoryService.update(data),
    onMutate: async ({ data }) => {
      await queryClient.cancelQueries({
        queryKey: [SUPPLIER_CATEGORY_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: SUPPLIER_CATEGORY_KEYS.detail(data.id!),
      })
      const queryKey = [
        SUPPLIER_CATEGORY_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]
      const previousSupplierCategory =
        queryClient.getQueryData<SupplierCategoryPaginator>(queryKey)
      const previousSupplierCategoryDetail =
        queryClient.getQueryData<SupplierCategory>(
          SUPPLIER_CATEGORY_KEYS.detail(data.id!)
        )
      queryClient.setQueryData<SupplierCategoryPaginator>(queryKey, (old) => {
        if (!old)
          return {
            data: [data as unknown as SupplierCategory],
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
      queryClient.setQueryData(SUPPLIER_CATEGORY_KEYS.detail(data.id!), data)
      return { previousSupplierCategory, previousSupplierCategoryDetail }
    },
    onError: (err: any, variables, context) => {
      if (context?.previousSupplierCategory) {
        const queryKey = [
          SUPPLIER_CATEGORY_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousSupplierCategory)
      }
      if (context?.previousSupplierCategoryDetail) {
        queryClient.setQueryData(
          SUPPLIER_CATEGORY_KEYS.detail(variables.data.id!),
          context.previousSupplierCategoryDetail
        )
      }
      if (err.response?.status === 400) {
        toast.error(t("form-data-already-exists"))
      } else if (err.response?.status === 404) {
        toast.error(t("form-not-found"))
      } else if (err.response?.status === 403) {
        toast.error(t("form-forbidden"))
      } else if (err.response?.status === 401) {
        toast.error(t("form-unauthorized"))
      } else if (err.response?.status === 409) {
        toast.error(t("form-conflict"))
      } else if (err.response?.status === 422) {
        toast.error(t("form-validation-failed"))
      } else if (err.response?.status === 429) {
        toast.error(t("form-too-many-requests"))
      } else if (err.response?.status === 500) {
        toast.error(t("form-server-error"))
      } else if (err.response?.status === 502) {
        toast.error(t("form-bad-gateway"))
      } else if (err.response?.status === 503) {
        toast.error(t("form-service-unavailable"))
      } else if (err.response?.status === 504) {
        toast.error(t("form-gateway-timeout"))
      } else {
        toast.error(err.response?.data || t("form-unknown-error"))
      }
    },
    onSettled: (data) => {
      queryClient.invalidateQueries({
        queryKey: [SUPPLIER_CATEGORY_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: [SUPPLIER_CATEGORY_KEYS.detail(data.id!)],
        })
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [SUPPLIER_CATEGORY_KEYS.all] })
      queryClient.invalidateQueries({
        queryKey: [SUPPLIER_CATEGORY_KEYS.detail(data.id!)],
      })
      toast.success(t("form-successfully-update"))
    },
  })
}

export function useDeleteSupplierCategory() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => SupplierCategoryService.delete(id),
    onMutate: async (id) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [SUPPLIER_CATEGORY_KEYS.all],
        exact: false,
      })

      const queryKey = [
        SUPPLIER_CATEGORY_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousSupplierCategory =
        queryClient.getQueryData<SupplierCategoryPaginator>(queryKey)

      // Optimistically remove the COA from the list
      queryClient.setQueryData<SupplierCategoryPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => item.id !== id),
          count: old.count - 1,
        }
      })

      return { previousSupplierCategory }
    },

    onSuccess: () => {
      toast.success(t("form-successfully-deleted"))
    },

    onError: (err, variables, context) => {
      toast.error(t("form-error-deleting"))
      if (context?.previousSupplierCategory) {
        const queryKey = [
          SUPPLIER_CATEGORY_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousSupplierCategory)
      }
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [SUPPLIER_CATEGORY_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeleteSupplierCategory() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    // Change mutationFn to accept an array of IDs
    mutationFn: (ids: number[]) => SupplierCategoryService.bulkDelete(ids),
    onMutate: async (ids) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [SUPPLIER_CATEGORY_KEYS.all],
        exact: false,
      })

      const queryKey = [
        SUPPLIER_CATEGORY_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousSupplierCategory =
        queryClient.getQueryData<SupplierCategoryPaginator>(queryKey)

      // Optimistically remove multiple items from the list
      queryClient.setQueryData<SupplierCategoryPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => !ids.includes(item.id!)),
          count: old.count - ids.length,
        }
      })

      return { previousSupplierCategory }
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
      toast.error(t("form-error-deleting"))
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousSupplierCategory) {
        const queryKey = [
          SUPPLIER_CATEGORY_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousSupplierCategory)
      }
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [SUPPLIER_CATEGORY_KEYS.all],
        exact: false,
      })
    },
  })
}

// Utility hook for Supplier Category operations
export function useSupplierCategoryOperations() {
  const queryClient = useQueryClient()

  const invalidateSupplierCategoryQueries = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ["supplier-category-list"] })
  }, [queryClient])

  return {
    invalidateSupplierCategoryQueries,
  }
}