"use client"

import { useTranslations } from "next-intl"
import { Control, Controller, FormState, UseFormRegister, UseFormSetValue } from "react-hook-form"

import { useAtom } from "jotai"

import FormGroup from "@/components/base/form-group"
import { Input, Select, Textarea } from "@/components/ui"
import { useSharedDataHooks } from "@/modules/fms/constants/shared-data-hook"
import { BankTransactionFormInput } from "@/modules/fms/validators/bank-transaction-schema"
import { DatePicker } from "@/components/base/date-picker"
import { amountAtom, totalAllocatedAmountAtom } from "./amount-allocation"

const transactionTypeOptions = [
  { value: "deposit", label: "Deposit" },
  { value: "withdrawal", label: "Withdrawal" },
]

interface BankTransactionInformationProps {
  formMethods: {
    register: UseFormRegister<BankTransactionFormInput>
    control: Control<BankTransactionFormInput>
    formState: FormState<BankTransactionFormInput>
    setValue: UseFormSetValue<BankTransactionFormInput>
  }
  isFieldDisabled?: boolean
}

export function BankTransactionInformation({
  formMethods,
  isFieldDisabled,
}: BankTransactionInformationProps) {
  const t = useTranslations("form")
  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = formMethods

  const [, setAmount] = useAtom(amountAtom)
  const [, setTotalAllocatedAmount] = useAtom(totalAllocatedAmountAtom)

  const {
    bankAccount,
    company,
    currency,
  } = useSharedDataHooks([
    "bankAccount",
    "company",
    "currency",
  ])
  const { bankAccountOptions, isBankAccountLoading } = bankAccount
  const { companyOptions, companyList, isCompanyLoading } = company
  const { currencyOptions, isCurrencyLoading } = currency

  return (
    <FormGroup
      title={t("form-bank-transaction-information")}>

      <Controller
        name="transactionType"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Select
            label={t("form-bank-transaction-type")}
            labelClassName="text-title"
            options={transactionTypeOptions}
            value={
              value && transactionTypeOptions
                ? transactionTypeOptions.find((option: any) => option.value === value)
                : null
            }
            onChange={(option: any) => {
              onChange(option?.value)
              // Reset amounts when transaction type changes
              setAmount(0)
              setTotalAllocatedAmount(0)
            }}
            isRequired
            isDisabled={isFieldDisabled}
            placeholder={
              t("form-select-bank-transaction-type")
            }
            menuPortalTarget={document.body}
            error={errors.transactionType?.message && t(errors.transactionType.message)}
          />
        )}
      />

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
            isRequired
            onChange={(option: any) => onChange(option?.value)}
            isLoading={isBankAccountLoading}
            isDisabled={isFieldDisabled || isBankAccountLoading}
            placeholder={
              isBankAccountLoading
                ? "Loading bank accounts..."
                : t("form-select-bank-account")
            }
            error={
              errors.bankAccountId?.message &&
              t(errors.bankAccountId.message)
            }
          />
        )}
      />

      <Controller
        name="transactionDate"
        control={control}
        render={({ field: { value, onChange } }) => (
          <DatePicker
            inputProps={{
              label: t("form-date"),
              error:
                errors.transactionDate?.message &&
                t(errors.transactionDate.message),
            }}
            isRequired
            popperPlacement="bottom-end"
            placeholderText={t("form-select-date")}
            value={value ? new Date(value) : null}
            onChange={(date: any) => onChange(date?.toISOString())}
            disabled={isFieldDisabled}
            error={errors.transactionDate?.message && t(errors.transactionDate.message)}
          />
        )}
      />

      <Controller
        name="companyId"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Select
            label={t("form-company")}
            labelClassName="text-title"
            options={companyOptions}
            value={
              value && companyOptions
                ? companyOptions.find(
                  (option: any) => option.value === value
                ) || null
                : null
            }
            onChange={(option: any) => {
              if (option?.value) {
                onChange(option.value)
                const selectedAccount = companyList?.data?.find(
                  (acc: any) => acc.id === option.value
                )
                if (selectedAccount) {
                  setValue?.("currencyId", selectedAccount.currencyId || "")
                }
              }
            }}
            isRequired
            isLoading={isCompanyLoading}
            isDisabled={isFieldDisabled || isCompanyLoading}
            placeholder={
              isCompanyLoading
                ? "Loading companies..."
                : t("form-select-company")
            }
            error={
              errors.companyId?.message &&
              t(errors.companyId.message)
            }
            required={true}
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
            isRequired
            onChange={(option: any) => onChange(option?.value)}
            isLoading={isCurrencyLoading}
            isDisabled={isFieldDisabled || isCurrencyLoading}
            placeholder={
              isCurrencyLoading
                ? "Loading currencies..."
                : t("form-select-currency")
            }
            error={
              errors.currencyId?.message &&
              t(errors.currencyId.message)
            }
          />
        )}
      />

      <Controller
        name="amount"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Input
            label={t("form-amount")}
            type="number"
            value={value || ""}
            placeholder={t("form-enter-amount")}
            onChange={(e) => {
              const newValue = Number(e.target.value) || 0
              onChange(newValue)
              setAmount(newValue)
            }}
            isRequired
            error={errors.amount?.message && t(errors.amount.message)}
            disabled={isFieldDisabled}
          />
        )}
      />

      <Textarea
        label={t("form-description")}
        placeholder={t("form-enter-description")}
        {...register("description")}
        error={errors.description?.message && t(errors.description.message)}
        disabled={isFieldDisabled}
      />
    </FormGroup>
  )
}


