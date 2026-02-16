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
import {
  useCreateProgram,
  useUpdateProgram,
} from "@/hooks/hrms/training/program/use-program"
import { useSelectOptions } from "@/hooks/use-select-options"
import { useCompanyList } from "@/modules/fms/hooks/use-company"
import { CompanyList } from "@/modules/fms/types"
import { EmployeeShortInfo } from "@/types/hrms/common.types"
import { TrainingProgram } from "@/types/hrms/training/training-program-type"
import {
  TrainingProgramFormInput,
  trainingProgramFormSchema,
} from "@/validators/hrms/training-program.schema"

type TrainingProgramFormDrawerViewProps = {
  isEditForm?: boolean
  initialData?: TrainingProgramFormInput
} & (
    | { isEditForm: true; initialData: TrainingProgramFormInput }
    | { isEditForm?: false; initialData?: TrainingProgramFormInput }
  )

const statusOptions = [
  { label: "Scheduled", value: "Scheduled" },
  { label: "Completed", value: "Completed" },
  { label: "Cancelled", value: "Cancelled" },
] as const

const defaultValues: TrainingProgramFormInput = {
  trainingProgramName: "",
  description: "",
  startDate: "",
  endDate: "",
  status: "Scheduled",
  companyName: "",
  coordinatorId: 0,
}

const TrainingProgramFormDrawerView = ({
  isEditForm = false,
  initialData,
}: TrainingProgramFormDrawerViewProps) => {
  const t = useTranslations("form")
  const { closeDrawer } = useDrawer()
  const {
    mutateAsync: updateProgram,
    isPending: isUpdatePending,
    isSuccess: updateSuccess,
  } = useUpdateProgram()
  const {
    mutateAsync: createProgram,
    isPending: isCreatePending,
    isSuccess: createSuccess,
  } = useCreateProgram()

  const { data: employees, isLoading: isEmployeeLoading } = useEmployeeList({
    pageSize: DEFAULT_PAGE_SIZE_200,
  })
  const { data: company, isLoading: isCompanyLoading } = useCompanyList()
  const { employeeOptions, isLoading: isEmployeeListLoading } =
    useEmployeeOptions()
  const companyOptions = useSelectOptions<CompanyList>(
    company?.data,
    "companyName"
  )

  const onSubmit: SubmitHandler<TrainingProgram> = async (data) => {
    if (data && initialData?.id) {
      await updateProgram(data)
    } else {
      await createProgram(data)
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
          isEditForm ? t("form-edit-program") : t("form-add-new-program")
        }
        onClose={handleCloseDrawer}
        headerClassName="mb-0 border-b border-gray-200 dark:border-gray-700"
      />
      <Form<TrainingProgramFormInput>
        validationSchema={trainingProgramFormSchema}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: initialData || defaultValues,
        }}
        className="flex h-full flex-col">
        {({ register, control, formState: { errors } }) => (
          <>
            <SimpleBar className="h-[calc(100vh-150px)]">
              <div className="flex h-full flex-col gap-4 p-6">
                <Input
                  label={t("form-program-name")}
                  placeholder={t("form-enter-program-name")}
                  {...register("trainingProgramName")}
                  error={
                    errors?.trainingProgramName?.message
                      ? t(errors?.trainingProgramName?.message)
                      : ""
                  }
                />
                <Controller
                  name="coordinatorId"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      label={t("form-coordinator")}
                      placeholder={t("form-coordinator")}
                      options={employeeOptions}
                      onChange={(selectedOption: any) =>
                        onChange(Number(selectedOption?.value))
                      }
                      value={
                        employeeOptions.find(
                          (option) => option.value === value
                        ) || null // Set to null if no match found
                      }
                      isLoading={isEmployeeListLoading}
                      error={
                        errors?.coordinatorId?.message
                          ? t(errors?.coordinatorId?.message)
                          : ""
                      }
                    />
                  )}
                />
                <Controller
                  name="companyName"
                  control={control}
                  render={({ field: { onChange, value } }) => {
                    return (
                      <Select
                        label={t("form-company-name")}
                        placeholder={t("form-company-name")}
                        options={companyOptions}
                        onChange={(selectedOption: any) => {
                          onChange(selectedOption?.label)
                        }}
                        value={
                          companyOptions.find(
                            (option) => option.label === value
                          ) || null // Set to null if no match found
                        }
                        isLoading={isCompanyLoading}
                        error={
                          errors?.companyName?.message
                            ? t(errors?.companyName?.message)
                            : ""
                        }
                      />
                    )
                  }}
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
                  name="startDate"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <div className="relative">
                      <DatePicker
                        inputProps={{
                          label: t("form-start-date"),
                          clearable: false,
                        }}
                        placeholderText={t("form-select-date-from")}
                        value={value ? new Date(value) : null}
                        onChange={(date: any) => {
                          const formattedDate = date
                            ? dayjs(date).format("YYYY-MM-DD")
                            : null
                          onChange(formattedDate)
                        }}
                        popperPlacement="bottom-start"
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
                  render={({ field: { value, onChange } }) => (
                    <div className="relative">
                      <DatePicker
                        inputProps={{
                          label: t("form-end-date"),
                          clearable: false,
                        }}
                        placeholderText={t("form-select-date-to")}
                        value={value ? new Date(value) : null}
                        onChange={(date: any) => {
                          const formattedDate = date
                            ? dayjs(date).format("YYYY-MM-DD")
                            : null
                          onChange(formattedDate)
                        }}
                        popperPlacement="bottom-start"
                        minDate={control._formValues?.startDate}
                      />
                      {errors?.endDate?.message && (
                        <p className="mt-1 text-xs text-red-500">
                          {t(errors?.endDate?.message)}
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

export default TrainingProgramFormDrawerView
