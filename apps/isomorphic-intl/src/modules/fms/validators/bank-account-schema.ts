import { z } from "zod"

import { messages } from "@/config/messages"

export const bankAccountFormSchema = z.object({
  id: z.number().optional(),
  accountName: z
    .string()
    .min(1, { message: messages.bankAccountNameIsRequired }),
  chartOfAccountId: z.number().optional().nullable(),
  bankAccountTypeId: z.number().optional(),
  bankAccountTypeName: z.string().optional(),
  bankId: z.number().min(1, { message: messages.bankIdIsRequired }),
  bankName: z.string().optional(),
  companyId: z.number().optional().nullable(),
  accountNumber: z.string().optional(),
  swiftNumber: z.union([z.string(), z.null()]).optional(),
  iban: z.string().optional(),
  partyType: z.any().optional(),
  supplierId: z.number().optional(),
  supplierName: z.string().optional(),
  customerId: z.string().optional(),
  currencyId: z.number().min(1, { message: messages.currencyIdIsRequired }),
  customerName: z.string().optional(),
  employeeId: z.number().optional(),
  employeeName: z.string().optional(),
  isActive: z.boolean().optional(),
  isCompanyAccount: z.boolean().optional().nullable(),
})

export type BankAccountFormInput = z.infer<typeof bankAccountFormSchema>
