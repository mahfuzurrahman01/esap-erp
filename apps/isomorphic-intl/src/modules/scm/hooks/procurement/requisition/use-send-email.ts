"use client"

import { useRouter } from "next/navigation"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import { toast } from "react-hot-toast"

import { routes } from "@/config/routes"
import { SendEmailService } from "@/modules/scm/service/procurement/requisition/send-email.service"
import { SendEmailTypes } from "@/modules/scm/types/procurement/requisition/send-email-types"
import { createQueryKeys } from "@/server/service/query-config"

export function useSendEmail() {
  const queryClient = useQueryClient()
  const SEND_EMAIL_KEYS = createQueryKeys("send-email")
  const router = useRouter()
  const t = useTranslations("common")

  const sendEmail = useMutation({
    mutationFn: (data: SendEmailTypes) => SendEmailService.send(data),
    onSuccess: () => {
      toast.success(t("text-send-email-success"))
      queryClient.invalidateQueries({ queryKey: [SEND_EMAIL_KEYS.all] })
      router.push(routes.scm.procurement.requisitions.requisitions)
    },
  })

  return {
    sendEmail,
    isLoading: sendEmail.isPending,
  }
}
