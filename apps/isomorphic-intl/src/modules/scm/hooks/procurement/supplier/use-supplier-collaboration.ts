"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";



import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";



import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/config/constants";
import { routes } from "@/config/routes";
import { SupplierCollaborationService } from "@/modules/scm/service/procurement/supplier/supplier-collaboration.service";
import { Replay, SupplierCollaboration, SupplierCollaborationPaginator, SupplierCollaborationQueryOptions } from "@/modules/scm/types/procurement/supplier/supplier-collaboration-types";
import { createQueryKeys } from "@/server/service/query-config";





const SUPPLIER_COLLABORATION_KEYS = createQueryKeys("supplier-collaboration")

export function useSupplierCollaborationList(options?: Partial<SupplierCollaborationQueryOptions>) {
  const queryKey = [SUPPLIER_COLLABORATION_KEYS.all, options]

  return useQuery<SupplierCollaborationPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return SupplierCollaborationService.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function useSupplierCollaborationById(id: number) {
  return useQuery<SupplierCollaboration, AxiosError>({
    queryKey: [SUPPLIER_COLLABORATION_KEYS.detail(id)],
    queryFn: () => SupplierCollaborationService.get(id),
    enabled: !!id,
  })
}

export function useCreateSupplierCollaboration() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: SupplierCollaboration): Promise<SupplierCollaboration> =>
      SupplierCollaborationService.create(data),
    onMutate: async (newSupplierCollaboration) => {
      await queryClient.cancelQueries({
        queryKey: SUPPLIER_COLLABORATION_KEYS.all,
        exact: false,
      })
      const queryKey = [
        SUPPLIER_COLLABORATION_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]
      const previousSupplierCollaboration =
        queryClient.getQueryData<SupplierCollaborationPaginator>(queryKey)
      queryClient.setQueryData<SupplierCollaborationPaginator>(
        queryKey,
        (old) => {
          if (!old)
            return {
              data: [
                {
                  ...newSupplierCollaboration,
                  id: Date.now(),
                } as unknown as SupplierCollaboration,
              ],
              count: 1,
              pageIndex: DEFAULT_PAGE_INDEX,
              pageSize: DEFAULT_PAGE_SIZE,
            }
          return {
            ...old,
            data: [
              ...old.data,
              {
                ...newSupplierCollaboration,
                id: Date.now(),
              } as unknown as SupplierCollaboration,
            ],
            count: old.count + 1,
          }
        }
      )
      return { previousSupplierCollaboration }
    },
    onSuccess: () => {
      toast.success(t("form-successfully-created"))
      router.push(
        routes.scm.procurement.supplierCollaboration.supplierCollaboration
      )
    },
    onError: (err: any, newSupplierCollaboration, context) => {
      if (context?.previousSupplierCollaboration) {
        const queryKey = [
          SUPPLIER_COLLABORATION_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(
          queryKey,
          context.previousSupplierCollaboration
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
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: SUPPLIER_COLLABORATION_KEYS.all,
        exact: false,
      })
    },
  })
}

export function useReadAsMarked() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: ({ data }: { data: SupplierCollaboration }) =>
      SupplierCollaborationService.patch(data.id!, data),
    onMutate: async ({ data }) => {
      await queryClient.cancelQueries({
        queryKey: [SUPPLIER_COLLABORATION_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: SUPPLIER_COLLABORATION_KEYS.detail(data.id!),
      })
      const queryKey = [
        SUPPLIER_COLLABORATION_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]
      const previousSupplier =
        queryClient.getQueryData<SupplierCollaborationPaginator>(queryKey)
      const previousSupplierDetail =
        queryClient.getQueryData<SupplierCollaboration>(
          SUPPLIER_COLLABORATION_KEYS.detail(data.id!)
        )
      queryClient.setQueryData<SupplierCollaborationPaginator>(
        queryKey,
        (old) => {
          if (!old)
            return {
              data: [data as unknown as SupplierCollaboration],
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
        SUPPLIER_COLLABORATION_KEYS.detail(data.id!),
        data
      )
      return { previousSupplier, previousSupplierDetail }
    },
    onError: (err: any, variables, context) => {
      if (context?.previousSupplier) {
        const queryKey = [
          SUPPLIER_COLLABORATION_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousSupplier)
      }
      if (context?.previousSupplierDetail) {
        queryClient.setQueryData(
          SUPPLIER_COLLABORATION_KEYS.detail(variables.data.id!),
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
        queryKey: [SUPPLIER_COLLABORATION_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: SUPPLIER_COLLABORATION_KEYS.detail(data.id!),
        })
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: SUPPLIER_COLLABORATION_KEYS.all,
      })
      queryClient.invalidateQueries({
        queryKey: SUPPLIER_COLLABORATION_KEYS.detail(data.id!),
      })
      toast.success(t("form-marked-as-read"))
      router.push(
        routes.scm.procurement.supplierCollaboration.supplierCollaboration
      )
    },
  })
}

