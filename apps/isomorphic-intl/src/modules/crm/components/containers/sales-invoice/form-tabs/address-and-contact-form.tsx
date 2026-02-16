"use client"

import { useTranslations } from "next-intl"
import {
  Controller,
} from "react-hook-form"

import FormGroup from "@/components/base/form-group"
import FormGroupContainer from "@/components/base/form-group-container"
import { Input, Select } from "@/components/ui"
import { useSelectOptions } from "@/hooks/use-select-options"
import { useCountryList } from "@/modules/fms/hooks"
import { CountryList } from "@/modules/fms/types"
import {
  Invoice,
} from "@/modules/scm/types/procurement/invoice/invoice-types"

interface AddressAndContactFormProps {
  formMethods: any
  isFieldDisabled?: boolean
  initialData?: Invoice
  isEditForm?: boolean
}

export default function AddressAndContactForm({
  formMethods,
}: AddressAndContactFormProps) {
  const t = useTranslations("form")

  const { data: countryList, isLoading: isCountryLoading } = useCountryList({pageSize:100})
  const countryOptions = useSelectOptions<CountryList>(
    countryList?.data,
    "countryName"
  )

  const {
    register,
    control,
  } = formMethods

  return (
    <>
      <FormGroupContainer>
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
          <Input
            label={t("form-contact-person")}
            placeholder={t("form-enter-name")}
            labelClassName="text-sm font-medium text-gray-900"
            {...register("billingContactPerson")}
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
            autoComplete="off"
          />
          <Input
            label={t("form-shipping-zip")}
            placeholder={t("form-enter-shipping-zip")}
            labelClassName="text-sm font-medium text-gray-900"
            autoComplete="off"
            {...register("shippingZip")}
          />
          <Input
            label={t("form-shipping-city")}
            placeholder={t("form-enter-shipping-city")}
            labelClassName="text-sm font-medium text-gray-900"
            {...register("shippingCity")}
            autoComplete="off"
          />
          <Input
            label={t("form-shipping-state")}
            placeholder={t("form-enter-shipping-state")}
            labelClassName="text-sm font-medium text-gray-900"
            {...register("shippingState")}
            autoComplete="off"
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
          <Input
            label={t("form-contact-person")}
            placeholder={t("form-enter-name")}
            labelClassName="text-sm font-medium text-gray-900"
            autoComplete="off"
            {...register("shippingContactPerson")}
          />
        </FormGroup>
        <FormGroup
          title={t("form-company-address")}
          className="pt-7 @2xl:pt-9 @3xl:pt-11">
          <Input
            label={t("form-company-street")}
            placeholder={t("form-enter-company-street")}
            labelClassName="text-sm font-medium text-gray-900"
            {...register("companyStreet")}
            autoComplete="off"
          />
          <Input
            label={t("form-company-house")}
            placeholder={t("form-enter-company-house")}
            labelClassName="text-sm font-medium text-gray-900"
            {...register("companyHouse")}
            autoComplete="off"
          />
          <Input
            label={t("form-company-zip")}
            placeholder={t("form-enter-company-zip")}
            labelClassName="text-sm font-medium text-gray-900"
            autoComplete="off"
            {...register("companyZip")}
          />
          <Input
            label={t("form-company-city")}
            placeholder={t("form-enter-company-city")}
            labelClassName="text-sm font-medium text-gray-900"
            {...register("companyCity")}
            autoComplete="off"
          />
          <Input
            label={t("form-company-state")}
            placeholder={t("form-enter-company-state")}
            labelClassName="text-sm font-medium text-gray-900"
            {...register("companyState")}
            autoComplete="off"
          />
          <Controller
            name="companyCountryId"
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
          <Input
            label={t("form-contact-person")}
            placeholder={t("form-enter-name")}
            labelClassName="text-sm font-medium text-gray-900"
            autoComplete="off"
            {...register("companyContactPerson")}
          />
        </FormGroup>
      </FormGroupContainer>
    </>
  )
}
