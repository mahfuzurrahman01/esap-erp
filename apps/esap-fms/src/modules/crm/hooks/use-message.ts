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
  DEFAULT_QUERY_OPTIONS,
  createQueryKeys,
} from "@/server/service/query-config"

import { message } from "../service/message.service"
import {
  MessageList,
  MessagePaginator,
  MessageQueryOptions,
} from "../types/message"

export const MESSAGE_KEYS = createQueryKeys("Message")
export const MESSAGE_DETAIL_KEYS = createQueryKeys("MessageDetail")

export function useMessageList(options?: Partial<MessageQueryOptions>) {
  const queryKey = [MESSAGE_KEYS.all, options]

  return useQuery<MessagePaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return message.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    throwOnError: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

export function useMessageDetailsList(options?: Partial<MessageQueryOptions>) {
  const queryKey = [MESSAGE_DETAIL_KEYS.all, options]

  return useQuery<MessagePaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return message.detail(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    throwOnError: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

export function useMessageById(id: any) {
  return useQuery({
    queryKey: [MESSAGE_KEYS.detail(id)],
    queryFn: () => message.get(id),
    enabled: !!id,
    ...DEFAULT_QUERY_OPTIONS,
  })
}

export function useCreateMessageDetails() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: any): Promise<any> => message.createDetails(data),
    onMutate: async (newMessage) => {
      await queryClient.cancelQueries({
        queryKey: [MESSAGE_KEYS.all],
        exact: false,
      })

      const queryKey = [
        MESSAGE_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousCountries =
        queryClient.getQueryData<MessagePaginator>(queryKey)

      queryClient.setQueryData<MessagePaginator>(queryKey, (old: any) => {
        if (!old)
          return {
            data: [newMessage],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [...old.data, { ...newMessage, id: Date.now() }],
          count: old.count + 1,
        }
      })

      return { previousCountries }
    },
    onSuccess: () => {
      // router.push(routes.crm.messages)
      // toast.success(t("form-Message-created-successfully"))
    },
    onError: (err, newMessage, context) => {
      toast.error(t("form-failed-to-create-Message"))
      if (context?.previousCountries) {
        const queryKey = [
          MESSAGE_KEYS.all,
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
        queryKey: [MESSAGE_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useCreateMessage() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: any): Promise<any> => message.create(data),
    onMutate: async (newMessage) => {
      await queryClient.cancelQueries({
        queryKey: [MESSAGE_KEYS.all],
        exact: false,
      })

      const queryKey = [
        MESSAGE_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousCountries =
        queryClient.getQueryData<MessagePaginator>(queryKey)

      queryClient.setQueryData<MessagePaginator>(queryKey, (old: any) => {
        if (!old)
          return {
            data: [newMessage],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [...old.data, { ...newMessage, id: Date.now() }],
          count: old.count + 1,
        }
      })

      return { previousCountries }
    },
    onSuccess: () => {
      // router.push(routes.crm.messages)
      // toast.success(t("form-Message-created-successfully"))
    },
    onError: (err, newMessage, context) => {
      toast.error(t("form-failed-to-create-message"))
      if (context?.previousCountries) {
        const queryKey = [
          MESSAGE_KEYS.all,
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
        queryKey: [MESSAGE_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateMessage() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: ({ id, data }: { id: any; data: any }) =>
      message.update(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({
        queryKey: [MESSAGE_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: MESSAGE_KEYS.detail(id),
      })

      const queryKey = [
        MESSAGE_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousCountries =
        queryClient.getQueryData<MessagePaginator>(queryKey)
      const previousMessage = queryClient.getQueryData<MessageList>(
        MESSAGE_KEYS.detail(id)
      )

      queryClient.setQueryData<MessagePaginator>(queryKey, (old: any) => {
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

      queryClient.setQueryData(MESSAGE_KEYS.detail(id), data)

      return { previousCountries, previousMessage }
    },
    onSuccess: () => {
      router.push(routes.crm.messages)
      toast.success(t("form-message-updated-successfully"))
    },
    onError: (err, variables, context) => {
      toast.error(t("form-failed-to-update-Message"))
      if (context?.previousCountries) {
        const queryKey = [
          MESSAGE_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousCountries)
      }
      if (context?.previousMessage) {
        queryClient.setQueryData(
          MESSAGE_KEYS.detail(variables.id),
          context.previousMessage
        )
      }
    },
    onSettled: (data: any) => {
      queryClient.invalidateQueries({
        queryKey: [MESSAGE_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: MESSAGE_KEYS.detail(data.id),
        })
      }
    },
  })
}

export function useBlockMessage() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: ({ id, data }: { id: any; data: any }) =>
      message.updateBlock(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({
        queryKey: [MESSAGE_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: MESSAGE_KEYS.detail(id),
      })

      const queryKey = [
        MESSAGE_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousCountries =
        queryClient.getQueryData<MessagePaginator>(queryKey)
      const previousMessage = queryClient.getQueryData<MessageList>(
        MESSAGE_KEYS.detail(id)
      )

      queryClient.setQueryData<MessagePaginator>(queryKey, (old: any) => {
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

      queryClient.setQueryData(MESSAGE_KEYS.detail(id), data)

      return { previousCountries, previousMessage }
    },
    onSuccess: () => {
      router.push(routes.crm.messages)
      toast.success(t("form-block-status-updated-successfully"))
    },
    onError: (err, variables, context) => {
      toast.error(t("form-failed-to-update-block-status"))
      if (context?.previousCountries) {
        const queryKey = [
          MESSAGE_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousCountries)
      }
      if (context?.previousMessage) {
        queryClient.setQueryData(
          MESSAGE_KEYS.detail(variables.id),
          context.previousMessage
        )
      }
    },
    onSettled: (data: any) => {
      queryClient.invalidateQueries({
        queryKey: [MESSAGE_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: MESSAGE_KEYS.detail(data.id),
        })
      }
    },
  })
}

export function useDeleteMessage() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: any) => message.delete(id),
    onMutate: async (id) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [MESSAGE_KEYS.all],
        exact: false,
      })

      const queryKey = [
        MESSAGE_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousCountries =
        queryClient.getQueryData<MessagePaginator>(queryKey)

      // Optimistically remove the COA from the list
      queryClient.setQueryData<MessagePaginator>(queryKey, (old) => {
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
      toast.success(t("form-message-deleted-successfully"))
    },

    onError: (err:any, variables, context) => {
      if(err.response.data.details){
        toast.error(err.response.data.details)
      }else{
        toast.error(t("form-failed-to-delete-message"))
      }
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousCountries) {
        const queryKey = [
          MESSAGE_KEYS.all,
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
        queryKey: [MESSAGE_KEYS.all],
        exact: false,
      })
    },
  })
}
