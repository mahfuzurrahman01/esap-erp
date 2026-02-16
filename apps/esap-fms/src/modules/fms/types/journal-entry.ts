import { CompanyList, PaginationResponse, QueryOptions } from "./index"

export interface JournalEntryQueryOptions extends QueryOptions {
  search?: string
  pageIndex?: number
  pageSize?: number
  minAmount?: number | string
  maxAmount?: number | string
  postingDateFrom?: string
  postingDateTo?: string
  journalTypeId?: number | string
  companyId?: number | string
  journalTemplateId?: number | string
  journalNo?: string
  sort?: string
}

export interface JournalEntryList {
  id?: number
  journalNo?: string
  journalTypeId: number
  journalType?: JournalEntryType | null
  postingDate: string
  companyId: number
  company?: CompanyList | null
  journalTemplateId?: number | null
  journalTemplate?: JournalTemplateList | null
  journalDetails: JournalDetail[]
  referenceNo: string | null
  referenceDate: string | null
  totalDebit?: number | null
  totalCredit?: number | null
  createdBy?: number
  updatedBy?: number
  isActive?: boolean
  isDeleted?: boolean
  action?: string
}

export interface JournalDetail {
  id?: number
  chartOfAccountId: number
  debit?: number | null
  credit?: number | null
}

export interface JournalEntryView {
  id?: number
  journalNo?: string
  journalTypeId: number
  journalType?: JournalEntryType | null
  postingDate: string
  companyId: number
  company?: CompanyList | null
  journalTemplateId?: number | null
  journalTemplate?: JournalTemplateList | null
  referenceNo?: string | null
  referenceDate?: string | null
  totalDebit?: number | null
  totalCredit?: number | null
  journalDetails: JournalDetail[]
}

export interface JournalTemplate {
  id?: number
  journalTemplateTitle: string
  companyId: number
  company?: CompanyList | null
  journalTypeId?: number
  journalType?: JournalEntryType | null
  chartOfAccountIds: number[]
  data?: {
    journalTemplateTitle: string
    companyId: number
    journalTypeId?: number
    chartOfAccountIds: number[]
  }
  actions?: string
}

export interface JournalTemplateView {
  id?: number
  journalTemplateTitle: string
  companyId: number
  company?: CompanyList | null
  journalTypeId?: number
  chartOfAccountIds?: number[]
  accounts?: {
    id: number
    chartOfAccountId: number
    accountName: string
    journalTemplateId: string
  }[]
}

export interface JournalTemplateList {
  id?: number
  journalTemplateTitle: string
  company: {
    companyName: string
  }
  journalType: {
    journalTypeName: string
  }
  actions?: string
}

export interface JournalTemplateDetail {
  id?: number
  chartOfAccountId: number
  chartOfAccountName: string
  journalTemplateId?: string
}

export interface JournalEntryTypeQueryOptions extends QueryOptions {
  search?: string
  pageIndex?: number
  pageSize?: number
  orderBy?: string
  sort?: string
}

export interface JournalEntryType {
  id?: number
  journalTypeName: string
  actions?: string
}

export interface JournalEntryPaginator
  extends PaginationResponse<JournalEntryList> {}

export interface JournalEntryTypePaginator
  extends PaginationResponse<JournalEntryType> {}
export interface JournalTemplatePaginator
  extends PaginationResponse<JournalTemplate> {}
