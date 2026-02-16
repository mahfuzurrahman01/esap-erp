"use client"

import { useRouter } from "next/navigation"

import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import toast from "react-hot-toast"

import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/config/constants"
import { sla } from "@/modules/crm/service/sla.service"
import { SlaList, SlaPaginator, SlaQueryOptions } from "@/modules/crm/types/sla"
import {
  DEFAULT_QUERY_OPTIONS,
  createQueryKeys,
} from "@/server/service/query-config"

export const SLA_KEYS = createQueryKeys("Sla")

export function useSlaList(options?: Partial<SlaQueryOptions>) {
  const queryKey = [SLA_KEYS.all, options]

  return useQuery<SlaPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return sla.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    throwOnError: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

export function useSlaById(id: any) {
  return useQuery({
    queryKey: SLA_KEYS.detail(id),
    queryFn: () => sla.get(id),
    enabled: !!id,
    ...DEFAULT_QUERY_OPTIONS,
  })
}

export function useCreateSla() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: any): Promise<any> => sla.create(data),
    onMutate: async (newSla) => {
      await queryClient.cancelQueries({
        queryKey: [SLA_KEYS.all],
        exact: false,
      })

      const queryKey = [
        SLA_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousCountries = queryClient.getQueryData<SlaPaginator>(queryKey)

      queryClient.setQueryData<SlaPaginator>(queryKey, (old: any) => {
        if (!old)
          return {
            data: [newSla],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [...old.data, { ...newSla, id: Date.now() }],
          count: old.count + 1,
        }
      })

      return { previousCountries }
    },
    onSuccess: () => {
      toast.success(t("form-Sla-created-successfully"))
      router.refresh()
    },
    onError: (err, newSla, context) => {
      toast.error(t("form-failed-to-create-Sla"))
      if (context?.previousCountries) {
        const queryKey = [
          SLA_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousCountries)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [SLA_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateSla() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: ({ id, data }: { id: any; data: any }) => sla.update(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({
        queryKey: [SLA_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: SLA_KEYS.detail(id),
      })

      const queryKey = [
        SLA_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousCountries = queryClient.getQueryData<SlaPaginator>(queryKey)
      const previousSla = queryClient.getQueryData<SlaList>(SLA_KEYS.detail(id))

      queryClient.setQueryData<SlaPaginator>(queryKey, (old: any) => {
        if (!old)
          return {
            data: [data],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: old.data.map((item: any) =>
            item.id === id ? { ...item, ...data } : item
          ),
        }
      })

      queryClient.setQueryData(SLA_KEYS.detail(id), data)

      return { previousCountries, previousSla }
    },
    onSuccess: () => {
      toast.success(t("form-Sla-updated-successfully"))
      router.refresh()
    },
    onError: (err, variables, context) => {
      toast.error(t("form-failed-to-update-Sla"))
      if (context?.previousCountries) {
        const queryKey = [
          SLA_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousCountries)
      }
      if (context?.previousSla) {
        queryClient.setQueryData(
          SLA_KEYS.detail(variables.id),
          context.previousSla
        )
      }
    },
    onSettled: (data: any) => {
      queryClient.invalidateQueries({
        queryKey: [SLA_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: SLA_KEYS.detail(data.id),
        })
      }
    },
  })
}

export function useDeleteSla() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: any) => sla.delete(id),
    onMutate: async (id) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [SLA_KEYS.all],
        exact: false,
      })

      const queryKey = [
        SLA_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousCountries = queryClient.getQueryData<SlaPaginator>(queryKey)

      // Optimistically remove the COA from the list
      queryClient.setQueryData<SlaPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => item.id !== id),
          count: old.count - 1,
        }
      })

      return { previousCountries }
    },

    onSuccess: () => {
      toast.success(t("form-Sla-deleted-successfully"))
    },

    onError: (err, variables, context) => {
      if (context?.previousCountries) {
        const queryKey = [
          SLA_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousCountries)
      }
      toast.error(t("form-failed-to-delete-Sla"))
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [SLA_KEYS.all],
        exact: false,
      })
    },
  })
}
