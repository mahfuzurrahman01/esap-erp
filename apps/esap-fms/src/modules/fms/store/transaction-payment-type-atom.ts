import { atom } from "jotai"

export type TransactionPaymentType =
  | "Journal Entry"
  | "Payment Entry"
  | "Bank Transaction"
  | "Purchase Invoice"
  | "Sales Invoice"
  | null

export interface PaymentTypeMap {
  [rowIndex: number]: TransactionPaymentType
}

export const selectedTransactionPaymentTypeAtom = atom<PaymentTypeMap>({})

export type TransactionType = "Internal Transfer" | "Pay" | "Receive"

export const transactionTypeOptions = [
  { value: "Internal Transfer", label: "Internal Transfer" },
  { value: "Pay", label: "Pay" },
  { value: "Receive", label: "Receive" },
] as const

export const selectedTransactionTypeAtom = atom<TransactionType | null>(null)
