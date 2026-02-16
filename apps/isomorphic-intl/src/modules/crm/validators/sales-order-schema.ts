import { z } from "zod"

import { messages } from "@/config/messages"

const salesOrderEntrySchema = z.object({
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

export const salesOrderFormSchema = z.object({
  id: z.string().optional(),
  customerId: z.string().min(1, messages.thisFieldIsRequired),
  quotationId: z.string().optional(),
  delivaryDate: z.string().optional(),
  salesOrderNo: z.string().optional(),
  sales_order_type: z.string().optional(),
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
  title: z.string().min(1, messages.thisFieldIsRequired),
  description: z.string().optional(),
  postingDate: z.string().optional(),
  currencyId: z.number().min(1, messages.thisFieldIsRequired),
  discountType: z.string().optional(),
  // discountAmount: z.number().optional(),
  subtotal: z.number().optional(),
  discount: z.number().optional(),
  tax: z.number().optional(),
  total: z.number().optional(),
  updateStock: z.any().optional(),
  type: z.string().optional(),
  companyId: z.any().optional(),
  stages: z.any().optional(),
  SalesOrderVatTaxDetailsDTOs: z.array(z.any()).optional(),
  applyAmount: z.string().optional(),
  salesOrderDetails: z.array(salesOrderEntrySchema).optional(),
})

export type SalesOrderFormInput = z.infer<typeof salesOrderFormSchema>
