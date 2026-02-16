"use client"

import { useTranslations } from "next-intl"
import { Controller, UseFormRegister, UseFormWatch } from "react-hook-form"
import { Control, FormState } from "react-hook-form"

import { DatePicker } from "@/components/base/date-picker"
import FormGroup from "@/components/base/form-group"
import { Checkbox, Input } from "@/components/ui"
import { AssetFormInput } from "@/modules/fms/validators/asset-schema"
import { formatDate } from "@/utils/format-date"

interface AssetDepreciationProps {
  formMethods: {
    register: UseFormRegister<AssetFormInput>
    control: Control<AssetFormInput>
    formState: FormState<AssetFormInput>
    watch: UseFormWatch<AssetFormInput>
  }
  isFieldDisabled?: boolean
  mode?: "create" | "edit" | "view"
}

export default function AssetDepreciation({
  formMethods,
  isFieldDisabled,
  mode,
}: AssetDepreciationProps) {
  const t = useTranslations("form")

  const {
    register,
    control,
    formState: { errors },
    watch,
  } = formMethods

  const isExistingAsset = watch("isExistingAsset")
  const isCompositeAsset = watch("isCompositeAsset")
  const isDepreciated = watch("isCalculatedDepreciation")

  return (
    <>
      <FormGroup
        title={t("form-depreciation-details")}
        className="pt-7 @2xl:pt-9 @3xl:pt-11">
        <div className="col-span-full">
          <Controller
            name="isCalculatedDepreciation"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Checkbox
                label={t("form-is-depreciated")}
                size="md"
                checked={value || false}
                onChange={(e: any) => {
                  onChange(e)
                }}
                required
                disabled={mode !== "create" && true}
              />
            )}
          />
        </div>
        {(isExistingAsset || isCompositeAsset) && (
          <>
            {/* <Input
              {...register("openingAccumulatedDepreciation")}
              label={t("form-opening-accumulated-depreciation")}
              placeholder={t("form-enter-opening-accumulated-depreciation")}
              error={errors.openingAccumulatedDepreciation?.message}
              disabled={isFieldDisabled}
            />
            <Input
              type="number"
              {...register("openingNumberOfBookDepreciation")}
              label={t("form-opening-number-of-book-depreciation")}
              placeholder={t("form-enter-opening-number-of-book-depreciation")}
              error={errors.openingNumberOfBookDepreciation?.message}
              disabled={isFieldDisabled}
            /> */}
            <Controller
              name="isFullyDepreciated"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Checkbox
                  label={t("form-is-fully-depreciated")}
                  size="md"
                  checked={value || false}
                  onChange={(e: any) => {
                    onChange(e)
                  }}
                  disabled={mode !== "create" && true}
                  className="col-span-full"
                />
              )}
            />
          </>
        )}
        {isDepreciated && (
          <>
            <Input
              {...register("depreciationMethod")}
              label={t("form-depreciation-method")}
              placeholder={t("form-enter-depreciation-method")}
              defaultValue="Straight Line"
              error={errors.depreciationMethod?.message}
              readOnly={true}
              disabled={true}
            />
            <Input
              type="number"
              {...register("totalDepreciationPeriod")}
              label={t("form-total-depreciation-period")}
              placeholder={t("form-enter-total-depreciation-period")}
              error={errors.totalDepreciationPeriod?.message}
              disabled={mode !== "create" && true}
            />
            <Input
              type="number"
              {...register("frequencyOfDepreciation")}
              label={t("form-frequency-of-depreciation")}
              placeholder={t("form-enter-frequency-of-depreciation")}
              error={errors.frequencyOfDepreciation?.message}
              disabled={mode !== "create" && true}
            />
            <Controller
              name="depreciationStartDate"
              control={control}
              render={({ field: { value, onChange } }) => (
                <DatePicker
                  inputProps={{ label: t("form-depreciation-start-date") }}
                  value={value ? new Date(value) : null}
                  onChange={(date: any) =>
                    onChange(date ? date.toISOString() : "")
                  }
                  placeholderText={t("form-select-date")}
                  className="w-full"
                  popperPlacement="bottom-end"
                  disabled={mode !== "create" && true}
                />
              )}
            />
            <Input
              type="number"
              {...register("expectedResidualValue")}
              label={t("form-expected-residual-value")}
              placeholder={t("form-enter-expected-residual-value")}
              error={errors.expectedResidualValue?.message}
              disabled={mode !== "create" && true}
            />
          </>
        )}
      </FormGroup>
    </>
  )
}
