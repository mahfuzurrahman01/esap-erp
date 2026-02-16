import {
  BankAccountList,
  COAList,
  CompanyList,
  CostCenterList,
  CurrencyList,
  ModeOfPaymentList,
  PaginationResponse,
} from "./index"

export interface PaymentQueryOptions {
  pageIndex?: number
  pageSize?: number
  search?: string
  paymentTypeId?: string | number
  partyTypeId?: string | number
  sort?: string
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

export interface PaymentList {
  id?: number
  paymentNo?: string
  serialNumber?: string
  postingDate?: string
  transactionType?: string
  companyId?: number
  company?: CompanyList | null
  modeOfPaymentId?: number
  modeOfPayment?: ModeOfPaymentList | null
  partyType?: string
  partyId?: number | string
  partyName?: string
  companyBankAccountId?: number | null
  companyBankAccount?: BankAccountList | null
  partyBankAccountId?: number | null
  partyBankAccount?: BankAccountList | null
  accountPaidFromId?: number | null
  accountPaidFrom?: BankAccountList | null
  accountPaidToId?: number | null
  accountPaidTo?: BankAccountList | null
  fromCurrencyId?: number | null
  fromCurrency?: CurrencyList | null
  toCurrencyId?: number | null
  toCurrency?: CurrencyList | null
  paymentAmount?: number
  totalAllocationAmount?: number
  unallocatedAmount?: number
  differentAmount?: number
  totalTax?: number
  referenceNumber?: string
  referenceDate?: string
  paymentStatus?: string | null
  paymentRequestId?: number | null
  paymentReferences?: PaymentReference[]
  paymentTaxCharges?: PaymentTaxAndCharge[]
  paymentDeductionAndLosses?: PaymentDeductionAndLoss[]
  actions?: string
  statusName?: string
  bankAccountName?: string
  paymentTypeName?: string
  companyName?: string
  modeOfPaymentName?: string
  partyBankAccountName?: string
  accountPaidFromName?: string
  accountPaidToName?: string
  fromCurrencyName?: string
  toCurrencyName?: string
  chequeNo?: string
  chequeDate?: string
  amount?: string
}

export type PaymentPaginator = PaginationResponse<PaymentList>
