import { SendEmailTypes } from "@/modules/scm/types/procurement/requisition/send-email-types"
import { ApiEndpoint } from "@/server/client"
import HttpClient from "@/utils/axios"

export const SendEmailService = {
  send: (input: SendEmailTypes) =>
    HttpClient.post<SendEmailTypes>(ApiEndpoint.scm.sendByEmail, input, true),
}
