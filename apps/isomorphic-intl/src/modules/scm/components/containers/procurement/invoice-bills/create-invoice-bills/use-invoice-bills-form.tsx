"use client";

import { useEffect } from "react";



import { useAtom } from "jotai";
import { SubmitHandler } from "react-hook-form";



import { useCreateInvoice, useInvoiceById, usePurchasedOrderById, useUpdateInvoice } from "@/modules/scm/hooks";
import { usePatchStockReceived } from "@/modules/scm/hooks/inventory/stock/use-stock";
import { useAdvancedPayments } from "@/modules/scm/hooks/shared/use-advanced-payments";
import { useProductItems } from "@/modules/scm/hooks/shared/use-product-items";
import { useTaxCharges } from "@/modules/scm/hooks/shared/use-tax-charges";
import { advanceAmount, allocatedAmount, creditToId, creditToName, netTotalAmountAtom, referenceName, remarks, selectChartOfAccountId, selectChartOfAccountName, selectTaxAmount, selectTaxRate, selectTaxTypeId, selectTaxTypeName, selectTotalAmount, useGlobalStoreState, writeOffAmountAtom } from "@/modules/scm/store/global-store-state";
import { invoiceAtom } from "@/modules/scm/store/purchase-invoice";
import { Invoice, InvoiceInput, InvoiceUpdate } from "@/modules/scm/types/procurement/invoice/invoice-types";
import { PurchasedOrder } from "@/modules/scm/types/procurement/purchased-order/purchased-order-types";
import { AdvancedAmountUtils } from "@/modules/scm/utils/advenced-amount";





interface UseInvoiceBillsFormProps {
  id?: number
  mode?: "create" | "edit" | "view"
}

