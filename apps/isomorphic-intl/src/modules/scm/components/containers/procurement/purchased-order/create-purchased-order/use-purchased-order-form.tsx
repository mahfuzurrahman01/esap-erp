"use client";

import { useEffect } from "react";



import { useAtom } from "jotai";
import { SubmitHandler } from "react-hook-form";



import { useRequisitionById, useSupplierById } from "@/modules/scm/hooks";
import { useCreatePurchasedOrder, usePurchasedOrderById, useUpdatePurchasedOrder } from "@/modules/scm/hooks/procurement/purchased-order/use-purchased-order";
import { useProductItems } from "@/modules/scm/hooks/shared/use-product-items";
import { useTaxCharges } from "@/modules/scm/hooks/shared/use-tax-charges";
import { selectChartOfAccountId, selectChartOfAccountName, selectTaxAmount, selectTaxRate, selectTaxTypeId, selectTaxTypeName, selectTotalAmount, totalTaxAmountAtom, useGlobalStoreState } from "@/modules/scm/store/global-store-state";
import { calculatedGrandTotalAtom, purchaseOrderAtom, taxRowsAtom } from "@/modules/scm/store/purchase-order";
import { useRequisitionStore } from "@/modules/scm/store/requisition-store";
import { PurchasedOrder, PurchasedOrderInput, PurchasedOrderUpdate } from "@/modules/scm/types/procurement/purchased-order/purchased-order-types";
import { Requisition } from "@/modules/scm/types/procurement/requisition/requisition-types";
import { Supplier } from "@/modules/scm/types/procurement/supplier/supplier-types";





interface UsePurchasedOrderFormProps {
  id?: number
  mode?: "create" | "edit" | "view"
}

