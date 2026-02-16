"use client"

import { useTranslations } from "next-intl"
import { Control, FormState, UseFormRegister } from "react-hook-form"
import { Controller } from "react-hook-form"

import FormGroup from "@/components/base/form-group"
import FormGroupContainer from "@/components/base/form-group-container"
import { Select } from "@/components/ui"
import { useSharedDataHooks } from "@/modules/fms/constants/shared-data-hook"
import { CompanyFormInput } from "@/modules/fms/validators/company-schema"

interface CompanyAccountFormProps {
  formMethods: {
    register: UseFormRegister<CompanyFormInput>
    control: Control<CompanyFormInput>
    formState: FormState<CompanyFormInput>
  }
  isFieldDisabled?: boolean
}

export default function CompanyAccountForm({
  formMethods,
  isFieldDisabled,
}: CompanyAccountFormProps) {
  const t = useTranslations("form")
  const { control } = formMethods
  const { coa } = useSharedDataHooks(["coa"])

  const { coaOptions, isCOALoading: isLoading } = coa

  return (
    <FormGroupContainer>
      <FormGroup
        title={t("form-accounts-settings")}
        className="pt-7 @2xl:pt-10 @3xl:pt-11">
        <Controller
          name="defaultBankAccountId"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Select
              label={t("form-bank-account")}
              labelClassName="text-title"
              options={coaOptions}
              value={
                value && coaOptions
                  ? coaOptions.find((option: any) => option.value === value) ||
                    null
                  : null
              }
              onChange={(option: any) => onChange(option?.value)}
              isLoading={isLoading}
              isDisabled={isFieldDisabled}
              placeholder={t("form-select-bank-account")}
            />
          )}
        />
        <Controller
          name="defaultPayableAccountId"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Select
              label={t("form-payable-account")}
              labelClassName="text-title"
              options={coaOptions}
              value={
                value && coaOptions
                  ? coaOptions.find((option: any) => option.value === value) ||
                    null
                  : null
              }
              onChange={(option: any) => onChange(option?.value)}
              isLoading={isLoading}
              isDisabled={isFieldDisabled}
              placeholder={t("form-select-payable-account")}
            />
          )}
        />
        <Controller
          name="defaultCashAccountId"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Select
              label={t("form-cash-account")}
              labelClassName="text-title"
              options={coaOptions}
              value={
                value && coaOptions
                  ? coaOptions.find((option: any) => option.value === value) ||
                    null
                  : null
              }
              onChange={(option: any) => onChange(option?.value)}
              isLoading={isLoading}
              isDisabled={isFieldDisabled}
              placeholder={t("form-select-cash-account")}
            />
          )}
        />
        <Controller
          name="defaultCostOfGoodsSoldAccountId"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Select
              label={t("form-const-of-goods-sold")}
              labelClassName="text-title"
              options={coaOptions}
              value={
                value && coaOptions
                  ? coaOptions.find((option: any) => option.value === value) ||
                    null
                  : null
              }
              onChange={(option: any) => onChange(option?.value)}
              isLoading={isLoading}
              isDisabled={isFieldDisabled}
              placeholder={t("form-select-const-of-goods-sold")}
            />
          )}
        />
        <Controller
          name="defaultReceivableAccountId"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Select
              label={t("form-receivable-account")}
              labelClassName="text-title"
              options={coaOptions}
              value={
                value && coaOptions
                  ? coaOptions.find((option: any) => option.value === value) ||
                    null
                  : null
              }
              onChange={(option: any) => onChange(option?.value)}
              isLoading={isLoading}
              isDisabled={isFieldDisabled}
              placeholder={t("form-select-receivable-account")}
            />
          )}
        />
        <Controller
          name="defaultIncomeAccountId"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Select
              label={t("form-income-account")}
              labelClassName="text-title"
              options={coaOptions}
              value={
                value && coaOptions
                  ? coaOptions.find((option: any) => option.value === value) ||
                    null
                  : null
              }
              onChange={(option: any) => onChange(option?.value)}
              isLoading={isLoading}
              isDisabled={isFieldDisabled}
              placeholder={t("form-select-income-account")}
            />
          )}
        />
        <Controller
          name="defaultExpenseAccountId"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Select
              label={t("form-expense-account")}
              labelClassName="text-title"
              options={coaOptions}
              value={
                value && coaOptions
                  ? coaOptions.find((option: any) => option.value === value) ||
                    null
                  : null
              }
              onChange={(option: any) => onChange(option?.value)}
              isLoading={isLoading}
              isDisabled={isFieldDisabled}
              placeholder={t("form-select-expense-account")}
            />
          )}
        />
        <Controller
          name="roundOffAccountId"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Select
              label={t("form-round-off-account")}
              labelClassName="text-title"
              options={coaOptions}
              value={
                value && coaOptions
                  ? coaOptions.find((option: any) => option.value === value) ||
                    null
                  : null
              }
              onChange={(option: any) => onChange(option?.value)}
              isLoading={isLoading}
              isDisabled={isFieldDisabled}
              placeholder={t("form-select-round-off-account")}
            />
          )}
        />
        <Controller
          name="roundOffCostCenterId"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Select
              label={t("form-round-off-cost-center")}
              labelClassName="text-title"
              options={coaOptions}
              value={
                value && coaOptions
                  ? coaOptions.find((option: any) => option.value === value) ||
                    null
                  : null
              }
              onChange={(option: any) => onChange(option?.value)}
              isLoading={isLoading}
              isDisabled={isFieldDisabled}
              placeholder={t("form-select-round-off-cost-center")}
            />
          )}
        />
        <Controller
          name="defaultDeferredRevenueAccountId"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Select
              label={t("form-deferred-revenue-account")}
              labelClassName="text-title"
              options={coaOptions}
              value={
                value && coaOptions
                  ? coaOptions.find((option: any) => option.value === value) ||
                    null
                  : null
              }
              onChange={(option: any) => onChange(option?.value)}
              isLoading={isLoading}
              isDisabled={isFieldDisabled}
              placeholder={t("form-select-deferred-revenue-account")}
            />
          )}
        />
        <Controller
          name="defaultDeferredExpenseAccountId"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Select
              label={t("form-deferred-expense-account")}
              labelClassName="text-title"
              options={coaOptions}
              value={
                value && coaOptions
                  ? coaOptions.find((option: any) => option.value === value) ||
                    null
                  : null
              }
              onChange={(option: any) => onChange(option?.value)}
              isLoading={isLoading}
              isDisabled={isFieldDisabled}
              placeholder={t("form-select-deferred-expense-account")}
            />
          )}
        />
        <Controller
          name="writeOffAccount"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Select
              label={t("form-write-off-account")}
              labelClassName="text-title"
              options={coaOptions}
              value={
                value && coaOptions
                  ? coaOptions.find((option: any) => option.value === value) ||
                    null
                  : null
              }
              onChange={(option: any) => onChange(option?.value)}
              isLoading={isLoading}
              isDisabled={isFieldDisabled}
              placeholder={t("form-select-write-off-account")}
            />
          )}
        />
        <Controller
          name="defaultPaymentDiscountAccountId"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Select
              label={t("form-payment-discount-account")}
              labelClassName="text-title"
              options={coaOptions}
              value={
                value && coaOptions
                  ? coaOptions.find((option: any) => option.value === value) ||
                    null
                  : null
              }
              onChange={(option: any) => onChange(option?.value)}
              isLoading={isLoading}
              isDisabled={isFieldDisabled}
              placeholder={t("form-select-payment-discount-account")}
            />
          )}
        />
        <Controller
          name="exchangeGainLossAccountId"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Select
              label={t("form-exchange-gain-loss-account")}
              labelClassName="text-title"
              options={coaOptions}
              value={
                value && coaOptions
                  ? coaOptions.find((option: any) => option.value === value) ||
                    null
                  : null
              }
              onChange={(option: any) => onChange(option?.value)}
              isLoading={isLoading}
              isDisabled={isFieldDisabled}
              placeholder={t("form-select-exchange-gain-loss-account")}
            />
          )}
        />
      </FormGroup>

      <FormGroup
        title={t("form-fixed-assets-defaults")}
        className="pt-7 @2xl:pt-10 @3xl:pt-11">
        <Controller
          name="accumulatedDepreciationAccount"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Select
              label={t("form-accumulated-depreciation-account")}
              labelClassName="text-title"
              options={coaOptions}
              value={
                value && coaOptions
                  ? coaOptions.find((option: any) => option.value === value) ||
                    null
                  : null
              }
              onChange={(option: any) => onChange(option?.value)}
              isLoading={isLoading}
              isDisabled={isFieldDisabled}
              placeholder={t("form-select-accumulated-depreciation-account")}
            />
          )}
        />
        <Controller
          name="depreciationExpenseAccount"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Select
              label={t("form-depreciation-expense-account")}
              labelClassName="text-title"
              options={coaOptions}
              value={
                value && coaOptions
                  ? coaOptions.find((option: any) => option.value === value) ||
                    null
                  : null
              }
              onChange={(option: any) => onChange(option?.value)}
              isLoading={isLoading}
              isDisabled={isFieldDisabled}
              placeholder={t("form-select-depreciation-expense-account")}
            />
          )}
        />
        <Controller
          name="gainLossAccountOnAssetsDisposal"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Select
              label={t("form-gain-loss-account-on-assets-disposal")}
              labelClassName="text-title"
              options={coaOptions}
              value={
                value && coaOptions
                  ? coaOptions.find((option: any) => option.value === value) ||
                    null
                  : null
              }
              onChange={(option: any) => onChange(option?.value)}
              isLoading={isLoading}
              isDisabled={isFieldDisabled}
              placeholder={t(
                "form-select-gain-loss-account-on-assets-disposal"
              )}
            />
          )}
        />
        <Controller
          name="assetsDepreciationCostCenter"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Select
              label={t("form-assets-depreciation-cost-center")}
              labelClassName="text-title"
              options={coaOptions}
              value={
                value && coaOptions
                  ? coaOptions.find((option: any) => option.value === value) ||
                    null
                  : null
              }
              onChange={(option: any) => onChange(option?.value)}
              isLoading={isLoading}
              isDisabled={isFieldDisabled}
              placeholder={t("form-select-assets-depreciation-cost-center")}
            />
          )}
        />
        <Controller
          name="capitalWorkInProgressAccount"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Select
              label={t("form-capital-work-in-progress-account")}
              labelClassName="text-title"
              options={coaOptions}
              value={
                value && coaOptions
                  ? coaOptions.find((option: any) => option.value === value) ||
                    null
                  : null
              }
              onChange={(option: any) => onChange(option?.value)}
              isLoading={isLoading}
              isDisabled={isFieldDisabled}
              placeholder={t("form-select-capital-work-in-progress-account")}
            />
          )}
        />
        <Controller
          name="assetValuationAccount"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Select
              label={t("form-asset-valuation-account")}
              labelClassName="text-title"
              options={coaOptions}
              value={
                value && coaOptions
                  ? coaOptions.find((option: any) => option.value === value) ||
                    null
                  : null
              }
              onChange={(option: any) => onChange(option?.value)}
              isLoading={isLoading}
              isDisabled={isFieldDisabled}
              placeholder={t("form-select-asset-valuation-account")}
            />
          )}
        />
        <Controller
          name="assetsReceivedButNotBilledAccount"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Select
              label={t("form-assets-received-but-not-billed-account")}
              labelClassName="text-title"
              options={coaOptions}
              value={
                value && coaOptions
                  ? coaOptions.find((option: any) => option.value === value) ||
                    null
                  : null
              }
              onChange={(option: any) => onChange(option?.value)}
              isLoading={isLoading}
              isDisabled={isFieldDisabled}
              placeholder={t(
                "form-select-assets-received-but-not-billed-account"
              )}
            />
          )}
        />
      </FormGroup>
    </FormGroupContainer>
  )
}
