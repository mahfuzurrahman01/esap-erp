export interface BankReconciliationQueryOptions {
  companyId?: number
  bankAccountId?: number
  fromDate?: string
  toDate?: string
}

export interface BankTransaction {
  id: number
  bankTransactionCode: string
  transactionDate: string
  transactionType: string
  amount: number
  description: string
  totalAllocatedAmount: number
  totalUnAllocatedAmount: number
  actions?: string
}

export interface BankReconciliation {
  closingBalanceAsPerERP: number
  transactions: BankTransaction[]
}

export interface BankReconciliationList {
  id?: number
  bankName: string
  bankWebsite?: string
  swiftCode?: string
  actions?: string
}

export interface ReconciliationUpdatePayload {
  paymentType: string
  paymentCode: string
  allocatedAmount: number
}

export interface UnreconciledPaymentQueryOptions {
  companyId: number
  companyBankAccountId: number
}

export interface UnreconciledPayment {
  id: number
  paymentNo: string
  postingDate: string
  transactionType: string
  partyType: string
  partyId: string
  partyName: string
  companyId: number
  modeOfPaymentId: number
  partyBankAccountId: number
  companyBankAccountId: number
  accountPaidFromId: number
  accountPaidToId: number
  fromCurrencyId: number
  toCurrencyId: number
  paymentAmount: number
  totalAllocationAmount: number
  unallocatedAmount: number
  differentAmount: number
  totalTax: number
  referenceNumber: string
  referenceDate: string
  paymentStatus: string
  paymentReferences: any[]
  paymentTaxCharges: any[]
  paymentDeductionAndLosses: any[]
  createdDate: string
  updatedDate: string
}
