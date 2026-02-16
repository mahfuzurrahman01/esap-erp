"use client"

import { useTranslations } from "next-intl"
import { Control, Controller, UseFormRegister, UseFormSetValue } from "react-hook-form"
import { SelectOption } from "rizzui/select"

import Select from "@/components/ui/select"
import { useSharedDataHooks } from "@/modules/fms/constants/shared-data-hook"
import { AssetMaintenanceSchema } from "@/modules/fms/validators/asset-maintenance-schema"

export interface BasicInformationFormProps {
  register: UseFormRegister<AssetMaintenanceSchema>
  control: Control<AssetMaintenanceSchema>
  setValue: UseFormSetValue<AssetMaintenanceSchema>
  errors: any
  isFieldDisabled?: boolean
}

export function BasicInformationForm({
  control,
  errors,
  isFieldDisabled,
  setValue,
}: BasicInformationFormProps) {
  const t = useTranslations("form")
  const { asset, company } = useSharedDataHooks(["asset", "company"])

  const { assetOptions, assetList, isAssetLoading } = asset
  const { companyOptions, isCompanyLoading } = company

  return (
    <>
      <Controller
        name="assetId"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Select
            label={t("form-asset")}
            labelClassName="text-title"
            isRequired
            menuPortalTarget={document.body}
            options={assetOptions}
            value={
              assetOptions.find(
                (option: SelectOption) => option.value === value
              ) || null
            }
            onChange={(option: any) => {
              if (option?.value) {
                onChange(option.value)
                const selectedAccount = assetList?.data?.find(
                  (acc: any) => acc.id === option.value
                )
                if (selectedAccount) {
                  setValue?.(
                    "companyId",
                    selectedAccount.companyId || ""
                  )
                }
              }
            }}
            isLoading={isAssetLoading}
            isDisabled={isFieldDisabled || isAssetLoading}
            placeholder={
              isAssetLoading ? "Loading asset..." : t("form-select-asset")
            }
            error={errors.assetId?.message && t(errors.assetId.message)}
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
            menuPortalTarget={document.body}
            options={companyOptions}
            value={
              companyOptions.find(
                (option: SelectOption) => option.value === value
              ) || null
            }
            onChange={(option: any) => onChange(option?.value)}
            isLoading={isCompanyLoading}
            isDisabled={isFieldDisabled || isCompanyLoading}
            placeholder={
              isCompanyLoading ? "Loading company..." : t("form-select-company")
            }
            error={errors.companyId?.message && t(errors.companyId.message)}
          />
        )}
      />
    </>
  )
}
