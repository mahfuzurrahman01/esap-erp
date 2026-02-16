"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";



import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "react-hot-toast";



import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/config/constants";
import { routes } from "@/config/routes";
import { ContractService } from "@/modules/scm/service/procurement/supplier/contract.service";
import { ContractInput, ContractPaginator, ContractQueryOptions } from "@/modules/scm/types/procurement/supplier/contract-types";
import { DEFAULT_QUERY_OPTIONS, createQueryKeys } from "@/server/service/query-config";





const CONTRACT_KEYS = createQueryKeys("contract")

export function useContractList(options?: Partial<ContractQueryOptions>) {
  const queryKey = [CONTRACT_KEYS.all, options]

  return useQuery<ContractPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return ContractService.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function useSupplierContractList(options?: Partial<any>) {
  const queryKey = [CONTRACT_KEYS.all, options]

  return useQuery<ContractPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return ContractService.allSupplierContract(
        Object.assign({}, queryKey[1], pageParam)
      )
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function useContractById(id: number) {
  return useQuery({
    queryKey: [CONTRACT_KEYS.detail(id)],
    queryFn: () => ContractService.get(id),
    enabled: !!id,
    ...DEFAULT_QUERY_OPTIONS,
  })
}

export function useCreateContract() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: ContractInput): Promise<ContractInput> =>
      ContractService.create(data),
    onMutate: async (newContract) => {
      await queryClient.cancelQueries({
        queryKey: [CONTRACT_KEYS.all],
        exact: false,
      })
      const queryKey = [
        CONTRACT_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]
      const previousContract =
        queryClient.getQueryData<ContractPaginator>(queryKey)
      queryClient.setQueryData<ContractPaginator>(queryKey, (old) => {
        if (!old)
          return {
            data: [newContract],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [...old.data, { ...newContract, id: Date.now() }],
          count: old.count + 1,
        }
      })
      return { previousContract }
    },
    onSuccess: () => {
      toast.success(t("form-successfully-created"))
      router.push(routes.scm.procurement.suppliers.suppliers)
    },
    onError: (err: any, newContract, context) => {
      if (context?.previousContract) {
        const queryKey = [
          CONTRACT_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousContract)
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
        queryKey: [CONTRACT_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useDeleteContract() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => ContractService.delete(id),
    onMutate: async () => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [CONTRACT_KEYS.all],
        exact: false,
      })

      const queryKey = [
        CONTRACT_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousContract =
        queryClient.getQueryData<ContractPaginator>(queryKey)

      queryClient.setQueryData<ContractPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => item.id !== item.id),
          count: old.count - 1,
        }
      })

      return { previousContract }
    },

    onSuccess: () => {
      toast.success(t("form-successfully-deleted"))
    },

    onError: (err: any, variables, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousContract) {
        const queryKey = [
          CONTRACT_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousContract)
      }
      toast.error(t("form-error-deleting-dependency"))
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [CONTRACT_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useContractOperations() {
  const queryClient = useQueryClient()

  const invalidateContractQueries = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: [CONTRACT_KEYS.all] })
  }, [queryClient])

  return {
    invalidateContractQueries,
  }
}