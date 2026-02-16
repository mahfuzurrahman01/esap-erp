"use client"

import { useEffect } from "react"

import { Form } from "@core/ui/form"
import SimpleBar from "@core/ui/simplebar"
import dayjs from "dayjs"
import { useTranslations } from "next-intl"
import { Controller, SubmitHandler } from "react-hook-form"

import { DatePicker } from "@/components/base/date-picker"
import DrawerFormActions from "@/components/base/drawer-form-actions"
import DrawerHeader from "@/components/base/drawer-header"
import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import { Input, Select, Textarea } from "@/components/ui"
import { DEFAULT_PAGE_SIZE_200 } from "@/config/constants"
import { useCreateGoal, useUpdateGoal } from "@/hooks/hrms/appraisal/use-goals"
import {
  useEmployeeList,
  useEmployeeOptions,
} from "@/hooks/hrms/employee/use-employee"
import { useSelectOptions } from "@/hooks/use-select-options"
import { Goal } from "@/types/hrms/appraisal/goals.types"
import { EmployeeShortInfo } from "@/types/hrms/common.types"
import { goalSchema } from "@/validators/hrms/goals.schema"

const progressOptions = [
  { value: 0, label: "Not Started (0%)", color: "warning" },
  { value: 25, label: "In Progress (25%)", color: "info" },
  { value: 50, label: "Half Way (50%)", color: "secondary" },
  { value: 75, label: "Almost Done (75%)", color: "primary" },
  { value: 100, label: "Completed (100%)", color: "success" },
]

const defaultValue = {
  employeeId: "",
  goalName: "",
  progress: 0,
  deadline: "",
  description: "",
  status: false,
}

type GoalFormDrawerViewProps = {
  isEditForm?: boolean
  initialData?: any
} & (
  | { isEditForm: true; initialData: Goal }
  | { isEditForm?: false; initialData?: Goal }
)

const GoalFormDrawerView: React.FC<GoalFormDrawerViewProps> = ({
  isEditForm = false,
  initialData,
}) => {
  const t = useTranslations("form")
  const { closeDrawer } = useDrawer()

  const {
    mutateAsync: createGoal,
    isPending: isCreatePending,
    isSuccess: createSuccess,
  } = useCreateGoal()
  const {
    mutateAsync: updateGoal,
    isPending: isUpdatePending,
    isSuccess: updateSuccess,
  } = useUpdateGoal()

  const handleCloseDrawer = () => {
    closeDrawer()
  }

  const onSubmit: SubmitHandler<Goal> = async (data) => {
    if (isEditForm && initialData?.id) {
      data = { ...data, id: Number(initialData?.id) }
      updateGoal({ ...data, id: Number(initialData?.id) })
    } else {
      createGoal(data)
    }
  }

  useEffect(() => {
    if (createSuccess || updateSuccess) {
      closeDrawer()
    }
  }, [createSuccess, updateSuccess])

  return (
    <div className="flex h-full flex-col">
      <DrawerHeader
        heading={isEditForm ? t("form-edit-goal") : t("form-add-new-goal")}
        onClose={handleCloseDrawer}
        headerClassName="mb-0"
      />
      <Form<Goal>
        validationSchema={goalSchema}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: initialData || defaultValue,
        }}
        className="flex grow flex-col">
        {({ register, control, formState: { errors } }) => (
          <>
            <SimpleBar className="h-0 grow">
              <GoalForm control={control} register={register} errors={errors} />
            </SimpleBar>
            <DrawerFormActions
              handleCloseDrawer={handleCloseDrawer}
              isLoading={isCreatePending || isUpdatePending}
              isEditForm={isEditForm}
            />
          </>
        )}
      </Form>
    </div>
  )
}

export function GoalForm({ register, control, errors }: any) {
  const t = useTranslations("form")

  const { employeeOptions, isLoading: isEmployeeLoading } = useEmployeeOptions()

  return (
    <div className="flex h-[100vh] flex-col gap-4 px-5 py-6">
      <Controller
        name="employeeId"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            label={t("form-employee")}
            placeholder={t("form-select-employee")}
            options={employeeOptions}
            onChange={(selectedOption: any) => onChange(selectedOption?.value)}
            value={employeeOptions.find((option) => option.value === value)}
            isLoading={isEmployeeLoading}
            error={
              errors?.employeeId?.message && t(errors?.employeeId?.message)
            }
          />
        )}
      />

      <Input
        label={t("form-goal-name")}
        placeholder={t("form-enter-goal-name")}
        {...register("goalName")}
        error={errors?.goalName?.message && t(errors?.goalName?.message)}
      />

      <Controller
        name="deadline"
        control={control}
        render={({ field: { value, onChange } }) => (
          <div className="relative">
            <DatePicker
              inputProps={{
                label: t("form-deadline"),
                clearable: false,
              }}
              placeholderText={t("form-select-deadline")}
              value={value ? new Date(value) : null}
              onChange={(date: any) => {
                const formattedDate = date
                  ? dayjs(date).format("YYYY-MM-DD")
                  : null
                onChange(formattedDate)
              }}
              popperPlacement="bottom-start"
            />
            {errors?.deadline?.message && (
              <p className="mt-1 text-xs text-red-500">
                {t(errors?.deadline?.message)}
              </p>
            )}
          </div>
        )}
      />
      <Controller
        name="progress"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            label={t("form-progress")}
            placeholder={t("form-select-progress")}
            options={progressOptions}
            onChange={(selectedOption: any) => onChange(selectedOption?.value)}
            value={progressOptions.find((option) => option.value === value)}
            error={errors?.progress?.message && t(errors?.progress?.message)}
          />
        )}
      />

      <Textarea
        label={t("form-description")}
        placeholder={t("form-enter-description")}
        {...register("description")}
        error={errors?.description?.message && t(errors?.description?.message)}
      />
    </div>
  )
}

export default GoalFormDrawerView
