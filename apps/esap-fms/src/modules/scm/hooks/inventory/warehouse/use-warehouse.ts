"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";



import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";



import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/config/constants";
import { routes } from "@/config/routes";
import { WarehouseService } from "@/modules/scm/service/inventory/warehouse/warehouse.service";
import { Warehouse, WarehouseInput, WarehousePaginator, WarehouseQueryOptions } from "@/modules/scm/types/inventory/warehouse/warehouse-types";
import { DEFAULT_QUERY_OPTIONS, createQueryKeys } from "@/server/service/query-config";





const WAREHOUSE_KEYS = createQueryKeys("warehouse")

export function useWarehouseList(options?: Partial<WarehouseQueryOptions>) {
  const { data, isLoading, isError, isFetching, refetch } = useQuery<
    WarehousePaginator,
    Error
  >({
    queryKey: [WAREHOUSE_KEYS.all, options],
    queryFn: ({ queryKey, pageParam }) => {
      return WarehouseService.all(Object.assign({}, queryKey[1], pageParam))
    },
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

export function useWarehouseDropdown(options?: Partial<any>) {
  const { data, isLoading, isError, isFetching, refetch } = useQuery<
    Warehouse[],
    Error
  >({
    queryKey: [WAREHOUSE_KEYS.all],
    queryFn: async () => {
      const response = await WarehouseService.getDropdown(options ?? {})
      return response
    },
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

export function useWarehouseById(id: number) {
  return useQuery({
    queryKey: [WAREHOUSE_KEYS.detail(id)],
    queryFn: () => WarehouseService.get(id),
    enabled: !!id,
    ...DEFAULT_QUERY_OPTIONS,
  })
}

export function useCreateWarehouse() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: WarehouseInput): Promise<WarehouseInput> =>
      WarehouseService.create(data),
    onMutate: async (newWarehouse) => {
      await queryClient.cancelQueries({
        queryKey: [WAREHOUSE_KEYS.all],
        exact: false,
      })
      const queryKey = [
        WAREHOUSE_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]
      const previousWarehouses =
        queryClient.getQueryData<WarehousePaginator>(queryKey)
      queryClient.setQueryData<WarehousePaginator>(queryKey, (old) => {
        if (!old)
          return {
            data: [newWarehouse as Warehouse],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [...old.data, { ...newWarehouse, id: Date.now() }],
          count: old.count + 1,
        }
      })
      return { previousWarehouses }
    },
    onSuccess: () => {
      router.push(routes.scm.inventory.warehouse.warehouse)
      toast.success(t("form-successfully-created"))
    },
    onError: (err: any, newWarehouse, context) => {
      if (context?.previousWarehouses) {
        const queryKey = [
          WAREHOUSE_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousWarehouses)
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
        queryKey: [WAREHOUSE_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateWarehouse() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")
  const router = useRouter()

  return useMutation({
    mutationFn: ({ data }: { data: WarehouseInput }) =>
      WarehouseService.update(data),
    onMutate: async ({ data }) => {
      await queryClient.cancelQueries({
        queryKey: [WAREHOUSE_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: [WAREHOUSE_KEYS.detail(data.id!)],
      })
      const queryKey = [
        WAREHOUSE_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]
      const previousWarehouses =
        queryClient.getQueryData<WarehousePaginator>(queryKey)
      const previousWarehouse = queryClient.getQueryData<Warehouse>(
        WAREHOUSE_KEYS.detail(data.id!)
      )
      queryClient.setQueryData<WarehousePaginator>(queryKey, (old) => {
        if (!old)
          return {
            data: [data as Warehouse],
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
      queryClient.setQueryData(WAREHOUSE_KEYS.detail(data.id!), data)
      return { previousWarehouses, previousWarehouse }
    },
    onError: (err: any, variables, context) => {
      if (context?.previousWarehouses) {
        const queryKey = [
          WAREHOUSE_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousWarehouses)
      }
      if (context?.previousWarehouse) {
        queryClient.setQueryData(
          WAREHOUSE_KEYS.detail(variables.data.id!),
          context.previousWarehouse
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
        queryKey: [WAREHOUSE_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: [WAREHOUSE_KEYS.detail(data.id!)],
        })
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: WAREHOUSE_KEYS.all })
      queryClient.invalidateQueries({
        queryKey: [WAREHOUSE_KEYS.detail(data.id!)],
      })
      router.push(routes.scm.inventory.warehouse.warehouse)
      toast.success(t("form-successfully-updated"))
    },
  })
}

export function useDeleteWarehouse() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => WarehouseService.delete(id),
    onMutate: async (id) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [WAREHOUSE_KEYS.all],
        exact: false,
      })

      const queryKey = [
        WAREHOUSE_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousWarehouses =
        queryClient.getQueryData<WarehousePaginator>(queryKey)

      // Optimistically remove the COA from the list
      queryClient.setQueryData<WarehousePaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => item.id !== id),
          count: old.count - 1,
        }
      })

      return { previousWarehouses }
    },

    onSuccess: () => {
      toast.success(t("form-successfully-deleted"))
    },

    onError: (err: any, variables, context) => {
     toast.error(t("form-error-deleting-dependency"))
      if (context?.previousWarehouses) {
        const queryKey = [
          WAREHOUSE_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousWarehouses)
      }
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [WAREHOUSE_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeleteWarehouse() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    // Change mutationFn to accept an array of IDs
    mutationFn: (ids: number[]) => WarehouseService.bulkDelete(ids),
    onMutate: async (ids) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [WAREHOUSE_KEYS.all],
        exact: false,
      })

      const queryKey = [
        WAREHOUSE_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousWarehouses =
        queryClient.getQueryData<WarehousePaginator>(queryKey)

      // Optimistically remove multiple items from the list
      queryClient.setQueryData<WarehousePaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => !ids.includes(item.id!)),
          count: old.count - ids.length,
        }
      })

      return { previousWarehouses }
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
      toast.error(t("form-error-deleting-dependency"))
      if (context?.previousWarehouses) {
        const queryKey = [
          WAREHOUSE_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousWarehouses)
      }
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [WAREHOUSE_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useWarehouseOperations() {
  const queryClient = useQueryClient()

  const invalidateWarehouseQueries = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ["warehouse-list"] })
  }, [queryClient])

  return {
    invalidateWarehouseQueries,
  }
}

export function useSearchWarehouse(
  searchTerm: string,
  filters: Partial<WarehouseQueryOptions>
) {
  return useQuery<WarehousePaginator, AxiosError>({
    queryKey: ["warehouse-search", searchTerm, filters],
    queryFn: () =>
      WarehouseService.search({
        pageIndex: filters.pageIndex ?? 1,
        pageSize: filters.pageSize ?? 10,
        searchTerm,
      }),
    enabled: !!searchTerm || Object.keys(filters).length > 0,
  })
}

// export function useExportInvoice() {
//   return useMutation<Blob, AxiosError, Partial<InvoiceQueryOptions>>({
//     mutationFn: async (options) => {
//       const response = await InvoiceService.export(options)
//       if (response instanceof Blob) {
//         return response
//       }
//       throw new Error("Export failed: Response is not a Blob")
//     },
//   })
// }