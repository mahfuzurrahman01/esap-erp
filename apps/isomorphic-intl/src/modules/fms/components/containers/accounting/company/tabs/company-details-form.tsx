"use client"

import Image from "next/image"
import { useMemo } from "react"

import dayjs from "dayjs"
import { useTranslations } from "next-intl"
import { Control, FormState, UseFormRegister, useWatch } from "react-hook-form"
import { Controller } from "react-hook-form"
import { useMedia } from "react-use"
import { Avatar } from "rizzui/avatar"
import { Grid } from "rizzui/grid"

import { DatePicker } from "@/components/base/date-picker"
import FormGroup from "@/components/base/form-group"
import FormGroupContainer from "@/components/base/form-group-container"
import { Checkbox, Input, Select, Textarea } from "@/components/ui"
import UploadPhoto from "@/components/ui/upload-photo"
import { useSharedDataHooks } from "@/modules/fms/constants/shared-data-hook"
import { CompanyFormInput } from "@/modules/fms/validators/company-schema"

interface CompanyDetailsFormProps {
  companyById: CompanyFormInput
  isFieldDisabled?: boolean
  formMethods: {
    register: UseFormRegister<CompanyFormInput>
    control: Control<CompanyFormInput>
    formState: FormState<CompanyFormInput>
    setValue: any
  }
}

