"use client"

import { useRouter } from "next/navigation"

import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import { toast } from "react-hot-toast"
import { Text } from "rizzui"

import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/config/constants"
import { routes } from "@/config/routes"
import { createQueryKeys } from "@/server/service/query-config"

import { ModeOfPaymentService } from "../service/mode-of-payment.service"
import {
  ModeOfPaymentList,
  ModeOfPaymentPaginator,
  ModeOfPaymentQueryOptions,
} from "../types"

const MODE_OF_PAYMENT_KEYS = createQueryKeys("mode-of-payment")

export function useModeOfPaymentList(
  options?: Partial<ModeOfPaymentQueryOptions>
) {
  const queryKey = [MODE_OF_PAYMENT_KEYS.all, options]

  return useQuery<ModeOfPaymentPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return ModeOfPaymentService.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

export function useModeOfPaymentById(id: number) {
  return useQuery<ModeOfPaymentList, Error>({
    queryKey: MODE_OF_PAYMENT_KEYS.detail(id),
    queryFn: () => ModeOfPaymentService.get(id),
    enabled: !!id,
  })
}

export function useCreateModeOfPayment() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: ModeOfPaymentList): Promise<ModeOfPaymentList> =>
      ModeOfPaymentService.create(data),
    onMutate: async (newModeOfPayment) => {
      await queryClient.cancelQueries({
        queryKey: [MODE_OF_PAYMENT_KEYS.all],
        exact: false,
      })

      const queryKey = [
        MODE_OF_PAYMENT_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousModeOfPayments =
        queryClient.getQueryData<ModeOfPaymentPaginator>(queryKey)

      queryClient.setQueryData<ModeOfPaymentPaginator>(queryKey, (old) => {
        if (!old)
          return {
            data: [newModeOfPayment],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [...old.data, { ...newModeOfPayment, id: Date.now() }],
          count: old.count + 1,
        }
      })

      return { previousModeOfPayments }
    },
    onSuccess: async () => {
      toast.success(
        <Text as="b">{t("form-mode-of-payment-successfully-created")}</Text>
      )
      router.push(routes.fms.modeOfPayment)
    },
    onError: (err, newModeOfPayment, context) => {
      toast.error(
        <Text as="b">{t("form-mode-of-payment-failed-to-create")}</Text>
      )
      if (context?.previousModeOfPayments) {
        const queryKey = [
          MODE_OF_PAYMENT_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousModeOfPayments)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [MODE_OF_PAYMENT_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateModeOfPayment() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: ({id, data }: { id: number; data: ModeOfPaymentList }) =>
      ModeOfPaymentService.update(data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({
        queryKey: [MODE_OF_PAYMENT_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: MODE_OF_PAYMENT_KEYS.detail(id),
      })

      const queryKey = [
        MODE_OF_PAYMENT_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousModeOfPayments =
        queryClient.getQueryData<ModeOfPaymentPaginator>(queryKey)
      const previousModeOfPayment = queryClient.getQueryData<ModeOfPaymentList>(
        MODE_OF_PAYMENT_KEYS.detail(id)
      )

      queryClient.setQueryData<ModeOfPaymentPaginator>(queryKey, (old) => {
        if (!old)
          return {
            data: [data],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: old.data.map((item) =>
            item.id === id ? { ...item, ...data } : item
          ),
        }
      })

      queryClient.setQueryData(MODE_OF_PAYMENT_KEYS.detail(id), data)

      return { previousModeOfPayments, previousModeOfPayment }
    },
    onSuccess: async () => {
      toast.success(
        <Text as="b">{t("form-mode-of-payment-successfully-updated")}</Text>
      )
      router.push(routes.fms.modeOfPayment)
    },
    onError: (err, variables, context) => {
      toast.error(
        <Text as="b">{t("form-mode-of-payment-failed-to-update")}</Text>
      )
      if (context?.previousModeOfPayments) {
        const queryKey = [
          MODE_OF_PAYMENT_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousModeOfPayments)
      }
      if (context?.previousModeOfPayment) {
        queryClient.setQueryData(
          MODE_OF_PAYMENT_KEYS.detail(variables.id),
          context.previousModeOfPayment
        )
      }
    },
    onSettled: (data) => {
      queryClient.invalidateQueries({
        queryKey: [MODE_OF_PAYMENT_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: MODE_OF_PAYMENT_KEYS.detail(data.id),
        })
      }
    },
  })
}

export function useDeleteModeOfPayment() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => ModeOfPaymentService.delete(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({
        queryKey: [MODE_OF_PAYMENT_KEYS.all],
        exact: false,
      })

      const queryKey = [
        MODE_OF_PAYMENT_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousModeOfPayments =
        queryClient.getQueryData<ModeOfPaymentPaginator>(queryKey)

      queryClient.setQueryData<ModeOfPaymentPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => item.id !== id),
          count: old.count - 1,
        }
      })

      return { previousModeOfPayments }
    },

    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-mode-of-payment-successfully-deleted")}</Text>
      )
    },

    onError: (err, variables, context) => {
      // @ts-ignore
      const errorMessage = err?.response?.data?.message;
      if (errorMessage?.includes('referenced')) {
        toast.error(
          <Text as="b">
            {t("form-mode-of-payment-cannot-delete-referenced")}
          </Text>
        );
      } else {
        toast.error(
          <Text as="b">
            {t("form-mode-of-payment-failed-to-delete")}
          </Text>
        );
      }
      if (context?.previousModeOfPayments) {
        const queryKey = [
          MODE_OF_PAYMENT_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousModeOfPayments)
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [MODE_OF_PAYMENT_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeleteModeOfPayment() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (ids: number[]) => ModeOfPaymentService.bulk(ids),
    onMutate: async (ids) => {
      await queryClient.cancelQueries({
        queryKey: [MODE_OF_PAYMENT_KEYS.all],
        exact: false,
      })

      const queryKey = [
        MODE_OF_PAYMENT_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousModeOfPayments =
        queryClient.getQueryData<ModeOfPaymentPaginator>(queryKey)
      queryClient.setQueryData<ModeOfPaymentPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => !ids.includes(item.id as number)),
          count: old.count - ids.length,
        }
      })

      return { previousModeOfPayments }
    },
    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-mode-of-payment-deleted-successfully")}</Text>
      )
    },
    onError: (err, variables, context) => {
      // @ts-ignore
      const errorMessage = err?.response?.data?.message;
      if (errorMessage?.includes('REFERENCE constraint')) {
        toast.error(
          <Text as="b">
            {t("form-mode-of-payment-cannot-delete-referenced")}
          </Text>
        );
      } else {
        toast.error(
          <Text as="b">
            {t("form-mode-of-payment-failed-to-delete")}
          </Text>
        );
      }
      if (context?.previousModeOfPayments) {
        const queryKey = [
          MODE_OF_PAYMENT_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousModeOfPayments)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [MODE_OF_PAYMENT_KEYS.all],
        exact: false,
      })
    },
  })
}
