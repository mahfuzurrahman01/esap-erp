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
import { AppraisalService } from "@/server/service/hrms/appraisal/appraisal.service"
import { QUERY_KEYS } from "@/server/service/hrms/hrms-query-keys.constants"
import { createQueryKeys } from "@/server/service/query-config"
import {
  Appraisal,
  AppraisalDataResponse,
  AppraisalQueryOptions,
} from "@/types/hrms/appraisal/appraisals.types"

const APPRAISAL_KEYS = createQueryKeys(QUERY_KEYS.appraisalList)

export function useAppraisalList(options?: Partial<AppraisalQueryOptions>) {
  const queryKey = [APPRAISAL_KEYS.all, options]

  return useQuery<AppraisalDataResponse, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return AppraisalService.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
  })
}

export function useAppraisalById(id: number) {
  return useQuery<Appraisal>({
    queryKey: [QUERY_KEYS.appraisal, id],
    queryFn: () => AppraisalService.get(id),
    enabled: !!id,
  })
}

export function useCreateAppraisal() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: Appraisal): Promise<Appraisal> =>
      AppraisalService.create(data),
    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-appraisal-created-successfully")}</Text>
      )
      router.push(routes.hr.appraisals)
    },
    onError: (err: AxiosError) => {
      if (err?.response?.data) {
        toast.error(<Text as="b">{t("form-something-went-wrong")}</Text>)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [APPRAISAL_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateAppraisal() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: Appraisal) => AppraisalService.update(data),
    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-appraisal-updated-successfully")}</Text>
      )
      router.push(routes.hr.appraisals)
    },
    onError: (err: AxiosError) => {
      if (err?.response?.data) {
        toast.error(<Text as="b">{t("form-something-went-wrong")}</Text>)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [APPRAISAL_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useDeleteAppraisal() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => AppraisalService.delete(id),
    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-appraisal-deleted-successfully")}</Text>
      )
    },
    onError: (err: AxiosError) => {
      if (err?.response?.data) {
        toast.error(<Text as="b">{t("form-can-not-delete")}</Text>)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [APPRAISAL_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeleteAppraisals() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (ids: number[]) => AppraisalService.bulkDelete(ids),
    onSuccess: () => {
      toast.success(<Text as="b">{t("form-selected-appraisals-deleted")}</Text>)
    },
    onError: (err: AxiosError) => {
      if (err?.response?.data) {
        toast.error(<Text as="b">{t("form-can-not-delete")}</Text>)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [APPRAISAL_KEYS.all],
        exact: false,
      })
    },
  })
}
