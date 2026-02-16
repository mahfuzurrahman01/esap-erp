import { atom } from "jotai"

import { selectedPaymentTypeAtom } from "./payment-type-atom"
import { TaxType } from "./tax-type-atom"

export interface PaymentAllocation {
  paymentAmount: number
  allocatedAmount: number
  unallocatedAmount: number
}

// Base atoms for individual values
export const paymentAmountAtom = atom<number>(0)
export const allocatedAmountAtom = atom<number>(0)

// Store for tax calculations
export interface TaxRow {
  taxRate: number
  amount: number
  taxType: TaxType
}

export const taxRowsAtom = atom<TaxRow[]>([])

// Derived atom for total tax calculation
export const totalTaxAtom = atom((get) => {
  const rows = get(taxRowsAtom)
  const paymentAmount = get(paymentAmountAtom)

  return rows.reduce((total, row) => {
    if (!row) return total

    if (row.taxType === "Actual") {
      return total + (row.amount || 0)
    } else if (row.taxType === "On net total") {
      return total + (paymentAmount * (row.taxRate || 0)) / 100
    }
    return total
  }, 0)
})

// Store for deductions calculations
export interface DeductionRow {
  amount: number
  chartOfAccountId?: string | number
  costCenterId?: string | number
}

export const deductionRowsAtom = atom<DeductionRow[]>([])

// Derived atom for total deductions
export const totalDeductionsAtom = atom((get) => {
  const rows = get(deductionRowsAtom)
  return rows.reduce((total, row) => total + (row?.amount || 0), 0)
})

// Derived atom for unallocated amount
export const unallocatedAmountAtom = atom((get) => {
  const paymentAmount = get(paymentAmountAtom)
  const allocatedAmount = get(allocatedAmountAtom)
  const totalDeductions = get(totalDeductionsAtom)
  const selectedPaymentType = get(selectedPaymentTypeAtom)

  // For Receive, add deductions instead of subtracting
  if (selectedPaymentType === "Receive") {
    return paymentAmount - allocatedAmount + totalDeductions
  }

  // For other party types (Supplier, Employee), subtract deductions
  return paymentAmount - allocatedAmount - totalDeductions
})

// Derived atom for total payment allocation state
export const paymentAllocationAtom = atom((get) => ({
  paymentAmount: get(paymentAmountAtom),
  allocatedAmount: get(allocatedAmountAtom),
  unallocatedAmount: get(unallocatedAmountAtom),
}))

// Form sync atoms to handle form state synchronization
export const formSyncAtom = atom(null, (get, set, setValue: any) => {
  const allocation = get(paymentAllocationAtom)
  const tax = get(totalTaxAtom)

  setValue("totalAllocationAmount", allocation.allocatedAmount)
  setValue("unallocatedAmount", allocation.unallocatedAmount)
  setValue("differentAmount", tax || 0)
})

// Sync atoms for tax and deductions
export const taxSyncAtom = atom(
  null,
  (
    get,
    set,
    props: {
      updateData: any
      index: number
      taxRate: number
      amount: number
      total: number
      taxType: TaxType
    }
  ) => {
    const { updateData, index, taxRate, amount, total, taxType } = props

    updateData(index, "taxRate", taxRate)
    updateData(index, "amount", amount)
    updateData(index, "total", total)

    set(taxRowsAtom, (prev) => {
      const newRows = [...prev]
      newRows[index] = {
        ...newRows[index],
        taxRate: taxRate || 0,
        amount: amount || 0,
        taxType,
      }
      return newRows
    })
  }
)

export const deductionSyncAtom = atom(
  null,
  (
    get,
    set,
    props: {
      updateData: any
      index: number
      amount: number
      accountId?: number | string
      costCenterId?: number | string
    }
  ) => {
    const { updateData, index, amount, accountId, costCenterId } = props

    updateData(index, "amount", amount)
    if (accountId !== undefined) {
      updateData(index, "accountId", accountId)
    }
    if (costCenterId !== undefined) {
      updateData(index, "costCenterId", costCenterId)
    }

    set(deductionRowsAtom, (prev) => {
      const newRows = [...prev]
      newRows[index] = {
        ...newRows[index],
        amount: amount || 0,
        ...(accountId !== undefined && { accountId }),
        ...(costCenterId !== undefined && { costCenterId }),
      }
      return newRows
    })
  }
)
