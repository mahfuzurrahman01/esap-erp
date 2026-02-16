"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";



import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "react-hot-toast";



import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/config/constants";
import { routes } from "@/config/routes";
import { SupplierService } from "@/modules/scm/service/procurement/supplier/supplier.service";
import { Supplier, SupplierCreateInput, SupplierPaginator, SupplierQueryOptions, SupplierUpdateInput } from "@/modules/scm/types/procurement/supplier/supplier-types";
import { DEFAULT_QUERY_OPTIONS, createQueryKeys } from "@/server/service/query-config";





const SUPPLIER_KEYS = createQueryKeys("supplier")

export function useSupplierList(options?: Partial<SupplierQueryOptions>) {
  const queryKey = [SUPPLIER_KEYS.all, options]

  return useQuery<SupplierPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return SupplierService.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function useSupplierDropdown() {
  const { data, isLoading, isError, isFetching, refetch } = useQuery<
    Supplier[],
    Error
  >({
    queryKey: [SUPPLIER_KEYS.list],
    queryFn: () => SupplierService.dropdown(),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })

  return {
    data,
    isLoading,
    isError,
    isFetching,
    refetch,
  }
}

export function useSupplierById(id: number) {
  return useQuery({
    queryKey: [SUPPLIER_KEYS.detail(id)],
    queryFn: () => SupplierService.get(id),
    enabled: !!id,
    ...DEFAULT_QUERY_OPTIONS,
  })
}

export function useCreateSupplier() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: SupplierCreateInput): Promise<SupplierCreateInput> =>
      SupplierService.create(data),
    onMutate: async (newSupplier) => {
      await queryClient.cancelQueries({
        queryKey: [SUPPLIER_KEYS.all],
        exact: false,
      })
      const queryKey = [
        SUPPLIER_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]
      const previousSupplier =
        queryClient.getQueryData<SupplierPaginator>(queryKey)
      queryClient.setQueryData<SupplierPaginator>(queryKey, (old) => {
        if (!old)
          return {
            data: [{ ...newSupplier, id: Date.now() } as unknown as Supplier],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [
            ...old.data,
            { ...newSupplier, id: Date.now() } as unknown as Supplier,
          ],
          count: old.count + 1,
        }
      })
      return { previousSupplier }
    },
    onSuccess: () => {
      toast.success(t("form-successfully-created"))
      router.push(routes.scm.procurement.suppliers.suppliers)
    },
    onError: (err: any, newSupplier, context) => {
      if (context?.previousSupplier) {
        const queryKey = [
          SUPPLIER_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousSupplier)
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
        queryKey: [SUPPLIER_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateSupplier() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: ({ data }: { data: SupplierUpdateInput }) =>
      SupplierService.update(data),
    onMutate: async ({ data }) => {
      await queryClient.cancelQueries({
        queryKey: [SUPPLIER_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: [SUPPLIER_KEYS.detail(data.id!)],
      })
      const queryKey = [
        SUPPLIER_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]
      const previousSupplier =
        queryClient.getQueryData<SupplierPaginator>(queryKey)
      const previousSupplierDetail = queryClient.getQueryData<Supplier>(
        SUPPLIER_KEYS.detail(data.id!)
      )
      queryClient.setQueryData<SupplierPaginator>(queryKey, (old) => {
        if (!old)
          return {
            data: [data as unknown as Supplier],
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
      queryClient.setQueryData(SUPPLIER_KEYS.detail(data.id!), data)
      return { previousSupplier, previousSupplierDetail }
    },
    onError: (err: any, variables, context) => {
      if (context?.previousSupplier) {
        const queryKey = [
          SUPPLIER_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousSupplier)
      }
      if (context?.previousSupplierDetail) {
        queryClient.setQueryData(
          SUPPLIER_KEYS.detail(variables.data.id!),
          context.previousSupplierDetail
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
        queryKey: [SUPPLIER_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: [SUPPLIER_KEYS.detail(data.id!)],
        })
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [SUPPLIER_KEYS.all] })
      queryClient.invalidateQueries({
        queryKey: [SUPPLIER_KEYS.detail(data.id!)],
      })
      toast.success(t("form-successfully-updated"))
      router.push(routes.scm.procurement.suppliers.suppliers)
    },
  })
}

export function useDeleteSupplier() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => SupplierService.delete(id),
    onMutate: async (id) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [SUPPLIER_KEYS.all],
        exact: false,
      })

      const queryKey = [
        SUPPLIER_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousSuppliers =
        queryClient.getQueryData<SupplierPaginator>(queryKey)

      queryClient.setQueryData<SupplierPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => item.id !== id),
          count: old.count - 1,
        }
      })

      return { previousSuppliers }
    },

    onSuccess: () => {
      toast.success(t("form-successfully-deleted"))
    },

    onError: (err: any, variables, context) => {
      toast.error(t("form-error-deleting-dependency"))
      // toast.error(err.response?.data?.errors)
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousSuppliers) {
        const queryKey = [
          SUPPLIER_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousSuppliers)
      }
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [SUPPLIER_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeleteSupplier() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    // Change mutationFn to accept an array of IDs
    mutationFn: (ids: number[]) => SupplierService.bulkDelete(ids),
    onMutate: async (ids) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [SUPPLIER_KEYS.all],
        exact: false,
      })

      const queryKey = [
        SUPPLIER_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousSuppliers =
        queryClient.getQueryData<SupplierPaginator>(queryKey)

      // Optimistically remove multiple items from the list
      queryClient.setQueryData<SupplierPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => !ids.includes(item.id!)),
          count: old.count - ids.length,
        }
      })

      return { previousSuppliers }
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
      if (context?.previousSuppliers) {
        const queryKey = [
          SUPPLIER_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousSuppliers)
      }
      toast.error(t("form-error-deleting-dependency"))
      // toast.error(err.response.data)
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [SUPPLIER_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useSupplierOperations() {
  const queryClient = useQueryClient()

  const invalidateSupplierQueries = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: [SUPPLIER_KEYS.all] })
  }, [queryClient])

  return {
    invalidateSupplierQueries,
  }
}