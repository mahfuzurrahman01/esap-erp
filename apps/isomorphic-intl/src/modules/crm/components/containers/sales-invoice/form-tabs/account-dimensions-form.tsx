"use client"

import { useTranslations } from "next-intl"
import {
  Controller,
} from "react-hook-form"

import { Select } from "@/components/ui"
import { useSCMSharedDataHook } from "@/modules/scm/constants/shared-data-hooks"
import {
  FindSelectOption,
  GetMenuListStyles,
} from "@/modules/scm/utils/select-options"
import { useSelectOptions } from "@/hooks/use-select-options"
import { BankAccountList } from "@/modules/fms/types"
import { useBankAccountList } from "@/modules/fms/hooks"

interface AccountDimensionsFormProps {
  isFieldDisabled?: boolean
  formMethods: any
  info: any
  setInfo: any
}

export default function AccountDimensionsForm({
  isFieldDisabled,
  formMethods,
  info,
  setInfo
}: AccountDimensionsFormProps) {
  const t = useTranslations("form")
  const { costCenter } = useSCMSharedDataHook([
    "costCenter",
  ])
  const { data: bankDetails, isLoading: isBankDetailsLoading } =
      useBankAccountList()
  const { costCenterOptions, isCostCenterLoading } = costCenter
  const bankAccountOptions = useSelectOptions<BankAccountList>(
      bankDetails?.data,
      "accountName"
    )

  const {
    control,
    formState: { errors },
  } = formMethods

  return (
    <>
      <Controller
        control={control}
        name="costCenterId"
        render={({ field: { onChange, value } }) => (
          <Select
            label={t("form-cost-center")}
            labelClassName="text-title"
            placeholder={t("form-select")}
            options={costCenterOptions}
            value={
              costCenterOptions?.find(
                (option: any) => option.value == value || option.value == info.costCenterId
              ) || null
            }
            onChange={(selectedOption: any) => {
              const selectedValue = selectedOption.value
              onChange(selectedValue);
              setInfo((prevInfo: any) => ({
                ...prevInfo,
                costCenterId: selectedValue,
              }));
            }}
            isLoading={isCostCenterLoading}
            isDisabled={isFieldDisabled}
             error={
              errors.costCenterId?.message
                ? t(errors.costCenterId?.message)
                : ""
            }
            menuPortalTarget={document.body}
            styles={GetMenuListStyles(costCenterOptions.length)}
          />
        )}
      />
      <Controller
        control={control}
        name="bankAccountId"
        render={({ field: { onChange, value } }) => (
          <Select
            label={t("form-bank-account")}
            labelClassName="text-title"
            placeholder={t("form-select")}
            options={bankAccountOptions}
            value={
              bankAccountOptions?.find(
                (option: any) => option.value == value || option.value == info.bankAccountId
              ) || null
            }
            onChange={(selectedOption: any) => {
              const selectedValue = selectedOption.value
              onChange(selectedValue);
              setInfo((prevInfo: any) => ({
                ...prevInfo,
                bankAccountId: selectedValue,
              }));
            }}
            isLoading={isBankDetailsLoading}
            isDisabled={isFieldDisabled || isBankDetailsLoading}
             error={
              errors.bankAccountId?.message
                ? t(errors.bankAccountId?.message)
                : ""
            }
            menuPortalTarget={document.body}
            styles={GetMenuListStyles(bankAccountOptions.length)}
          />
        )}
      />
    </>
  )
}
