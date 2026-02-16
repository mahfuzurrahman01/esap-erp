"use client"

import { useTranslations } from "next-intl"
import {
  Control,
  Controller,
  FormState,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form"

import { Select } from "@/components/ui"
import { useSharedDataHooks } from "@/modules/fms/constants/shared-data-hook"
import { PaymentFormInput } from "@/modules/fms/validators/payment-schema"

interface PaymentAccountsProps {
  isFieldDisabled?: boolean
  formMethods: {
    register?: UseFormRegister<PaymentFormInput>
    control?: Control<PaymentFormInput>
    setValue?: UseFormSetValue<PaymentFormInput>
    formState: FormState<PaymentFormInput>
  }
}

export default function PaymentAccounts({
  isFieldDisabled,
  formMethods,
}: PaymentAccountsProps) {
  const t = useTranslations("form")
  const { coa, currency } = useSharedDataHooks(["coa", "currency"])
  const { coaOptions, coaList, isCOALoading } = coa
  const { currencyOptions, isCurrencyLoading } = currency

  const {
    control,
    setValue,
    formState: { errors },
  } = formMethods

  return (
    <>
      <Controller
        name="accountPaidFromId"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Select
            label={t("form-account-paid-from")}
            labelClassName="text-title"
            options={coaOptions}
            value={
              coaOptions?.find(
                (option: any) => option.value === value
              ) || null
            }
            onChange={(option: any) => {
              if (option?.value) {
                onChange(option.value)
                const selectedAccount = coaList?.data?.find(
                  (acc: any) => acc.id === option.value
                )
                if (selectedAccount && setValue) {
                  setValue("fromCurrencyId", selectedAccount.currencyId || null)
                }
              }
            }}
            isRequired
            isLoading={isCOALoading}
            isDisabled={isFieldDisabled}
            placeholder={t("form-select-account-paid-from")}
            error={errors.accountPaidFromId?.message}
          />
        )}
      />

      <Controller
        name="accountPaidToId"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Select
            label={t("form-account-paid-to")}
            labelClassName="text-title"
            options={coaOptions}
            value={
              coaOptions?.find(
                (option: any) => option.value === value
              ) || null
            }
            onChange={(option: any) => {
              if (option?.value) {
                onChange(option.value)
                const selectedAccount = coaList?.data?.find(
                  (acc: any) => acc.id === option.value
                )
                if (selectedAccount) {
                  setValue?.("toCurrencyId", selectedAccount.currencyId || null)
                }
              }
            }}
            isRequired
            isLoading={isCOALoading}
            isDisabled={isFieldDisabled}
            placeholder={t("form-select-account-paid-to")}
            error={errors.accountPaidToId?.message}
          />
        )}
      />

      {/* <Controller
        name="fromCurrencyId"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Select
            label={t("form-from-currency")}
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
            isRequired
            isLoading={isCurrencyLoading}
            isDisabled={true}
            placeholder={
              isCurrencyLoading
                ? "Loading currencies..."
                : t("form-select-currency")
            }
            error={
              errors.fromCurrencyId?.message &&
              t(errors.fromCurrencyId.message)
            }
          />
        )}
      /> */}

      <Controller
        name="toCurrencyId"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Select
            label={t("form-to-currency")}
            labelClassName="text-title"
            options={currencyOptions}
            value={
              value && currencyOptions
                ? currencyOptions.find((option: any) => option.value === value)
                : null
            }
            onChange={(option: any) => onChange(option?.value)}
            isRequired
            isLoading={isCurrencyLoading}
            isDisabled={true}
            placeholder={t("form-select-to-currency")}
            error={errors.toCurrencyId?.message}
          />
        )}
      />
    </>
  )
}
