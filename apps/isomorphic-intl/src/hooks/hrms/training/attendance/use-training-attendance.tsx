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

import { QUERY_KEYS } from "@/server/service/hrms/hrms-query-keys.constants"
import { TrainingAttendanceService } from "@/server/service/hrms/training/training-attendance.service"
import { createQueryKeys } from "@/server/service/query-config"
import {
  TrainingAttendance,
  TrainingAttendanceCreateInput,
  TrainingAttendanceUpdateInput,
} from "@/types/hrms/training/training-attendance-type"
import { TrainingAttendanceQueryOptions } from "@/types/hrms/training/training-attendance-type"
import { TrainingAttendanceDataResponse } from "@/types/hrms/training/training-attendance-type"

const ATTENDANCE_KEYS = createQueryKeys(QUERY_KEYS.trainingAttendanceList)

export function useTrainingAttendanceList(
  options?: Partial<TrainingAttendanceQueryOptions>
) {
  const queryKey = [ATTENDANCE_KEYS.all, options]

  return useQuery<TrainingAttendanceDataResponse, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return TrainingAttendanceService.all(
        Object.assign({}, queryKey[1], pageParam)
      )
    },
    placeholderData: keepPreviousData,
  })
}

export function useTrainingAttendanceById(id: number) {
  return useQuery<TrainingAttendance>({
    queryKey: [QUERY_KEYS.trainingAttendance, id],
    queryFn: () => TrainingAttendanceService.get(id),
    enabled: !!id,
  })
}

export function useCreateTrainingAttendance() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (
      data: TrainingAttendanceCreateInput
    ): Promise<TrainingAttendance> => TrainingAttendanceService.create(data),
    onSuccess: (_, variables) => {
      toast.success(
        <Text as="b">{t("form-attendance-created-successfully")}</Text>
      )
      queryClient.invalidateQueries({
        queryKey: [ATTENDANCE_KEYS.all],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.trainingAttendance, variables.sessionId],
      })
    },
    onError: (err: AxiosError) => {
      if (err?.response?.data) {
        toast.error(<Text as="b">{t("form-something-went-wrong")}</Text>)
      }
    },
  })
}

export function useUpdateTrainingAttendance() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: TrainingAttendance) =>
      TrainingAttendanceService.update(data),
    onSuccess: (_, variables) => {
      toast.success(
        <Text as="b">{t("form-attendance-updated-successfully")}</Text>
      )
      queryClient.invalidateQueries({
        queryKey: [ATTENDANCE_KEYS.all],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.trainingAttendance, variables.sessionId],
      })
    },
    onError: (err: AxiosError) => {
      if (err?.response?.data) {
        toast.error(<Text as="b">{t("form-something-went-wrong")}</Text>)
      }
    },
  })
}

export function useDeleteTrainingAttendance() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => TrainingAttendanceService.delete(id),
    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-attendance-deleted-successfully")}</Text>
      )
    },
    onError: (err: AxiosError) => {
      if (err?.response?.data) {
        toast.error(<Text as="b">{t("form-can-not-delete")}</Text>)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [ATTENDANCE_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeleteTrainingAttendances() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (ids: number[]) => TrainingAttendanceService.bulkDelete(ids),
    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-selected-attendances-deleted")}</Text>
      )
    },
    onError: (err: AxiosError) => {
      if (err?.response?.data) {
        toast.error(<Text as="b">{t("form-can-not-delete")}</Text>)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [ATTENDANCE_KEYS.all],
        exact: false,
      })
    },
  })
}
