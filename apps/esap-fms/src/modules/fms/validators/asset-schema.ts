import { z } from "zod"

import { messages } from "@/config/messages"

export const assetFormSchema = z
  .object({
    id: z.number().optional(),
    assetName: z.string().min(1, { message: messages.thisFieldIsRequired }),
    assetSerialNumber: z.union([z.string(), z.null()]).optional(),
    productId: z.number().min(1, { message: messages.thisFieldIsRequired }),
    productName: z.union([z.string(), z.null()]).optional(),
    companyId: z.number().min(1, { message: messages.thisFieldIsRequired }),
    company: z.any().optional(),
    assetCategoryId: z
      .number()
      .min(1, { message: messages.thisFieldIsRequired }),
    assetCategory: z.any().optional(),
    assetLocationId: z.union([z.number(), z.null()]).optional(),
    assetLocation: z.any().optional(),
    assetOwnerName: z.union([z.string(), z.null()]).optional(),
    maintainerId: z.union([z.number(), z.null()]).optional(),
    maintainerName: z.union([z.string(), z.null()]).optional(),
    departmentId: z.union([z.number(), z.null()]).optional(),
    departmentName: z.union([z.string(), z.null()]).optional(),
    isExistingAsset: z.union([z.boolean(), z.null()]).optional(),
    isCompositeAsset: z.union([z.boolean(), z.null()]).optional(),
    purchaseDate: z.union([z.string(), z.null()]).optional(),
    purchaseReceiptId: z.union([z.number(), z.null()]).optional(),
    purchaseReceiptNumber: z.union([z.string(), z.null()]).optional(),
    purchaseInvoiceId: z.union([z.number(), z.null()]).optional(),
    purchaseInvoiceNo: z.union([z.string(), z.null()]).optional(),
    availableForUseDate: z.union([z.string(), z.null()]),
    grossPurchaseAmount: z.union([z.number(), z.string(), z.null()]),
    assetQuantity: z.union([z.number(), z.string(), z.null()]),
    isCalculatedDepreciation: z.union([z.boolean(), z.null()]).optional(),
    openingAccumulatedDepreciation: z
      .union([z.number(), z.string(), z.null()])
      .optional(),
    openingNumberOfBookDepreciation: z
      .union([z.number(), z.string(), z.null()])
      .optional(),
    isFullyDepreciated: z.union([z.boolean(), z.null()]).optional(),
    financeBookId: z.union([z.number(), z.null()]).optional(),
    financeBookName: z.union([z.string(), z.null()]).optional(),
    depreciationMethod: z.union([z.string(), z.null()]).optional(),
    totalDepreciationPeriod: z
      .union([z.number(), z.string(), z.null()])
      .optional(),
    frequencyOfDepreciation: z
      .union([z.number(), z.string(), z.null()])
      .optional(),
    depreciationStartDate: z.union([z.string(), z.null()]).optional(),
    expectedResidualValue: z
      .union([z.number(), z.string(), z.null()])
      .optional(),
    insurancePolicyNumber: z.union([z.string(), z.null()]).optional(),
    insuranceCompanyName: z.union([z.string(), z.null()]).optional(),
    insurancePolicyStartDate: z.union([z.string(), z.null()]).optional(),
    insurancePolicyEndDate: z.union([z.string(), z.null()]).optional(),
    insuranceAmount: z.union([z.number(), z.string(), z.null()]).optional(),
    isMaintenanceRequired: z.union([z.boolean(), z.null()]).optional(),
    assetStatus: z.union([z.string(), z.null()]).optional(),
    assetImageUrl: z.union([z.string(), z.null()]).optional(),
    assetImageFile: z
      .union([z.instanceof(File), z.string(), z.null()])
      .optional(),
    actions: z.union([z.string(), z.null()]).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.isExistingAsset || data.isCompositeAsset) {
      if (!data.purchaseDate) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Purchase date is required for existing or composite assets",
          path: ["purchaseDate"],
        })
      }
    } else {
      // if (!data.purchaseReceiptId) {
      //   ctx.addIssue({
      //     code: z.ZodIssueCode.custom,
      //     message: "Purchase receipt is required",
      //     path: ["purchaseReceiptId"],
      //   })
      // }
      if (!data.purchaseInvoiceId) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Purchase invoice is required",
          path: ["purchaseInvoiceId"],
        })
      }
    }
  })

export type AssetFormInput = z.infer<typeof assetFormSchema>
