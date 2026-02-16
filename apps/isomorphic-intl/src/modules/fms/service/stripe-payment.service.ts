import { ApiEndpoint } from "@/server/client"
import HttpClient, { ApiEndpoint as ApiBase } from "@/utils/axios"

import { StripePayment } from "../types/stripe-payment"

export const StripePaymentService = {
  create: (input: StripePayment) =>
    HttpClient.post<StripePayment>(
      ApiEndpoint.fms.createStripePayment,
      input,
      false,
      ApiBase.FMS
    ),
}
