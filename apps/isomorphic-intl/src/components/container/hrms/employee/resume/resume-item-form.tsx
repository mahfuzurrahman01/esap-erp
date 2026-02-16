"use client"

import { useParams } from "next/navigation"

import { Form } from "@core/ui/form"
import dayjs from "dayjs"
import { useTranslations } from "next-intl"
import { Controller, SubmitHandler } from "react-hook-form"

import { DatePicker } from "@/components/base/date-picker"
import { Button, Input, Select } from "@/components/ui"
import {
  useCreateResume,
  useDeleteResume,
  useUpdateResume,
} from "@/hooks/hrms/employee/use-resume"
import { useResumeTypeList } from "@/hooks/hrms/employee/use-resume-type"
import { useSelectOptions } from "@/hooks/use-select-options"
import { FormDefaultProps } from "@/types/hrms/common.types"
import { ResumeDetails } from "@/types/hrms/employee/employee.types"
import { ResumeType } from "@/types/hrms/employee/resume-types.types"
import {
  ResumeFormInputType,
  resumeSchema,
} from "@/validators/hrms/resume.schema"

type Props = FormDefaultProps<ResumeFormInputType>

const ResumeItemForm = ({ isEditForm, initialData }: Props) => {
  const t = useTranslations("form")
  const params = useParams()
  const temporaryEmployeeId = params.employeeId
  const initialDataWithDates = {
    ...initialData,
    startDate: "",
  }
  // const { resumeTypesOptions } = useResumeForm(initialData)
  const { data: resumeList, isLoading: isResumeListLoading } =
    useResumeTypeList()
  const resumeTypesOptions = useSelectOptions<ResumeType>(
    resumeList?.data,
    "resumeTypeName"
  )

  const { mutateAsync: createResume, isPending: isCreatePending } =
    useCreateResume()
  const { mutateAsync: updateResume, isPending: isUpdatePending } =
    useUpdateResume()
  const { mutateAsync: deleteResume, isPending: isDeletePending } =
    useDeleteResume()

  const onSubmit: SubmitHandler<ResumeDetails> = async (data) => {
    if (initialData?.id) {
      await updateResume({ data })
      isEditForm = false
    } else {
      // await createEmployee(data)
      await createResume({ ...data, employeeId: Number(temporaryEmployeeId) })
    }
  }
  // const onSubmit = async (data) => {
  //   //console.log(data)
  // }
  const onDelete = async (id: number) => {
    await deleteResume(id)
  }

  return (
    <Form<ResumeFormInputType>
      validationSchema={resumeSchema}
      onSubmit={onSubmit}
      className="col-span-full grid gap-4 border-b border-dashed border-gray-500/20 @2xl:grid-cols-2 @4xl:col-span-8 @4xl:gap-5 xl:gap-7"
      useFormProps={{
        mode: "onChange",
        defaultValues: initialDataWithDates,
        values: initialDataWithDates as ResumeFormInputType,
      }}>
      {({ register, control, formState: { errors, isDirty } }) => {
        return (
          <>
            <Controller
              name="resumeTypeId"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select
                  label={t("form-resume-type")}
                  options={resumeTypesOptions}
                  onChange={(selectedOption: any) =>
                    onChange(selectedOption?.value)
                  }
                  value={
                    resumeTypesOptions.find(
                      (option) => option.value === value
                    ) || null
                  }
                  error={
                    errors?.resumeTypeId?.message
                      ? t(errors?.resumeTypeId?.message)
                      : ""
                  }
                  isLoading={isResumeListLoading}
                />
              )}
            />
            <Input
              label={t("form-name")}
              placeholder={t("form-title")}
              {...register("resumeName")}
              error={
                errors?.resumeName?.message
                  ? t(errors?.resumeName?.message)
                  : ""
              }
            />
            <Input
              label={t("form-summary")}
              placeholder={t("form-summary")}
              {...register("description")}
            />
            <Controller
              name="startDate"
              control={control}
              render={({ field: { onChange, value } }) => (
                <div className="relative">
                  <DatePicker
                    inputProps={{
                      label: t("form-start-date"),
                      clearable: false,
                    }}
                    id="startDate"
                    value={value ? new Date(value) : null}
                    onChange={(date: any) =>
                      onChange(date ? date.toISOString() : "")
                    }
                    placeholderText={t("form-start-date")}
                    className="w-full"
                    minDate={control._formValues?.startDate}
                  />
                  {errors?.startDate?.message && (
                    <p className="mt-1 text-xs text-red-500">
                      {t(errors?.startDate?.message)}
                    </p>
                  )}
                </div>
              )}
            />

            <Controller
              name="endDate"
              control={control}
              defaultValue={null}
              render={({ field: { onChange, value } }) => {
                return (
                  <DatePicker
                    inputProps={{
                      label: t("form-end-date"),
                      clearable: false,
                    }}
                    id="endDate"
                    value={value ? new Date(value) : null}
                    onChange={(date: any) =>
                      onChange(date ? date.toISOString() : "")
                    }
                    placeholderText={t("form-end-date")}
                    className="w-full"
                    minDate={control._formValues?.startDate}
                  />
                )
              }}
            />

            <div className="col-span-full flex justify-end pb-4">
              <div className="flex gap-2">
                {isEditForm && (
                  <Button
                    type="button"
                    onClick={() => onDelete(Number(initialData?.id))}
                    variant="outline"
                    isLoading={isDeletePending}
                    color="danger">
                    {t("form-delete")}
                  </Button>
                )}
                <Button
                  type="submit"
                  color="primary"
                  isLoading={isCreatePending || isUpdatePending}
                  className={isDirty || !isEditForm ? "mb-2" : "hidden"}>
                  {t("form-save")}
                </Button>
              </div>
            </div>
          </>
        )
      }}
    </Form>
  )
}

export default ResumeItemForm
