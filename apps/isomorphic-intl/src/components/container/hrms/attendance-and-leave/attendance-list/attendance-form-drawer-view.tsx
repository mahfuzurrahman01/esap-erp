"use client"

import { useEffect, useState } from "react"

import { Form } from "@core/ui/form"
import SimpleBar from "@core/ui/simplebar"
import dayjs from "dayjs"
import { useTranslations } from "next-intl"
import { Controller } from "react-hook-form"

import { DatePicker } from "@/components/base/date-picker"
// Imported Input from rizzui
import DrawerFormActions from "@/components/base/drawer-form-actions"
import DrawerHeader from "@/components/base/drawer-header"
import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import { useDepartmentForm } from "@/components/container/hrms/department/use-department-form"
import { Input, Select } from "@/components/ui"
import {
  useCreateAttendanceCheckIn,
  useCreateAttendanceCheckOut,
} from "@/hooks/hrms/attendance-and-leave/use-attendance-list"
import { useEmployeeOptions } from "@/hooks/hrms/employee/use-employee"
import { Attendance } from "@/types/hrms/attendance-and-leave/attendance.types"
import {
  AttendanceFormInput,
  attendanceFormSchema,
} from "@/validators/hrms/attendance.schema"

type AttendanceViewProps = {
  isEditForm?: boolean
  initialData?: any
} & (
  | { isEditForm: true; initialData: AttendanceFormInput }
  | { isEditForm?: false; initialData?: AttendanceFormInput }
)

const AttendanceFormDrawerView: React.FC<AttendanceViewProps> = ({
  isEditForm = false,
  initialData,
}) => {
  const t = useTranslations("form")
  const { employeeOptions, isLoading: employeeOptionsLoading } =
    useEmployeeOptions()
  const { closeDrawer } = useDrawer()
  const { handleCloseDrawer } = useDepartmentForm(isEditForm, initialData?.id)
  const [timeLabel, setTimeLabel] = useState("Check In Time")
  const {
    mutateAsync: checkIn,
    isPending: checkInPending,
    isSuccess: checkInSuccess,
  } = useCreateAttendanceCheckIn()

  const {
    mutateAsync: checkOut,
    isPending: checkOutPending,
    isSuccess: checkOutSuccess,
  } = useCreateAttendanceCheckOut()

  const onSubmit = async (data: Attendance) => {
    if (timeLabel === "Check In Time") {
      const body = {
        employeeId: data.employeeId,
        checkIn: dayjs(data.checkIn).format("YYYY-MM-DDTHH:mm"),
        checkInMode: "Manual",
      }
      await checkIn(body as Attendance)
    } else {
      const body = {
        employeeId: data.employeeId,
        checkOut: dayjs(data.checkOut).format("YYYY-MM-DDTHH:mm"),
        checkOutMode: "Manual",
      }
      await checkOut(body as Attendance)
    }
  }

  const attendanceTypeOptions = [
    { label: "Check In", value: "check-in" },
    { label: "Check Out", value: "check-out" },
  ]

  useEffect(() => {
    if (checkInSuccess || checkOutSuccess) {
      closeDrawer()
    }
  }, [checkInSuccess, checkOutSuccess])

  return (
    <div className="flex h-full flex-col">
      <DrawerHeader
        heading={t("form-add-new-checkIn/checkout")}
        onClose={handleCloseDrawer}
        headerClassName="mb-0"
      />
      <Form<AttendanceFormInput>
        validationSchema={attendanceFormSchema}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: initialData,
        }}
        className="flex grow flex-col">
        {({ control, formState: { errors } }) => {
          return (
            <>
              <SimpleBar className="h-0 grow">
                <div className="flex h-[100vh] flex-col gap-4 px-5 py-6">
                  <Controller
                    name="employeeId"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Select
                        label={t("form-employee")}
                        placeholder={t("form-select-employee")}
                        options={employeeOptions}
                        onChange={(selectedOption: any) =>
                          onChange(Number(selectedOption?.value))
                        }
                        value={
                          employeeOptions.find(
                            (option) => option.value === value
                          ) || null // Set to null if no match found
                        }
                        isLoading={employeeOptionsLoading}
                      />
                    )}
                  />

                  <Controller
                    control={control}
                    name={`${timeLabel === "Check In Time" ? "checkInMode" : "checkOutMode"}`}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        label={t("form-attendanceType")}
                        placeholder={t("form-select-attendanceType")}
                        options={attendanceTypeOptions}
                        onChange={(option: any) => {
                          onChange(option?.value)
                          setTimeLabel(
                            option?.value === "check-in"
                              ? "Check In Time"
                              : "Check Out Time"
                          )
                        }}
                        value={
                          attendanceTypeOptions.find(
                            (option) => option.value === value
                          ) || null // Set to null if no match found
                        }
                        error={errors?.employeeId?.message as string}
                      />
                    )}
                  />

                  <div>
                    <Controller
                      control={control}
                      name={`${timeLabel === "Check In Time" ? "checkIn" : "checkOut"}`}
                      render={({ field: { onChange, value } }) => (
                        <DatePicker
                          inputProps={{
                            label: timeLabel,
                            clearable: false,
                          }}
                          placeholderText={t("form-attendance-date-time")}
                          value={value ? new Date(value) : null}
                          onChange={(date: any) => {
                            if (!date) {
                              onChange(null)
                              return
                            }
                            // Store the full date time in form state
                            const formattedDate = dayjs(date).format()
                            onChange(formattedDate)
                          }}
                          popperPlacement="bottom-start"
                          showTimePicker={true}
                        />
                      )}
                    />
                  </div>
                </div>
              </SimpleBar>
              <DrawerFormActions
                handleCloseDrawer={handleCloseDrawer}
                isLoading={checkInPending || checkOutPending}
                isEditForm={false}
              />
            </>
          )
        }}
      </Form>
    </div>
  )
}

export default AttendanceFormDrawerView
