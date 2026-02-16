"use client"

import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import toast from "react-hot-toast"
import { Text } from "rizzui"

import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/config/constants"
import {
  BankAccountTypeList,
  BankAccountTypePaginator,
  BankAccountTypeQueryOptions,
} from "@/modules/fms/types"
import { createQueryKeys } from "@/server/service/query-config"

import { BankAccountTypeService } from "../service/bank-account-type.service"

const BANK_ACCOUNT_TYPE_KEYS = createQueryKeys("bank-account-type")

export function useBankAccountTypeList(
  options?: Partial<BankAccountTypeQueryOptions>
) {
  const queryKey = [BANK_ACCOUNT_TYPE_KEYS.all, options]

  return useQuery<BankAccountTypePaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return BankAccountTypeService.all(
        Object.assign({}, queryKey[1], pageParam)
      )
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

export function useBankAccountTypeById(id: number) {
  return useQuery<BankAccountTypeList, Error>({
    queryKey: BANK_ACCOUNT_TYPE_KEYS.detail(id),
    queryFn: () => BankAccountTypeService.get(id),
    enabled: !!id,
  })
}

export function useCreateBankAccountType() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: BankAccountTypeList): Promise<BankAccountTypeList> =>
      BankAccountTypeService.create(data),
    onMutate: async (newBankAccountType) => {
      await queryClient.cancelQueries({
        queryKey: [BANK_ACCOUNT_TYPE_KEYS.all],
        exact: false,
      })

      const queryKey = [
        BANK_ACCOUNT_TYPE_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousBankAccountTypes =
        queryClient.getQueryData<BankAccountTypePaginator>(queryKey)

      queryClient.setQueryData<BankAccountTypePaginator>(queryKey, (old) => {
        if (!old)
          return {
            data: [newBankAccountType],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [...old.data, { ...newBankAccountType, id: Date.now() }],
          count: old.count + 1,
        }
      })

      return { previousBankAccountTypes }
    },
    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-bank-account-type-successfully-created")}</Text>
      )
    },
    onError: (err, newBankAccountType, context) => {
      if (context?.previousBankAccountTypes) {
        const queryKey = [
          BANK_ACCOUNT_TYPE_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousBankAccountTypes)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [BANK_ACCOUNT_TYPE_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateBankAccountType() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: BankAccountTypeList }) =>
      BankAccountTypeService.update(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({
        queryKey: [BANK_ACCOUNT_TYPE_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: BANK_ACCOUNT_TYPE_KEYS.detail(id),
      })

      const queryKey = [
        BANK_ACCOUNT_TYPE_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousBankAccountTypes =
        queryClient.getQueryData<BankAccountTypePaginator>(queryKey)
      const previousBankAccountType =
        queryClient.getQueryData<BankAccountTypeList>(
          BANK_ACCOUNT_TYPE_KEYS.detail(id)
        )

      queryClient.setQueryData<BankAccountTypePaginator>(queryKey, (old) => {
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

      queryClient.setQueryData(BANK_ACCOUNT_TYPE_KEYS.detail(id), data)

      return { previousBankAccountTypes, previousBankAccountType }
    },
    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-bank-account-type-successfully-updated")}</Text>
      )
    },
    onError: (err, variables, context) => {
      if (context?.previousBankAccountTypes) {
        const queryKey = [
          BANK_ACCOUNT_TYPE_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousBankAccountTypes)
      }
      if (context?.previousBankAccountType) {
        queryClient.setQueryData(
          BANK_ACCOUNT_TYPE_KEYS.detail(variables.id),
          context.previousBankAccountType
        )
      }
    },
    onSettled: (data) => {
      queryClient.invalidateQueries({
        queryKey: [BANK_ACCOUNT_TYPE_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: BANK_ACCOUNT_TYPE_KEYS.detail(data.id),
        })
      }
    },
  })
}

export function useDeleteBankAccountType() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => BankAccountTypeService.delete(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({
        queryKey: [BANK_ACCOUNT_TYPE_KEYS.all],
        exact: false,
      })

      const queryKey = [
        BANK_ACCOUNT_TYPE_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousBankAccountTypes =
        queryClient.getQueryData<BankAccountTypePaginator>(queryKey)

      queryClient.setQueryData<BankAccountTypePaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => item.id !== id),
          count: old.count - 1,
        }
      })

      return { previousBankAccountTypes }
    },

    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-bank-account-type-successfully-deleted")}</Text>
      )
    },

    onError: (err, variables, context) => {
      // @ts-ignore
      const errorMessage = err?.response?.data?.message;
      if (errorMessage?.includes('referenced')) {
        toast.error(
          <Text as="b">
            {t("form-bank-account-type-cannot-delete-referenced")}
          </Text>
        );
      } else {
        toast.error(
          <Text as="b">
            {t("form-bank-account-type-failed-to-delete")}
          </Text>
        );
      }
      if (context?.previousBankAccountTypes) {
        const queryKey = [
          BANK_ACCOUNT_TYPE_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousBankAccountTypes)
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [BANK_ACCOUNT_TYPE_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeleteBankAccountType() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (ids: number[]) => BankAccountTypeService.bulk(ids),
    onMutate: async (ids) => {
      await queryClient.cancelQueries({
        queryKey: [BANK_ACCOUNT_TYPE_KEYS.all],
        exact: false,
      })

      const queryKey = [
        BANK_ACCOUNT_TYPE_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousBankAccounts =
        queryClient.getQueryData<BankAccountTypePaginator>(queryKey)
      queryClient.setQueryData<BankAccountTypePaginator>(queryKey, (old) => {
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
        <Text as="b">{t("form-bank-account-type-deleted-successfully")}</Text>
      )
    },
    onError: (err, variables, context) => {
      // @ts-ignore
      const errorMessage = err?.response?.data?.message;
      if (errorMessage?.includes('REFERENCE constraint')) {
        toast.error(
          <Text as="b">
            {t("form-bank-account-type-cannot-delete-referenced")}
          </Text>
        );
      } else {
        toast.error(
          <Text as="b">
            {t("form-bank-account-type-failed-to-delete")}
          </Text>
        );
      }
      if (context?.previousBankAccounts) {
        const queryKey = [
          BANK_ACCOUNT_TYPE_KEYS.all,
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
        queryKey: [BANK_ACCOUNT_TYPE_KEYS.all],
        exact: false,
      })
    },
  })
}
