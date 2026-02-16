import { useTranslations } from "next-intl"
import { Controller } from "react-hook-form"

import FormGroup from "@/components/base/form-group"
import { Input, Select } from "@/components/ui"
import { useCountryList } from "@/hooks/use-countries"
import { useSelectOptions } from "@/hooks/use-select-options"
import { CountryList } from "@/modules/fms/types"

export function AddressFields({ register, control }: any) {
  const t = useTranslations("form")
  const { data: countryList, isLoading: isCountryLoading } = useCountryList({pageSize:100})
  const countryOptions = useSelectOptions<CountryList>(
    countryList?.data,
    "countryName"
  )
  return (
    <>
      <FormGroup
        title={t("form-billing-address")}
        className="pt-7 @2xl:pt-9 @3xl:pt-11">
        <Input
          label={t("form-billing-street")}
          placeholder={t("form-enter-billing-street")}
          autoComplete="off"
          labelClassName="text-sm font-medium text-gray-900"
          {...register("billingStreet")}
        />
        <Input
          label={t("form-billing-house")}
          placeholder={t("form-enter-billing-house")}
          labelClassName="text-sm font-medium text-gray-900"
          {...register("billingHouse")}
        />
        <Input
          label={t("form-billing-zip")}
          autoComplete="off"
          placeholder={t("form-enter-billing-zip")}
          labelClassName="text-sm font-medium text-gray-900"
          {...register("billingZip")}
        />
        <Input
          label={t("form-billing-city")}
          placeholder={t("form-enter-billing-city")}
          labelClassName="text-sm font-medium text-gray-900"
          {...register("billingCity")}
        />
        <Input
          label={t("form-billing-state")}
          placeholder={t("form-enter-billing-state")}
          labelClassName="text-sm font-medium text-gray-900"
          {...register("billingState")}
        />
        <Controller
          name="billingCountryId"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Select
              label={t("form-country")}
              labelClassName="text-title"
              options={countryOptions}
              value={
                countryOptions.find((option) => option.value == value) || null
              }
              onChange={(option: any) => onChange(option?.value)}
              isLoading={isCountryLoading}
              isDisabled={isCountryLoading}
              menuPortalTarget={document.body}
              placeholder={
                isCountryLoading ? t("form-loading") : t("form-select")
              }
            />
          )}
        />
      </FormGroup>
      <FormGroup
        title={t("form-shipping-address")}
        className="pt-7 @2xl:pt-9 @3xl:pt-11">
        <Input
          label={t("form-shipping-street")}
          placeholder={t("form-enter-shipping-street")}
          labelClassName="text-sm font-medium text-gray-900"
          {...register("shippingStreet")}
          autoComplete="off"
        />
        <Input
          label={t("form-shipping-house")}
          placeholder={t("form-enter-shipping-house")}
          labelClassName="text-sm font-medium text-gray-900"
          {...register("shippingHouse")}
        />
        <Input
          label={t("form-shipping-zip")}
          placeholder={t("form-enter-shipping-zip")}
          labelClassName="text-sm font-medium text-gray-900"
          {...register("shippingZip")}
          autoComplete="off"
        />
        <Input
          label={t("form-shipping-city")}
          placeholder={t("form-enter-shipping-city")}
          labelClassName="text-sm font-medium text-gray-900"
          {...register("shippingCity")}
        />
        <Input
          label={t("form-shipping-state")}
          placeholder={t("form-enter-shipping-state")}
          labelClassName="text-sm font-medium text-gray-900"
          {...register("shippingState")}
        />
        <Controller
          name="shippingCountryId"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Select
              label={t("form-country")}
              labelClassName="text-title"
              options={countryOptions}
              value={
                countryOptions.find((option) => option.value == value) || null
              }
              onChange={(option: any) => onChange(option?.value)}
              isLoading={isCountryLoading}
              isDisabled={isCountryLoading}
              menuPortalTarget={document.body}
              placeholder={
                isCountryLoading ? t("form-loading") : t("form-select")
              }
            />
          )}
        />
      </FormGroup>
    </>
  )
}
