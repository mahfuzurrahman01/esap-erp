import { z } from "zod";
import { messages } from "@/config/messages";

export const productSchema = z
  .object({
    productCode: z.string().min(1, messages.productCodeIsRequired),
    productName: z.string().min(1, messages.productNameIsRequired),
    productCategoryId: z.number().min(1, messages.productCategoryIsRequired),
    productType: z.string().min(1, messages.productTypeIsRequired),
    cost: z.number().optional(),
    isFixedAsset: z.boolean().optional(),
    assetCategoryId: z.number().optional(),
    purchasePrice: z.number().optional(),
    sellingPrice: z.number().optional(),
    purchaseTax: z.number().optional(),
    salesTax: z.number().optional(),
    discount: z.number().optional(),
    companyId: z.number().min(1, messages.companyIsRequired),
    description: z.string().default("").optional(),
    avatarFile: z.any().nullable().optional(),
    status: z.boolean().optional(),
    itemUnitId: z.number().min(1, messages.itemUnitIsRequired),
  })
  .refine(
    (data) => {
      if (data.productType !== "good-finished") return true
      if (!data.cost || !data.sellingPrice) return true
      return data.cost < data.sellingPrice
    },
    {
      message: messages.costMustBeLessThanSellingPrice,
      path: ["cost"],
    }
  )
  .refine(
    (data) => {
      if (data.productType !== "good-finished") return true
      if (!data.cost || !data.sellingPrice) return true
      return data.sellingPrice > data.cost
    },
    {
      message: messages.sellingPriceMustNotBeLessThanCost,
      path: ["sellingPrice"],
    }
  )
  .refine(
    (data) => {
      if (data.productType !== "raw-materials") return true
      if (!data.purchasePrice || !data.sellingPrice) return true
      return data.purchasePrice < data.sellingPrice
    },
    {
      message: messages.sellingPriceMustBeGreaterThanPurchasePrice,
      path: ["purchasePrice"],
    }
  )
  .refine(
    (data) => {
      if (data.productType !== "raw-materials") return true
      if (!data.purchasePrice || !data.sellingPrice) return true
      return data.purchasePrice <= data.sellingPrice
    },
    {
      message: messages.sellingPriceMustBeGreaterThanPurchasePrice,
      path: ["sellingPrice"],
    }
  )

export type Product = z.infer<typeof productSchema>