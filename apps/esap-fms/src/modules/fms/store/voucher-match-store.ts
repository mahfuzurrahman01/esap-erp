import { atom } from "jotai"

import { JournalEntryList } from "../types/journal-entry"
import { PaymentList } from "../types/payment"

export interface VoucherMatchItem {
  id: number | string
  documentType: string
  documentNumber: string
  referenceDate: string
  code: string
  amount: number
  referenceNumber: string
  sourceType: "journal" | "payment"
  originalData: JournalEntryList | PaymentList
}

export const voucherMatchListAtom = atom<VoucherMatchItem[]>([])

export const transformJournalEntry = (
  entry: JournalEntryList
): VoucherMatchItem => ({
  id: entry.id || "",
  documentType: "Journal Entry",
  documentNumber: entry.journalNo || "",
  referenceDate: entry.postingDate,
  code: entry.referenceNo || "",
  amount: entry.totalCredit || 0,
  referenceNumber: entry.referenceNo || "",
  sourceType: "journal",
  originalData: entry,
})

export const transformPayment = (payment: PaymentList): VoucherMatchItem => ({
  id: payment.id || "",
  documentType: "Payment Entry",
  documentNumber: payment.paymentNo || "",
  referenceDate: payment.postingDate || "",
  code: payment.paymentNo || "",
  amount: payment.paymentAmount || 0,
  referenceNumber: payment.referenceNumber || "",
  sourceType: "payment",
  originalData: payment,
})
