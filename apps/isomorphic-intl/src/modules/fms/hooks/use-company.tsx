"use client"

import { useParams, useRouter } from "next/navigation"

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
import { CompanyService } from "@/modules/fms/service/company.service"
import {
  CompanyList,
  CompanyPaginator,
  CompanyQueryOptions,
} from "@/modules/fms/types"
import {
  createQueryKeys,
} from "@/server/service/query-config"

const COMPANY_KEYS = createQueryKeys("company")

export function useCompanyList(options?: Partial<CompanyQueryOptions>) {
  const queryKey = [COMPANY_KEYS.all, options]

  return useQuery<CompanyPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return CompanyService.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function useCompanyById(id: number) {
  return useQuery({
    queryKey: COMPANY_KEYS.detail(id),
    queryFn: () => CompanyService.get(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function useCreateCompany() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: CompanyList) => CompanyService.create(data),
    onMutate: async (newCompany) => {
      await queryClient.cancelQueries({
        queryKey: [COMPANY_KEYS.all],
        exact: false,
      })

      const queryKey = [
        COMPANY_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousCompanies =
        queryClient.getQueryData<CompanyPaginator>(queryKey)

      queryClient.setQueryData<CompanyPaginator>(queryKey, (old) => {
        if (!old)
          return {
            data: [newCompany],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [...old.data, { ...newCompany, id: Date.now() }],
          count: old.count + 1,
        }
      })

      return { previousCompanies }
    },
    onSuccess: async () => {
      toast.success(
        <Text as="b">{t("form-company-successfully-created")}</Text>
      )
      router.push(`${routes.fms.company}`)
    },
    onError: (err, newCompany, context) => {
      if (context?.previousCompanies) {
        const queryKey = [
          COMPANY_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousCompanies)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [COMPANY_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateCompany() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")
  const params = useParams()
  const companyId = params.companyId ?? ""


  return useMutation({
    mutationFn: (data: CompanyList) =>
      CompanyService.update(data),
    onMutate: async (data) => {
      await queryClient.cancelQueries({
        queryKey: [COMPANY_KEYS.all],
        exact: false,
      })

      // Only cancel queries if id exists
      if (data.id) {
        await queryClient.cancelQueries({
          queryKey: COMPANY_KEYS.detail(data.id),
        })
      }

      const queryKey = [
        COMPANY_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousCountries =
        queryClient.getQueryData<CompanyPaginator>(queryKey)

      // Only get previous country data if id exists
      const previousCountry = data.id
        ? queryClient.getQueryData<CompanyList>(COMPANY_KEYS.detail(data.id))
        : undefined

      queryClient.setQueryData<CompanyPaginator>(queryKey, (old) => {
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
        queryClient.setQueryData(COMPANY_KEYS.detail(data.id), data)
      }

      return { previousCountries, previousCountry }
    },
    onSuccess: async () => {
      toast.success(
        <Text as="b">{t("form-company-successfully-updated")}</Text>
      )
      router.push(`${routes.fms.company}/${companyId}`)
    },
    onError: (err, variables, context) => {
      toast.error(
        <Text as="b">{t("form-company-failed-to-update")}</Text>
      )
      if (context?.previousCountries) {
        const queryKey = [
          COMPANY_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousCountries)
      }
      if (context?.previousCountry && variables.id) {
        queryClient.setQueryData(
          COMPANY_KEYS.detail(variables.id),
          context.previousCountry
        )
      }
    },
    onSettled: (data) => {
      queryClient.invalidateQueries({
        queryKey: [COMPANY_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: COMPANY_KEYS.detail(data.id),
        })
      }
    },
  })
}

export function useDeleteCompany() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => CompanyService.delete(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({
        queryKey: [COMPANY_KEYS.all],
        exact: false,
      })

      const queryKey = [
        COMPANY_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousCompanies =
        queryClient.getQueryData<CompanyPaginator>(queryKey)

      // Optimistically remove the COA from the list
      queryClient.setQueryData<CompanyPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => item.id !== id),
          count: old.count - 1,
        }
      })

      return { previousCompanies }
    },

    onSuccess: () => {
      toast.success(<Text as="b">{t("form-coa-successfully-deleted")}</Text>)
    },

    onError: (err, variables, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousCompanies) {
        const queryKey = [
          COMPANY_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousCompanies)
      }
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [COMPANY_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeleteCompany() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (ids: number[]) => CompanyService.bulk(ids),
    onMutate: async (ids) => {
      await queryClient.cancelQueries({
        queryKey: [COMPANY_KEYS.all],
        exact: false,
      })

      const queryKey = [
        COMPANY_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousCompanies =
        queryClient.getQueryData<CompanyPaginator>(queryKey)
      queryClient.setQueryData<CompanyPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => !ids.includes(item.id as number)),
          count: old.count - ids.length,
        }
      })

      return { previousCompanies }
    },
    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-company-deleted-successfully")}</Text>
      )
    },
    onError: (err, variables, context) => {
      toast.error(
        <Text as="b">{t("form-company-failed-to-delete")}</Text>
      )
      if (context?.previousCompanies) {
        const queryKey = [
          COMPANY_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousCompanies)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [COMPANY_KEYS.all],
        exact: false,
      })
    },
  })
}
