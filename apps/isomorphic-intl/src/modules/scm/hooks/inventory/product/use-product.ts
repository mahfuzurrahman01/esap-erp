"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";



import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";



import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/config/constants";
import { routes } from "@/config/routes";
import { ProductService } from "@/modules/scm/service/inventory/product/product.service";
import { Product, ProductPaginator, ProductQueryOptions } from "@/modules/scm/types/inventory/products/products-types";
import { DEFAULT_QUERY_OPTIONS, createQueryKeys } from "@/server/service/query-config";





const PRODUCT_KEYS = createQueryKeys("product")

export function useProductList(options?: Partial<ProductQueryOptions>) {
  const queryKey = [PRODUCT_KEYS.all, options]

  return useQuery<ProductPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return ProductService.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function useProductDropdown() {
  const { data, isLoading, isError, isFetching, refetch } = useQuery<
    Product[],
    Error
  >({
    queryKey: [PRODUCT_KEYS.list],
    queryFn: () => ProductService.getDropdown(),
    placeholderData: keepPreviousData,
  })

  return {
    data,
    isLoading,
    isError,
    isFetching,
    refetch,
  }
}

export function useProductById(id: number) {
  return useQuery({
    queryKey: PRODUCT_KEYS.detail(id),
    queryFn: () => ProductService.get(id),
    enabled: !!id,
    ...DEFAULT_QUERY_OPTIONS,
  })
}

export function useCreateProduct() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")
  return useMutation({
    mutationFn: (data: Product): Promise<Product> =>
      ProductService.create(data),
    onMutate: async (newProduct) => {
      await queryClient.cancelQueries({
        queryKey: [PRODUCT_KEYS.all],
        exact: false,
      })
      const queryKey = [
        PRODUCT_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]
      const previousProduct =
        queryClient.getQueryData<ProductPaginator>(queryKey)
      queryClient.setQueryData<ProductPaginator>(queryKey, (old) => {
        if (!old)
          return {
            data: [newProduct],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [...old.data, { ...newProduct, id: Date.now() }],
          count: old.count + 1,
        }
      })
      return { previousProduct }
    },
    onSuccess: () => {
      router.push(routes.scm.inventory.products.products)
      toast.success(t("form-successfully-created"))
    },
    onError: (err: any, newProduct, context) => {
      if (context?.previousProduct) {
        const queryKey = [
          PRODUCT_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousProduct)
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
        queryKey: [PRODUCT_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateProduct() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")
  const router = useRouter()
  return useMutation({
    mutationFn: ({ data }: { data: Product }) => ProductService.update(data),
    onMutate: async ({ data }) => {
      await queryClient.cancelQueries({
        queryKey: [PRODUCT_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: PRODUCT_KEYS.detail(data.id!),
      })
      const queryKey = [
        PRODUCT_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]
      const previousProduct =
        queryClient.getQueryData<ProductPaginator>(queryKey)
      const previousProductDetail = queryClient.getQueryData<Product>(
        PRODUCT_KEYS.detail(data.id!)
      )
      queryClient.setQueryData<ProductPaginator>(queryKey, (old) => {
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
      queryClient.setQueryData(PRODUCT_KEYS.detail(data.id!), data)
      return { previousProduct, previousProductDetail }
    },
    onError: (err: any, variables, context) => {
      if (context?.previousProduct) {
        const queryKey = [
          PRODUCT_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousProduct)
      }
      if (context?.previousProductDetail) {
        queryClient.setQueryData(
          PRODUCT_KEYS.detail(variables.data.id!),
          context.previousProductDetail
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
        queryKey: [PRODUCT_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: [PRODUCT_KEYS.detail(data.id!)],
        })
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: PRODUCT_KEYS.all })
      queryClient.invalidateQueries({
        queryKey: PRODUCT_KEYS.detail(data.id!),
      })
      toast.success(t("form-successfully-updated"))
      router.push(routes.scm.inventory.products.products)
    },
  })
}

export function useDeleteProduct() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => ProductService.delete(id),
    onMutate: async (id) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [PRODUCT_KEYS.all],
        exact: false,
      })

      const queryKey = [
        PRODUCT_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousProducts =
        queryClient.getQueryData<ProductPaginator>(queryKey)

      // Optimistically remove the COA from the list
      queryClient.setQueryData<ProductPaginator>(queryKey, (old) => {
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
          PRODUCT_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousProducts)
      }
      toast.error(t("form-error-delete"))
      // toast.error(err.response.data)
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [PRODUCT_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeleteProduct() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    // Change mutationFn to accept an array of IDs
    mutationFn: (ids: number[]) => ProductService.bulkDelete(ids),
    onMutate: async (ids) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [PRODUCT_KEYS.all],
        exact: false,
      })

      const queryKey = [
        PRODUCT_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousProducts =
        queryClient.getQueryData<ProductPaginator>(queryKey)

      // Optimistically remove multiple items from the list
      queryClient.setQueryData<ProductPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => !ids.includes(item.id!)),
          count: old.count - ids.length,
        }
      })

      return { previousProducts }
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
      if (context?.previousProducts) {
        const queryKey = [
          PRODUCT_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousProducts)
        toast.error(t("form-error-bulk-delete"))
        toast.error(err.response.data)
      }
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [PRODUCT_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useProductOperations() {
  const queryClient = useQueryClient()

  const invalidateProductQueries = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ["product-list"] })
  }, [queryClient])

  return {
    invalidateProductQueries,
  }
}

export function useSearchProduct(
  searchTerm: string,
  filters: Partial<ProductQueryOptions>
) {
  return useQuery<ProductPaginator, AxiosError>({
    queryKey: ["product-search", searchTerm, filters],
    queryFn: () =>
      ProductService.search({
        pageIndex: filters.pageIndex ?? 1,
        pageSize: filters.pageSize ?? 10,
        searchTerm,
      }),
    enabled: !!searchTerm || Object.keys(filters).length > 0,
  })
}