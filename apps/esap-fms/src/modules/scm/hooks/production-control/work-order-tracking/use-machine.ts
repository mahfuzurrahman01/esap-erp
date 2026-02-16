"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";



import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";



import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/config/constants";
import { routes } from "@/config/routes";
import { MachineService } from "@/modules/scm/service/production-control/work-order-tracking/machine.service";
import { Machine, MachinePaginator, MachineQueryOptions } from "@/modules/scm/types/production-control/work-order-tracking/machine-types";
import { DEFAULT_QUERY_OPTIONS, createQueryKeys } from "@/server/service/query-config";





const MACHINE_KEYS = createQueryKeys("machine")

export function useMachinesList(options?: Partial<MachineQueryOptions>) {
  const queryKey = [MACHINE_KEYS.all, options]

  return useQuery<MachinePaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return MachineService.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function useMachineById(id: number) {
  return useQuery({
    queryKey: [MACHINE_KEYS.detail(id)],
    queryFn: () => MachineService.get(id),
    enabled: !!id,
    ...DEFAULT_QUERY_OPTIONS,
  })
}

export function useCreateMachine() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: Machine): Promise<Machine> =>
      MachineService.create(data),
    onMutate: async (newMachine) => {
      await queryClient.cancelQueries({
        queryKey: [MACHINE_KEYS.all],
        exact: false,
      })
      const queryKey = [
        MACHINE_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]
      const previousMachines =
        queryClient.getQueryData<MachinePaginator>(queryKey)
      queryClient.setQueryData<MachinePaginator>(queryKey, (old) => {
        if (!old)
          return {
            data: [newMachine],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [...old.data, { ...newMachine, id: Date.now() }],
          count: old.count + 1,
        }
      })
      return { previousMachines }
    },
    onSuccess: () => {
      toast.success(t("form-created-successfully"))
      router.push(routes.scm.productionControl.settings.machine)
    },
    onError: (err: any, newMachine, context) => {
      if (context?.previousMachines) {
        const queryKey = [
          MACHINE_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousMachines)
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
        queryKey: [MACHINE_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateMachine() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")
  const router = useRouter()
  return useMutation({
    mutationFn: ({ data }: { data: Machine }) => MachineService.update(data),
    onMutate: async ({ data }) => {
      await queryClient.cancelQueries({
        queryKey: [MACHINE_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: [MACHINE_KEYS.detail(data.id!)],
      })
      const queryKey = [
        MACHINE_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]
      const previousMachines =
        queryClient.getQueryData<MachinePaginator>(queryKey)
      const previousMachine = queryClient.getQueryData<Machine>(
        MACHINE_KEYS.detail(data.id!)
      )
      queryClient.setQueryData<MachinePaginator>(queryKey, (old) => {
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
      queryClient.setQueryData(MACHINE_KEYS.detail(data.id!), data)
      return { previousMachines, previousMachine }
    },
    onError: (err: any, variables, context) => {
      if (context?.previousMachines) {
        const queryKey = [
          MACHINE_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousMachines)
      }
      if (context?.previousMachine) {
        queryClient.setQueryData(
          MACHINE_KEYS.detail(variables.data.id!),
          context.previousMachine
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
        queryKey: [MACHINE_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: [MACHINE_KEYS.detail(data.id!)],
        })
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [MACHINE_KEYS.all],
      })
      queryClient.invalidateQueries({
        queryKey: [MACHINE_KEYS.detail(data.id!)],
      })
      toast.success(t("form-updated-successfully"))
      router.push(routes.scm.productionControl.settings.machine)
    },
  })
}

export function useDeleteMachine() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => MachineService.delete(id),
    onMutate: async (id) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [MACHINE_KEYS.all],
        exact: false,
      })

      const queryKey = [
        MACHINE_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousMachines =
        queryClient.getQueryData<MachinePaginator>(queryKey)

      // Optimistically remove the stock transfer from the list
      queryClient.setQueryData<MachinePaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => item.id !== id),
          count: old.count - 1,
        }
      })

      return { previousMachines }
    },

    onSuccess: () => {
      toast.success(t("form-successfully-deleted"))
    },

    onError: (err: any, variables, context) => {
      if (context?.previousMachines) {
        const queryKey = [
          MACHINE_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousMachines)
      }
      toast.error(t("form-error-delete"))
      // toast.error(err?.response?.data)
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [MACHINE_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeleteMachine() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    // Change mutationFn to accept an array of IDs
    mutationFn: (ids: number[]) => MachineService.bulkDelete(ids),
    onMutate: async (ids) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [MACHINE_KEYS.all],
        exact: false,
      })

      const queryKey = [
        MACHINE_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousMachines =
        queryClient.getQueryData<MachinePaginator>(queryKey)

      // Optimistically remove multiple items from the list
      queryClient.setQueryData<MachinePaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => !ids.includes(item.id!)),
          count: old.count - ids.length,
        }
      })

      return { previousMachines }
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
      if (context?.previousMachines) {
        const queryKey = [
          MACHINE_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousMachines)
      }
      toast.error(t("form-error-bulk-delete"))
      // toast.error(err?.response?.data)
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [MACHINE_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useMachinesOperations() {
  const queryClient = useQueryClient()

  const invalidateMachinesQueries = useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: ["machines-list"],
    })
  }, [queryClient])

  return {
    invalidateMachinesQueries,
  }
}