export const usePurchasedOrderForm = ({
  id,
  mode = "create",
}: UsePurchasedOrderFormProps) => {
  const isFieldDisabled = mode === "view"

  const { selectedSupplierTemplateId, setSelectedSupplierTemplateId } =
    useGlobalStoreState()

  const { selectedRequisitionTemplate } = useRequisitionStore()

  const {
    productItems,
    setProductItems,
    handleProductItemChange,
    handleProductItemDelete,
    handleProductItemAdd,
  } = useProductItems()

  const {
    taxCharges: paymentTaxCharges,
    setTaxCharges: setPaymentTaxCharges,
    handleTaxChargeChange,
    handleTaxChargeDelete,
    handleTaxChargeAdd,
  } = useTaxCharges()

  const [selectedTaxTypeId] = useAtom(selectTaxTypeId)
  const [selectedTaxTypeName] = useAtom(selectTaxTypeName)
  const [selectedChartOfAccountId] = useAtom(selectChartOfAccountId)
  const [selectedChartOfAccountName] = useAtom(selectChartOfAccountName)
  const [selectedTaxRate] = useAtom(selectTaxRate)
  const [selectedTaxAmount] = useAtom(selectTaxAmount)
  const [selectedTotalAmount] = useAtom(selectTotalAmount)
  const [totalTaxAmount] = useAtom(totalTaxAmountAtom)
  const [calculatedGrandTotal] = useAtom(calculatedGrandTotalAtom)

    const [formValues, setFormValues] = useAtom(purchaseOrderAtom)

  const { data: requisitionDetails, isLoading: isRequisitionDetailsLoading } =
    useRequisitionById(Number(selectedRequisitionTemplate)) as {
      data: Requisition | undefined
      isLoading: boolean
    }

  const { data: supplierDetails, isLoading: isSupplierDetailsLoading } =
    useSupplierById(Number(selectedSupplierTemplateId)) as {
      data: Supplier | undefined
      isLoading: boolean
    }

  const { mutateAsync: createPurchasedOrder, isPending: isCreatePending } =
    useCreatePurchasedOrder()

  const { mutateAsync: updatePurchasedOrder, isPending: isUpdatePending } =
    useUpdatePurchasedOrder()

  const {
    data: purchaseOrderDetails,
    isLoading: isPurchaseOrderDetailsLoading,
  } = usePurchasedOrderById(Number(id)) as {
    data: PurchasedOrder | undefined
    isLoading: boolean
  }

  useEffect(() => {
    if (purchaseOrderDetails && !isPurchaseOrderDetailsLoading) {
      setProductItems(
        purchaseOrderDetails.purchaseOrderItemDtos?.map((item) => ({
          ...item,
          id: item.id || 0,
          purchaseOrderId: purchaseOrderDetails.id || 0,
        })) || []
      )
      setPaymentTaxCharges(
        purchaseOrderDetails.purchaseOrderVatTaxDetails?.map((taxCharge) => ({
          ...taxCharge,
          id: taxCharge?.id || 0,
          purchaseOrderId: purchaseOrderDetails.id || 0,
          chartOfAccountId: taxCharge?.chartOfAccountId || 0,
          chartOfAccountName: taxCharge?.chartOfAccountName || "",
          taxTypeId: taxCharge?.taxTypeId || 0,
          taxTypeName: taxCharge?.taxTypeName || "",
          rate: taxCharge?.rate || selectedTaxRate || 0,
          amount: taxCharge?.amount || selectedTaxAmount || 0,
          total: taxCharge?.total || selectedTotalAmount || 0,
        })) || []
      )

      setFormValues({
        ...formValues,
        supplierId: purchaseOrderDetails?.supplierId || 0,
        requisitionId: purchaseOrderDetails?.requisitionId || 0,
        requestedBy: purchaseOrderDetails?.requestedBy || "",
        projectName: purchaseOrderDetails?.projectName || "",
        priority: purchaseOrderDetails?.priority || "",
        expectedDeliveryDate: purchaseOrderDetails?.expectedDeliveryDate || "",
        poDate: purchaseOrderDetails?.poDate || "",
        companyName: purchaseOrderDetails?.companyName || "",
        companyId: purchaseOrderDetails?.companyId || 0,
        currencyId: purchaseOrderDetails?.currencyId || 0,
        currencyName: purchaseOrderDetails?.currencyName || "",
        warehouseId: purchaseOrderDetails?.warehouseId || 0,
        totalQuantity: purchaseOrderDetails?.totalQuantity || 0,
        fiscalPosition: purchaseOrderDetails?.fiscalPosition || "",
        billingStatus: purchaseOrderDetails?.billingStatus || "",
        paymentTermsId: purchaseOrderDetails?.paymentTermsId || 0,
        orderAmount: purchaseOrderDetails?.orderAmount || 0,
        totalTax: purchaseOrderDetails?.totalTax || totalTaxAmount || 0,
        netTotalAmount: purchaseOrderDetails?.netTotalAmount || 0,
        grandTotal: purchaseOrderDetails?.grandTotal || 0,
        taxCategoryId: purchaseOrderDetails?.taxCategoryId || 0,
        taxCategoryName: purchaseOrderDetails?.taxCategoryName || "",
        purchaseTaxTemplateId: purchaseOrderDetails?.purchaseTaxTemplateId || 0,
        addDiscountAmount: purchaseOrderDetails?.addDiscountAmount || 0,
        addDiscountPercent: purchaseOrderDetails?.addDiscountPercent || 0,
        addDiscountApplyOn: purchaseOrderDetails?.addDiscountApplyOn || "",
        advancePaid: purchaseOrderDetails?.advancePaid || 0,
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
    if (requisitionDetails) {
      setProductItems(
        requisitionDetails.requisitionItemDtos?.map((item) => ({
          ...item,
          id: item.id || 0,
          requisitionId: requisitionDetails.id || 0,
        })) || []
      )

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
      setFormValues({
        ...formValues,
        supplierId: requisitionDetails.supplierId || 0,
        requisitionId: requisitionDetails.id || 0,
        requestedBy: requisitionDetails?.requestedBy || "",
        projectName: requisitionDetails?.projectName || "",
        priority: requisitionDetails?.priority || "",
        expectedDeliveryDate: requisitionDetails?.expectedDeliveryDate || "",
        companyName: requisitionDetails?.companyName || "",
        companyId: requisitionDetails?.companyId || 0,
        currencyId: requisitionDetails?.currencyId || 0,
        currencyName: requisitionDetails?.currencyName || "",
        fiscalPosition: requisitionDetails?.fiscalPosition || "",
        billingStatus: requisitionDetails?.billingStatus || "",
        paymentTermsId: requisitionDetails?.paymentTermsId || 0,
        orderAmount: requisitionDetails?.reqAmount || 0,
        totalQuantity: requisitionDetails?.totalQuantity || 0,
        attachmentFile: requisitionDetails?.documentUrl || "",
        grandTotal: requisitionDetails?.reqAmount || calculatedGrandTotal,
        advancePaid: 0,
      })
      if (requisitionDetails.supplierId) {
        setSelectedSupplierTemplateId(requisitionDetails.supplierId)
      }
    }
  }, [requisitionDetails])

  useEffect(() => {
    if (supplierDetails && !isSupplierDetailsLoading) {
      const updatedFormValues = {
        ...formValues,
        supplierAddress: supplierDetails.companyAddress || "",
        supplierStreet: supplierDetails.street || "",
        supplierCity: supplierDetails.city || "",
        supplierState: supplierDetails.state || "",
        supplierCountry: supplierDetails.countryName || "",
        supplierZipCode: supplierDetails.zipCode || "",
        supplierContactPhone: supplierDetails.contactNumber || "",
        supplierContactName:
          `${supplierDetails.firstName || ""} ${supplierDetails.middleName || ""} ${supplierDetails.lastName || ""}`.trim(),
        supplierContactEmail: supplierDetails.contactEmail || "",
      }
      setFormValues(updatedFormValues)
    }
  }, [supplierDetails, isSupplierDetailsLoading, selectedSupplierTemplateId])

  const getFormValues = () => formValues

  const onSubmit: SubmitHandler<
    PurchasedOrderInput | PurchasedOrderUpdate
  > = async (data) => {
    const createData = {
      ...data,
      savePurchaseOrderItemDtos: productItems.map((item) => ({
        productId: item.productId || 0,
        itemUnitId: item.itemUnitId || 0,
        totalPrice: Number(item.totalPrice),
        quantity: Number(item.quantity),
        unitPrice: Number(item.unitPrice),
      })),
      purchaseOrderVatTaxDetails: paymentTaxCharges.map((taxCharge) => ({
        ...taxCharge,
        id: taxCharge.id || 0,
        purchaseOrderId: id || 0,
        taxTypeId: selectedTaxTypeId,
        taxTypeName: selectedTaxTypeName,
        chartOfAccountId: selectedChartOfAccountId,
        chartOfAccountName: selectedChartOfAccountName,
        rate: selectedTaxRate,
        amount: selectedTaxAmount,
        total: selectedTotalAmount,
      })),
    }

    const updateData = {
      ...data,
      id: id || 0,
      updatePurchaseOrderItemDtos: productItems.map((item) => ({
        // ...item,
        purchaseOrderItemId: id || 0,
        productId: item.productId || 0,
        itemUnitId: item.itemUnitId || 0,
        totalPrice: Number(item.totalPrice),
        quantity: Number(item.quantity),
        unitPrice: Number(item.unitPrice),
      })),
      purchaseOrderVatTaxDetails: paymentTaxCharges.map((taxCharge) => ({
        ...taxCharge,
        id: taxCharge.id || 0,
        purchaseOrderId: id || 0,
        taxTypeId: selectedTaxTypeId || taxCharge.taxTypeId || 0,
        taxTypeName: selectedTaxTypeName || taxCharge.taxTypeName || "",
        chartOfAccountId:
          selectedChartOfAccountId || taxCharge.chartOfAccountId || 0,
        chartOfAccountName:
          selectedChartOfAccountName || taxCharge.chartOfAccountName || "",
        rate: selectedTaxRate || taxCharge.rate || 0,
        amount: selectedTaxAmount || taxCharge.amount || 0,
        total: selectedTotalAmount || taxCharge.total || 0,
      })),
    }
    if (mode === "create") {
      await createPurchasedOrder(createData)
    } else {
      await updatePurchasedOrder({ data: updateData })
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
    isFieldDisabled,
    onSubmit,
    isLoading:
      isPurchaseOrderDetailsLoading ||
      isRequisitionDetailsLoading ||
      isCreatePending ||
      isUpdatePending,
  }
}