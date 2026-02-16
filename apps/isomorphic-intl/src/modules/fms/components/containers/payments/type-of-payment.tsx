"use client"

import dayjs from "dayjs"
import { useTranslations } from "next-intl"
import {
  Control,
  Controller,
  FormState,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form"
import { useAtom } from "jotai"

import { DatePicker } from "@/components/base/date-picker"
import { Select } from "@/components/ui"
import { useSharedDataHooks } from "@/modules/fms/constants/shared-data-hook"
import { PaymentFormInput } from "@/modules/fms/validators/payment-schema"
import { selectedTransactionTypeAtom, transactionTypeOptions } from "@/modules/fms/store/transaction-payment-type-atom"
interface TypeOfPaymentProps {
  isFieldDisabled?: boolean
  formMethods: {
    register?: UseFormRegister<PaymentFormInput>
    control?: Control<PaymentFormInput>
    formState: FormState<PaymentFormInput>
    watch?: UseFormWatch<PaymentFormInput>
    setValue?: UseFormSetValue<PaymentFormInput>
  }
}

export default function TypeOfPayment({
  isFieldDisabled,
  formMethods,
}: TypeOfPaymentProps) {
  const t = useTranslations("form")
  const { company, modeOfPayment } = useSharedDataHooks([
    "company",
    "modeOfPayment",
  ])
  const [, setSelectedTransactionType] = useAtom(selectedTransactionTypeAtom)

  const { companyOptions, companyList, isCompanyLoading } = company
  const { modeOfPaymentOptions, modeOfPaymentList, isModeOfPaymentLoading } = modeOfPayment

  const {
    control,
    formState: { errors },
    setValue,
    watch,
  } = formMethods

  const postingDate = watch?.("postingDate") || dayjs().toISOString()

  return (
    <>
      <Controller
        name="postingDate"
        control={control}
        defaultValue={postingDate}
        render={({ field: { value, onChange } }) => (
          <DatePicker
            value={value ? new Date(value) : null}
            onChange={(date: any) => {
              const formattedDate = date
                ? dayjs(date).format("YYYY-MM-DD")
                : undefined
              onChange(formattedDate)
            }}
            // dateFormat="d MMMM yyyy"
            inputProps={{
              label: t("form-posting-date"),
            }}
            isRequired
            disabled={isFieldDisabled}
            placeholderText={t("form-select-date")}
            popperPlacement="bottom-end"
            error={
              errors?.postingDate?.message && t(errors.postingDate.message)
            }
          />
        )}
      />

      <Controller
        name="transactionType"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Select
            label={t("form-transaction-type")}
            labelClassName="text-title"
            isRequired
            options={transactionTypeOptions}
            value={
              value && transactionTypeOptions
                ? transactionTypeOptions.find(
                  (option: any) => option.value === value
                )
                : null
            }
            onChange={(option: any) => {
              onChange(option?.value)
              setSelectedTransactionType(option?.value || null)
            }}
            isDisabled={isFieldDisabled}
            placeholder={t("form-select-transaction-type")}
            error={
              errors?.transactionType?.message && t(errors.transactionType.message)
            }
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
            isRequired
            options={companyOptions}
            value={
              value && companyOptions
                ? companyOptions.find((option: any) => option.value === value)
                : companyOptions?.find(
                  (option: any) =>
                    option.value ===
                    companyList?.data?.find(
                      (company: any) => company.isDefault
                    )?.id
                ) || null
            }
            onChange={(option: any) => onChange(option?.value)}
            isLoading={isCompanyLoading}
            isDisabled={isFieldDisabled}
            placeholder={t("form-select-company")}
            error={errors?.companyId?.message && t(errors.companyId.message)}
          />
        )}
      />

      <Controller
        name="modeOfPaymentId"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Select
            label={t("form-mode-of-payment")}
            labelClassName="text-title"
            options={modeOfPaymentOptions}
            value={
              value && modeOfPaymentOptions
                ? modeOfPaymentOptions.find(
                  (option: any) => option.value === value
                ) || null
                : null
            }
            onChange={(option: any) => {
              if (option?.value) {
                onChange(option.value)
                const selectedAccount = modeOfPaymentList?.data?.find(
                  (acc: any) => acc.id === option.value
                )
                if (selectedAccount) {
                  setValue?.("companyId", selectedAccount.companyId || null)
                  setValue?.("accountPaidFromId", selectedAccount.chartOfAccountId || null)
                }
              }
            }}
            isRequired
            isLoading={isModeOfPaymentLoading}
            isDisabled={isFieldDisabled}
            placeholder={t("form-select-mode-of-payment")}
            error={
              errors?.modeOfPaymentId?.message &&
              t(errors.modeOfPaymentId.message)
            }
          />
        )}
      />
    </>
  )
}
