"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";



import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";



import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/config/constants";
import { routes } from "@/config/routes";
import { ContractRenewalService } from "@/modules/scm/service/procurement/supplier/contract-renewal.service";
import { ContractRenewal, ContractRenewalPaginator } from "@/modules/scm/types/procurement/supplier/contract-renewal-types";
import { DEFAULT_QUERY_OPTIONS, createQueryKeys } from "@/server/service/query-config";





const CONTRACT_RENEWAL_KEYS = createQueryKeys("contract-renewal")

// Fetch single Contract Renewal by ID
export function useContractRenewalById(id: number) {
  return useQuery({
    queryKey: [CONTRACT_RENEWAL_KEYS.detail(id)],
    queryFn: () => ContractRenewalService.get(id),
    enabled: !!id,
    ...DEFAULT_QUERY_OPTIONS,
  })
}

export function useCreateContractRenewal() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: ContractRenewal): Promise<ContractRenewal> =>
      ContractRenewalService.create(data),
    onMutate: async (newContract) => {
      await queryClient.cancelQueries({
        queryKey: [CONTRACT_RENEWAL_KEYS.all],
        exact: false,
      })
      const queryKey = [
        CONTRACT_RENEWAL_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]
      const previousContractRenewal =
        queryClient.getQueryData<ContractRenewalPaginator>(queryKey)
      queryClient.setQueryData<ContractRenewalPaginator>(queryKey, (old) => {
        if (!old)
          return {
            data: [newContract as unknown as ContractRenewal],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [
            ...old.data,
            { ...newContract, id: Date.now() } as unknown as ContractRenewal,
          ],
          count: old.count + 1,
        }
      })
      return { previousContractRenewal }
    },
    onSuccess: () => {
      toast.success(t("form-successfully-created"))
      router.push(routes.scm.procurement.suppliers.suppliers)
    },
    onError: (err: any, newContract, context) => {
      if (context?.previousContractRenewal) {
        const queryKey = [
          CONTRACT_RENEWAL_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousContractRenewal)
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
        queryKey: [CONTRACT_RENEWAL_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateContractRenewal() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: ({ data }: { data: ContractRenewal }) =>
      ContractRenewalService.update(data),
    onMutate: async ({ data }) => {
      await queryClient.cancelQueries({
        queryKey: [CONTRACT_RENEWAL_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: [CONTRACT_RENEWAL_KEYS.detail(data.id!)],
      })
      const queryKey = [
        CONTRACT_RENEWAL_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]
      const previousContractRenewal =
        queryClient.getQueryData<ContractRenewalPaginator>(queryKey)
      const previousContractRenewalDetail =
        queryClient.getQueryData<ContractRenewal>(
          CONTRACT_RENEWAL_KEYS.detail(data.id!)
        )
      queryClient.setQueryData<ContractRenewalPaginator>(queryKey, (old) => {
        if (!old)
          return {
            data: [data as unknown as ContractRenewal],
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
      queryClient.setQueryData(CONTRACT_RENEWAL_KEYS.detail(data.id!), data)
      return { previousContractRenewal, previousContractRenewalDetail }
    },
    onError: (err: any, variables, context) => {
      if (context?.previousContractRenewal) {
        const queryKey = [
          CONTRACT_RENEWAL_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousContractRenewal)
      }
      if (context?.previousContractRenewalDetail) {
        queryClient.setQueryData(
          CONTRACT_RENEWAL_KEYS.detail(variables.data.id!),
          context.previousContractRenewalDetail
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
        queryKey: [CONTRACT_RENEWAL_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: [CONTRACT_RENEWAL_KEYS.detail(data.id!)],
        })
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [CONTRACT_RENEWAL_KEYS.all] })
      queryClient.invalidateQueries({
        queryKey: [CONTRACT_RENEWAL_KEYS.detail(data.id!)],
      })
      toast.success(t("form-successfully-update"))
    },
  })
}

export function useDeleteContractRenewal() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: () => ContractRenewalService.delete(),
    onMutate: async () => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [CONTRACT_RENEWAL_KEYS.all],
        exact: false,
      })

      const queryKey = [
        CONTRACT_RENEWAL_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousContractRenewal =
        queryClient.getQueryData<ContractRenewalPaginator>(queryKey)

      queryClient.setQueryData<ContractRenewalPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => item.id !== item.id),
          count: old.count - 1,
        }
      })

      return { previousContractRenewal }
    },

    onSuccess: () => {
      toast.success(t("form-successfully-deleted"))
    },

    onError: (err: any, variables, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousContractRenewal) {
        const queryKey = [
          CONTRACT_RENEWAL_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousContractRenewal)
        toast.error(t("form-error-deleting"))
        // toast.error(err.response.data)
      }
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [CONTRACT_RENEWAL_KEYS.all],
        exact: false,
      })
    },
  })
}

// Utility hook for Contract Renewal operations
export function useContractRenewalOperations() {
  const queryClient = useQueryClient()

  const invalidateContractRenewalQueries = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ["contract-renewal-list"] })
  }, [queryClient])

  return {
    invalidateContractRenewalQueries,
  }
}