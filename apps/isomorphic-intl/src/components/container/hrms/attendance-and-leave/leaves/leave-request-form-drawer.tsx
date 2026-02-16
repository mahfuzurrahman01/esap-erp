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
import { useCreateLeaveRequest } from "@/hooks/hrms/attendance-and-leave/use-leave-request"
import { useLeaveTypeList } from "@/hooks/hrms/attendance-and-leave/use-leave-type"
import {
  useEmployeeList,
  useEmployeeOptions,
} from "@/hooks/hrms/employee/use-employee"
import { useSelectOptions } from "@/hooks/use-select-options"
import { LeaveRequest } from "@/types/hrms/attendance-and-leave/leave-request.types"
import { LeaveType } from "@/types/hrms/attendance-and-leave/leave-type.types"
import { Employee } from "@/types/hrms/employee/employee.types"
import { formatDate } from "@/utils/format-date"
import { leaveRequestFormSchema } from "@/validators/hrms/leave-request.schema"
import { OffDayFormInput } from "@/validators/hrms/off-day.schema"

type LeaveRequestDrawerProps = {
  isEditForm?: boolean
  initialData?: any
} & (
  | { isEditForm: true; initialData: OffDayFormInput }
  | { isEditForm?: false; initialData?: OffDayFormInput }
)

const LeaveRequestFormDrawer: React.FC<LeaveRequestDrawerProps> = ({
  isEditForm = false,
  initialData,
}) => {
  const t = useTranslations("form")
  const {
    mutateAsync: leaveRequest,
    isPending: isCreatePending,
    isSuccess: isCreateSuccess,
    error: createError,
  } = useCreateLeaveRequest()

  const { closeDrawer } = useDrawer()
  const handleCloseDrawer = () => {
    closeDrawer()
  }
  const onSubmit: SubmitHandler<LeaveRequest> = async (data) => {
    leaveRequest({ ...data })
  }

  useEffect(() => {
    if (isCreateSuccess) {
      handleCloseDrawer()
    }
  }, [isCreateSuccess])

  useEffect(() => {
    if (createError) {
      handleCloseDrawer()
    }
  }, [createError])

  const initialDataWithDates = {
    ...initialData,
    startDate: initialData?.startDate ? new Date(initialData.startDate) : "",
    endDate: initialData?.endDate ? new Date(initialData.endDate) : "",
  }

  return (
    <div className="flex h-full flex-col">
      <DrawerHeader
        heading={
          isEditForm
            ? t("form-edit-leave-request")
            : t("form-add-leave-request")
        }
        onClose={handleCloseDrawer}
        headerClassName="mb-0"
      />
      <Form<LeaveRequest>
        validationSchema={leaveRequestFormSchema}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: initialDataWithDates,
        }}
        className="flex grow flex-col">
        {({ register, control, formState: { errors }, watch, setValue }) => {
          return (
            <>
              <SimpleBar className="h-0 grow">
                <LeaveRequestForm
                  control={control}
                  register={register}
                  errors={errors}
                  watch={watch}
                  setValue={setValue}
                />
              </SimpleBar>
              <DrawerFormActions
                handleCloseDrawer={handleCloseDrawer}
                isLoading={isCreatePending}
                isEditForm={isEditForm}
              />
            </>
          )
        }}
      </Form>
    </div>
  )
}

export default LeaveRequestFormDrawer

export function LeaveRequestForm({
  register,
  control,
  errors,
  watch,
  setValue,
}: any) {
  const t = useTranslations("form")
  const { data: leaveTypes, isLoading: leaveTypeLoading } = useLeaveTypeList()

  const leaveTypeOptions = useSelectOptions<LeaveType>(
    leaveTypes?.data,
    "leaveTypeName"
  )

  // Watch startDate and endDate
  const startDate = watch("startDate")
  const endDate = watch("endDate")

  // Calculate duration
  const duration =
    startDate && endDate ? dayjs(endDate).diff(dayjs(startDate), "day") + 1 : ""
  if (duration) {
    setValue("duration", duration)
  }
  const { employeeOptions, isLoading: employeeLoading } = useEmployeeOptions()

  return (
    <div className="flex h-[100vh] flex-col gap-4 px-5 py-6">
      {/* Leave Type */}
      <Controller
        name="employeeId"
        control={control}
        render={({ field: { value, onChange } }) => (
          <div className="relative">
            <Select
              id="employeeId"
              label={t("form-employee-name")}
              options={employeeOptions}
              onChange={(newValue: any) => onChange(Number(newValue?.value))}
              value={
                employeeOptions.find(
                  (option) => option.value === Number(value)
                ) || null
              }
              placeholder={
                employeeLoading
                  ? "Loading employee..."
                  : t("form-select-employee")
              }
              className="w-full"
              isLoading={employeeLoading}
            />
            {errors?.leaveTypeId?.message && (
              <p className="mt-1 text-xs text-red-500">
                {t(errors?.leaveTypeId?.message)}
              </p>
            )}
          </div>
        )}
      />
      <Controller
        name="leaveTypeId"
        control={control}
        render={({ field: { value, onChange } }) => (
          <div className="relative">
            <Select
              id="leaveTypeId"
              label={t("form-leave-type")}
              options={leaveTypeOptions}
              onChange={(newValue: any) => onChange(Number(newValue?.value))}
              value={
                leaveTypeOptions.find(
                  (option) => option.value === Number(value)
                ) || null
              }
              placeholder={
                leaveTypeLoading
                  ? "Leave types loading..."
                  : t("form-select-leave-type")
              }
              className="w-full"
              isLoading={leaveTypeLoading}
            />
            {errors?.leaveTypeId?.message && (
              <p className="mt-1 text-xs text-red-500">
                {t(errors?.leaveTypeId?.message)}
              </p>
            )}
          </div>
        )}
      />

      {/* Start Date */}
      <Controller
        name="startDate"
        control={control}
        render={({ field: { value, onChange } }) => (
          <div className="relative">
            <DatePicker
              inputProps={{
                label: t("form-from"),
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

      {/* End Date */}
      <Controller
        name="endDate"
        control={control}
        render={({ field: { value, onChange } }) => (
          <div className="relative">
            <DatePicker
              inputProps={{
                label: t("form-to"),
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
              minDate={
                control._formValues?.startDate
                  ? new Date(control._formValues?.startDate)
                  : undefined
              }
              popperPlacement="bottom-start"
            />
            {errors?.endDate?.message && (
              <p className="mt-1 text-xs text-red-500">
                {t(errors?.endDate?.message)}
              </p>
            )}
          </div>
        )}
      />

      {/* Duration (Read-Only Field) */}
      <div>
        <Input
          label={t("form-duration")}
          value={duration ? `${duration} days` : ""}
          {...register("duration")}
          disabled
          className="w-full"
        />
      </div>

      {/* Description */}
      <Textarea
        label={t("form-description")}
        className="w-full"
        {...register("description")}
        error={
          errors?.description?.message ? t(errors?.description?.message) : ""
        }
      />
    </div>
  )
}
