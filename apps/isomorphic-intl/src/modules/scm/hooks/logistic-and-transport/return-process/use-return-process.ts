"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";



import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";



import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/config/constants";
import { routes } from "@/config/routes";
import { ReturnProcessService } from "@/modules/scm/service/logistic-and-transport/return-process/return-process.service";
import { ReturnProcess, ReturnProcessPaginator, ReturnProcessQueryOptions } from "@/modules/scm/types/logistics-and-transport/return-process/return-process-types";
import { DEFAULT_QUERY_OPTIONS, createQueryKeys } from "@/server/service/query-config";





const RETURN_PROCESS_KEYS = createQueryKeys("return-process")

export function useReturnProcessList(
  options?: Partial<ReturnProcessQueryOptions>
) {
  const queryKey = [RETURN_PROCESS_KEYS.all, options]

  return useQuery<ReturnProcessPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return ReturnProcessService.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function useReturnProcessById(id: number) {
  return useQuery({
    queryKey: [RETURN_PROCESS_KEYS.detail(id)],
    queryFn: () => ReturnProcessService.get(id),
    enabled: !!id,
    ...DEFAULT_QUERY_OPTIONS,
  })
}

export function useCreateReturnProcess() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")
  return useMutation({
    mutationFn: (data: ReturnProcess): Promise<ReturnProcess> =>
      ReturnProcessService.create(data),
    onMutate: async (newReturnProcess) => {
      await queryClient.cancelQueries({
        queryKey: [RETURN_PROCESS_KEYS.all],
        exact: false,
      })
      const queryKey = [
        RETURN_PROCESS_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]
      const previousReturnProcess =
        queryClient.getQueryData<ReturnProcessPaginator>(queryKey)
      queryClient.setQueryData<ReturnProcessPaginator>(queryKey, (old) => {
        if (!old)
          return {
            data: [newReturnProcess],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [...old.data, { ...newReturnProcess, id: Date.now() }],
          count: old.count + 1,
        }
      })
      return { previousReturnProcess }
    },
    onSuccess: () => {
      toast.success(t("form-successfully-created"))
      router.push(
        routes.scm.logisticsAndTransport.returnManagement.returnManagement
      )
    },
    onError: (err: any, newReturnProcess, context) => {
      if (context?.previousReturnProcess) {
        const queryKey = [
          RETURN_PROCESS_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousReturnProcess)
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
        queryKey: [RETURN_PROCESS_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateReturnProcess() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")
  return useMutation({
    mutationFn: ({ data }: { data: ReturnProcess }) =>
      ReturnProcessService.update(data),
    onMutate: async ({ data }) => {
      await queryClient.cancelQueries({
        queryKey: [RETURN_PROCESS_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: [RETURN_PROCESS_KEYS.detail(data.id!)],
      })
      const queryKey = [
        RETURN_PROCESS_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]
      const previousReturnProcess =
        queryClient.getQueryData<ReturnProcessPaginator>(queryKey)
      const previousReturnProcessDetail =
        queryClient.getQueryData<ReturnProcess>(
          RETURN_PROCESS_KEYS.detail(data.id!)
        )
      queryClient.setQueryData<ReturnProcessPaginator>(queryKey, (old) => {
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
      queryClient.setQueryData(RETURN_PROCESS_KEYS.detail(data.id!), data)
      return { previousReturnProcess, previousReturnProcessDetail }
    },
    onError: (err: any, variables, context) => {
      if (context?.previousReturnProcess) {
        const queryKey = [
          RETURN_PROCESS_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousReturnProcess)
      }
      if (context?.previousReturnProcessDetail) {
        queryClient.setQueryData(
          RETURN_PROCESS_KEYS.detail(variables.data.id!),
          context.previousReturnProcessDetail
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
        queryKey: [RETURN_PROCESS_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: [RETURN_PROCESS_KEYS.detail(data.id!)],
        })
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: RETURN_PROCESS_KEYS.all })
      queryClient.invalidateQueries({
        queryKey: [RETURN_PROCESS_KEYS.detail(data.id!)],
      })
      toast.success(t("form-successfully-updated"))
      router.push(
        routes.scm.logisticsAndTransport.returnManagement.returnManagement
      )
    },
  })
}

export function useDeleteReturnProcess() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => ReturnProcessService.delete(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({
        queryKey: [RETURN_PROCESS_KEYS.all],
        exact: false,
      })

      const queryKey = [
        RETURN_PROCESS_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousReturnProcess =
        queryClient.getQueryData<ReturnProcessPaginator>(queryKey)

      // Optimistically remove the COA from the list
      queryClient.setQueryData<ReturnProcessPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => item.id !== id),
          count: old.count - 1,
        }
      })

      return { previousReturnProcess }
    },

    onSuccess: () => {
      toast.success(t("form-successfully-deleted"))
    },

    onError: (err: any, variables, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousReturnProcess) {
        const queryKey = [
          RETURN_PROCESS_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousReturnProcess)
      }
      toast.error(t("form-error-deleting-dependency"))
      // toast.error(err.response.data)
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [RETURN_PROCESS_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeleteReturnProcess() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (ids: number[]) => ReturnProcessService.bulkDelete(ids),
    onMutate: async (ids) => {
      await queryClient.cancelQueries({
        queryKey: [RETURN_PROCESS_KEYS.all],
        exact: false,
      })

      const queryKey = [
        RETURN_PROCESS_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousReturnProcess =
        queryClient.getQueryData<ReturnProcessPaginator>(queryKey)

      // Optimistically remove multiple items from the list
      queryClient.setQueryData<ReturnProcessPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => !ids.includes(item.id!)),
          count: old.count - ids.length,
        }
      })

      return { previousReturnProcess }
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
      if (context?.previousReturnProcess) {
        const queryKey = [
          RETURN_PROCESS_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousReturnProcess)
        toast.error(t("form-error-bulk-delete-dependency"))
        // toast.error(err.response.data)
      }
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [RETURN_PROCESS_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useReturnProcessOperations() {
  const queryClient = useQueryClient()

  const invalidateReturnProcessQueries = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: RETURN_PROCESS_KEYS.all })
  }, [queryClient])

  return {
    invalidateReturnProcessQueries,
  }
}