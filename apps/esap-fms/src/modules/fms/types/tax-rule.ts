import { CompanyList, PaginationResponse, QueryOptions, TaxCategoryList } from "./index"

export interface TaxRuleQueryOptions extends QueryOptions {
  orderBy?: string
  sortedBy?: string
}

export interface TaxRuleList {
  id?: number
  serialNumber?: string
  ruleType: string
  taxTemplateId: number
  taxTemplateName?: string
  customerId: string
  customerName?: string
  supplierId?: number
  supplierName?: string
  productId?: number
  productName?: string
  taxCategory?: TaxCategoryList
  taxCategoryId: number
  company?: CompanyList
  companyId: number
  validFrom: string
  validTo: string
  billingStreet?: string
  billingHouse?: string
  billingZip?: string
  billingCity?: string
  billingState?: string
  billingCountryId?: number
  shippingStreet?: string
  shippingHouse?: string
  shippingZip?: string
  shippingCity?: string
  shippingState?: string
  shippingCountryId?: number
  actions?: string
}

export interface TaxRulePaginator extends PaginationResponse<TaxRuleList> {}
