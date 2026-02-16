"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

import { Form } from "@core/ui/form"
import { useTranslations } from "next-intl"
import { Controller, SubmitHandler } from "react-hook-form"
import toast from "react-hot-toast"

import FormFooter from "@/components/base/form-footer"
import FormGroup from "@/components/base/form-group"
import FormGroupContainer from "@/components/base/form-group-container"
import { Input, Select, Textarea } from "@/components/ui"
import Box from "@/components/ui/box"
import { DEFAULT_PAGE_SIZE_200 } from "@/config/constants"
import { routes } from "@/config/routes"
import {
  useCreateWorkAddress,
  useUpdateWorkAddress,
} from "@/hooks/hrms/employee/use-work-address"
import { useCountryList } from "@/hooks/use-countries"
import { useSelectOptions } from "@/hooks/use-select-options"
import { useCompanyList } from "@/modules/fms/hooks/use-company"
import { CompanyList, CountryList } from "@/modules/fms/types"
import { WorkAddress } from "@/types/hrms/employee/work-address.types"
import { cn } from "@/utils/cn"
import {
  WorkAddressFormInputType,
  workAddressFormSchema,
} from "@/validators/hrms/work-address.schema"

type WorkAddressFormViewProps = {
  mode: "create" | "edit" | "view"
  initialData?: WorkAddressFormInputType
}

const defaultValues = {
  companyName: "",
  workingAddressName: "",
  addressLine: "",
  city: "",
  country: "",
  state: "",
  zip: "",
  taxID: 0,
  industry: "",
  phone: "",
  email: "",
  website: "",
  internalNotes: "",
}

