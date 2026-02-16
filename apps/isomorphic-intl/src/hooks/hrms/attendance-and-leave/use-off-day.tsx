import { useRouter } from "next/navigation"

import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useTranslations } from "next-intl"
import toast from "react-hot-toast"
import { Text } from "rizzui"

import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/config/constants"
import { routes } from "@/config/routes"
import { OffDayService } from "@/server/service/hrms/attendance-and-leave/off-day.service"
import { QUERY_KEYS } from "@/server/service/hrms/hrms-query-keys.constants"
import { createQueryKeys } from "@/server/service/query-config"
import {
  OffDay,
  OffDayQueryOptions,
  OffDaysDataResponse,
} from "@/types/hrms/attendance-and-leave/off-day.types"

const OFF_DAY_KEYS = createQueryKeys(QUERY_KEYS.offDayList)

export function useOffDayList(options?: Partial<OffDayQueryOptions>) {
  const queryKey = [OFF_DAY_KEYS.all, options]

  return useQuery<OffDaysDataResponse, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return OffDayService.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

// export function useCreateOffDay() {
//   const queryClient = useQueryClient()
//   return useMutation<OffDay, AxiosError, OffDayPostData>({
//     mutationFn: (data) => OffDayService.create(data),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.offDayList] })
//     },
//   })
// }

export function useCreateOffDay() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: OffDay): Promise<OffDay> => OffDayService.create(data),
    onMutate: async (newCOA) => {
      await queryClient.cancelQueries({
        queryKey: [OFF_DAY_KEYS.all],
        exact: false,
      })

      const queryKey = [
        OFF_DAY_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousOffDays =
        queryClient.getQueryData<OffDaysDataResponse>(queryKey)

      queryClient.setQueryData<OffDaysDataResponse>(queryKey, (old) => {
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

      return { previousOffDays }
    },
    onSuccess: async () => {
      toast.success(<Text as="b">{t("form-off-day-added")}</Text>)
      router.push(`${routes.hr.offDays}`)
    },
    onError: (err: AxiosError, newCOA, context) => {
      if (err.response?.data === "Similar Data already exists") {
        toast.error(<Text as="b">{t("form-similar-data-error")}</Text>)
      }
      if (context?.previousOffDays) {
        const queryKey = [
          OFF_DAY_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousOffDays)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [OFF_DAY_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateOffDay() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: ({ data }: { data: OffDay }) => OffDayService.update(data),
    onMutate: async ({ data }) => {
      await queryClient.cancelQueries({
        queryKey: [OFF_DAY_KEYS.all], 
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: [OFF_DAY_KEYS.detail(data.id ?? 0)],
      })

      const queryKey = [
        QUERY_KEYS.offDayList,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousOffDays =
        queryClient.getQueryData<OffDaysDataResponse>(queryKey)
      const previousOffDay = queryClient.getQueryData<OffDay>(OFF_DAY_KEYS.all)

      queryClient.setQueryData<OffDaysDataResponse>(queryKey, (old) => {
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

      queryClient.setQueryData(OFF_DAY_KEYS.detail(data.id ?? 0), data)

      return { previousOffDays, previousOffDay }
    },
    onSuccess: async () => {
      toast.success(<Text as="b">{t("form-off-day-updated")}</Text>)
      router.push(`${routes.hr.offDays}`)
    },
    onError: (err: AxiosError, variables, context) => {
      if (err.response?.data === "Similar Data already exists") {
        toast.error(<Text as="b">{t("form-similar-data-error")}</Text>)
      }
      if (context?.previousOffDays) {
        const queryKey = [
          OFF_DAY_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousOffDays)
      }
      if (context?.previousOffDay) {
        queryClient.setQueryData(
          OFF_DAY_KEYS.detail(variables.data.id ?? 0),
          context.previousOffDay
        )
      }
    },
    onSettled: (data) => {
      queryClient.invalidateQueries({
        queryKey: [OFF_DAY_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: OFF_DAY_KEYS.detail(data.id),
        })
      }
    },
  })
}

export function useDeleteOffDay() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => OffDayService.delete(id),
    onMutate: async (id) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [OFF_DAY_KEYS.all],
        exact: false,
      })

      const queryKey = [
        OFF_DAY_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousOffDays =
        queryClient.getQueryData<OffDaysDataResponse>(queryKey)

      // Optimistically remove the COA from the list
      queryClient.setQueryData<OffDaysDataResponse>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => item.id !== id),
          count: old.count - 1,
        }
      })

      return { previousOffDays }
    },

    onSuccess: () => {
      toast.success(<Text as="b">{t("form-off-day-deleted")}</Text>)
      // queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.employeeList] })
    },

    onError: (err, variables, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousOffDays) {
        const queryKey = [
          OFF_DAY_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousOffDays)
      }
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [OFF_DAY_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeleteOffDay() {
  const queryClient = useQueryClient()
  const bulkDelete = useMutation<void, AxiosError, number[]>({
    mutationFn: async (ids) => {
      await OffDayService.bulkDelete(ids)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.offDayList] })
    },
  })

  return { bulkDelete }
}
