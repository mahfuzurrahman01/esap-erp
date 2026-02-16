"use client"

import { useTranslations } from "next-intl"
import { Controller } from "react-hook-form"
import { PiPlusBold } from "react-icons/pi"

import FormGroup from "@/components/base/form-group"
import FormGroupContainer from "@/components/base/form-group-container"
import { Button, Input, Select } from "@/components/ui"
import { useSCMSharedDataHook } from "@/modules/scm/constants/shared-data-hooks"
import { Invoice } from "@/modules/scm/types/procurement/invoice/invoice-types"
import {
  FindSelectOption,
  GetMenuListStyles,
} from "@/modules/scm/utils/select-options"

import { ItemsListTable } from "../items-list/items-list-table"
import { TaxAndChargeTable } from "../tax-and-charge/tax-and-charge-table"
import AccountDimensionsForm from "./account-dimensions-form"
import AdditionalDiscountForm from "./additional-discount-form"
import CurrencyAndPriceListForm from "./currency-and-price-list-form"
import InformationForm from "./information-form"
import TotalsAmountForm from "./totals-amount-form"
import WarehouseInformationForm from "./warehouse-information-form"
import { useCurrencyById } from "@/modules/fms/hooks/use-currency"

interface DetailsFormProps {
  formMethods: any
  isFieldDisabled?: boolean
  initialData?: Invoice
  isEditForm?: boolean
  entries: any
  setEntries: any
  addNewRow: any
  handleRowChange: any
  handleRowDelete: any
  taxDetails: any
  setTaxDetails: any
  addNewVTRow: any
  handleVTRowDelete: any
  handleVTRowChange: any
  summary: any
  setDiscount: any
  handleOrderChange: any
  handleCustomerChange: any
  handleCompanyChange: any
  isDisabled: boolean
  currencyBag: any
  setSummary: any
  info: any
  setInfo: any
}

