import {
  COAList,
  CostCenterList,
  PaginationResponse,
} from "./index"

export interface BankAccountSummaryQueryOptions {
  pageIndex?: number
  pageSize?: number
  search?: string
  sort?: string
  StartDate?: string
  EndDate?: string
}

export interface PaymentReference {
  id?: number
  paymentType?: string
  paymentCode?: string
  grandTotal?: number
  outstandingAmount?: number
  allocatedAmount?: number
}

export interface PaymentTaxAndCharge {
  id?: number
  taxType?: string
  accountId?: number
  chartOfAccount?: COAList | null
  taxRate?: number
  amount?: number
  total?: number
}

export interface PaymentDeductionAndLoss {
  id?: number
  accountId?: number
  chartOfAccount?: COAList | null
  costCenterId?: number
  costCenter?: CostCenterList | null
  amount?: number
}

export interface BankAccountSummaryList {
  accountName: string
  accountNumber: number
  accountType: string
  bankName: string
  company: string
  currency: string
  isActive: string
  totalBalance: number
}

export type BankAccountSummaryPaginator = PaginationResponse<BankAccountSummaryList>
