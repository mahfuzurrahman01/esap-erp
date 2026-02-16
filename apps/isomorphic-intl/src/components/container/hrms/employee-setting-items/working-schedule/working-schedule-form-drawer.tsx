"use client"

import { Form } from "@core/ui/form"
import SimpleBar from "@core/ui/simplebar"
import { useTranslations } from "next-intl"
import { Controller, useWatch } from "react-hook-form"

// import { Select } from "rizzui"
import DrawerFormActions from "@/components/base/drawer-form-actions"
import DrawerHeader from "@/components/base/drawer-header"
import { useWorkingScheduleForm } from "@/components/container/hrms/employee-setting-items/working-schedule/use-working-schedule-form"
import WorkingHoursFieldArray from "@/components/container/hrms/employee-setting-items/working-schedule/working-hour-fields-array"
import { DEFAULT_WORKING_HOURS } from "@/components/container/hrms/employee-setting-items/working-schedule/working-schedule.constants"
import { Input, Select } from "@/components/ui"
import { useTimezoneOptions } from "@/hooks/use-timezone-options"
import {
  WorkingHour,
  WorkingSchedule,
} from "@/types/hrms/employee/working-schedule.types"
import {
  WorkingScheduleFormInput,
  workingScheduleFormSchema,
} from "@/validators/hrms/working-schedule.schema"

type WorkingScheduleFormDrawerViewProps = {
  isEditForm?: boolean
  initialData?: WorkingSchedule
} & (
  | { isEditForm: true; initialData: WorkingSchedule }
  | { isEditForm?: false; initialData?: WorkingSchedule }
)

const defaultData = {
  averageHourPerDay: 0,
  workingScheduleName: "",
  timezone: "",
  workingHours: DEFAULT_WORKING_HOURS,
}

const WorkingScheduleFormDrawerView = ({
  isEditForm = false,
  initialData = defaultData,
}: WorkingScheduleFormDrawerViewProps) => {
  const t = useTranslations("form")

  const { onSubmit, handleCloseDrawer, isLoading } = useWorkingScheduleForm(
    isEditForm,
    initialData?.id
  )

  if (typeof initialData?.workingHours === "string") {
    const parsedWorkingHours: WorkingHour[] = JSON.parse(
      initialData.workingHours
    ) as WorkingHour[]

    initialData.workingHours = parsedWorkingHours
  }

  return (
    <div className="flex h-full flex-col">
      <DrawerHeader
        heading={
          isEditForm
            ? t("form-edit-working-schedule")
            : t("form-add-new-working-schedule")
        }
        onClose={handleCloseDrawer}
        headerClassName="mb-0"
      />

      <Form<WorkingScheduleFormInput>
        validationSchema={workingScheduleFormSchema}
        onSubmit={onSubmit}
        className="flex h-full flex-col"
        useFormProps={{
          defaultValues: {
            ...initialData,
            workingHours: initialData.workingHours || DEFAULT_WORKING_HOURS,
          },
        }}>
        {({ register, control, setValue, formState: { errors } }) => (
          <>
            <WorkingScheduleForm
              register={register}
              control={control}
              errors={errors}
              setValue={setValue}
              isEditForm
            />
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

export const calculateAverageHoursPerDay = (
  workingHours: WorkingHour[]
): number => {
  if (!workingHours || workingHours.length === 0) return 0
  const validHoursByDay = workingHours.reduce(
    (acc, day) => {
      if (day.dayPeriod?.value !== "Break") {
        if (!acc[day.dayOfWeek.value]) {
          acc[day.dayOfWeek.value] = 0
        }
        acc[day.dayOfWeek.value] += day.duration ? day.duration : 0
      }
      return acc
    },
    {} as Record<string, number>
  )

  const totalHours = Object.values(validHoursByDay).reduce(
    (sum, hours) => sum + hours,
    0
  )
  const uniqueDays = Object.keys(validHoursByDay).length

  return uniqueDays > 0 ? totalHours / uniqueDays : 0
}

export const WorkingScheduleForm = ({
  register,
  control,
  setValue,
  errors,
}: any) => {
  const t = useTranslations("form")
  const workingHours = useWatch({ control, name: "workingHours" })

  const { timezoneOptions } = useTimezoneOptions()

  // Parse `workingHours` if it's a string
  if (typeof workingHours === "string") {
    try {
      const parsedWorkingHours = JSON.parse(workingHours) // Assuming it's a JSON string

      setValue("workingHours", parsedWorkingHours) // Update the form state
    } catch (error) {
      console.error("Failed to parse workingHours:", error)
    }
  }

  return (
    <div className="flex h-full flex-col gap-4 overflow-y-auto px-5 pb-6 pt-6">
      <Input
        type="text"
        variant="floating"
        label={t("form-name")}
        {...register("workingScheduleName")}
        error={
          errors?.workingScheduleName?.message
            ? t(errors?.workingScheduleName?.message)
            : ""
        }
      />
      <Input
        type="number"
        label={t("form-average-hour-per-day")}
        {...register("averageHourPerDay", { disabled: true })}
        value={calculateAverageHoursPerDay(workingHours)}
      />
      <Controller
        name="timezone"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            label={t("form-timezone")}
            placeholder={t("form-select-timezone")}
            options={timezoneOptions}
            onChange={(selectedOption: any) => onChange(selectedOption?.value)}
            value={
              timezoneOptions.find((option) => option.value === value) || null
            }
            error={
              errors?.timezone?.message ? t(errors?.timezone?.message) : ""
            }
          />
        )}
      />
      <WorkingHoursFieldArray
        control={control}
        register={register}
        errors={errors}
        setValue={setValue}
      />
    </div>
  )
}

export default WorkingScheduleFormDrawerView
