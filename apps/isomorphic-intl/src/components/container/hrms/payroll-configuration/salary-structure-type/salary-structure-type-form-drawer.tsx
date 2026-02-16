"use client"

import { useEffect, useState } from "react"

import { Form } from "@core/ui/form"
import SimpleBar from "@core/ui/simplebar"
import { useTranslations } from "next-intl"
import { Controller } from "react-hook-form"

import DrawerFormActions from "@/components/base/drawer-form-actions"
import DrawerHeader from "@/components/base/drawer-header"
import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import { Input, Select } from "@/components/ui"
import { DEFAULT_PAGE_SIZE_200 } from "@/config/constants"
import {
  useCreateSalaryStructureType,
  useUpdateSalaryStructureType,
} from "@/hooks/hrms/payroll-configuration/use-salary-structure-type"
import { useCountryList } from "@/hooks/use-countries"
import { useSelectOptions } from "@/hooks/use-select-options"
import { CountryList } from "@/modules/fms/types"
import { SalaryStructureType } from "@/types/hrms/payroll-configuration/salary-structure-type.types"
import {
  SalaryStructureTypeFormInput,
  salaryStructureTypeFormSchema,
} from "@/validators/hrms/salary-structure-type-form-schema"

const defaultSalaryStructureTypeFormValues: SalaryStructureType = {
  salaryStructureTypeName: "",
  country: "",
}

type SalaryStructureTypeFormDrawerViewProps = {
  isEditForm?: boolean
  initialData?: any
} & (
  | { isEditForm: true; initialData: SalaryStructureTypeFormInput }
  | { isEditForm?: false; initialData?: SalaryStructureTypeFormInput }
)

const SalaryStructureTypeFormDrawerView: React.FC<
  SalaryStructureTypeFormDrawerViewProps
> = ({ isEditForm = false, initialData }) => {
  const [reset] = useState(initialData || {})
  const { closeDrawer } = useDrawer()
  const t = useTranslations("form")

  const { data: countryList, isLoading: isCountryLoading } = useCountryList({
    pageSize: DEFAULT_PAGE_SIZE_200,
  })
  const countryOptions = useSelectOptions<CountryList>(
    countryList?.data,
    "countryName"
  )

  const {
    mutate: createSalaryStructureType,
    isPending: isCreatePending,
    isSuccess: isCreateSuccess,
  } = useCreateSalaryStructureType()

  const {
    mutate: updateSalaryStructureType,
    isPending: isUpdatePending,
    isSuccess: isUpdateSuccess,
  } = useUpdateSalaryStructureType()

  const onSubmit = async (data: SalaryStructureType) => {
    if (isEditForm) {
      updateSalaryStructureType({ ...data, id: initialData?.id })
    } else {
      createSalaryStructureType(data)
    }
  }

  useEffect(() => {
    if (isCreateSuccess || isUpdateSuccess) {
      closeDrawer()
    }
  }, [isCreateSuccess, isUpdateSuccess])

  return (
    <div className="flex h-full flex-col">
      <DrawerHeader
        heading={
          isEditForm
            ? t("form-edit-salary-structure-type")
            : t("form-add-new-salary-structure-type")
        }
        onClose={closeDrawer}
        headerClassName="mb-0"
      />
      <Form<SalaryStructureTypeFormInput>
        validationSchema={salaryStructureTypeFormSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: initialData || defaultSalaryStructureTypeFormValues,
        }}
        className="flex grow flex-col">
        {({ register, control, formState: { errors } }) => (
          <>
            <SimpleBar className="h-0 grow">
              <div className="flex min-h-[800px] flex-col gap-4 px-5 py-6">
                <Input
                  label={t("form-name")}
                  placeholder={t("form-enter-name")}
                  {...register("salaryStructureTypeName")}
                  error={
                    errors?.salaryStructureTypeName?.message &&
                    t(errors?.salaryStructureTypeName?.message)
                  }
                />
                <Controller
                  name="country"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      label={t("form-country")}
                      placeholder={t("form-select-country")}
                      options={countryOptions}
                      value={
                        countryOptions.find(
                          (option) => option.label === value
                        ) || null
                      }
                      onChange={(option: any) => onChange(option?.label)}
                      isLoading={isCountryLoading}
                      error={
                        errors?.country?.message &&
                        t(errors?.country?.message as string)
                      }
                    />
                  )}
                />
              </div>
            </SimpleBar>
            <DrawerFormActions
              isLoading={isCreatePending || isUpdatePending}
              isEditForm={isEditForm}
              handleCloseDrawer={closeDrawer}
            />
          </>
        )}
      </Form>
    </div>
  )
}

export default SalaryStructureTypeFormDrawerView
