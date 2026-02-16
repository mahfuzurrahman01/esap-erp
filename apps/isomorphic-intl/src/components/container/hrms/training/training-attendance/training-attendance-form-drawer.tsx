"use client"

import { useEffect, useState } from "react"

import { Form } from "@core/ui/form"
import SimpleBar from "@core/ui/simplebar"
import dayjs from "dayjs"
import { useTranslations } from "next-intl"
import { Controller, SubmitHandler } from "react-hook-form"

import { DatePicker } from "@/components/base/date-picker"
import DrawerFormActions from "@/components/base/drawer-form-actions"
import DrawerHeader from "@/components/base/drawer-header"
import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import { Select } from "@/components/ui"
import { DEFAULT_PAGE_SIZE_200 } from "@/config/constants"
import {
  useCreateTrainingAttendance,
  useUpdateTrainingAttendance,
} from "@/hooks/hrms/training/attendance/use-training-attendance"
import { useParticipantById } from "@/hooks/hrms/training/participants/use-participants"
import { useSessionList } from "@/hooks/hrms/training/session/use-session"
import { useSelectOptions } from "@/hooks/use-select-options"
import { TrainingSession } from "@/types/hrms/training/training-session-type"
import {
  TrainingAttendanceFormInput,
  trainingAttendanceFormSchema,
} from "@/validators/hrms/training-attendance.schema"

type TrainingAttendanceFormDrawerViewProps = {
  isEditForm?: boolean
  initialData?: TrainingAttendanceFormInput
} & (
  | { isEditForm: true; initialData: TrainingAttendanceFormInput }
  | { isEditForm?: false; initialData?: TrainingAttendanceFormInput }
)

const statusOptions = [
  { label: "Present", value: "Present" },
  { label: "Absent", value: "Absent" },
] as const

const defaultValues: TrainingAttendanceFormInput = {
  sessionId: 0,
  participantId: 0,
  attendanceDate: "",
  status: "Present",
}

const TrainingAttendanceFormDrawerView = ({
  isEditForm = false,
  initialData,
}: TrainingAttendanceFormDrawerViewProps) => {
  const t = useTranslations("form")
  const { closeDrawer } = useDrawer()
  const {
    mutateAsync: updateAttendance,
    isPending: isUpdatePending,
    isSuccess: updateSuccess,
  } = useUpdateTrainingAttendance()
  const {
    mutateAsync: createAttendance,
    isPending: isCreatePending,
    isSuccess: createSuccess,
  } = useCreateTrainingAttendance()

  const { data: sessions, isLoading: isSessionLoading } = useSessionList({
    pageSize: DEFAULT_PAGE_SIZE_200,
  })

  const [selectedSessionId, setSelectedSessionId] = useState<number | null>(
    null
  )

  const selectedSession = sessions?.data?.find(
    (session) => session.id === selectedSessionId
  )

  useEffect(() => {
    if (initialData?.sessionId) {
      setSelectedSessionId(initialData?.sessionId)
    }
  }, [initialData?.sessionId])

  // Fetch participants based on p rogram ID
  const { data: participants, isLoading: isParticipantLoading } =
    useParticipantById(selectedSession?.trainingProgramId || 0)

  const sessionOptions = useSelectOptions<TrainingSession>(
    sessions?.data,
    "sessionName"
  )

  const participantOptions =
    participants?.map((participant) => ({
      label: `${participant.employee?.firstName} ${participant.employee?.lastName}`,
      value: participant?.id,
    })) || []

  const onSubmit: SubmitHandler<TrainingAttendanceFormInput> = async (data) => {
    if (data && initialData?.id) {
      await updateAttendance(data)
    } else {
      await createAttendance(data)
    }
  }

  useEffect(() => {
    if (createSuccess || updateSuccess) {
      closeDrawer()
    }
  }, [createSuccess, updateSuccess, closeDrawer])

  return (
    <div className="flex h-full flex-col">
      <DrawerHeader
        heading={
          isEditForm ? t("form-edit-attendance") : t("form-add-new-attendance")
        }
        onClose={closeDrawer}
        headerClassName="mb-0 border-b border-gray-200 dark:border-gray-700"
      />
      <Form<TrainingAttendanceFormInput>
        validationSchema={trainingAttendanceFormSchema}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: initialData || defaultValues,
        }}
        className="flex h-full flex-col">
        {({ control, formState: { errors }, watch }) => (
          <>
            <SimpleBar className="h-[calc(100vh-150px)]">
              <div className="flex h-full flex-col gap-4 p-6">
                <Controller
                  name="sessionId"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      label={t("form-session-name")}
                      placeholder={t("form-select-session")}
                      options={sessionOptions}
                      onChange={(selectedOption: any) => {
                        onChange(selectedOption?.value)
                        setSelectedSessionId(selectedOption?.value)
                      }}
                      value={
                        sessionOptions.find(
                          (option) => option.value === value
                        ) || null
                      }
                      isLoading={isSessionLoading}
                      error={
                        errors?.sessionId?.message
                          ? t(errors?.sessionId?.message)
                          : ""
                      }
                    />
                  )}
                />

                <Controller
                  name="participantId"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      label={t("form-participant")}
                      placeholder={t("form-select-participant")}
                      options={participantOptions}
                      onChange={(selectedOption: any) => {
                        onChange(selectedOption?.value)
                      }}
                      value={
                        participantOptions.find(
                          (option) => option.value === value
                        ) || null
                      }
                      isLoading={isParticipantLoading}
                      isDisabled={!watch("sessionId")}
                      error={
                        errors?.participantId?.message
                          ? t(errors?.participantId?.message)
                          : ""
                      }
                    />
                  )}
                />

                <Controller
                  name="attendanceDate"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <div className="relative">
                      <DatePicker
                        inputProps={{
                          label: t("form-attendance-date"),
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
                        popperPlacement="top-start"
                      />
                      {errors?.attendanceDate?.message && (
                        <p className="mt-1 text-xs text-red-500">
                          {t(errors?.attendanceDate?.message)}
                        </p>
                      )}
                    </div>
                  )}
                />

                <Controller
                  name="status"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      label={t("form-attendance-status")}
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
            </SimpleBar>
            <DrawerFormActions
              handleCloseDrawer={closeDrawer}
              isLoading={isCreatePending || isUpdatePending}
              isEditForm={isEditForm}
            />
          </>
        )}
      </Form>
    </div>
  )
}

export default TrainingAttendanceFormDrawerView
