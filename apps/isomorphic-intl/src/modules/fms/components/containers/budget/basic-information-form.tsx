"use client"

import { useTranslations } from "next-intl"
import { Control, Controller, FieldErrors, UseFormRegister } from "react-hook-form"

import FormGroup from "@/components/base/form-group"
import { Input } from "@/components/ui"
import Select from "@/components/ui/select"
import { useSharedDataHooks } from "@/modules/fms/constants/shared-data-hook"
import { BudgetFormInput } from "@/modules/fms/validators/budget-schema"

interface BasicInformationFormProps {
  register: UseFormRegister<BudgetFormInput>
  control: Control<BudgetFormInput>
  errors: FieldErrors<BudgetFormInput>
  isFieldDisabled?: boolean
}

export default function BasicInformationForm({
  register,
  control,
  errors,
  isFieldDisabled,
}: BasicInformationFormProps) {
  const t = useTranslations("form")
  const { budgetAgainst, budgetTemplate, company, costCenter, fiscalYear } =
    useSharedDataHooks([
      "budgetAgainst",
      "budgetTemplate",
      "company",
      "costCenter",
      "fiscalYear",
    ])

  const { budgetAgainstOptions, isBudgetAgainstLoading } = budgetAgainst
  const { budgetTemplateOptions, isBudgetTemplateLoading } = budgetTemplate
  const { companyOptions, companyList, isCompanyLoading } = company
  const { costCenterOptions, isCostCenterLoading } = costCenter
  const { fiscalYearOptions, isFiscalYearLoading } = fiscalYear

  return (
    <FormGroup title={t("form-information")}>
      <Input
        {...register("budgetName")}
        isRequired
        label={t("form-budget-name")}
        placeholder={t("form-enter-budget-name")}
        error={errors.budgetName?.message && t(errors.budgetName.message)}
        disabled={isFieldDisabled}
      />
      <Controller
        name="budgetAgainstId"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Select
            label={t("form-budget-against")}
            labelClassName="text-title"
            isRequired
            menuPortalTarget={document.body}
            options={budgetAgainstOptions}
            value={
              value && budgetAgainstOptions
                ? budgetAgainstOptions.find(
                  (option: any) => option.value === value
                )
                : null
            }
            onChange={(option: any) => onChange(option?.value)}
            isLoading={isBudgetAgainstLoading}
            isDisabled={isFieldDisabled || isBudgetAgainstLoading}
            placeholder={
              isBudgetTemplateLoading
                ? "Loading budget against..."
                : t("form-select-budget-against")
            }
            error={
              errors.budgetAgainstId?.message &&
              t(errors.budgetAgainstId.message)
            }
          />
        )}
      />
      <Controller
        name="budgetDistributionId"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Select
            label={t("form-budget-distribution")}
            labelClassName="text-title"
            isRequired
            menuPortalTarget={document.body}
            options={budgetTemplateOptions}
            value={
              value && budgetTemplateOptions
                ? budgetTemplateOptions.find(
                  (option: any) => option.value === value
                )
                : null
            }
            onChange={(option: any) => onChange(option?.value)}
            isLoading={isBudgetTemplateLoading}
            isDisabled={isFieldDisabled || isBudgetTemplateLoading}
            placeholder={
              isBudgetTemplateLoading
                ? t("form-loading-budget-distribution")
                : t("form-select-budget-distribution")
            }
            error={
              errors.budgetAgainstId?.message &&
              t(errors.budgetAgainstId.message)
            }
          />
        )}
      />
      <Controller
        name="companyId"
        control={control}
        defaultValue={
          companyList?.data?.find((company: any) => company.isDefault)?.id || 0
        }
        render={({ field: { value, onChange } }) => (
          <Select
            label={t("form-company-name")}
            labelClassName="text-title"
            isRequired
            menuPortalTarget={document.body}
            options={companyOptions}
            value={
              value && companyOptions
                ? companyOptions.find((option: any) => option.value === value)
                : companyOptions?.find(
                  (option: any) =>
                    option.value ===
                    companyList?.data?.find((company: any) => company.isDefault)
                      ?.id
                ) || null
            }
            onChange={(option: any) => onChange(option?.value)}
            isLoading={isCompanyLoading}
            isDisabled={isFieldDisabled || isCompanyLoading}
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
        name="costCenterId"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Select
            label={t("form-cost-center-name")}
            labelClassName="text-title"
            menuPortalTarget={document.body}
            options={costCenterOptions}
            value={
              value && costCenterOptions
                ? costCenterOptions.find(
                  (option: any) => option.value === value
                )
                : null
            }
            onChange={(option: any) => onChange(option?.value)}
            isLoading={isCostCenterLoading}
            isDisabled={isFieldDisabled || isCostCenterLoading}
            isRequired
            placeholder={
              isCostCenterLoading
                ? "Loading cost centers..."
                : t("form-select-cost-center")
            }
            error={
              errors.costCenterId?.message && t(errors.costCenterId.message)
            }
          />
        )}
      />
      <Controller
        name="fiscalYearId"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Select
            label={t("form-fiscal-year")}
            labelClassName="text-title"
            isRequired
            menuPortalTarget={document.body}
            options={fiscalYearOptions}
            value={
              value && fiscalYearOptions
                ? fiscalYearOptions.find(
                  (option: any) => option.value === value
                )
                : null
            }
            onChange={(option: any) => onChange(option?.value)}
            isLoading={isFiscalYearLoading}
            isDisabled={isFieldDisabled || isFiscalYearLoading}
            placeholder={
              isFiscalYearLoading
                ? "Loading fiscal year..."
                : t("form-select-fiscal-year")
            }
            error={
              errors.fiscalYearId?.message &&
              t(errors.fiscalYearId.message)
            }
          />
        )}
      />
    </FormGroup>
  )
} 