export function useMarkAsImportant() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: ({ data }: { data: SupplierCollaboration }) =>
      SupplierCollaborationService.patchImportant(data.id!, data),
    onMutate: async ({ data }) => {
      await queryClient.cancelQueries({
        queryKey: [SUPPLIER_COLLABORATION_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: SUPPLIER_COLLABORATION_KEYS.detail(data.id!),
      })
      const queryKey = [
        SUPPLIER_COLLABORATION_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]
      const previousSupplier =
        queryClient.getQueryData<SupplierCollaborationPaginator>(queryKey)
      const previousSupplierDetail =
        queryClient.getQueryData<SupplierCollaboration>(
          SUPPLIER_COLLABORATION_KEYS.detail(data.id!)
        )
      queryClient.setQueryData<SupplierCollaborationPaginator>(
        queryKey,
        (old) => {
          if (!old)
            return {
              data: [data as unknown as SupplierCollaboration],
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
        SUPPLIER_COLLABORATION_KEYS.detail(data.id!),
        data
      )
      return { previousSupplier, previousSupplierDetail }
    },
    onError: (err: any, variables, context) => {
      if (context?.previousSupplier) {
        const queryKey = [
          SUPPLIER_COLLABORATION_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousSupplier)
      }
      if (context?.previousSupplierDetail) {
        queryClient.setQueryData(
          SUPPLIER_COLLABORATION_KEYS.detail(variables.data.id!),
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
        queryKey: [SUPPLIER_COLLABORATION_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: SUPPLIER_COLLABORATION_KEYS.detail(data.id!),
        })
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: SUPPLIER_COLLABORATION_KEYS.all,
      })
      queryClient.invalidateQueries({
        queryKey: SUPPLIER_COLLABORATION_KEYS.detail(data.id!),
      })
      toast.success(t("form-marked-as-important"))
      router.push(
        routes.scm.procurement.supplierCollaboration.supplierCollaboration
      )
    },
  })
}

export function useMarkAsStarred() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: ({ data }: { data: SupplierCollaboration }) =>
      SupplierCollaborationService.patchStarred(data.id!, data),
    onMutate: async ({ data }) => {
      await queryClient.cancelQueries({
        queryKey: [SUPPLIER_COLLABORATION_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: SUPPLIER_COLLABORATION_KEYS.detail(data.id!),
      })
      const queryKey = [
        SUPPLIER_COLLABORATION_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]
      const previousSupplier =
        queryClient.getQueryData<SupplierCollaborationPaginator>(queryKey)
      const previousSupplierDetail =
        queryClient.getQueryData<SupplierCollaboration>(
          SUPPLIER_COLLABORATION_KEYS.detail(data.id!)
        )
      queryClient.setQueryData<SupplierCollaborationPaginator>(
        queryKey,
        (old) => {
          if (!old)
            return {
              data: [data as unknown as SupplierCollaboration],
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
        SUPPLIER_COLLABORATION_KEYS.detail(data.id!),
        data
      )
      return { previousSupplier, previousSupplierDetail }
    },
    onError: (err: any, variables, context) => {
      if (context?.previousSupplier) {
        const queryKey = [
          SUPPLIER_COLLABORATION_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousSupplier)
      }
      if (context?.previousSupplierDetail) {
        queryClient.setQueryData(
          SUPPLIER_COLLABORATION_KEYS.detail(variables.data.id!),
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
        queryKey: [SUPPLIER_COLLABORATION_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: SUPPLIER_COLLABORATION_KEYS.detail(data.id!),
        })
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: SUPPLIER_COLLABORATION_KEYS.all,
      })
      queryClient.invalidateQueries({
        queryKey: SUPPLIER_COLLABORATION_KEYS.detail(data.id!),
      })
      toast.success(t("form-marked-as-starred"))
      router.push(
        routes.scm.procurement.supplierCollaboration.supplierCollaboration
      )
    },
  })
}

