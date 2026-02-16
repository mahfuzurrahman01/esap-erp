"use client"

import { useTranslations } from "next-intl"
import {
  Controller,
} from "react-hook-form"

import { Checkbox, Input, Select } from "@/components/ui"
import {
  GetMenuListStyles,
} from "@/modules/scm/utils/select-options"
import { priceListOptions } from "@/data/crm/quotation"
import { useSOTemplate } from "../../sales-orders/so-template"

interface CurrencyAndPriceListFormProps {
  isFieldDisabled?: boolean
  formMethods: any
  currencyBag: any
  setSummary: any
  info: any
  setInfo: any
}

export default function CurrencyAndPriceListForm({
  isFieldDisabled,
  formMethods,
  currencyBag,
  setSummary,
  info,
  setInfo,
}: CurrencyAndPriceListFormProps) {
  const t = useTranslations("form")
    const {
      currencyOptions,
      isCurrencyLoading,
    } = useSOTemplate()

  const {
    register,
    control,
    formState: { errors },
    setValue
  } = formMethods

  return (
    <>
      {currencyBag?.customerCurrencyId == currencyBag?.companyCurrencyId ? <Controller
        name="currencyId"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            label={t("form-currency")}
            isSearchable
            placeholder={
              isCurrencyLoading ? t("form-loading") : t("form-select")
            }
            options={currencyOptions}
            isLoading={isCurrencyLoading}
            isDisabled={isCurrencyLoading}
            value={
              currencyOptions?.find(
                (option: any) => option.value == value || option.value == info.currencyId
              ) || null
            }
            onChange={(selectedOption: any) => {
              const selectedValue = selectedOption.value
              onChange(selectedValue);
              setInfo((prevInfo: any) => ({
                ...prevInfo,
                currencyId: selectedValue,
              }));
            }}
          />
        )}
      /> : (
        <>
          <Controller
            name="customerCurrencyId"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Select
                label={t("form-customer-currency")}
                isSearchable
                placeholder={
                  isCurrencyLoading ? t("form-loading") : t("form-select")
                }
                options={currencyOptions}
                isLoading={isCurrencyLoading}
                isDisabled
                onChange={(selectedOption: any) => onChange(selectedOption?.value)}
                value={
                  currencyOptions?.find((option: any) => option.value == value) ||
                  null
                }
              />
            )}
          />
          <Controller
            name="companyCurrencyId"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Select
                label={t("form-company-currency")}
                isSearchable
                placeholder={
                  isCurrencyLoading ? t("form-loading") : t("form-select")
                }
                options={currencyOptions}
                isLoading={isCurrencyLoading}
                isDisabled
                onChange={(selectedOption: any) => onChange(selectedOption?.value)}
                value={
                  currencyOptions?.find((option: any) => option.value == value) ||
                  null
                }
              />
            )}
          />
          <Input
            {...register("exchangeRate")}
            type="number"
            label={t("form-exchange-rate")}
            placeholder={t("form-exchange-rate")}
            inputClassName="border-gray-500/20 ring-0"
            autoComplete="off"
            onChange={(e) =>
              setSummary((prev:any) => ({
                ...prev,
                exchangeRate: e.target.value,
              }))
            }
          />
        </>
      )}
      <Controller
        control={control}
        name="priceList"
        render={({ field: { onChange, value } }) => (
          <Select
            label={t("form-price-list")}
            labelClassName="text-title"
            placeholder={t("form-select")}
            options={priceListOptions}
            value={
              priceListOptions?.find(
                (option: any) => option.value == value || option.value == info.priceList
              ) || null
            }
            onChange={(selectedOption: any) => {
              const selectedValue = selectedOption.value
              onChange(selectedValue);
              setInfo((prevInfo: any) => ({
                ...prevInfo,
                priceList: selectedValue,
              }));
            }}
            isDisabled={isFieldDisabled}
             error={
              errors.priceList?.message
                ? t(errors.priceList?.message)
                : ""
            }
            menuPortalTarget={document.body}
            styles={GetMenuListStyles(priceListOptions.length)}
          />
        )}
      />
      <Controller
        name="ignorePricingRule"
        control={control}
        render={({ field: { value } }) => (
          <Checkbox
            label={t("form-ignore-pricing-rule")}
            checked={value}
            onChange={(event:any) => {
              setInfo((prevInfo: any) => ({
                ...prevInfo,
                ignorePricingRule: event.target.checked,
              }));
            }}
          />
        )}
      />
    </>
  )
}
