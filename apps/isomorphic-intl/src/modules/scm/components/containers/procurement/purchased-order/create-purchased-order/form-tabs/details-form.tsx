"use client"

import { useEffect } from "react"

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
import { Input } from "@/components/ui"
import Select from "@/components/ui/select"
import { useSCMSharedDataHook } from "@/modules/scm/constants/shared-data-hooks"
import { paymentAmountAtom } from "@/modules/scm/store/global-store-state"
import { totalTaxAtom } from "@/modules/scm/store/purchase-order"
import {
  PurchasedOrder,
  PurchasedOrderInput,
  PurchasedOrderUpdate,
} from "@/modules/scm/types/procurement/purchased-order/purchased-order-types"
import {
  FindSelectOption,
  GetMenuListStyles,
} from "@/modules/scm/utils/select-options"

import AdditionalDiscountForm from "../additional-discount-form"
import { ItemsListTable } from "../items-list/items-list-table"
import { PaymentTaxAndChargeTable } from "../payment-tax-and-charge/payment-tax-and-charge-table"
import PurchaseOrderInformationForm from "../purchase-order-information-form"
import TotalsAmountForm from "../totals-amount-form"
import { usePurchasedOrderForm } from "../use-purchased-order-form"

interface DetailsFormProps {
  formMethods: {
    register: UseFormRegister<PurchasedOrderInput | PurchasedOrderUpdate>
    control: Control<PurchasedOrderInput | PurchasedOrderUpdate>
    formState: FormState<PurchasedOrderInput | PurchasedOrderUpdate>
    setValue: UseFormSetValue<PurchasedOrderInput | PurchasedOrderUpdate>
    watch: any
    getValues: any
  }
  isFieldDisabled?: boolean
  initialData?: PurchasedOrder
  isEditForm?: boolean
}

export default function DetailsForm({
  formMethods,
  isFieldDisabled,
  initialData,
  isEditForm,
}: DetailsFormProps) {
  const t = useTranslations("form")

  const [totalTax] = useAtom(totalTaxAtom)

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
    // calculations,
  } = usePurchasedOrderForm({
    id: initialData?.id || 0,
    mode: isEditForm ? "edit" : "create",
  })

  const { register, control, formState, setValue, watch, getValues } =
    formMethods

  const { warehouse, taxCharge, taxTemplate, currency } = useSCMSharedDataHook([
    "warehouse",
    "taxCharge",
    "taxTemplate",
    "currency",
  ])

  const { warehouseOptions, isWarehouseLoading } = warehouse
  const { taxChargeOptions, isTaxChargeLoading } = taxCharge
  const { taxTemplateOptions, isTaxTemplateLoading } = taxTemplate
  const { currencyOptions, isCurrenciesLoading } = currency

  const [, setPaymentAmount] = useAtom(paymentAmountAtom)

  useEffect(() => {
    if (getFormValues()?.orderAmount !== undefined) {
      // setValue("orderAmount", getFormValues()?.orderAmount)
      setPaymentAmount(getFormValues()?.orderAmount || 0)
    }
  }, [getFormValues(), setValue, setPaymentAmount, totalTax])

  // Retrieve form values
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
          <Controller
            control={control}
            name="currencyId"
            render={({ field: { onChange, value } }) => (
              <Select
                label={t("form-currency")}
                labelClassName="text-title"
                placeholder={t("form-select-currency")}
                options={currencyOptions}
                onChange={(option: any) => onChange(option?.value)}
                value={FindSelectOption(currencyOptions, value)}
                isLoading={isCurrenciesLoading}
                isDisabled={isFieldDisabled || true}
                error={
                  formState.errors?.currencyId?.message
                    ? t(formState.errors?.currencyId?.message)
                    : ""
                }
                menuPortalTarget={document.body}
                styles={GetMenuListStyles(currencyOptions.length)}
              />
            )}
          />
        </FormGroup>
        <FormGroup
          title={t("form-warehouse-information")}
          className="pt-7 @2xl:pt-10 @3xl:pt-11">
          <Controller
            control={control}
            name="warehouseId"
            render={({ field: { onChange, value } }) => (
              <Select
                label={t("form-set-target-warehouse")}
                labelClassName="text-title"
                placeholder={t("form-select-warehouse")}
                options={warehouseOptions}
                onChange={(option: any) => onChange(option?.value)}
                value={FindSelectOption(warehouseOptions, value)}
                isLoading={isWarehouseLoading}
                isDisabled={isFieldDisabled}
                error={
                  formState.errors?.warehouseId?.message
                    ? t(formState.errors?.warehouseId?.message)
                    : ""
                }
                menuPortalTarget={document.body}
                styles={GetMenuListStyles(warehouseOptions.length)}
                isRequired
              />
            )}
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
          />
          <Input
            label={t("form-total-amount")}
            {...register("orderAmount")}
            value={watch("orderAmount") || 0}
            disabled={isFieldDisabled || true}
            onChange={(e) => {
              const value = Number(e.target.value) || 0
              setPaymentAmount(value)
              setValue("orderAmount", value)
              register("orderAmount").onChange(e)
            }}
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
            data={paymentTaxCharges}
            onRowChange={handleTaxChargeChange}
            onRowDelete={handleTaxChargeDelete}
            onAddRow={handleTaxChargeAdd}
            setValue={setValue}
            formContext={{ setValue, getValues }} // Add this
          />
          <div className="grid grid-cols-1 gap-4 @2xl:grid-cols-12">
            {!isFieldDisabled && (
              <Input
                type="number"
                label={t("form-total-tax")}
                placeholder={t("form-enter-total-tax")}
                className="@2xl:col-span-4 @2xl:col-start-9"
                value={Number(totalTax || 0).toFixed(2) || "0.00"}
                {...register("totalTax")}
                readOnly
                disabled={isFieldDisabled || true}
                isRequired
              />
            )}

            {isFieldDisabled && (
              <Input
              type="number"
              label={t("form-total-tax")}
              placeholder={t("form-enter-total-tax")}
              className="@2xl:col-span-4 @2xl:col-start-9"
              {...register("totalTax")}
              readOnly
              disabled={isFieldDisabled || true}
            />
            )}
          </div>
        </FormGroup>
        <FormGroup
          title={t("form-totals")}
          className="pt-7 @2xl:pt-10 @3xl:pt-11"
          childrenContainerClassName="@2xl:grid-cols-1">
          <TotalsAmountForm
            // calculations={calculations}
            isFieldDisabled={isFieldDisabled}
            formMethods={{
              register,
              control,
              formState,
              setValue,
              watch,
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
