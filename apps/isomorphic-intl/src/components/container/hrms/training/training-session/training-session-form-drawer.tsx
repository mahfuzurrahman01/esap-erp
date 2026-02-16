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
import {
  useEmployeeList,
  useEmployeeOptions,
} from "@/hooks/hrms/employee/use-employee"
import { useProgramList } from "@/hooks/hrms/training/program/use-program"
import {
  useCreateSession,
  useUpdateSession,
} from "@/hooks/hrms/training/session/use-session"
import { useSelectOptions } from "@/hooks/use-select-options"
import { EmployeeShortInfo } from "@/types/hrms/common.types"
import { TrainingProgram } from "@/types/hrms/training/training-program-type"
import { TrainingSession } from "@/types/hrms/training/training-session-type"
import {
  TrainingSessionFormInput,
  trainingSessionFormSchema,
} from "@/validators/hrms/training-session.schema"

type TrainingSessionFormDrawerViewProps = {
  isEditForm?: boolean
  initialData?: TrainingSessionFormInput
} & (
  | { isEditForm: true; initialData: TrainingSessionFormInput }
  | { isEditForm?: false; initialData?: TrainingSessionFormInput }
)

const statusOptions = [
  { label: "Scheduled", value: "Scheduled" },
  { label: "Completed", value: "Completed" },
  { label: "Cancelled", value: "Cancelled" },
] as const

const defaultValues: TrainingSessionFormInput = {
  sessionName: "",
  description: "",
  sessionDate: "",
  duration: 0,
  status: "Scheduled",
  location: "",
  trainingProgramId: 0,
  trainerId: 0,
}

const TrainingSessionFormDrawerView = ({
  isEditForm = false,
  initialData,
}: TrainingSessionFormDrawerViewProps) => {
  const t = useTranslations("form")
  const { closeDrawer } = useDrawer()
  const {
    mutateAsync: updateSession,
    isPending: isUpdatePending,
    isSuccess: updateSuccess,
  } = useUpdateSession()
  const {
    mutateAsync: createSession,
    isPending: isCreatePending,
    isSuccess: createSuccess,
  } = useCreateSession()

  const { data: employees, isLoading: isEmployeeLoading } = useEmployeeList({
    pageSize: DEFAULT_PAGE_SIZE_200,
  })
  const { data: programs, isLoading: isProgramLoading } = useProgramList()

  const { employeeOptions, isLoading: employeeListLoading } =
    useEmployeeOptions()
  const programOptions = useSelectOptions<TrainingProgram>(
    programs?.data,
    "trainingProgramName"
  )

  const onSubmit: SubmitHandler<TrainingSession> = async (data) => {
    if (data && initialData?.id) {
      await updateSession(data)
    } else {
      await createSession(data)
    }
  }

  const handleCloseDrawer = () => {
    closeDrawer()
  }

  useEffect(() => {
    if (createSuccess || updateSuccess) {
      closeDrawer()
    }
  }, [createSuccess, updateSuccess])

  return (
    <div className="flex h-full flex-col">
      <DrawerHeader
        heading={
          isEditForm ? t("form-edit-session") : t("form-add-new-session")
        }
        onClose={handleCloseDrawer}
        headerClassName="mb-0"
      />
      <SimpleBar className="h-0 grow">
        <Form<TrainingSessionFormInput>
          validationSchema={trainingSessionFormSchema}
          onSubmit={onSubmit}
          useFormProps={{
            defaultValues: initialData || defaultValues,
          }}>
          {({ register, control, formState: { errors } }) => {
            return (
              <>
                <div className="grid gap-4 p-6">
                  <Input
                    label={t("form-session-name")}
                    placeholder={t("form-enter-session-name")}
                    {...register("sessionName")}
                    error={
                      errors?.sessionName?.message
                        ? t(errors?.sessionName?.message)
                        : ""
                    }
                  />

                  <Controller
                    name="trainingProgramId"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Select
                        label={t("form-program-name")}
                        placeholder={t("form-select-program")}
                        options={programOptions}
                        onChange={(selectedOption: any) => {
                          onChange(selectedOption?.value)
                        }}
                        value={
                          programOptions.find(
                            (option) => option.value === value
                          ) || null
                        }
                        isLoading={isProgramLoading}
                        error={
                          errors?.trainingProgramId?.message
                            ? t(errors?.trainingProgramId?.message)
                            : ""
                        }
                      />
                    )}
                  />

                  <Controller
                    name="trainerId"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Select
                        label={t("form-trainer")}
                        placeholder={t("form-select-trainer")}
                        options={employeeOptions}
                        onChange={(selectedOption: any) => {
                          onChange(selectedOption?.value)
                        }}
                        value={
                          employeeOptions.find(
                            (option) => option.value === value
                          ) || null
                        }
                        isLoading={isEmployeeLoading}
                        error={
                          errors?.trainerId?.message
                            ? t(errors?.trainerId?.message)
                            : ""
                        }
                      />
                    )}
                  />

                  <Controller
                    name="sessionDate"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <div className="relative">
                        <DatePicker
                          inputProps={{
                            label: t("form-session-date"),
                            clearable: false,
                          }}
                          placeholderText={t("form-select-date")}
                          value={value ? new Date(value) : null}
                          onChange={(date: any) => {
                            const formattedDate = date
                              ? dayjs(date).format("YYYY-MM-DD")
                              : null
                            onChange(formattedDate)
                          }}
                          popperPlacement="bottom-start"
                        />
                        {errors?.sessionDate?.message && (
                          <p className="mt-1 text-xs text-red-500">
                            {t(errors?.sessionDate?.message)}
                          </p>
                        )}
                      </div>
                    )}
                  />

                  <Input
                    type="number"
                    label={t("form-duration")}
                    placeholder={t("form-enter-duration-hours")}
                    {...register("duration", { valueAsNumber: true })}
                    error={
                      errors?.duration?.message
                        ? t(errors?.duration?.message)
                        : ""
                    }
                  />

                  <Input
                    label={t("form-location")}
                    placeholder={t("form-enter-location")}
                    {...register("location")}
                    error={
                      errors?.location?.message
                        ? t(errors?.location?.message)
                        : ""
                    }
                  />

                  <Textarea
                    label={t("form-description")}
                    placeholder={t("form-enter-description")}
                    {...register("description")}
                    error={
                      errors?.description?.message
                        ? t(errors?.description?.message)
                        : ""
                    }
                  />

                  <Controller
                    name="status"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Select
                        label={t("form-status")}
                        placeholder={t("form-select-status")}
                        options={statusOptions}
                        onChange={(selectedOption: any) => {
                          onChange(selectedOption?.value)
                        }}
                        value={statusOptions.find(
                          (option) => option.value === value
                        )}
                        error={
                          errors?.status?.message
                            ? t(errors?.status?.message)
                            : ""
                        }
                      />
                    )}
                  />
                </div>
                <DrawerFormActions
                  handleCloseDrawer={handleCloseDrawer}
                  isLoading={isCreatePending || isUpdatePending}
                  isEditForm={isEditForm}
                />
              </>
            )
          }}
        </Form>
      </SimpleBar>
    </div>
  )
}

export default TrainingSessionFormDrawerView
