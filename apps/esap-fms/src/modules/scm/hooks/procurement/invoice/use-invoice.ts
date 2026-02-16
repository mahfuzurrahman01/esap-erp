"use client"

import { useRouter } from "next/navigation"
import { useCallback } from "react"

import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useTranslations } from "next-intl"
import toast from "react-hot-toast"

import { DEFAULT_PAGE_SIZE } from "@/config/constants"
import { DEFAULT_PAGE_INDEX } from "@/config/constants"
import { routes } from "@/config/routes"
import { InvoiceService } from "@/modules/scm/service/procurement/invoice/invoice.service"
import {
  Invoice,
  InvoiceInput,
  InvoicePaginator,
  InvoiceQueryOptions,
  InvoiceUpdate,
} from "@/modules/scm/types/procurement/invoice/invoice-types"
import {
  DEFAULT_QUERY_OPTIONS,
  createQueryKeys,
} from "@/server/service/query-config"

const INVOICE_KEYS = createQueryKeys("invoice")

export function useInvoiceList(options?: Partial<InvoiceQueryOptions>) {
  const queryKey = [INVOICE_KEYS.all, options]

  return useQuery<InvoicePaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return InvoiceService.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

// export function useInvoiceById(id: number) {
//   return useQuery({
//     queryKey: [INVOICE_KEYS.detail(id)],
//     queryFn: () => InvoiceService.get(id),
//     enabled: !!id,
//     ...DEFAULT_QUERY_OPTIONS,
//   })
// }

export function useInvoiceById(id: number) {
  return useQuery<Invoice>({
    queryKey: [INVOICE_KEYS.detail(id)],
    queryFn: () => InvoiceService.get(id),
    enabled: !!id,
  })
}

export function useCreateInvoice() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")
  return useMutation({
    mutationFn: (data: InvoiceInput): Promise<InvoiceInput> =>
      InvoiceService.create(data),
    onMutate: async (newInvoice) => {
      await queryClient.cancelQueries({
        queryKey: [INVOICE_KEYS.all],
        exact: false,
      })
      const queryKey = [
        INVOICE_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]
      const previousInvoice =
        queryClient.getQueryData<InvoicePaginator>(queryKey)
      queryClient.setQueryData<InvoicePaginator>(queryKey, (old) => {
        if (!old)
          return {
            data: [{ ...newInvoice, id: Date.now() } as unknown as Invoice],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [
            ...old.data,
            { ...newInvoice, id: Date.now() } as unknown as Invoice,
          ],
          count: old.count + 1,
        }
      })
      return { previousInvoice }
    },
    onSuccess: () => {
      toast.success(t("form-successfully-created"))
      router.push(routes.scm.procurement.invoiceBills.invoiceBills)
    },
    onError: (err: any, newInvoice, context) => {
      if (context?.previousInvoice) {
        const queryKey = [
          INVOICE_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousInvoice)
      }
      if (err.response?.status === 400) {
        toast.error(t("form-data-already-exists"))
      } else if (err.response?.status === 404) {
        toast.error(t("form-not-found"))
      } else if (err.response?.status === 403) {
        toast.error(t("form-forbidden"))
      } else if (err.response?.status === 401) {
        toast.error(t("form-unauthorized"))
      } else if (err.response?.status === 409) {
        toast.error(t("form-conflict"))
      } else if (err.response?.status === 422) {
        toast.error(t("form-validation-failed"))
      } else if (err.response?.status === 429) {
        toast.error(t("form-too-many-requests"))
      } else if (err.response?.status === 500) {
        toast.error(t("form-server-error"))
      } else if (err.response?.status === 502) {
        toast.error(t("form-bad-gateway"))
      } else if (err.response?.status === 503) {
        toast.error(t("form-service-unavailable"))
      } else if (err.response?.status === 504) {
        toast.error(t("form-gateway-timeout"))
      } else {
        toast.error(err.response?.data || t("form-unknown-error"))
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [INVOICE_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateInvoice() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")
  const router = useRouter()

  return useMutation({
    mutationFn: ({ data }: { data: InvoiceUpdate }) =>
      InvoiceService.update(data),
    onMutate: async ({ data }) => {
      await queryClient.cancelQueries({
        queryKey: [INVOICE_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: [INVOICE_KEYS.detail(data.id!)],
      })
      const queryKey = [
        INVOICE_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]
      const previousInvoice =
        queryClient.getQueryData<InvoicePaginator>(queryKey)
      const previousInvoiceDetail = queryClient.getQueryData<Invoice>(
        INVOICE_KEYS.detail(data.id!)
      )
      queryClient.setQueryData<InvoicePaginator>(queryKey, (old) => {
        if (!old)
          return {
            data: [data as unknown as Invoice],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: old.data.map((item) =>
            item.id === data.id ? { ...item, ...data } : item
          ),
        }
      })
      queryClient.setQueryData(INVOICE_KEYS.detail(data.id!), data)
      return { previousInvoice, previousInvoiceDetail }
    },
    onError: (err: any, variables, context) => {
      if (context?.previousInvoice) {
        const queryKey = [
          INVOICE_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousInvoice)
      }
      if (context?.previousInvoiceDetail) {
        queryClient.setQueryData(
          INVOICE_KEYS.detail(variables.data.id!),
          context.previousInvoiceDetail
        )
      }
      if (err.response?.status === 400) {
        toast.error(t("form-data-already-exists"))
      } else if (err.response?.status === 404) {
        toast.error(t("form-not-found"))
      } else if (err.response?.status === 403) {
        toast.error(t("form-forbidden"))
      } else if (err.response?.status === 401) {
        toast.error(t("form-unauthorized"))
      } else if (err.response?.status === 409) {
        toast.error(t("form-conflict"))
      } else if (err.response?.status === 422) {
        toast.error(t("form-validation-failed"))
      } else if (err.response?.status === 429) {
        toast.error(t("form-too-many-requests"))
      } else if (err.response?.status === 500) {
        toast.error(t("form-server-error"))
      } else if (err.response?.status === 502) {
        toast.error(t("form-bad-gateway"))
      } else if (err.response?.status === 503) {
        toast.error(t("form-service-unavailable"))
      } else if (err.response?.status === 504) {
        toast.error(t("form-gateway-timeout"))
      } else {
        toast.error(err.response?.data || t("form-unknown-error"))
      }
    },
    onSettled: (data) => {
      queryClient.invalidateQueries({
        queryKey: [INVOICE_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: INVOICE_KEYS.detail(data.id!),
        })
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: INVOICE_KEYS.all })
      queryClient.invalidateQueries({
        queryKey: INVOICE_KEYS.detail(data.id!),
      })
      toast.success(t("form-successfully-update"))
      router.push(routes.scm.procurement.invoiceBills.invoiceBills)
    },
  })
}

export function usePatchInvoiceReceived() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")
  return useMutation({
    mutationFn: (data: number) => InvoiceService.patch(data),
    // onMutate: async ({ data }) => {
    //   await queryClient.cancelQueries({
    //     queryKey: [INVOICE_KEYS.all],
    //     exact: false,
    //   })
    //   await queryClient.cancelQueries({
    //     queryKey: [INVOICE_KEYS.detail(data.id!)],
    //   })
    //   const queryKey = [
    //     INVOICE_KEYS.all,
    //     {
    //       pageIndex: DEFAULT_PAGE_INDEX,
    //       pageSize: DEFAULT_PAGE_SIZE,
    //     },
    //   ]
    //   const previousInvoice =
    //     queryClient.getQueryData<InvoicePaginator>(queryKey)
    //   const previousInvoiceDetail = queryClient.getQueryData<Invoice>(
    //     INVOICE_KEYS.detail(data.id!)
    //   )
    //   queryClient.setQueryData<InvoicePaginator>(queryKey, (old) => {
    //     if (!old)
    //       return {
    //         data: [data],
    //         count: 1,
    //         pageIndex: DEFAULT_PAGE_INDEX,
    //         pageSize: DEFAULT_PAGE_SIZE,
    //       }
    //     return {
    //       ...old,
    //       data: old.data.map((item) =>
    //         item.id === data.id ? { ...item, ...data } : item
    //       ),
    //     }
    //   })
    //   queryClient.setQueryData([INVOICE_KEYS.detail(data.id!)], data)
    //   return { previousInvoice, previousInvoiceDetail }
    // },
    onError: (err: any, variables, context) => {
      // if (context?.previousInvoice) {
      //   const queryKey = [
      //     INVOICE_KEYS.all,
      //     {
      //       pageIndex: DEFAULT_PAGE_INDEX,
      //       pageSize: DEFAULT_PAGE_SIZE,
      //     },
      //   ]
      //   queryClient.setQueryData(queryKey, context.previousInvoice)
      // }
      // if (context?.previousInvoiceDetail) {
      //   queryClient.setQueryData(
      //     [INVOICE_KEYS.detail(variables.data.id!)],
      //     context.previousInvoiceDetail
      //   )
      // }
      if (err.response?.status === 400) {
        toast.error(t("form-data-already-exists"))
      } else if (err.response?.status === 404) {
        toast.error(t("form-not-found"))
      } else if (err.response?.status === 403) {
        toast.error(t("form-forbidden"))
      } else if (err.response?.status === 401) {
        toast.error(t("form-unauthorized"))
      } else if (err.response?.status === 409) {
        toast.error(t("form-conflict"))
      } else if (err.response?.status === 422) {
        toast.error(t("form-validation-failed"))
      } else if (err.response?.status === 429) {
        toast.error(t("form-too-many-requests"))
      } else if (err.response?.status === 500) {
        toast.error(t("form-server-error"))
      } else if (err.response?.status === 502) {
        toast.error(t("form-bad-gateway"))
      } else if (err.response?.status === 503) {
        toast.error(t("form-service-unavailable"))
      } else if (err.response?.status === 504) {
        toast.error(t("form-gateway-timeout"))
      } else {
        toast.error(err.response?.data || t("form-unknown-error"))
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [INVOICE_KEYS.all],
        exact: false,
      })
    },
    onSuccess: (data) => {
      toast.success(t("form-successfully-patched"))
    },
  })
}

export function useDeleteInvoice() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => InvoiceService.delete(id),
    onMutate: async (id) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [INVOICE_KEYS.all],
        exact: false,
      })

      const queryKey = [
        INVOICE_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousInvoice =
        queryClient.getQueryData<InvoicePaginator>(queryKey)

      // Optimistically remove the invoice from the list
      queryClient.setQueryData<InvoicePaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => item.id !== id),
          count: old.count - 1,
        }
      })

      return { previousInvoice }
    },

    onSuccess: () => {
      toast.success(t("form-successfully-deleted"))
    },

    onError: (err: any, variables, context) => {
      if (context?.previousInvoice) {
        const queryKey = [
          INVOICE_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousInvoice)
      }
      toast.error(
        err.response.data.replace("Error: ", "") ||
          t("form-error-deleting-dependency")
      )
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [INVOICE_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeleteInvoice() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    // Change mutationFn to accept an array of IDs
    mutationFn: (ids: number[]) => InvoiceService.bulkDelete(ids),
    onMutate: async (ids) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [INVOICE_KEYS.all],
        exact: false,
      })

      const queryKey = [
        INVOICE_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousInvoice =
        queryClient.getQueryData<InvoicePaginator>(queryKey)

      // Optimistically remove multiple items from the list
      queryClient.setQueryData<InvoicePaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => !ids.includes(item.id!)),
          count: old.count - ids.length,
        }
      })

      return { previousInvoice }
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
      // If the mutation fails, use the context returned from onMutate to roll back
      toast.error(
        err.response.data.replace("Error: ", "") || t("form-error-bulk-delete")
      )
      if (context?.previousInvoice) {
        const queryKey = [
          INVOICE_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousInvoice)
      }
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [INVOICE_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useInvoiceOperations() {
  const queryClient = useQueryClient()

  const invalidateInvoiceQueries = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ["invoice-list"] })
  }, [queryClient])

  return {
    invalidateInvoiceQueries,
  }
}

export function useSearchInvoice(
  searchTerm: string,
  filters: Partial<InvoiceQueryOptions>
) {
  return useQuery<InvoicePaginator, AxiosError>({
    queryKey: ["invoice-search", searchTerm, filters],
    queryFn: () =>
      InvoiceService.all({
        pageIndex: filters.pageIndex ?? 1,
        pageSize: filters.pageSize ?? 10,
        search: searchTerm,
      }),
    enabled: !!searchTerm || Object.keys(filters).length > 0,
  })
}
