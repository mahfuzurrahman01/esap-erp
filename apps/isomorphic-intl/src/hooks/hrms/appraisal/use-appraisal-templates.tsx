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
import { AppraisalTemplateService } from "@/server/service/hrms/appraisal/appraisal-template.service"
import { QUERY_KEYS } from "@/server/service/hrms/hrms-query-keys.constants"
import { createQueryKeys } from "@/server/service/query-config"
import {
  AppraisalTemplate,
  AppraisalTemplateDataResponse,
  AppraisalTemplateQueryOptions,
} from "@/types/hrms/appraisal/appraisal-templates.types"

const APPRAISAL_TEMPLATE_KEYS = createQueryKeys(
  QUERY_KEYS.appraisalTemplateList
)

export function useAppraisalTemplateList(
  options?: Partial<AppraisalTemplateQueryOptions>
) {
  const queryKey = [APPRAISAL_TEMPLATE_KEYS.all, options]

  return useQuery<AppraisalTemplateDataResponse, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return AppraisalTemplateService.all(
        Object.assign({}, queryKey[1], pageParam)
      )
    },
    placeholderData: keepPreviousData,
  })
}

export function useAppraisalTemplateById(id: number) {
  return useQuery<AppraisalTemplate>({
    queryKey: [QUERY_KEYS.appraisalTemplate, id],
    queryFn: () => AppraisalTemplateService.get(id),
    enabled: !!id,
  })
}

export function useCreateAppraisalTemplate() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: AppraisalTemplate): Promise<AppraisalTemplate> =>
      AppraisalTemplateService.create(data),
    onSuccess: () => {
      toast.success(<Text as="b">{t("form-appraisal-template-created")}</Text>)
      router.push(routes.hr.appraisalTemplate)
    },
    onError: (err: AxiosError) => {
      if (err?.response?.data) {
        toast.error(<Text as="b">{t("form-something-went-wrong")}</Text>)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [APPRAISAL_TEMPLATE_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateAppraisalTemplate() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: AppraisalTemplate) =>
      AppraisalTemplateService.update(data),
    onSuccess: () => {
      toast.success(<Text as="b">{t("form-appraisal-template-updated")}</Text>)
      router.push(routes.hr.appraisalTemplate)
    },
    onError: (err: AxiosError) => {
      if (err?.response?.data) {
        toast.error(<Text as="b">{t("form-something-went-wrong")}</Text>)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [APPRAISAL_TEMPLATE_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useDeleteAppraisalTemplate() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => AppraisalTemplateService.delete(id),
    onSuccess: () => {
      toast.success(<Text as="b">{t("form-appraisal-template-deleted")}</Text>)
    },
    onError: (err: AxiosError) => {
      if (err?.response?.data) {
        toast.error(<Text as="b">{t("form-can-not-delete")}</Text>)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [APPRAISAL_TEMPLATE_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeleteAppraisalTemplates() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (ids: number[]) => AppraisalTemplateService.bulkDelete(ids),
    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-selected-appraisal-templates-deleted")}</Text>
      )
    },
    onError: (err: AxiosError) => {
      if (err?.response?.data) {
        toast.error(<Text as="b">{t("form-can-not-delete")}</Text>)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [APPRAISAL_TEMPLATE_KEYS.all],
        exact: false,
      })
    },
  })
}
