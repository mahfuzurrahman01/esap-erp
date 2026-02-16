"use client";

import { atom } from "jotai";



import { TaxType } from "@/modules/fms/store/tax-type-atom";



import { DEFAULT_PURCHASE_INVOICE_VALUES } from "../constants/purchase-invoice-constants";
import { DEFAULT_PURCHASED_ORDER_VALUES } from "../constants/purchase-order-constants";
import { InvoiceForm } from "../types/procurement/invoice/invoice-types";
import { PurchaseOrderItemRow, PurchasedOrderForm } from "../types/procurement/purchased-order/purchased-order-types";
import { advanceAmount, discountAmountAtom, discountPercentageAtom, netTotalAmountAtom, paymentAmountAtom, writeOffAmountAtom } from "./global-store-state";
import { calculatedGrandTotalAtom, taxRowsAtom } from "./purchase-order";





export const invoiceAtom = atom<InvoiceForm>(DEFAULT_PURCHASE_INVOICE_VALUES)


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
  totalAdvance: number
  paymentAmount: number
  netTotalAmount: number
  outstandingAmount: number
}

export const additionalDiscountAtom = atom<AdditionalDiscount>({
  applyOn: "",
  amount: 0,
  percentage: 0,
})

export const advancedPaymentsAtom = atom<AdvancedPaymentsRow[]>([])

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
  const discountAmount = get(discountAmountAtom)
  return Math.max(0, Number((grandTotal - discountAmount).toFixed(2)))
})

// Calculate outstanding amount (net total - advance payments)
export const outstandingAmountAtom = atom((get) => {
  const netTotal = get(netTotalAmountAtom)
  const advancedPayments = get(advanceAmount)
  return Number((netTotal - advancedPayments).toFixed(2))
})

export const paymentAllocationAtom = atom((get) => ({
  totalAdvance: get(advanceAmount),
  paymentAmount: get(paymentAmountAtom),
  netTotal: get(calculatedNetTotalAtom),
  outstandingAmount: get(outstandingAmountAtom),
}))

// export const formSyncAtom = atom(null, (get, set, setValue: any) => {
//   const allocation = get(paymentAllocationAtom)

//   // setValue("netTotalAmount", allocation.netTotal)
//   setValue("outstandingAmount", allocation.outstandingAmount)
//   setValue("orderAmount", allocation.paymentAmount)
//   setValue("totalAdvance", allocation.totalAdvance)
// })
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