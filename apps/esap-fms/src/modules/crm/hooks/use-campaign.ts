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
import { campaign } from "@/modules/crm/service/campaign.service"
import {
  CampaignList,
  CampaignPaginator,
  CampaignQueryOptions,
} from "@/modules/crm/types/campaign"
import {
  DEFAULT_QUERY_OPTIONS,
  createQueryKeys,
} from "@/server/service/query-config"

//use-campaign.ts

export const CAMPAIGN_KEYS = createQueryKeys("campaign")

export function useCampaignList(options?: Partial<CampaignQueryOptions>) {
  const queryKey = [CAMPAIGN_KEYS.all, options]

  return useQuery<CampaignPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return campaign.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    throwOnError: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

export function useCampaignById(id: any) {
  return useQuery({
    queryKey: [CAMPAIGN_KEYS.detail(id)],
    queryFn: () => campaign.get(id),
    enabled: !!id,
    ...DEFAULT_QUERY_OPTIONS,
  })
}

export function useCreatecampaign() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: any): Promise<any> => campaign.create(data),
    onMutate: async (newcampaign) => {
      await queryClient.cancelQueries({
        queryKey: [CAMPAIGN_KEYS.all],
        exact: false,
      })

      const queryKey = [
        CAMPAIGN_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousCountries =
        queryClient.getQueryData<CampaignPaginator>(queryKey)

      queryClient.setQueryData<CampaignPaginator>(queryKey, (old: any) => {
        if (!old)
          return {
            data: [newcampaign],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [...old.data, { ...newcampaign, id: Date.now() }],
          count: old.count + 1,
        }
      })

      return { previousCountries }
    },
    onSuccess: () => {
      router.push(routes.crm.campaigns)
      toast.success(t("form-campaign-created-successfully"))
    },
    onError: (err, newcampaign, context) => {
      toast.error(t("form-failed-to-create-campaign"))
      if (context?.previousCountries) {
        const queryKey = [
          CAMPAIGN_KEYS.all,
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
        queryKey: [CAMPAIGN_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdatecampaign() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: ({ id, data }: { id: any; data: any }) =>
      campaign.update(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({
        queryKey: [CAMPAIGN_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: CAMPAIGN_KEYS.detail(id),
      })

      const queryKey = [
        CAMPAIGN_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousCountries =
        queryClient.getQueryData<CampaignPaginator>(queryKey)
      const previouscampaign = queryClient.getQueryData<CampaignList>(
        CAMPAIGN_KEYS.detail(id)
      )

      queryClient.setQueryData<CampaignPaginator>(queryKey, (old: any) => {
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

      queryClient.setQueryData(CAMPAIGN_KEYS.detail(id), data)

      return { previousCountries, previouscampaign }
    },
    onSuccess: () => {
      router.push(routes.crm.campaigns)
      toast.success(t("form-campaign-updated-successfully"))
    },
    onError: (err, variables, context) => {
      toast.error(t("form-failed-to-update-campaign"))
      if (context?.previousCountries) {
        const queryKey = [
          CAMPAIGN_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousCountries)
      }
      if (context?.previouscampaign) {
        queryClient.setQueryData(
          CAMPAIGN_KEYS.detail(variables.id),
          context.previouscampaign
        )
      }
    },
    onSettled: (data: any) => {
      queryClient.invalidateQueries({
        queryKey: [CAMPAIGN_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: CAMPAIGN_KEYS.detail(data.id),
        })
      }
    },
  })
}

export function useDeleteCampaign() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: any) => campaign.delete(id),
    onMutate: async (id) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [CAMPAIGN_KEYS.all],
        exact: false,
      })

      const queryKey = [
        CAMPAIGN_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousCountries =
        queryClient.getQueryData<CampaignPaginator>(queryKey)

      // Optimistically remove the COA from the list
      queryClient.setQueryData<CampaignPaginator>(queryKey, (old) => {
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
      toast.success(t("form-campaign-deleted-successfully"))
    },

    onError: (err:any, variables, context) => {
      if(err.response.data.details){
        toast.error(err.response.data.details)
      }else{
        toast.error(t("form-failed-to-delete-campaign"))
      }
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousCountries) {
        const queryKey = [
          CAMPAIGN_KEYS.all,
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
        queryKey: [CAMPAIGN_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeleteCampaign() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    // Change mutationFn to accept an array of IDs
    mutationFn: (ids: number[]) => campaign.bulkDelete(ids),
    onMutate: async (ids) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [CAMPAIGN_KEYS.all],
        exact: false,
      })

      const queryKey = [
        CAMPAIGN_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousItems = queryClient.getQueryData<CampaignPaginator>(queryKey)

      // Optimistically remove multiple items from the list
      queryClient.setQueryData<CampaignPaginator>(queryKey, (old) => {
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
          CAMPAIGN_KEYS.all,
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
        queryKey: [CAMPAIGN_KEYS.all],
        exact: false,
      })
    },
  })
}
