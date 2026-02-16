"use client"

import { useTranslations } from "next-intl"
import {
  Control,
  Controller,
  FormState,
  UseFormRegister,
} from "react-hook-form"

import FormGroup from "@/components/base/form-group"
import { Select } from "@/components/ui"
import { useSelectOptions } from "@/hooks/use-select-options"
import { useBankAccountList } from "@/modules/fms/hooks/use-bank-account"
import { useCOAList } from "@/modules/fms/hooks/use-coa"
import { BankAccountList, COAList } from "@/modules/fms/types"
import { BankClearanceFormInput } from "@/modules/fms/validators/bank-clearance-schema"

interface BankClearanceInformationProps {
  formMethods: {
    register: UseFormRegister<BankClearanceFormInput>
    control: Control<BankClearanceFormInput>
    formState: FormState<BankClearanceFormInput>
  }
  isFieldDisabled?: boolean
  updateParams?: (params: { bankAccountId?: number; chartOfAccountId?: number }) => void
}

export function BankClearanceInformation({
  formMethods,
  isFieldDisabled,
  updateParams,
}: BankClearanceInformationProps) {
  const t = useTranslations("form")
  const {
    control,
    formState: { errors },
  } = formMethods

  const { data: bankAccountList, isLoading: isBankAccountLoading } =
    useBankAccountList({ isCompanyAccount: true })
  const { data: coaList, isLoading: isCoaLoading } = useCOAList({ accountTypeId: 45 })

  const bankAccountOptions = useSelectOptions<BankAccountList>(
    bankAccountList?.data,
    "accountName"
  )

  const coaOptions = useSelectOptions<COAList>(
    coaList?.data,
    "accountName"
  )

  return (
    <FormGroup title={t("form-information")}>
      <Controller
        name="chartOfAccountId"
        control={control}
        render={({ field }) => (
          <Select
            label={t("form-chart-of-account")}
            labelClassName="text-title"
            options={coaOptions}
            value={coaOptions.find((option) => option.value === field.value)}
            onChange={(option: any) => {
              field.onChange(option?.value)
              updateParams?.({ chartOfAccountId: option?.value })
            }}
            isLoading={isCoaLoading}
            isDisabled={isFieldDisabled}
            error={
              errors.chartOfAccountId?.message &&
              t(errors.chartOfAccountId.message)
            }
          />
        )}
      />
      <Controller
        name="bankAccountId"
        control={control}
        render={({ field }) => (
          <Select
            label={t("form-bank-account")}
            labelClassName="text-title"
            options={bankAccountOptions}
            value={bankAccountOptions.find((option) => option.value === field.value)}
            onChange={(option: any) => {
              field.onChange(option?.value)
              updateParams?.({ bankAccountId: option?.value })
            }}
            isLoading={isBankAccountLoading}
            isDisabled={isFieldDisabled}
            error={
              errors.bankAccountId?.message && t(errors.bankAccountId.message)
            }
          />
        )}
      />
    </FormGroup>
  )
}