export function useSendSupplierEmailReplay() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: ({ data }: { data: Replay }) =>
      SupplierCollaborationService.sendSupplierEmailReplay(data),
    onMutate: async ({ data }) => {
      await queryClient.cancelQueries({
        queryKey: [SUPPLIER_COLLABORATION_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: SUPPLIER_COLLABORATION_KEYS.detail(data.messageId!),
      })
      const queryKey = [
        SUPPLIER_COLLABORATION_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]
      const previousSupplier =
        queryClient.getQueryData<SupplierCollaborationPaginator>(queryKey)
      const previousSupplierDetail =
        queryClient.getQueryData<SupplierCollaboration>(
          SUPPLIER_COLLABORATION_KEYS.detail(data.messageId!)
        )
      queryClient.setQueryData<SupplierCollaborationPaginator>(
        queryKey,
        (old) => {
          if (!old)
            return {
              data: [data as unknown as SupplierCollaboration],
              count: 1,
              pageIndex: DEFAULT_PAGE_INDEX,
              pageSize: DEFAULT_PAGE_SIZE,
            }
          return {
            ...old,
            data: old.data.map((item) =>
              item.id === data.messageId ? { ...item, ...data } : item
            ),
          }
        }
      )
      queryClient.setQueryData(
        SUPPLIER_COLLABORATION_KEYS.detail(data.messageId!),
        data
      )
      return { previousSupplier, previousSupplierDetail }
    },
    onError: (err: any, variables, context) => {
      if (context?.previousSupplier) {
        const queryKey = [
          SUPPLIER_COLLABORATION_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousSupplier)
      }
      if (context?.previousSupplierDetail) {
        queryClient.setQueryData(
          SUPPLIER_COLLABORATION_KEYS.detail(variables.data.messageId!),
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
        queryKey: [SUPPLIER_COLLABORATION_KEYS.all],
        exact: false,
      })
      if (data?.messageId) {
        queryClient.invalidateQueries({
          queryKey: SUPPLIER_COLLABORATION_KEYS.detail(data.messageId!),
        })
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: SUPPLIER_COLLABORATION_KEYS.all,
      })
      queryClient.invalidateQueries({
        queryKey: SUPPLIER_COLLABORATION_KEYS.detail(data.messageId!),
      })
      toast.success(t("form-supplier-email-replayed"))
      router.push(
        routes.scm.procurement.supplierCollaboration.supplierCollaboration
      )
    },
  })
}

export function useDeleteSupplierCollaboration() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => SupplierCollaborationService.delete(id),
    onMutate: async (id) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [SUPPLIER_COLLABORATION_KEYS.all],
        exact: false,
      })

      const queryKey = [
        SUPPLIER_COLLABORATION_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousSupplierCollaborations =
        queryClient.getQueryData<SupplierCollaborationPaginator>(queryKey)

      queryClient.setQueryData<SupplierCollaborationPaginator>(
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

      return { previousSupplierCollaborations }
    },

    onSuccess: () => {
      toast.success(t("form-successfully-deleted"))
    },

    onError: (err, variables, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousSupplierCollaborations) {
        const queryKey = [
          SUPPLIER_COLLABORATION_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(
          queryKey,
          context.previousSupplierCollaborations
        )
        toast.error(t("form-failed-deleted"))
      }
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [SUPPLIER_COLLABORATION_KEYS.all],
        exact: false,
      })
    },
  })
}

// Utility hook for Supplier Collaboration operations
export function useSupplierCollaborationOperations() {
  const queryClient = useQueryClient()

  const invalidateSupplierCollaborationQueries = useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: [SUPPLIER_COLLABORATION_KEYS.all],
    })
  }, [queryClient])

  return {
    invalidateSupplierCollaborationQueries,
  }
}