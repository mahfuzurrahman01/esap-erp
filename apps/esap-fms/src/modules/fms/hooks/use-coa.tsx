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
import {
  COAService,
} from "@/modules/fms/service/coa.service"
import { COAList, COAPaginator } from "@/modules/fms/types"
import {
  DEFAULT_QUERY_OPTIONS,
  createQueryKeys,
} from "@/server/service/query-config"
import { COAQueryOptions } from "../types/coa"

const COA_KEYS = createQueryKeys("coa")

export function useCOAList(options?: Partial<COAQueryOptions>) {
  const queryKey = [COA_KEYS.all, options]

  return useQuery<COAPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return COAService.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function useCOAById(id: number) {
  return useQuery({
    queryKey: COA_KEYS.detail(id),
    queryFn: () => COAService.get(id),
    enabled: !!id,
    ...DEFAULT_QUERY_OPTIONS,
  })
}

export function useCreateCOA() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: COAList): Promise<COAList> => COAService.create(data),
    onMutate: async (newCOA) => {
      await queryClient.cancelQueries({
        queryKey: [COA_KEYS.all],
        exact: false,
      })

      const queryKey = [
        COA_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousCOAs = queryClient.getQueryData<COAPaginator>(queryKey)

      queryClient.setQueryData<COAPaginator>(queryKey, (old) => {
        if (!old)
          return {
            data: [newCOA],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [...old.data, { ...newCOA, id: Date.now() }],
          count: old.count + 1,
        }
      })

      return { previousCOAs }
    },
    onSuccess: async () => {
      toast.success(<Text as="b">{t("form-coa-successfully-created")}</Text>)
      router.push(`${routes.fms.coa}`)
    },
    onError: (err, newCOA, context) => {
      if (context?.previousCOAs) {
        const queryKey = [
          COA_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousCOAs)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [COA_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateCOA() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")
  const params = useParams()
  const coaId = params.coaId ?? ""

  return useMutation({
    mutationFn: (data: COAList) =>
      COAService.update(data),
    onMutate: async (data) => {
      await queryClient.cancelQueries({
        queryKey: [COA_KEYS.all],
        exact: false,
      })

      // Only cancel queries if id exists
      if (data.id) {
        await queryClient.cancelQueries({
          queryKey: COA_KEYS.detail(data.id),
        })
      }

      const queryKey = [
        COA_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousCountries =
        queryClient.getQueryData<COAPaginator>(queryKey)

      // Only get previous country data if id exists
      const previousCountry = data.id
        ? queryClient.getQueryData<COAList>(COA_KEYS.detail(data.id))
        : undefined

      queryClient.setQueryData<COAPaginator>(queryKey, (old) => {
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
        queryClient.setQueryData(COA_KEYS.detail(data.id), data)
      }

      return { previousCountries, previousCountry }
    },
    onSuccess: async () => {
      toast.success(
        <Text as="b">{t("form-coa-successfully-updated")}</Text>
      )
      router.push(`${routes.fms.coa}/${coaId}`)
    },
    onError: (err, variables, context) => {
      toast.error(
        <Text as="b">{t("form-coa-failed-to-update")}</Text>
      )
      if (context?.previousCountries) {
        const queryKey = [
          COA_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousCountries)
      }
      if (context?.previousCountry && variables.id) {
        queryClient.setQueryData(
          COA_KEYS.detail(variables.id),
          context.previousCountry
        )
      }
    },
    onSettled: (data) => {
      queryClient.invalidateQueries({
        queryKey: [COA_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: COA_KEYS.detail(data.id),
        })
      }
    },
  })
}

export function useDeleteCOA() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => COAService.delete(id),
    onMutate: async (id) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [COA_KEYS.all],
        exact: false,
      })

      const queryKey = [
        COA_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousCOAs = queryClient.getQueryData<COAPaginator>(queryKey)

      // Optimistically remove the COA from the list
      queryClient.setQueryData<COAPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => item.id !== id),
          count: old.count - 1,
        }
      })

      return { previousCOAs }
    },

    onSuccess: () => {
      toast.success(<Text as="b">{t("form-coa-successfully-deleted")}</Text>)
    },

    onError: (err, variables, context) => {
      // @ts-ignore
      const errorMessage = err?.response?.data?.message;
      if (errorMessage?.includes('referenced')) {
        toast.error(
          <Text as="b">
            {t("form-coa-cannot-delete-referenced")}
          </Text>
        );
      } else {
        toast.error(
          <Text as="b">
            {t("form-coa-failed-to-delete")}
          </Text>
        );
      }
      if (context?.previousCOAs) {
        const queryKey = [
          COA_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousCOAs)
      }
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [COA_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeleteCOA() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (ids: number[]) => COAService.bulk(ids),
    onMutate: async (ids) => {
      await queryClient.cancelQueries({
        queryKey: [COA_KEYS.all],
        exact: false,
      })

      const queryKey = [
        COA_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousCOAs = queryClient.getQueryData<COAPaginator>(queryKey)

      queryClient.setQueryData<COAPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => !ids.includes(item.id as number)),
          count: old.count - ids.length,
        }
      })

      return { previousCOAs }
    },

    onSuccess: () => {
      toast.success(<Text as="b">{t("form-coa-deleted-successfully")}</Text>)
    },
    onError: (err, variables, context) => {
      // @ts-ignore
      const errorMessage = err?.response?.data?.message;
      if (errorMessage?.includes('REFERENCE constraint')) {
        toast.error(
          <Text as="b">
            {t("form-coa-cannot-delete-referenced")}
          </Text>
        );
      } else {
        toast.error(
          <Text as="b">
            {t("form-coa-failed-to-delete")}
          </Text>
        );
      }
      if (context?.previousCOAs) {
        const queryKey = [
          COA_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]

        queryClient.setQueryData(queryKey, context.previousCOAs)
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [COA_KEYS.all],
        exact: false,
      })
    },
  })
}
