"use client"

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
import {
  useCreateQuotation,
  useUpdateQuotation,
} from "@/modules/crm/hooks/use-quotation"
import { Quotation, QuotationDetail } from "@/modules/crm/types/quotation"
import { quotationFormSchema } from "@/modules/crm/validators/quotation-schema"

import { AddressFields } from "../sales-orders/address-fields"
import { useQuotationEntryColumns } from "./details-column"
import { InformationFields } from "./information-fields"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

export default function CreateEditForm({
  id,
  quotationData,
}: {
  id?: string
  quotationData?: Quotation
}) {
  const t = useTranslations("form")
  const router = useRouter()
  const [quotationType, setQuotationType] = useState(
    quotationData?.type || "Product"
  )

  const quotationEntryColumns = useQuotationEntryColumns(quotationType)
  const { mutateAsync: createQuotation, isPending: isCreating } =
    useCreateQuotation()
  const { mutateAsync: updateQuotation, isPending: isUpdating } =
    useUpdateQuotation()

  const [entries, setEntries] = useState<QuotationDetail[]>([
    {
      id: 0,
      productId: "",
      quantity: 0,
      unitPrice: 0,
      totalPrice: 0,
    },
  ])

  useEffect(() => {
    if (quotationData?.quotationDetails) {
      setQuotationType(quotationData.type || "Product")
      const quotationEntries = quotationData?.quotationDetails?.map(
        (detail) => ({
          id: 0,
          productId: detail.productId,
          quantity: detail.quantity || 0,
          unitPrice: detail.unitPrice || 0,
          totalPrice: detail.unitPrice! * detail.quantity!,
        })
      )
      setEntries(quotationEntries)
    }
  }, [quotationData])

  const addNewRow = () => {
    const newEntry: QuotationDetail = {
      id: 0,
      productId: "",
      quantity: 0,
      unitPrice: 0,
      totalPrice: 0,
    }

    const updatedEntries = [...entries, newEntry]
    setEntries(updatedEntries)
  }

  const handleRowChange = (index: number, field: string, value: any) => {
    const newEntries = [...entries]
    newEntries[index] = {
      ...newEntries[index],
      [field]: value,
    }
    setEntries(newEntries)
  }

  const handleRowDelete = (index: number) => {
    const newEntries = entries.filter((_, i) => i !== index)
    // Update serial numbers
    const updatedEntries = newEntries.map((entry, i) => ({
      ...entry,
      sn: i + 1,
    }))
    setEntries(updatedEntries)
  }

  const onSubmit: SubmitHandler<Quotation> = async (formData) => {
    const newFormData = {
      Type: quotationType,
      Title: formData.title,
      CustomerId: formData.customerId,
      QuotationNo: formData.quotationNo,
      Description: formData.description,
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
      ExpiryDate: formData.expiryDate,
      PaymentTerms: formData.paymentTerms,
      DeliveryStatus: formData.courier,
      Status: formData.status,
      QuotationDetails: entries.map((detail: any) => ({
        ProductId: detail.productId,
        Unit: detail.unit,
        Quantity: detail.quantity,
        UnitPrice: detail.unitPrice,
        Vat: detail.vat,
        Tax: detail.tax,
        Discount: detail.discount,
      })),
    }
    const hasInvalidEntries = newFormData.QuotationDetails.some(
      (detail) => !detail.ProductId || detail.Quantity <= 0
    );

    if (hasInvalidEntries) {
      toast.error("Product ID and Quantity are required and must be greater than 0.");
      return;
    }
    if (id) {
      await updateQuotation({
        id,
        data: newFormData,
      })
    } else {
      await createQuotation(newFormData)
    }
  }

  const defaultValues = {
    ...quotationData,
    type: quotationData?.type || "Product",
    customerId: quotationData?.customerId || "",
    quotationNo: quotationData?.quotationNo || "",
    description: quotationData?.description || "",
    expiryDate: quotationData?.expiryDate || "",
    paymentTerms: quotationData?.paymentTerms || "",
    courier: quotationData?.deliveryStatus || "",
  }

  return (
    <Box className="md:mt-0">
      <Form<Quotation>
        validationSchema={quotationFormSchema}
        onSubmit={onSubmit}
        className="flex grow flex-col justify-between pt-7 @container @2xl:pt-9 @3xl:pt-11"
        useFormProps={{
          defaultValues: defaultValues,
        }}>
        {({
          register,
          control,
          formState: { errors },
        }) => {
          // console.log('errors', errors)
          return (
            <>
              <FormGroupContainer>
                <InformationFields
                  register={register}
                  control={control}
                  errors={errors}
                  setQuotationType={setQuotationType}
                  setEntries={setEntries}
                />

                <AddressFields register={register} control={control} />

                <FormGroup
                  title={t("form-quotation-details")}
                  className="pt-7 @2xl:pt-10 @3xl:pt-11"
                  childrenContainerClassName="@2xl:grid-cols-1 @4xl:col-span-12">
                  <div className="space-y-4">
                    <TableGrid
                      columns={quotationEntryColumns}
                      data={entries}
                      gridTemplateColumns="50px 610px 220px 220px 220px 60px"
                      variant="modern"
                      onRowChange={handleRowChange}
                      onRowDelete={handleRowDelete}
                    />
                    <Button
                      variant="outline"
                      onClick={addNewRow}
                      className="mt-4">
                      <PiPlusBold className="me-2 h-4 w-4" />
                      {t("form-add-row")}
                    </Button>
                  </div>
                </FormGroup>
              </FormGroupContainer>

              <FormFooter
                isLoading={isCreating || isUpdating}
                altBtnText={t("form-cancel")}
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
