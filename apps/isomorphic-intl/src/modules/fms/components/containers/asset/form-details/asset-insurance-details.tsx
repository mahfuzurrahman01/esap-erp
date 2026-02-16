import dayjs from "dayjs"
import { useTranslations } from "next-intl"
import { Controller, UseFormRegister, UseFormWatch } from "react-hook-form"
import { Control, FormState } from "react-hook-form"

import { DatePicker } from "@/components/base/date-picker"
import FormGroup from "@/components/base/form-group"
import { Input } from "@/components/ui"
import { AssetFormInput } from "@/modules/fms/validators/asset-schema"

interface AssetInsuranceDetailsProps {
  formMethods: {
    register: UseFormRegister<AssetFormInput>
    control: Control<AssetFormInput>
    formState: FormState<AssetFormInput>
    watch: UseFormWatch<AssetFormInput>
  }
  isFieldDisabled?: boolean
}

export default function AssetInsuranceDetails({
  formMethods,
  isFieldDisabled,
}: AssetInsuranceDetailsProps) {
  const t = useTranslations("form")

  const {
    register,
    control,
    formState: { errors },
    watch,
  } = formMethods

  return (
    <>
      <FormGroup
        title={t("form-insurance-details")}
        className="pt-7 @2xl:pt-9 @3xl:pt-11">
        <Input
          {...register("insurancePolicyNumber")}
          label={t("form-insurance-policy-number")}
          placeholder={t("form-enter-insurance-policy-number")}
          error={errors.insurancePolicyNumber?.message}
          disabled={isFieldDisabled}
        />
        <Input
          {...register("insuranceCompanyName")}
          label={t("form-insurance-company-name")}
          placeholder={t("form-enter-insurance-company-name")}
          error={errors.insuranceCompanyName?.message}
          disabled={isFieldDisabled}
        />
        <Controller
          name="insurancePolicyStartDate"
          control={control}
          render={({ field: { value, onChange } }) => (
            <DatePicker
              inputProps={{ label: t("form-insurance-policy-start-date") }}
              placeholderText={t("form-select-date")}
              value={value ? new Date(value) : null}
              onChange={(date: any) => {
                onChange(date ? dayjs(date).format("YYYY-MM-DD") : null)
              }}
              popperPlacement="bottom-end"
              disabled={isFieldDisabled}
            />
          )}
        />
        <Controller
          name="insurancePolicyEndDate"
          control={control}
          render={({ field: { value, onChange } }) => {
            const startDate = watch("insurancePolicyStartDate")
            return (
              <DatePicker
                inputProps={{ label: t("form-insurance-policy-end-date") }}
                placeholderText={t("form-select-date")}
                value={value ? new Date(value) : null}
                onChange={(date: any) => {
                  onChange(date ? dayjs(date).format("YYYY-MM-DD") : null)
                }}
                minDate={startDate ? dayjs(startDate).toDate() : undefined}
                popperPlacement="bottom-end"
                disabled={isFieldDisabled}
              />
            )
          }}
        />
        <Input
          type="number"
          {...register("insuranceAmount")}
          label={t("form-insurance-amount")}
          placeholder={t("form-enter-insurance-amount")}
          error={errors.insuranceAmount?.message}
          disabled={isFieldDisabled}
        />
      </FormGroup>
    </>
  )
}
