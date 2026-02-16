import { atom } from "jotai"

export type TaxType = "Actual" | "On net total"

export interface TaxTypeMap {
  [rowIndex: number]: TaxType
}

export const selectedTaxTypeAtom = atom<TaxTypeMap>({})
