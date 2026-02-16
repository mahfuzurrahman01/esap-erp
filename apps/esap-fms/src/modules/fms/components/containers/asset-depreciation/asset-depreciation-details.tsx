import { useTranslations } from "next-intl"

import { Input } from "@/components/ui"

import { BasicInformationFormProps } from "./types"

export default function AssetDepreciationDetailsForm({
  register,
  errors,
}: BasicInformationFormProps) {
  const t = useTranslations("form")

  return (
    <>
      <Input
        {...register("depreciationMethod")}
        label={t("form-depreciation-method")}
        labelClassName="text-title"
        error={
          errors.depreciationMethod?.message &&
          t(errors.depreciationMethod.message)
        }
        disabled={true}
      />
      <Input
        {...register("totalDepreciationPeriod")}
        label={t("form-total-depreciation-period")}
        labelClassName="text-title"
        error={
          errors.totalDepreciationPeriod?.message &&
          t(errors.totalDepreciationPeriod.message)
        }
        disabled={true}
      />
      <Input
        {...register("frequencyOfDepreciation")}
        label={t("form-frequency-of-depreciation")}
        labelClassName="text-title"
        error={
          errors.frequencyOfDepreciation?.message &&
          t(errors.frequencyOfDepreciation.message)
        }
        disabled={true}
      />
      <Input
        {...register("expectedValue")}
        label={t("form-expected-value-after-depreciation")}
        labelClassName="text-title"
        error={errors.expectedValue?.message && t(errors.expectedValue.message)}
        disabled={true}
      />
    </>
  )
}
