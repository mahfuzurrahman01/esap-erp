"use client"

import { atom } from "jotai"

import { TaxType } from "@/modules/fms/store/tax-type-atom"

import { DEFAULT_PURCHASED_ORDER_VALUES } from "../constants/purchase-order-constants"
import {
  PurchaseOrderItemRow,
  PurchasedOrderForm,
} from "../types/procurement/purchased-order/purchased-order-types"
import {
  advanceAmount,
  discountAmountAtom,
  discountPercentageAtom,
  paymentAmountAtom,
  writeOffAmountAtom,
} from "./global-store-state"

export const purchaseOrderItemRowsAtom = atom<PurchaseOrderItemRow[]>([])

export const purchaseOrderAtom = atom<PurchasedOrderForm>(
  DEFAULT_PURCHASED_ORDER_VALUES
)

export interface TaxRow {
  rate: number
  amount: number
  total: number
  taxType: TaxType | ""
  taxTypeId: number
  taxTypeName: string
  chartOfAccountId: number
  chartOfAccountName: string
}

export interface AdvancedPaymentsRow {
  id: number
  referenceName: string
  remarks: string
  advanceAmount: number
  allocatedAmount: number
}

export interface AdditionalDiscount {
  applyOn: string
  amount: number
  percentage: number
}

export interface PaymentAllocation {
  paymentAmount: number
  netTotalAmount: number
  grandTotalAmount: number
  advancePayments: number
}

export const additionalDiscountAtom = atom<AdditionalDiscount>({
  applyOn: "",
  amount: 0,
  percentage: 0,
})

export const taxRowsAtom = atom<TaxRow[]>([])
export const advancedPaymentsAtom = atom<AdvancedPaymentsRow[]>([])

// Modified totalTaxAtom to persist per purchase order
export const totalTaxAtom = atom((get) => {
  const rows = get(taxRowsAtom)
  const paymentAmount = get(paymentAmountAtom)

  return rows.reduce((total, row) => {
    if (!row) return total

    if (row.taxType === "Actual") {
      return total + (row.amount || 0)
    } else if (row.taxType === "On net total") {
      return total + (paymentAmount * (row.rate || 0)) / 100
    }
    return total
  }, 0)
})

export const calculatedGrandTotalAtom = atom((get) => {
  const paymentAmount = get(paymentAmountAtom)
  const totalTax = get(totalTaxAtom)
  return Number(paymentAmount + totalTax)
})

export const calculatedDiscountAtom = atom((get) => {
  const grandTotal = get(calculatedGrandTotalAtom)
  const discountAmount = get(discountAmountAtom)
  const discountPercentage = get(discountPercentageAtom)

  if (discountPercentage > 0) {
    return Number(((grandTotal * discountPercentage) / 100).toFixed(2))
  }
  return Number(discountAmount.toFixed(2))
})

// Calculate net total independently
export const calculatedNetTotalAtom = atom((get) => {
  const grandTotal = get(calculatedGrandTotalAtom)

  const discountAmount = get(calculatedDiscountAtom)
  return Math.max(0, Number((grandTotal - discountAmount).toFixed(2)))
})

// Calculate outstanding amount (net total - advance payments)
export const outstandingAmountAtom = atom((get) => {
  const netTotal = get(calculatedNetTotalAtom)
  const advancedPayments = get(advanceAmount)
  return Number((netTotal - advancedPayments).toFixed(2))
})

export const paymentAllocationAtom = atom((get) => {
  const paymentAmount = get(paymentAmountAtom)
  const netTotal = get(calculatedNetTotalAtom)
  const grandTotal = get(calculatedGrandTotalAtom)
  return {
    paymentAmount,
    netTotal,
    grandTotal,
  }
})

export const formSyncAtom = atom(null, (get, set, setValue: any) => {
  const allocation = get(paymentAllocationAtom)

  setValue("netTotalAmount", allocation.netTotal)
  setValue("grandTotal", allocation.grandTotal)
  setValue("orderAmount", allocation.paymentAmount)
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
      rate: number
      amount: number
      total: number
      taxType: TaxType | ""
    }
  ) => {
    const { updateData, index, rate, amount, total, taxType } = props

    updateData(index, "rate", rate)
    updateData(index, "amount", amount)
    updateData(index, "total", total)

    set(taxRowsAtom, (prev) => {
      const newRows = [...prev]
      newRows[index] = {
        ...newRows[index],
        rate: rate || 0,
        amount: amount || 0,
        taxType,
      }
      return newRows
    })
  }
)

export const advancePaymentSyncAtom = atom(
  null,
  (
    get,
    set,
    props: {
      updateData: any
      index: number
      advanceAmount: number
      allocatedAmount: number
    }
  ) => {
    const { updateData, index, advanceAmount, allocatedAmount } = props
    updateData(index, "advanceAmount", advanceAmount)
    updateData(index, "allocatedAmount", allocatedAmount)

    set(advancedPaymentsAtom, (prev) => {
      const newRows = [...prev]
      newRows[index] = {
        ...newRows[index],
        advanceAmount,
        allocatedAmount,
      }
      return newRows
    })
  }
)
