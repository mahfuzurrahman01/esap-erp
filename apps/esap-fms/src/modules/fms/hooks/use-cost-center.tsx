"use client"

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
import { CostCenterService } from "@/modules/fms/service/cost-center.service"
import {
  CostCenterList,
  CostCenterPaginator,
  CostCenterQueryOptions,
} from "@/modules/fms/types"
import {
  DEFAULT_QUERY_OPTIONS,
  createQueryKeys,
} from "@/server/service/query-config"
import { useRouter } from "next/navigation"

const COST_CENTER_KEYS = createQueryKeys("cost-center")

export function useCostCenterList(options?: Partial<CostCenterQueryOptions>) {
  const queryKey = [COST_CENTER_KEYS.all, options]

  return useQuery<CostCenterPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return CostCenterService.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

export function useCostCenterById(id: number) {
  return useQuery({
    queryKey: COST_CENTER_KEYS.detail(id),
    queryFn: () => CostCenterService.get(id),
    enabled: !!id,
    ...DEFAULT_QUERY_OPTIONS,
  })
}

export function useCreateCostCenter() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: CostCenterList): Promise<CostCenterList> =>
      CostCenterService.create(data),
    onMutate: async (newCostCenter) => {
      await queryClient.cancelQueries({
        queryKey: [COST_CENTER_KEYS.all],
        exact: false,
      })

      const queryKey = [
        COST_CENTER_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousCostCenters =
        queryClient.getQueryData<CostCenterPaginator>(queryKey)

      queryClient.setQueryData<CostCenterPaginator>(queryKey, (old) => {
        if (!old)
          return {
            data: [newCostCenter],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [...old.data, { ...newCostCenter, id: Date.now() }],
          count: old.count + 1,
        }
      })

      return { previousCostCenters }
    },
    onSuccess: async () => {
      toast.success(<Text as="b">{t("form-cost-center-created")}</Text>)
    },
    onError: (err, newCostCenter, context) => {
      if (context?.previousCostCenters) {
        const queryKey = [
          COST_CENTER_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousCostCenters)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [COST_CENTER_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateCostCenter() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: CostCenterList) =>
      CostCenterService.update(data),
    onMutate: async (data) => {
      await queryClient.cancelQueries({
        queryKey: [COST_CENTER_KEYS.all],
        exact: false,
      })

      // Only cancel queries if id exists
      if (data.id) {
        await queryClient.cancelQueries({
          queryKey: COST_CENTER_KEYS.detail(data.id),
        })
      }

      const queryKey = [
        COST_CENTER_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousCostCenters =
        queryClient.getQueryData<CostCenterPaginator>(queryKey)

      // Only get previous country data if id exists
      const previousCostCenter = data.id
        ? queryClient.getQueryData<CostCenterList>(
          COST_CENTER_KEYS.detail(data.id)
        )
        : undefined

      queryClient.setQueryData<CostCenterPaginator>(queryKey, (old) => {
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
        queryClient.setQueryData(COST_CENTER_KEYS.detail(data.id), data)
      }

      return { previousCostCenters, previousCostCenter }
    },
    onSuccess: async () => {
      toast.success(
        <Text as="b">{t("form-cost-center-successfully-updated")}</Text>
      )
      router.refresh()
    },
    onError: (err, variables, context) => {
      if (context?.previousCostCenters) {
        const queryKey = [
          COST_CENTER_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousCostCenters)
      }
      if (context?.previousCostCenter && variables.id) {
        queryClient.setQueryData(
          COST_CENTER_KEYS.detail(variables.id),
          context.previousCostCenter
        )
      }
    },
    onSettled: (data) => {
      queryClient.invalidateQueries({
        queryKey: [COST_CENTER_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: COST_CENTER_KEYS.detail(data.id),
        })
      }
    },
  })
}

export function useDeleteCostCenter() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => CostCenterService.delete(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({
        queryKey: [COST_CENTER_KEYS.all],
        exact: false,
      })

      const queryKey = [
        COST_CENTER_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousCostCenters =
        queryClient.getQueryData<CostCenterPaginator>(queryKey)

      // Optimistically remove the COA from the list
      queryClient.setQueryData<CostCenterPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => item.id !== id),
          count: old.count - 1,
        }
      })

      return { previousCostCenters }
    },

    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-cost-center-successfully-deleted")}</Text>
      )
    },

    onError: (err, variables, context) => {
      // @ts-ignore
      const errorMessage = err?.response?.data?.message;
      if (errorMessage?.includes('REFERENCE constraint')) {
        toast.error(
          <Text as="b">
            {t("form-cost-center-cannot-delete-referenced")}
          </Text>
        );
      } else {
        toast.error(
          <Text as="b">
            {errorMessage}
          </Text>
        );
      }
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousCostCenters) {
        const queryKey = [
          COST_CENTER_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousCostCenters)
      }
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [COST_CENTER_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeleteCostCenter() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (ids: number[]) => CostCenterService.bulk(ids),
    onMutate: async (ids) => {
      await queryClient.cancelQueries({
        queryKey: [COST_CENTER_KEYS.all],
        exact: false,
      })

      const queryKey = [
        COST_CENTER_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousCostCenters =
        queryClient.getQueryData<CostCenterPaginator>(queryKey)
      queryClient.setQueryData<CostCenterPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => !ids.includes(item.id as number)),
          count: old.count - ids.length,
        }
      })

      return { previousCostCenters }
    },
    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-cost-center-deleted-successfully")}</Text>
      )
    },
    onError: (err, variables, context) => {
      // @ts-ignore
      const errorMessage = err?.response?.data?.message;
      if (errorMessage?.includes('REFERENCE constraint')) {
        toast.error(
          <Text as="b">
            {t("form-cost-center-cannot-delete-referenced")}
          </Text>
        );
      } else {
        toast.error(
          <Text as="b">
            {t("form-cost-center-failed-to-delete")}
          </Text>
        );
      }
      if (context?.previousCostCenters) {
        const queryKey = [
          COST_CENTER_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousCostCenters)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [COST_CENTER_KEYS.all],
        exact: false,
      })
    },
  })
}
