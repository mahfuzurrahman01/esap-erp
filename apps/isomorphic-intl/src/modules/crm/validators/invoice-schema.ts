import { z } from "zod"

const invoiceEntrySchema = z.object({
  id: z.number(),
  product: z.any().optional(),
  quantity: z.any().optional(),
  vat: z.any().optional(),
  tax: z.any().optional(),
  discount: z.any().optional(),
})

export const invoiceFormSchema = z.object({
  id: z.number().optional().default(0),
  sales_order: z.any().optional(),
  customer: z.string().optional(),
  quotation: z.string().optional(),
  invoice_prefix: z.string().optional(),
  invoice_no: z.string().optional(),
  invoice_type: z.string().optional(),
  billing_address: z.string().optional(),
  shipping_address: z.string().optional(),
  title: z.string().optional(),
  invoice_date: z.string().optional(),
  payment_method: z.string().optional(),
  currency: z.string().optional(),
  invoice_due_date: z.string().optional(),
  type: z.string().optional(),
  status: z.string().optional(),
  invoiceDetails: z.array(invoiceEntrySchema).optional(),
})

export type invoiceFormInput = z.infer<typeof invoiceFormSchema>
