"use client"

import { useTranslations } from "next-intl"
import {
  Controller,
} from "react-hook-form"

import { Input, Select } from "@/components/ui"
import { additionalDiscountOn } from "@/modules/scm/constants/shared-status-field-option"

interface AdditionalDiscountFormProps {
  isFieldDisabled?: boolean
  formMethods: any
  summary:any
  setDiscount:any
}

export default function AdditionalDiscountForm({
  isFieldDisabled,
  formMethods,
  setDiscount
}: AdditionalDiscountFormProps) {
  const t = useTranslations("form")

  const {
    control,
    register,
    formState: { errors },
    setValue,
  } = formMethods
  return (
    <>
      <Controller
        name="discountType"
        control={control}
        render={({ field: { value, onChange } }) => (
          <div className="w-full">
            <Select
              label={t("form-apply-discount-on")}
              placeholder={t("form-select")}
              labelClassName="text-title"
              options={additionalDiscountOn}
              isDisabled
              value={
                additionalDiscountOn?.find(
                  (option: any) => option.value == value
                ) || null
              }
              onChange={(selectedOption: any) => {
                onChange(selectedOption.value)
                setDiscount((prevDiscount: any) => ({
                  ...prevDiscount,
                  discountType: selectedOption.value,
                }))
              }}
            />
          </div>
        )}
      />
      <Input
        type="number"
        {...register("discountPercentage", {
          valueAsNumber: true,
        })}
        label={t("form-discount-percentage")}
        autoComplete="off"
        placeholder={t("form-enter-amount")}
        onChange={(e) => {
          const value = Number(e.target.value)
          setDiscount((prevDiscount: any) => ({
            ...prevDiscount,
            percentage: value,
          }))
        }}
        inputClassName="border-gray-500/20 ring-0"
      />
      <div></div>
      <Input
        type="number"
        {...register("discountAmount", {
          valueAsNumber: true,
        })}
        label={t("form-discount-amount")}
        autoComplete="off"
        placeholder={t("form-enter-amount")}
        onChange={(e) => {
          const value = Number(e.target.value)
          setDiscount((prevDiscount: any) => ({
            ...prevDiscount,
            amount: value,
          }))
        }}
        inputClassName="border-gray-500/20 ring-0"
      />
    </>
  )
}
