"use client"

import { useParams, useRouter } from "next/navigation"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import toast from "react-hot-toast"
import { Text } from "rizzui"

import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/config/constants"
import { routes } from "@/config/routes"
import { resumeService } from "@/server/service/hrms/employee/resume-service"
import { QUERY_KEYS } from "@/server/service/hrms/hrms-query-keys.constants"
import { createQueryKeys } from "@/server/service/query-config"
import { ResumeDetails } from "@/types/hrms/employee/employee.types"
import { ResumeDataResponse } from "@/types/hrms/employee/resume.types"

const RESUME_KEYS = createQueryKeys("resume")
// get resume details by id
export function useResumeById(id: number) {
  return useQuery<ResumeDetails[]>({
    queryKey: RESUME_KEYS.detail(id),
    queryFn: () => resumeService.get(id),
    enabled: !!id,
  })
}

// create Employee's resume
export function useCreateResume() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")
  const params = useParams()
  const employeeId = params.employeeId

  return useMutation({
    mutationFn: (data: ResumeDetails): Promise<ResumeDetails> =>
      resumeService.create(data),
    onMutate: async (newInfo) => {
      await queryClient.cancelQueries({
        queryKey: [RESUME_KEYS.all],
        exact: false,
      })

      const queryKey = [
        RESUME_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousResume =
        queryClient.getQueryData<ResumeDataResponse>(queryKey)
      queryClient.setQueryData<ResumeDataResponse>(queryKey, (old) => {
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

      return { previousResume }
    },
    onSuccess: async (response) => {
      toast.success(<Text as="b">{t("form-resume-created-successfully")}</Text>)
      router.push(routes.hr.employeeDetails(Number(employeeId)))
    },
    onError: (err, newCOA, context) => {
      if (context?.previousResume) {
        const queryKey = [
          RESUME_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousResume)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [RESUME_KEYS.all],
        exact: false,
      })
    },
  })
}

// update Employee's resume
export function useUpdateResume() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")
  const router = useRouter()
  const params = useParams()
  const employeeId = params.employeeId
  return useMutation({
    mutationFn: ({ data }: { data: ResumeDetails }) =>
      resumeService.update(data),
    onMutate: async ({ data }) => {
      await queryClient.cancelQueries({
        queryKey: [RESUME_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: [RESUME_KEYS.detail(data.id ?? 0)],
      })

      const queryKey = [
        QUERY_KEYS.employeeList,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousResume = queryClient.getQueryData<ResumeDetails>(queryKey)
      const previousResumes = queryClient.getQueryData<ResumeDetails>(
        RESUME_KEYS.all
      )

      queryClient.setQueryData<ResumeDataResponse>(queryKey, (old) => {
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

      queryClient.setQueryData(RESUME_KEYS.detail(data.id ?? 0), data)

      return { previousResume, previousResumes }
    },
    onSuccess: async (response) => {
      toast.success(<Text as="b">{t("form-resume-updated-successfully")}</Text>)
      router.push(routes.hr.resume(Number(employeeId)))
    },
    onError: (err, variables, context) => {
      if (context?.previousResume) {
        const queryKey = [
          RESUME_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousResumes)
      }
      if (context?.previousResumes) {
        queryClient.setQueryData(
          RESUME_KEYS.detail(variables.data.id ?? 0),
          context.previousResumes
        )
      }
    },
    onSettled: (data) => {
      queryClient.invalidateQueries({
        queryKey: [RESUME_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: RESUME_KEYS.detail(data.id),
        })
      }
    },
  })
}

// delete employee's resume
export function useDeleteResume() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")
  const router = useRouter()
  const params = useParams()
  const employeeId = params.employeeId
  return useMutation({
    mutationFn: (id: number) => resumeService.delete(id),
    onMutate: async (id) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [RESUME_KEYS.all],
        exact: false,
      })

      const queryKey = [
        RESUME_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousResume =
        queryClient.getQueryData<ResumeDataResponse>(queryKey)

      // Optimistically remove the COA from the list
      queryClient.setQueryData<ResumeDataResponse>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => item.id !== id),
          count: old.count - 1,
        }
      })

      return { previousResume }
    },

    onSuccess: () => {
      toast.success(<Text as="b">{t("form-resume-deleted-successfully")}</Text>)
      // queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.employeeList] })
      router.push(routes.hr.employeeDetails(Number(employeeId)))
    },

    onError: (err, variables, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousResume) {
        const queryKey = [
          RESUME_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousResume)
      }
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [RESUME_KEYS.all],
        exact: false,
      })
    },
  })
}
