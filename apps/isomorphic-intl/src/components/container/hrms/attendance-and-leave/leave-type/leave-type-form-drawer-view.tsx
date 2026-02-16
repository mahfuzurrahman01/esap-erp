"use client"

import { Form } from "@core/ui/form"
import SimpleBar from "@core/ui/simplebar"
import { useTranslations } from "next-intl"

import DrawerFormActions from "@/components/base/drawer-form-actions"
import DrawerHeader from "@/components/base/drawer-header"
import { useLeaveTypeForm } from "@/components/container/hrms/attendance-and-leave/leave-type/use-leave-type-form"
import { Input, Textarea } from "@/components/ui"
import { LeaveType } from "@/types/hrms/attendance-and-leave/leave-type.types"
import {
  LeaveTypeFormInput,
  leaveTypeFormSchema,
} from "@/validators/hrms/leave-type-form.schema"

type LeaveTypeFormDrawerViewProps = {
  isEditForm?: boolean
  initialData?: any
} & (
  | { isEditForm: true; initialData: LeaveTypeFormInput }
  | { isEditForm?: false; initialData?: LeaveTypeFormInput }
)

const LeaveTypeFormDrawerView: React.FC<LeaveTypeFormDrawerViewProps> = ({
  isEditForm = false,
  initialData,
}) => {
  const t = useTranslations("form")

  const { onSubmit, isLoading, handleCloseDrawer } = useLeaveTypeForm(
    isEditForm,
    initialData?.id
  )

  return (
    <div className="flex h-full flex-col">
      <DrawerHeader
        heading={
          isEditForm ? t("form-edit-leave-type") : t("form-add-leave-type")
        }
        onClose={handleCloseDrawer}
        headerClassName="mb-0"
      />
      <Form<LeaveType>
        validationSchema={leaveTypeFormSchema}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: initialData,
        }}
        className="flex grow flex-col">
        {({ register, control, formState: { errors } }) => (
          <>
            <SimpleBar className="h-0 grow">
              <LeaveTypeForm
                control={control}
                register={register}
                errors={errors}
              />
            </SimpleBar>
            <DrawerFormActions
              handleCloseDrawer={handleCloseDrawer}
              isLoading={isLoading}
              isEditForm={isEditForm}
            />
          </>
        )}
      </Form>
    </div>
  )
}

export default LeaveTypeFormDrawerView

export function LeaveTypeForm({ register, errors }: any) {
  const t = useTranslations("form")

  return (
    <div className="flex h-[100vh] flex-col gap-4 px-5 py-6">
      <Input
        type="text"
        label={t("form-name")}
        {...register("leaveTypeName")}
        error={
          errors?.leaveTypeName?.message ? errors?.leaveTypeName?.message : ""
        }
      />
      <Textarea label={t("form-description")} {...register("description")} />
    </div>
  )
}
