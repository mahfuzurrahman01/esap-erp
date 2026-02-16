

import { atom, useAtom } from "jotai";





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
export const debitToName = atom<string>("")
export const debitToId = atom<number>(0)
export const companyNameTemplate = atom<string>("")

export const referenceName = atom<string>("")
export const paymentTerms = atom<string>("")
export const remarks = atom<string>("")
export const advanceAmount = atom<number>(0)
export const allocatedAmount = atom<number>(0)
export const stockTemplateId = atom<number>(0)

export const inventoryStockReceivedAtom = atom<boolean>(false)
export const openDrawerAtom = atom<boolean>(false)


export function useGlobalStoreState() {
  const [selectedSupplierTemplateId, setSelectedSupplierTemplateId] =
    useAtom(selectedSupplierId)
  const [selectedTaxTypeId, setSelectedTaxTypeId] = useAtom(selectTaxTypeId)
  const [selectedTaxTypeName, setSelectedTaxTypeName] = useAtom(selectTaxTypeName)
  const [selectedChartOfAccountId, setSelectedChartOfAccountId] = useAtom(selectChartOfAccountId)
  const [selectedChartOfAccountName, setSelectedChartOfAccountName] = useAtom(selectChartOfAccountName)
  const [selectedTaxRate, setSelectedTaxRate] = useAtom(selectTaxRate)
  const [selectedTaxAmount, setSelectedTaxAmount] = useAtom(selectTaxAmount)
  const [selectedTotalAmount, setSelectedTotalAmount] = useAtom(selectTotalAmount)
  const [selectedDebitToName, setSelectedDebitToName] = useAtom(debitToName)
  const [selectedDebitToId, setSelectedDebitToId] = useAtom(debitToId)
  const [selectedPaymentTerms, setSelectedPaymentTerms] = useAtom(referenceName)
  const [selectedReferenceName, setSelectedReferenceName] = useAtom(referenceName)
  const [selectedRemarks, setSelectedRemarks] = useAtom(remarks)
  const [selectedAdvanceAmount, setSelectedAdvanceAmount] = useAtom(advanceAmount)
  const [selectedAllocatedAmount, setSelectedAllocatedAmount] = useAtom(allocatedAmount)
  const [inventoryStockReceived, setInventoryStockReceived] = useAtom(inventoryStockReceivedAtom)

  const [selectedPurchaseOrderTemplate, setSelectedPurchaseOrderTemplate] = useAtom(selectedPurchasedOrderTemplateId)
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
    selectedDebitToName,
    setSelectedDebitToName,
    selectedDebitToId,
    setSelectedDebitToId,
    selectedReferenceName,
    setSelectedReferenceName,
    selectedPaymentTerms,
    setSelectedPaymentTerms,
    selectedRemarks,
    setSelectedRemarks,
    selectedAdvanceAmount,
    setSelectedAdvanceAmount,
    selectedAllocatedAmount,
    setSelectedAllocatedAmount,
    inventoryStockReceived,
    setInventoryStockReceived
  }
}