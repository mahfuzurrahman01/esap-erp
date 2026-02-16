"use client"

import { useParams, useRouter } from "next/navigation"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import toast from "react-hot-toast"
import { Text } from "rizzui"

import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/config/constants"
import { routes } from "@/config/routes"
import { privateService } from "@/server/service/hrms/employee/private-service"
import { QUERY_KEYS } from "@/server/service/hrms/hrms-query-keys.constants"
import { createQueryKeys } from "@/server/service/query-config"
import { PrivateInformation } from "@/types/hrms/employee/employee.types"
import { PrivateDataResponse } from "@/types/hrms/employee/private-types"

const PRIVATE_KEYS = createQueryKeys("private")

// get employee private information by Id
export function usePrivateInfoById(id: number) {
  return useQuery<PrivateInformation>({
    queryKey: PRIVATE_KEYS.detail(id),
    queryFn: () => privateService.get(id),
    enabled: !!id,
  })
}

// create Employee's private information
export function useCreatePrivateInfo() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")
  const params = useParams()
  const employeeId = params.employeeId

  return useMutation({
    mutationFn: (data: PrivateInformation): Promise<PrivateInformation> =>
      privateService.create(data),
    onMutate: async (newInfo) => {
      await queryClient.cancelQueries({
        queryKey: [PRIVATE_KEYS.all],
        exact: false,
      })

      const queryKey = [
        PRIVATE_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousEmployee =
        queryClient.getQueryData<PrivateDataResponse>(queryKey)
      queryClient.setQueryData<PrivateDataResponse>(queryKey, (old) => {
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
    onSuccess: async () => {
      toast.success(
        <Text as="b">{t("form-privateInfo-created-successfully")}</Text>
      )
      router.push(routes.hr.employeeDetails(Number(employeeId)))
    },
    onError: (err, newCOA, context) => {
      if (context?.previousEmployee) {
        const queryKey = [
          PRIVATE_KEYS.all,
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
        queryKey: [PRIVATE_KEYS.all],
        exact: false,
      })
    },
  })
}

// update Employee's private information
export function useUpdatePrivateInfo() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")
  const params = useParams()
  const employeeId = params.employeeId
  return useMutation({
    mutationFn: ({ data }: { data: PrivateInformation }) =>
      privateService.update(data),
    onMutate: async ({ data }) => {
      await queryClient.cancelQueries({
        queryKey: [PRIVATE_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: [PRIVATE_KEYS.detail(data.id ?? 0)],
      })

      const queryKey = [
        QUERY_KEYS.employeeList,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousPrivateInfo =
        queryClient.getQueryData<PrivateDataResponse>(queryKey)
      const previousPrivateInfos = queryClient.getQueryData<PrivateInformation>(
        PRIVATE_KEYS.all
      )

      queryClient.setQueryData<PrivateDataResponse>(queryKey, (old) => {
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

      queryClient.setQueryData(PRIVATE_KEYS.detail(data.id ?? 0), data)

      return { previousPrivateInfo, previousPrivateInfos }
    },
    onSuccess: async () => {
      toast.success(
        <Text as="b">{t("form-privateInfo-updated-successfully")}</Text>
      )
      router.push(routes.hr.employeeDetails(Number(employeeId)))
    },
    onError: (err, variables, context) => {
      if (context?.previousPrivateInfo) {
        const queryKey = [
          PRIVATE_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousPrivateInfo)
      }
      if (context?.previousPrivateInfos) {
        queryClient.setQueryData(
          PRIVATE_KEYS.detail(variables.data.id ?? 0),
          context.previousPrivateInfos
        )
      }
    },
    onSettled: (data) => {
      queryClient.invalidateQueries({
        queryKey: [PRIVATE_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: PRIVATE_KEYS.detail(data.id),
        })
      }
    },
  })
}
