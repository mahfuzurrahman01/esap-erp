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
import { createQueryKeys } from "@/server/service/query-config"

import { AccountTypeList, AccountTypePaginator, AccountTypeQueryOptions } from "../types/accounting-types"
import { AccountingTypesService } from "../service/accounting-types.service"

const ACCOUNT_TYPE_KEYS = createQueryKeys("account-type")

export function useAccountingTypesList(
  options?: Partial<AccountTypeQueryOptions>
) {
  const queryKey = [ACCOUNT_TYPE_KEYS.all, options]

  return useQuery<AccountTypePaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return AccountingTypesService.all(
        Object.assign({}, queryKey[1], pageParam)
      )
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

export function useAccountingTypeById(id: number) {
  return useQuery<AccountTypeList, Error>({
    queryKey: ACCOUNT_TYPE_KEYS.detail(id),
    queryFn: () => AccountingTypesService.get(id),
    enabled: !!id,
  })
}

export function useCreateAccountingType() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: AccountTypeList): Promise<AccountTypeList> =>
      AccountingTypesService.create(data),
    onMutate: async (newAccountType) => {
      await queryClient.cancelQueries({
        queryKey: [ACCOUNT_TYPE_KEYS.all],
        exact: false,
      })

      const queryKey = [
        ACCOUNT_TYPE_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousAccountTypes =
        queryClient.getQueryData<AccountTypePaginator>(queryKey)

      queryClient.setQueryData<AccountTypePaginator>(queryKey, (old) => {
        if (!old)
          return {
            data: [newAccountType],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [...old.data, { ...newAccountType, id: Date.now() }],
          count: old.count + 1,
        }
      })

      return { previousAccountTypes }
    },
    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-account-type-successfully-created")}</Text>
      )
    },
    onError: (err, newAccountType, context) => {
      if (context?.previousAccountTypes) {
        const queryKey = [
          ACCOUNT_TYPE_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousAccountTypes)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [ACCOUNT_TYPE_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateAccountType() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: AccountTypeList }) =>
      AccountingTypesService.update(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({
        queryKey: [ACCOUNT_TYPE_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: ACCOUNT_TYPE_KEYS.detail(id),
      })

      const queryKey = [
        ACCOUNT_TYPE_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousAccountTypes =
        queryClient.getQueryData<AccountTypePaginator>(queryKey)
      const previousAccountType =
        queryClient.getQueryData<AccountTypeList>(
          ACCOUNT_TYPE_KEYS.detail(id)
        )

      queryClient.setQueryData<AccountTypePaginator>(queryKey, (old) => {
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

      queryClient.setQueryData(ACCOUNT_TYPE_KEYS.detail(id), data)

      return { previousAccountTypes, previousAccountType }
    },
    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-account-type-successfully-updated")}</Text>
      )
    },
    onError: (err, variables, context) => {
      if (context?.previousAccountTypes) {
        const queryKey = [
          ACCOUNT_TYPE_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousAccountTypes)
      }
      if (context?.previousAccountType) {
        queryClient.setQueryData(
          ACCOUNT_TYPE_KEYS.detail(variables.id),
          context.previousAccountType
        )
      }
    },
    onSettled: (data) => {
      queryClient.invalidateQueries({
        queryKey: [ACCOUNT_TYPE_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: ACCOUNT_TYPE_KEYS.detail(data.id),
        })
      }
    },
  })
}

export function useDeleteAccountType() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => AccountingTypesService.delete(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({
        queryKey: [ACCOUNT_TYPE_KEYS.all],
        exact: false,
      })

      const queryKey = [
        ACCOUNT_TYPE_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousAccountTypes =
        queryClient.getQueryData<AccountTypePaginator>(queryKey)

      queryClient.setQueryData<AccountTypePaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => item.id !== id),
          count: old.count - 1,
        }
      })

      return { previousAccountTypes }
    },

    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-account-type-successfully-deleted")}</Text>
      )
    },

    onError: (err, variables, context) => {
      // @ts-ignore
      const errorMessage = err?.response?.data?.message;
      if (errorMessage?.includes('referenced')) {
        toast.error(
          <Text as="b">
            {t("form-account-type-cannot-delete-referenced")}
          </Text>
        );
      } else {
        toast.error(
          <Text as="b">
            {t("form-account-type-failed-to-delete")}
          </Text>
        );
      }
      if (context?.previousAccountTypes) {
        const queryKey = [
          ACCOUNT_TYPE_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousAccountTypes)
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [ACCOUNT_TYPE_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeleteAccountType() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (ids: number[]) => AccountingTypesService.bulk(ids),
    onMutate: async (ids) => {
      await queryClient.cancelQueries({
        queryKey: [ACCOUNT_TYPE_KEYS.all],
        exact: false,
      })

      const queryKey = [
        ACCOUNT_TYPE_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousAccountTypes =
        queryClient.getQueryData<AccountTypePaginator>(queryKey)
      queryClient.setQueryData<AccountTypePaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => !ids.includes(item.id as number)),
          count: old.count - ids.length,
        }
      })

      return { previousAccountTypes }
    },
    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-account-type-deleted-successfully")}</Text>
      )
    },
    onError: (err, variables, context) => {
      // @ts-ignore
      const errorMessage = err?.response?.data?.message;
      if (errorMessage?.includes('REFERENCE constraint')) {
        toast.error(
          <Text as="b">
            {t("form-account-type-cannot-delete-referenced")}
          </Text>
        );
      } else {
        toast.error(
          <Text as="b">
            {t("form-account-type-failed-to-delete")}
          </Text>
        );
      }
      if (context?.previousAccountTypes) {
        const queryKey = [
          ACCOUNT_TYPE_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousAccountTypes)
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [ACCOUNT_TYPE_KEYS.all],
        exact: false,
      })
    },
  })
}
