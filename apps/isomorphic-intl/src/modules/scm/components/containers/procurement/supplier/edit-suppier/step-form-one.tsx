"use client"

import { atom, useAtom } from "jotai"
import { useTranslations } from "next-intl"
import {
  Control,
  Controller,
  FormState,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form"

import FormGroup from "@/components/base/form-group"
import FormGroupContainer from "@/components/base/form-group-container"
import { Input } from "@/components/ui"
import Select from "@/components/ui/select"
import UploadPhoto from "@/components/ui/upload-photo"
import { useSelectOptions } from "@/hooks/use-select-options"
import { useCountryList } from "@/modules/fms/hooks/use-country"
import { CountryList } from "@/modules/fms/types"
import { useSupplierCategoryList } from "@/modules/scm/hooks/procurement/supplier/use-supplier-category"
import { SupplierCategory } from "@/modules/scm/types/procurement/supplier/supplier-category-types"
import {
  Supplier,
  SupplierUpdateInput,
} from "@/modules/scm/types/procurement/supplier/supplier-types"
import {
  FindSelectOption,
  GetMenuListStyles,
} from "@/modules/scm/utils/select-options"

export const selectedCountryNameAtom = atom<string>("")
export const selectedCountryIdAtom = atom<number>(0)

interface BasicInformationFormProps {
  supplier: Supplier
  formMethods: {
    register: UseFormRegister<SupplierUpdateInput>
    control: Control<SupplierUpdateInput>
    formState: FormState<SupplierUpdateInput>
    setValue: UseFormSetValue<SupplierUpdateInput>
  }
  isFieldDisabled?: boolean
}

export default function BasicInformationForm({
  supplier,
  formMethods,
  isFieldDisabled,
}: BasicInformationFormProps) {
  const {
    register,
    control,
    formState: { errors },
  } = formMethods

  const t = useTranslations("form")
  const [, setSelectedCountryName] = useAtom(selectedCountryNameAtom)
  const [, setSelectedCountryId] = useAtom(selectedCountryIdAtom)
  const { data, isLoading } = useSupplierCategoryList()

  const { data: countries, isLoading: isCountriesLoading } = useCountryList()

  const industryCategoryOptions = useSelectOptions<SupplierCategory>(
    data?.data,
    "name"
  )

  const countryOptions = useSelectOptions<CountryList>(
    countries?.data,
    "countryName"
  )

  return (
    <>
      <FormGroupContainer>
        {/* Profile Picture */}
        <FormGroup
          title={t("form-upload-logo-profile")}
          className="pt-7 @2xl:pt-10 @3xl:pt-11">
          <Controller
            name="avatarFile"
            control={control}
            render={({ field: { onChange, value } }) => (
              <UploadPhoto
                onChange={(file) => onChange(file)}
                value={value}
              />
            )}
          />
        </FormGroup>
        <FormGroup
          title={t("form-basic-information")}
          className="pt-7 @2xl:pt-10 @3xl:pt-11">
          <Input
            {...register("firstName")}
            error={
              errors?.firstName?.message ? t(errors.firstName?.message) : ""
            }
            labelClassName="bg-paper"
            label={t("form-first-name")}
            disabled={isFieldDisabled}
          />
          <Input
            {...register("middleName")}
            error={
              errors?.middleName?.message ? t(errors.middleName?.message) : ""
            }
            labelClassName="bg-paper"
            label={t("form-middle-name")}
            disabled={isFieldDisabled}
          />
          <Input
            {...register("lastName")}
            error={errors?.lastName?.message ? t(errors.lastName?.message) : ""}
            labelClassName="bg-paper"
            label={t("form-last-name")}
            disabled={isFieldDisabled}
          />
          <Controller
            control={control}
            name="supplierCategoryId"
            render={({ field: { onChange, value } }) => (
              <Select
                label={t("form-supplier-category")}
                labelClassName="text-title"
                options={industryCategoryOptions}
                value={FindSelectOption(industryCategoryOptions, value)}
                onChange={(selectedValue: any) => {
                  onChange(selectedValue?.value)
                }}
                isLoading={isLoading}
                isDisabled={isLoading}
                placeholder={t("form-supplier-category")}
                menuPortalTarget={document.body}
                styles={GetMenuListStyles(industryCategoryOptions.length)}
              />
            )}
          />
          <Input
            {...register("companyName")}
            error={
              errors?.companyName?.message ? t(errors.companyName?.message) : ""
            }
            labelClassName="bg-paper"
            label={t("form-company-name")}
            disabled={isFieldDisabled}
          />
          <Input
            {...register("companyWebsite")}
            error={
              errors?.companyWebsite?.message
                ? t(errors.companyWebsite?.message)
                : ""
            }
            labelClassName="bg-paper"
            label={t("form-company-website")}
            disabled={isFieldDisabled}
          />
          <Input
            {...register("companyAddress")}
            error={
              errors?.companyAddress?.message
                ? t(errors.companyAddress?.message)
                : ""
            }
            labelClassName="bg-paper"
            label={t("form-address")}
            disabled={isFieldDisabled}
          />
          <Input
            {...register("city")}
            error={errors?.city?.message ? t(errors.city?.message) : ""}
            labelClassName="bg-paper"
            label={t("form-city")}
            disabled={isFieldDisabled}
          />
          <Input
            {...register("state")}
            error={errors?.state?.message ? t(errors.state?.message) : ""}
            labelClassName="bg-paper"
            label={t("form-state")}
            disabled={isFieldDisabled}
          />
          <Input
            {...register("street")}
            error={errors?.street?.message ? t(errors.street?.message) : ""}
            labelClassName="bg-paper"
            label={t("form-street")}
            disabled={isFieldDisabled}
          />
          <Input
            {...register("zipCode")}
            error={errors?.zipCode?.message ? t(errors.zipCode?.message) : ""}
            labelClassName="bg-paper"
            label={t("form-zip-code")}
            disabled={isFieldDisabled}
          />
          <Controller
            control={control}
            name="countryId"
            render={({ field: { onChange, value } }) => (
              <Select
                label={t("form-country")}
                placeholder={t("form-country")}
                labelClassName="text-title"
                options={countryOptions}
                value={FindSelectOption(countryOptions, value)}
                onChange={(selectedValue: any) => {
                  // setSelectedCountryId(selectedValue?.value)
                  setSelectedCountryName(selectedValue?.label)
                  onChange(selectedValue?.value)
                }}
                isLoading={isCountriesLoading}
                isDisabled={isCountriesLoading}
                error={
                  errors?.countryId?.message ? t(errors.countryId?.message) : ""
                }
                menuPortalTarget={document.body}
                styles={GetMenuListStyles(countryOptions.length)}
              />
            )}
          />
          <Input
            {...register("contactNumber")}
            error={
              errors?.contactNumber?.message
                ? t(errors.contactNumber?.message)
                : ""
            }
            label={t("form-contact-number")}
            helperText={
              errors?.contactNumber?.message
                ? t(errors.contactNumber?.message)
                : ""
            }
            labelClassName="bg-paper"
          />
          <Input
            type="email"
            {...register("contactEmail")}
            error={
              errors?.contactEmail?.message
                ? t(errors.contactEmail?.message)
                : ""
            }
            label={t("form-contact-email")}
            labelClassName="bg-paper"
          />
        </FormGroup>
      </FormGroupContainer>
    </>
  )
}
