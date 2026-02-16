"use client"

import { useTranslations } from "next-intl"
import { Control, FormState, UseFormRegister } from "react-hook-form"
import { Controller } from "react-hook-form"

import FormGroup from "@/components/base/form-group"
import FormGroupContainer from "@/components/base/form-group-container"
import { Input, Select } from "@/components/ui"
import { useSharedDataHooks } from "@/modules/fms/constants/shared-data-hook"
import { CompanyFormInput } from "@/modules/fms/validators/company-schema"

interface CompanyBuyingSellingFormProps {
  formMethods: {
    register: UseFormRegister<CompanyFormInput>
    control: Control<CompanyFormInput>
    formState: FormState<CompanyFormInput>
  }
  isFieldDisabled?: boolean
}

export default function CompanyBuyingSellingForm({
  formMethods,
  isFieldDisabled,
}: CompanyBuyingSellingFormProps) {
  const t = useTranslations("form")
  const { control, register } = formMethods
  const { coa } = useSharedDataHooks(["coa"])

  const { coaOptions, isCOALoading: isLoading } = coa

  return (
    <FormGroupContainer>
      <FormGroup
        title={t("form-buying-and-selling-settings")}
        className="pt-7 @2xl:pt-10 @3xl:pt-11">
        <Controller
          name="buyingTerms"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Select
              label={t("form-buying-terms")}
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
              placeholder={t("form-select-buying-terms")}
            />
          )}
        />
        <Controller
          name="sellingTerms"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Select
              label={t("form-selling-terms")}
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
              placeholder={t("form-select-selling-terms")}
            />
          )}
        />
        <Controller
          name="monthlySalesTarget"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Select
              label={t("form-monthly-sales-target")}
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
              placeholder={t("form-select-monthly-sales-target")}
            />
          )}
        />
        <Controller
          name="warehouseSalesReturn"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Select
              label={t("form-warehouse-sales-return")}
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
              placeholder={t("form-select-warehouse-sales-return")}
            />
          )}
        />
        <Input
          type="number"
          label={t("form-total-monthly-sales")}
          placeholder={t("form-enter-total-monthly-sales")}
          labelClassName="text-sm font-medium text-gray-900"
          {...register("totalMonthlySales")}
          defaultValue={0}
          disabled={isFieldDisabled}
        />
        <Input
          type="number"
          label={t("form-credit-limit")}
          placeholder={t("form-enter-credit-limit")}
          labelClassName="text-sm font-medium text-gray-900"
          {...register("creditLimit")}
          defaultValue={0}
          disabled={isFieldDisabled}
        />
      </FormGroup>
    </FormGroupContainer>
  )
}
