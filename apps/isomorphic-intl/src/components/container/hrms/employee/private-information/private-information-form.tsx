"use client"

import { useParams } from "next/navigation"

import { Form } from "@core/ui/form"
import dayjs from "dayjs"
import { useTranslations } from "next-intl"
import { Controller, SubmitHandler } from "react-hook-form"

import { DatePicker } from "@/components/base/date-picker"
import FormGroup from "@/components/base/form-group"
import FormGroupContainer from "@/components/base/form-group-container"
import EmployeeFormStickyActions from "@/components/container/hrms/employee/employee-form-sticky-actions"
import { Input, Select } from "@/components/ui"
import {
  useCreatePrivateInfo,
  usePrivateInfoById,
  useUpdatePrivateInfo,
} from "@/hooks/hrms/employee/use-private"
import { useSelectOptions } from "@/hooks/use-select-options"
import { useBankAccountList } from "@/modules/fms/hooks/use-bank-account"
import { useCountryList } from "@/modules/fms/hooks/use-country"
import { useCurrencyList } from "@/modules/fms/hooks/use-currency"
import { BankAccountList, CountryList, CurrencyList } from "@/modules/fms/types"
import type { PrivateInformation } from "@/types/hrms/employee/employee.types"
import {
  PrivateInformationFormInputType,
  privateInformationSchema,
} from "@/validators/hrms/private-information.schema"

const defaultData: PrivateInformationFormInputType = {
  employeeId: 0,
  street: "",
  state: "",
  country: "",
  city: "",
  zip: "",
  email: "",
  phone: "",
  language: "",
  emergencyContactName: "",
  emergencyContactRelation: "",
  emergencyContactEmail: "",
  emergencyContactPhone: "",
  visaNo: "",
  visaExpireDate: null,
  workPermitNo: "",
  workPermitExpireDate: null,
  documentPath: "",
  nationality: "",
  gender: "",
  nidNo: "",
  ssn: "",
  passportNo: "",
  dateOfBirth: null,
  placeOfBirth: "",
  countryOfBirth: "",
  bankAccountId: 0,
  bankAccountName: "",
  bankAccountNumber: "",
  currencyId: 0,
  currencyName: "",
}

const genderOptions = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
]

