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
import { QUERY_KEYS } from "@/server/service/hrms/hrms-query-keys.constants"
import { RecruitmentService } from "@/server/service/hrms/recruitment/recruitment-service"
import { createQueryKeys } from "@/server/service/query-config"
import {
  Recruitment,
  RecruitmentCreateInput,
  RecruitmentDataResponse,
  RecruitmentQueryOptions,
} from "@/types/hrms/recruitment/recruitment-type"

const RECRUITMENT_KEYS = createQueryKeys(QUERY_KEYS.recruitmentList)

export function useRecruitmentList(options?: Partial<RecruitmentQueryOptions>) {
  const queryKey = [RECRUITMENT_KEYS.all, options]

  return useQuery<RecruitmentDataResponse, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return RecruitmentService.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function useRecruitmentById(id: number) {
  return useQuery<Recruitment>({
    queryKey: [QUERY_KEYS.recruitment, id],
    queryFn: () => RecruitmentService.get(id),
    enabled: !!id,
  })
}

export function useCreateRecruitment() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: RecruitmentCreateInput): Promise<Recruitment> =>
      RecruitmentService.create(data),
    onMutate: async (newRecruitment) => {
      await queryClient.cancelQueries({
        queryKey: [RECRUITMENT_KEYS.all],
        exact: false,
      })

      const queryKey = [
        RECRUITMENT_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousRecruitments =
        queryClient.getQueryData<RecruitmentDataResponse>(queryKey)

      queryClient.setQueryData<RecruitmentDataResponse>(queryKey, (old) => {
        if (!old)
          return {
            data: [newRecruitment],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [...old.data, { ...newRecruitment, id: Date.now() }],
          count: old.count + 1,
        }
      })

      return { previousRecruitments }
    },
    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-recruitment-created-successfully")}</Text>
      )
      router.push(routes.hr.recruitment)
    },
    onError: (err, newRecruitment, context) => {
      if (context?.previousRecruitments) {
        const queryKey = [
          RECRUITMENT_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousRecruitments)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [RECRUITMENT_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateRecruitment() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: Recruitment) => RecruitmentService.update(data),
    onMutate: async (data) => {
      await queryClient.cancelQueries({
        queryKey: [RECRUITMENT_KEYS.all],
        exact: false,
      })

      const queryKey = [
        RECRUITMENT_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousRecruitments =
        queryClient.getQueryData<RecruitmentDataResponse>(queryKey)

      queryClient.setQueryData<RecruitmentDataResponse>(queryKey, (old) => {
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

      return { previousRecruitments }
    },
    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-recruitment-updated-successfully")}</Text>
      )
      router.push(routes.hr.recruitment)
    },
    onError: (err, variables, context) => {
      if (context?.previousRecruitments) {
        const queryKey = [
          RECRUITMENT_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousRecruitments)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [RECRUITMENT_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useDeleteRecruitment() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => RecruitmentService.delete(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({
        queryKey: [RECRUITMENT_KEYS.all],
        exact: false,
      })

      const queryKey = [
        RECRUITMENT_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousRecruitments =
        queryClient.getQueryData<RecruitmentDataResponse>(queryKey)

      queryClient.setQueryData<RecruitmentDataResponse>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => item.id !== id),
          count: old.count - 1,
        }
      })

      return { previousRecruitments }
    },
    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-recruitment-deleted-successfully")}</Text>
      )
    },
    onError: (err: AxiosError, variables, context) => {
      if (err?.response?.data) {
        toast.error(<Text as="b">{t("form-can-not-delete")}</Text>)
      }
      if (context?.previousRecruitments) {
        const queryKey = [
          RECRUITMENT_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousRecruitments)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [RECRUITMENT_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeleteRecruitments() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (ids: number[]) => RecruitmentService.bulkDelete(ids),
    onMutate: async (ids) => {
      await queryClient.cancelQueries({
        queryKey: [RECRUITMENT_KEYS.all],
        exact: false,
      })

      const queryKey = [
        RECRUITMENT_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousRecruitments =
        queryClient.getQueryData<RecruitmentDataResponse>(queryKey)

      queryClient.setQueryData<RecruitmentDataResponse>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => !ids.includes(item.id ?? 0)),
          count: old.count - ids.length,
        }
      })

      return { previousRecruitments }
    },
    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-selected-recruitments-deleted")}</Text>
      )
    },
    onError: (err: AxiosError, variables, context) => {
      if (err?.response?.data) {
        toast.error(<Text as="b">{t("form-can-not-delete")}</Text>)
      }
      if (context?.previousRecruitments) {
        const queryKey = [
          RECRUITMENT_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousRecruitments)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [RECRUITMENT_KEYS.all],
        exact: false,
      })
    },
  })
}
