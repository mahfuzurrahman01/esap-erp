import { atom } from "jotai"

export interface AmountAllocation {
  totalAllocatedAmount: number
  totalUnAllocatedAmount: number
}

// Base atom for total allocated amount
export const totalAllocatedAmountAtom = atom<number>(0)

// Base atom for amount
export const amountAtom = atom<number>(0)

// Derived atom for total unallocated amount
export const totalUnAllocatedAmountAtom = atom((get) => {
  const amount = get(amountAtom)
  const totalAllocatedAmount = get(totalAllocatedAmountAtom)
  return amount - totalAllocatedAmount
})

// Derived atom for total amount allocation state
export const amountAllocationAtom = atom((get) => ({
  totalAllocatedAmount: get(totalAllocatedAmountAtom),
  totalUnAllocatedAmount: get(totalUnAllocatedAmountAtom),
}))
