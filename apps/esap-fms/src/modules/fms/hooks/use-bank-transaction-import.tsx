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

import { BankTransactionImportService } from "../service/bank-transaction-import.service"
import {
  BankStatementImport,
  BankStatementImportPaginator,
  BankStatementImportQueryOptions,
} from "../types/bank-statement-import"

const BANK_TRANSACTION_IMPORT_KEYS = createQueryKeys("bankTransactionImport")

export function useBankTransactionImportList(
  options?: Partial<BankStatementImportQueryOptions>
) {
  const queryKey = [BANK_TRANSACTION_IMPORT_KEYS.all, options]

  return useQuery<BankStatementImportPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return BankTransactionImportService.import(
        Object.assign({}, queryKey[1], pageParam)
      )
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function useBankTransactionImportById(id: number) {
  return useQuery<BankStatementImport, Error>({
    queryKey: BANK_TRANSACTION_IMPORT_KEYS.detail(id),
    queryFn: () => BankTransactionImportService.get(id),
    enabled: !!id,
  })
}

export function useCreateBankTransactionImport() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: BankStatementImport): Promise<BankStatementImport> =>
      BankTransactionImportService.create(data),
    onMutate: async (newBankTransactionImport) => {
      await queryClient.cancelQueries({
        queryKey: [BANK_TRANSACTION_IMPORT_KEYS.all],
        exact: false,
      })

      const queryKey = [
        BANK_TRANSACTION_IMPORT_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousBankTransactions =
        queryClient.getQueryData<BankStatementImportPaginator>(queryKey)

      queryClient.setQueryData<BankStatementImportPaginator>(
        queryKey,
        (old) => {
          if (!old)
            return {
              data: [newBankTransactionImport],
              count: 1,
              pageIndex: DEFAULT_PAGE_INDEX,
              pageSize: DEFAULT_PAGE_SIZE,
            }
          return {
            ...old,
            data: [
              ...old.data,
              { ...newBankTransactionImport, id: Date.now() },
            ],
            count: old.count + 1,
          }
        }
      )

      return { previousBankTransactions }
    },
    onSuccess: async () => {
      toast.success(
        <Text as="b">
          {t("form-bank-transaction-import-successfully-created")}
        </Text>
      )
      router.push(`${routes.fms.importBankStatement}`)
    },
    onError: (err, newBankTransaction, context) => {
      toast.error(
        <Text as="b">{t("form-bank-transaction-import-failed-to-create")}</Text>
      )
      if (context?.previousBankTransactions) {
        const queryKey = [
          BANK_TRANSACTION_IMPORT_KEYS.all,
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
        queryKey: [BANK_TRANSACTION_IMPORT_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateBankStatementImport() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: BankStatementImport) =>
      BankTransactionImportService.update(data),
    onMutate: async (data) => {
      await queryClient.cancelQueries({
        queryKey: [BANK_TRANSACTION_IMPORT_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: BANK_TRANSACTION_IMPORT_KEYS.detail(data.id!),
      })

      const queryKey = [
        BANK_TRANSACTION_IMPORT_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousBankTransactionsImport =
        queryClient.getQueryData<BankStatementImportPaginator>(queryKey)
      const previousBankTransactionImport =
        queryClient.getQueryData<BankStatementImport>(
          BANK_TRANSACTION_IMPORT_KEYS.detail(data.id!)
        )

      queryClient.setQueryData<BankStatementImportPaginator>(
        queryKey,
        (old) => {
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
        }
      )

      queryClient.setQueryData(BANK_TRANSACTION_IMPORT_KEYS.detail(data.id!), data)

      return { previousBankTransactionsImport, previousBankTransactionImport }
    },
    onSuccess: async () => {
      toast.success(
        <Text as="b">{t("form-bank-transaction-successfully-updated")}</Text>
      )
      router.push(`${routes.fms.importBankStatement}`)
    },
    onError: (err, variables, context) => {
      toast.error(
        <Text as="b">{t("form-bank-transaction-failed-to-update")}</Text>
      )
      if (context?.previousBankTransactionsImport) {
        const queryKey = [
          BANK_TRANSACTION_IMPORT_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(
          queryKey,
          context.previousBankTransactionsImport
        )
      }
      if (context?.previousBankTransactionImport) {
        queryClient.setQueryData(
          BANK_TRANSACTION_IMPORT_KEYS.detail(variables.id!),
          context.previousBankTransactionImport
        )
      }
    },
    onSettled: (data) => {
      queryClient.invalidateQueries({
        queryKey: [BANK_TRANSACTION_IMPORT_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: BANK_TRANSACTION_IMPORT_KEYS.detail(data.id),
        })
      }
    },
  })
}

export function useDeleteBankStatementImport() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => BankTransactionImportService.delete(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({
        queryKey: [BANK_TRANSACTION_IMPORT_KEYS.all],
        exact: false,
      })

      const queryKey = [
        BANK_TRANSACTION_IMPORT_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousBankTransactionsImport =
        queryClient.getQueryData<BankStatementImportPaginator>(queryKey)

      queryClient.setQueryData<BankStatementImportPaginator>(
        queryKey,
        (old) => {
          if (!old) return old
          return {
            ...old,
            data: old.data.filter((item) => item.id !== id),
            count: old.count - 1,
          }
        }
      )

      return { previousBankTransactionsImport }
    },
    onSuccess: () => {
      toast.success(
        <Text as="b">
          {t("form-bank-transaction-import-successfully-deleted")}
        </Text>
      )
    },
    onError: (err, variables, context) => {
      if (context?.previousBankTransactionsImport) {
        const queryKey = [
          BANK_TRANSACTION_IMPORT_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(
          queryKey,
          context.previousBankTransactionsImport
        )
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [BANK_TRANSACTION_IMPORT_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeleteBankStatementImport() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (ids: number[]) => BankTransactionImportService.bulk(ids),
    onMutate: async (ids) => {
      await queryClient.cancelQueries({
        queryKey: [BANK_TRANSACTION_IMPORT_KEYS.all],
        exact: false,
      })

      const queryKey = [
        BANK_TRANSACTION_IMPORT_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousBankTransactionsImport =
        queryClient.getQueryData<BankStatementImportPaginator>(queryKey)
      queryClient.setQueryData<BankStatementImportPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => !ids.includes(item.id as number)),
          count: old.count - ids.length,
        }
      })

      return { previousBankTransactionsImport }
    },
    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-bank-transaction-import-deleted-successfully")}</Text>
      )
    },
    onError: (err, variables, context) => {
      toast.error(
        <Text as="b">{t("form-bank-transaction-import-failed-to-delete")}</Text>
      )
      if (context?.previousBankTransactionsImport) {
        const queryKey = [
          BANK_TRANSACTION_IMPORT_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousBankTransactionsImport)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [BANK_TRANSACTION_IMPORT_KEYS.all],
        exact: false,
      })
    },
  })
}