"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";



import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";



import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/config/constants";
import { routes } from "@/config/routes";
import { BillOfMaterialsApprovalService } from "@/modules/scm/service/production-control/bill-of-materials/bill-of-materials-approval.service";
import { BillOfMaterialsApproval, BillOfMaterialsApprovalPaginator, BillOfMaterialsApprovalQueryOptions } from "@/modules/scm/types/production-control/bill-of-materials/bill-of-materials-approval-types";
import { BillOfMaterials, BillOfMaterialsPaginator } from "@/modules/scm/types/production-control/bill-of-materials/bill-of-materials-type";
import { DEFAULT_QUERY_OPTIONS, createQueryKeys } from "@/server/service/query-config";





const BILL_OF_MATERIALS_APPROVAL_KEYS = createQueryKeys(
  "bill-of-materials-approval"
)
const BILL_OF_MATERIALS_KEYS = createQueryKeys("bill-of-materials")

export function useBillOfMaterialsApprovalList(
  options?: Partial<BillOfMaterialsApprovalQueryOptions>
) {
  const queryKey = [BILL_OF_MATERIALS_APPROVAL_KEYS.all, options]

  return useQuery<BillOfMaterialsApprovalPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return BillOfMaterialsApprovalService.all(
        Object.assign({}, queryKey[1], pageParam)
      )
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function useBillOfMaterialsApprovalById(id: number) {
  return useQuery({
    queryKey: [BILL_OF_MATERIALS_APPROVAL_KEYS.detail(id)],
    queryFn: () => BillOfMaterialsApprovalService.get(id),
    enabled: !!id,
    ...DEFAULT_QUERY_OPTIONS,
  })
}

export function useCreateBillOfMaterialsApproval() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")
  return useMutation({
    mutationFn: (
      data: BillOfMaterialsApproval
    ): Promise<BillOfMaterialsApproval> =>
      BillOfMaterialsApprovalService.create(data),
    onMutate: async (newBillOfMaterialsApproval) => {
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
            data: [newBillOfMaterialsApproval as unknown as BillOfMaterials],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [
            ...old.data,
            {
              ...newBillOfMaterialsApproval,
              id: Date.now(),
            } as unknown as BillOfMaterials,
          ],
          count: old.count + 1,
        }
      })
      return { previousBillOfMaterials }
    },
    onSuccess: () => {
      toast.success(t("form-successfully-created"))
      router.refresh()
      router.push(routes.scm.productionControl.billOfMaterials.billOfMaterials)
    },
    onError: (err: any, newBillOfMaterialsApproval, context) => {
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

export function useUpdateBillOfMaterialsApproval() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")
  return useMutation({
    mutationFn: ({ data }: { data: BillOfMaterialsApproval }) =>
      BillOfMaterialsApprovalService.update(data),
    onMutate: async ({ data }) => {
      await queryClient.cancelQueries({
        queryKey: [BILL_OF_MATERIALS_APPROVAL_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: [BILL_OF_MATERIALS_APPROVAL_KEYS.detail(data.id!)],
      })
      const queryKey = [
        BILL_OF_MATERIALS_APPROVAL_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]
      const previousBillOfMaterialsApproval =
        queryClient.getQueryData<BillOfMaterialsApprovalPaginator>(queryKey)
      const previousBillOfMaterialsApprovalDetail =
        queryClient.getQueryData<BillOfMaterialsApproval>(
          BILL_OF_MATERIALS_APPROVAL_KEYS.detail(data.id!)
        )
      queryClient.setQueryData<BillOfMaterialsApprovalPaginator>(
        queryKey,
        (old) => {
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
        }
      )
      queryClient.setQueryData(
        BILL_OF_MATERIALS_APPROVAL_KEYS.detail(data.id!),
        data
      )
      return {
        previousBillOfMaterialsApproval,
        previousBillOfMaterialsApprovalDetail,
      }
    },
    onError: (err: any, variables, context) => {
      if (context?.previousBillOfMaterialsApproval) {
        const queryKey = [
          BILL_OF_MATERIALS_APPROVAL_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(
          queryKey,
          context.previousBillOfMaterialsApproval
        )
      }
      if (context?.previousBillOfMaterialsApprovalDetail) {
        queryClient.setQueryData(
          BILL_OF_MATERIALS_APPROVAL_KEYS.detail(variables.data.id!),
          context.previousBillOfMaterialsApprovalDetail
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
        queryKey: [BILL_OF_MATERIALS_APPROVAL_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: [BILL_OF_MATERIALS_APPROVAL_KEYS.detail(data.id!)],
        })
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [BILL_OF_MATERIALS_APPROVAL_KEYS.all],
      })
      queryClient.invalidateQueries({
        queryKey: [BILL_OF_MATERIALS_APPROVAL_KEYS.detail(data.id!)],
      })
      toast.success(t("form-successfully-updated"))
      router.push(routes.scm.productionControl.settings.billOfMaterialsApproval)
    },
  })
}

export function useDeleteBillOfMaterialsApproval() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => BillOfMaterialsApprovalService.delete(id),
    onMutate: async (id) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [BILL_OF_MATERIALS_APPROVAL_KEYS.all],
        exact: false,
      })

      const queryKey = [
        BILL_OF_MATERIALS_APPROVAL_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousBillOfMaterialsApproval =
        queryClient.getQueryData<BillOfMaterialsApprovalPaginator>(queryKey)

      // Optimistically remove the COA from the list
      queryClient.setQueryData<BillOfMaterialsApprovalPaginator>(
        queryKey,
        (old) => {
          if (!old) return old
          return {
            ...old,
            data: old.data.filter((item) => item.id !== id),
            count: old.count - 1,
          }
        }
      )

      return { previousBillOfMaterialsApproval }
    },

    onSuccess: () => {
      toast.success(t("form-successfully-deleted"))
    },

    onError: (err: any, variables, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousBillOfMaterialsApproval) {
        const queryKey = [
          BILL_OF_MATERIALS_APPROVAL_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(
          queryKey,
          context.previousBillOfMaterialsApproval
        )
      }
      toast.error(t("form-error-delete"))
      // toast.error(err?.response?.data)
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [BILL_OF_MATERIALS_APPROVAL_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeleteBillOfMaterialsApproval() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    // Change mutationFn to accept an array of IDs
    mutationFn: (ids: number[]) =>
      BillOfMaterialsApprovalService.bulkDelete(ids),
    onMutate: async (ids) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [BILL_OF_MATERIALS_APPROVAL_KEYS.all],
        exact: false,
      })

      const queryKey = [
        BILL_OF_MATERIALS_APPROVAL_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousBillOfMaterialsApproval =
        queryClient.getQueryData<BillOfMaterialsApprovalPaginator>(queryKey)

      // Optimistically remove multiple items from the list
      queryClient.setQueryData<BillOfMaterialsApprovalPaginator>(
        queryKey,
        (old) => {
          if (!old) return old
          return {
            ...old,
            data: old.data.filter((item) => !ids.includes(item.id!)),
            count: old.count - ids.length,
          }
        }
      )

      return { previousBillOfMaterialsApproval }
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
      if (context?.previousBillOfMaterialsApproval) {
        const queryKey = [
          BILL_OF_MATERIALS_APPROVAL_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(
          queryKey,
          context.previousBillOfMaterialsApproval
        )
      }
      toast.error(t("form-error-bulk-delete"))
      // toast.error(err.response.data)
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [BILL_OF_MATERIALS_APPROVAL_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBillOfMaterialsApprovalOperations() {
  const queryClient = useQueryClient()

  const invalidateBillOfMaterialsApprovalQueries = useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: BILL_OF_MATERIALS_APPROVAL_KEYS.all,
    })
  }, [queryClient])

  return {
    invalidateBillOfMaterialsApprovalQueries,
  }
}