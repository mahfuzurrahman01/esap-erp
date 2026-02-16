import { ApiEndpoint } from "@/server/client"
import httpClient from "@/utils/axios"
import { EmailList } from "../types/email"

export const email = {
  create: (input: EmailList) =>
    httpClient.post<EmailList>(ApiEndpoint.crm.email, input, true),
}
