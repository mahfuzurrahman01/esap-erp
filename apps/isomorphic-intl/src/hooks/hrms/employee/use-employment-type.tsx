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
import { EmploymentTypeService } from "@/server/service/hrms/employee/employment-types.service"
import { QUERY_KEYS } from "@/server/service/hrms/hrms-query-keys.constants"
import { createQueryKeys } from "@/server/service/query-config"
import {
  EmploymentType,
  EmploymentTypeDataResponse,
  EmploymentTypeQueryOptions,
} from "@/types/hrms/employee/employment-types.types"

const EMPLOYMENT_TYPE_KEYS = createQueryKeys(QUERY_KEYS.employmentTypeList)

export function useEmploymentTypeList(
  options?: Partial<EmploymentTypeQueryOptions>
) {
  const queryKey = [EMPLOYMENT_TYPE_KEYS.all, options]

  return useQuery<EmploymentTypeDataResponse, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return EmploymentTypeService.all(
        Object.assign({}, queryKey[1], pageParam)
      )
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

// Create new EmploymentType
export function useCreateEmploymentType() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: EmploymentType): Promise<EmploymentType> =>
      EmploymentTypeService.create(data),
    onMutate: async (newEmployee) => {
      await queryClient.cancelQueries({
        queryKey: [EMPLOYMENT_TYPE_KEYS.all],
        exact: false,
      })

      const queryKey = [
        EMPLOYMENT_TYPE_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousEmployee =
        queryClient.getQueryData<EmploymentTypeDataResponse>(queryKey)

      queryClient.setQueryData<EmploymentTypeDataResponse>(queryKey, (old) => {
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
    onSuccess: async () => {
      toast.success(<Text as="b">{t("form-employment-type-added")}</Text>)
      router.push(routes.hr.employmentSettingItems)
    },
    onError: (err: AxiosError, newEmploymentType, context) => {
      const errorMessage = err.response?.data
      console.log("errorMessage", errorMessage)
      if (errorMessage == "Similar Data already exists") {
        return toast.error(
          <Text as="b">{t("form-similar-data-already-exists")}</Text>
        )
      }
      if (context?.previousEmployee) {
        const queryKey = [
          EMPLOYMENT_TYPE_KEYS.all,
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
        queryKey: [EMPLOYMENT_TYPE_KEYS.all],
        exact: false,
      })
    },
  })
}

// export function useUpdateEmploymentType() {
//   const queryClient = useQueryClient()

//   return useMutation<EmploymentType, AxiosError, EmploymentPutDataType>({
//     mutationFn: (data) => EmploymentTypeService.update(data),
//     onSuccess: (data) => {
//       queryClient.invalidateQueries({
//         queryKey: [QUERY_KEYS.employmentTypeList],
//       })
//       queryClient.invalidateQueries({
//         queryKey: [QUERY_KEYS.employmentTypeList, data.id],
//       })
//     },
//   })
// }

// Update existing EmploymentType
export function useUpdateEmploymentType() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: ({ data }: { data: EmploymentType }) =>
      EmploymentTypeService.update(data),
    onMutate: async ({ data }) => {
      await queryClient.cancelQueries({
        queryKey: [EMPLOYMENT_TYPE_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: [EMPLOYMENT_TYPE_KEYS.detail(data.id ?? 0)],
      })

      const queryKey = [
        QUERY_KEYS.employeeList,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousEmployeeTypes =
        queryClient.getQueryData<EmploymentTypeDataResponse>(queryKey)
      const previousEmployeeType = queryClient.getQueryData<EmploymentType>(
        EMPLOYMENT_TYPE_KEYS.all
      )

      queryClient.setQueryData<EmploymentTypeDataResponse>(queryKey, (old) => {
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

      queryClient.setQueryData(EMPLOYMENT_TYPE_KEYS.detail(data.id ?? 0), data)

      return { previousEmployeeTypes, previousEmployeeType }
    },
    onSuccess: async () => {
      toast.success(<Text as="b">{t("form-employment-type-updated")}</Text>)
      router.push(routes.hr.employmentSettingItems)
    },
    onError: (err, variables, context) => {
      if (context?.previousEmployeeTypes) {
        const queryKey = [
          EMPLOYMENT_TYPE_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousEmployeeTypes)
      }
      if (context?.previousEmployeeType) {
        queryClient.setQueryData(
          EMPLOYMENT_TYPE_KEYS.detail(variables.data.id ?? 0),
          context.previousEmployeeType
        )
      }
    },
    onSettled: (data) => {
      queryClient.invalidateQueries({
        queryKey: [EMPLOYMENT_TYPE_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: EMPLOYMENT_TYPE_KEYS.detail(data.id),
        })
      }
    },
  })
}

// export function useDeleteEmploymentType() {
//   const queryClient = useQueryClient()
//   return useMutation<void, AxiosError, number>({
//     mutationFn: async (id) => {
//       await EmploymentTypeService.delete(id)
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({
//         queryKey: [QUERY_KEYS.employmentTypeList],
//       })
//     },
//   })
// }

// Delete EmploymentType
export function useDeleteEmploymentType() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => EmploymentTypeService.delete(id),
    onMutate: async (id) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [EMPLOYMENT_TYPE_KEYS.all],
        exact: false,
      })

      const queryKey = [
        EMPLOYMENT_TYPE_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousEmployees =
        queryClient.getQueryData<EmploymentTypeDataResponse>(queryKey)

      // Optimistically remove the COA from the list
      queryClient.setQueryData<EmploymentTypeDataResponse>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => item.id !== id),
          count: old.count - 1,
        }
      })

      return { previousEmployees }
    },

    onSuccess: () => {
      toast.success(<Text as="b">{t("form-employment-type-deleted")}</Text>)
      // queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.employeeList] })
    },

    onError: (err, variables, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousEmployees) {
        const queryKey = [
          EMPLOYMENT_TYPE_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousEmployees)
      }
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [EMPLOYMENT_TYPE_KEYS.all],
        exact: false,
      })
    },
  })
}

// Advanced feature: Bulk operations

export function useBulkDeleteEmploymentType() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")
  return useMutation({
    mutationFn: (ids: number[]) => EmploymentTypeService.bulkDelete(ids),
    onMutate: async (ids) => {
      await queryClient.cancelQueries({
        queryKey: [EMPLOYMENT_TYPE_KEYS.all],
        exact: false,
      })

      const queryKey = [
        EMPLOYMENT_TYPE_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousEmployees =
        queryClient.getQueryData<EmploymentTypeDataResponse>(queryKey)

      queryClient.setQueryData<EmploymentTypeDataResponse>(queryKey, (old) => {
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
        <Text as="b">{t("form-selected-employment-type-deleted")}</Text>
      )
    },

    onError: (err: AxiosError, variables, context) => {
      // if (err?.response?.data) {
      //   return toast.error(<Text as="b">{t("form-can-not-delete")}</Text>)
      // }

      if (context?.previousEmployees) {
        const queryKey = [
          EMPLOYMENT_TYPE_KEYS.all,
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
        queryKey: [EMPLOYMENT_TYPE_KEYS.all],
        exact: false,
      })
    },
  })
}
