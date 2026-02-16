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
import { attribute } from "@/modules/crm/service/attribute.service"
import {
  AttributeList,
  AttributePaginator,
  AttributeQueryOptions,
} from "@/modules/crm/types/attribute"
import {
  DEFAULT_QUERY_OPTIONS,
  createQueryKeys,
} from "@/server/service/query-config"

export const ATTRIBUTE_KEYS = createQueryKeys("attribute")

export function useAttributeList(options?: Partial<AttributeQueryOptions>) {
  const queryKey = [ATTRIBUTE_KEYS.all, options]

  return useQuery<AttributePaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return attribute.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    throwOnError: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

export function useAttributeById(id: any) {
  return useQuery({
    queryKey: [ATTRIBUTE_KEYS.detail(id)],
    queryFn: () => attribute.get(id),
    enabled: !!id,
    ...DEFAULT_QUERY_OPTIONS,
  })
}

export function useCreateAttribute() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: any): Promise<any> => attribute.create(data),
    onMutate: async (newattribute) => {
      await queryClient.cancelQueries({
        queryKey: [ATTRIBUTE_KEYS.all],
        exact: false,
      })

      const queryKey = [
        ATTRIBUTE_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousCountries =
        queryClient.getQueryData<AttributePaginator>(queryKey)

      queryClient.setQueryData<AttributePaginator>(queryKey, (old: any) => {
        if (!old)
          return {
            data: [newattribute],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [...old.data, { ...newattribute, id: Date.now() }],
          count: old.count + 1,
        }
      })

      return { previousCountries }
    },
    onSuccess: () => {
      toast.success(t("form-attribute-created-successfully"))
      router.refresh()
    },
    onError: (err, newattribute, context) => {
      if (context?.previousCountries) {
        const queryKey = [
          ATTRIBUTE_KEYS.all,
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
        queryKey: [ATTRIBUTE_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateAttribute() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: ({ id, data }: { id: any; data: any }) =>
      attribute.update(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({
        queryKey: [ATTRIBUTE_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: ATTRIBUTE_KEYS.detail(id),
      })

      const queryKey = [
        ATTRIBUTE_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousCountries =
        queryClient.getQueryData<AttributePaginator>(queryKey)
      const previousattribute = queryClient.getQueryData<AttributeList>(
        ATTRIBUTE_KEYS.detail(id)
      )

      queryClient.setQueryData<AttributePaginator>(queryKey, (old: any) => {
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

      queryClient.setQueryData(ATTRIBUTE_KEYS.detail(id), data)

      return { previousCountries, previousattribute }
    },
    onSuccess: () => {
      toast.success(t("form-attribute-updated-successfully"))
      router.refresh()
    },
    onError: (err, variables, context) => {
      toast.error(t("form-failed-to-update-attribute"))
      if (context?.previousCountries) {
        const queryKey = [
          ATTRIBUTE_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousCountries)
      }
      if (context?.previousattribute) {
        queryClient.setQueryData(
          ATTRIBUTE_KEYS.detail(variables.id),
          context.previousattribute
        )
      }
    },
    onSettled: (data: any) => {
      queryClient.invalidateQueries({
        queryKey: [ATTRIBUTE_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: ATTRIBUTE_KEYS.detail(data.id),
        })
      }
    },
  })
}

export function useDeleteAttribute() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: any) => attribute.delete(id),
    onMutate: async (id) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [ATTRIBUTE_KEYS.all],
        exact: false,
      })

      const queryKey = [
        ATTRIBUTE_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousCountries =
        queryClient.getQueryData<AttributePaginator>(queryKey)

      // Optimistically remove the COA from the list
      queryClient.setQueryData<AttributePaginator>(queryKey, (old) => {
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
      toast.success(t("form-attribute-deleted-successfully"))
    },

    onError: (err:any, variables, context) => {
      // console.log('err',err)
      if(err.response.data.details){
        toast.error(err.response.data.details)
      }else{
        toast.error(t("form-failed-to-delete-attribute"))
      }
      if (context?.previousCountries) {
        const queryKey = [
          ATTRIBUTE_KEYS.all,
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
        queryKey: [ATTRIBUTE_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeleteAttribute() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    // Change mutationFn to accept an array of IDs
    mutationFn: (ids: number[]) => attribute.bulkDelete(ids),
    onMutate: async (ids) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [ATTRIBUTE_KEYS.all],
        exact: false,
      })

      const queryKey = [
        ATTRIBUTE_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousItems = queryClient.getQueryData<AttributePaginator>(queryKey)

      // Optimistically remove multiple items from the list
      queryClient.setQueryData<AttributePaginator>(queryKey, (old) => {
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
          ATTRIBUTE_KEYS.all,
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
        queryKey: [ATTRIBUTE_KEYS.all],
        exact: false,
      })
    },
  })
}