export const useInvoiceBillsForm = ({
  id,
  mode = "create",
}: UseInvoiceBillsFormProps) => {
  const isFieldDisabled = mode === "view"

  const { selectedPurchaseOrderTemplate, inventoryStockReceived } =
    useGlobalStoreState()

  const [selectedTaxTypeId] = useAtom(selectTaxTypeId)
  const [selectedTaxTypeName] = useAtom(selectTaxTypeName)
  const [selectedChartOfAccountId] = useAtom(selectChartOfAccountId)
  const [selectedChartOfAccountName] = useAtom(selectChartOfAccountName)
  const [selectedTaxRate] = useAtom(selectTaxRate)
  const [selectedTaxAmount] = useAtom(selectTaxAmount)
  const [selectedTotalAmount] = useAtom(selectTotalAmount)
  const [selectedCreditToId] = useAtom(creditToId)
  const [selectedCreditToName] = useAtom(creditToName)
  const [selectedReferenceName] = useAtom(referenceName)
  const [selectedRemarks] = useAtom(remarks)
  const [selectedAdvanceAmount] = useAtom(advanceAmount)
  const [selectedAllocatedAmount] = useAtom(allocatedAmount)
  const [writeOffAmount] = useAtom(writeOffAmountAtom)

  const {
    mutateAsync: createInvoice,
    isPending: isCreatePending,
    isSuccess: isCreateSuccess,
  } = useCreateInvoice()

  const { mutateAsync: updateInvoice, isPending: isUpdatePending } =
    useUpdateInvoice()

  const {
    mutateAsync: patchStockReceived,
    isPending: isPatchStockReceivedPending,
  } = usePatchStockReceived()

  const {
    productItems,
    setProductItems,
    handleProductItemChange,
    handleProductItemDelete,
    handleProductItemAdd,
  } = useProductItems()

  const { calculateTotalAmount } = AdvancedAmountUtils()

  const {
    taxCharges: paymentTaxCharges,
    setTaxCharges: setPaymentTaxCharges,
    handleTaxChargeChange,
    handleTaxChargeDelete,
    handleTaxChargeAdd,
  } = useTaxCharges()

  const {
    advancedPayments,
    setAdvancedPayments,
    handleAdvancedPaymentChange,
    handleAdvancedPaymentDelete,
    handleAdvancedPaymentAdd,
  } = useAdvancedPayments()

  const [formValues, setFormValues] = useAtom(invoiceAtom)

  const [, setNetTotalAmount] = useAtom(netTotalAmountAtom)

  const { data: invoiceDetails, isLoading: isInvoiceDetailsLoading } =
    useInvoiceById(Number(id)) as {
      data: Invoice | undefined
      isLoading: boolean
    }

  const {
    data: purchaseOrderDetails,
    isLoading: isPurchaseOrderDetailsLoading,
  } = usePurchasedOrderById(Number(selectedPurchaseOrderTemplate)) as {
    data: PurchasedOrder | undefined
    isLoading: boolean
  }

  useEffect(() => {
    if (invoiceDetails && !isInvoiceDetailsLoading) {
      setProductItems(
        invoiceDetails.invoiceItemDtos?.map((item) => ({
          ...item,
          id: item.id || 0,
          invoiceBillId: invoiceDetails.id || 0,
        })) || []
      )
      setPaymentTaxCharges(
        invoiceDetails?.invoiceVatTaxDetails?.map((taxCharge) => ({
          ...taxCharge,
          id: taxCharge?.id || 0,
          invoiceBillId: invoiceDetails.id || 0,
        })) || []
      )
      setAdvancedPayments(
        invoiceDetails?.invoiceAdvancePayments?.map((payment) => ({
          ...payment,
          id: payment?.id || 0,
          invoiceBillId: invoiceDetails.id || 0,
        })) || []
      )
      setFormValues({
        ...formValues,
        purchaseOrderId: invoiceDetails?.purchaseOrderId || 0,
        supplierId: invoiceDetails?.supplierId || 0,
        requisitionId: invoiceDetails?.requisitionId || 0,
        requestedBy: invoiceDetails?.requestedBy || "",
        projectName: invoiceDetails?.projectName || "",
        priority: invoiceDetails?.priority || "",
        invoiceDate: invoiceDetails?.invoiceDate || "",
        dueDate: invoiceDetails?.dueDate || "",
        expectedDeliveryDate: invoiceDetails?.expectedDeliveryDate || "",
        isReturned: invoiceDetails?.isReturned || false,
        isOpeningEntry: invoiceDetails?.isOpeningEntry || false,
        isStockUpdated: invoiceDetails?.isStockUpdated || false,
        companyName: invoiceDetails?.companyName || "",
        companyId: invoiceDetails?.companyId || 0,
        currencyId: invoiceDetails?.currencyId || 0,
        currencyName: invoiceDetails?.currencyName || "",
        warehouseId: invoiceDetails?.warehouseId || 0,
        totalQuantity: invoiceDetails?.totalQuantity || 0,
        fiscalPosition: invoiceDetails?.fiscalPosition || "",
        billingStatus: invoiceDetails?.billingStatus || "",
        paymentTermsId: invoiceDetails?.paymentTermsId || 0,
        billAmount: invoiceDetails?.billAmount || 0,
        totalTax: invoiceDetails?.totalTax || 0,
        netTotalAmount: invoiceDetails?.netTotalAmount || 0,
        grandTotal: invoiceDetails?.grandTotal || 0,
        outstandingAmount: invoiceDetails?.outstandingAmount || 0,
        taxCategoryId: invoiceDetails?.taxCategoryId || 0,
        taxCategoryName: invoiceDetails?.taxCategoryName || "",
        purchaseTaxTemplateId: invoiceDetails?.purchaseTaxTemplateId || 0,
        addDiscountAmount: invoiceDetails?.addDiscountAmount || 0,
        addDiscountPercent: invoiceDetails?.addDiscountPercent || 0,
        addDiscountApplyOn: invoiceDetails?.addDiscountApplyOn || "",
        totalAdvance: invoiceDetails?.totalAdvance || 0,
        supplierAddress: invoiceDetails?.supplierAddress || "",
        supplierStreet: invoiceDetails?.supplierStreet || "",
        supplierCity: invoiceDetails?.supplierCity || "",
        supplierState: invoiceDetails?.supplierState || "",
        supplierCountry: invoiceDetails?.supplierCountry || "",
        supplierZipCode: invoiceDetails?.supplierZipCode || "",
        supplierContactName: invoiceDetails?.supplierContactName || "",
        supplierContactEmail: invoiceDetails?.supplierContactEmail || "",
        supplierContactPhone: invoiceDetails?.supplierContactPhone || "",
        companyAddress: invoiceDetails?.companyAddress || "",
        companyStreet: invoiceDetails?.companyStreet || "",
        companyCity: invoiceDetails?.companyCity || "",
        companyState: invoiceDetails?.companyState || "",
        companyCountry: invoiceDetails?.companyCountry || "",
        companyZipCode: invoiceDetails?.companyZipCode || "",
        companyContactPerson: invoiceDetails?.companyContactPerson || "",
        companyContactPhone: invoiceDetails?.companyContactPhone || "",
        companyContactEmail: invoiceDetails?.companyContactEmail || "",
        companyTrn: invoiceDetails?.companyTrn || "",
        shippingAddress: invoiceDetails?.shippingAddress || "",
        shippingStreet: invoiceDetails?.shippingStreet || "",
        shippingCity: invoiceDetails?.shippingCity || "",
        shippingState: invoiceDetails?.shippingState || "",
        shippingCountry: invoiceDetails?.shippingCountry || "",
        shippingZipCode: invoiceDetails?.shippingZipCode || "",
        shippingContactPerson: invoiceDetails?.shippingContactPerson || "",
        shippingContactPhone: invoiceDetails?.shippingContactPhone || "",
        shippingContactEmail: invoiceDetails?.shippingContactEmail || "",
        purchaseTaxTemplateName: invoiceDetails?.purchaseTaxTemplateName || "",
        writeOffAccountId: invoiceDetails?.writeOffAccountId || 0,
        writeOffAmount: invoiceDetails?.writeOffAmount || 0,
        writeOffCostCenterId: invoiceDetails?.writeOffCostCenterId || 0,
        creditToId: invoiceDetails?.creditToId || 0,
      })
    }
  }, [invoiceDetails, isInvoiceDetailsLoading])

  useEffect(() => {
    if (purchaseOrderDetails && !isPurchaseOrderDetailsLoading) {
      setProductItems(
        purchaseOrderDetails.purchaseOrderItemDtos?.map((item) => ({
          ...item,
          id: item.id || 0,
          purchaseOrderId: purchaseOrderDetails.id || 0,
        })) || []
      )
      if (purchaseOrderDetails.purchaseOrderVatTaxDetails?.length === 0) {
        if (paymentTaxCharges.length > 0) {
          setPaymentTaxCharges([
            {
              taxTypeId: selectedTaxTypeId,
              taxTypeName: selectedTaxTypeName,
              chartOfAccountId: selectedChartOfAccountId,
              chartOfAccountName: selectedChartOfAccountName,
              rate: selectedTaxRate,
              amount: selectedTaxAmount,
              total: selectedTotalAmount,
            },
          ])
        }
      } else {
        setPaymentTaxCharges(
          purchaseOrderDetails.purchaseOrderVatTaxDetails?.map((taxCharge) => ({
            taxTypeId: taxCharge.taxTypeId || selectedTaxTypeId || 0,
            taxTypeName: taxCharge.taxTypeName || selectedTaxTypeName || "",
            chartOfAccountId:
              taxCharge.chartOfAccountId || selectedChartOfAccountId || 0,
            chartOfAccountName:
              taxCharge.chartOfAccountName || selectedChartOfAccountName || "",
            rate: Number(taxCharge.rate) || selectedTaxRate || 0,
            amount: Number(taxCharge.amount) || selectedTaxAmount || 0,
            total: Number(taxCharge.total) || selectedTotalAmount || 0,
          })) || []
        )
      }

      if (!advancedPayments.length) {
        setAdvancedPayments([
          {
            referenceName: selectedReferenceName || "",
            remarks: selectedRemarks || "",
            advanceAmount: selectedAdvanceAmount || 0,
            allocatedAmount: selectedAllocatedAmount || 0,
          },
        ])
      }
      setNetTotalAmount(purchaseOrderDetails?.netTotalAmount || 0)
      setFormValues({
        ...formValues,
        purchaseOrderId: purchaseOrderDetails?.id || 0,
        supplierId: purchaseOrderDetails?.supplierId || 0,
        requisitionId: purchaseOrderDetails?.requisitionId || 0,
        requestedBy: purchaseOrderDetails?.requestedBy || "",
        projectName: purchaseOrderDetails?.projectName || "",
        priority: purchaseOrderDetails?.priority || "",
        expectedDeliveryDate: purchaseOrderDetails?.expectedDeliveryDate || "",
        companyName: purchaseOrderDetails?.companyName || "",
        companyId: purchaseOrderDetails?.companyId || 0,
        currencyId: purchaseOrderDetails?.currencyId || 0,
        currencyName: purchaseOrderDetails?.currencyName || "",
        warehouseId: purchaseOrderDetails?.warehouseId || 0,
        totalQuantity: purchaseOrderDetails?.totalQuantity || 0,
        fiscalPosition: purchaseOrderDetails?.fiscalPosition || "",
        billingStatus: purchaseOrderDetails?.billingStatus || "",
        paymentTermsId: purchaseOrderDetails?.paymentTermsId || 0,
        billAmount: purchaseOrderDetails?.orderAmount || 0,
        totalTax: purchaseOrderDetails?.totalTax || 0,
        netTotalAmount: purchaseOrderDetails?.netTotalAmount || 0,
        grandTotal: purchaseOrderDetails?.grandTotal || 0,
        taxCategoryId: purchaseOrderDetails?.taxCategoryId || 0,
        taxCategoryName: purchaseOrderDetails?.taxCategoryName || "",
        purchaseTaxTemplateId: purchaseOrderDetails?.purchaseTaxTemplateId || 0,
        addDiscountAmount: purchaseOrderDetails?.addDiscountAmount || formValues?.addDiscountAmount || 0,
        addDiscountPercent: purchaseOrderDetails?.addDiscountPercent || formValues?.addDiscountPercent || 0,
        addDiscountApplyOn: purchaseOrderDetails?.addDiscountApplyOn || formValues?.addDiscountApplyOn || "",
        totalAdvance: purchaseOrderDetails?.advancePaid || 0,
        supplierAddress: purchaseOrderDetails?.supplierAddress || "",
        supplierStreet: purchaseOrderDetails?.supplierStreet || "",
        supplierCity: purchaseOrderDetails?.supplierCity || "",
        supplierState: purchaseOrderDetails?.supplierState || "",
        supplierCountry: purchaseOrderDetails?.supplierCountry || "",
        supplierZipCode: purchaseOrderDetails?.supplierZipCode || "",
        supplierContactName: purchaseOrderDetails?.supplierContactName || "",
        supplierContactEmail: purchaseOrderDetails?.supplierContactEmail || "",
        supplierContactPhone: purchaseOrderDetails?.supplierContactPhone || "",
        companyAddress: purchaseOrderDetails?.companyAddress || "",
        companyStreet: purchaseOrderDetails?.companyStreet || "",
        companyCity: purchaseOrderDetails?.companyCity || "",
        companyState: purchaseOrderDetails?.companyState || "",
        companyCountry: purchaseOrderDetails?.companyCountry || "",
        companyZipCode: purchaseOrderDetails?.companyZipCode || "",
        companyContactPerson: purchaseOrderDetails?.companyContactPerson || "",
        companyContactPhone: purchaseOrderDetails?.companyContactPhone || "",
        companyContactEmail: purchaseOrderDetails?.companyContactEmail || "",
        companyTrn: purchaseOrderDetails?.companyTrn || "",
        shippingAddress: purchaseOrderDetails?.shippingAddress || "",
        shippingStreet: purchaseOrderDetails?.shippingStreet || "",
        shippingCity: purchaseOrderDetails?.shippingCity || "",
        shippingState: purchaseOrderDetails?.shippingState || "",
        shippingCountry: purchaseOrderDetails?.shippingCountry || "",
        shippingZipCode: purchaseOrderDetails?.shippingZipCode || "",
        shippingContactPerson:
          purchaseOrderDetails?.shippingContactPerson || "",
        shippingContactPhone: purchaseOrderDetails?.shippingContactPhone || "",
        shippingContactEmail: purchaseOrderDetails?.shippingContactEmail || "",
        purchaseTaxTemplateName:
          purchaseOrderDetails?.purchaseTaxTemplateName || "",
      })
    }
  }, [purchaseOrderDetails, isPurchaseOrderDetailsLoading])

  useEffect(() => {
    if (inventoryStockReceived) {
      const filteredData = productItems.map(({ productId, quantity }) => ({
        productId,
        quantity,
        adjustmentType: 2,
      }))
      if (isCreateSuccess) {
        patchStockReceived(filteredData)
      }
    }
  }, [inventoryStockReceived])

  const getFormValues = () => formValues

  // 3. Implement proper submit handler
  const onSubmit: SubmitHandler<InvoiceInput | InvoiceUpdate> = async (
    data
  ) => {
    const createData = {
      ...data,
      creditToId: selectedCreditToId || 0,
      creditToName: selectedCreditToName || "",
      isReturned: data?.isReturned || false,
      advanceAmount: calculateTotalAmount(advancedPayments),
      saveInvoiceItemDtos: productItems.map((item) => ({
        productId: item.productId || 0,
        itemUnitId: item.itemUnitId || 0,
        totalPrice: Number(item.totalPrice),
        quantity: Number(item.quantity),
        unitPrice: Number(item.unitPrice),
      })),
      invoiceVatTaxDetails: paymentTaxCharges.map((tax) => ({
        ...tax,
        rate: selectedTaxRate || tax.rate,
        amount: selectedTaxAmount || tax.amount,
        total: selectedTotalAmount || tax.total,
        taxTypeId: selectedTaxTypeId || tax.taxTypeId,
        chartOfAccountId: selectedChartOfAccountId || tax.chartOfAccountId,
        taxTypeName: selectedTaxTypeName || tax.taxTypeName,
        chartOfAccountName:
          selectedChartOfAccountName || tax.chartOfAccountName,
      })),
      invoiceAdvancePayments: advancedPayments.map((payment) => ({
        ...payment,
        invoiceBillId: id || 0,
        referenceName: payment.referenceName || "",
        remarks: payment.remarks || "",
        advanceAmount: selectedAdvanceAmount || payment.advanceAmount || 0,
        allocatedAmount:
          selectedAllocatedAmount || payment.allocatedAmount || 0,
      })),
    }

    const updateData = {
      ...data,
      id: id || 0,
      updateInvoiceItemDtos: productItems.map((item) => ({
        ...item,
        invoiceBillId: id || 0,
        productId: item.productId || 0,
        itemUnitId: item.itemUnitId || 0,
        totalPrice: Number(item.totalPrice),
        quantity: Number(item.quantity),
        unitPrice: Number(item.unitPrice),
      })),
      invoiceVatTaxDetails: paymentTaxCharges.map((tax) => ({
        ...tax,
        rate: selectedTaxRate || tax.rate,
        amount: selectedTaxAmount || tax.amount,
        total: selectedTotalAmount || tax.total,
        taxTypeId: selectedTaxTypeId || tax.taxTypeId,
        chartOfAccountId: selectedChartOfAccountId || tax.chartOfAccountId,
        taxTypeName: selectedTaxTypeName || tax.taxTypeName,
        chartOfAccountName:
          selectedChartOfAccountName || tax.chartOfAccountName,
      })),
      advancePayments: advancedPayments.map((payment) => ({
        ...payment,
        invoiceBillId: id || 0,
        referenceName: payment.referenceName || "",
        remarks: payment.remarks || "",
        advanceAmount: selectedAdvanceAmount || payment.advanceAmount || 0,
        allocatedAmount:
          selectedAllocatedAmount || payment.allocatedAmount || 0,
      })),
    }

    if (mode === "create") {
      // console.log(createData)
      await createInvoice(createData as InvoiceInput)
    } else {
      await updateInvoice({
        data: {
          ...updateData,
          id: id || 0,
        },
      })
    }
  }

  return {
    productItems,
    handleProductItemChange,
    handleProductItemDelete,
    handleProductItemAdd,
    getFormValues,
    paymentTaxCharges,
    handleTaxChargeChange,
    handleTaxChargeDelete,
    handleTaxChargeAdd,
    advancedPayments,
    handleAdvancedPaymentChange,
    handleAdvancedPaymentDelete,
    handleAdvancedPaymentAdd,
    isFieldDisabled,
    onSubmit,
    isLoading:
      isPurchaseOrderDetailsLoading ||
      isInvoiceDetailsLoading ||
      isCreatePending ||
      isUpdatePending ||
      isPatchStockReceivedPending,
  }
}