"use client"

import { atom, useAtom } from "jotai"

import { DEFAULT_PURCHASE_INVOICE_ADVANCE_PAYMENTS } from "@/modules/scm/constants/purchase-invoice-constants"
import { InvoiceAdvancePayments } from "@/modules/scm/types/procurement/invoice/invoice-types"

export const advancedPaymentsAtom = atom<InvoiceAdvancePayments[]>([])

export const useAdvancedPayments = () => {
  const [advancedPayments, setAdvancedPayments] =
    useAtom<InvoiceAdvancePayments[]>(advancedPaymentsAtom)

  const handleAdvancedPaymentChange = (
    index: number,
    field: string,
    value: any
  ) => {
    // setAdvancedPayments((prev) => {
    //   const updated = [...prev]
    //   updated[index] = {
    //     ...updated[index],
    //     [field]: field === "advanceAmount" ? parseFloat(value) || 0 : value,
    //   }
    //   if (field === "advanceAmount") {
    //     updated[index].allocatedAmount = updated[index].advanceAmount || 0
    //   }
    //   return updated
    // })
    setAdvancedPayments((prev) => {
      const updated = [...prev]
      updated[index] = { ...updated[index], [field]: value }
      return updated
    })
  }

  const handleAdvancedPaymentDelete = (index: number) => {
    setAdvancedPayments((prev) => prev.filter((_, i) => i !== index))
  }

  const handleAdvancedPaymentAdd = (invoiceBillId?: number) => {
    setAdvancedPayments((prev) => [
      ...prev,
      {
        ...DEFAULT_PURCHASE_INVOICE_ADVANCE_PAYMENTS,
        // invoiceBillId: invoiceBillId || 0,
      },
    ])
  }

  return {
    advancedPayments,
    setAdvancedPayments,
    handleAdvancedPaymentChange,
    handleAdvancedPaymentDelete,
    handleAdvancedPaymentAdd,
  }
}
