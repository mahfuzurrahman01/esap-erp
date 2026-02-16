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
import { routes } from "@/config/routes"
import { lead } from "@/modules/crm/service/lead.service"
import {
  LeadList,
  LeadPaginator,
  LeadQueryOptions,
} from "@/modules/crm/types/lead"
import {
  DEFAULT_QUERY_OPTIONS,
  createQueryKeys,
} from "@/server/service/query-config"

//use-lead.ts

export const LEAD_KEYS = createQueryKeys("lead")

export function useLeadList(options?: Partial<LeadQueryOptions>) {
  const queryKey = [LEAD_KEYS.all, options]

  return useQuery<LeadPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return lead.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    throwOnError: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

export function useLeadById(id: any) {
  return useQuery({
    queryKey: [LEAD_KEYS.detail(id)],
    queryFn: () => lead.get(id),
    throwOnError: false,
    enabled: !!id,
    ...DEFAULT_QUERY_OPTIONS,
  })
}

export function useCreateLead() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: any): Promise<any> => lead.create(data),
    onMutate: async (newLead) => {
      await queryClient.cancelQueries({
        queryKey: [LEAD_KEYS.all],
        exact: false,
      })

      const queryKey = [
        LEAD_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousCountries =
        queryClient.getQueryData<LeadPaginator>(queryKey)

      queryClient.setQueryData<LeadPaginator>(queryKey, (old: any) => {
        if (!old)
          return {
            data: [newLead],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [...old.data, { ...newLead, id: Date.now() }],
          count: old.count + 1,
        }
      })

      return { previousCountries }
    },
    onSuccess: () => {
      router.push(routes.crm.leads)
      toast.success(t("form-lead-created-successfully"))
    },
    onError: (err, newLead, context) => {
      toast.error(t("form-failed-to-create-lead"))
      if (context?.previousCountries) {
        const queryKey = [
          LEAD_KEYS.all,
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
        queryKey: [LEAD_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useImportLead() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: any): Promise<any> => lead.import(data),
    onMutate: async (newLead) => {
      await queryClient.cancelQueries({
        queryKey: [LEAD_KEYS.all],
        exact: false,
      })

      const queryKey = [
        LEAD_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousCountries =
        queryClient.getQueryData<LeadPaginator>(queryKey)

      queryClient.setQueryData<LeadPaginator>(queryKey, (old: any) => {
        if (!old)
          return {
            data: [newLead],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [...old.data, { ...newLead, id: Date.now() }],
          count: old.count + 1,
        }
      })

      return { previousCountries }
    },
    onSuccess: () => {
      router.push(routes.crm.leads)
      toast.success(t("form-lead-imported-successfully"))
    },
    onError: (err, newLead, context) => {
      toast.error(t("form-failed-to-import-lead"))
      if (context?.previousCountries) {
        const queryKey = [
          LEAD_KEYS.all,
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
        queryKey: [LEAD_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateLead() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: ({ id, data }: { id: any; data: any }) => lead.update(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({
        queryKey: [LEAD_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: LEAD_KEYS.detail(id),
      })

      const queryKey = [
        LEAD_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousCountries =
        queryClient.getQueryData<LeadPaginator>(queryKey)
      const previousLead = queryClient.getQueryData<LeadList>(
        LEAD_KEYS.detail(id)
      )

      queryClient.setQueryData<LeadPaginator>(queryKey, (old: any) => {
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

      queryClient.setQueryData(LEAD_KEYS.detail(id), data)

      return { previousCountries, previousLead }
    },
    onSuccess: () => {
      router.push(routes.crm.leads)
      toast.success(t("form-lead-updated-successfully"))
    },
    onError: (err, variables, context) => {
      toast.error(t("form-failed-to-update-lead"))
      if (context?.previousCountries) {
        const queryKey = [
          LEAD_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousCountries)
      }
      if (context?.previousLead) {
        queryClient.setQueryData(
          LEAD_KEYS.detail(variables.id),
          context.previousLead
        )
      }
    },
    onSettled: (data: any) => {
      queryClient.invalidateQueries({
        queryKey: [LEAD_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: LEAD_KEYS.detail(data.id),
        })
      }
    },
  })
}

export function useDeleteLead() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: any) => lead.delete(id),
    onMutate: async (id) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [LEAD_KEYS.all],
        exact: false,
      })

      const queryKey = [
        LEAD_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousCountries =
        queryClient.getQueryData<LeadPaginator>(queryKey)

      // Optimistically remove the COA from the list
      queryClient.setQueryData<LeadPaginator>(queryKey, (old) => {
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
      toast.success(t("form-lead-deleted-successfully"))
    },

    onError: (err:any, variables, context) => {
      if(err.response.data.details){
        toast.error(err.response.data.details)
      }else{
        toast.error(t("form-failed-to-delete-lead"))
      }
      if (context?.previousCountries) {
        const queryKey = [
          LEAD_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousCountries)
      }
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [LEAD_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeleteLead() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    // Change mutationFn to accept an array of IDs
    mutationFn: (ids: number[]) => lead.bulkDelete(ids),
    onMutate: async (ids) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [LEAD_KEYS.all],
        exact: false,
      })

      const queryKey = [
        LEAD_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousItems = queryClient.getQueryData<LeadPaginator>(queryKey)

      // Optimistically remove multiple items from the list
      queryClient.setQueryData<LeadPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => !ids.includes(item.id!)),
          count: old.count - ids.length,
        }
      })

      return { previousItems }
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
      if (context?.previousItems) {
        const queryKey = [
          LEAD_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousItems)
      }
      if(err.response.data.details){
        toast.error(err.response.data.details)
      }else{
        toast.error(t("form-error-bulk-delete"))
      }
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [LEAD_KEYS.all],
        exact: false,
      })
    },
  })
}
