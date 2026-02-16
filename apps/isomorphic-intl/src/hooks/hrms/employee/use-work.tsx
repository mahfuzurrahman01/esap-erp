"use client"

import { useParams, useRouter } from "next/navigation"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import toast from "react-hot-toast"
import { Text } from "rizzui"

import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/config/constants"
import { routes } from "@/config/routes"
import { workService } from "@/server/service/hrms/employee/work-service"
import { QUERY_KEYS } from "@/server/service/hrms/hrms-query-keys.constants"
import { createQueryKeys } from "@/server/service/query-config"
import { WorkInformation } from "@/types/hrms/employee/employee.types"
import { WorkDataResponse } from "@/types/hrms/employee/work-types"

const WORK_KEYS = createQueryKeys("work")

export function useWorkInfoById(id: number) {
  return useQuery<WorkInformation>({
    queryKey: WORK_KEYS.detail(id),
    queryFn: () => workService.get(id),
    enabled: !!id,
  })
}
// create Employee's work information
export function useCreateWorkInfo() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")
  const params = useParams()
  const employeeId = params.employeeId

  return useMutation({
    mutationFn: (data: WorkInformation): Promise<WorkInformation> =>
      workService.create(data),
    onMutate: async (newInfo) => {
      await queryClient.cancelQueries({
        queryKey: [WORK_KEYS.all],
        exact: false,
      })

      const queryKey = [
        WORK_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousEmployee =
        queryClient.getQueryData<WorkDataResponse>(queryKey)
      queryClient.setQueryData<WorkDataResponse>(queryKey, (old) => {
        if (!old)
          return {
            data: [newInfo],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [...old.data, { ...newInfo, id: Date.now() }],
          count: old.count + 1,
        }
      })

      return { previousEmployee }
    },
    onSuccess: async (response) => {
      toast.success(
        <Text as="b">{t("form-workInfo-created-successfully")}</Text>
      )
      router.push(routes.hr.employeeDetails(Number(employeeId)))
    },
    onError: (err, newCOA, context) => {
      if (context?.previousEmployee) {
        const queryKey = [
          WORK_KEYS.all,
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
        queryKey: [WORK_KEYS.all],
        exact: false,
      })
    },
  })
}

// update Employee's work information
export function useUpdateWorkInfo() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")
  const params = useParams()
  const employeeId = params.employeeId
  return useMutation({
    mutationFn: ({ data }: { data: WorkInformation }) =>
      workService.update(data),
    onMutate: async ({ data }) => {
      await queryClient.cancelQueries({
        queryKey: [WORK_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: [WORK_KEYS.detail(data.id ?? 0)],
      })

      const queryKey = [
        QUERY_KEYS.employeeList,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousWorkInfo =
        queryClient.getQueryData<WorkDataResponse>(queryKey)
      const previousWorkInfos = queryClient.getQueryData<WorkInformation>(
        WORK_KEYS.all
      )

      queryClient.setQueryData<WorkDataResponse>(queryKey, (old) => {
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

      queryClient.setQueryData(WORK_KEYS.detail(data.id ?? 0), data)

      return { previousWorkInfo, previousWorkInfos }
    },
    onSuccess: async (response) => {
      toast.success(
        <Text as="b">{t("form-workInfo-updated-successfully")}</Text>
      )
      router.push(routes.hr.employeeDetails(Number(employeeId)))
    },
    onError: (err, variables, context) => {
      if (context?.previousWorkInfo) {
        const queryKey = [
          WORK_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousWorkInfo)
      }
      if (context?.previousWorkInfos) {
        queryClient.setQueryData(
          WORK_KEYS.detail(variables.data.id ?? 0),
          context.previousWorkInfos
        )
      }
    },
    onSettled: (data) => {
      queryClient.invalidateQueries({
        queryKey: [WORK_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: WORK_KEYS.detail(data.id),
        })
      }
    },
  })
}
