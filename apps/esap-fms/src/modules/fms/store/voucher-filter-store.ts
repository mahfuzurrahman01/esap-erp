import { atom } from "jotai"

import { voucherMatchListAtom } from "./voucher-match-store"

export interface VoucherFilterState {
  showJournalEntry: boolean
  showPaymentEntry: boolean
  showBankTransaction: boolean
  showExactAmount: boolean
}

export const voucherFilterAtom = atom<VoucherFilterState>({
  showJournalEntry: true,
  showPaymentEntry: true,
  showBankTransaction: true,
  showExactAmount: true,
})

export const filteredVoucherListAtom = atom((get) => {
  const filters = get(voucherFilterAtom)
  const voucherList = get(voucherMatchListAtom)

  if (
    !filters.showJournalEntry &&
    !filters.showPaymentEntry &&
    !filters.showBankTransaction
  ) {
    return []
  }

  return voucherList.filter((item) => {
    if (item.sourceType === "journal" && filters.showJournalEntry) {
      return true
    }
    if (item.sourceType === "payment" && filters.showPaymentEntry) {
      return true
    }
    // Add payment entry condition when implemented
    return false
  })
})
