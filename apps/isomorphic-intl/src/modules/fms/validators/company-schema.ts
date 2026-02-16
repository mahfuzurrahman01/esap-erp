import * as z from "zod"

import { messages } from "@/config/messages"

// form zod validation schema
export const companySchema = z.object({
  id: z.union([z.number(), z.string(), z.null()]).optional(),
  companyName: z.string().min(1, { message: messages.companyName }),
  countryId: z
    .number({
      required_error: messages.companyCountry,
      invalid_type_error: messages.companyCountry,
    })
    .min(1, { message: messages.companyCountry }),
  currencyId: z.number().optional(),
  abbreviation: z.string().optional(),
  country: z
    .object({
      id: z.number().optional(),
      countryName: z.string().optional(),
      countryCode: z.string().optional(),
      dateFormat: z.string().optional(),
      timeFormat: z.string().optional(),
      timeZone: z.string().optional(),
      createdDate: z.string().optional(),
      updatedDate: z.string().optional(),
    })
    .optional(),
  currency: z
    .object({
      id: z.number().optional(),
      currencyName: z.string().optional(),
      symbol: z.string().optional(),
      fraction: z.string().optional(),
      units: z.string().optional(),
      smallValue: z.string().optional(),
      numberFormat: z.string().optional(),
      isActive: z.boolean().optional(),
      createdDate: z.string().optional(),
      updatedDate: z.string().optional(),
    })
    .optional(),
  logoUrl: z.union([z.string(), z.null()]).optional(),
  currencyName: z.union([z.string(), z.null()]).optional(),
  avatar: z.union([z.string(), z.null()]).optional(),
  isGroup: z.boolean().optional(),
  taxNo: z.union([z.string(), z.number(), z.null()]).optional(),
  domain: z.union([z.string(), z.null()]).optional(),
  dateOfEstablishment: z
    .string()
    .min(1, { message: messages.thisFieldIsRequired }),
  dataOfIncorporation: z.union([z.string(), z.null()]).optional(),
  logo: z.instanceof(File).optional(),
  companyDescription: z.union([z.string(), z.null()]).optional(),
  phoneNumber: z.union([z.string(), z.null()]).optional(),
  email: z.union([z.string(), z.null()]).optional(),
  website: z.union([z.string(), z.null()]).optional(),

  // Banking & Accounting related fields
  defaultBankAccountId: z.union([z.number(), z.null()]).optional(),
  defaultPayableAccountId: z.union([z.number(), z.null()]).optional(),
  defaultCashAccountId: z.union([z.number(), z.null()]).optional(),
  defaultCostOfGoodsSoldAccountId: z.union([z.number(), z.null()]).optional(),
  defaultReceivableAccountId: z.union([z.number(), z.null()]).optional(),
  defaultIncomeAccountId: z.union([z.number(), z.null()]).optional(),
  defaultExpenseAccountId: z.union([z.number(), z.null()]).optional(),
  roundOffAccountId: z.union([z.number(), z.null()]).optional(),
  roundOffCostCenterId: z.union([z.number(), z.null()]).optional(),
  defaultDeferredRevenueAccountId: z.union([z.number(), z.null()]).optional(),
  defaultDeferredExpenseAccountId: z.union([z.number(), z.null()]).optional(),
  writeOffAccount: z.union([z.number(), z.null()]).optional(),
  defaultPaymentDiscountAccountId: z.union([z.number(), z.null()]).optional(),
  exchangeGainLossAccountId: z.union([z.number(), z.null()]).optional(),
  unrealizedGainLossAccountId: z.union([z.number(), z.null()]).optional(),
  defaultCostCenterId: z.union([z.number(), z.null()]).optional(),
  unrealizedProfitLossAccountId: z.union([z.number(), z.null()]).optional(),

  // Depreciation related fields
  accumulatedDepreciationAccount: z.union([z.number(), z.null()]).optional(),
  depreciationExpenseAccount: z.union([z.number(), z.null()]).optional(),
  gainLossAccountOnAssetsDisposal: z.union([z.number(), z.null()]).optional(),
  assetsDepreciationCostCenter: z.union([z.number(), z.null()]).optional(),
  capitalWorkInProgressAccount: z.union([z.number(), z.null()]).optional(),
  assetValuationAccount: z.union([z.number(), z.null()]).optional(),
  assetsReceivedButNotBilledAccount: z.union([z.number(), z.null()]).optional(),

  // Sales & Purchase related fields
  defaultFinanceBook: z.union([z.number(), z.string(), z.null()]).optional(),
  buyingTerms: z.union([z.string(), z.null()]).optional(),
  sellingTerms: z.union([z.string(), z.null()]).optional(),
  monthlySalesTarget: z.union([z.string(), z.number(), z.null()]).optional(),
  warehouseSalesReturn: z.union([z.string(), z.null()]).optional(),
  totalMonthlySales: z.union([z.number(), z.null()]).optional(),
  creditLimit: z.union([z.number(), z.null()]).optional(),

  // Inventory related fields
  isPerpetualInventory: z.union([z.boolean(), z.null()]).optional(),
  isProvisionalAccounting: z.union([z.boolean(), z.null()]).optional(),
  inventoryAccount: z.union([z.string(), z.null()]).optional(),
  stockReceivedButNotBilledAccount: z.union([z.string(), z.null()]).optional(),
  stockAdjustmentAccount: z.union([z.string(), z.null()]).optional(),
  provisionalAccount: z.union([z.string(), z.null()]).optional(),
  expansesIncludeInValuation: z.union([z.string(), z.null()]).optional(),
  inTransitWarehouseAccount: z.union([z.string(), z.null()]).optional(),
  operatingCostAccount: z.union([z.string(), z.null()]).optional(),

  actions: z.union([z.string(), z.null()]).optional(),
})

// generate form types from zod validation schema
export type CompanyFormInput = z.infer<typeof companySchema>
