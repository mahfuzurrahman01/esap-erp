import {
  PaymentDeductionAndLoss,
  PaymentReference,
  PaymentTaxAndCharge,
} from "../types/payment"
import { PaymentFormInput } from "../validators/payment-schema"

export const DEFAULT_PAYMENT_VALUES: PaymentFormInput = {
  id: undefined,
  paymentNo: "",
  postingDate: "",
  transactionType: "",
  companyId: 0,
  company: null,
  modeOfPaymentId: 0,
  modeOfPayment: null,
  partyType: "",
  partyId: 0,
  partyName: "",
  companyBankAccountId: null,
  partyBankAccountId: null,
  accountPaidFromId: 0,
  accountPaidToId: 0,
  fromCurrencyId: null,
  toCurrencyId: 0,
  paymentAmount: 0,
  totalAllocationAmount: 0,
  unallocatedAmount: 0,
  differentAmount: 0,
  totalTax: 0,
  referenceNumber: "",
  referenceDate: "",
  paymentStatus: "",
  paymentRequestId: null,
  paymentReferences: [],
  paymentTaxCharges: [],
  paymentDeductionAndLosses: [],
}

export const DEFAULT_PAYMENT_REFERENCE: PaymentReference = {
  id: 0,
  paymentType: "",
  paymentCode: "",
  grandTotal: 0,
  outstandingAmount: 0,
  allocatedAmount: 0,
}

export const DEFAULT_TAX_CHARGE: PaymentTaxAndCharge = {
  id: 0,
  taxType: "",
  accountId: 0,
  chartOfAccount: null,
  taxRate: 0,
  amount: 0,
  total: 0,
}

export const DEFAULT_DEDUCTION_LOSS: PaymentDeductionAndLoss = {
  id: 0,
  accountId: 0,
  chartOfAccount: null,
  costCenterId: 0,
  costCenter: null,
  amount: 0,
}