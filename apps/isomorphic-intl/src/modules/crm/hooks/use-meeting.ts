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
import {
  MeetingList,
  MeetingPaginator,
  MeetingQueryOptions,
} from "@/modules/crm/types/meeting"
import {
  DEFAULT_QUERY_OPTIONS,
  createQueryKeys,
} from "@/server/service/query-config"

import { meeting } from "../service/meeting.service"

export const MEETING_KEYS = createQueryKeys("Meeting")

export function useMeetingList(options?: Partial<MeetingQueryOptions>) {
  const queryKey = [MEETING_KEYS.all, options]

  return useQuery<MeetingPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return meeting.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    throwOnError: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

export function useMeetingById(id: any) {
  return useQuery({
    queryKey: [MEETING_KEYS.detail(id)],
    queryFn: () => meeting.get(id),
    enabled: !!id,
    ...DEFAULT_QUERY_OPTIONS,
  })
}

export function useCreateMeeting() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: any): Promise<any> => meeting.create(data),
    onMutate: async (newMeeting) => {
      await queryClient.cancelQueries({
        queryKey: [MEETING_KEYS.all],
        exact: false,
      })

      const queryKey = [
        MEETING_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousCountries =
        queryClient.getQueryData<MeetingPaginator>(queryKey)

      queryClient.setQueryData<MeetingPaginator>(queryKey, (old: any) => {
        if (!old)
          return {
            data: [newMeeting],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [...old.data, { ...newMeeting, id: Date.now() }],
          count: old.count + 1,
        }
      })

      return { previousCountries }
    },
    onSuccess: () => {
      router.push(routes.crm.meetings)
      toast.success(t("form-meeting-created-successfully"))
    },
    onError: (err, newMeeting, context) => {
      toast.error(t("form-failed-to-create-meeting"))
      if (context?.previousCountries) {
        const queryKey = [
          MEETING_KEYS.all,
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
        queryKey: [MEETING_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateMeeting() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: ({ id, data }: { id: any; data: any }) =>
      meeting.update(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({
        queryKey: [MEETING_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: MEETING_KEYS.detail(id),
      })

      const queryKey = [
        MEETING_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousCountries =
        queryClient.getQueryData<MeetingPaginator>(queryKey)
      const previousMeeting = queryClient.getQueryData<MeetingList>(
        MEETING_KEYS.detail(id)
      )

      queryClient.setQueryData<MeetingPaginator>(queryKey, (old: any) => {
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

      queryClient.setQueryData(MEETING_KEYS.detail(id), data)

      return { previousCountries, previousMeeting }
    },
    onSuccess: () => {
      router.push(routes.crm.meetings)
      toast.success(t("form-meeting-updated-successfully"))
    },
    onError: (err, variables, context) => {
      toast.error(t("form-failed-to-update-meeting"))
      if (context?.previousCountries) {
        const queryKey = [
          MEETING_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousCountries)
      }
      if (context?.previousMeeting) {
        queryClient.setQueryData(
          MEETING_KEYS.detail(variables.id),
          context.previousMeeting
        )
      }
    },
    onSettled: (data: any) => {
      queryClient.invalidateQueries({
        queryKey: [MEETING_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: MEETING_KEYS.detail(data.id),
        })
      }
    },
  })
}

export function useDeleteMeeting() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: any) => meeting.delete(id),
    onMutate: async (id) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [MEETING_KEYS.all],
        exact: false,
      })

      const queryKey = [
        MEETING_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousCountries =
        queryClient.getQueryData<MeetingPaginator>(queryKey)

      // Optimistically remove the COA from the list
      queryClient.setQueryData<MeetingPaginator>(queryKey, (old) => {
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
      toast.success(t("form-meeting-deleted-successfully"))
    },

    onError: (err:any, variables, context) => {
      if(err.response.data.details){
        toast.error(err.response.data.details)
      }else{
        toast.error(t("form-failed-to-delete-meeting"))
      }
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousCountries) {
        const queryKey = [
          MEETING_KEYS.all,
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
        queryKey: [MEETING_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeleteMeeting() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    // Change mutationFn to accept an array of IDs
    mutationFn: (ids: number[]) => meeting.bulkDelete(ids),
    onMutate: async (ids) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [MEETING_KEYS.all],
        exact: false,
      })

      const queryKey = [
        MEETING_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousItems = queryClient.getQueryData<MeetingPaginator>(queryKey)

      // Optimistically remove multiple items from the list
      queryClient.setQueryData<MeetingPaginator>(queryKey, (old) => {
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
          MEETING_KEYS.all,
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
        queryKey: [MEETING_KEYS.all],
        exact: false,
      })
    },
  })
}