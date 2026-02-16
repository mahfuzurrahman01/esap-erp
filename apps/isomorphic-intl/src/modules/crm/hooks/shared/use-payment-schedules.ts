"use client"

import { useState } from "react"

import { DEFAULT_PURCHASE_INVOICE_ADVANCE_PAYMENTS } from "@/modules/scm/constants/purchase-invoice-constants"
interface PaymentSchedules {
  id?: number
  invoiceBillId?: number
  paymentTerms?: string
  remarks?: string
  advanceAmount?: number
  allocatedAmount?: number
}

export const usePaymentSchedules = (
  initialPayments: PaymentSchedules[] = []
) => {
  const [paymentSchedules, setPaymentSchedules] = useState<PaymentSchedules[]>(
    initialPayments.length > 0 ? initialPayments : [{ ...DEFAULT_PURCHASE_INVOICE_ADVANCE_PAYMENTS, invoiceBillId: 0 }]
  );

  const handlePaymentScheduleChange = (
    index: number,
    field: string,
    value: any
  ) => {
    setPaymentSchedules((prev) => {
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

  const handlePaymentScheduleDelete = (index: number) => {
    setPaymentSchedules((prev) => prev.filter((_, i) => i !== index))
  }

  const handlePaymentScheduleAdd = (invoiceBillId?: number) => {
    setPaymentSchedules((prev) => [
      ...prev,
      {
        ...DEFAULT_PURCHASE_INVOICE_ADVANCE_PAYMENTS,
        invoiceBillId: invoiceBillId || 0,
      },
    ])
  }

  return {
    paymentSchedules,
    setPaymentSchedules,
    handlePaymentScheduleChange,
    handlePaymentScheduleDelete,
    handlePaymentScheduleAdd,
  }
}
