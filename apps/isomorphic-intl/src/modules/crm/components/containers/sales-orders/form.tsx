"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

import { Form } from "@core/ui/form"
import { useTranslations } from "next-intl"
import { SubmitHandler } from "react-hook-form"
import { PiPlusBold } from "react-icons/pi"

import FormFooter from "@/components/base/form-footer"
import FormGroupContainer from "@/components/base/form-group-container"
import { Button } from "@/components/ui"
import Box from "@/components/ui/box"
import TableGrid from "@/components/ui/table-grid"
import FormGroup from "@/modules/crm/components/base/form-group"
import { useQuotationById } from "@/modules/crm/hooks/use-quotation"
import {
  useCreateSalesOrder,
  useUpdateSalesOrder,
} from "@/modules/crm/hooks/use-sales-order"
import { SalesOrder } from "@/modules/crm/types/sales-order"
import { salesOrderFormSchema } from "@/modules/crm/validators/sales-order-schema"

import { AddressFields } from "./address-fields"
import { useSalesOrderEntryColumns } from "./details-column"
import { DiscountInformation } from "./discount-fields"
import { SalesOrderInformation } from "./information-fields"
import { useSOTemplate } from "./so-template"
import { SummaryInformation } from "./summary-fields"
import { useVatTaxColumns } from "./vat-tax-column"
import toast from "react-hot-toast"

