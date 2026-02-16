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
  TicketList,
  TicketPaginator,
  TicketQueryOptions,
} from "@/modules/crm/types/ticket"
import {
  DEFAULT_QUERY_OPTIONS,
  createQueryKeys,
} from "@/server/service/query-config"

import { ticket } from "../service/ticket.service"

export const TICKET_KEYS = createQueryKeys("Ticket")

export function useTicketList(options?: Partial<TicketQueryOptions>) {
  const queryKey = [TICKET_KEYS.all, options]

  return useQuery<TicketPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return ticket.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    throwOnError: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

export function useTicketById(id: any) {
  return useQuery({
    queryKey: [TICKET_KEYS.detail(id)],
    queryFn: () => ticket.get(id),
    enabled: !!id,
    ...DEFAULT_QUERY_OPTIONS,
  })
}

export function useCreateTicket() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: any): Promise<any> => ticket.create(data),
    onMutate: async (newTicket) => {
      await queryClient.cancelQueries({
        queryKey: [TICKET_KEYS.all],
        exact: false,
      })

      const queryKey = [
        TICKET_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousCountries =
        queryClient.getQueryData<TicketPaginator>(queryKey)

      queryClient.setQueryData<TicketPaginator>(queryKey, (old: any) => {
        if (!old)
          return {
            data: [newTicket],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [...old.data, { ...newTicket, id: Date.now() }],
          count: old.count + 1,
        }
      })

      return { previousCountries }
    },
    onSuccess: () => {
      router.push(routes.crm.tickets)
      toast.success(t("form-ticket-created-successfully"))
    },
    onError: (err, newTicket, context) => {
      toast.error(t("form-failed-to-create-ticket"))
      if (context?.previousCountries) {
        const queryKey = [
          TICKET_KEYS.all,
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
        queryKey: [TICKET_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateTicket() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: ({ id, data }: { id: any; data: any }) =>
      ticket.update(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({
        queryKey: [TICKET_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: TICKET_KEYS.detail(id),
      })

      const queryKey = [
        TICKET_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousCountries =
        queryClient.getQueryData<TicketPaginator>(queryKey)
      const previousTicket = queryClient.getQueryData<TicketList>(
        TICKET_KEYS.detail(id)
      )

      queryClient.setQueryData<TicketPaginator>(queryKey, (old: any) => {
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

      queryClient.setQueryData(TICKET_KEYS.detail(id), data)

      return { previousCountries, previousTicket }
    },
    onSuccess: () => {
      router.push(routes.crm.tickets)
      toast.success(t("form-ticket-updated-successfully"))
    },
    onError: (err, variables, context) => {
      toast.error(t("form-failed-to-update-ticket"))
      if (context?.previousCountries) {
        const queryKey = [
          TICKET_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousCountries)
      }
      if (context?.previousTicket) {
        queryClient.setQueryData(
          TICKET_KEYS.detail(variables.id),
          context.previousTicket
        )
      }
    },
    onSettled: (data: any) => {
      queryClient.invalidateQueries({
        queryKey: [TICKET_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: TICKET_KEYS.detail(data.id),
        })
      }
    },
  })
}

export function useDeleteTicket() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: any) => ticket.delete(id),
    onMutate: async (id) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [TICKET_KEYS.all],
        exact: false,
      })

      const queryKey = [
        TICKET_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousCountries =
        queryClient.getQueryData<TicketPaginator>(queryKey)

      // Optimistically remove the COA from the list
      queryClient.setQueryData<TicketPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => item.id !== id),
          count: old.total - 1,
        }
      })

      return { previousCountries }
    },

    onSuccess: () => {
      toast.success(t("form-ticket-deleted-successfully"))
    },

    onError: (err, variables, context) => {
      toast.error(t("form-failed-to-delete-ticket"))
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousCountries) {
        const queryKey = [
          TICKET_KEYS.all,
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
        queryKey: [TICKET_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeleteTicket() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    // Change mutationFn to accept an array of IDs
    mutationFn: (ids: number[]) => ticket.bulkDelete(ids),
    onMutate: async (ids) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [TICKET_KEYS.all],
        exact: false,
      })

      const queryKey = [
        TICKET_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousItems = queryClient.getQueryData<TicketPaginator>(queryKey)

      // Optimistically remove multiple items from the list
      queryClient.setQueryData<TicketPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => !ids.includes(item.id!)),
          count: old.total - ids.length,
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
          TICKET_KEYS.all,
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
        queryKey: [TICKET_KEYS.all],
        exact: false,
      })
    },
  })
}
