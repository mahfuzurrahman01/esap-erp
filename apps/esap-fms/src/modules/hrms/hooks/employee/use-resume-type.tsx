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
import { ResumeTypeService } from "@/server/service/hrms/employee/resume-type.service"
import { QUERY_KEYS } from "@/server/service/hrms/hrms-query-keys.constants"
import { createQueryKeys } from "@/server/service/query-config"
import {
  ResumeType,
  ResumeTypeDataResponse,
  ResumeTypeQueryOptions,
} from "@/types/hrms/employee/resume-types.types"

const RESUME_TYPE_KEYS = createQueryKeys(QUERY_KEYS.resumeTypeList)
// Fetch ResumeType list with pagination
// export function useResumeTypeList(options?: Partial<ResumeTypeQueryOptions>) {
//   const { data, isLoading, isError, isFetching, refetch } = useQuery({
//     queryKey: RESUME_TYPE_KEYS.list(options ?? {}),
//     queryFn: () => ResumeTypeService.all(sanitizeParams(options)),
//     ...DEFAULT_LIST_OPTIONS,
//     placeholderData: keepPreviousData,
//   })

//   return {
//     data: data as ResumeTypeDataResponse | null,
//     isLoading,
//     error: isError,
//     isFetching,
//     refetch,
//   }
// }

export function useResumeTypeList(options?: Partial<ResumeTypeQueryOptions>) {
  const queryKey = [RESUME_TYPE_KEYS.all, options]

  return useQuery<ResumeTypeDataResponse, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return ResumeTypeService.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

// Create new ResumeType

export function useCreateResumeType() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: ResumeType): Promise<ResumeType> =>
      ResumeTypeService.create(data),
    onMutate: async (newEmployee) => {
      await queryClient.cancelQueries({
        queryKey: [RESUME_TYPE_KEYS.all],
        exact: false,
      })

      const queryKey = [
        RESUME_TYPE_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousEmployee =
        queryClient.getQueryData<ResumeTypeDataResponse>(queryKey)

      queryClient.setQueryData<ResumeTypeDataResponse>(queryKey, (old) => {
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
      toast.success(<Text as="b">{t("form-resume-type-added")}</Text>)
      router.push(routes.hr.resumeTypeSettings)
    },
    onError: (err, newCOA, context) => {
      if (context?.previousEmployee) {
        const queryKey = [
          RESUME_TYPE_KEYS.all,
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
        queryKey: [RESUME_TYPE_KEYS.all],
        exact: false,
      })
    },
  })
}

// Update existing ResumeType
export function useUpdateResumeType() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: ({ data }: { data: ResumeType }) =>
      ResumeTypeService.update(data),
    onMutate: async ({ data }) => {
      await queryClient.cancelQueries({
        queryKey: [RESUME_TYPE_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: [RESUME_TYPE_KEYS.detail(data.id ?? 0)],
      })

      const queryKey = [
        QUERY_KEYS.employeeList,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousEmployeeTypes =
        queryClient.getQueryData<ResumeTypeDataResponse>(queryKey)
      const previousEmployeeType = queryClient.getQueryData<ResumeType>(
        RESUME_TYPE_KEYS.all
      )

      queryClient.setQueryData<ResumeTypeDataResponse>(queryKey, (old) => {
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

      queryClient.setQueryData(RESUME_TYPE_KEYS.detail(data.id ?? 0), data)

      return { previousEmployeeTypes, previousEmployeeType }
    },
    onSuccess: async (response) => {
      toast.success(<Text as="b">{t("form-resume-type-updated")}</Text>)

      router.push(routes.hr.resumeTypeSettings)
    },
    onError: (err, variables, context) => {
      if (context?.previousEmployeeTypes) {
        const queryKey = [
          RESUME_TYPE_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousEmployeeTypes)
      }
      if (context?.previousEmployeeType) {
        queryClient.setQueryData(
          RESUME_TYPE_KEYS.detail(variables.data.id ?? 0),
          context.previousEmployeeType
        )
      }
    },
    onSettled: (data) => {
      queryClient.invalidateQueries({
        queryKey: [RESUME_TYPE_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: RESUME_TYPE_KEYS.detail(data.id),
        })
      }
    },
  })
}

// Delete ResumeType

export function useDeleteResumeType() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")
  const router = useRouter()
  return useMutation({
    mutationFn: (id: number) => ResumeTypeService.delete(id),
    onMutate: async (id) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [RESUME_TYPE_KEYS.all],
        exact: false,
      })

      const queryKey = [
        RESUME_TYPE_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousEmployees =
        queryClient.getQueryData<ResumeTypeDataResponse>(queryKey)

      // Optimistically remove the COA from the list
      queryClient.setQueryData<ResumeTypeDataResponse>(queryKey, (old) => {
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
      toast.success(<Text as="b">{t("form-resume-type-delete")}</Text>)
      router.push(routes.hr.resumeTypeSettings)
      // queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.employeeList] })
    },

    onError: (err, variables, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousEmployees) {
        const queryKey = [
          RESUME_TYPE_KEYS.all,
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
        queryKey: [RESUME_TYPE_KEYS.all],
        exact: false,
      })
    },
  })
}

// Advanced feature: Bulk operations

export function useBulkDeleteResumeType() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")
  return useMutation({
    mutationFn: (ids: number[]) => ResumeTypeService.bulkDelete(ids),
    onMutate: async (ids) => {
      await queryClient.cancelQueries({
        queryKey: [RESUME_TYPE_KEYS.all],
        exact: false,
      })

      const queryKey = [
        RESUME_TYPE_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousEmployees =
        queryClient.getQueryData<ResumeTypeDataResponse>(queryKey)

      queryClient.setQueryData<ResumeTypeDataResponse>(queryKey, (old) => {
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
        <Text as="b">{t("form-selected-resume-type-deleted")}</Text>
      )
    },

    onError: (err: AxiosError, variables, context) => {
      // if (err?.response?.data) {
      //   return toast.error(<Text as="b">{t("form-can-not-delete")}</Text>)
      // }

      if (context?.previousEmployees) {
        const queryKey = [
          RESUME_TYPE_KEYS.all,
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
        queryKey: [RESUME_TYPE_KEYS.all],
        exact: false,
      })
    },
  })
}
