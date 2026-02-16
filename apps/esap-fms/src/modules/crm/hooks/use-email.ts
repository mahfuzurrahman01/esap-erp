"use client"
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import toast from "react-hot-toast"

import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/config/constants"
import {
  createQueryKeys,
} from "@/server/service/query-config"
import { email } from "../service/email.service"
import { EmailPaginator } from "../types/email"


export const Email_KEYS = createQueryKeys("Email")

export function useCreateEmail() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: any): Promise<any> => email.create(data),
    onMutate: async (newEmail) => {
      await queryClient.cancelQueries({
        queryKey: [Email_KEYS.all],
        exact: false,
      })

      const queryKey = [
        Email_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousCountries =
        queryClient.getQueryData<EmailPaginator>(queryKey)

      queryClient.setQueryData<EmailPaginator>(queryKey, (old: any) => {
        if (!old)
          return {
            data: [newEmail],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [...old.data, { ...newEmail, id: Date.now() }],
          count: old.count + 1,
        }
      })

      return { previousCountries }
    },
    onSuccess: () => {
      toast.success(t("form-email-send-successfully"))
    },
    onError: (err, newEmail, context) => {
      toast.error(t("form-failed-to-send-email"))
      if (context?.previousCountries) {
        const queryKey = [
          Email_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousCountries)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [Email_KEYS.all],
        exact: false,
      })
    },
  })
}
