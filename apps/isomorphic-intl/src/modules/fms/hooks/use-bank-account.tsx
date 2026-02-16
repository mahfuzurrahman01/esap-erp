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

import { BankAccountService } from "../service/bank-account.service"
import {
  BankAccountList,
  BankAccountPaginator,
  BankAccountQueryOptions,
} from "../types"

const BANK_ACCOUNT_KEYS = createQueryKeys("bank-account")

export function useBankAccountList(options?: Partial<BankAccountQueryOptions>) {
  const queryKey = [BANK_ACCOUNT_KEYS.all, options]

  return useQuery<BankAccountPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return BankAccountService.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function useBankAccountById(id: number) {
  return useQuery<BankAccountList, Error>({
    queryKey: BANK_ACCOUNT_KEYS.detail(id),
    queryFn: () => BankAccountService.get(id),
  })
}

export function useCreateBankAccount() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: BankAccountList): Promise<BankAccountList> =>
      BankAccountService.create(data),
    onMutate: async (newBankAccount) => {
      await queryClient.cancelQueries({
        queryKey: [BANK_ACCOUNT_KEYS.all],
        exact: false,
      })

      const queryKey = [
        BANK_ACCOUNT_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousBankAccounts =
        queryClient.getQueryData<BankAccountPaginator>(queryKey)

      queryClient.setQueryData<BankAccountPaginator>(queryKey, (old) => {
        if (!old)
          return {
            data: [newBankAccount],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [...old.data, { ...newBankAccount, id: Date.now() }],
          count: old.count + 1,
        }
      })

      return { previousBankAccounts }
    },
    onSuccess: async () => {
      toast.success(
        <Text as="b">{t("form-bank-account-successfully-created")}</Text>
      )
      router.push(routes.fms.bankAccount)
    },
    onError: (err, newBankAccount, context) => {
      toast.error(<Text as="b">{t("form-bank-account-failed-to-create")}</Text>)
      if (context?.previousBankAccounts) {
        const queryKey = [
          BANK_ACCOUNT_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousBankAccounts)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [BANK_ACCOUNT_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateBankAccount() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: BankAccountList }) =>
      BankAccountService.update(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({
        queryKey: [BANK_ACCOUNT_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: BANK_ACCOUNT_KEYS.detail(id),
      })

      const queryKey = [
        BANK_ACCOUNT_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousBankAccounts =
        queryClient.getQueryData<BankAccountPaginator>(queryKey)
      const previousBankAccount = queryClient.getQueryData<BankAccountList>(
        BANK_ACCOUNT_KEYS.detail(id)
      )

      queryClient.setQueryData<BankAccountPaginator>(queryKey, (old) => {
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

      queryClient.setQueryData(BANK_ACCOUNT_KEYS.detail(id), data)

      return { previousBankAccounts, previousBankAccount }
    },
    onSuccess: async () => {
      toast.success(
        <Text as="b">{t("form-bank-account-successfully-updated")}</Text>
      )
      router.push(routes.fms.bankAccount)
    },
    onError: (err, variables, context) => {
      toast.error(<Text as="b">{t("form-bank-account-failed-to-update")}</Text>)
      if (context?.previousBankAccounts) {
        const queryKey = [
          BANK_ACCOUNT_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousBankAccounts)
      }
      if (context?.previousBankAccount) {
        queryClient.setQueryData(
          BANK_ACCOUNT_KEYS.detail(variables.id),
          context.previousBankAccount
        )
      }
    },
    onSettled: (data) => {
      queryClient.invalidateQueries({
        queryKey: [BANK_ACCOUNT_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: BANK_ACCOUNT_KEYS.detail(data.id),
        })
      }
    },
  })
}

export function useDeleteBankAccount() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => BankAccountService.delete(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({
        queryKey: [BANK_ACCOUNT_KEYS.all],
        exact: false,
      })

      const queryKey = [
        BANK_ACCOUNT_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousBankAccounts =
        queryClient.getQueryData<BankAccountPaginator>(queryKey)

      queryClient.setQueryData<BankAccountPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => item.id !== id),
          count: old.count - 1,
        }
      })

      return { previousBankAccounts }
    },

    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-bank-account-successfully-deleted")}</Text>
      )
    },

    onError: (err, variables, context) => {
      // @ts-ignore
      const errorMessage = err?.response?.data?.message;
      if (errorMessage?.includes('referenced')) {
        toast.error(
          <Text as="b">
            {t("form-bank-account-cannot-delete-referenced")}
          </Text>
        );
      } else {
        toast.error(
          <Text as="b">
            {t("form-bank-account-failed-to-delete")}
          </Text>
        );
      }
      if (context?.previousBankAccounts) {
        const queryKey = [
          BANK_ACCOUNT_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousBankAccounts)
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [BANK_ACCOUNT_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeleteBankAccount() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (ids: number[]) => BankAccountService.bulk(ids),
    onMutate: async (ids) => {
      await queryClient.cancelQueries({
        queryKey: [BANK_ACCOUNT_KEYS.all],
        exact: false,
      })

      const queryKey = [
        BANK_ACCOUNT_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousBankAccounts =
        queryClient.getQueryData<BankAccountPaginator>(queryKey)
      queryClient.setQueryData<BankAccountPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => !ids.includes(item.id as number)),
          count: old.count - ids.length,
        }
      })

      return { previousBankAccounts }
    },
    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-bank-account-deleted-successfully")}</Text>
      )
    },
    onError: (err, variables, context) => {
      // @ts-ignore
      const errorMessage = err?.response?.data?.message;
      if (errorMessage?.includes('REFERENCE constraint')) {
        toast.error(
          <Text as="b">
            {t("form-bank-account-cannot-delete-referenced")}
          </Text>
        );
      } else {
        toast.error(
          <Text as="b">
            {t("form-bank-account-failed-to-delete")}
          </Text>
        );
      }
      if (context?.previousBankAccounts) {
        const queryKey = [
          BANK_ACCOUNT_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousBankAccounts)
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [BANK_ACCOUNT_KEYS.all],
        exact: false,
      })
    },
  })
}

