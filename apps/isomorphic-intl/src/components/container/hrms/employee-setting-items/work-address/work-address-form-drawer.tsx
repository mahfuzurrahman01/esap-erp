"use client"

import { useEffect } from "react"

import { Form } from "@core/ui/form"
import SimpleBar from "@core/ui/simplebar"
import { useTranslations } from "next-intl"
import { Controller, SubmitHandler } from "react-hook-form"

import DrawerFormActions from "@/components/base/drawer-form-actions"
import DrawerHeader from "@/components/base/drawer-header"
import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import { Input, Select, Textarea } from "@/components/ui"
import {
  useCreateWorkAddress,
  useUpdateWorkAddress,
} from "@/hooks/hrms/employee/use-work-address"
import { useCountryList } from "@/hooks/use-countries"
import { useSelectOptions } from "@/hooks/use-select-options"
import { useCompanyList } from "@/modules/fms/hooks/use-company"
import { CompanyList, CountryList } from "@/modules/fms/types"
import { WorkAddress } from "@/types/hrms/employee/work-address.types"
import {
  WorkAddressFormInputType,
  workAddressFormSchema,
} from "@/validators/hrms/work-address.schema"

type WorkAddressFormDrawerViewProps = {
  isEditForm?: boolean
  initialData?: WorkAddressFormInputType
} & (
    | { isEditForm: true; initialData: WorkAddressFormInputType }
    | { isEditForm?: false; initialData?: WorkAddressFormInputType }
  )

const defaultValues = {
  companyName: "",
}

const WorkAddressFormDrawerView = ({
  isEditForm = false,
  initialData,
}: WorkAddressFormDrawerViewProps) => {
  const t = useTranslations("form")
  const { closeDrawer } = useDrawer()
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
    if (data && initialData?.id) {
      await updateWorkAddress({ data })
    } else {
      // await createEmployee(data)
      await createWorkAddress({ ...data })
    }
  }

  const handleCloseDrawer = () => {
    closeDrawer()
  }

  //console.log(initialData)

  useEffect(() => {
    if (createSuccess || updateSuccess) {
      closeDrawer()
    }
  }, [createSuccess, updateSuccess])

  return (
    <div className="flex h-full flex-col">
      <DrawerHeader
        heading={
          isEditForm
            ? t("form-edit-work-address")
            : t("form-add-new-work-address")
        }
        onClose={handleCloseDrawer}
        headerClassName="mb-0"
      />
      <SimpleBar className="h-0 grow">
        <Form<WorkAddressFormInputType>
          validationSchema={workAddressFormSchema}
          onSubmit={onSubmit}
          useFormProps={{
            defaultValues: initialData || defaultValues,
          }}>
          {({ register, control, formState: { errors }, setValue }) => (
            <>
              <WorkAddressForm
                register={register}
                errors={errors}
                control={control}
                setValue={setValue}
              />
              <DrawerFormActions
                handleCloseDrawer={handleCloseDrawer}
                isLoading={isCreatePending || isUpdatePending}
                isEditForm={isEditForm}
              />
            </>
          )}
        </Form>
      </SimpleBar>
    </div>
  )
}

export const WorkAddressForm = ({
  register,
  errors,
  control,
  setValue,
}: any) => {
  const t = useTranslations("form")

  const { data: countryList, isLoading: isCountryLoading } = useCountryList()
  const countryOptions = useSelectOptions<CountryList>(
    countryList?.data,
    "countryName"
  )
  const { data: companyList, isLoading: isCompanyLoading } = useCompanyList()
  const companyOptions = useSelectOptions<CompanyList>(
    companyList?.data,
    "companyName"
  )

  return (
    <div className="flex h-full flex-col gap-4 overflow-y-auto border-body/20 px-5 pb-6 pt-6">
      <Input
        type="text"
        label={t("form-name")}
        {...register("workingAddressName")}
        error={
          errors?.workingAddressName?.message
            ? t(errors?.workingAddressName?.message)
            : ""
        }
      />
      <Input
        type="text"
        label={t("form-address-line")}
        {...register("addressLine")}
        error={
          errors?.addressLine?.message ? t(errors?.addressLine?.message) : ""
        }
      />
      <Input
        type="text"
        label={t("form-city")}
        {...register("city")}
        error={errors?.city?.message ? t(errors?.city?.message) : ""}
      />
      {/* <Input
        type="text"
        label={t("form-country")}
        {...register("country")}
        error={errors?.country?.message ? t(errors?.country?.message) : ""}
      /> */}
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
              countryOptions.find((option) => option.label === value) || null // Set to null if no match found
            }
            isLoading={isCountryLoading}
          />
        )}
      />
      <Input
        type="text"
        label={t("form-state")}
        {...register("state")}
        error={errors?.state?.message ? t(errors?.state?.message) : ""}
      />
      <Input
        type="text"
        label={t("form-zip")}
        {...register("zip")}
        error={errors?.zip?.message ? t(errors?.zip?.message) : ""}
      />
      <Input
        type="number"
        label={t("form-tax-id")}
        {...register("taxID", { valueAsNumber: true })}
        error={errors?.taxID?.message ? t("form-taxId-required") : ""}
      />
      {/* <Input
        type="text"
        label={t("form-company-name")}
        {...register("companyName")}
        error={
          errors?.companyName?.message ? t(errors?.companyName?.message) : ""
        }
      /> */}
      <Controller
        name="companyName"
        control={control}
        render={({ field: { onChange, value } }) => {
          //console.log("company valule", value)
          //console.log("company options", companyOptions)
          return (
            <Select
              label={t("form-company-name")}
              placeholder={t("form-company-name")}
              options={companyOptions}
              onChange={(selectedOption: any) => {
                onChange(selectedOption?.label)
                //console.log("selectedOption", selectedOption.value)
                setValue("companyId", selectedOption?.value)
              }}
              value={
                companyOptions.find((option) => option.label === value) || null // Set to null if no match found
              }
              isLoading={isCompanyLoading}
              error={
                errors?.companyName?.message
                  ? t(errors?.companyName?.message)
                  : ""
              }
            />
          )
        }}
      />
      <Input
        type="text"
        label={t("form-industry")}
        {...register("industry")}
        error={errors?.industry?.message ? t(errors?.industry?.message) : ""}
      />
      <Input
        type="tel"
        label={t("form-phone")}
        {...register("phone")}
        error={errors?.phone?.message ? t(errors?.phone?.message) : ""}
      />
      <Input
        type="email"
        label={t("form-email")}
        {...register("email")}
        error={errors?.email?.message ? t(errors?.email?.message) : ""}
      />
      <Input
        type="url"
        label={t("form-website")}
        {...register("website")}
        error={errors?.website?.message ? t(errors?.website?.message) : ""}
      />
      <Textarea
        label={t("form-internal-notes")}
        {...register("internalNotes")}
        error={
          errors?.internalNotes?.message
            ? t(errors?.internalNotes?.message)
            : ""
        }
      />
    </div>
  )
}

export default WorkAddressFormDrawerView
