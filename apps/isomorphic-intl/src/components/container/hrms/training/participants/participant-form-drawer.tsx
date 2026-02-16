"use client"

import { useEffect } from "react"

import { Form } from "@core/ui/form"
import SimpleBar from "@core/ui/simplebar"
import { useTranslations } from "next-intl"
import { Controller, SubmitHandler } from "react-hook-form"

import DrawerFormActions from "@/components/base/drawer-form-actions"
import DrawerHeader from "@/components/base/drawer-header"
import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import { Select } from "@/components/ui"
import { DEFAULT_PAGE_SIZE_200 } from "@/config/constants"
import {
  useEmployeeList,
  useEmployeeOptions,
} from "@/hooks/hrms/employee/use-employee"
import {
  useCreateParticipant,
  useUpdateParticipant,
} from "@/hooks/hrms/training/participants/use-participants"
import { useProgramList } from "@/hooks/hrms/training/program/use-program"
import { useSelectOptions } from "@/hooks/use-select-options"
import { EmployeeShortInfo } from "@/types/hrms/common.types"
import { Participant } from "@/types/hrms/training/participants-type"
import { TrainingProgram } from "@/types/hrms/training/training-program-type"
import {
  ParticipantFormInput,
  participantFormSchema,
} from "@/validators/hrms/participant.schema"

type ParticipantFormDrawerViewProps = {
  isEditForm?: boolean
  initialData?: Participant
} & (
  | { isEditForm: true; initialData: Participant }
  | { isEditForm?: false; initialData?: Participant }
)

const defaultValues: any = {
  trainingProgramId: 0,
  participants: [],
}

const ParticipantFormDrawerView = ({
  isEditForm = false,
  initialData,
}: ParticipantFormDrawerViewProps) => {
  const t = useTranslations("form")
  const { closeDrawer } = useDrawer()
  const {
    mutateAsync: updateParticipant,
    isPending: isUpdatePending,
    isSuccess: updateSuccess,
  } = useUpdateParticipant()
  const {
    mutateAsync: createParticipant,
    isPending: isCreatePending,
    isSuccess: createSuccess,
  } = useCreateParticipant()

  const { data: employees, isLoading: isEmployeeLoading } = useEmployeeList({
    pageSize: DEFAULT_PAGE_SIZE_200,
  })
  const { data: programs, isLoading: isProgramLoading } = useProgramList({
    pageSize: DEFAULT_PAGE_SIZE_200,
  })

  //   const employeeOptions = useSelectOptions<EmployeeShortInfo>(
  //     employees?.data,
  //     "firstName",
  //     (employee) => ({
  //       label: `${employee.firstName} ${employee.lastName}`,
  //       value: String(employee.id),
  //     })
  //   )

  const { employeeOptions, isLoading: employeeListLoading } =
    useEmployeeOptions()

  const programOptions = useSelectOptions<TrainingProgram>(
    programs?.data,
    "trainingProgramName"
  )

  const onSubmit: SubmitHandler<ParticipantFormInput> = async (data) => {
    const newBody = {
      ...data,
      participants: data.participants.map((participant) => ({
        employeeId: participant,
        attendanceStatus: "",
        feedbackStatus: "",
      })),
    }
    if (isEditForm) {
      await updateParticipant({ ...newBody, id: Number(initialData?.id) })
    } else {
      await createParticipant(newBody)
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
          isEditForm ? t("form-edit-participants") : t("form-add-participants")
        }
        onClose={closeDrawer}
        headerClassName="mb-0 border-b border-gray-200 dark:border-gray-700"
      />
      <Form<ParticipantFormInput>
        validationSchema={participantFormSchema}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: initialData || defaultValues,
        }}
        className="flex h-full flex-col">
        {({ control, formState: { errors } }) => (
          <>
            <SimpleBar className="h-[calc(100vh-150px)]">
              <div className="flex h-full flex-col gap-4 p-6">
                <Controller
                  name="trainingProgramId"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      label={t("form-program")}
                      placeholder={t("form-select-program")}
                      options={programOptions}
                      onChange={(selectedOption: any) => {
                        onChange(selectedOption?.value)
                      }}
                      value={programOptions.find(
                        (option) => option.value === value
                      )}
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
                  name="participants"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      label={t("form-participants")}
                      isRequired
                      labelClassName="text-title"
                      isMulti
                      options={employeeOptions}
                      value={
                        Array.isArray(value)
                          ? employeeOptions.filter((option) =>
                              value.includes(option.value as number)
                            )
                          : []
                      }
                      onChange={(options: any) => {
                        const values = options
                          ? options.map((option: any) => option.value)
                          : []
                        onChange(values)
                      }}
                      isLoading={employeeListLoading}
                      isDisabled={employeeListLoading}
                      placeholder={
                        employeeListLoading
                          ? t("form-loading")
                          : t("form-select")
                      }
                      error={
                        errors.participants?.message &&
                        t("form-this-field-is-required")
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

export default ParticipantFormDrawerView
