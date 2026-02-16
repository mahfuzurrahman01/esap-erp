import { useTranslations } from "next-intl"
import { Controller } from "react-hook-form"

import FormGroup from "@/components/base/form-group"
import { Input, Select } from "@/components/ui"
import { discountTypeOptions } from "@/data/crm/quotation"

export function DiscountInformation({
  register,
  control,
  setDiscount,
  setValue,
}: any) {
  const t = useTranslations("form")

  return (
    <FormGroup title={t("form-additional-discount")} className="pt-7">
      <Controller
        name="discountType"
        control={control}
        render={({ field: { value, onChange } }) => (
          <div className="w-full">
            <Select
              label={t("form-discount-type")}
              placeholder={t("form-select")}
              labelClassName="text-title"
              options={discountTypeOptions}
              value={
                discountTypeOptions?.find(
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
        {...register("discountAmount", {
          valueAsNumber: true,
        })}
        label={t("form-discount-amount")}
        autoComplete="off"
        placeholder={t("form-enter-amount")}
        onChange={(e) => {
          const value = Number(e.target.value)
          setValue("discountAmount", value)
          setDiscount((prevDiscount: any) => ({
            ...prevDiscount,
            amount: value,
          }))
        }}
        inputClassName="border-gray-500/20 ring-0"
      />
    </FormGroup>
  )
}
