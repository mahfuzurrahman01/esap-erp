"use client"

import { atom, useAtom } from "jotai"

import { DEFAULT_PURCHASE_INVOICE_TAX_AND_CHARGES } from "@/modules/scm/constants/purchase-invoice-constants"
import { PurchaseTaxAndCharges } from "@/modules/scm/types/procurement/invoice/invoice-types"

export const paymentTaxChargesAtom = atom<PurchaseTaxAndCharges[]>([])

export const useTaxCharges = () => {
  const [taxCharges, setTaxCharges] = useAtom<PurchaseTaxAndCharges[]>(paymentTaxChargesAtom)

  const handleTaxChargeChange = (index: number, field: string, value: any) => {
    setTaxCharges((prev) => {
      const updated = [...prev]
      updated[index] = { ...updated[index], [field]: value }
      return updated
    })
  }

  const handleTaxChargeDelete = (index: number) => {
    setTaxCharges((prev) => prev.filter((_, i) => i !== index))
  }

  const handleTaxChargeAdd = () => {
    setTaxCharges((prev) => [
      ...prev,
      {
        ...DEFAULT_PURCHASE_INVOICE_TAX_AND_CHARGES,
        // invoiceBillId: invoiceBillId || 0,
      },
    ])
  }

  return {
    taxCharges,
    setTaxCharges,
    handleTaxChargeChange,
    handleTaxChargeDelete,
    handleTaxChargeAdd,
  }
}
