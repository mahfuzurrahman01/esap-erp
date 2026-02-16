export interface BankClearanceQueryOptions {
  bankAccountId?: number
  chartOfAccountId?: number
}

export interface BankClearance {
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
  bankClearenceDate?: string
  paymentReferences: any[]
  paymentTaxCharges: any[]
  paymentDeductionAndLosses: any[]
  createdDate: string
  updatedDate: string
}

export interface UpdateBankClearance {
  id: number
  paymentStatus: string
  bankClearenceDate: string
}

export interface UpdateBankClearanceBatch {
  ids: number[]
  paymentStatus: string
  bankClearenceDate: string
}
