"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";



import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";



import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/config/constants";
import { routes } from "@/config/routes";
import { ProductCategoryService } from "@/modules/scm/service/inventory/product/product-category.service";
import { ProductCategory, ProductCategoryPaginator, ProductCategoryQueryOptions } from "@/modules/scm/types/inventory/products/product-category-types";
import { DEFAULT_QUERY_OPTIONS, createQueryKeys } from "@/server/service/query-config";





const PRODUCT_CATEGORY_KEYS = createQueryKeys("product-category")

export function useProductCategoryList(
  options?: Partial<ProductCategoryQueryOptions>
) {
  const queryKey = [PRODUCT_CATEGORY_KEYS.all, options]

  return useQuery<ProductCategoryPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return ProductCategoryService.all(
        Object.assign({}, queryKey[1], pageParam)
      )
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function useProductCategoryById(id: number) {
  return useQuery({
    queryKey: [PRODUCT_CATEGORY_KEYS.detail(id)],
    queryFn: () => ProductCategoryService.get(id),
    enabled: !!id,
    ...DEFAULT_QUERY_OPTIONS,
  })
}

export function useCreateProductCategory() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")
  return useMutation({
    mutationFn: (data: ProductCategory): Promise<ProductCategory> =>
      ProductCategoryService.create(data),
    onMutate: async (newProductCategory) => {
      await queryClient.cancelQueries({
        queryKey: [PRODUCT_CATEGORY_KEYS.all],
        exact: false,
      })
      const queryKey = [
        PRODUCT_CATEGORY_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]
      const previousProductCategory =
        queryClient.getQueryData<ProductCategoryPaginator>(queryKey)
      queryClient.setQueryData<ProductCategoryPaginator>(queryKey, (old) => {
        if (!old)
          return {
            data: [newProductCategory],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [...old.data, { ...newProductCategory, id: Date.now() }],
          count: old.count + 1,
        }
      })
      return { previousProductCategory }
    },
    onSuccess: () => {
      toast.success(t("form-successfully-created"))
      router.push(routes.scm.inventory.settings.productCategory)
    },
    onError: (err: any, newProductCategory, context) => {
      if (context?.previousProductCategory) {
        const queryKey = [
          PRODUCT_CATEGORY_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousProductCategory)
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
        queryKey: [PRODUCT_CATEGORY_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateProductCategory() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")
  const router = useRouter()

  return useMutation({
    mutationFn: ({ data }: { data: ProductCategory }) =>
      ProductCategoryService.update(data),
    onMutate: async ({ data }) => {
      await queryClient.cancelQueries({
        queryKey: [PRODUCT_CATEGORY_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: [PRODUCT_CATEGORY_KEYS.detail(data.id!)],
      })
      const queryKey = [
        PRODUCT_CATEGORY_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]
      const previousProductCategory =
        queryClient.getQueryData<ProductCategoryPaginator>(queryKey)
      const previousProductCategoryDetail =
        queryClient.getQueryData<ProductCategory>(
          PRODUCT_CATEGORY_KEYS.detail(data.id!)
        )
      queryClient.setQueryData<ProductCategoryPaginator>(queryKey, (old) => {
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
      queryClient.setQueryData(PRODUCT_CATEGORY_KEYS.detail(data.id!), data)
      return { previousProductCategory, previousProductCategoryDetail }
    },
    onError: (err: any, variables, context) => {
      if (context?.previousProductCategory) {
        const queryKey = [
          PRODUCT_CATEGORY_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousProductCategory)
      }
      if (context?.previousProductCategoryDetail) {
        queryClient.setQueryData(
          PRODUCT_CATEGORY_KEYS.detail(variables.data.id!),
          context.previousProductCategoryDetail
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
        queryKey: [PRODUCT_CATEGORY_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: [PRODUCT_CATEGORY_KEYS.detail(data.id!)],
        })
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: PRODUCT_CATEGORY_KEYS.all })
      queryClient.invalidateQueries({
        queryKey: [PRODUCT_CATEGORY_KEYS.detail(data.id!)],
      })
      toast.success(t("form-successfully-updated"))
      router.push(routes.scm.inventory.settings.productCategory)
    },
  })
}

export function useDeleteProductCategory() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => ProductCategoryService.delete(id),
    onMutate: async (id) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [PRODUCT_CATEGORY_KEYS.all],
        exact: false,
      })

      const queryKey = [
        PRODUCT_CATEGORY_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousProducts =
        queryClient.getQueryData<ProductCategoryPaginator>(queryKey)

      // Optimistically remove the COA from the list
      queryClient.setQueryData<ProductCategoryPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => item.id !== id),
          count: old.count - 1,
        }
      })

      return { previousProducts }
    },

    onSuccess: () => {
      toast.success(t("form-successfully-deleted"))
    },

    onError: (err: any, variables, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousProducts) {
        const queryKey = [
          PRODUCT_CATEGORY_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousProducts)
      }
      toast.error(t("form-error-delete"))
      // toast.error(err?.response?.data)
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [PRODUCT_CATEGORY_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeleteProductCategory() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    // Change mutationFn to accept an array of IDs
    mutationFn: (ids: number[]) => ProductCategoryService.bulkDelete(ids),
    onMutate: async (ids) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [PRODUCT_CATEGORY_KEYS.all],
        exact: false,
      })

      const queryKey = [
        PRODUCT_CATEGORY_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousProductCategory =
        queryClient.getQueryData<ProductCategoryPaginator>(queryKey)

      // Optimistically remove multiple items from the list
      queryClient.setQueryData<ProductCategoryPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => !ids.includes(item.id!)),
          count: old.count - ids.length,
        }
      })

      return { previousProductCategory }
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
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousProductCategory) {
        const queryKey = [
          PRODUCT_CATEGORY_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousProductCategory)
        toast.error(t("form-error-bulk-delete"))
      }
      // toast.error(err?.response?.data)
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [PRODUCT_CATEGORY_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useProductCategoryOperations() {
  const queryClient = useQueryClient()

  const invalidateProductCategoryQueries = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ["product-category-list"] })
  }, [queryClient])

  return {
    invalidateProductCategoryQueries,
  }
}