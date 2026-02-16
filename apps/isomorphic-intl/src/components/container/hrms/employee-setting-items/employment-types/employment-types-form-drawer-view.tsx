"use client"

import { useEffect } from "react"

import { Form } from "@core/ui/form"
import SimpleBar from "@core/ui/simplebar"
import { useTranslations } from "next-intl"

import DrawerFormActions from "@/components/base/drawer-form-actions"
import DrawerHeader from "@/components/base/drawer-header"
import { useEmploymentTypesForm } from "@/components/container/hrms/employee-setting-items/employment-types/use-employment-types-form"
import { Input } from "@/components/ui"
import { FormDefaultProps } from "@/types/hrms/common.types"
import { EmploymentType } from "@/types/hrms/employee/employment-types.types"
import {
  EmploymentPostFormInput,
  employmentTypeFormSchema,
} from "@/validators/hrms/employment-types.schema"

type EmploymentTypesFormDrawerViewProps =
  FormDefaultProps<EmploymentPostFormInput>

const EmploymentTypesFormDrawerView = ({
  isEditForm = false,
  initialData,
}: EmploymentTypesFormDrawerViewProps) => {
  const t = useTranslations("form")

  const { handleCloseDrawer, onSubmit, isLoading, createError, updateError } =
    useEmploymentTypesForm(isEditForm, initialData?.id)

  useEffect(() => {
    if (createError || updateError) {
      handleCloseDrawer()
    }
  }, [createError, updateError])

  return (
    <div className="flex h-full flex-col">
      <DrawerHeader
        heading={
          isEditForm
            ? t("form-edit-employment-type")
            : t("form-add-new-employment-type")
        }
        onClose={handleCloseDrawer}
        headerClassName="mb-0"
      />
      <Form<EmploymentType>
        validationSchema={employmentTypeFormSchema}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: initialData,
        }}
        className="flex grow flex-col">
        {({ register, formState: { errors } }) => (
          <>
            <SimpleBar className="h-0 grow">
              <EmploymentTypeForm register={register} errors={errors} />
            </SimpleBar>
            <DrawerFormActions
              handleCloseDrawer={handleCloseDrawer}
              isEditForm={isEditForm}
              isLoading={isLoading}
            />
          </>
        )}
      </Form>
    </div>
  )
}

export const EmploymentTypeForm = ({ register, errors }: any) => {
  const t = useTranslations("form")
  return (
    <div className="flex h-[100vh] flex-col gap-4 px-5 py-6">
      <Input
        type="text"
        label={t("form-name")}
        placeholder={t("form-name")}
        labelClassName="text-sm font-medium text-gray-900"
        {...register("employmentTypeName")}
        error={
          errors?.employmentTypeName?.message
            ? t(errors?.employmentTypeName?.message)
            : ""
        }
      />
    </div>
  )
}

export default EmploymentTypesFormDrawerView
