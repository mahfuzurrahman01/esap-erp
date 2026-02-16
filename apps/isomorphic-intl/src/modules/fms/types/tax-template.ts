import { CompanyList, PaginationResponse, QueryOptions, TaxCategoryList } from "./index"

export interface TaxTemplateQueryOptions extends QueryOptions {
  orderBy?: string
  sort?: string
}

export interface TaxTemplateList {
  id?: number
  taxTemplateName: string
  taxTemplateTypeId?: number
  taxTemplateTypeName?: string | null
  templateType?: string | null
  taxCategory?: TaxCategoryList
  taxCategoryId?: number | undefined
  companyId?: number
  company?: CompanyList
  companyName?: string | null
  isActive?: boolean
  taxTemplateDetails: TaxTemplateDetail[]
  action?: string
}

export interface TaxTemplateDetail {
  id?: number
  taxTemplateId?: number
  taxType?: string
  taxTypeName?: string | null
  chartOfAccountId: number
  taxRate?: number
  taxAmount?: number
}

export interface TaxTemplatePaginator
  extends PaginationResponse<TaxTemplateList> {}
