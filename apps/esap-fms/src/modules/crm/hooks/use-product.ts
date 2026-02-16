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
import { routes } from "@/config/routes"
import { product } from "@/modules/crm/service/product.service"
import {
  ProductList,
  ProductPaginator,
  ProductQueryOptions,
} from "@/modules/crm/types/product"
import {
  DEFAULT_QUERY_OPTIONS,
  createQueryKeys,
} from "@/server/service/query-config"

//use-product.ts

export const PRODUCT_KEYS = createQueryKeys("Product")

export function useProductList(options?: Partial<ProductQueryOptions>) {
  const queryKey = [PRODUCT_KEYS.all, options]

  return useQuery<ProductPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return product.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    throwOnError: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

export function useProductById(id: any) {
  return useQuery({
    queryKey: [PRODUCT_KEYS.detail(id)],
    queryFn: () => product.get(id),
    enabled: !!id,
    ...DEFAULT_QUERY_OPTIONS,
  })
}

export function useCreateProduct() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: any): Promise<any> => product.create(data),
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

      const previousCountries =
        queryClient.getQueryData<ProductPaginator>(queryKey)

      queryClient.setQueryData<ProductPaginator>(queryKey, (old: any) => {
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

      return { previousCountries }
    },
    onSuccess: () => {
      router.push(routes.crm.items)
      toast.success(t("form-product-created-successfully"))
    },
    onError: (err, newProduct, context) => {
      toast.error(t("form-failed-to-create-product"))
      if (context?.previousCountries) {
        const queryKey = [
          PRODUCT_KEYS.all,
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
        queryKey: [PRODUCT_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateProduct() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: ({ id, data }: { id: any; data: any }) =>
      product.update(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({
        queryKey: [PRODUCT_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: PRODUCT_KEYS.detail(id),
      })

      const queryKey = [
        PRODUCT_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousCountries =
        queryClient.getQueryData<ProductPaginator>(queryKey)
      const previousProduct = queryClient.getQueryData<ProductList>(
        PRODUCT_KEYS.detail(id)
      )

      queryClient.setQueryData<ProductPaginator>(queryKey, (old: any) => {
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

      queryClient.setQueryData(PRODUCT_KEYS.detail(id), data)

      return { previousCountries, previousProduct }
    },
    onSuccess: () => {
      router.push(routes.crm.items)
      toast.success(t("form-product-updated-successfully"))
    },
    onError: (err, variables, context) => {
      toast.error(t("form-failed-to-update-product"))
      if (context?.previousCountries) {
        const queryKey = [
          PRODUCT_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousCountries)
      }
      if (context?.previousProduct) {
        queryClient.setQueryData(
          PRODUCT_KEYS.detail(variables.id),
          context.previousProduct
        )
      }
    },
    onSettled: (data: any) => {
      queryClient.invalidateQueries({
        queryKey: [PRODUCT_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: PRODUCT_KEYS.detail(data.id),
        })
      }
    },
  })
}

export function useDeleteProduct() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: any) => product.delete(id),
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
      const previousCountries =
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

      return { previousCountries }
    },

    onSuccess: () => {
      toast.success(t("form-product-deleted-successfully"))
    },

    onError: (err:any, variables, context) => {
      if(err.response.data.details){
        toast.error(err.response.data.details)
      }else{
        toast.error(t("form-failed-to-delete-product"))
      }
      if (context?.previousCountries) {
        const queryKey = [
          PRODUCT_KEYS.all,
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
    mutationFn: (ids: number[]) => product.bulkDelete(ids),
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
      const previousItems = queryClient.getQueryData<ProductPaginator>(queryKey)

      // Optimistically remove multiple items from the list
      queryClient.setQueryData<ProductPaginator>(queryKey, (old) => {
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
          PRODUCT_KEYS.all,
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
        queryKey: [PRODUCT_KEYS.all],
        exact: false,
      })
    },
  })
}
