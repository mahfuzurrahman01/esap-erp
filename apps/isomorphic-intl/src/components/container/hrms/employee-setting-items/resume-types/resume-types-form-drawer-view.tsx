"use client"

import { useEffect } from "react"

import { Form } from "@core/ui/form"
import SimpleBar from "@core/ui/simplebar"
import { useTranslations } from "next-intl"
import { SubmitHandler } from "react-hook-form"

import DrawerFormActions from "@/components/base/drawer-form-actions"
import DrawerHeader from "@/components/base/drawer-header"
import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import { Input } from "@/components/ui"
import {
  useCreateResumeType,
  useUpdateResumeType,
} from "@/hooks/hrms/employee/use-resume-type"
import { ResumeType } from "@/types/hrms/employee/resume-types.types"
import {
  ResumeTypeFormInput,
  resumeTypeFormSchema,
} from "@/validators/hrms/resume-types.schema"

type ResumeTypesFormDrawerViewProps = {
  isEditForm?: boolean
  initialData?: ResumeTypeFormInput
} & (
  | { isEditForm: true; initialData: ResumeTypeFormInput }
  | { isEditForm?: false; initialData?: ResumeTypeFormInput }
)

const ResumeTypesFormDrawerView = ({
  isEditForm = false,
  initialData,
}: ResumeTypesFormDrawerViewProps) => {
  const t = useTranslations("form")
  const { closeDrawer } = useDrawer()
  const {
    mutateAsync: createResumeType,
    isPending: isCreatePending,
    isSuccess: createSuccess,
  } = useCreateResumeType()
  const {
    mutateAsync: updateResumeType,
    isPending: isUpdatePending,
    isSuccess: updateSuccess,
  } = useUpdateResumeType()

  const onSubmit: SubmitHandler<ResumeType> = (data) => {
    if (isEditForm && initialData?.id) {
      updateResumeType({ data })
    } else {
      createResumeType(data)
    }
  }

  useEffect(() => {
    if (createSuccess || updateSuccess) {
      closeDrawer()
    }
  }, [createSuccess, updateSuccess])

  const handleCloseDrawer = () => {
    closeDrawer()
  }

  return (
    <div className="flex h-full flex-col">
      <DrawerHeader
        headerClassName="mb-0"
        heading={
          isEditForm
            ? t("form-edit-resume-type")
            : t("form-add-new-resume-type")
        }
        onClose={handleCloseDrawer}
      />
      <Form<ResumeTypeFormInput>
        validationSchema={resumeTypeFormSchema}
        onSubmit={onSubmit}
        className="flex grow flex-col"
        useFormProps={{
          mode: "onChange",
          defaultValues: initialData,
        }}>
        {({ register, formState: { errors } }) => (
          <>
            <SimpleBar className="h-0 grow">
              <ResumeTypeForm register={register} errors={errors} />
            </SimpleBar>
            <DrawerFormActions
              handleCloseDrawer={handleCloseDrawer}
              isEditForm={isEditForm}
              isLoading={isCreatePending || isUpdatePending}
            />
          </>
        )}
      </Form>
    </div>
  )
}

export const ResumeTypeForm = ({ register, errors }: any) => {
  const t = useTranslations("form")
  return (
    <div className="flex h-[100vh] flex-col gap-4 px-5 py-6">
      <Input
        type="text"
        label={t("form-name")}
        placeholder={t("form-name")}
        {...register("resumeTypeName")}
        error={
          errors?.resumeTypeName?.message
            ? t(errors?.resumeTypeName?.message)
            : ""
        }
      />
    </div>
  )
}

export default ResumeTypesFormDrawerView
