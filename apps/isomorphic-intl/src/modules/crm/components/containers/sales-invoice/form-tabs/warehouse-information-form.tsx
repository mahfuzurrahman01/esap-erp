"use client"

import { useTranslations } from "next-intl"
import {
  Controller,
} from "react-hook-form"

import { Checkbox, Select } from "@/components/ui"
import {
  GetMenuListStyles,
} from "@/modules/scm/utils/select-options"
import { useSCMSharedDataHook } from "@/modules/scm/constants/shared-data-hooks"

interface WarehouseInformationFormProps {
  isFieldDisabled?: boolean
  formMethods: any
  info: any
  setInfo: any
}

export default function WarehouseInformationForm({
  isFieldDisabled,
  formMethods,
  info,
  setInfo
}: WarehouseInformationFormProps) {
  const t = useTranslations("form")
  const { warehouse } = useSCMSharedDataHook(["warehouse"])
  const { warehouseOptions, isWarehouseLoading } = warehouse

  const {
    control,
    register,
    formState: { errors },
  } = formMethods

  return (
    <>
      <Controller
        name="updateStock"
        control={control}
        render={({ field: { value } }) => (
          <Checkbox
            label={t("form-update-stock")}
            checked={value}
            onChange={(event:any) => {
              setInfo((prevInfo: any) => ({
                ...prevInfo,
                updateStock: event.target.checked,
              }));
            }}
          />
        )}
      />
      <Controller
        control={control}
        name="warehouseId"
        render={({ field: { onChange, value } }) => (
          <Select
            label={t("form-warehouse")}
            labelClassName="text-title"
            placeholder={t("form-select-warehouse")}
            options={warehouseOptions}
            value={
              warehouseOptions?.find(
                (option: any) => option.value == value || option.value == info.warehouseId
              ) || null
            }
            onChange={(selectedOption: any) => {
              const selectedValue = selectedOption.value
              onChange(selectedValue);
              setInfo((prevInfo: any) => ({
                ...prevInfo,
                warehouseId: selectedValue,
              }));
            }}
            isLoading={isWarehouseLoading}
            isDisabled={isFieldDisabled}
            error={errors?.warehouseId?.message
              ? t(errors.warehouseId?.message)
              : ""}
            menuPortalTarget={document.body}
            styles={GetMenuListStyles(warehouseOptions.length)}
          />
        )}
      />
    </>
  )
}
