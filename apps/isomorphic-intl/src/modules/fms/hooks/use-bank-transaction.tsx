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
import {
  BankTransactionList,
  BankTransactionPaginator,
  BankTransactionQueryOptions,
} from "@/modules/fms/types/bank-transaction"
import { createQueryKeys } from "@/server/service/query-config"

import { BankTransactionService } from "../service/bank-transaction.service"

const BANK_TRANSACTION_KEYS = createQueryKeys("bankTransaction")

export function useBankTransactionList(
  options?: Partial<BankTransactionQueryOptions>
) {
  const queryKey = [BANK_TRANSACTION_KEYS.all, options]

  return useQuery<BankTransactionPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return BankTransactionService.all(
        Object.assign({}, queryKey[1], pageParam)
      )
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function useBankTransactionById(id: number) {
  return useQuery<BankTransactionList, Error>({
    queryKey: BANK_TRANSACTION_KEYS.detail(id),
    queryFn: () => BankTransactionService.get(id),
    enabled: !!id,
  })
}

export function useCreateBankTransaction() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: BankTransactionList): Promise<BankTransactionList> =>
      BankTransactionService.create(data),
    onMutate: async (newBankTransaction) => {
      await queryClient.cancelQueries({
        queryKey: [BANK_TRANSACTION_KEYS.all],
        exact: false,
      })

      const queryKey = [
        BANK_TRANSACTION_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousBankTransactions =
        queryClient.getQueryData<BankTransactionPaginator>(queryKey)

      queryClient.setQueryData<BankTransactionPaginator>(queryKey, (old) => {
        if (!old)
          return {
            data: [newBankTransaction],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [...old.data, { ...newBankTransaction, id: Date.now() }],
          count: old.count + 1,
        }
      })

      return { previousBankTransactions }
    },
    onSuccess: async (response) => {
      const newTransactionId = response.id
      toast.success(
        <Text as="b">{t("form-bank-transaction-successfully-created")}</Text>
      )
      router.push(`${routes.fms.bankTransaction}`)
    },
    onError: (err, newBankTransaction, context) => {
      toast.error(
        <Text as="b">{t("form-bank-transaction-failed-to-create")}</Text>
      )
      if (context?.previousBankTransactions) {
        const queryKey = [
          BANK_TRANSACTION_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousBankTransactions)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [BANK_TRANSACTION_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateBankTransaction() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: BankTransactionList) =>
      BankTransactionService.update(data),
    onMutate: async (data) => {
      await queryClient.cancelQueries({
        queryKey: [BANK_TRANSACTION_KEYS.all],
        exact: false,
      })

      if (data.id) {
        await queryClient.cancelQueries({
          queryKey: BANK_TRANSACTION_KEYS.detail(data.id),
        })
      }

      const queryKey = [
        BANK_TRANSACTION_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousBankTransactions = queryClient.getQueryData<BankTransactionPaginator>(queryKey)

      const previousBankTransaction = data.id
        ? queryClient.getQueryData<BankTransactionList>(BANK_TRANSACTION_KEYS.detail(data.id))
        : undefined

      queryClient.setQueryData<BankTransactionPaginator>(queryKey, (old) => {
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
            item.id === data.id ? { ...item, ...data } : item
          ),
        }
      })

      // Only set query data if id exists
      if (data.id) {
        queryClient.setQueryData(BANK_TRANSACTION_KEYS.detail(data.id), data)
      }

      return { previousBankTransaction, previousBankTransactions }
    },
    onSuccess: async () => {
      toast.success(
        <Text as="b">{t("form-bank-transaction-successfully-updated")}</Text>
      )
      router.push(`${routes.fms.bankTransaction}`)
    },
    onError: (err, variables, context) => {
      if (context?.previousBankTransactions) {
        const queryKey = [
          BANK_TRANSACTION_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousBankTransactions)
      }
      if (context?.previousBankTransaction && variables.id) {
        queryClient.setQueryData(BANK_TRANSACTION_KEYS.detail(variables.id), context.previousBankTransaction)
      }
    },
    onSettled: (data) => {
      queryClient.invalidateQueries({
        queryKey: [BANK_TRANSACTION_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: BANK_TRANSACTION_KEYS.detail(data.id),
        })
      }
    },
  })
}

export function useDeleteBankTransaction() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => BankTransactionService.delete(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({
        queryKey: [BANK_TRANSACTION_KEYS.all],
        exact: false,
      })

      const queryKey = [
        BANK_TRANSACTION_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousBankTransactions =
        queryClient.getQueryData<BankTransactionPaginator>(queryKey)

      queryClient.setQueryData<BankTransactionPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => item.id !== id),
          count: old.count - 1,
        }
      })

      return { previousBankTransactions }
    },
    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-bank-transaction-successfully-deleted")}</Text>
      )
    },
    onError: (err, variables, context) => {
      if (context?.previousBankTransactions) {
        const queryKey = [
          BANK_TRANSACTION_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousBankTransactions)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [BANK_TRANSACTION_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeleteBankTransaction() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (ids: number[]) => BankTransactionService.bulk(ids),
    onMutate: async (ids) => {
      await queryClient.cancelQueries({
        queryKey: [BANK_TRANSACTION_KEYS.all],
        exact: false,
      })

      const queryKey = [
        BANK_TRANSACTION_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousBankTransactions =
        queryClient.getQueryData<BankTransactionPaginator>(queryKey)

      // Optimistically remove the bank transactions from the list
      queryClient.setQueryData<BankTransactionPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => !ids.includes(item.id as number)),
          count: old.count - ids.length,
        }
      })

      return { previousBankTransactions }
    },
    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-multiple-items-deleted-successfully")}</Text>
      )
    },
    onError: (err, variables, context) => {
      toast.error(
        <Text as="b">{t("form-bank-transactions-failed-to-delete")}</Text>
      )
      if (context?.previousBankTransactions) {
        const queryKey = [
          BANK_TRANSACTION_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousBankTransactions)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [BANK_TRANSACTION_KEYS.all],
        exact: false,
      })
    },
  })
}