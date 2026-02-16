"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";



import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";



import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/config/constants";
import { routes } from "@/config/routes";
import { BillOfMaterialsService } from "@/modules/scm/service/production-control/bill-of-materials/bill-of-materials.service";
import { BillOfMaterials, BillOfMaterialsPaginator, BillOfMaterialsQueryOptions } from "@/modules/scm/types/production-control/bill-of-materials/bill-of-materials-type";
import { DEFAULT_QUERY_OPTIONS, createQueryKeys } from "@/server/service/query-config";





const BILL_OF_MATERIALS_KEYS = createQueryKeys("bill-of-materials")

export function useBillOfMaterialsList(
  options?: Partial<BillOfMaterialsQueryOptions>
) {
  const queryKey = [BILL_OF_MATERIALS_KEYS.all, options]

  return useQuery<BillOfMaterialsPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return BillOfMaterialsService.all(
        Object.assign({}, queryKey[1], pageParam)
      )
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function useBillOfMaterialsById(id: number) {
  return useQuery({
    queryKey: [BILL_OF_MATERIALS_KEYS.detail(id)],
    queryFn: () => BillOfMaterialsService.get(id),
    enabled: !!id,
    ...DEFAULT_QUERY_OPTIONS,
  })
}

export function useCreateBillOfMaterials() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: BillOfMaterials): Promise<BillOfMaterials> =>
      BillOfMaterialsService.create(data),
    onMutate: async (newBillOfMaterials) => {
      await queryClient.cancelQueries({
        queryKey: [BILL_OF_MATERIALS_KEYS.all],
        exact: false,
      })
      const queryKey = [
        BILL_OF_MATERIALS_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]
      const previousBillOfMaterials =
        queryClient.getQueryData<BillOfMaterialsPaginator>(queryKey)
      queryClient.setQueryData<BillOfMaterialsPaginator>(queryKey, (old) => {
        if (!old)
          return {
            data: [newBillOfMaterials],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [...old.data, { ...newBillOfMaterials, id: Date.now() }],
          count: old.count + 1,
        }
      })
      return { previousBillOfMaterials }
    },
    onSuccess: () => {
      toast.success(t("form-created-successfully"))
      router.push(routes.scm.productionControl.billOfMaterials.billOfMaterials)
    },
    onError: (err: any, newBillOfMaterials, context) => {
      if (context?.previousBillOfMaterials) {
        const queryKey = [
          BILL_OF_MATERIALS_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousBillOfMaterials)
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
        queryKey: [BILL_OF_MATERIALS_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateBillOfMaterials() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")
  const router = useRouter()
  return useMutation({
    mutationFn: ({ data }: { data: BillOfMaterials }) =>
      BillOfMaterialsService.update(data),
    onMutate: async ({ data }) => {
      await queryClient.cancelQueries({
        queryKey: [BILL_OF_MATERIALS_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: [BILL_OF_MATERIALS_KEYS.detail(data.id!)],
      })
      const queryKey = [
        BILL_OF_MATERIALS_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]
      const previousBillOfMaterials =
        queryClient.getQueryData<BillOfMaterialsPaginator>(queryKey)
      const previousBillOfMaterialsVersion =
        queryClient.getQueryData<BillOfMaterials>(
          BILL_OF_MATERIALS_KEYS.detail(data.id!)
        )
      queryClient.setQueryData<BillOfMaterialsPaginator>(queryKey, (old) => {
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
      queryClient.setQueryData(BILL_OF_MATERIALS_KEYS.detail(data.id!), data)
      return { previousBillOfMaterials, previousBillOfMaterialsVersion }
    },
    onError: (err: any, variables, context) => {
      if (context?.previousBillOfMaterials) {
        const queryKey = [
          BILL_OF_MATERIALS_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousBillOfMaterials)
      }
      if (context?.previousBillOfMaterials) {
        queryClient.setQueryData(
          BILL_OF_MATERIALS_KEYS.detail(variables.data.id!),
          context.previousBillOfMaterials
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
        queryKey: [BILL_OF_MATERIALS_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: [BILL_OF_MATERIALS_KEYS.detail(data.id!)],
        })
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: BILL_OF_MATERIALS_KEYS.all,
      })
      queryClient.invalidateQueries({
        queryKey: [BILL_OF_MATERIALS_KEYS.detail(data.id!)],
      })
      toast.success(t("form-updated-successfully"))
      router.push(routes.scm.productionControl.billOfMaterials.billOfMaterials)
    },
  })
}

export function useDeleteBillOfMaterials() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => BillOfMaterialsService.delete(id),
    onMutate: async (id) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [BILL_OF_MATERIALS_KEYS.all],
        exact: false,
      })

      const queryKey = [
        BILL_OF_MATERIALS_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousBillOfMaterials =
        queryClient.getQueryData<BillOfMaterialsPaginator>(queryKey)

      // Optimistically remove the stock transfer from the list
      queryClient.setQueryData<BillOfMaterialsPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => item.id !== id),
          count: old.count - 1,
        }
      })

      return { previousBillOfMaterials }
    },

    onSuccess: () => {
      toast.success(t("form-successfully-deleted"))
    },

    onError: (err: any, variables, context) => {
      if (context?.previousBillOfMaterials) {
        const queryKey = [
          BILL_OF_MATERIALS_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousBillOfMaterials)
      }
      toast.error(t("form-error-delete"))
      // toast.error(err?.response?.data)
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [BILL_OF_MATERIALS_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeleteBillOfMaterials() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    // Change mutationFn to accept an array of IDs
    mutationFn: (ids: number[]) => BillOfMaterialsService.bulkDelete(ids),
    onMutate: async (ids) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [BILL_OF_MATERIALS_KEYS.all],
        exact: false,
      })

      const queryKey = [
        BILL_OF_MATERIALS_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousBillOfMaterials =
        queryClient.getQueryData<BillOfMaterialsPaginator>(queryKey)

      // Optimistically remove multiple items from the list
      queryClient.setQueryData<BillOfMaterialsPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => !ids.includes(item.id!)),
          count: old.count - ids.length,
        }
      })

      return { previousBillOfMaterials }
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
      if (context?.previousBillOfMaterials) {
        const queryKey = [
          BILL_OF_MATERIALS_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousBillOfMaterials)
      }
      toast.error(t("form-error-bulk-delete"))
      // toast.error(err?.response?.data)
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [BILL_OF_MATERIALS_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBillOfMaterialsOperations() {
  const queryClient = useQueryClient()

  const invalidateBillOfMaterialsQueries = useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: ["bill-of-materials-list"],
    })
  }, [queryClient])

  return {
    invalidateBillOfMaterialsQueries,
  }
}