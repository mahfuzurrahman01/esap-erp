import { z } from "zod"

import { messages } from "@/config/messages"

const salesInvoiceEntrySchema = z.object({
  id: z.string(),
  productId: z.string().optional(),
  quantity: z.number().optional(),
  unit: z.string().optional(),
  unitPrice: z.number().optional(),
  vat: z.number().optional(),
  tax: z.number().optional(),
  discount: z.number().optional(),
  totalPrice: z.number().optional(),
})

export const salesInvoiceFormSchema = z.object({
  id: z.string().optional(),
  customerId: z.string().min(1, messages.thisFieldIsRequired),
  salesOrderId: z.string().optional(),
  dueDate: z.string().optional(),
  invoiceNo: z.string().optional(),
  type: z.string().optional(),
  billingStreet: z.string().optional(),
  billingHouse: z.string().optional(),
  billingCity: z.string().optional(),
  billingState: z.string().optional(),
  billingCountryId: z.any().optional(),
  billingZip: z.string().optional(),
  shippingStreet: z.string().optional(),
  shippingHouse: z.string().optional(),
  shippingCity: z.string().optional(),
  shippingState: z.string().optional(),
  shippingCountryId: z.any().optional(),
  shippingZip: z.string().optional(),
  invoiceDate: z.string().optional(),
  paymentTerms: z.string().optional(),
  currencyId: z.any().optional(),
  discountType: z.string().optional(),
  discountAmount: z.number().optional(),
  subtotal: z.number().optional(),
  discount: z.number().optional(),
  tax: z.number().optional(),
  total: z.number().optional(),
  companyId: z.any().optional(),
  SalesInvoiceVatTaxDetailsDTOs: z.array(z.any()).optional(),
  applyAmount: z.string().optional(),
  salesInvoiceDetails: z.array(salesInvoiceEntrySchema).optional(),
})

export type SalesInvoiceFormInput = z.infer<typeof salesInvoiceFormSchema>
