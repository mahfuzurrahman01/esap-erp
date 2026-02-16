import { QueryOptions } from "./index"

export interface GeneralLedgerQueryOptions extends QueryOptions {
  companyId?: number | string
  startDate?: string
  endDate?: string
  voucherNumber?: string
}

export interface GeneralLedgerEntry {
  postingDate?: string
  account: string
  debit: number
  credit: number
  balance: number
  voucherType?: string
  voucherNo?: string
}

// The API returns a direct array of entries
export type GeneralLedgerResponse = GeneralLedgerEntry[]