export default function CompanyDetailsForm({
  companyById,
  isFieldDisabled,
  formMethods,
}: CompanyDetailsFormProps) {
  const t = useTranslations("form")
  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = formMethods
  const { country, currency } = useSharedDataHooks(["country", "currency"])
  const { countryOptions, isCountryLoading } = country
  const { currencyOptions, isCurrencyLoading } = currency
  const isMobile = useMedia("(max-width: 768px)", false)

  const companyName = useWatch({
    control,
    name: "companyName",
  })

  useMemo(() => {
    if (companyName) {
      const abbr = companyName
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase())
        .join("")
      setValue("abbreviation", abbr)
    }
  }, [companyName, setValue])

  return (
    <FormGroupContainer>
      <FormGroup
        title={t("form-company-logo")}
        className="grid-cols-12 pt-7 @2xl:pt-10 @3xl:pt-11"
        childrenContainerClassName="@2xl:grid-cols-1 @4xl:col-span-8">
        <div className="flex items-center gap-4">
          {companyById?.logoUrl && (
            <div className="size-36 shrink-0 grow-0 basis-auto">
              <Image
                src={companyById?.logoUrl}
                alt="Company Logo"
                width={300}
                height={300}
                className="size-full rounded-full object-cover"
              />
            </div>
          )}
          {!companyById?.logoUrl && isFieldDisabled && (
            <div className="shrink-0 grow-0 basis-auto">
              <Avatar
                name={companyById?.companyName || "SM"}
                initials={companyById?.abbreviation || "SM"}
                color="primary"
                customSize={isMobile ? 120 : 146}
                className="text-2xl md:text-4xl"
              />
            </div>
          )}
          {!isFieldDisabled && (
            <Controller
              name="logo"
              control={control}
              render={({ field: { onChange, value } }) => (
                <UploadPhoto
                  onChange={(file) => onChange(file)}
                  value={value as any}
                />
              )}
            />
          )}
        </div>
      </FormGroup>

      <FormGroup
        title={t("form-details")}
        className="pt-7 @2xl:pt-10 @3xl:pt-11">
        <Input
          type="text"
          label={t("form-company-name")}
          placeholder={t("form-enter-company-name")}
          labelClassName="text-sm font-medium text-gray-900"
          {...register("companyName")}
          error={errors.companyName?.message && t(errors.companyName.message)}
          disabled={isFieldDisabled}
        />
        <Input
          {...register("abbreviation")}
          label={t("form-company-abbr")}
          placeholder={t("form-enter-company-abbr")}
          error={errors.abbreviation?.message && t(errors.abbreviation.message)}
          disabled={true}
        />
        <Controller
          name="countryId"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Select
              label={t("form-country")}
              labelClassName="text-title"
              options={countryOptions}
              value={
                value && countryOptions
                  ? countryOptions.find(
                    (option: any) => option.value === value
                  ) || null
                  : null
              }
              onChange={(option: any) => onChange(option?.value)}
              isLoading={isCountryLoading}
              isDisabled={isFieldDisabled}
              placeholder={
                isCountryLoading ? "Loading countries..." : "Select a country"
              }
              menuPlacement="auto"
              menuPortalTarget={document.body}
              error={errors.countryId?.message && t(errors.countryId.message)}
            />
          )}
        />
        <Controller
          name="currencyId"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Select
              label={t("form-currency")}
              labelClassName="text-title"
              options={currencyOptions}
              value={
                value && currencyOptions
                  ? currencyOptions.find(
                    (option: any) => option.value === value
                  ) || null
                  : null
              }
              onChange={(option: any) => onChange(option?.value)}
              isLoading={isCurrencyLoading}
              isDisabled={isFieldDisabled}
              placeholder={
                isCurrencyLoading
                  ? "Loading currencies..."
                  : "Select a currency"
              }
              error={errors.currencyId?.message && t(errors.currencyId.message)}
            />
          )}
        />
        <Input
          type="text"
          {...register("taxNo")}
          label={t("form-tax-id")}
          placeholder={t("form-enter-your-tax-id")}
          defaultValue=""
          error={errors.taxNo?.message && t(errors.taxNo.message)}
          disabled={isFieldDisabled}
        />
        <Input
          {...register("domain")}
          label={t("form-domain")}
          placeholder={t("form-enter-your-domain")}
          defaultValue={""}
          // error={errors.domain?.message && t(errors.domain.message)}
          disabled={isFieldDisabled}
        />
        <div className="[&>.react-datepicker-wrapper]:w-full">
          <Controller
            name="dateOfEstablishment"
            control={control}
            render={({ field: { value, onChange } }) => (
              <DatePicker
                inputProps={{
                  label: t("form-date-of-establishment"),
                }}
                placeholderText={t("form-select-date")}
                value={value ? new Date(value) : null}
                onChange={(date: any) => {
                  const formattedDate = date
                    ? dayjs(date).format("YYYY-MM-DD")
                    : undefined
                  onChange(formattedDate)
                }}
                isRequired
                popperPlacement="bottom-end"
                maxDate={new Date()}
                disabled={isFieldDisabled}
                error={errors.dateOfEstablishment?.message && t(errors.dateOfEstablishment.message)}
              />
            )}
          />
        </div>
      </FormGroup>

      <FormGroup
        title={t("form-company-address")}
        className="pt-7 @2xl:pt-10 @3xl:pt-11">
        <div className="[&>.react-datepicker-wrapper]:w-full">
          <Controller
            name="dataOfIncorporation"
            control={control}
            render={({ field: { value, onChange } }) => (
              <DatePicker
                inputProps={{ label: t("form-date-of-incorporation") }}
                placeholderText={t("form-select-date")}
                value={value ? new Date(value) : null}
                onChange={(date: any) => {
                  const formattedDate = date
                    ? dayjs(date).format("YYYY-MM-DD")
                    : undefined
                  onChange(formattedDate)
                }}
                maxDate={new Date()}
                popperPlacement="bottom-end"
                disabled={isFieldDisabled}
              />
            )}
          />
        </div>
        <Input
          {...register("phoneNumber")}
          label={t("form-phone-number")}
          placeholder={t("form-enter-your-phone-number")}
          error={
            errors.phoneNumber?.message
              ? t(errors.phoneNumber.message)
              : undefined
          }
          disabled={isFieldDisabled}
        />
        <Input
          {...register("website")}
          label={t("form-website")}
          placeholder={t("form-enter-your-website")}
          error={
            errors.website?.message ? t(errors.website.message) : undefined
          }
          disabled={isFieldDisabled}
        />
        <Input
          {...register("email")}
          label={t("form-email")}
          placeholder={t("form-enter-your-email")}
          error={errors.email?.message ? t(errors.email.message) : undefined}
          disabled={isFieldDisabled}
        />
      </FormGroup>

      <FormGroup
        title={t("form-company-description")}
        className="pt-7 @2xl:pt-10 @3xl:pt-11"
        childrenContainerClassName="@2xl:grid-cols-1">
        <Textarea
          {...register("companyDescription")}
          label={t("form-company-description")}
          placeholder={t("form-enter-company-description")}
          error={
            errors.companyDescription?.message
              ? t(errors.companyDescription.message)
              : undefined
          }
          disabled={isFieldDisabled}
        />
      </FormGroup>
    </FormGroupContainer>
  )
}