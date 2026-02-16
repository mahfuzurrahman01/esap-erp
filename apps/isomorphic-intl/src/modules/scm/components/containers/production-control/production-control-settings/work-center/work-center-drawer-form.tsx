"use client"

import { Form } from "@core/ui/form"
import SimpleBar from "@core/ui/simplebar"
import { useTranslations } from "next-intl"

import DrawerFormActions from "@/components/base/drawer-form-actions"
import DrawerHeader from "@/components/base/drawer-header"
import { Input } from "@/components/ui"
import { messages } from "@/config/messages"
import { WorkCenter } from "@/modules/scm/types/production-control/work-order-tracking/work-center-types"
import { WorkCenterSchema } from "@/modules/scm/validators/production-control/work-order-tracking/work-center.schema"

import { useWorkCenterForm } from "./use-work-center-form"

type WorkCenterFormDrawerViewProps = {
  isEditForm?: boolean
  initialData?: WorkCenter
} & (
  | { isEditForm: true; initialData: WorkCenter }
  | { isEditForm?: false; initialData?: WorkCenter }
)

const WorkCenterFormDrawerView = ({
  isEditForm = false,
  initialData,
}: WorkCenterFormDrawerViewProps) => {
  const t = useTranslations("form")

  const { isLoading, onSubmit, handleCloseDrawer } = useWorkCenterForm(
    isEditForm,
    initialData?.id
  )

  const defaultValues = {
    workCenterName: "",
    location: "",
    capacity: 0,
  }

  return (
    <div className="flex h-full flex-col">
      <DrawerHeader
        heading={
          isEditForm ? t(messages.editWorkCenter) : t(messages.addNewWorkCenter)
        }
        onClose={handleCloseDrawer}
        headerClassName="mb-0"
      />
      <Form<WorkCenter>
        validationSchema={WorkCenterSchema}
        onSubmit={onSubmit}
        useFormProps={{
          mode: "onChange",
          reValidateMode: "onChange",
          values: initialData,
          defaultValues: initialData ? initialData : defaultValues,
        }}
        className="flex grow flex-col">
        {({ register, formState: { errors } }) => (
          <>
            <SimpleBar className="h-0 grow">
              <WorkCenterForm register={register} errors={errors} />
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

export const WorkCenterForm = ({ register, errors }: any) => {
  const t = useTranslations("form")
  return (
    <div className="flex flex-col gap-4 px-5 py-6">
      <Input
        type="text"
        isRequired
        label={t("form-work-center-name")}
        placeholder={t("form-work-center-name")}
        labelClassName="text-sm font-medium text-gray-900"
        {...register("workCenterName")}
        error={
          errors?.workCenterName?.message
            ? t(errors?.workCenterName?.message)
            : ""
        }
      />
      <Input
        type="text"
        isRequired
        label={t("form-location")}
        placeholder={t("form-location")}
        labelClassName="text-sm font-medium text-gray-900"
        {...register("location")}
        error={errors?.location?.message ? t(errors?.location?.message) : ""}
      />
      <Input
        type="number"
        isRequired
        label={t("form-capacity")}
        placeholder={t("form-capacity")}
        labelClassName="text-sm font-medium text-gray-900"
        {...register("capacity", { valueAsNumber: true })}
        error={errors?.capacity?.message ? t(errors?.capacity?.message) : ""}
      />
    </div>
  )
}

export default WorkCenterFormDrawerView
