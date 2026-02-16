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
import { bill } from "@/modules/crm/service/bill.service"
import {
  BillList,
  BillPaginator,
  BillQueryOptions,
} from "@/modules/crm/types/bill"
import {
  DEFAULT_QUERY_OPTIONS,
  createQueryKeys,
} from "@/server/service/query-config"

//use-bill.ts

export const BILL_KEYS = createQueryKeys("Bill")

export function useBillList(options?: Partial<BillQueryOptions>) {
  const queryKey = [BILL_KEYS.all, options]

  return useQuery<BillPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return bill.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    throwOnError: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

export function useBillById(id: any) {
  return useQuery({
    queryKey: [BILL_KEYS.detail(id)],
    queryFn: () => bill.get(id),
    enabled: !!id,
    ...DEFAULT_QUERY_OPTIONS,
  })
}

export function useCreateBill() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: any): Promise<any> => bill.create(data),
    onMutate: async (newBill) => {
      await queryClient.cancelQueries({
        queryKey: [BILL_KEYS.all],
        exact: false,
      })

      const queryKey = [
        BILL_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousCountries =
        queryClient.getQueryData<BillPaginator>(queryKey)

      queryClient.setQueryData<BillPaginator>(queryKey, (old: any) => {
        if (!old)
          return {
            data: [newBill],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [...old.data, { ...newBill, id: Date.now() }],
          count: old.count + 1,
        }
      })

      return { previousCountries }
    },
    onSuccess: () => {
      router.push(routes.crm.bills)
      toast.success(t("form-bill-created-successfully"))
    },
    onError: (err, newBill, context) => {
      toast.error(t("form-failed-to-create-bill"))
      if (context?.previousCountries) {
        const queryKey = [
          BILL_KEYS.all,
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
        queryKey: [BILL_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateBill() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: ({ id, data }: { id: any; data: any }) => bill.update(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({
        queryKey: [BILL_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: BILL_KEYS.detail(id),
      })

      const queryKey = [
        BILL_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousCountries =
        queryClient.getQueryData<BillPaginator>(queryKey)
      const previousBill = queryClient.getQueryData<BillList>(
        BILL_KEYS.detail(id)
      )

      queryClient.setQueryData<BillPaginator>(queryKey, (old: any) => {
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

      queryClient.setQueryData(BILL_KEYS.detail(id), data)

      return { previousCountries, previousBill }
    },
    onSuccess: () => {
      router.push(routes.crm.bills)
      toast.success(t("form-bill-updated-successfully"))
    },
    onError: (err, variables, context) => {
      toast.error("Failed to update Bill!")
      toast.error(t("form-failed-to-update-bill"))
      if (context?.previousCountries) {
        const queryKey = [
          BILL_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousCountries)
      }
      if (context?.previousBill) {
        queryClient.setQueryData(
          BILL_KEYS.detail(variables.id),
          context.previousBill
        )
      }
    },
    onSettled: (data: any) => {
      queryClient.invalidateQueries({
        queryKey: [BILL_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: BILL_KEYS.detail(data.id),
        })
      }
    },
  })
}

export function useDeleteBill() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: any) => bill.delete(id),
    onMutate: async (id) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [BILL_KEYS.all],
        exact: false,
      })

      const queryKey = [
        BILL_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousCountries =
        queryClient.getQueryData<BillPaginator>(queryKey)

      // Optimistically remove the COA from the list
      queryClient.setQueryData<BillPaginator>(queryKey, (old) => {
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
      toast.success(t("form-bill-deleted-successfully"))
    },

    onError: (err, variables, context) => {
      toast.error(t("form-failed-to-delete-bill"))
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousCountries) {
        const queryKey = [
          BILL_KEYS.all,
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
        queryKey: [BILL_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeleteBill() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    // Change mutationFn to accept an array of IDs
    mutationFn: (ids: number[]) => bill.bulkDelete(ids),
    onMutate: async (ids) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [BILL_KEYS.all],
        exact: false,
      })

      const queryKey = [
        BILL_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousItems = queryClient.getQueryData<BillPaginator>(queryKey)

      // Optimistically remove multiple items from the list
      queryClient.setQueryData<BillPaginator>(queryKey, (old) => {
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
          BILL_KEYS.all,
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
        queryKey: [BILL_KEYS.all],
        exact: false,
      })
    },
  })
}
