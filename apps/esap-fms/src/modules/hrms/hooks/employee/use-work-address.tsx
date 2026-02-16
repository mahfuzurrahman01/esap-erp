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
import { WorkAddressService } from "@/server/service/hrms/employee/work-address.service"
import { QUERY_KEYS } from "@/server/service/hrms/hrms-query-keys.constants"
import {
  DEFAULT_QUERY_OPTIONS,
  createQueryKeys,
} from "@/server/service/query-config"
import {
  WorkAddress,
  WorkAddressDataResponse,
  WorkAddressQueryOptions,
} from "@/types/hrms/employee/work-address.types"

const WORK_ADDRESS_KEYS = createQueryKeys(QUERY_KEYS.workAddressList)

// Fetch WorkAddress list with pagination
export function useWorkAddressList(options?: Partial<WorkAddressQueryOptions>) {
  const queryKey = [WORK_ADDRESS_KEYS.all, options]

  return useQuery<WorkAddressDataResponse, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return WorkAddressService.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function useWorkAddressById(id: number) {
  return useQuery({
    queryKey: WORK_ADDRESS_KEYS.detail(id),
    queryFn: () => WorkAddressService.get(id),
    enabled: !!id,
    ...DEFAULT_QUERY_OPTIONS,
  })
}

// Create new WorkAddress
export function useCreateWorkAddress() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: WorkAddress): Promise<WorkAddress> =>
      WorkAddressService.create(data),
    onMutate: async (newEmployee) => {
      await queryClient.cancelQueries({
        queryKey: [WORK_ADDRESS_KEYS.all],
        exact: false,
      })

      const queryKey = [
        WORK_ADDRESS_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousEmployee =
        queryClient.getQueryData<WorkAddressDataResponse>(queryKey)

      queryClient.setQueryData<WorkAddressDataResponse>(queryKey, (old) => {
        if (!old)
          return {
            data: [newEmployee],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [...old.data, { ...newEmployee, id: Date.now() }],
          count: old.count + 1,
        }
      })

      return { previousEmployee }
    },
    onSuccess: async (response) => {
      toast.success(<Text as="b">{t("form-work-address-added")}</Text>)
      router.push(`${routes.hr.workingAddress}`)
    },
    onError: (err, newCOA, context) => {
      if (context?.previousEmployee) {
        const queryKey = [
          WORK_ADDRESS_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousEmployee)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [WORK_ADDRESS_KEYS.all],
        exact: false,
      })
    },
  })
}

// Update existing WorkAddress
export function useUpdateWorkAddress() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: ({ data }: { data: WorkAddress }) =>
      WorkAddressService.update(data),
    onMutate: async ({ data }) => {
      await queryClient.cancelQueries({
        queryKey: [WORK_ADDRESS_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: [WORK_ADDRESS_KEYS.detail(data.id ?? 0)],
      })

      const queryKey = [
        QUERY_KEYS.employeeList,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousEmployeeTypes =
        queryClient.getQueryData<WorkAddressDataResponse>(queryKey)
      const previousEmployeeType = queryClient.getQueryData<WorkAddress>(
        WORK_ADDRESS_KEYS.all
      )

      queryClient.setQueryData<WorkAddressDataResponse>(queryKey, (old) => {
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

      queryClient.setQueryData(WORK_ADDRESS_KEYS.detail(data.id ?? 0), data)

      return { previousEmployeeTypes, previousEmployeeType }
    },
    onSuccess: async (response) => {
      toast.success(<Text as="b">{t("form-work-address-updated")}</Text>)
      router.push(`${routes.hr.workingAddress}`)
    },
    onError: (err, variables, context) => {
      if (context?.previousEmployeeTypes) {
        const queryKey = [
          WORK_ADDRESS_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousEmployeeTypes)
      }
      if (context?.previousEmployeeType) {
        queryClient.setQueryData(
          WORK_ADDRESS_KEYS.detail(variables.data.id ?? 0),
          context.previousEmployeeType
        )
      }
    },
    onSettled: (data) => {
      queryClient.invalidateQueries({
        queryKey: [WORK_ADDRESS_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: WORK_ADDRESS_KEYS.detail(data.id),
        })
      }
    },
  })
}
// Delete WorkAddress
export function useDeleteWorkAddress() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")
  const router = useRouter()
  return useMutation({
    mutationFn: (id: number) => WorkAddressService.delete(id),
    onMutate: async (id) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [WORK_ADDRESS_KEYS.all],
        exact: false,
      })

      const queryKey = [
        WORK_ADDRESS_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousCOAs =
        queryClient.getQueryData<WorkAddressDataResponse>(queryKey)

      // Optimistically remove the COA from the list
      queryClient.setQueryData<WorkAddressDataResponse>(queryKey, (old) => {
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
      toast.success(<Text as="b">{t("form-work-address-deleted")}</Text>)
      router.push(`${routes.hr.workingAddress}`)
    },

    onError: (err: AxiosError, variables, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (err) {
        toast.error(<Text as="b">{t("form-can-not-delete")}</Text>)
      }
      if (context?.previousCOAs) {
        const queryKey = [
          WORK_ADDRESS_KEYS.all,
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
        queryKey: [WORK_ADDRESS_KEYS.all],
        exact: false,
      })
    },
  })
}

// Advanced feature: Bulk operations

export function useBulkDeleteWorkAddress() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")
  return useMutation({
    mutationFn: (ids: number[]) => WorkAddressService.bulkDelete(ids),
    onMutate: async (ids) => {
      await queryClient.cancelQueries({
        queryKey: [WORK_ADDRESS_KEYS.all],
        exact: false,
      })

      const queryKey = [
        WORK_ADDRESS_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousEmployees =
        queryClient.getQueryData<WorkAddressDataResponse>(queryKey)

      queryClient.setQueryData<WorkAddressDataResponse>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => !ids.includes(item.id ?? 0)),
          count: old.count - ids.length,
        }
      })

      return { previousEmployees }
    },

    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-selected-work-addresses-deleted")}</Text>
      )
    },

    onError: (err: AxiosError, variables, context) => {
      if (err?.response?.data) {
        return toast.error(<Text as="b">{t("form-can-not-delete")}</Text>)
      }

      if (context?.previousEmployees) {
        const queryKey = [
          WORK_ADDRESS_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousEmployees)
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [WORK_ADDRESS_KEYS.all],
        exact: false,
      })
    },
  })
}
