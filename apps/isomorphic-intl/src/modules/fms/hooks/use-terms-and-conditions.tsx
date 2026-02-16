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

import { TermsAndConditionsService } from "../service/terms-and-conditions.service"
import {
  TermsAndConditionsList,
  TermsAndConditionsPaginator,
  TermsAndConditionsQueryOptions,
} from "../types"

const TERMS_AND_CONDITIONS_KEYS = createQueryKeys("termsAndConditions")

export function useTermsAndConditionsList(
  options?: Partial<TermsAndConditionsQueryOptions>
) {
  const queryKey = [TERMS_AND_CONDITIONS_KEYS.all, options]

  return useQuery<TermsAndConditionsPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return TermsAndConditionsService.all(
        Object.assign({}, queryKey[1], pageParam)
      )
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function useTermsAndConditionsById(id: number) {
  return useQuery<TermsAndConditionsList, Error>({
    queryKey: TERMS_AND_CONDITIONS_KEYS.detail(id),
    queryFn: () => TermsAndConditionsService.get(id),
    enabled: !!id,
  })
}

export function useCreateTermsAndConditions() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (
      data: TermsAndConditionsList
    ): Promise<TermsAndConditionsList> =>
      TermsAndConditionsService.create(data),
    onMutate: async (newTermsAndConditions) => {
      await queryClient.cancelQueries({
        queryKey: [TERMS_AND_CONDITIONS_KEYS.all],
        exact: false,
      })

      const queryKey = [
        TERMS_AND_CONDITIONS_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousTermsAndConditions =
        queryClient.getQueryData<TermsAndConditionsPaginator>(queryKey)

      queryClient.setQueryData<TermsAndConditionsPaginator>(queryKey, (old) => {
        if (!old)
          return {
            data: [newTermsAndConditions],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [...old.data, { ...newTermsAndConditions, id: Date.now() }],
          count: old.count + 1,
        }
      })

      return { previousTermsAndConditions }
    },
    onSuccess: async () => {
      toast.success(
        <Text as="b">
          {t("form-terms-and-conditions-successfully-created")}
        </Text>
      )
      router.push(routes.fms.termsAndConditions)
    },
    onError: (err, newTermsAndConditions, context) => {
      toast.error(
        <Text as="b">{t("form-terms-and-conditions-failed-to-create")}</Text>
      )
      if (context?.previousTermsAndConditions) {
        const queryKey = [
          TERMS_AND_CONDITIONS_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousTermsAndConditions)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [TERMS_AND_CONDITIONS_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateTermsAndConditions() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: TermsAndConditionsList }) =>
      TermsAndConditionsService.update(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({
        queryKey: [TERMS_AND_CONDITIONS_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: TERMS_AND_CONDITIONS_KEYS.detail(id),
      })

      const queryKey = [
        TERMS_AND_CONDITIONS_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousTermsAndConditions =
        queryClient.getQueryData<TermsAndConditionsPaginator>(queryKey)
      const previousTermsAndCondition =
        queryClient.getQueryData<TermsAndConditionsList>(
          TERMS_AND_CONDITIONS_KEYS.detail(id)
        )

      queryClient.setQueryData<TermsAndConditionsPaginator>(queryKey, (old) => {
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

      queryClient.setQueryData(TERMS_AND_CONDITIONS_KEYS.detail(id), data)

      return { previousTermsAndConditions, previousTermsAndCondition }
    },
    onSuccess: async () => {
      toast.success(
        <Text as="b">
          {t("form-terms-and-conditions-successfully-updated")}
        </Text>
      )
      router.push(routes.fms.termsAndConditions)
    },
    onError: (err, variables, context) => {
      toast.error(
        <Text as="b">{t("form-terms-and-conditions-failed-to-update")}</Text>
      )
      if (context?.previousTermsAndConditions) {
        const queryKey = [
          TERMS_AND_CONDITIONS_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousTermsAndConditions)
      }
      if (context?.previousTermsAndCondition) {
        queryClient.setQueryData(
          TERMS_AND_CONDITIONS_KEYS.detail(variables.id),
          context.previousTermsAndCondition
        )
      }
    },
    onSettled: (data) => {
      queryClient.invalidateQueries({
        queryKey: [TERMS_AND_CONDITIONS_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: TERMS_AND_CONDITIONS_KEYS.detail(data.id),
        })
      }
    },
  })
}

export function useDeleteTermsAndConditions() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => TermsAndConditionsService.delete(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({
        queryKey: [TERMS_AND_CONDITIONS_KEYS.all],
        exact: false,
      })

      const queryKey = [
        TERMS_AND_CONDITIONS_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousTermsAndConditions =
        queryClient.getQueryData<TermsAndConditionsPaginator>(queryKey)

      queryClient.setQueryData<TermsAndConditionsPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => item.id !== id),
          count: old.count - 1,
        }
      })

      return { previousTermsAndConditions }
    },
    onSuccess: () => {
      toast.success(
        <Text as="b">
          {t("form-terms-and-conditions-successfully-deleted")}
        </Text>
      )
    },
    onError: (err, variables, context) => {
      if (context?.previousTermsAndConditions) {
        const queryKey = [
          TERMS_AND_CONDITIONS_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousTermsAndConditions)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [TERMS_AND_CONDITIONS_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeleteTermsAndConditions() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (ids: number[]) => TermsAndConditionsService.bulk(ids),
    onMutate: async (ids) => {
      await queryClient.cancelQueries({
        queryKey: [TERMS_AND_CONDITIONS_KEYS.all],
        exact: false,
      })

      const queryKey = [
        TERMS_AND_CONDITIONS_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousTermsAndConditions =
        queryClient.getQueryData<TermsAndConditionsPaginator>(queryKey)

      queryClient.setQueryData<TermsAndConditionsPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => !ids.includes(item.id as number)),
          count: old.count - ids.length,
        }
      })

      return { previousTermsAndConditions }
    },
    onSuccess: () => {
      toast.success(
        <Text as="b">
          {t("form-terms-and-conditions-deleted-successfully")}
        </Text>
      )
    },
    onError: (err, variables, context) => {
      toast.error(
        <Text as="b">{t("form-terms-and-conditions-failed-to-delete")}</Text>
      )
      if (context?.previousTermsAndConditions) {
        const queryKey = [
          TERMS_AND_CONDITIONS_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousTermsAndConditions)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [TERMS_AND_CONDITIONS_KEYS.all],
        exact: false,
      })
    },
  })
}
