import { useTranslations } from "next-intl"
import { Controller } from "react-hook-form"

import FormGroup from "@/components/base/form-group"
import { Input, Select } from "@/components/ui"
import { useCountryList } from "@/hooks/use-countries"
import { useSelectOptions } from "@/hooks/use-select-options"
import { CountryList } from "@/modules/fms/types"

export function AddressFields({ register, control, errors, info, setInfo }: any) {
  const t = useTranslations("form")
  const { data: countryList, isLoading: isCountryLoading } = useCountryList({pageSize:100})
  const countryOptions = useSelectOptions<CountryList>(
    countryList?.data,
    "countryName"
  )
  return (
    <>
      <FormGroup
        title={t("form-address")}
        className="pt-7 @2xl:pt-9 @3xl:pt-11">
         <Input
            label={t("form-street")}
            placeholder={t("form-enter-street")}
            autoComplete="off"
            labelClassName="text-sm font-medium text-gray-900"
            {...register("street")}
          />
          <Input
            label={t("form-house")}
            placeholder={t("form-enter-house")}
            labelClassName="text-sm font-medium text-gray-900"
            {...register("house")}
          />
          <Input
            label={t("form-zip")}
            autoComplete="off"
            placeholder={t("form-enter-zip")}
            labelClassName="text-sm font-medium text-gray-900"
            {...register("zip")}
          />
          <Input
            label={t("form-city")}
            placeholder={t("form-enter-city")}
            labelClassName="text-sm font-medium text-gray-900"
            {...register("city")}
          />
          <Input
            label={t("form-state")}
            placeholder={t("form-enter-state")}
            labelClassName="text-sm font-medium text-gray-900"
            {...register("state")}
          />
          <Controller
            name="country"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Select
                label={t("form-country")}
                labelClassName="text-title"
                isRequired
                options={countryOptions}
                value={
                  countryOptions?.find(
                    (option: any) => option.value == value || option.value == info.country
                  ) || null
                }
                onChange={(selectedOption: any) => {
                  const selectedValue = selectedOption.value
                  onChange(selectedValue);
                  setInfo((prevInfo: any) => ({
                    ...prevInfo,
                    country: selectedValue,
                  }));
                }}
                isLoading={isCountryLoading}
                placeholder={
                  isCountryLoading ? t("form-loading") : t("form-select-country")
                }
                menuPlacement="auto"
                menuPortalTarget={document.body}
                error={errors.country?.message && t("form-country-is-required")}
              />
            )}
          />
      </FormGroup>
    </>
  )
}
