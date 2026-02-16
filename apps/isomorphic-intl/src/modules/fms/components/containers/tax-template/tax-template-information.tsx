"use client"

import { useTranslations } from "next-intl"
import { Controller } from "react-hook-form"

import FormGroup from "@/components/base/form-group"
import { Input, Select, Checkbox } from "@/components/ui"

import { TaxTemplateInformationProps } from "./template-form-types"
import { taxTemplateTypesOptions } from "@/modules/fms/constants/shared-data-hook"

export function TaxTemplateInformation({
  register,
  control,
  errors,
  isFieldDisabled,
  taxCategoryOptions,
  companyOptions,
  isTaxCategoryLoading,
  isCompanyLoading,
}: any) {
  const t = useTranslations("form")

  return (
    <FormGroup title={t("form-information")}>
      <Input
        {...register("taxTemplateName")}
        label={t("form-tax-template-name")}
        placeholder={t("form-enter-tax-template-name")}
        error={
          errors.taxTemplateName?.message && t(errors.taxTemplateName.message)
        }
        disabled={isFieldDisabled}
        isRequired
      />

      <Controller
        name="templateType"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Select
            label={t("form-tax-template-type")}
            labelClassName="text-title"
            options={taxTemplateTypesOptions}
            value={
              value && taxTemplateTypesOptions
                ? taxTemplateTypesOptions.find((option: any) => option.value === value)
                : null
            }
            onChange={(option: any) => onChange(option?.value)}
            isRequired
            isDisabled={isFieldDisabled}
            placeholder={t("form-select-tax-type")}
            error={
              errors.templateType?.message &&
              t(errors.templateType.message)
            }
          />
        )}
      />

      <Controller
        name="taxCategoryId"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Select
            label={t("form-tax-category")}
            labelClassName="text-title"
            options={taxCategoryOptions}
            value={
              value && taxCategoryOptions
                ? taxCategoryOptions.find(
                    (option: any) => option.value === value
                  )
                : null
            }
            onChange={(option: any) => onChange(option?.value)}
            isLoading={isTaxCategoryLoading}
            isDisabled={isFieldDisabled || isTaxCategoryLoading}
            isRequired
            placeholder={
              isTaxCategoryLoading
                ? "Loading tax category..."
                : t("form-select-tax-category")
            }
            error={
              errors.taxCategoryId?.message && t(errors.taxCategoryId.message)
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
            options={companyOptions}
            value={
              value && companyOptions
                ? companyOptions.find((option: any) => option.value === value)
                : null
            }
            onChange={(option: any) => onChange(option?.value)}
            isLoading={isCompanyLoading}
            isDisabled={isFieldDisabled || isCompanyLoading}
            isRequired
            placeholder={
              isCompanyLoading
                ? "Loading companies..."
                : t("form-select-company")
            }
            error={errors.companyId?.message && t(errors.companyId.message)}
          />
        )}
      />

      <Controller
        name="isActive"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Checkbox
            label={t("form-is-active")}
            checked={value}
            onChange={onChange}
            disabled={isFieldDisabled}
          />
        )}
      />
    </FormGroup>
  )
}
