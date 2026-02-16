import { z } from "zod"

import { messages } from "@/config/messages"

const paymentReferenceSchema = z.object({
  id: z.number().optional(),
  paymentType: z.string().optional(),
  paymentCode: z.string().optional(),
  grandTotal: z.number().optional(),
  outstandingAmount: z.number().optional(),
  allocatedAmount: z.number().optional(),
})

const paymentTaxAndChargeSchema = z.object({
  id: z.number().optional(),
  taxType: z.enum(["Actual", "On net total"]).optional(),
  accountId: z.number().optional(),
  chartOfAccount: z
    .object({
      id: z.number(),
      accountName: z.string(),
    })
    .nullable()
    .optional(),
  taxRate: z.number().optional(),
  amount: z.number().optional(),
  total: z.number().optional(),
})

const paymentDeductionAndLossSchema = z.object({
  id: z.number().optional(),
  accountId: z.number().optional(),
  chartOfAccount: z
    .object({
      id: z.number(),
      accountName: z.string(),
    })
    .nullable()
    .optional(),
  costCenterId: z.number().optional(),
  costCenter: z
    .object({
      id: z.number(),
      costCenterName: z.string(),
    })
    .nullable()
    .optional(),
  amount: z.number().optional(),
})

export const paymentFormSchema = z.object({
  id: z.number().optional(),
  paymentNo: z.string().optional(),
  postingDate: z.string().min(1, { message: messages.thisFieldIsRequired }),
  transactionType: z.string().min(1, { message: messages.thisFieldIsRequired }),
  companyId: z.number().min(1, { message: messages.thisFieldIsRequired }),
  company: z
    .object({
      id: z.number(),
      companyName: z.string(),
    })
    .nullable()
    .optional(),
  modeOfPaymentId: z.number().min(1, { message: messages.thisFieldIsRequired }),
  modeOfPayment: z
    .object({
      id: z.number(),
      modeOfPaymentName: z.string(),
    })
    .nullable()
    .optional(),
  partyType: z.string().optional(),
  partyId: z.union([z.number(), z.string()]).optional(),
  partyName: z.string().optional(),
  companyBankAccountId: z.number().optional().nullable(),
  partyBankAccountId: z.number().optional().nullable(),
  accountPaidFromId: z.number().min(1, { message: messages.thisFieldIsRequired }).nullable(),
  accountPaidToId: z.number().min(1, { message: messages.thisFieldIsRequired }).nullable(),
  fromCurrencyId: z.union([z.number(), z.null()]).optional(),
  toCurrencyId: z.union([z.number(), z.null()]).optional(),
  paymentAmount: z.union([z.string(), z.number()]).refine(
    (val) => {
      const num = typeof val === "string" ? Number(val) : val
      return num > 0
    },
    { message: messages.thisFieldIsRequired }
  ),
  totalAllocationAmount: z.union([z.string(), z.number()]).optional(),
  unallocatedAmount: z.union([z.string(), z.number()]).optional(),
  differentAmount: z.union([z.string(), z.number()]).optional(),
  totalTax: z.union([z.string(), z.number()]).optional(),
  referenceNumber: z.string().min(1, { message: messages.thisFieldIsRequired }),
  referenceDate: z.string().min(1, { message: messages.thisFieldIsRequired }),
  paymentStatus: z.string().optional().nullable(),
  paymentRequestId: z.union([z.number(), z.null()]).optional(),
  paymentReferences: z.array(paymentReferenceSchema).optional(),
  paymentTaxCharges: z.array(paymentTaxAndChargeSchema).optional(),
  paymentDeductionAndLosses: z.array(paymentDeductionAndLossSchema).optional(),
})

export type PaymentFormInput = z.infer<typeof paymentFormSchema>
export type PaymentReferenceInput = z.infer<typeof paymentReferenceSchema>
export type PaymentTaxAndChargeInput = z.infer<typeof paymentTaxAndChargeSchema>
export type PaymentDeductionAndLossInput = z.infer<
  typeof paymentDeductionAndLossSchema
>
