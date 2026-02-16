import { useTranslations } from "next-intl"
import { Controller } from "react-hook-form"

import { Checkbox, Input } from "@/components/ui"
import Select from "@/components/ui/select"

import { BasicInformationFormProps } from "./types"

export function BasicInformationForm({
  register,
  control,
  errors,
  isFieldDisabled,
  modeOfPaymentTypeOptions,
}: BasicInformationFormProps) {
  const t = useTranslations("form")

  return (
    <>
      <Input
        {...register("modeOfPaymentName")}
        label={t("form-mode-of-payment-name")}
        isRequired
        placeholder={t("form-enter-mode-of-payment-name")}
        error={
          errors.modeOfPaymentName?.message &&
          t(errors.modeOfPaymentName.message)
        }
        disabled={isFieldDisabled}
      />
      <Controller
        name="modeOfPaymentType"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Select
            label={t("form-type")}
            labelClassName="text-title"
            isRequired
            menuPortalTarget={document.body}
            options={modeOfPaymentTypeOptions}
            value={
              modeOfPaymentTypeOptions.find(
                (option) => option.label === value
              ) || null
            }
            onChange={(option: any) => onChange(option?.label)}
            isDisabled={isFieldDisabled}
            placeholder={t("form-select-type")}
            error={
              errors.modeOfPaymentType?.message &&
              t(errors.modeOfPaymentType.message)
            }
          />
        )}
      />
      <Controller
        name="isActive"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Checkbox
            label={t("form-is-enabled")}
            checked={value!}
            onChange={onChange}
            disabled={isFieldDisabled}
          />
        )}
      />
    </>
  )
}
