import { atom } from "jotai"

export type PartyType = "Supplier" | "Customer" | "Employee"

export const selectedPartyTypeAtom = atom<PartyType | null>(null)
