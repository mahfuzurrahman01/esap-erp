"use client"

import { useAtom } from "jotai"
import { useTranslations } from "next-intl"
import {
  Control,
  Controller,
  FormState,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form"

import FormGroup from "@/components/base/form-group"
import FormGroupContainer from "@/components/base/form-group-container"
import { Input, Select } from "@/components/ui"
import { paymentAmountAtom } from "@/modules/fms/store/payment-allocation"
import { useSCMSharedDataHook } from "@/modules/scm/constants/shared-data-hooks"
import {
  Invoice,
  InvoiceInput,
  InvoiceUpdate,
} from "@/modules/scm/types/procurement/invoice/invoice-types"
import {
  FindSelectOption,
  GetMenuListStyles,
} from "@/modules/scm/utils/select-options"

import AdditionalDiscountForm from "../additional-discount-form"
import CurrencyAndPriceListForm from "../currency-and-price-list-form"
import { ItemsListTable } from "../items-list/items-list-table"
import { PaymentTaxAndChargeTable } from "../payment-tax-and-charge/payment-tax-and-charge-table"
import PurchaseOrderInformationForm from "../purchase-invoice-information-form"
import TotalsAmountForm from "../totals-amount-form"
import { useInvoiceBillsForm } from "../use-invoice-bills-form"
import WarehouseInformationForm from "../warehouse-information-form"

interface DetailsFormProps {
  formMethods: {
    register: UseFormRegister<InvoiceInput | InvoiceUpdate>
    control: Control<InvoiceInput | InvoiceUpdate>
    formState: FormState<InvoiceInput | InvoiceUpdate>
    setValue: UseFormSetValue<InvoiceInput | InvoiceUpdate>
    watch: any
    getValues: any
  }
  isFieldDisabled?: boolean
  initialData?: Invoice
  isEditForm?: boolean
}

export default function DetailsForm({
  formMethods,
  isFieldDisabled,
  initialData,
  isEditForm,
}: DetailsFormProps) {
  const t = useTranslations("form")

  const {
    productItems,
    handleProductItemChange,
    handleProductItemDelete,
    handleProductItemAdd,
    paymentTaxCharges,
    handleTaxChargeChange,
    handleTaxChargeDelete,
    handleTaxChargeAdd,
    getFormValues,
  } = useInvoiceBillsForm({
    id: initialData?.id || 0,
    mode: isEditForm ? "edit" : "create",
  })

  const { register, control, formState, setValue, watch } =
    formMethods

  const [, setPaymentAmount] = useAtom(paymentAmountAtom)

  const { taxCharge, taxTemplate } = useSCMSharedDataHook([
    "taxCharge",
    "taxTemplate",
  ])

  const { taxChargeOptions, isTaxChargeLoading } = taxCharge
  const { taxTemplateOptions, isTaxTemplateLoading } = taxTemplate

  if (getFormValues()?.billAmount !== undefined) {
    // setValue("billAmount", getFormValues()?.billAmount)
    setPaymentAmount(getFormValues()?.billAmount || 0)
  }
  // useEffect(() => {
  // }, [getFormValues(), setValue, setPaymentAmount, totalTax])

  return (
    <>
      <FormGroupContainer>
        <FormGroup
          title={t("form-purchase-order-information")}
          className="pt-7 @2xl:pt-10 @3xl:pt-11">
          <PurchaseOrderInformationForm
            isFieldDisabled={isFieldDisabled}
            formMethods={{
              register,
              control,
              formState,
              setValue,
            }}
          />
        </FormGroup>
        <FormGroup
          title={t("form-currency-and-price-list")}
          className="pt-7 @2xl:pt-10 @3xl:pt-11">
          <CurrencyAndPriceListForm
            isFieldDisabled={isFieldDisabled}
            formMethods={{
              register,
              control,
              formState,
              setValue,
            }}
          />
        </FormGroup>
        <FormGroup
          title={t("form-warehouse-information")}
          className="pt-7 @2xl:pt-10 @3xl:pt-11">
          <WarehouseInformationForm
            isFieldDisabled={isFieldDisabled}
            formMethods={{
              register,
              control,
              formState,
              setValue,
            }}
          />
        </FormGroup>
        <FormGroup
          title={t("form-product-details")}
          className="pt-7 @2xl:pt-10 @3xl:pt-11"
          childrenContainerClassName="@2xl:grid-cols-1 @4xl:col-span-12">
          <ItemsListTable
            isFieldDisabled={isFieldDisabled}
            data={productItems}
            onRowChange={handleProductItemChange}
            onRowDelete={handleProductItemDelete}
            onAddRow={handleProductItemAdd}
            setValue={setValue}
          />
        </FormGroup>
        <FormGroup
          title={t("form-total")}
          className="pt-7 @2xl:pt-10 @3xl:pt-11">
          <Input
            label={t("form-total-quantity")}
            {...register("totalQuantity")}
            disabled={isFieldDisabled || true}
            isRequired
          />
          <Input
            label={t("form-total-amount")}
            {...register("billAmount")}
            value={watch("billAmount") || 0}
            disabled={isFieldDisabled || true}
            onChange={(e) => {
              const value = Number(e.target.value) || 0
              setPaymentAmount(value)
              setValue("billAmount", value)
              register("billAmount").onChange(e)
            }}
            isRequired
          />
        </FormGroup>
        <FormGroup
          title={t("form-tax-and-charges")}
          className="pt-7 @2xl:pt-10 @3xl:pt-11">
          <Controller
            control={control}
            name="taxCategoryId"
            render={({ field: { onChange, value } }) => (
              <Select
                label={t("form-tax-category")}
                labelClassName="text-title"
                placeholder={t("form-select-tax-category")}
                options={taxChargeOptions}
                onChange={(option: any) => onChange(option?.value)}
                value={FindSelectOption(taxChargeOptions, value)}
                isLoading={isTaxChargeLoading}
                isDisabled={isFieldDisabled}
                error={
                  formState.errors?.taxCategoryId?.message
                    ? t(formState.errors?.taxCategoryId?.message)
                    : ""
                }
                menuPortalTarget={document.body}
                styles={GetMenuListStyles(taxChargeOptions.length)}
              />
            )}
          />
          <Controller
            control={control}
            name="purchaseTaxTemplateId"
            render={({ field: { onChange, value } }) => (
              <Select
                label={t("form-tax-template")}
                labelClassName="text-title"
                placeholder={t("form-select-tax-template")}
                options={taxTemplateOptions}
                onChange={(option: any) => onChange(option?.value)}
                value={FindSelectOption(taxTemplateOptions, value)}
                isLoading={isTaxTemplateLoading}
                isDisabled={isFieldDisabled}
                error={
                  formState.errors?.purchaseTaxTemplateId?.message
                    ? t(formState.errors?.purchaseTaxTemplateId?.message)
                    : ""
                }
                menuPortalTarget={document.body}
                styles={GetMenuListStyles(taxTemplateOptions.length)}
              />
            )}
          />
        </FormGroup>
        <FormGroup
          title={t("form-payment-tax-and-charges")}
          className="pt-7 @2xl:pt-10 @3xl:pt-11"
          childrenContainerClassName="@2xl:grid-cols-1 @4xl:col-span-12">
          <PaymentTaxAndChargeTable
            isFieldDisabled={isFieldDisabled}
            // data={
            //   isFieldDisabled
            //     ? initialData?.invoiceVatTaxDetails
            //     : paymentTaxCharges
            // }
            data={paymentTaxCharges}
            onRowChange={handleTaxChargeChange}
            onRowDelete={handleTaxChargeDelete}
            onAddRow={handleTaxChargeAdd}
            setValue={setValue}
          />
          <div className="grid grid-cols-1 gap-4 @2xl:grid-cols-12">
            <Input
              type="number"
              label={t("form-total-tax")}
              placeholder={t("form-enter-total-tax")}
              className="@2xl:col-span-4 @2xl:col-start-9"
              // value={totalTax?.toFixed(2) || "0.00"}
              {...register("totalTax")}
              readOnly
              disabled={isFieldDisabled || true}
            />
          </div>
        </FormGroup>
        <FormGroup
          title={t("form-totals")}
          className="pt-7 @2xl:pt-10 @3xl:pt-11"
          childrenContainerClassName="@2xl:grid-cols-1">
          <TotalsAmountForm
            isFieldDisabled={isFieldDisabled}
            formMethods={{
              register,
              control,
              formState,
              setValue,
            }}
          />
        </FormGroup>
        <FormGroup
          title={t("form-additional-discount")}
          className="pt-7 @2xl:pt-10 @3xl:pt-11">
          <AdditionalDiscountForm
            isFieldDisabled={isFieldDisabled}
            formMethods={{
              register,
              control,
              formState,
              setValue,
            }}
          />
        </FormGroup>
      </FormGroupContainer>
    </>
  )
}
