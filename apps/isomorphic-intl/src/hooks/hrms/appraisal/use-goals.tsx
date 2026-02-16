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

import { routes } from "@/config/routes"
import { GoalService } from "@/server/service/hrms/appraisal/goal.service"
import { QUERY_KEYS } from "@/server/service/hrms/hrms-query-keys.constants"
import { createQueryKeys } from "@/server/service/query-config"
import {
  Goal,
  GoalDataResponse,
  GoalQueryOptions,
} from "@/types/hrms/appraisal/goals.types"

const GOAL_KEYS = createQueryKeys(QUERY_KEYS.goalList)

export function useGoalList(options?: Partial<GoalQueryOptions>) {
  const queryKey = [GOAL_KEYS.all, options]

  return useQuery<GoalDataResponse, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return GoalService.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
  })
}

export function useGoalById(id: number) {
  return useQuery<Goal>({
    queryKey: [QUERY_KEYS.goal, id],
    queryFn: () => GoalService.get(id),
    enabled: !!id,
  })
}

export function useCreateGoal() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: Goal): Promise<Goal> => GoalService.create(data),
    onSuccess: () => {
      toast.success(<Text as="b">{t("form-goal-created-successfully")}</Text>)
      router.push(routes.hr.goals)
    },
    onError: (err: AxiosError) => {
      if (err?.response?.data) {
        toast.error(<Text as="b">{t("form-something-went-wrong")}</Text>)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [GOAL_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateGoal() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: Goal) => GoalService.update(data),
    onSuccess: () => {
      toast.success(<Text as="b">{t("form-goal-updated-successfully")}</Text>)
      router.push(routes.hr.goals)
    },
    onError: (err: AxiosError) => {
      if (err?.response?.data) {
        toast.error(<Text as="b">{t("form-something-went-wrong")}</Text>)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [GOAL_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useDeleteGoal() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => GoalService.delete(id),
    onSuccess: () => {
      toast.success(<Text as="b">{t("form-goal-deleted-successfully")}</Text>)
    },
    onError: (err: AxiosError) => {
      if (err?.response?.data) {
        toast.error(<Text as="b">{t("form-can-not-delete")}</Text>)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [GOAL_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeleteGoals() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (ids: number[]) => GoalService.bulkDelete(ids),
    onSuccess: () => {
      toast.success(<Text as="b">{t("form-selected-goals-deleted")}</Text>)
    },
    onError: (err: AxiosError) => {
      if (err?.response?.data) {
        toast.error(<Text as="b">{t("form-can-not-delete")}</Text>)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [GOAL_KEYS.all],
        exact: false,
      })
    },
  })
}
