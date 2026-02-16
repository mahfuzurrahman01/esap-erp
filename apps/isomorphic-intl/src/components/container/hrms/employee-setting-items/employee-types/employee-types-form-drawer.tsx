"use client"

import { Form } from "@core/ui/form"
import SimpleBar from "@core/ui/simplebar"
import { useTranslations } from "next-intl"

import DrawerFormActions from "@/components/base/drawer-form-actions"
import DrawerHeader from "@/components/base/drawer-header"
import { useEmployeeTypeForm } from "@/components/container/hrms/employee-setting-items/employee-types/use-employee-type-form"
import { Input } from "@/components/ui"
import { messages } from "@/config/messages"
import { EmployeeType } from "@/types/hrms/employee/employee-types.types"
import {
  EmployeeTypeFormInput,
  employeeTypeFormSchema,
} from "@/validators/hrms/employee-types.schema"

type EmployeeTypesFormDrawerViewProps = {
  isEditForm?: boolean
  initialData?: EmployeeTypeFormInput
} & (
  | { isEditForm: true; initialData: EmployeeTypeFormInput }
  | { isEditForm?: false; initialData?: EmployeeTypeFormInput }
)

const EmployeeTypesFormDrawerView = ({
  isEditForm = false,
  initialData,
}: EmployeeTypesFormDrawerViewProps) => {
  const t = useTranslations("form")

  const { isLoading, onSubmit, handleCloseDrawer } = useEmployeeTypeForm(
    isEditForm,
    initialData?.id
  )

  return (
    <div className="flex h-full flex-col">
      <DrawerHeader
        heading={
          isEditForm
            ? t(messages.editEmployeeType)
            : t(messages.addNewEmployeeType)
        }
        onClose={handleCloseDrawer}
        headerClassName="mb-0"
      />
      <Form<EmployeeType>
        validationSchema={employeeTypeFormSchema}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: initialData,
        }}
        className="flex grow flex-col">
        {({ register, formState: { errors } }) => (
          <>
            <SimpleBar className="h-0 grow">
              <EmployeeTypeForm register={register} errors={errors} />
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

export const EmployeeTypeForm = ({ register, errors }: any) => {
  const t = useTranslations("form")
  return (
    <div className="flex h-[100vh] flex-col gap-4 px-5 py-6">
      <Input
        type="text"
        label={t("form-name")}
        placeholder={t("form-name")}
        labelClassName="text-sm font-medium text-gray-900"
        {...register("employeeTypeName")}
        error={
          errors?.employeeTypeName?.message
            ? t(errors?.employeeTypeName?.message)
            : ""
        }
      />
    </div>
  )
}

export default EmployeeTypesFormDrawerView