const WorkAddressFormView = ({
  mode,
  initialData,
}: WorkAddressFormViewProps) => {
  const t = useTranslations("form")
  const router = useRouter()

  const {
    mutateAsync: updateWorkAddress,
    isPending: isUpdatePending,
    isSuccess: updateSuccess,
  } = useUpdateWorkAddress()
  const {
    mutateAsync: createWorkAddress,
    isPending: isCreatePending,
    isSuccess: createSuccess,
  } = useCreateWorkAddress()

  const onSubmit: SubmitHandler<WorkAddress> = async (data) => {
    if (data?.taxID && data?.taxID > 999999999) {
      toast.error("Tax ID must be 9 digits")
      return
    }
    if (mode === "edit" && initialData?.id) {
      await updateWorkAddress({ data })
    } else if (mode === "create") {
      await createWorkAddress({ ...data })
    }
  }

  const handleBack = () => {
    router.push(routes.hr.workingAddress)
  }

  useEffect(() => {
    if (createSuccess || updateSuccess) {
      handleBack()
    }
  }, [createSuccess, updateSuccess])

  const { data: countryList, isLoading: isCountryLoading } = useCountryList({
    pageSize: DEFAULT_PAGE_SIZE_200,
  })
  const countryOptions = useSelectOptions<CountryList>(
    countryList?.data,
    "countryName"
  )

  console.log("countryOptions", countryOptions)
  console.log("countryList", countryList)

  const { data: companyList, isLoading: isCompanyLoading } = useCompanyList()
  const companyOptions = useSelectOptions<CompanyList>(
    companyList?.data,
    "companyName"
  )

  return (
    <Box>
      <Form<WorkAddressFormInputType>
        validationSchema={workAddressFormSchema}
        onSubmit={onSubmit}
        className="flex grow flex-col justify-between pt-7 @container"
        useFormProps={{
          defaultValues: initialData ? initialData : defaultValues,
          values: initialData,
        }}>
        {({ register, control, setValue, formState: { errors } }) => {
          return (
            <>
              <FormGroupContainer>
                <FormGroup title={t("form-work-address-information")}>
                  <Input
                    {...register("workingAddressName")}
                    label={t("form-work-address-name")}
                    placeholder={t("from-enter-work-address-name")}
                    error={
                      errors.workingAddressName?.message
                        ? t(errors.workingAddressName?.message)
                        : ""
                    }
                    disabled={mode === "view"}
                  />
                  <Input
                    {...register("addressLine")}
                    label={t("form-address-line")}
                    placeholder={t("form-enter-address-line")}
                    error={
                      errors.addressLine?.message
                        ? t(errors.addressLine?.message)
                        : ""
                    }
                    disabled={mode === "view"}
                  />
                  <Input
                    {...register("city")}
                    label={t("form-city")}
                    placeholder={t("form-enter-city")}
                    error={errors.city?.message ? t(errors.city?.message) : ""}
                    disabled={mode === "view"}
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
                          ) || null
                        }
                        isLoading={isCountryLoading}
                        isDisabled={mode === "view"}
                      />
                    )}
                  />

                  <Input
                    {...register("state")}
                    label={t("form-state")}
                    placeholder={t("form-enter-state")}
                    error={
                      errors.state?.message ? t(errors.state?.message) : ""
                    }
                    disabled={mode === "view"}
                  />

                  <Input
                    {...register("zip")}
                    label={t("form-zip")}
                    placeholder={t("form-enter-zip")}
                    error={errors.zip?.message ? t(errors.zip?.message) : ""}
                    disabled={mode === "view"}
                  />

                  <Input
                    type="number"
                    {...register("taxID", {
                      valueAsNumber: true,
                      maxLength: 12,
                    })}
                    label={t("form-tax-id")}
                    placeholder={t("form-enter-tax-id")}
                    error={
                      errors.taxID?.message ? t(errors.taxID?.message) : ""
                    }
                    disabled={mode === "view"}
                  />

                  <Controller
                    name="companyName"
                    control={control}
                    render={({ field: { onChange, value } }) => {
                      return (
                        <Select
                          label={t("form-company-name")}
                          placeholder={t("form-company-name")}
                          options={companyOptions}
                          onChange={(selectedOption: any) => {
                            onChange(selectedOption?.label)

                            setValue("companyId", selectedOption?.value)
                          }}
                          value={
                            companyOptions.find(
                              (option) => option.label === value
                            ) || null
                          }
                          isLoading={isCompanyLoading}
                          error={
                            errors?.companyName?.message
                              ? t(errors?.companyName?.message)
                              : ""
                          }
                          isDisabled={mode === "view"}
                        />
                      )
                    }}
                  />

                  <Input
                    {...register("industry")}
                    label={t("form-industry")}
                    placeholder={t("form-enter-industry")}
                    error={
                      errors.industry?.message
                        ? t(errors.industry?.message)
                        : ""
                    }
                    disabled={mode === "view"}
                  />

                  <Input
                    {...register("phone")}
                    label={t("form-phone")}
                    placeholder={t("form-enter-phone")}
                    error={
                      errors.phone?.message ? t(errors.phone?.message) : ""
                    }
                    disabled={mode === "view"}
                  />

                  <Input
                    {...register("email")}
                    label={t("form-email")}
                    placeholder={t("form-enter-email")}
                    error={
                      errors.email?.message ? t(errors.email?.message) : ""
                    }
                    disabled={mode === "view"}
                  />

                  <Input
                    {...register("website")}
                    label={t("form-website")}
                    placeholder={t("form-enter-website")}
                    error={
                      errors.website?.message ? t(errors.website?.message) : ""
                    }
                    disabled={mode === "view"}
                  />

                  <Textarea
                    label={t("form-internal-notes")}
                    placeholder={t("form-enter-internal-notes")}
                    {...register("internalNotes")}
                    error={
                      errors.internalNotes?.message
                        ? t(errors.internalNotes?.message)
                        : ""
                    }
                    disabled={mode === "view"}
                  />
                </FormGroup>
              </FormGroupContainer>

              <FormFooter
                isLoading={isUpdatePending || isCreatePending}
                submitBtnText={
                  initialData?.id ? t("form-update") : t("form-submit")
                }
                altBtnText={t("form-back")}
                handleAltBtn={() => router.push(routes.hr.employeeContracts)}
                className={cn({ hidden: mode === "view" })}
              />
            </>
          )
        }}
      </Form>
    </Box>
  )
}

export default WorkAddressFormView
