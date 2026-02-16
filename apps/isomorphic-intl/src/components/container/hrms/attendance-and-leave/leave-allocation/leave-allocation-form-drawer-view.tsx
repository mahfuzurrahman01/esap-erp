"use client"

import { Form } from "@core/ui/form"
import SimpleBar from "@core/ui/simplebar"
import dayjs from "dayjs"
import { useTranslations } from "next-intl"
import { Controller } from "react-hook-form"

import { DatePicker } from "@/components/base/date-picker"
import DrawerFormActions from "@/components/base/drawer-form-actions"
import DrawerHeader from "@/components/base/drawer-header"
import { useLeaveAllocationForm } from "@/components/container/hrms/attendance-and-leave/leave-allocation/use-leave-allocation-form"
import { Input, Select } from "@/components/ui"
import { useLeaveTypeOptions } from "@/hooks/hrms/attendance-and-leave/use-leave-type"
import { useEmployeeOptions } from "@/hooks/hrms/employee/use-employee"
import {
  LeaveAllocationInput,
  leaveAllocationSchema,
} from "@/validators/hrms/leave-allocation.schema"

type LeaveAllocationFormDrawerViewProps = {
  isEditForm?: boolean
  initialData?: any
} & (
  | { isEditForm: true; initialData: LeaveAllocationInput }
  | { isEditForm?: false; initialData?: LeaveAllocationInput }
)

const LeaveAllocationFormDrawerView: React.FC<
  LeaveAllocationFormDrawerViewProps
> = ({ isEditForm = false, initialData }) => {
  const t = useTranslations("form")

  const { onSubmit, isLoading, handleCloseDrawer } = useLeaveAllocationForm(
    isEditForm,
    initialData?.id
  )

  const defaultValues = {
    id: initialData?.id || 0,
    employeeId: initialData?.employeeId || 0,
    leaveTypeId: initialData?.leaveTypeId || "",
    validFrom: initialData?.validFrom || "",
    validTo: initialData?.validTo || "",
    totalDays: initialData?.totalDays || 0,
    remainingDays: initialData?.remainingDays || 0,
  }

  return (
    <div className="flex h-full flex-col">
      <DrawerHeader
        heading={
          isEditForm
            ? t("form-edit-leave-allocation")
            : t("form-add-leave-allocation")
        }
        onClose={handleCloseDrawer}
        headerClassName="mb-0"
      />
      <Form<LeaveAllocationInput>
        validationSchema={leaveAllocationSchema}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues,
        }}
        className="flex grow flex-col">
        {({ register, control, formState: { errors }, setValue }) => {
          return (
            <>
              <SimpleBar className="h-0 grow">
                <LeaveAllocationForm
                  control={control}
                  register={register}
                  errors={errors}
                  isEditForm={isEditForm}
                  setValue={setValue}
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

export default LeaveAllocationFormDrawerView

export function LeaveAllocationForm({
  register,
  control,
  errors,
  isEditForm,
}: any) {
  const t = useTranslations("form")

  const { leaveTypeOptions, isLoading } = useLeaveTypeOptions()
  const { employeeOptions, isLoading: employeeLoading } = useEmployeeOptions()

  const getErrorMessage = (data: string | undefined) => {
    if (!data) return ""
    if (data === "Required") return t("form-required")
    return t(data)
  }

  return (
    <div className="flex min-h-[800px] flex-col gap-4 px-5 py-6">
      <Controller
        name="employeeId"
        control={control}
        render={({ field: { value, onChange } }) => (
          <div className="relative">
            <label
              htmlFor="employeeId"
              className="mb-2 block text-sm font-medium text-title transition-colors duration-200">
              {t("form-employee-name")}
            </label>
            <Select
              id="employeeId"
              options={employeeOptions}
              onChange={(newValue: any) => onChange(Number(newValue?.value))}
              value={
                employeeOptions.find(
                  (option) => option.value === Number(value)
                ) || null
              }
              placeholder={t("form-select-employee")}
              className="w-full"
              isLoading={employeeLoading}
            />
            {errors?.employeeId?.message && (
              <p className="mt-1 text-xs text-red-500">
                {getErrorMessage(errors?.employeeId?.message)}
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
            <label
              htmlFor="leaveTypeId"
              className="mb-2 block text-sm font-medium text-title transition-colors duration-200">
              {t("form-leave-type")}
            </label>
            <Select
              id="leaveTypeId"
              options={leaveTypeOptions}
              onChange={(newValue: any) => onChange(Number(newValue?.value))}
              value={
                leaveTypeOptions.find(
                  (option) => option.value === Number(value)
                ) || null
              }
              placeholder={t("form-select-leave-type")}
              className="w-full"
              isLoading={isLoading}
            />
            {errors?.leaveTypeId?.message && (
              <p className="mt-1 text-xs text-red-500">
                {getErrorMessage(errors?.leaveTypeId?.message)}
              </p>
            )}
          </div>
        )}
      />

      {/* Start Date */}
      <Controller
        name="validFrom"
        control={control}
        render={({ field: { value, onChange } }) => (
          <div className="relative">
            <DatePicker
              inputProps={{
                label: t("form-valid-from"),
                clearable: false,
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
            {errors?.validFrom?.message && (
              <p className="mt-1 text-xs text-red-500">
                {t(errors?.validFrom?.message)}
              </p>
            )}
          </div>
        )}
      />

      {/* End Date */}
      <Controller
        name="validTo"
        control={control}
        render={({ field: { value, onChange } }) => (
          <div className="relative">
            <DatePicker
              inputProps={{
                label: t("form-valid-to"),
                clearable: false,
              }}
              placeholderText={t("form-select-date-to")}
              value={value ? new Date(value) : null}
              onChange={(date: any) => {
                const formattedDate = date
                  ? dayjs(date).format("YYYY-MM-DD")
                  : ""
                onChange(formattedDate)
              }}
              minDate={
                control._formValues?.validFrom
                  ? new Date(control._formValues?.validFrom)
                  : undefined
              }
              popperPlacement="bottom-start"
            />
            {errors?.validTo?.message && (
              <p className="mt-1 text-xs text-red-500">
                {t(errors?.validTo?.message)}
              </p>
            )}
          </div>
        )}
      />
      {errors?.dateCompare?.message && (
        <p className="mt-1 text-xs text-red-500">
          {getErrorMessage(errors?.dateCompare?.message)}
        </p>
      )}

      <Input
        type="number"
        label={t("form-total-days")}
        {...register("totalDays", {
          setValueAs: (value: string) => (value ? Number(value) : 0),
        })}
        className="w-full"
        error={errors?.totalDays?.message ? t(errors?.totalDays?.message) : ""}
      />

      {isEditForm && (
        <Input
          type="number"
          label={t("form-remaining-days")}
          {...register("remainingDays", {
            setValueAs: (value: string) => (value ? Number(value) : 0), // Converts the value to a number
          })}
          className="w-full"
          error={
            errors?.remainingDays?.message
              ? t(errors?.remainingDays?.message)
              : ""
          }
          onChange={(e) => {
            const value = e.target.value
            register("remainingDays").onChange({
              target: { value: value ? Number(value) : 0 }, // Ensures value is a number
            })
          }}
        />
      )}
    </div>
  )
}
