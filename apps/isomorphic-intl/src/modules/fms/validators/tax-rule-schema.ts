import { z } from "zod"
import { messages } from "@/config/messages"

// form zod validation schema
export const taxRuleFormSchema = z.object({
  id: z.number().optional(),
  serialNumber: z.string().optional(),
  ruleType: z
      .string()
      .min(1, { message: messages.ruleTypeRequired }),
  taxRuleTypeName: z.string().optional(),
  taxTemplateId: z
      .number()
      .min(1, { message: messages.taxTemplateNameRequired }),
  taxTemplateName: z.string().optional(),
  customerId: z.string().optional(),
  customerName: z.string().optional(),
  supplierId: z.number().optional(),
  supplierName: z.union([z.string(), z.null()]).optional(),
  productId: z.number().optional(),
  productName: z.union([z.string(), z.null()]).optional(),
  taxCategoryId: z.number().min(1, { message: messages.taxCategoryNameRequired }),
  taxCategoryName: z.string().optional(),
  companyId: z.number().min(1, { message: messages.companyIdIsRequired }),
  validFrom: z.string().min(1, { message: messages.dateIsRequired }),
  validTo: z.string().min(1, { message: messages.dateIsRequired }),
  actions: z.string().optional(),
})

// generate form types from zod validation schema
export type TaxRuleFormInput = z.infer<typeof taxRuleFormSchema>
