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
import { customer } from "@/modules/crm/service/customer.service"
import {
  CustomerList,
  CustomerPaginator,
  CustomerQueryOptions,
} from "@/modules/crm/types/customer"
import {
  DEFAULT_QUERY_OPTIONS,
  createQueryKeys,
} from "@/server/service/query-config"

//use-customer.ts

export const CUSTOMER_KEYS = createQueryKeys("Customer")

export function useCustomerList(options?: Partial<CustomerQueryOptions>) {
  const queryKey = [CUSTOMER_KEYS.all, options]

  return useQuery<CustomerPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return customer.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    throwOnError: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

export function useCustomerById(id: any) {
  return useQuery({
    queryKey: [CUSTOMER_KEYS.detail(id)],
    queryFn: () => customer.get(id),
    enabled: !!id,
    ...DEFAULT_QUERY_OPTIONS,
    throwOnError: false,
  })
}

export function useCreateCustomer() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: any): Promise<any> => customer.create(data),
    onMutate: async (newCustomer) => {
      await queryClient.cancelQueries({
        queryKey: [CUSTOMER_KEYS.all],
        exact: false,
      })

      const queryKey = [
        CUSTOMER_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousCountries =
        queryClient.getQueryData<CustomerPaginator>(queryKey)

      queryClient.setQueryData<CustomerPaginator>(queryKey, (old: any) => {
        if (!old)
          return {
            data: [newCustomer],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [...old.data, { ...newCustomer, id: Date.now() }],
          count: old.count + 1,
        }
      })

      return { previousCountries }
    },
    onSuccess: () => {
      router.push(routes.crm.customers)
      toast.success(t("form-customer-created-successfully"))
    },
    onError: (err, newCustomer, context) => {
      toast.error(t("form-failed-to-create-customer"))
      if (context?.previousCountries) {
        const queryKey = [
          CUSTOMER_KEYS.all,
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
        queryKey: [CUSTOMER_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateCustomer() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: ({ id, data }: { id: any; data: any }) =>
      customer.update(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({
        queryKey: [CUSTOMER_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: CUSTOMER_KEYS.detail(id),
      })

      const queryKey = [
        CUSTOMER_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousCountries =
        queryClient.getQueryData<CustomerPaginator>(queryKey)
      const previousCustomer = queryClient.getQueryData<CustomerList>(
        CUSTOMER_KEYS.detail(id)
      )

      queryClient.setQueryData<CustomerPaginator>(queryKey, (old: any) => {
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

      queryClient.setQueryData(CUSTOMER_KEYS.detail(id), data)

      return { previousCountries, previousCustomer }
    },
    onSuccess: () => {
      router.push(routes.crm.customers)
      toast.success(t("form-customer-updated-successfully"))
    },
    onError: (err, variables, context) => {
      toast.error(t("form-failed-to-update-customer"))
      if (context?.previousCountries) {
        const queryKey = [
          CUSTOMER_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousCountries)
      }
      if (context?.previousCustomer) {
        queryClient.setQueryData(
          CUSTOMER_KEYS.detail(variables.id),
          context.previousCustomer
        )
      }
    },
    onSettled: (data: any) => {
      queryClient.invalidateQueries({
        queryKey: [CUSTOMER_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: CUSTOMER_KEYS.detail(data.id),
        })
      }
    },
  })
}

export function useDeleteCustomer() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: any) => customer.delete(id),
    onMutate: async (id) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [CUSTOMER_KEYS.all],
        exact: false,
      })

      const queryKey = [
        CUSTOMER_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousCountries =
        queryClient.getQueryData<CustomerPaginator>(queryKey)

      // Optimistically remove the COA from the list
      queryClient.setQueryData<CustomerPaginator>(queryKey, (old) => {
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
      toast.success(t("form-customer-deleted-successfully"))
    },

    onError: (err:any, variables, context) => {
      if(err.response.data.details){
        toast.error(err.response.data.details)
      }else{
        toast.error(t("form-failed-to-delete-customer"))
      }
      if (context?.previousCountries) {
        const queryKey = [
          CUSTOMER_KEYS.all,
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
        queryKey: [CUSTOMER_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeleteCustomer() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    // Change mutationFn to accept an array of IDs
    mutationFn: (ids: number[]) => customer.bulkDelete(ids),
    onMutate: async (ids) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [CUSTOMER_KEYS.all],
        exact: false,
      })

      const queryKey = [
        CUSTOMER_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousItems = queryClient.getQueryData<CustomerPaginator>(queryKey)

      // Optimistically remove multiple items from the list
      queryClient.setQueryData<CustomerPaginator>(queryKey, (old) => {
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
          CUSTOMER_KEYS.all,
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
        queryKey: [CUSTOMER_KEYS.all],
        exact: false,
      })
    },
  })
}
