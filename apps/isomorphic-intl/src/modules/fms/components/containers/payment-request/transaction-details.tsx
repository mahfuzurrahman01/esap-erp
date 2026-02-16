"use client"

import { useTranslations } from "next-intl"
import {
  Control,
  Controller,
  FormState,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form"

import { Input, Select } from "@/components/ui"
import { useSharedDataHooks } from "@/modules/fms/constants/shared-data-hook"
import { PaymentRequestFormInput } from "@/modules/fms/validators/payment-request-schema"
import { Payslip } from "@/types/hrms/payroll/payslip.types"

interface TransactionDetailsProps {
  isFieldDisabled?: boolean
  formMethods: {
    register?: UseFormRegister<PaymentRequestFormInput>
    control?: Control<PaymentRequestFormInput>
    formState: FormState<PaymentRequestFormInput>
    watch?: UseFormWatch<PaymentRequestFormInput>
    setValue?: UseFormSetValue<PaymentRequestFormInput>
  }
  requestFor?: "HRMS" | "SCM" | "CRM" | "FMS"
  payslipById?: Payslip
}

export default function TransactionDetails({
  isFieldDisabled,
  formMethods,
  requestFor,
  payslipById
}: TransactionDetailsProps) {
  const t = useTranslations("form")
  const { currency } = useSharedDataHooks(["currency"])
  const { currencyOptions, isCurrencyLoading } = currency

  const {
    register,
    control,
    formState: { errors },
    setValue,
  } = formMethods

  return (
    <>
      <Input
        type="number"
        label={t("form-amount")}
        placeholder={t("form-enter-amount")}
        {...register?.("amount", { valueAsNumber: true })}
        // defaultValue={requestFor === "HRMS" ? payslipById?.netPayableSalary : undefined}
        disabled={isFieldDisabled}
        isRequired
        error={errors.amount?.message && t(errors.amount.message)}
      />
      <Controller
        name="partyAccountCurrencyId"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Select
            label={t("form-party-account-currency")}
            labelClassName="text-title"
            isRequired
            options={currencyOptions}
            value={
              value && currencyOptions
                ? currencyOptions.find(
                  (option: any) => option.value === value
                ) || null
                : null
            }
            onChange={(option: any) => {
              if (option?.value) {
                onChange(option.value)
              }
            }}
            isLoading={isCurrencyLoading}
            isDisabled={isFieldDisabled}
            placeholder={t("form-select-currency")}
            error={
              errors.partyAccountCurrencyId?.message &&
              t(errors.partyAccountCurrencyId.message)
            }
          />
        )}
      />
      <Controller
        name="transactionCurrencyId"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Select
            label={t("form-transaction-currency")}
            labelClassName="text-title"
            isRequired
            options={currencyOptions}
            value={
              value && currencyOptions
                ? currencyOptions.find(
                  (option: any) => option.value === value
                ) || null
                : null
            }
            onChange={(option: any) => {
              if (option?.value) {
                onChange(option.value)
              }
            }}
            isLoading={isCurrencyLoading}
            isDisabled={isFieldDisabled}
            placeholder={t("form-select-currency")}
            error={
              errors.transactionCurrencyId?.message &&
              t(errors.transactionCurrencyId.message)
            }
          />
        )}
      />
    </>
  )
}
