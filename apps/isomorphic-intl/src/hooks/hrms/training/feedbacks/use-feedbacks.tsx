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
import { QUERY_KEYS } from "@/server/service/hrms/hrms-query-keys.constants"
import { TrainingFeedbackService } from "@/server/service/hrms/training/training-feedback.service"
import { createQueryKeys } from "@/server/service/query-config"
import {
  TrainingFeedback,
  TrainingFeedbackCreate,
  TrainingFeedbackDataResponse,
  TrainingFeedbackQueryOptions,
} from "@/types/hrms/training/training-feedbacks-type"
import { TrainingProgram } from "@/types/hrms/training/training-program-type"

const FEEDBACK_KEYS = createQueryKeys(QUERY_KEYS.trainingFeedbackList)

export function useFeedbackList(
  options?: Partial<TrainingFeedbackQueryOptions>
) {
  const queryKey = [FEEDBACK_KEYS.all, options]

  return useQuery<TrainingFeedbackDataResponse, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return TrainingFeedbackService.all(
        Object.assign({}, queryKey[1], pageParam)
      )
    },
    placeholderData: keepPreviousData,
  })
}

export function useFeedbackById(id: number) {
  return useQuery<TrainingFeedback>({
    queryKey: [QUERY_KEYS.trainingFeedback, id],
    queryFn: () => TrainingFeedbackService.get(id),
    enabled: !!id,
  })
}

export function useCreateFeedback() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (
      data: TrainingFeedbackCreate
    ): Promise<TrainingFeedbackCreate> => TrainingFeedbackService.create(data),
    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-feedback-created-successfully")}</Text>
      )
      router.push(routes.hr.trainingFeedbacks)
    },
    onError: (err: AxiosError) => {
      if (err?.response?.data) {
        toast.error(<Text as="b">{t("form-something-went-wrong")}</Text>)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [FEEDBACK_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateFeedback() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: TrainingFeedbackCreate) =>
      TrainingFeedbackService.update(data),
    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-feedback-updated-successfully")}</Text>
      )
      router.push(routes.hr.trainingFeedbacks)
    },
    onError: (err: AxiosError) => {
      if (err?.response?.data) {
        toast.error(<Text as="b">{t("form-something-went-wrong")}</Text>)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [FEEDBACK_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useDeleteFeedback() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => TrainingFeedbackService.delete(id),
    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-feedback-deleted-successfully")}</Text>
      )
    },
    onError: (err: AxiosError) => {
      if (err?.response?.data) {
        toast.error(<Text as="b">{t("form-can-not-delete")}</Text>)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [FEEDBACK_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeleteFeedbacks() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (ids: number[]) => TrainingFeedbackService.bulkDelete(ids),
    onSuccess: () => {
      toast.success(<Text as="b">{t("form-selected-feedbacks-deleted")}</Text>)
    },
    onError: (err: AxiosError) => {
      if (err?.response?.data) {
        toast.error(<Text as="b">{t("form-can-not-delete")}</Text>)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [FEEDBACK_KEYS.all],
        exact: false,
      })
    },
  })
}
