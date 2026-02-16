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
import { opportunity } from "@/modules/crm/service/opportunity.service"
import {
  OpportunityList,
  OpportunityPaginator,
  OpportunityQueryOptions,
} from "@/modules/crm/types/opportunity"
import {
  DEFAULT_QUERY_OPTIONS,
  createQueryKeys,
} from "@/server/service/query-config"

export const OPPORTUNITY_KEYS = createQueryKeys("Opportunity")

export function useOpportunityList(options?: Partial<OpportunityQueryOptions>) {
  const queryKey = [OPPORTUNITY_KEYS.all, options]

  return useQuery<OpportunityPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return opportunity.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    throwOnError: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

export function useOpportunityById(id: any) {
  return useQuery({
    queryKey: [OPPORTUNITY_KEYS.detail(id)],
    queryFn: () => opportunity.get(id),
    enabled: !!id,
    ...DEFAULT_QUERY_OPTIONS,
  })
}

export function useCreateOpportunity() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: any): Promise<any> => opportunity.create(data),
    onMutate: async (newOpportunity) => {
      await queryClient.cancelQueries({
        queryKey: [OPPORTUNITY_KEYS.all],
        exact: false,
      })

      const queryKey = [
        OPPORTUNITY_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousCountries =
        queryClient.getQueryData<OpportunityPaginator>(queryKey)

      queryClient.setQueryData<OpportunityPaginator>(queryKey, (old: any) => {
        if (!old)
          return {
            data: [newOpportunity],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [...old.data, { ...newOpportunity, id: Date.now() }],
          count: old.count + 1,
        }
      })

      return { previousCountries }
    },
    onSuccess: () => {
      router.push(routes.crm.opportunities)
      toast.success(t("form-opportunity-created-successfully"))
    },
    onError: (err, newOpportunity, context) => {
      toast.error(t("form-failed-to-create-opportunity"))
      if (context?.previousCountries) {
        const queryKey = [
          OPPORTUNITY_KEYS.all,
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
        queryKey: [OPPORTUNITY_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateOpportunity() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: ({ id, data }: { id: any; data: any }) =>
      opportunity.update(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({
        queryKey: [OPPORTUNITY_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: OPPORTUNITY_KEYS.detail(id),
      })

      const queryKey = [
        OPPORTUNITY_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousCountries =
        queryClient.getQueryData<OpportunityPaginator>(queryKey)
      const previousOpportunity = queryClient.getQueryData<OpportunityList>(
        OPPORTUNITY_KEYS.detail(id)
      )

      queryClient.setQueryData<OpportunityPaginator>(queryKey, (old: any) => {
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

      queryClient.setQueryData(OPPORTUNITY_KEYS.detail(id), data)

      return { previousCountries, previousOpportunity }
    },
    onSuccess: () => {
      router.push(routes.crm.opportunities)
      toast.success(t("form-opportunity-updated-successfully"))
    },
    onError: (err, variables, context) => {
      toast.error(t("form-failed-to-update-opportunity"))
      if (context?.previousCountries) {
        const queryKey = [
          OPPORTUNITY_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousCountries)
      }
      if (context?.previousOpportunity) {
        queryClient.setQueryData(
          OPPORTUNITY_KEYS.detail(variables.id),
          context.previousOpportunity
        )
      }
    },
    onSettled: (data: any) => {
      queryClient.invalidateQueries({
        queryKey: [OPPORTUNITY_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: OPPORTUNITY_KEYS.detail(data.id),
        })
      }
    },
  })
}

export function useDeleteOpportunity() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: any) => opportunity.delete(id),
    onMutate: async (id) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [OPPORTUNITY_KEYS.all],
        exact: false,
      })

      const queryKey = [
        OPPORTUNITY_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousCountries =
        queryClient.getQueryData<OpportunityPaginator>(queryKey)

      // Optimistically remove the COA from the list
      queryClient.setQueryData<OpportunityPaginator>(queryKey, (old) => {
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
      toast.success(t("form-opportunity-deleted-successfully"))
    },

    onError: (err:any, variables, context) => {
      if(err.response.data.details){
        toast.error(err.response.data.details)
      }else{
        toast.error(t("form-failed-to-delete-opportunity"))
      }
      if (context?.previousCountries) {
        const queryKey = [
          OPPORTUNITY_KEYS.all,
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
        queryKey: [OPPORTUNITY_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeleteOpportunity() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    // Change mutationFn to accept an array of IDs
    mutationFn: (ids: number[]) => opportunity.bulkDelete(ids),
    onMutate: async (ids) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [OPPORTUNITY_KEYS.all],
        exact: false,
      })

      const queryKey = [
        OPPORTUNITY_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousItems = queryClient.getQueryData<OpportunityPaginator>(queryKey)

      // Optimistically remove multiple items from the list
      queryClient.setQueryData<OpportunityPaginator>(queryKey, (old) => {
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
          OPPORTUNITY_KEYS.all,
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
        queryKey: [OPPORTUNITY_KEYS.all],
        exact: false,
      })
    },
  })
}
