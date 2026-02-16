import { z } from "zod"

export const bankStatementDetailImportSchema = z.object({
  bankStatementId: z.number().optional(),
  transactionDate: z.string().optional(),
  deposit: z.number().optional(),
  withdraw: z.number().optional(),
  referenceNumber: z.string().optional(),
})

export const bankStatementImportSchema = z.object({
  id: z.number().optional(),
  companyId: z.number().min(1, {
    message: "form-company-id-is-required",
  }),
  companyName: z.string().optional(),
  bankAccountId: z.number().optional(),
  bankAccountName: z.string().optional(),
  bankId: z.number().optional(),
  bankName: z.string().optional(),
  currencyId: z.number().optional(),
  currencyName: z.string().optional(),
  fileUrl: z.string().optional(),
  bsFile: z.string().optional(),
  bankStatementDetails: z.array(bankStatementDetailImportSchema).optional(),
})

export type BankStatementImportFormInput = z.infer<
  typeof bankStatementImportSchema
>
