import { z } from "zod"

import { messages } from "@/config/messages"

export const paymentRequestFormSchema = z.object({
  id: z.union([z.number(), z.string(), z.null()]).optional(),
  paymentRequestSerialNumber: z.string().optional(),
  paymentRequestType: z
    .string()
    .min(1, { message: messages.paymentTypeRequired }),
  companyId: z.number().min(1, { message: messages.companyRequired }),
  companyName: z.string().optional(),
  transactionDate: z
    .string()
    .min(1, { message: messages.transactionDateRequired }),
  modeOfPaymentId: z.number().min(1, { message: messages.thisFieldIsRequired }),
  modeOfPayment: z.string().optional(),
  partyType: z.string().min(1, { message: messages.thisFieldIsRequired }),
  partyId: z.union([z.number(), z.string()]).optional(),
  partyName: z.string().optional(),
  referenceType: z.string().optional(),
  referenceNumber: z.string().optional(),
  amount: z.number().min(0.01, { message: messages.amountRequired }),
  outstandingAmount: z.union([z.number(), z.null()]).optional(),
  partyAccountCurrencyId: z
    .number()
    .min(1, { message: messages.currencyRequired }),
  partyAccountCurrencyName: z.string().optional(),
  transactionCurrencyId: z
    .number()
    .min(1, { message: messages.currencyRequired }),
  transactionCurrencyName: z.string().optional(),
  bankAccountId: z.number().min(1, { message: messages.thisFieldIsRequired }),
  bankName: z.string().min(1, { message: messages.thisFieldIsRequired }),
  bankAccountNumber: z
    .string()
    .min(1, { message: messages.thisFieldIsRequired }),
  paymentStatusId: z.union([z.number(), z.null()]).optional(),
  paymentStatusName: z.string().optional(),
  description: z.union([z.string(), z.null()]).optional(),
  comments: z.union([z.string(), z.null()]).optional(),
  actions: z.string().optional(),
})

export type PaymentRequestFormInput = z.infer<typeof paymentRequestFormSchema>