export default function SalesrderForm({
  id,
  salesOrderData,
}: {
  id?: string
  salesOrderData?: SalesOrder
}) {
  const t = useTranslations("form")
  const router = useRouter()
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
  const searchParams = useSearchParams()
  const quotationIdFromParams = searchParams.get("quotationId")
  const [quotationId, setQuotationId] = useState<string | null>(
    quotationIdFromParams
  )
  const [info, setInfo] = useState<any>({
    customerId: "",
    postingDate: "",
    delivaryDate: "",
    companyId: 0,
    currencyId: 0,
  })
  const [salesOrderType, setSalesOrderType] = useState("Product")
  const [isDisabled, setIsDisabled] = useState(quotationIdFromParams != null)
  const { mutateAsync: createSalesOrder, isPending: isCreating } =
    useCreateSalesOrder()
  const { mutateAsync: updateSalesOrder, isPending: isUpdating } =
    useUpdateSalesOrder()
  const salesOrderEntryColumns = useSalesOrderEntryColumns(salesOrderType, isDisabled)
  const vatTaxColumns = useVatTaxColumns()

  const quotationQuery: any = useQuotationById(quotationId)
  const [quotationData, setQuotationData] = useState(quotationQuery.data?.data)

  useEffect(() => {
    if (quotationQuery.data) {
      const productDetails = quotationQuery.data?.data?.quotationDetails?.map(
        (detail: any) => ({
          id: detail.id,
          productId: detail.productId,
          quantity: detail.quantity,
          unitPrice: detail.unitPrice,
          totalPrice: detail.unitPrice * detail.quantity,
        })
      )
      setEntries(productDetails)
      setQuotationData(quotationQuery.data?.data)
      setIsDisabled(true)
    }
  }, [quotationQuery.data])

  const [discount, setDiscount] = useState({
    discountType: "",
    amount: 0,
  })

  const [summary, setSummary] = useState({
    subtotal: 0,
    discountAmount: 0,
    taxes: 0,
    total: 0,
  })

  useEffect(() => {
    if (salesOrderData?.salesOrderDetails) {
      setSalesOrderType(salesOrderData.type || "Product")
      const salesOrderEntries = salesOrderData?.salesOrderDetails?.map(
        (detail: any) => ({
          id: detail.id,
          productId: detail.productId,
          quantity: detail.quantity,
          unitPrice: detail.unitPrice,
          totalPrice: detail.unitPrice * detail.quantity,
        })
      )
      setEntries(salesOrderEntries)
      setIsDisabled(salesOrderData?.quotationId ? true : false)
      const taxEntries = salesOrderData?.salesOrderVatTaxDetailsDTOs?.map(
        (detail) => ({
          id: detail.id,
          chartOfAccountId: detail.chartOfAccountId,
          taxRate: detail.taxRate,
          taxAmount: detail.taxAmount,
          taxTypeId: detail.taxTypeId,
        })
      )
      setTaxDetails(taxEntries!)
    }
  }, [salesOrderData, setEntries, setTaxDetails])

  // console.log("isDisabled",isDisabled)

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

    if (discount?.discountType == "Percentage") {
      discountAmount = (discount.amount / 100) * subtotal
    } else {
      discountAmount = discount?.amount || 0
    }

    const total = subtotal - discountAmount + Number(taxes)

    setSummary({
      subtotal: Number(Number(subtotal ?? 0).toFixed(2)),
      discountAmount: Number(Number(discountAmount ?? 0).toFixed(2)),
      taxes: Number(Number(taxes ?? 0).toFixed(2)),
      total: Number(Number(total ?? 0).toFixed(2)),
    });     
  }

  useEffect(() => {
    calculateSummary()
  }, [entries, taxDetails, discount])

  const onSubmit: SubmitHandler<SalesOrder> = async (formData: any) => {
    const newFormData = {
      Type: formData.type,
      Title: formData.title,
      CustomerId: formData.customerId,
      QuotationId: formData.quotationId,
      SalesOrderNo: formData.salesOrderNo,
      CurrencyId: formData.currencyId,
      DelivaryDate: formData.delivaryDate,
      UpdateStock: formData.updateStock,
      CompanyId: formData.companyId,
      Stages: formData.stages,
      PostingDate: formData.postingDate,
      ShippingStreet: formData.shippingStreet,
      ShippingHouse: formData.shippingHouse,
      ShippingZip: formData.shippingZip,
      ShippingState: formData.shippingState,
      ShippingCity: formData.shippingCity,
      ShippingCountryId: formData.shippingCountryId,
      BillingStreet: formData.billingStreet,
      BillingHouse: formData.billingHouse,
      BillingZip: formData.billingZip,
      BillingState: formData.billingState,
      BillingCity: formData.billingCity,
      BillingCountryId: formData.billingCountryId,
      DiscountType: formData.discountType,
      ApplyAmount: formData.applyAmount,
      DiscountAmount: formData.discountAmount,
      Subtotal: summary.subtotal,
      Discount: summary.discountAmount,
      Tax: summary.taxes,
      Total: summary.total,
      SalesOrderDetails: entries.map((detail) => ({
        ProductId: detail.productId,
        Quantity: detail.quantity,
        UnitPrice: detail.unitPrice,
        totalPrice: detail.totalPrice,
      })),
      SalesOrderVatTaxDetailsDTOs: taxDetails.map((detail) => ({
        TaxTypeId: detail.taxTypeId,
        ChartOfAccountId: detail.chartOfAccountId,
        TaxRate: detail.taxRate,
        TaxAmount: detail.taxAmount,
      })),
    }
    const hasInvalidEntries = newFormData.SalesOrderDetails.some(
      (detail:any) => !detail.ProductId || detail.Quantity <= 0
    );

    if (hasInvalidEntries) {
      toast.error("Product ID and Quantity are required and must be greater than 0.");
      return;
    }
    // console.log("newFormData", newFormData)
    if (id) {
      await updateSalesOrder({
        id,
        data: newFormData,
      })
    } else {
      await createSalesOrder(newFormData)
    }
  }

  const handleQuotationChange = (selectedQuotationId: string) => {
    setQuotationId(selectedQuotationId)
  }

  const isFieldDisabled = false
  const defaultValues = {
    ...salesOrderData,
    ...quotationData,
    quotationId: quotationIdFromParams || salesOrderData?.quotationId || quotationData?.id,
    discountAmount: salesOrderData?.discountAmount || 0,
    type: salesOrderData?.type || "Product",
    stages: salesOrderData?.stages || "Draft",
    customerId: info?.customerId || quotationData?.customerId || salesOrderData?.customerId,
    postingDate: info?.postingDate || salesOrderData?.postingDate,
    delivaryDate: info?.delivaryDate || salesOrderData?.delivaryDate,
    companyId: info?.companyId || Number(salesOrderData?.companyId),
    currencyId: info?.currencyId || Number(salesOrderData?.currencyId),
  }
  return (
    <Box className="md:mt-0">
      <Form<SalesOrder>
        validationSchema={salesOrderFormSchema}
        onSubmit={onSubmit}
        className="flex grow flex-col justify-between pt-7 @container @2xl:pt-9 @3xl:pt-11"
        useFormProps={{
          defaultValues: defaultValues,
          values: defaultValues,
          mode: "onChange",
        }}>
        {({ register, control, setValue, formState: { errors } }) => {
          // console.log("errors", errors)
          return (
            <>
              <FormGroupContainer>
                <SalesOrderInformation
                  register={register}
                  control={control}
                  errors={errors}
                  isFieldDisabled={isFieldDisabled}
                  salesOrderType={salesOrderType}
                  setSalesOrderType={setSalesOrderType}
                  setEntries={setEntries}
                  handleQuotationChange={handleQuotationChange}
                  quotationData={quotationData}
                  info={info}
                  setInfo={setInfo}
                />

                <AddressFields register={register} control={control} />

                <FormGroup
                  title={t("form-product-data")}
                  className="pt-7 @2xl:pt-10 @3xl:pt-11"
                  childrenContainerClassName="@2xl:grid-cols-1 @4xl:col-span-12">
                  <div className="space-y-4">
                    <TableGrid
                      columns={salesOrderEntryColumns}
                      data={entries}
                      gridTemplateColumns="50px 610px 220px 220px 220px 60px"
                      variant="modern"
                      onRowChange={handleRowChange}
                      onRowDelete={handleRowDelete}
                    />
                    {!isDisabled && (
                      <Button
                        variant="outline"
                        onClick={addNewRow}
                        disabled={isDisabled}
                        className="mt-4">
                        <PiPlusBold className="me-2 h-4 w-4" />
                        {t("form-add-row")}
                    </Button>)}
                  </div>
                </FormGroup>

                <FormGroup
                  title={t("form-tax-and-charges")}
                  className="pt-7 @2xl:pt-10 @3xl:pt-11"
                  childrenContainerClassName="@2xl:grid-cols-1 @4xl:col-span-12">
                  <div className="space-y-4">
                    <TableGrid
                      columns={vatTaxColumns}
                      data={taxDetails}
                      gridTemplateColumns="50px 430px 430px 210px 210px 80px"
                      variant="modern"
                      onRowChange={handleVTRowChange}
                      onRowDelete={handleVTRowDelete}
                    />
                    <Button
                      variant="outline"
                      onClick={addNewVTRow}
                      className="mt-4">
                      <PiPlusBold className="me-2 h-4 w-4" />
                      {t("form-add-row")}
                    </Button>
                  </div>
                </FormGroup>

                {/* <DiscountInformation
                  register={register}
                  control={control}
                  setDiscount={setDiscount}
                  setValue={setValue}
                /> */}

                <SummaryInformation
                  register={register}
                  control={control}
                  setDiscount={setDiscount}
                  setValue={setValue}
                  salesOrderData={salesOrderData}
                  summary={summary}
                />
              </FormGroupContainer>
              <FormFooter
                isLoading={isCreating || isUpdating}
                altBtnText={t("form-cancel")}
                altBtnColor="danger"
                submitBtnText="Submit"
                className="border-gray-500/20 dark:bg-paper"
                handleAltBtn={() => {
                  router.back()
                }}
              />
            </>
          )
        }}
      </Form>
    </Box>
  )
}
