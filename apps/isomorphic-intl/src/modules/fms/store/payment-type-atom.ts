import { atom } from "jotai"

export type PaymentType = "Pay" | "Receive" | "Internal Transfer"

export const selectedPaymentTypeAtom = atom<PaymentType | null>(null)
