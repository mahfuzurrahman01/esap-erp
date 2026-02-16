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
import { TrainingProgramService } from "@/server/service/hrms/training/training-program.service"
import { createQueryKeys } from "@/server/service/query-config"
import {
  TrainingProgram,
  TrainingProgramDataResponse,
} from "@/types/hrms/training/training-program-type"
import { TrainingProgramQueryOptions } from "@/types/hrms/training/training-program-type"

const PROGRAM_KEYS = createQueryKeys(QUERY_KEYS.programList)

export function useProgramList(options?: Partial<TrainingProgramQueryOptions>) {
  const queryKey = [PROGRAM_KEYS.all, options]

  return useQuery<TrainingProgramDataResponse, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return TrainingProgramService.all(
        Object.assign({}, queryKey[1], pageParam)
      )
    },
    placeholderData: keepPreviousData,
  })
}

export function useProgramById(id: number) {
  return useQuery<TrainingProgram>({
    queryKey: [QUERY_KEYS.program, id],
    queryFn: () => TrainingProgramService.get(id),
    enabled: !!id,
  })
}

export function useCreateProgram() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: TrainingProgram): Promise<TrainingProgram> =>
      TrainingProgramService.create(data),
    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-program-created-successfully")}</Text>
      )
      router.push(routes.hr.trainingProgram)
    },
    onError: (err: AxiosError) => {
      if (err?.response?.data) {
        toast.error(<Text as="b">{t("form-something-went-wrong")}</Text>)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [PROGRAM_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateProgram() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: TrainingProgram) => TrainingProgramService.update(data),
    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-program-updated-successfully")}</Text>
      )
      router.push(routes.hr.trainingProgram)
    },
    onError: (err: AxiosError) => {
      if (err?.response?.data) {
        toast.error(<Text as="b">{t("form-something-went-wrong")}</Text>)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [PROGRAM_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useDeleteProgram() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => TrainingProgramService.delete(id),
    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-program-deleted-successfully")}</Text>
      )
    },
    onError: (err: AxiosError) => {
      if (err?.response?.data) {
        toast.error(<Text as="b">{t("form-can-not-delete")}</Text>)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [PROGRAM_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeletePrograms() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (ids: number[]) => TrainingProgramService.bulkDelete(ids),
    onSuccess: () => {
      toast.success(<Text as="b">{t("form-selected-program-deleted")}</Text>)
    },
    onError: (err: AxiosError) => {
      if (err?.response?.data) {
        toast.error(<Text as="b">{t("form-can-not-delete")}</Text>)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [PROGRAM_KEYS.all],
        exact: false,
      })
    },
  })
}
