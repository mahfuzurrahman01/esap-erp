import {
  BankAccountList,
  CompanyList,
  CurrencyList,
  ModeOfPaymentList,
  PaginationResponse,
} from "./index"

export interface PaymentRequestQueryOptions {
  pageIndex?: number
  pageSize?: number
  search?: string
  sort?: string
}

export interface CreatePaymentRequest {
  paymentRequestType: string
  companyId: number
  transactionDate: string
  modeOfPaymentId: number
  partyType: string
  partyId: string | number
  partyName: string
  referenceType: string
  referenceNumber: string
  amount: number
  transactionCurrencyId: number
  partyAccountCurrencyId: number
  bankAccountId: number
  bankName: string
  bankAccountNumber: string
}

export interface PaymentRequestList {
  id?: number
  paymentRequestNo?: string
  paymentRequestType: string
  companyId: number
  company?: CompanyList | null
  transactionDate: string
  modeOfPaymentId: number
  modeOfPayment?: ModeOfPaymentList | null
  partyType: string
  partyId?: number
  partyName?: string
  referenceType: string
  referenceNumber: string
  amount: number
  outstandingAmount?: number | null
  partyAccountCurrencyId: number
  partyAccountCurrency?: CurrencyList | null
  transactionCurrencyId: number
  transactionCurrency?: CurrencyList | null
  bankAccountId: number
  bankAccount?: BankAccountList | null
  bankName: string
  bankAccountNumber: string
  description?: string | null
  comments?: string | null
  status?: string | null
  actions?: string | null
}

export type PaymentRequestPaginator = PaginationResponse<PaymentRequestList>
