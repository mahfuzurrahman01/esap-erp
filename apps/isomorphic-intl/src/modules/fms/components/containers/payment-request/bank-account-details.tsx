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
import { BankAccountList } from "@/modules/fms/types"
import { PaymentRequestFormInput } from "@/modules/fms/validators/payment-request-schema"

interface SelectOption {
  value: string
  label: string
  data?: BankAccountList
}

interface BankAccountDetailsProps {
  isFieldDisabled?: boolean
  formMethods: {
    register?: UseFormRegister<PaymentRequestFormInput>
    control?: Control<PaymentRequestFormInput>
    formState: FormState<PaymentRequestFormInput>
    watch?: UseFormWatch<PaymentRequestFormInput>
    setValue?: UseFormSetValue<PaymentRequestFormInput>
  }
}

export default function BankAccountDetails({
  isFieldDisabled,
  formMethods,
}: BankAccountDetailsProps) {
  const t = useTranslations("form")
  const { bankAccount } = useSharedDataHooks(["bankAccount"])
  const {
    bankAccountOptions: rawBankAccountOptions,
    isBankAccountLoading,
    bankAccountList,
  } = bankAccount

  const bankAccountOptions = rawBankAccountOptions.map((option: any) => ({
    ...option,
    data: bankAccountList?.data?.find((acc: any) => acc.id === option.value),
  }))

  const {
    register,
    control,
    formState: { errors },
    setValue,
    watch,
  } = formMethods

  const selectedBankAccount = watch?.("bankAccountId")
  const selectedBankData = bankAccountList?.data?.find(
    (acc: any) => acc.id === selectedBankAccount
  )

  return (
    <>
      <Controller
        name="bankAccountId"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Select
            label={t("form-bank-account")}
            labelClassName="text-title"
            options={bankAccountOptions}
            value={
              value && bankAccountOptions
                ? bankAccountOptions.find(
                  (option: any) => option.value === value
                ) || null
                : null
            }
            onChange={(option: any) => {
              if (option?.value) {
                onChange(option.value)
                const selectedAccount = bankAccountList?.data?.find(
                  (acc: any) => acc.id === option.value
                )
                if (selectedAccount) {
                  setValue?.("bankName", selectedAccount.bank.bankName || "")
                  setValue?.("bankAccountNumber", selectedAccount.accountNumber || "")
                }
              }
            }}
            isRequired
            isLoading={isBankAccountLoading}
            isDisabled={isFieldDisabled}
            placeholder={t("form-select-bank-account")}
            error={errors.bankAccountId?.message && t(errors.bankAccountId.message)}
          />
        )}
      />
      <Input
        label={t("form-bank-name")}
        placeholder={t("form-enter-bank-name")}
        {...register?.("bankName")}
        value={selectedBankData?.bank.bankName || ""}
        isRequired
        disabled={true}
        error={errors.bankName?.message && t(errors.bankName.message)}
      />
      <Input
        label={t("form-bank-account-number")}
        placeholder={t("form-enter-bank-account-number")}
        {...register?.("bankAccountNumber")}
        value={selectedBankData?.accountNumber || ""}
        disabled={true}
        isRequired
        error={errors.bankAccountNumber?.message && t(errors.bankAccountNumber.message)}
      />
    </>
  )
}
