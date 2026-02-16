"use client";

import { atom, useAtom } from "jotai";



import { SUPPLIER_EDIT_FORM_VALUES } from "../constants/supplier-edit-constants";
import { Supplier, SupplierUpdateInput } from "../types/procurement/supplier/supplier-types";
import { EvaluationCriteria } from "../types/supplier-relationship/supplier-evaluation/supplier-evaluation-types";





// Define atoms
export const selectedRequisitionTemplateId = atom<number>(0)
export const previewDataAtom = atom<any[]>([])
export const selectedProductTemplateId = atom<number>(0)
export const selectedTermAndConditionsId = atom<number>(0)
export const currencyTemplateId = atom<number>(0)
export const selectedPurchasedOrderTemplateId = atom<number>(0)
export const selectedSupplierId = atom<number>(0)
export const paymentAmountAtom = atom<number>(0)
export const grandTotalAtom = atom<number>(0)
export const netTotalAmountAtom = atom<number>(0)
export const discountAmountAtom = atom<number>(0)
export const discountPercentageAtom = atom<number>(0)
export const selectTaxTypeId = atom<number>(0)
export const selectTaxTypeName = atom<string>("")
export const selectChartOfAccountId = atom<number>(0)
export const selectChartOfAccountName = atom<string>("")
export const selectTaxRate = atom<number>(0)
export const selectTaxAmount = atom<number>(0)
export const selectTotalAmount = atom<number>(0)
export const creditToName = atom<string>("")
export const creditToId = atom<number>(0)
export const companyNameTemplate = atom<string>("")
export const totalTaxAmountAtom = atom<number>(0)
export const referenceName = atom<string>("")
export const remarks = atom<string>("")
export const advanceAmount = atom<number>(0)
export const allocatedAmount = atom<number>(0)
export const stockTemplateId = atom<number>(0)
export const writeOffAmountAtom = atom<number>(0)
export const stockItemsId = atom<number>(0)

export const inventoryStockReceivedAtom = atom<boolean>(false)
export const openDrawerAtom = atom<boolean>(false)
export const assignedToName = atom<string>("")
export const employeeName = atom<string>("")
export const assetCategoryId = atom<number>(0)
export const assetCategoryName = atom<string>("")
export const companyId = atom<number>(0)
export const companyName = atom<string>("")
export const productType = atom<string>("")
export const isFixedAssetTemplateAtom = atom<boolean>(false)

export const stockTransferItemRowsAtom = atom<any[]>([])
export const materialAvailabilityItemRowsAtom = atom<any[]>([])
export const evaluationCriteriaItemRowsAtom = atom<EvaluationCriteria[]>([])

export const supplierEditFormAtom = atom<SupplierUpdateInput>({
  ...SUPPLIER_EDIT_FORM_VALUES,
  id: undefined,
})

export function useGlobalStoreState() {
  const [selectedSupplierTemplateId, setSelectedSupplierTemplateId] =
    useAtom(selectedSupplierId)
  const [selectedTaxTypeId, setSelectedTaxTypeId] = useAtom(selectTaxTypeId)
  const [selectedTaxTypeName, setSelectedTaxTypeName] =
    useAtom(selectTaxTypeName)
  const [selectedChartOfAccountId, setSelectedChartOfAccountId] = useAtom(
    selectChartOfAccountId
  )
  const [selectedChartOfAccountName, setSelectedChartOfAccountName] = useAtom(
    selectChartOfAccountName
  )
  const [selectedTaxRate, setSelectedTaxRate] = useAtom(selectTaxRate)
  const [selectedTaxAmount, setSelectedTaxAmount] = useAtom(selectTaxAmount)
  const [selectedTotalAmount, setSelectedTotalAmount] =
    useAtom(selectTotalAmount)
  const [selectedCreditToName, setSelectedCreditToName] = useAtom(creditToName)
  const [selectedCreditToId, setSelectedCreditToId] = useAtom(creditToId)
  const [selectedReferenceName, setSelectedReferenceName] =
    useAtom(referenceName)
  const [selectedRemarks, setSelectedRemarks] = useAtom(remarks)
  const [selectedAdvanceAmount, setSelectedAdvanceAmount] =
    useAtom(advanceAmount)
  const [selectedAllocatedAmount, setSelectedAllocatedAmount] =
    useAtom(allocatedAmount)
  const [inventoryStockReceived, setInventoryStockReceived] = useAtom(
    inventoryStockReceivedAtom
  )
  const [selectedPurchaseOrderTemplate, setSelectedPurchaseOrderTemplate] =
    useAtom(selectedPurchasedOrderTemplateId)
  const [assignedToNameTemplate, setAssignedToNameTemplate] =
    useAtom(assignedToName)
  const [assetCategoryIdTemplate, setAssetCategoryIdTemplate] =
    useAtom(assetCategoryId)
  const [assetCategoryNameTemplate, setAssetCategoryNameTemplate] =
    useAtom(assetCategoryName)
  const [companyIdTemplate, setCompanyIdTemplate] = useAtom(companyId)
  const [companyNameTemplate, setCompanyNameTemplate] = useAtom(companyName)
  const [productTypeTemplate, setProductTypeTemplate] = useAtom(productType)
  const [isFixedAssetTemplate, setIsFixedAssetTemplate] = useAtom(isFixedAssetTemplateAtom)
  return {
    selectedSupplierTemplateId,
    setSelectedSupplierTemplateId,
    selectedTaxTypeId,
    setSelectedTaxTypeId,
    selectedTaxTypeName,
    setSelectedTaxTypeName,
    selectedChartOfAccountId,
    setSelectedChartOfAccountId,
    selectedChartOfAccountName,
    setSelectedChartOfAccountName,
    selectedTaxRate,
    setSelectedTaxRate,
    selectedTaxAmount,
    setSelectedTaxAmount,
    selectedTotalAmount,
    setSelectedTotalAmount,
    selectedPurchaseOrderTemplate,
    setSelectedPurchaseOrderTemplate,
    selectedCreditToName,
    setSelectedCreditToName,
    selectedCreditToId,
    setSelectedCreditToId,
    selectedReferenceName,
    setSelectedReferenceName,
    selectedRemarks,
    setSelectedRemarks,
    selectedAdvanceAmount,
    setSelectedAdvanceAmount,
    selectedAllocatedAmount,
    setSelectedAllocatedAmount,
    inventoryStockReceived,
    setInventoryStockReceived,
    assignedToNameTemplate,
    setAssignedToNameTemplate,
    assetCategoryIdTemplate,
    setAssetCategoryIdTemplate,
    assetCategoryNameTemplate,
    setAssetCategoryNameTemplate,
    companyIdTemplate,
    setCompanyIdTemplate,
    companyNameTemplate,
    setCompanyNameTemplate,
    productTypeTemplate,
    setProductTypeTemplate,
    isFixedAssetTemplate,
    setIsFixedAssetTemplate,
  }
}