const PrivateInformation = () => {
  const t = useTranslations("form")
  const params = useParams()
  const temporaryEmployeeId = params.employeeId
  const { mutateAsync: createPrivateInfo, isPending: isCreatePending } =
    useCreatePrivateInfo()
  const { mutateAsync: updatePrivateInfo, isPending: isUpdatePending } =
    useUpdatePrivateInfo()
  const { data: countryList, isLoading: isCountryLoading } = useCountryList()
  const { data: bankDetails, isLoading: isBankDetailsLoading } =
    useBankAccountList()
  const { data: currencyList, isLoading: isCurrencyLoading } = useCurrencyList()
  const { data: privateInfo } = usePrivateInfoById(Number(temporaryEmployeeId))
  const countryOptions = useSelectOptions<CountryList>(
    countryList?.data,
    "countryName"
  )
  const bankAccountOptions = useSelectOptions<BankAccountList>(
    bankDetails?.data,
    "accountName"
  )
  const currencyOptions = useSelectOptions<CurrencyList>(
    currencyList?.data,
    "currencyName"
  )

  const onSubmit: SubmitHandler<PrivateInformation> = async (data) => {
    if (temporaryEmployeeId && privateInfo?.id) {
      await updatePrivateInfo({ data })
    } else {
      // await createEmployee(data)
      await createPrivateInfo({
        ...data,
        employeeId: Number(temporaryEmployeeId),
      })
    }
  }

  //console.log(bankDetails)
  return (
    <Form<PrivateInformationFormInputType>
      validationSchema={privateInformationSchema}
      onSubmit={onSubmit}
      className="flex grow flex-col justify-between @container"
      useFormProps={{
        mode: "onChange",
        defaultValues: privateInfo || defaultData,
        values: privateInfo as PrivateInformationFormInputType,
      }}>
      {({ register, control, formState: { errors }, setValue }) => {
        //console.log(errors)
        return (
          <>
            <FormGroupContainer className="px-0">
              <FormGroup
                title={t("form-bank-details")}
                className="px-5 pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-10">
                <Controller
                  name="bankAccountId"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      label={t("form-bank-account")}
                      placeholder={t("form-bank-account")}
                      options={bankAccountOptions}
                      onChange={(selectedOption: any) => {
                        onChange(selectedOption?.value)

                        setValue("bankAccountName", selectedOption?.label)
                        setValue(
                          "bankAccountNumber",
                          bankDetails?.data.find(
                            (account) => account.id === selectedOption?.value
                          )?.bankAccountNumber || ""
                        )
                      }}
                      value={
                        bankAccountOptions.find(
                          (option) => option.value === value
                        ) || null
                      }
                      isLoading={isBankDetailsLoading}
                      error={
                        errors?.bankAccountId?.message
                          ? t(errors?.bankAccountId?.message)
                          : ""
                      }
                    />
                  )}
                />

                <Controller
                  name="currencyId"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      label={t("form-currency")}
                      placeholder={t("form-currency")}
                      options={currencyOptions}
                      onChange={(selectedOption: any) => {
                        onChange(selectedOption?.value)

                        setValue("currencyName", selectedOption?.label)
                      }}
                      value={
                        currencyOptions.find(
                          (option) => option.value === value
                        ) || null
                      }
                      isLoading={isCurrencyLoading}
                      error={
                        errors?.currencyId?.message
                          ? t(errors?.currencyId?.message)
                          : ""
                      }
                    />
                  )}
                />
              </FormGroup>
              <FormGroup
                title={t("form-private-contact")}
                className="px-5 pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-10">
                <Input
                  label={t("form-email")}
                  placeholder={t("form-email")}
                  {...register("email")}
                />

                <Input
                  label={t("form-phone")}
                  placeholder={t("form-phone")}
                  {...register("phone")}
                  error={
                    errors?.phone?.message ? t(errors?.phone?.message) : ""
                  }
                />

                <Input
                  label={t("form-language")}
                  placeholder={t("form-language")}
                  {...register("language")}
                  error={
                    errors?.language?.message
                      ? t(errors?.language?.message)
                      : ""
                  }
                />

                <Input
                  label={t("form-street")}
                  placeholder={t("form-street")}
                  {...register("street")}
                  error={
                    errors?.street?.message ? t(errors?.street?.message) : ""
                  }
                />
                <Input
                  label={t("form-state")}
                  placeholder={t("form-state")}
                  {...register("state")}
                  error={
                    errors?.state?.message ? t(errors?.state?.message) : ""
                  }
                />
                <Controller
                  name="country"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      label={t("form-country")}
                      placeholder={t("form-country")}
                      options={countryOptions}
                      onChange={(selectedOption: any) => {
                        onChange(selectedOption?.label)
                      }}
                      value={
                        countryOptions.find(
                          (option) => option.label === value
                        ) || null // Set to null if no match found
                      }
                      isLoading={isCountryLoading}
                      error={
                        errors?.country?.message
                          ? t(errors?.country?.message)
                          : ""
                      }
                    />
                  )}
                />
                <Input
                  label={t("form-city")}
                  placeholder={t("form-city")}
                  {...register("city")}
                  error={errors?.city?.message ? t(errors?.city?.message) : ""}
                />
                <Input
                  label={t("form-zip")}
                  placeholder={t("form-zip")}
                  {...register("zip")}
                  error={errors?.zip?.message ? t(errors?.zip?.message) : ""}
                />
              </FormGroup>
              <FormGroup
                title={t("form-private-emergency-contact")}
                className="px-5 pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-10">
                <Input
                  label={t("form-emergency-contact-name")}
                  placeholder={t("form-emergency-contact-name")}
                  {...register("emergencyContactName")}
                  error={
                    errors?.emergencyContactName?.message
                      ? t(errors?.emergencyContactName?.message)
                      : ""
                  }
                />
                <Input
                  label={t("form-emergency-contact-relation")}
                  placeholder={t("form-emergency-contact-relation")}
                  {...register("emergencyContactRelation")}
                  error={
                    errors?.emergencyContactRelation?.message
                      ? t(errors?.emergencyContactRelation?.message)
                      : ""
                  }
                />
                <Input
                  label={t("form-emergency-contact-email")}
                  placeholder={t("form-emergency-contact-email")}
                  {...register("emergencyContactEmail")}
                />
                <Input
                  label={t("form-emergency-contact-phone")}
                  placeholder={t("form-emergency-contact-phone")}
                  {...register("emergencyContactPhone")}
                  error={
                    errors?.emergencyContactPhone?.message
                      ? t(errors?.emergencyContactPhone?.message)
                      : ""
                  }
                />
              </FormGroup>
              <FormGroup
                title={t("form-work-permit")}
                className="px-5 pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-10">
                <Input
                  label={t("form-visa-no")}
                  placeholder={t("form-visa-no")}
                  {...register("visaNo")}
                  error={
                    errors?.visaNo?.message ? t(errors?.visaNo?.message) : ""
                  }
                />
                {/* <Input
                  type="date"
                  label={t("form-visa-expire-date")}
                  placeholder={t("form-visa-expire-date")}
                  {...register("visaExpireDate")}
                /> */}
                <Controller
                  name="visaExpireDate"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <DatePicker
                      inputProps={{
                        label: t("form-visa-expire-date"),
                        clearable: true,
                      }}
                      placeholderText={t("form-visa-expire-date")}
                      value={value ? new Date(value) : null}
                      onChange={(date: any) => {
                        const formattedDate = date
                          ? dayjs(date).format("YYYY-MM-DD")
                          : null
                        onChange(formattedDate)
                      }}
                      popperPlacement="bottom-end"
                    />
                  )}
                />
                <Input
                  label={t("form-work-permit-no")}
                  placeholder={t("form-work-permit-no")}
                  {...register("workPermitNo")}
                  error={
                    errors?.workPermitNo?.message
                      ? t(errors?.workPermitNo?.message)
                      : ""
                  }
                />

                <Controller
                  name="workPermitExpireDate"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <DatePicker
                      inputProps={{
                        label: t("form-work-permit-expire-date"),
                        clearable: true,
                      }}
                      placeholderText={t("form-work-permit-expire-date")}
                      value={value ? new Date(value) : null}
                      onChange={(date: any) => {
                        const formattedDate = date
                          ? dayjs(date).format("YYYY-MM-DD")
                          : null
                        onChange(formattedDate)
                      }}
                      popperPlacement="bottom-end"
                    />
                  )}
                />
                {/* File Upload */}
              </FormGroup>
              <FormGroup
                title={t("form-citizenship")}
                className="px-5 pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-10">
                <Input
                  label={t("form-nationality")}
                  placeholder={t("form-nationality")}
                  {...register("nationality")}
                  error={
                    errors?.nationality?.message
                      ? t(errors?.nationality?.message)
                      : ""
                  }
                />
                <Input
                  label={t("form-nid-no")}
                  placeholder={t("form-nid-no")}
                  {...register("nidNo")}
                />
                <Controller
                  name="gender"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      label={t("form-gender")}
                      placeholder={t("form-gender")}
                      options={genderOptions}
                      onChange={(selectedOption: any) => {
                        onChange(selectedOption?.value)
                      }}
                      value={
                        genderOptions.find(
                          (option) => option.value === value
                        ) || null
                      }
                      error={
                        errors?.gender?.message
                          ? t(errors?.gender?.message)
                          : ""
                      }
                    />
                  )}
                />
                <Input
                  label={t("form-ssn")}
                  placeholder={t("form-ssn")}
                  {...register("ssn")}
                />
                <Input
                  label={t("form-passport-no")}
                  placeholder={t("form-passport-no")}
                  {...register("passportNo")}
                />

                <Controller
                  name="dateOfBirth"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <DatePicker
                      inputProps={{
                        label: t("form-date-of-birth"),
                        clearable: true,
                      }}
                      placeholderText={t("form-date-of-birth")}
                      value={value ? new Date(value) : null}
                      onChange={(date: any) => {
                        const formattedDate = date
                          ? dayjs(date).format("YYYY-MM-DD")
                          : null
                        onChange(formattedDate)
                      }}
                      popperPlacement="bottom-end"
                      maxDate={new Date()}
                    />
                  )}
                />
                <Input
                  label={t("form-place-of-birth")}
                  placeholder={t("form-place-of-birth")}
                  {...register("placeOfBirth")}
                />
                <Input
                  label={t("form-country-of-birth")}
                  placeholder={t("form-country-of-birth")}
                  {...register("countryOfBirth")}
                />
              </FormGroup>
            </FormGroupContainer>
            <EmployeeFormStickyActions
              isEditForm={temporaryEmployeeId && privateInfo?.id ? true : false}
              isLoading={isUpdatePending || isCreatePending}
            />
          </>
        )
      }}
    </Form>
  )
}

export default PrivateInformation
