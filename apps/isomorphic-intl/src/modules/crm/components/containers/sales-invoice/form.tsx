"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

import { Form } from "@core/ui/form"
import { useTranslations } from "next-intl"
import { SubmitHandler } from "react-hook-form"
import toast from "react-hot-toast"

import FormStickyActions from "@/components/base/form-sticky-actions"
import TabsNavigation from "@/components/base/tabs-navigation"
import Box from "@/components/ui/box"
import { routes } from "@/config/routes"
import {
  useCreateSalesInvoice,
  useCustomerById,
  useSalesOrderById,
  useUpdateSalesInvoice,
} from "@/modules/crm/hooks"
import { useAdvancedPayments } from "@/modules/crm/hooks/shared/use-advanced-payments"
import { CustomerData } from "@/modules/crm/types/customer"
import { SalesInvoice } from "@/modules/crm/types/sales-invoice"
import { useCompanyById } from "@/modules/fms/hooks/use-company"

import { useSOTemplate } from "../sales-orders/so-template"
import AddressAndContactForm from "./form-tabs/address-and-contact-form"
import DetailsForm from "./form-tabs/details-form"
import OthersForm from "./form-tabs/others-form"
import PaymentsForm from "./form-tabs/payments-form"
import TermsForm from "./form-tabs/terms-form"