export default function DetailsForm({
  formMethods,
  isFieldDisabled,
  entries,
  addNewRow,
  handleRowChange,
  handleRowDelete,
  taxDetails,
  addNewVTRow,
  handleVTRowDelete,
  handleVTRowChange,
  summary,
  setDiscount,
  handleOrderChange,
  handleCustomerChange,
  handleCompanyChange,
  isDisabled,
  currencyBag,
  setSummary,
  info,
  setInfo,
}: DetailsFormProps) {
  const t = useTranslations("form")

  const { register, control, formState, setValue, watch } = formMethods
  const { taxCharge, taxTemplate } = useSCMSharedDataHook([
    "taxCharge",
    "taxTemplate",
  ])

  const { taxChargeOptions, isTaxChargeLoading } = taxCharge
  const { taxTemplateOptions, isTaxTemplateLoading } = taxTemplate

  const { data: customerCurrencyDataById } : any = useCurrencyById(currencyBag?.customerCurrencyId!)
  const { data: companyCurrencyDataById } : any = useCurrencyById(currencyBag?.companyCurrencyId!)

  return (
    <>
      <FormGroupContainer>
        <FormGroup
          title={t("form-details-information")}
          className="pt-7 @2xl:pt-10 @3xl:pt-11">
          <InformationForm
            isFieldDisabled={isFieldDisabled}
            formMethods={{
              register,
              control,
              formState,
              setValue,
              watch,
            }}
            handleOrderChange={handleOrderChange}
            handleCustomerChange={handleCustomerChange}
            handleCompanyChange={handleCompanyChange}
            info={info}
            setInfo={setInfo}
            isDisabled={isDisabled}
          />
        </FormGroup>
        <FormGroup
          title={t("form-account-dimensions")}
          className="pt-7 @2xl:pt-10 @3xl:pt-11">
          <AccountDimensionsForm
            isFieldDisabled={isFieldDisabled}
            formMethods={{
              register,
              control,
              formState,
              setValue,
            }}
            info={info}
            setInfo={setInfo}
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
            currencyBag={currencyBag}
            setSummary={setSummary}
            info={info}
            setInfo={setInfo}
          />
        </FormGroup>
        <FormGroup
          title={t("form-items")}
          className="pt-7 @2xl:pt-10 @3xl:pt-11">
          <WarehouseInformationForm
            isFieldDisabled={isFieldDisabled}
            formMethods={{
              register,
              control,
              formState,
              setValue,
            }}
            info={info}
            setInfo={setInfo}
          />
        </FormGroup>
        <FormGroup
          title={t("form-item-list")}
          className="pt-7 @2xl:pt-10 @3xl:pt-11"
          childrenContainerClassName="@2xl:grid-cols-1 @4xl:col-span-12">
          <div className="space-y-4">
            <ItemsListTable
              data={entries}
              onRowChange={handleRowChange}
              onRowDelete={handleRowDelete}
              onAddRow={addNewRow}
              setValue={setValue}
              isDisabled={isDisabled}
            />
            {!isDisabled && (
              <Button
                variant="outline"
                onClick={addNewRow}
                disabled={isDisabled}
                className="mt-4">
                <PiPlusBold className="me-2 h-4 w-4" />
                {t("form-add-row")}
              </Button>
            )}
          </div>
        </FormGroup>
        <FormGroup
          title={t("form-total")}
          className="pt-7 @2xl:pt-10 @3xl:pt-11">
          <Input
            label={t("form-total-quantity")}
            {...register("totalQuantity")}
            disabled={isDisabled}
          />
          {summary?.exchangeRate > 0 ? (
            <>
              <Input
                label={`${t("form-total-amount")} (${customerCurrencyDataById?.symbol || ""})`}
                {...register("totalAmountOnCustomerCurrency")}
                disabled={isDisabled}
              />
              <Input
                label={`${t("form-total-amount")} (${companyCurrencyDataById?.symbol || ""})`}
                {...register("totalAmountOnCompanyCurrency")}
                disabled={isDisabled}
              />
            </>
          ) : (
            <Input
              label={t("form-total-amount")}
              {...register("totalAmount")}
              disabled={isDisabled}
            />
          )}
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
                value={
                  taxChargeOptions?.find(
                    (option: any) => option.value == value || option.value == info.taxCategoryId
                  ) || null
                }
                onChange={(selectedOption: any) => {
                  const selectedValue = selectedOption.value
                  onChange(selectedValue);
                  setInfo((prevInfo: any) => ({
                    ...prevInfo,
                    taxCategoryId: selectedValue,
                  }));
                }}
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
            name="taxTemplateId"
            render={({ field: { onChange, value } }) => (
              <Select
                label={t("form-tax-template")}
                labelClassName="text-title"
                placeholder={t("form-select-tax-template")}
                options={taxTemplateOptions}
                value={
                  taxTemplateOptions?.find(
                    (option: any) => option.value == value || option.value == info.taxTemplateId
                  ) || null
                }
                onChange={(selectedOption: any) => {
                  const selectedValue = selectedOption.value
                  onChange(selectedValue);
                  setInfo((prevInfo: any) => ({
                    ...prevInfo,
                    taxTemplateId: selectedValue,
                  }));
                }}
                isLoading={isTaxTemplateLoading}
                isDisabled={isFieldDisabled}
                error={
                  formState.errors?.taxTemplateId?.message
                    ? t(formState.errors?.taxTemplateId?.message)
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
          <div className="space-y-4">
            <TaxAndChargeTable
              isFieldDisabled={isFieldDisabled}
              data={taxDetails}
              onRowChange={handleVTRowChange}
              onRowDelete={handleVTRowDelete}
              onAddRow={addNewVTRow}
              setValue={setValue}
            />
            <Button variant="outline" onClick={addNewVTRow} className="mt-4">
              <PiPlusBold className="me-2 h-4 w-4" />
              {t("form-add-row")}
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-4 @2xl:grid-cols-12">
            <Input
              type="number"
              label={t("form-total-tax")}
              placeholder={t("form-enter-total-tax")}
              className="@2xl:col-span-4 @2xl:col-start-9"
              value={summary.taxes}
              {...register("totalTaxes")}
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
            summary={summary}
            currencyBag={currencyBag}
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
            summary={summary}
            setDiscount={setDiscount}
          />
        </FormGroup>
      </FormGroupContainer>
    </>
  )
}
