"use client"

import { Form } from "@core/ui/form"
import SimpleBar from "@core/ui/simplebar"
import dayjs from "dayjs"
import { useTranslations } from "next-intl"
import { Controller } from "react-hook-form"

import { DatePicker } from "@/components/base/date-picker"
import DrawerFormActions from "@/components/base/drawer-form-actions"
import DrawerHeader from "@/components/base/drawer-header"
import { useOffDayForm } from "@/components/container/hrms/attendance-and-leave/off-day/use-off-day-form"
import { Input, Select, Textarea } from "@/components/ui"
import { useLeaveTypeList } from "@/hooks/hrms/attendance-and-leave/use-leave-type"
import { useSelectOptions } from "@/hooks/use-select-options"
import { LeaveType } from "@/types/hrms/attendance-and-leave/leave-type.types"
import { OffDay } from "@/types/hrms/attendance-and-leave/off-day.types"
import { OffDayFormInput, offDaySchema } from "@/validators/hrms/off-day.schema"

type OffDayFormDrawerViewProps = {
  isEditForm?: boolean
  initialData?: any
} & (
  | { isEditForm: true; initialData: OffDayFormInput }
  | { isEditForm?: false; initialData?: OffDayFormInput }
)

const OffDayFormDrawerView: React.FC<OffDayFormDrawerViewProps> = ({
  isEditForm = false,
  initialData,
}) => {
  const t = useTranslations("form")
  const { onSubmit, isLoading, handleCloseDrawer } = useOffDayForm(
    isEditForm,
    initialData?.id
  )

  // Format dates from backend
  const formatInitialDate = (date: string | null | undefined) => {
    if (!date) return ""
    // Convert ISO date to YYYY-MM-DD format
    return dayjs(date).format("YYYY-MM-DD")
  }

  const defaultValues = {
    id: initialData?.id || 0,
    offDayName: initialData?.offDayName || "",
    leaveTypeId: initialData?.leaveTypeId || "",
    dateFrom: formatInitialDate(initialData?.dateFrom),
    dateTo: formatInitialDate(initialData?.dateTo),
    description: initialData?.description || "",
  }

  return (
    <div className="flex h-full flex-col">
      <DrawerHeader
        heading={isEditForm ? t("form-edit-off-day") : t("form-add-off-day")}
        onClose={handleCloseDrawer}
        headerClassName="mb-0"
      />
      <Form<OffDay>
        validationSchema={offDaySchema}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues,
        }}
        className="flex grow flex-col">
        {({ register, control, formState: { errors } }) => {
          return (
            <>
              <SimpleBar className="h-0 grow">
                <OffDayForm
                  control={control}
                  register={register}
                  errors={errors}
                />
              </SimpleBar>
              <DrawerFormActions
                handleCloseDrawer={handleCloseDrawer}
                isLoading={isLoading}
                isEditForm={isEditForm}
              />
            </>
          )
        }}
      </Form>
    </div>
  )
}

export default OffDayFormDrawerView

export function OffDayForm({ register, control, errors }: any) {
  const t = useTranslations("form")
  const { data: leaveTypes, isLoading: leaveTypeLoading } = useLeaveTypeList()

  const leaveTypeOptions = useSelectOptions<LeaveType>(
    leaveTypes?.data,
    "leaveTypeName"
  )

  console.log(errors)

  return (
    <div className="flex min-h-[800px] flex-col gap-4 px-5 py-6">
      <Input
        label={t("form-name")}
        {...register("offDayName")}
        placeholder={t("form-enter-name")}
        error={
          errors?.offDayName?.message
            ? t(errors?.offDayName?.message)
            : undefined
        }
      />

      <Controller
        name="leaveTypeId"
        control={control}
        render={({ field: { value, onChange } }) => (
          <div className="relative">
            <Select
              id="leaveTypeId"
              label={t("form-leave-type")}
              options={leaveTypeOptions} //must be adjusted when api is ready
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
      {/* <Controller
        name="dateFrom"
        control={control}
        render={({ field: { value, onChange } }) => (
          <div className="relative">
            <DatePicker
              id="dateFrom"
              selected={value ? new Date(value) : new Date()}
              onChange={(date: Date | null) => onChange(date)}
              placeholderText={t("form-select-date-from")}
              className="w-full"
            />
            {errors?.dateFrom?.message && (
              <p className="mt-1 text-xs text-red-500">
                {t(errors?.dateFrom?.message)}
              </p>
            )}
          </div>
        )}
      /> */}

      <Controller
        name="dateFrom"
        control={control}
        defaultValue=""
        render={({ field: { value, onChange } }) => (
          <div className="relative">
            <DatePicker
              inputProps={{
                label: t("form-from"),
                clearable: false,
                value: value || "",
              }}
              placeholderText={t("form-select-date-from")}
              value={value ? new Date(value) : null}
              onChange={(date: any) => {
                const formattedDate = date
                  ? dayjs(date).format("YYYY-MM-DD")
                  : ""
                onChange(formattedDate)
              }}
              popperPlacement="bottom-start"
            />
            {errors?.dateFrom?.message && (
              <p className="mt-1 text-xs text-red-500">
                {t(errors?.dateFrom?.message)}
              </p>
            )}
          </div>
        )}
      />

      <Controller
        name="dateTo"
        control={control}
        defaultValue=""
        render={({ field: { value, onChange } }) => (
          <div className="relative">
            <DatePicker
              id="dateTo"
              showTimePicker={false}
              inputProps={{
                label: t("form-to"),
                clearable: false,
                value: value || "",
              }}
              placeholderText={t("form-select-date-to")}
              value={value ? new Date(value) : null}
              onChange={(date: any) => {
                const formattedDate = date
                  ? dayjs(date).format("YYYY-MM-DD")
                  : ""
                onChange(formattedDate)
              }}
              popperPlacement="bottom-start"
              minDate={
                control._formValues?.dateFrom
                  ? new Date(control._formValues?.dateFrom)
                  : undefined
              }
            />
            {errors?.dateTo?.message && (
              <p className="mt-1 text-xs text-red-500">
                {t(errors?.dateTo?.message)}
              </p>
            )}
          </div>
        )}
      />
      {errors?.dateCompare?.message && (
        <p className="mt-1 text-xs text-red-500">
          {t(errors?.dateCompare?.message)}
        </p>
      )}
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