export default function SalesrderForm({
  id,
  salesInvoiceData,
}: {
  id?: string
  salesInvoiceData?: any
}) {
  const t = useTranslations("form")
  const searchParams = useSearchParams()
  const orderIdFromParams = searchParams.get("salesOrderId")
  const [salesOrderId, setOrderId] = useState<string | null>(orderIdFromParams)

  const [isDisabled, setIsDisabled] = useState(orderIdFromParams != null)
  const [info, setInfo] = useState<any>({
    invoiceDate: "",
    dueDate: "",
    costCenterId: 0,
    bankAccountId: 0,
    currencyId: 0,
    priceList: 0,
    warehouseId: 0,
    taxCategoryId: 0,
    taxTemplateId: 0,
    isReturn: false,
    isRateAdjustmentEntry: false,
    ignorePricingRule: false,
    updateStock: false,
  })
  const { mutateAsync: createSalesInvoice, isPending: isCreating } =
    useCreateSalesInvoice()
  const { mutateAsync: updateSalesInvoice, isPending: isUpdating } =
    useUpdateSalesInvoice()
  const {
    entries,
    setEntries,
    addNewRow,
    handleRowChange,
    handleRowDelete,
    taxDetails,
    setTaxDetails,
    addNewVTRow,
    handleVTRowDelete,
    handleVTRowChange,
  } = useSOTemplate()

  const {
    advancedPayments,
    setAdvancedPayments,
    handleAdvancedPaymentChange,
    handleAdvancedPaymentDelete,
    handleAdvancedPaymentAdd,
  } = useAdvancedPayments()

  const salesOrder: any = useSalesOrderById(salesOrderId)
  const [orderData, setOrderData] = useState(salesOrder.data?.data)

  const [currencyBag, setCurrencyBag] = useState({
    customerId: 0,
    companyId: 0,
    customerCurrencyId: 0,
    customerCurrencyName: "",
    companyCurrencyId: "",
    companyCurrencyName: "",
  })

  const output: any = useCustomerById(currencyBag?.customerId)
  const outputData: any = useCompanyById(currencyBag?.companyId)

  useEffect(() => {
    if (output?.data) {
      setCurrencyBag((prev) => ({
        ...prev,
        customerCurrencyId: output?.data?.currency,
        customerCurrencyName: output?.data?.symbol,
      }))
    }
    if (outputData?.data) {
      setCurrencyBag((prev:any) => ({
        ...prev,
        companyCurrencyId: outputData?.data?.currencyId,
        companyCurrencyName: outputData?.data?.symbol,
      }))
    }
  }, [output?.data, outputData?.data])

  useEffect(() => {
    if (salesOrder.data) {
      const productDetails = salesOrder.data?.data?.salesOrderDetails?.map(
        (detail: any) => ({
          id: detail.id,
          productId: detail.productId,
          quantity: detail.quantity,
          unitPrice: detail.unitPrice,
          totalPrice: detail.unitPrice * detail.quantity,
        })
      )
      setEntries(productDetails)
      setOrderData(salesOrder.data?.data)
      const taxEntries =
        salesOrder.data?.data?.salesOrderVatTaxDetailsDTOs?.map(
          (detail: any) => ({
            id: detail.id,
            chartOfAccountId: detail.chartOfAccountId,
            taxRate: detail.taxRate,
            taxAmount: detail.taxAmount,
            taxTypeId: detail.taxTypeId,
            total: detail.taxAmount,
          })
        )
      setTaxDetails(taxEntries!)
      setIsDisabled(true)
    }
  }, [salesOrder.data])

  const [discount, setDiscount] = useState({
    discountType: 0,
    percentage: 0,
    amount: 0,
  })

  const [summary, setSummary] = useState({
    subtotal: 0,
    discountAmount: 0,
    taxes: 0,
    total: 0,
    quantity: 0,
    grandTotal: 0,
    totalAdvanceQuantity: 0,
    totalAdvanceAmount: 0,
    outstandingAmount: 0,
    exchangeRate: 0,
  })

  useEffect(() => {
    if (salesInvoiceData?.invoiceProductDetailsDTOs) {
      const salesInvoiceEntries =
        salesInvoiceData?.invoiceProductDetailsDTOs?.map((detail: any) => ({
          id: detail.id,
          productId: detail.productId,
          quantity: detail.quantity,
          unitPrice: detail.unitPrice,
          totalPrice: detail.totalPrice,
        }))
      setEntries(salesInvoiceEntries)
      setIsDisabled(salesInvoiceData?.salesOrderId ? true : false)
      const taxEntries = salesInvoiceData?.invoiceVatTaxDetailsDTOs?.map(
        (detail: any) => ({
          id: detail.id,
          chartOfAccountId: detail.chartOfAccountId,
          taxRate: detail.taxRate,
          taxAmount: detail.taxAmount,
          taxTypeId: detail.taxTypeId,
          total: detail.taxAmount,
        })
      )
      setTaxDetails(taxEntries!)
      const advancedPaymentsData =
        salesInvoiceData?.invoiceAdvancePayments?.map((detail: any) => ({
          id: detail.id,
          referenceName: detail.referenceName,
          remarks: detail.remarks,
          advanceAmount: detail.advanceAmount,
          allocatedAmount: detail.allocatedAmount,
        }))
      setAdvancedPayments(advancedPaymentsData!)
    }
  }, [salesInvoiceData, setEntries, setTaxDetails, setAdvancedPayments])

  const calculateSummary = () => {
    const subtotal =
      entries?.reduce((sum, entry) => sum + entry.totalPrice!, 0) || 0

    const taxes =
      taxDetails?.reduce((sum, tax) => {
        let taxAmount = 0
        if (tax.taxTypeId == 1) {
          taxAmount = (tax.taxRate! / 100) * subtotal
        } else {
          taxAmount = tax.taxAmount || 0
        }
        return sum + taxAmount
      }, 0) || 0

    let discountAmount = 0

    if (discount?.percentage > 0) {
      discountAmount = (discount.percentage / 100) * subtotal
    } else {
      discountAmount = discount?.amount || 0
    }

    const total = subtotal - discountAmount + Number(taxes)
    const grandTotal = subtotal + Number(taxes)

    const quantity =
      entries?.reduce((sum, entry) => sum + (entry.quantity || 0), 0) || 0
    const totalAdvanceQuantity = advancedPayments?.length
    const totalAdvanceAmount =
      advancedPayments?.reduce(
        (sum, entry) => sum + (entry.advanceAmount || 0),
        0
      ) || 0
    const outstandingAmount = total - totalAdvanceAmount || 0

    const exchangeRate = summary?.exchangeRate

    const formatNumber = (value:any) => (isNaN(value) || value === null ? 0.0 : parseFloat(Number(value).toFixed(2)));

    setSummary({
      subtotal: formatNumber(subtotal),
      discountAmount: formatNumber(discountAmount),
      taxes: formatNumber(taxes),
      total: formatNumber(total),
      quantity: formatNumber(quantity),
      grandTotal: formatNumber(grandTotal),
      totalAdvanceQuantity: formatNumber(totalAdvanceQuantity),
      totalAdvanceAmount: formatNumber(totalAdvanceAmount),
      outstandingAmount: formatNumber(outstandingAmount),
      exchangeRate: formatNumber(exchangeRate),
    });
    
  }

  useEffect(() => {
    calculateSummary()
  }, [entries, taxDetails, discount, advancedPayments])

  const onSubmit: SubmitHandler<SalesInvoice> = async (formData) => {
    const newFormData = {
      Status: formData.status,
      CustomerId: formData.customerId,
      UpdateStock: formData.updateStock,
      SalesOrderId: formData.salesOrderId,
      InvoiceNo: formData.invoiceNo,
      CurrencyId: formData.currencyId,
      CustomerCurrencyId: formData.customerCurrencyId,
      CompanyCurrencyId: formData.companyCurrencyId,
      ExchangeRate: formData.exchangeRate,
      DueDate: formData.dueDate,
      CompanyId: formData.companyId,
      InvoiceDate: formData.invoiceDate,
      PaymentTerms: formData.paymentTerms,
      ShippingStreet: formData.shippingStreet,
      ShippingHouse: formData.shippingHouse,
      ShippingZip: formData.shippingZip,
      ShippingState: formData.shippingState,
      ShippingCity: formData.shippingCity,
      ShippingCountryId: formData.shippingCountryId,
      shippingContactPerson: formData.shippingContactPerson,
      BillingStreet: formData.billingStreet,
      BillingHouse: formData.billingHouse,
      BillingZip: formData.billingZip,
      BillingState: formData.billingState,
      BillingCity: formData.billingCity,
      BillingCountryId: formData.billingCountryId,
      BillingContactPerson: formData.billingContactPerson,
      CompanyStreet: formData.companyStreet,
      CompanyHouse: formData.companyHouse,
      CompanyZip: formData.companyZip,
      CompanyState: formData.companyState,
      CompanyCity: formData.companyCity,
      CompanyCountryId: formData.companyCountryId,
      CompanyContactPerson: formData.companyContactPerson,
      DiscountType: formData.discountType,
      DiscountAmount: formData.discountAmount,
      Subtotal: summary.subtotal,
      Discount: summary.discountAmount,
      Tax: summary.taxes,
      Total: summary.total,
      ApplyDiscount: formData.applyDiscount,
      TotalQuantity: formData.totalQuantity,
      TotalAmount: formData.totalAmount,
      TotalAmountOnCustomerCurrency: formData.totalAmountOnCustomerCurrency,
      TotalAmountOnCompanyCurrency: formData.totalAmountOnCompanyCurrency,
      grandTotal: formData.grandTotal,
      TotalAdvanceAmount: formData.totalAdvanceAmount,
      TotalAdvanceQuantity: formData.totalAdvanceQuantity,
      IsOpeningEntry: formData.isOpeningEntry || false,
      DiscountPercentage: formData.discountPercentage || 0,
      IgnorePricingRule: formData.ignorePricingRule || false,
      IsCashOrNonTradeDiscount: formData.isCashOrNonTradeDiscount || false,
      IsRateAdjustmentEntry: formData.isRateAdjustmentEntry || false,
      IsReturn: formData.isReturn || false,
      NetPayable: formData.netPayable,
      TotalAdvance: formData.totalAdvance,
      TotalTaxes: formData.totalTaxes || "0",
      OutstandingAmount: formData.outstandingAmount,
      BankAccountId: formData.bankAccountId,
      CostCenterId: formData.costCenterId,
      CustomerPODate: formData.customerPODate,
      CustomersPO: formData.customersPO,
      DebitToId: formData.debitToId,
      PriceList: formData.priceList,
      TaxCategoryId: formData.taxCategoryId,
      TaxTemplateId: formData.taxTemplateId,
      WarehouseId: formData.warehouseId,
      Description: formData.description,
      GrandTotalOnCustomerCurrency: formData.grandTotalOnCustomerCurrency,
      GrandTotalOnCompanyCurrency: formData.grandTotalOnCompanyCurrency,
      InvoiceProductDetailsDTOs: entries.map((detail) => ({
        ProductId: detail.productId,
        Quantity: detail.quantity,
        UnitPrice: detail.unitPrice,
        totalPrice: detail.totalPrice,
      })),
      InvoiceVatTaxDetailsDTOs: taxDetails.map((detail) => ({
        TaxTypeId: detail.taxTypeId,
        ChartOfAccountId: detail.chartOfAccountId,
        TaxRate: detail.taxRate,
        TaxAmount: detail.taxAmount,
        total: detail.taxAmount,
      })),
      InvoiceAdvancePayments: advancedPayments.map((detail) => ({
        referenceName: detail.referenceName,
        remarks: detail.remarks,
        advanceAmount: detail.advanceAmount,
        allocatedAmount: detail.allocatedAmount,
      })),
    }
    const hasInvalidEntries = newFormData.InvoiceProductDetailsDTOs.some(
      (detail: any) => !detail.ProductId || detail.Quantity <= 0
    )

    if (hasInvalidEntries) {
      toast.error(
        "Product ID and Quantity are required and must be greater than 0."
      )
      return
    }

    // console.log("newFormData", newFormData)

    if (id) {
      await updateSalesInvoice({
        id,
        data: newFormData,
      })
    } else {
      await createSalesInvoice(newFormData)
    }
  }

  const handleOrderChange = (selectedOrderId: string) => {
    setOrderId(selectedOrderId)
  }

  const handleCustomerChange = (selectedCustomerId: string) => {
    setCurrencyBag((prev: any) => ({
      ...prev,
      customerId: selectedCustomerId,
    }))
  }

  const handleCompanyChange = (selectedCompanyId: string) => {
    setCurrencyBag((prev: any) => ({
      ...prev,
      companyId: selectedCompanyId,
    }))
  }

  const isFieldDisabled = false
  const defaultValues = {
    ...salesInvoiceData,
    salesOrderId: salesOrderId || salesInvoiceData?.salesOrderId,
    totalQuantity: summary?.quantity || salesInvoiceData?.totalQuantity,
    totalAmount: summary?.subtotal || salesInvoiceData?.totalAmount,
    totalAmountOnCustomerCurrency: summary?.subtotal || salesInvoiceData?.totalAmountOnCustomerCurrency,
    totalAmountOnCompanyCurrency: summary?.subtotal * summary?.exchangeRate || salesInvoiceData?.totalAmountOnCustomerCurrency,
    grandTotal: summary?.grandTotal || salesInvoiceData?.grandTotal || 0,
    netPayable: summary?.total || salesInvoiceData?.netPayable || 0,
    totalAdvanceQuantity:
      summary?.totalAdvanceQuantity || salesInvoiceData?.totalAdvanceQuantity,
    totalAdvanceAmount:
      summary?.totalAdvanceAmount || salesInvoiceData?.totalAdvanceAmount,
    discountType: "grandTotal",
    status: salesInvoiceData?.status || "Draft",
    discountAmount: summary?.discountAmount || salesInvoiceData?.discountAmount,
    totalAdvance:
      summary?.totalAdvanceAmount || salesInvoiceData?.totalAdvanceAmount || 0,
    outstandingAmount:
      summary?.outstandingAmount || salesInvoiceData?.outstandingAmount || 0,
    customerId: currencyBag?.customerId || orderData?.customerId || salesInvoiceData?.customerId,
    companyId: currencyBag?.companyId || orderData?.companyId || salesInvoiceData?.companyId,
    currencyId: info?.currencyId || orderData?.currencyId || salesInvoiceData?.currencyId,
    discountPercentage: discount.percentage || salesInvoiceData?.discountPercentage || 0,
    customerCurrencyId: currencyBag?.customerCurrencyId || salesInvoiceData?.customerCurrencyId,
    companyCurrencyId: currencyBag?.companyCurrencyId || salesInvoiceData?.companyCurrencyId,
    grandTotalOnCustomerCurrency: (summary?.grandTotal || salesInvoiceData?.grandTotal) || 0,
    grandTotalOnCompanyCurrency: (summary?.grandTotal * summary?.exchangeRate || salesInvoiceData?.grandTotal * summary?.exchangeRate) || 0,
    invoiceDate: info?.invoiceDate || salesInvoiceData?.invoiceDate,
    dueDate: info?.dueDate || salesInvoiceData?.dueDate,
    costCenterId: info?.costCenterId || salesInvoiceData?.costCenterId,
    bankAccountId: info?.bankAccountId || salesInvoiceData?.bankAccountId,
    priceList: info?.priceList || salesInvoiceData?.priceList,
    warehouseId: info?.warehouseId || salesInvoiceData?.warehouseId,
    taxCategoryId: info?.taxCategoryId || salesInvoiceData?.taxCategoryId,
    taxTemplateId: info?.taxTemplateId || salesInvoiceData?.taxTemplateId,
    isReturn: info?.isReturn || salesInvoiceData?.isReturn,
    isRateAdjustmentEntry: info?.isRateAdjustmentEntry || salesInvoiceData?.isRateAdjustmentEntry,
    ignorePricingRule: info?.ignorePricingRule || salesInvoiceData?.ignorePricingRule,
    updateStock: info?.updateStock || salesInvoiceData?.updateStock,
  }

  return (
    <Box className="md:mt-0">
      <Form<SalesInvoice>
        onSubmit={onSubmit}
        className="flex grow flex-col justify-between @container"
        useFormProps={{
          defaultValues: defaultValues,
          mode: "onChange",
          reValidateMode: "onChange",
          values: defaultValues,
        }}>
        {({ register, control, formState, setValue, watch }) => {
          const tabs = [
            {
              label: t("form-details"),
              content: (
                <DetailsForm
                  formMethods={{
                    register,
                    control,
                    setValue,
                    formState,
                    watch,
                  }}
                  initialData={defaultValues}
                  isFieldDisabled={false}
                  entries={entries}
                  setEntries={setEntries}
                  addNewRow={addNewRow}
                  handleRowChange={handleRowChange}
                  handleRowDelete={handleRowDelete}
                  taxDetails={taxDetails}
                  setTaxDetails={setTaxDetails}
                  addNewVTRow={addNewVTRow}
                  handleVTRowDelete={handleVTRowDelete}
                  handleVTRowChange={handleVTRowChange}
                  summary={summary}
                  setDiscount={setDiscount}
                  handleOrderChange={handleOrderChange}
                  handleCustomerChange={handleCustomerChange}
                  handleCompanyChange={handleCompanyChange}
                  isDisabled={isDisabled}
                  currencyBag={currencyBag}
                  setSummary={setSummary}
                  info={info}
                  setInfo={setInfo}
                />
              ),
            },
            {
              label: t("form-payments"),
              content: (
                <PaymentsForm
                  formMethods={{ register, control, setValue, formState }}
                  initialData={defaultValues}
                  isFieldDisabled={isFieldDisabled}
                  advancedPayments={advancedPayments}
                  setAdvancedPayments={setAdvancedPayments}
                  handleAdvancedPaymentChange={handleAdvancedPaymentChange}
                  handleAdvancedPaymentDelete={handleAdvancedPaymentDelete}
                  handleAdvancedPaymentAdd={handleAdvancedPaymentAdd}
                />
              ),
            },
            {
              label: t("form-address-and-contact"),
              content: (
                <AddressAndContactForm
                  formMethods={{ register, control, setValue, formState }}
                  initialData={defaultValues}
                  isFieldDisabled={isFieldDisabled}
                />
              ),
            },
            {
              label: t("form-terms"),
              content: (
                <TermsForm
                  formMethods={{ register, control, setValue, formState }}
                  initialData={defaultValues}
                  isFieldDisabled={isFieldDisabled}
                />
              ),
            },
            {
              label: t("form-others"),
              content: (
                <OthersForm
                  formMethods={{ register, control, setValue, formState }}
                  initialData={defaultValues}
                  isFieldDisabled={isFieldDisabled}
                />
              ),
            },
          ]
          return (
            <Box className="md:mt-0">
              <TabsNavigation tabs={tabs} className="flex-grow" />
              {!isFieldDisabled && (
                <FormStickyActions
                  className="mt-7"
                  backToListPath={routes.crm.invoices}
                  isLoading={isCreating || isUpdating}
                />
              )}
            </Box>
          )
        }}
      </Form>
    </Box>
  )
}
