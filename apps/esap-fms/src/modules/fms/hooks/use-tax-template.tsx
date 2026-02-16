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

import { TaxTemplateService } from "../service/tax-template.service"
import {
  TaxTemplateList,
  TaxTemplatePaginator,
  TaxTemplateQueryOptions,
} from "../types"

const TAX_TEMPLATE_KEYS = createQueryKeys("tax-template")

export function useTaxTemplateList(options?: Partial<TaxTemplateQueryOptions>) {
  const queryKey = [TAX_TEMPLATE_KEYS.all, options]

  return useQuery<TaxTemplatePaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return TaxTemplateService.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function useTaxTemplateById(id: number) {
  return useQuery<TaxTemplateList, Error>({
    queryKey: TAX_TEMPLATE_KEYS.detail(id),
    queryFn: () => TaxTemplateService.get(id),
    enabled: !!id,
  })
}

export function useCreateTaxTemplate() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: TaxTemplateList): Promise<TaxTemplateList> =>
      TaxTemplateService.create(data),
    onMutate: async (newTaxTemplate) => {
      await queryClient.cancelQueries({
        queryKey: [TAX_TEMPLATE_KEYS.all],
        exact: false,
      })

      const queryKey = [
        TAX_TEMPLATE_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousTaxTemplates =
        queryClient.getQueryData<TaxTemplatePaginator>(queryKey)

      queryClient.setQueryData<TaxTemplatePaginator>(queryKey, (old) => {
        if (!old)
          return {
            data: [newTaxTemplate],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [...old.data, { ...newTaxTemplate, id: Date.now() }],
          count: old.count + 1,
        }
      })

      return { previousTaxTemplates }
    },
    onSuccess: async (response) => {
      const newCompanyId = response.id
      toast.success(
        <Text as="b">{t("form-tax-template-successfully-created")}</Text>
      )
      router.push(routes.fms.taxTemplate)
    },
    onError: (err, newTaxTemplate, context) => {
      toast.error(<Text as="b">{t("form-tax-template-failed-to-create")}</Text>)
      if (context?.previousTaxTemplates) {
        const queryKey = [
          TAX_TEMPLATE_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousTaxTemplates)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [TAX_TEMPLATE_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateTaxTemplate() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: TaxTemplateList }) =>
      TaxTemplateService.update(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({
        queryKey: [TAX_TEMPLATE_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: TAX_TEMPLATE_KEYS.detail(id),
      })

      const queryKey = [
        TAX_TEMPLATE_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousTaxTemplates =
        queryClient.getQueryData<TaxTemplatePaginator>(queryKey)
      const previousTaxTemplate = queryClient.getQueryData<TaxTemplateList>(
        TAX_TEMPLATE_KEYS.detail(id)
      )

      queryClient.setQueryData<TaxTemplatePaginator>(queryKey, (old) => {
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

      queryClient.setQueryData(TAX_TEMPLATE_KEYS.detail(id), data)

      return { previousTaxTemplates, previousTaxTemplate }
    },
    onSuccess: async (response) => {
      const newRuleId = response.id
      toast.success(
        <Text as="b">{t("form-tax-template-successfully-updated")}</Text>
      )
      router.push(routes.fms.taxTemplate)
    },
    onError: (err, variables, context) => {
      toast.error(<Text as="b">{t("form-tax-template-failed-to-update")}</Text>)
      if (context?.previousTaxTemplates) {
        const queryKey = [
          TAX_TEMPLATE_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousTaxTemplates)
      }
      if (context?.previousTaxTemplate) {
        queryClient.setQueryData(
          TAX_TEMPLATE_KEYS.detail(variables.id),
          context.previousTaxTemplate
        )
      }
    },
    onSettled: (data) => {
      queryClient.invalidateQueries({
        queryKey: [TAX_TEMPLATE_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: TAX_TEMPLATE_KEYS.detail(data.id),
        })
      }
    },
  })
}

export function useDeleteTaxTemplate() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => TaxTemplateService.delete(id),
    onMutate: async (id) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [TAX_TEMPLATE_KEYS.all],
        exact: false,
      })

      const queryKey = [
        TAX_TEMPLATE_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousTaxTemplates =
        queryClient.getQueryData<TaxTemplatePaginator>(queryKey)

      // Optimistically remove the TaxTemplate from the list
      queryClient.setQueryData<TaxTemplatePaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => item.id !== id),
          count: old.count - 1,
        }
      })

      return { previousTaxTemplates }
    },

    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-tax-template-successfully-deleted")}</Text>
      )
    },

    onError: (err, variables, context) => {
      // @ts-ignore
      const errorMessage = err?.response?.data?.message;
      if (errorMessage?.includes('referenced')) {
        toast.error(
          <Text as="b">
            {t("form-tax-template-cannot-delete-referenced")}
          </Text>
        );
      } else {
        toast.error(
          <Text as="b">
            {t("form-tax-template-failed-to-delete")}
          </Text>
        );
      }
      if (context?.previousTaxTemplates) {
        const queryKey = [
          TAX_TEMPLATE_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousTaxTemplates)
      }
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [TAX_TEMPLATE_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeleteTaxTemplate() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (ids: number[]) => TaxTemplateService.bulk(ids),
    onMutate: async (ids) => {
      await queryClient.cancelQueries({
        queryKey: [TAX_TEMPLATE_KEYS.all],
        exact: false,
      })

      const queryKey = [
        TAX_TEMPLATE_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousTaxTemplates =
        queryClient.getQueryData<TaxTemplatePaginator>(queryKey)
      queryClient.setQueryData<TaxTemplatePaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => !ids.includes(item.id as number)),
          count: old.count - ids.length,
        }
      })

      return { previousTaxTemplates }
    },
    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-tax-template-deleted-successfully")}</Text>
      )
    },
    onError: (err, variables, context) => {
      // @ts-ignore
      const errorMessage = err?.response?.data?.message;
      if (errorMessage?.includes('REFERENCE constraint')) {
        toast.error(
          <Text as="b">
            {t("form-tax-template-cannot-delete-referenced")}
          </Text>
        );
      } else {
        toast.error(
          <Text as="b">
            {t("form-tax-template-failed-to-delete")}
          </Text>
        );
      }
      if (context?.previousTaxTemplates) {
        const queryKey = [
          TAX_TEMPLATE_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousTaxTemplates)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [TAX_TEMPLATE_KEYS.all],
        exact: false,
      })
    },
  })
}
