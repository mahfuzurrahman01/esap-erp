"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";



import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";



import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/config/constants";
import { routes } from "@/config/routes";
import { WarehouseManagerService } from "@/modules/scm/service/inventory/warehouse/warehouse-manager.service";
import { WarehouseManager, WarehouseManagerPaginator, WarehouseManagerQueryOptions } from "@/modules/scm/types/inventory/warehouse/warehouse-manager-types";
import { DEFAULT_QUERY_OPTIONS, createQueryKeys } from "@/server/service/query-config";





const WAREHOUSE_MANAGER_KEYS = createQueryKeys("warehouse-manager")

export function useWarehouseManagerList(
  options?: Partial<WarehouseManagerQueryOptions>
) {
  const queryKey = [WAREHOUSE_MANAGER_KEYS.all, options]

  return useQuery<WarehouseManagerPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return WarehouseManagerService.all(
        Object.assign({}, queryKey[1], pageParam)
      )
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function useWarehouseManagerById(id: number) {
  return useQuery({
    queryKey: [WAREHOUSE_MANAGER_KEYS.detail(id)],
    queryFn: () => WarehouseManagerService.get(id),
    enabled: !!id,
    ...DEFAULT_QUERY_OPTIONS,
  })
}

export function useCreateWarehouseManager() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: WarehouseManager): Promise<WarehouseManager> =>
      WarehouseManagerService.create(data),
    onMutate: async (newWarehouseManager) => {
      await queryClient.cancelQueries({
        queryKey: [WAREHOUSE_MANAGER_KEYS.all],
        exact: false,
      })
      const queryKey = [
        WAREHOUSE_MANAGER_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]
      const previousWarehouseManagers =
        queryClient.getQueryData<WarehouseManagerPaginator>(queryKey)
      queryClient.setQueryData<WarehouseManagerPaginator>(queryKey, (old) => {
        if (!old)
          return {
            data: [newWarehouseManager],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [...old.data, { ...newWarehouseManager, id: Date.now() }],
          count: old.count + 1,
        }
      })
      return { previousWarehouseManagers }
    },
    onSuccess: () => {
      toast.success(t("form-created-successfully"))
      router.push(routes.scm.inventory.settings.warehouseManager)
    },
    onError: (err: any, newWarehouseManager, context) => {
      if (context?.previousWarehouseManagers) {
        const queryKey = [
          WAREHOUSE_MANAGER_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousWarehouseManagers)
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
        queryKey: [WAREHOUSE_MANAGER_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateWarehouseManager() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")
  const router = useRouter()
  return useMutation({
    mutationFn: ({ data }: { data: WarehouseManager }) =>
      WarehouseManagerService.update(data),
    onMutate: async ({ data }) => {
      await queryClient.cancelQueries({
        queryKey: [WAREHOUSE_MANAGER_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: [WAREHOUSE_MANAGER_KEYS.detail(data.id!)],
      })
      const queryKey = [
        WAREHOUSE_MANAGER_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]
      const previousWarehouseManagers =
        queryClient.getQueryData<WarehouseManagerPaginator>(queryKey)
      const previousWarehouseManager =
        queryClient.getQueryData<WarehouseManager>(
          WAREHOUSE_MANAGER_KEYS.detail(data.id!)
        )
      queryClient.setQueryData<WarehouseManagerPaginator>(queryKey, (old) => {
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
      queryClient.setQueryData(WAREHOUSE_MANAGER_KEYS.detail(data.id!), data)
      return { previousWarehouseManagers, previousWarehouseManager }
    },
    onError: (err: any, variables, context) => {
      if (context?.previousWarehouseManagers) {
        const queryKey = [
          WAREHOUSE_MANAGER_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousWarehouseManagers)
      }
      if (context?.previousWarehouseManager) {
        queryClient.setQueryData(
          WAREHOUSE_MANAGER_KEYS.detail(variables.data.id!),
          context.previousWarehouseManager
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
        queryKey: [WAREHOUSE_MANAGER_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: [WAREHOUSE_MANAGER_KEYS.detail(data.id!)],
        })
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: WAREHOUSE_MANAGER_KEYS.all })
      queryClient.invalidateQueries({
        queryKey: [WAREHOUSE_MANAGER_KEYS.detail(data.id!)],
      })
      toast.success(t("form-updated-successfully"))
      router.push(routes.scm.inventory.settings.warehouseManager)
    },
  })
}

export function useDeleteWarehouseManager() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => WarehouseManagerService.delete(id),
    onMutate: async (id) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [WAREHOUSE_MANAGER_KEYS.all],
        exact: false,
      })

      const queryKey = [
        WAREHOUSE_MANAGER_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousWarehouseManagers =
        queryClient.getQueryData<WarehouseManagerPaginator>(queryKey)

      // Optimistically remove the COA from the list
      queryClient.setQueryData<WarehouseManagerPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => item.id !== id),
          count: old.count - 1,
        }
      })

      return { previousWarehouseManagers }
    },

    onSuccess: () => {
      toast.success(t("form-successfully-deleted"))
    },

    onError: (err: any, variables, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousWarehouseManagers) {
        const queryKey = [
          WAREHOUSE_MANAGER_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousWarehouseManagers)
      }
      toast.error(t("form-error-delete"))
      // toast.error(err?.response?.data)
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [WAREHOUSE_MANAGER_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeleteWarehouseManager() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    // Change mutationFn to accept an array of IDs
    mutationFn: (ids: number[]) => WarehouseManagerService.bulkDelete(ids),
    onMutate: async (ids) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [WAREHOUSE_MANAGER_KEYS.all],
        exact: false,
      })

      const queryKey = [
        WAREHOUSE_MANAGER_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousWarehouseManager =
        queryClient.getQueryData<WarehouseManagerPaginator>(queryKey)

      // Optimistically remove multiple items from the list
      queryClient.setQueryData<WarehouseManagerPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => !ids.includes(item.id!)),
          count: old.count - ids.length,
        }
      })

      return { previousWarehouseManager }
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
      if (context?.previousWarehouseManager) {
        const queryKey = [
          WAREHOUSE_MANAGER_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousWarehouseManager)
        toast.error(t("form-error-bulk-delete"))
        // toast.error(err?.response?.data)
      }
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [WAREHOUSE_MANAGER_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useWarehouseManagerOperations() {
  const queryClient = useQueryClient()

  const invalidateWarehouseManagerQueries = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ["warehouse-manager-list"] })
  }, [queryClient])

  return {
    invalidateWarehouseManagerQueries,
  }
}

export function useSearchWarehouseManager(
  searchTerm: string,
  filters: Partial<WarehouseManagerQueryOptions>
) {
  return useQuery<WarehouseManagerPaginator, AxiosError>({
    queryKey: ["warehouse-manager-search", searchTerm, filters],
    queryFn: () =>
      WarehouseManagerService.search({
        pageIndex: filters.pageIndex ?? 1,
        pageSize: filters.pageSize ?? 10,
        searchTerm,
      }),
    enabled: !!searchTerm || Object.keys(filters).length > 0,
  })
}