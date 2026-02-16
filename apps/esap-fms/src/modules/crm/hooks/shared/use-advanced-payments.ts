"use client"

import { useState } from "react"

import { DEFAULT_PURCHASE_INVOICE_ADVANCE_PAYMENTS } from "@/modules/scm/constants/purchase-invoice-constants"
import { InvoiceAdvancePayments } from "@/modules/scm/types/procurement/invoice/invoice-types"

export const useAdvancedPayments = (
  initialPayments: InvoiceAdvancePayments[] = []
) => {
  const [advancedPayments, setAdvancedPayments] = useState<
    InvoiceAdvancePayments[]
  >(
    initialPayments.length > 0
      ? initialPayments
      : [{ ...DEFAULT_PURCHASE_INVOICE_ADVANCE_PAYMENTS, invoiceBillId: 0 }]
  )

  const handleAdvancedPaymentChange = (
    index: number,
    field: string,
    value: any
  ) => {
    setAdvancedPayments((prev) => {
      const updated = [...prev]
      updated[index] = {
        ...updated[index],
        [field]: field === "advanceAmount" ? parseFloat(value) || 0 : value,
      }
      if (field === "advanceAmount") {
        updated[index].allocatedAmount = updated[index].advanceAmount || 0
      }
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
        invoiceBillId: invoiceBillId || 0,
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
