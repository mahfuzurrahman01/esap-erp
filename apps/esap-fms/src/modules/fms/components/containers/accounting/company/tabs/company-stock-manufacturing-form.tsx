"use client"

import { useTranslations } from "next-intl"
import { Control, FormState, UseFormRegister } from "react-hook-form"
import { Controller } from "react-hook-form"
import { Checkbox } from "rizzui"

import FormGroup from "@/components/base/form-group"
import FormGroupContainer from "@/components/base/form-group-container"
import { Select } from "@/components/ui"
import { useSharedDataHooks } from "@/modules/fms/constants/shared-data-hook"
import { CompanyFormInput } from "@/modules/fms/validators/company-schema"

interface CompanyStockManufacturingFormProps {
  formMethods: {
    register: UseFormRegister<CompanyFormInput>
    control: Control<CompanyFormInput>
    formState: FormState<CompanyFormInput>
  }
  isFieldDisabled?: boolean
}

export default function CompanyStockManufacturingForm({
  formMethods,
  isFieldDisabled,
}: CompanyStockManufacturingFormProps) {
  const t = useTranslations("form")
  const { register, control } = formMethods
  const { coa } = useSharedDataHooks(["coa"])
  const { coaOptions, isLoading } = coa

  return (
    <FormGroupContainer>
      <FormGroup
        title={t("form-stock-settings")}
        className="pt-7 @2xl:pt-10 @3xl:pt-11">
        <Checkbox
          label={t("form-perpetual-inventory")}
          {...register("isPerpetualInventory")}
        />
        <Checkbox
          label={t("form-provisional-accounting")}
          {...register("isProvisionalAccounting")}
        />
        <Controller
          name="inventoryAccount"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Select
              label={t("form-inventory-account")}
              labelClassName="text-title"
              options={coaOptions}
              value={
                value && coaOptions
                  ? coaOptions.find(
                      (option: any) => option.value === value
                    ) || null
                  : null
              }
              onChange={(option: any) => onChange(option?.value)}
              isLoading={isLoading}
              isDisabled={isFieldDisabled}
              placeholder={t("form-select-inventory-account")}
            />
          )}
        />
        <Controller
          name="stockReceivedButNotBilledAccount"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Select
              label={t("form-stock-received-but-not-billed-account")}
              labelClassName="text-title"
              options={coaOptions}
              value={
                value && coaOptions
                  ? coaOptions.find(
                      (option: any) => option.value === value
                    ) || null
                  : null
              }
              onChange={(option: any) => onChange(option?.value)}
              isLoading={isLoading}
              isDisabled={isFieldDisabled}
              placeholder={t(
                "form-select-stock-received-but-not-billed-account"
              )}
            />
          )}
        />
        <Controller
          name="stockAdjustmentAccount"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Select
              label={t("form-stock-adjustment-account")}
              labelClassName="text-title"
              options={coaOptions}
              value={
                value && coaOptions
                  ? coaOptions.find(
                      (option: any) => option.value === value
                    ) || null
                  : null
              }
              onChange={(option: any) => onChange(option?.value)}
              isLoading={isLoading}
              isDisabled={isFieldDisabled}
              placeholder={t("form-select-stock-adjustment-account")}
            />
          )}
        />
        <Controller
          name="provisionalAccount"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Select
              label={t("form-provisional-account")}
              labelClassName="text-title"
              options={coaOptions}
              value={
                value && coaOptions
                  ? coaOptions.find(
                      (option: any) => option.value === value
                    ) || null
                  : null
              }
              onChange={(option: any) => onChange(option?.value)}
              isLoading={isLoading}
              isDisabled={isFieldDisabled}
              placeholder={t("form-select-provisional-account")}
            />
          )}
        />
        <Controller
          name="expansesIncludeInValuation"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Select
              label={t("form-expanses-include-in-valuation")}
              labelClassName="text-title"
              options={coaOptions}
              value={
                value && coaOptions
                  ? coaOptions.find(
                      (option: any) => option.value === value
                    ) || null
                  : null
              }
              onChange={(option: any) => onChange(option?.value)}
              isLoading={isLoading}
              isDisabled={isFieldDisabled}
              placeholder={t("form-select-expanses-include-in-valuation")}
            />
          )}
        />
        <Controller
          name="inTransitWarehouseAccount"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Select
              label={t("form-in-transit-warehouse-account")}
              labelClassName="text-title"
              options={coaOptions}
              value={
                value && coaOptions
                  ? coaOptions.find(
                      (option: any) => option.value === value
                    ) || null
                  : null
              }
              onChange={(option: any) => onChange(option?.value)}
              isLoading={isLoading}
              isDisabled={isFieldDisabled}
              placeholder={t("form-select-in-transit-warehouse-account")}
            />
          )}
        />
      </FormGroup>

      <FormGroup
        title={t("form-manufacturing-settings")}
        className="pt-7 @2xl:pt-10 @3xl:pt-11">
        <Controller
          name="operatingCostAccount"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Select
              label={t("form-operating-cost-account")}
              labelClassName="text-title"
              options={coaOptions}
              value={
                value && coaOptions
                  ? coaOptions.find(
                      (option: any) => option.value === value
                    ) || null
                  : null
              }
              onChange={(option: any) => onChange(option?.value)}
              isLoading={isLoading}
              isDisabled={isFieldDisabled}
              placeholder={t("form-select-operating-cost-account")}
            />
          )}
        />
      </FormGroup>
    </FormGroupContainer>
  )
}
