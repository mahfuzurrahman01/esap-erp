"use client";

import { atom, useAtom } from "jotai";



import { RequisitionItemRow } from "../types/procurement/requisition/requisition-types";
import { currencyTemplateId } from "./currency-store";
import { selectedProductTemplateId, selectedPurchasedOrderTemplateId, selectedRequisitionTemplateId, selectedTermAndConditionsId } from "./global-store-state";
import { serviceLevelAgreements } from "../types/procurement/supplier/contract-types";





export const requisitionItemRowsAtom = atom<RequisitionItemRow[]>([])

export const agreementItemRowsAtom = atom<serviceLevelAgreements[]>([])

// Create a custom hook to handle all the atoms
export function useRequisitionStore() {
  const [selectedRequisitionTemplate, setSelectedRequisitionTemplate] = useAtom(
    selectedRequisitionTemplateId
  )
  const [selectedProductTemplate, setSelectedProductTemplate] = useAtom(
    selectedProductTemplateId
  )
  const [selectedTermAndConditions, setSelectedTermAndConditions] = useAtom(
    selectedTermAndConditionsId
  )
  const [currencyTemplate, setCurrencyTemplate] = useAtom(currencyTemplateId)
  const [selectedPurchasedOrderTemplate, setSelectedPurchasedOrderTemplate] =
    useAtom(selectedPurchasedOrderTemplateId)
  return {
    selectedProductTemplate,
    setSelectedProductTemplate,
    selectedTermAndConditions,
    setSelectedTermAndConditions,
    currencyTemplate,
    setCurrencyTemplate,
    selectedPurchasedOrderTemplate,
    setSelectedPurchasedOrderTemplate,
    selectedRequisitionTemplate,
    setSelectedRequisitionTemplate,
  }
}