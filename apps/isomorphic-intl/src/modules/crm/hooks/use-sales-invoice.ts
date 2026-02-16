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
import { salesInvoice } from "@/modules/crm/service/sales-invoice.service"
import {
  DEFAULT_QUERY_OPTIONS,
  createQueryKeys,
} from "@/server/service/query-config"

import {
  SalesInvoiceList,
  SalesInvoicePaginator,
  SalesInvoiceQueryOptions,
} from "../types/sales-invoice"
import { AxiosError } from "axios"

export const SALES_ORDER_KEYS = createQueryKeys("SalesInvoice")

export function useSalesInvoiceList(
  options?: Partial<SalesInvoiceQueryOptions>
) {
  const queryKey = [SALES_ORDER_KEYS.all, options]

  return useQuery<SalesInvoicePaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return salesInvoice.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    throwOnError: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

export function useSalesInvoiceById(id: any) {
  return useQuery({
    queryKey: [SALES_ORDER_KEYS.detail(id)],
    queryFn: () => salesInvoice.get(id),
    enabled: !!id,
    throwOnError: false,
    ...DEFAULT_QUERY_OPTIONS,
  })
}

export function useCreateSalesInvoice() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: any): Promise<any> => salesInvoice.create(data),
    onMutate: async (newSalesInvoice) => {
      await queryClient.cancelQueries({
        queryKey: [SALES_ORDER_KEYS.all],
        exact: false,
      })

      const queryKey = [
        SALES_ORDER_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousCountries =
        queryClient.getQueryData<SalesInvoicePaginator>(queryKey)

      queryClient.setQueryData<SalesInvoicePaginator>(queryKey, (old: any) => {
        if (!old)
          return {
            data: [newSalesInvoice],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [...old.data, { ...newSalesInvoice, id: Date.now() }],
          count: old.count + 1,
        }
      })

      return { previousCountries }
    },
    onSuccess: () => {
      router.push(routes.crm.salesInvoice)
      toast.success(t("form-sales-invoice-created-successfully"))
    },
    onError: (err, newSalesInvoice, context) => {
      toast.error(t("form-failed-to-create-sales-invoice"))
      if (context?.previousCountries) {
        const queryKey = [
          SALES_ORDER_KEYS.all,
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
        queryKey: [SALES_ORDER_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateSalesInvoice() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: ({ id, data }: { id: any; data: any }) =>
      salesInvoice.update(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({
        queryKey: [SALES_ORDER_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: SALES_ORDER_KEYS.detail(id),
      })

      const queryKey = [
        SALES_ORDER_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousCountries =
        queryClient.getQueryData<SalesInvoicePaginator>(queryKey)
      const previousSalesInvoice = queryClient.getQueryData<SalesInvoiceList>(
        SALES_ORDER_KEYS.detail(id)
      )

      queryClient.setQueryData<SalesInvoicePaginator>(queryKey, (old: any) => {
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

      queryClient.setQueryData(SALES_ORDER_KEYS.detail(id), data)

      return { previousCountries, previousSalesInvoice }
    },
    onSuccess: () => {
      router.push(routes.crm.salesInvoice)
      toast.success(t("form-sales-invoice-updated-successfully"))
    },
    onError: (err, variables, context) => {
      toast.error(t("form-failed-to-update-sales-invoice"))
      if (context?.previousCountries) {
        const queryKey = [
          SALES_ORDER_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousCountries)
      }
      if (context?.previousSalesInvoice) {
        queryClient.setQueryData(
          SALES_ORDER_KEYS.detail(variables.id),
          context.previousSalesInvoice
        )
      }
    },
    onSettled: (data: any) => {
      queryClient.invalidateQueries({
        queryKey: [SALES_ORDER_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: SALES_ORDER_KEYS.detail(data.id),
        })
      }
    },
  })
}

export function useSalesInvoiceStatusUpdate() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: { id: string; status: string }) =>
      salesInvoice.updateStatus(data),
    onSuccess: () => {},
    onError: (err: AxiosError) => {},
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [SALES_ORDER_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useDeleteSalesInvoice() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: any) => salesInvoice.delete(id),
    onMutate: async (id) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [SALES_ORDER_KEYS.all],
        exact: false,
      })

      const queryKey = [
        SALES_ORDER_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousCountries =
        queryClient.getQueryData<SalesInvoicePaginator>(queryKey)

      // Optimistically remove the COA from the list
      queryClient.setQueryData<SalesInvoicePaginator>(queryKey, (old) => {
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
      toast.success(t("form-sales-invoice-deleted-successfully"))
    },

    onError: (err:any, variables, context) => {
      if(err?.response?.data?.details){
        toast.error(err?.response?.data?.details)
      }else{
        toast.error(t("form-failed-to-delete-sales-invoice"))
      }
      if (context?.previousCountries) {
        const queryKey = [
          SALES_ORDER_KEYS.all,
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
        queryKey: [SALES_ORDER_KEYS.all],
        exact: false,
      })
    },
  })
}
