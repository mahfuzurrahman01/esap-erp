import { z } from "zod"

import { messages } from "@/config/messages"

const bankTransactionDetailSchema = z.object({
  id: z.number().optional(),
  bankTransactionId: z.number().optional(),
  paymentType: z.string().optional().nullable(),
  paymentCode: z.string().optional().nullable(),
  allocatedAmount: z.number().optional().nullable(),
})

export const bankTransactionFormSchema = z.object({
  id: z.number().optional(),
  bankTransactionCode: z.string().optional(),
  bankAccountId: z.number().min(1, { message: messages.bankAccountRequired }),
  bankAccount: z
    .object({
      bankAccountName: z.string().optional().nullable(),
    })
    .optional(),
  transactionDate: z
    .string()
    .min(1, { message: messages.transactionDateRequired }),
  companyId: z.number().min(1, { message: messages.companyRequired }),
  company: z
    .object({
      companyName: z.string().optional().nullable(),
    })
    .optional(),
  transactionType: z.string().optional(),
  amount: z.number().min(1, { message: messages.amountRequired }),
  currencyId: z.number().min(1, { message: messages.currencyRequired }),
  currency: z
    .object({
      currencyName: z.string().optional().nullable(),
    })
    .optional(),
  referenceNumber: z.string().optional(),
  description: z.union([z.string(), z.null()]).optional(),
  totalAllocatedAmount: z.union([z.string(), z.number()]).optional().nullable(),
  totalUnAllocatedAmount: z
    .union([z.string(), z.number()])
    .optional()
    .nullable(),
  partyType: z.string().optional().nullable(),
  partyName: z.union([z.string(), z.number()]).optional(),
  partyAccountNumber: z.string().optional().nullable(),
  partyIBAN: z.union([z.string(), z.null()]).optional(),
  paymentEntries: z.array(bankTransactionDetailSchema).optional(),
})

export type BankTransactionFormInput = z.infer<typeof bankTransactionFormSchema>

export type BankTransactionDetail = z.infer<typeof bankTransactionDetailSchema>
