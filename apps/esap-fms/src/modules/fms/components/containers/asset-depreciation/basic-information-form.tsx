import { useTranslations } from "next-intl"
import { Controller } from "react-hook-form"

import Select from "@/components/ui/select"
import { useSharedDataHooks } from "@/modules/fms/constants/shared-data-hook"

import { BasicInformationFormProps } from "./types"

export function BasicInformationForm({
  control,
  errors,
  isFieldDisabled,
}: BasicInformationFormProps) {
  const t = useTranslations("form")
  const { asset, company } = useSharedDataHooks(["asset", "company"])

  const { assetOptions, isAssetLoading } = asset
  const { companyOptions, isCompanyLoading } = company

  return (
    <>
      <Controller
        name="assetId"
        control={control}
        render={({ field: { value } }) => (
          <Select
            label={t("form-asset")}
            labelClassName="text-title"
            menuPortalTarget={document.body}
            options={assetOptions}
            value={
              assetOptions.find((option: any) => option.value === value) || null
            }
            isDisabled={true}
            placeholder={t("form-select-asset")}
            error={errors.assetId?.message && t(errors.assetId.message)}
          />
        )}
      />
      <Controller
        name="companyId"
        control={control}
        render={({ field: { value } }) => (
          <Select
            label={t("form-company")}
            labelClassName="text-title"
            menuPortalTarget={document.body}
            options={companyOptions}
            value={
              companyOptions.find((option: any) => option.value === value) ||
              null
            }
            isDisabled={true}
            placeholder={t("form-select-company")}
            error={errors.companyId?.message && t(errors.companyId.message)}
          />
        )}
      />
    </>
  )
}
