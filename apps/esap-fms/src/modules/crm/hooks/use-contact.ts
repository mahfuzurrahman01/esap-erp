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
  ContactList,
  ContactPaginator,
  ContactQueryOptions,
} from "@/modules/crm/types/contact"
import {
  DEFAULT_QUERY_OPTIONS,
  createQueryKeys,
} from "@/server/service/query-config"

import { contact } from "../service/contact.service"

export const CONTACT_KEYS = createQueryKeys("Contact")

export function useContactList(options?: Partial<ContactQueryOptions>) {
  const queryKey = [CONTACT_KEYS.all, options]

  return useQuery<ContactPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return contact.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    throwOnError: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

export function useContactById(id: any) {
  return useQuery({
    queryKey: [CONTACT_KEYS.detail(id)],
    queryFn: () => contact.get(id),
    enabled: !!id,
    ...DEFAULT_QUERY_OPTIONS,
  })
}

export function useCreateContact() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: any): Promise<any> => contact.create(data),
    onMutate: async (newContact) => {
      await queryClient.cancelQueries({
        queryKey: [CONTACT_KEYS.all],
        exact: false,
      })

      const queryKey = [
        CONTACT_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousCountries =
        queryClient.getQueryData<ContactPaginator>(queryKey)

      queryClient.setQueryData<ContactPaginator>(queryKey, (old: any) => {
        if (!old)
          return {
            data: [newContact],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [...old.data, { ...newContact, id: Date.now() }],
          count: old.count + 1,
        }
      })

      return { previousCountries }
    },
    onSuccess: () => {
      router.push(routes.crm.contacts)
      toast.success(t("form-contact-created-successfully"))
    },
    onError: (err, newContact, context) => {
      toast.error(t("form-failed-to-create-contact"))
      if (context?.previousCountries) {
        const queryKey = [
          CONTACT_KEYS.all,
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
        queryKey: [CONTACT_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateContact() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: ({ id, data }: { id: any; data: any }) =>
      contact.update(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({
        queryKey: [CONTACT_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: CONTACT_KEYS.detail(id),
      })

      const queryKey = [
        CONTACT_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousCountries =
        queryClient.getQueryData<ContactPaginator>(queryKey)
      const previousContact = queryClient.getQueryData<ContactList>(
        CONTACT_KEYS.detail(id)
      )

      queryClient.setQueryData<ContactPaginator>(queryKey, (old: any) => {
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

      queryClient.setQueryData(CONTACT_KEYS.detail(id), data)

      return { previousCountries, previousContact }
    },
    onSuccess: () => {
      router.push(routes.crm.contacts)
      toast.success(t("form-contact-updated-successfully"))
    },
    onError: (err, variables, context) => {
      toast.error(t("form-failed-to-update-contact"))
      if (context?.previousCountries) {
        const queryKey = [
          CONTACT_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousCountries)
      }
      if (context?.previousContact) {
        queryClient.setQueryData(
          CONTACT_KEYS.detail(variables.id),
          context.previousContact
        )
      }
    },
    onSettled: (data: any) => {
      queryClient.invalidateQueries({
        queryKey: [CONTACT_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: CONTACT_KEYS.detail(data.id),
        })
      }
    },
  })
}

export function useDeleteContact() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: any) => contact.delete(id),
    onMutate: async (id) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [CONTACT_KEYS.all],
        exact: false,
      })

      const queryKey = [
        CONTACT_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousCountries =
        queryClient.getQueryData<ContactPaginator>(queryKey)

      // Optimistically remove the COA from the list
      queryClient.setQueryData<ContactPaginator>(queryKey, (old) => {
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
      toast.success(t("form-contact-deleted-successfully"))
    },

    onError: (err:any, variables, context) => {
      if(err.response.data.details){
        toast.error(err.response.data.details)
      }else{
        toast.error(t("form-failed-to-delete-contact"))
      }
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousCountries) {
        const queryKey = [
          CONTACT_KEYS.all,
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
        queryKey: [CONTACT_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeleteContact() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    // Change mutationFn to accept an array of IDs
    mutationFn: (ids: number[]) => contact.bulkDelete(ids),
    onMutate: async (ids) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [CONTACT_KEYS.all],
        exact: false,
      })

      const queryKey = [
        CONTACT_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousItems = queryClient.getQueryData<ContactPaginator>(queryKey)

      // Optimistically remove multiple items from the list
      queryClient.setQueryData<ContactPaginator>(queryKey, (old) => {
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
          CONTACT_KEYS.all,
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
        queryKey: [CONTACT_KEYS.all],
        exact: false,
      })
    },
  })
}
