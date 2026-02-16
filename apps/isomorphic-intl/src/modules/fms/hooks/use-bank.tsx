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
import { BankList, BankPaginator, BankQueryOptions } from "@/modules/fms/types"
import { createQueryKeys } from "@/server/service/query-config"

import { BankService } from "../service/bank.service"

const BANK_KEYS = createQueryKeys("bank")

export function useBankList(options?: Partial<BankQueryOptions>) {
  const queryKey = [BANK_KEYS.all, options]

  return useQuery<BankPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return BankService.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

export function useBankById(id: number) {
  return useQuery<BankList, Error>({
    queryKey: BANK_KEYS.detail(id),
    queryFn: () => BankService.get(id),
    enabled: !!id,
  })
}

export function useCreateBank() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: BankList): Promise<BankList> => BankService.create(data),
    onMutate: async (newBank) => {
      await queryClient.cancelQueries({
        queryKey: [BANK_KEYS.all],
        exact: false,
      })

      const queryKey = [
        BANK_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousBanks = queryClient.getQueryData<BankPaginator>(queryKey)

      queryClient.setQueryData<BankPaginator>(queryKey, (old) => {
        if (!old)
          return {
            data: [newBank],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [...old.data, { ...newBank, id: Date.now() }],
          count: old.count + 1,
        }
      })

      return { previousBanks }
    },
    onSuccess: () => {
      toast.success(<Text as="b">{t("form-bank-successfully-created")}</Text>)
    },
    onError: (err, newBank, context) => {
      if (context?.previousBanks) {
        const queryKey = [
          BANK_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousBanks)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [BANK_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateBank() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: BankList }) =>
      BankService.update(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({
        queryKey: [BANK_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: BANK_KEYS.detail(id),
      })

      const queryKey = [
        BANK_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousBanks = queryClient.getQueryData<BankPaginator>(queryKey)
      const previousBank = queryClient.getQueryData<BankList>(
        BANK_KEYS.detail(id)
      )

      queryClient.setQueryData<BankPaginator>(queryKey, (old) => {
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

      queryClient.setQueryData(BANK_KEYS.detail(id), data)

      return { previousBanks, previousBank }
    },
    onSuccess: () => {
      toast.success(<Text as="b">{t("form-bank-successfully-updated")}</Text>)
    },
    onError: (err, variables, context) => {
      if (context?.previousBanks) {
        const queryKey = [
          BANK_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousBanks)
      }
      if (context?.previousBank) {
        queryClient.setQueryData(
          BANK_KEYS.detail(variables.id),
          context.previousBank
        )
      }
    },
    onSettled: (data) => {
      queryClient.invalidateQueries({
        queryKey: [BANK_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: BANK_KEYS.detail(data.id),
        })
      }
    },
  })
}

export function useDeleteBank() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => BankService.delete(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({
        queryKey: [BANK_KEYS.all],
        exact: false,
      })

      const queryKey = [
        BANK_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousBanks = queryClient.getQueryData<BankPaginator>(queryKey)

      queryClient.setQueryData<BankPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => item.id !== id),
          count: old.count - 1,
        }
      })

      return { previousBanks }
    },

    onSuccess: () => {
      toast.success(<Text as="b">{t("form-bank-successfully-deleted")}</Text>)
    },

    onError: (err, variables, context) => {
      // @ts-ignore
      const errorMessage = err?.response?.data?.message;
      if (errorMessage?.includes('referenced')) {
        toast.error(
          <Text as="b">
            {t("form-bank-cannot-delete-referenced")}
          </Text>
        );
      } else {
        toast.error(
          <Text as="b">
            {t("form-bank-failed-to-delete")}
          </Text>
        );
      }
      if (context?.previousBanks) {
        const queryKey = [
          BANK_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousBanks)
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [BANK_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeleteBank() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (ids: number[]) => BankService.bulk(ids),
    onMutate: async (ids) => {
      await queryClient.cancelQueries({
        queryKey: [BANK_KEYS.all],
        exact: false,
      })

      const queryKey = [
        BANK_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousBanks =
        queryClient.getQueryData<BankPaginator>(queryKey)
      queryClient.setQueryData<BankPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => !ids.includes(item.id as number)),
          count: old.count - ids.length,
        }
      })

      return { previousBanks }
    },
    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-bank-deleted-successfully")}</Text>
      )
    },
    onError: (err, variables, context) => {
      // @ts-ignore
      const errorMessage = err?.response?.data?.message;
      if (errorMessage?.includes('REFERENCE constraint')) {
        toast.error(
          <Text as="b">
            {t("form-bank-cannot-delete-referenced")}
          </Text>
        );
      } else {
        toast.error(
          <Text as="b">
            {t("form-bank-failed-to-delete")}
          </Text>
        );
      }
      if (context?.previousBanks) {
        const queryKey = [
          BANK_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousBanks)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [BANK_KEYS.all],
        exact: false,
      })
    },
  })
}