"use client"

import { Form } from "@core/ui/form"
import SimpleBar from "@core/ui/simplebar"
import { useTranslations } from "next-intl"

import DrawerFormActions from "@/components/base/drawer-form-actions"
import DrawerHeader from "@/components/base/drawer-header"
import { Input, Textarea } from "@/components/ui"
import {
  JobPositionFormInput,
  jobPositionFormSchema,
} from "@/validators/hrms/job-positions.schema"

import { useJobPositionForm } from "./use-job-position-form"

type JobPositionsFormDrawerViewProps = {
  isEditForm?: boolean
  initialData?: any
} & (
  | { isEditForm: true; initialData: JobPositionFormInput }
  | { isEditForm?: false; initialData?: JobPositionFormInput }
)

const JobPositionsFormDrawerView: React.FC<JobPositionsFormDrawerViewProps> = ({
  isEditForm = false,
  initialData,
}) => {
  const t = useTranslations("form")

  const { onSubmit, isLoading, handleCloseDrawer } = useJobPositionForm(
    isEditForm,
    initialData?.id
  )

  return (
    <div className="flex h-full flex-col">
      <DrawerHeader
        heading={
          isEditForm
            ? t("form-edit-job-position")
            : t("form-add-new-job-position")
        }
        onClose={handleCloseDrawer}
        headerClassName="mb-0"
      />
      <Form<JobPositionFormInput>
        validationSchema={jobPositionFormSchema}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: initialData,
        }}
        className="flex grow flex-col">
        {({ register, control, formState: { errors } }) => (
          <>
            <SimpleBar className="h-0 grow">
              <JobPositionForm
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

export function JobPositionForm({ register, errors }: any) {
  const t = useTranslations("form")

  return (
    <div className="flex h-[100vh] flex-col gap-4 px-5 py-6">
      <Input
        type="text"
        label={t("form-job-position-name")}
        placeholder={t("form-enter-job-position-name")}
        labelClassName="text-sm font-medium text-gray-900"
        {...register("jobPositionName")}
        error={
          errors?.jobPositionName?.message
            ? t(errors?.jobPositionName?.message)
            : ""
        }
      />
      <Textarea
        label={t("form-description")}
        placeholder={t("form-enter-description")}
        {...register("description")}
      />
    </div>
  )
}

export default JobPositionsFormDrawerView
