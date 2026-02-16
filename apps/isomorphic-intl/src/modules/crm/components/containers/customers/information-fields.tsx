import React from "react"

import { useTranslations } from "next-intl"
import { Controller } from "react-hook-form"

import { Input, Select } from "@/components/ui"
import UploadPhoto from "@/components/ui/upload-photo"
import FormGroup from "@/modules/crm/components/base/form-group"

import { useSOTemplate } from "../sales-orders/so-template"
import { useSCMSharedDataHook } from "@/modules/scm/constants/shared-data-hooks"

export default function InformationFields({
  register,
  control,
  errors,
  customerData,
  leadById,
  photo,
  setPhoto,
  info,
  setInfo
}: any) {
  const t = useTranslations("form")
  const {
    currencyOptions,
    isCurrencyLoading,
    chartOfAccountOptions,
    isCOALoading,
  } = useSOTemplate()

  const { paymentTerms } = useSCMSharedDataHook([
    "paymentTerms",
  ])
  const { paymentTermsOptions, isPaymentTermsLoading } = paymentTerms

  return (
    <FormGroup
      title={t("form-information")}
      className="grid-cols-12 pt-7 @2xl:pt-10 @3xl:pt-11">
      <Controller
        name="photo"
        control={control}
        render={({ field: { onChange, value } }) => (
          <UploadPhoto
            onChange={(file) => {
              onChange(file)
              setPhoto(file)
            }}
            value={photo || value}
            defaultValue={customerData?.photoPath}
          />
        )}
      />
      <div></div>
      <Input
        {...register("firstName")}
        label={t("form-first-name")}
        isRequired
        placeholder={t("form-enter-first-name")}
        defaultValue={leadById?.firstName}
        error={errors.firstName?.message && t("form-first-name-is-required")}
      />

      <Input
        {...register("lastName")}
        label={t("form-last-name")}
        placeholder={t("form-enter-last-name")}
        defaultValue={leadById?.lastName}
        error={errors.lastName?.message}
      />

      <Input
        type="email"
        label={t("form-email")}
        isRequired
        placeholder={t("form-enter-email")}
        defaultValue={leadById?.email}
        {...register("email")}
        error={errors.email?.message && t("form-email-is-required")}
      />

      <Input
        type="number"
        label={t("form-mobile-no")}
        placeholder={t("form-enter-mobile-no")}
        isRequired
        defaultValue={leadById?.phone}
        {...register("phone", {
          setValueAs: (v: any) => (v === "" ? undefined : parseInt(v, 10)),
        })}
        error={errors.phone?.message && t("form-mobile-no-is-required")}
      />

      <Input
        type="number"
        label={t("form-account-no")}
        placeholder={t("form-enter-account-no")}
        {...register("accountNo")}
        error={errors.accountNo?.message}
      />

      <Input
        type="text"
        label={t("form-bank-name")}
        placeholder={t("form-enter-bank-name")}
        {...register("bankName")}
        error={errors.bankName?.message}
      />

      <Input
        type="text"
        label={t("form-company")}
        placeholder={t("form-enter-company-name")}
        {...register("company")}
        error={errors.company?.message}
      />

      <Controller
        name="currencyId"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            label={t("form-currency")}
            isRequired
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
            error={errors.currencyId?.message && t("form-currency-is-required")}
          />
        )}
      />

      <Controller
        name="paymentTerms"
        control={control}
        render={({ field: { value, onChange } }) => (
          <div className="w-full">
            <Select
              label={t("form-payment-terms")}
              placeholder={t("form-select")}
              labelClassName="text-title"
              options={paymentTermsOptions}
              isLoading={isPaymentTermsLoading}
              isDisabled={isPaymentTermsLoading}
              value={
                paymentTermsOptions?.find(
                  (option: any) => option.value == value || option.value == info.paymentTerms
                ) || null
              }
              onChange={(selectedOption: any) => {
                const selectedValue = selectedOption.value
                onChange(selectedValue);
                setInfo((prevInfo: any) => ({
                  ...prevInfo,
                  paymentTerms: selectedValue,
                }));
              }}
              menuPlacement="auto"
              menuPortalTarget={document.body}
            />
          </div>
        )}
      />
      <Controller
        name="chartOfAccountId"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            label={t("form-account-head")}
            options={chartOfAccountOptions}
            isLoading={isCOALoading}
            isDisabled={isCOALoading}
            value={
              chartOfAccountOptions?.find(
                (option: any) => option.value == value || option.value == info.chartOfAccountId
              ) || null
            }
            onChange={(selectedOption: any) => {
              const selectedValue = selectedOption.value
              onChange(selectedValue);
              setInfo((prevInfo: any) => ({
                ...prevInfo,
                chartOfAccountId: selectedValue,
              }));
            }}
          />
        )}
      />
    </FormGroup>
  )
}
