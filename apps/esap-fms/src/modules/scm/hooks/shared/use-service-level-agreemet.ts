"use client"

import { useState } from "react"

import { DEFAULT_SERVICE_LEVEL_AGREEMENT_ITEM_VALUES } from "../../constants/service-level-agreement-constants"
import { serviceLevelAgreements } from "../../types/procurement/supplier/contract-types"

export const useServiceLevelAgreement = (
  initialItems: serviceLevelAgreements[] = []
) => {

  const [serviceLevelAgreement, setServiceLevelAgreement] =
    useState<serviceLevelAgreements[]>(initialItems)

  const handleServiceLevelAgreementChange = (
    index: number,
    field: string,
    value: any
  ) => {
    setServiceLevelAgreement((prev) => {
      const updated = [...prev]
      updated[index] = { ...updated[index], [field]: value }
      return updated
    })
  }

  const handleServiceLevelAgreementDelete = (index: number) => {
    setServiceLevelAgreement((prevItems) =>
      prevItems.filter((_, i) => i !== index)
    )
  }

  const handleServiceLevelAgreementAdd = () => {
    setServiceLevelAgreement((prevItems) => [
      ...prevItems,
      {
        ...DEFAULT_SERVICE_LEVEL_AGREEMENT_ITEM_VALUES,
      },
    ])
  }

  return {
    serviceLevelAgreement,
    setServiceLevelAgreement,
    handleServiceLevelAgreementChange,
    handleServiceLevelAgreementDelete,
    handleServiceLevelAgreementAdd,
  }
}
