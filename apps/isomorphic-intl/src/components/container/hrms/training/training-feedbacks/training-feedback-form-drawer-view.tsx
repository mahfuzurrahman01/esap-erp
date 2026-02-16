"use client"

import { useEffect, useState } from "react"

import { Form } from "@core/ui/form"
import SimpleBar from "@core/ui/simplebar"
import { useTranslations } from "next-intl"
import { Controller, SubmitHandler } from "react-hook-form"

import DrawerFormActions from "@/components/base/drawer-form-actions"
import DrawerHeader from "@/components/base/drawer-header"
import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import { Select, Textarea } from "@/components/ui"
import { DEFAULT_PAGE_SIZE_200 } from "@/config/constants"
import { useEmployeeList } from "@/hooks/hrms/employee/use-employee"
import {
  useCreateFeedback,
  useUpdateFeedback,
} from "@/hooks/hrms/training/feedbacks/use-feedbacks"
import { useParticipantById } from "@/hooks/hrms/training/participants/use-participants"
import { useSessionList } from "@/hooks/hrms/training/session/use-session"
import { useSelectOptions } from "@/hooks/use-select-options"
import { TrainingSession } from "@/types/hrms/training/training-session-type"
import {
  TrainingFeedbackFormInput,
  trainingFeedbackFormSchema,
} from "@/validators/hrms/training-feedback.schema"

type TrainingFeedbackFormDrawerViewProps = {
  isEditForm?: boolean
  initialData?: TrainingFeedbackFormInput
} & (
  | { isEditForm: true; initialData: TrainingFeedbackFormInput }
  | { isEditForm?: false; initialData?: TrainingFeedbackFormInput }
)

const ratingOptions = [
  { label: "Not Good", value: "Not Good" },
  { label: "Good", value: "Good" },
  { label: "Better", value: "Better" },
  { label: "Best", value: "Best" },
] as const

const defaultValues: TrainingFeedbackFormInput = {
  sessionId: 0,
  participantId: 0,
  trainerId: 0,
  rating: "Good",
  comments: "",
}

const TrainingFeedbackFormDrawerView = ({
  isEditForm = false,
  initialData,
}: TrainingFeedbackFormDrawerViewProps) => {
  const t = useTranslations("form")
  const { closeDrawer } = useDrawer()

  const {
    mutateAsync: updateFeedback,
    isPending: isUpdatePending,
    isSuccess: updateSuccess,
  } = useUpdateFeedback()

  const {
    mutateAsync: createFeedback,
    isPending: isCreatePending,
    isSuccess: createSuccess,
  } = useCreateFeedback()

  const { data: sessions, isLoading: isSessionLoading } = useSessionList({
    pageSize: DEFAULT_PAGE_SIZE_200,
  })

  const [selectedSessionId, setSelectedSessionId] = useState<number | null>(
    initialData?.sessionId || null
  )

  const selectedSession = sessions?.data?.find(
    (session) => session.id === selectedSessionId
  )

  // Fetch participants based on program ID
  const { data: participants, isLoading: isParticipantLoading } =
    useParticipantById(selectedSession?.trainingProgramId || 0)

  const { data: trainers } = useEmployeeList({
    pageSize: DEFAULT_PAGE_SIZE_200,
  })

  const trainerOptions =
    trainers?.data?.map((trainer) => ({
      label: `${trainer?.firstName} ${trainer?.lastName}`,
      value: trainer.id,
    })) || []

  const sessionOptions = useSelectOptions<TrainingSession>(
    sessions?.data,
    "sessionName"
  )

  const participantOptions =
    participants?.map((participant) => ({
      label: `${participant.employee?.firstName} ${participant.employee?.lastName}`,
      value: participant.id,
    })) || []

  const onSubmit: SubmitHandler<TrainingFeedbackFormInput> = async (data) => {
    if (isEditForm && initialData?.id) {
      const createData = {
        sessionId: data.sessionId,
        feedbacks: [
          {
            id: initialData.id,
            participantId: data.participantId,
            trainerId: data.trainerId,
            rating: data.rating,
            comments: data.comments || "",
          },
        ],
      }
      await updateFeedback(createData)
    } else {
      const createData = {
        sessionId: data.sessionId,
        feedbacks: [
          {
            participantId: data.participantId,
            trainerId: data.trainerId,
            rating: data.rating,
            comments: data.comments || "",
          },
        ],
      }
      await createFeedback(createData)
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
          isEditForm ? t("form-edit-feedback") : t("form-add-new-feedback")
        }
        onClose={closeDrawer}
      />
      <SimpleBar className="h-[calc(100%-80px)]">
        <Form<TrainingFeedbackFormInput>
          validationSchema={trainingFeedbackFormSchema}
          onSubmit={onSubmit}
          useFormProps={{
            defaultValues: initialData || defaultValues,
          }}>
          {({ register, control, formState: { errors }, watch }) => (
            <>
              <div className="grid gap-4 p-6">
                <Controller
                  name="sessionId"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      label={t("form-session-name")}
                      placeholder={
                        isSessionLoading
                          ? t("form-loading-session")
                          : t("form-select-session")
                      }
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
                      placeholder={
                        !watch("sessionId")
                          ? t("form-select-session-first")
                          : isParticipantLoading
                            ? t("form-loading-participant")
                            : t("form-select-participant")
                      }
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
                  name="trainerId"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      label={t("form-trainer")}
                      placeholder={t("form-select-trainer")}
                      options={trainerOptions}
                      onChange={(selectedOption: any) => {
                        onChange(selectedOption?.value)
                      }}
                      value={
                        trainerOptions?.find(
                          (option) => option.value === value
                        ) || null
                      }
                      error={
                        errors?.trainerId?.message
                          ? t(errors?.trainerId?.message)
                          : ""
                      }
                    />
                  )}
                />

                <Controller
                  name="rating"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      label={t("form-rating")}
                      placeholder={t("form-select-rating")}
                      options={ratingOptions}
                      onChange={(selectedOption: any) => {
                        onChange(selectedOption?.value)
                      }}
                      value={
                        ratingOptions.find(
                          (option) => option.value === value
                        ) || null
                      }
                      error={
                        errors?.rating?.message
                          ? t(errors?.rating?.message)
                          : ""
                      }
                    />
                  )}
                />

                <Textarea
                  label={t("form-comments")}
                  placeholder={t("form-enter-comments")}
                  {...register("comments")}
                  error={errors?.comments?.message}
                />
              </div>
              <DrawerFormActions
                handleCloseDrawer={closeDrawer}
                isLoading={isCreatePending || isUpdatePending}
                isEditForm={isEditForm}
              />
            </>
          )}
        </Form>
      </SimpleBar>
    </div>
  )
}

export default TrainingFeedbackFormDrawerView
