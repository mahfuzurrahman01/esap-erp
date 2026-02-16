"use client"

import { useParams } from "next/navigation"

import { Form } from "@core/ui/form"
import dayjs from "dayjs"
import { useTranslations } from "next-intl"
import { Controller, SubmitHandler } from "react-hook-form"

import { DatePicker } from "@/components/base/date-picker"
import FormGroup from "@/components/base/form-group"
import FormGroupContainer from "@/components/base/form-group-container"
import EmployeeFormStickyActions from "@/components/container/hrms/employee/employee-form-sticky-actions"
import { useWorkInformationForm } from "@/components/container/hrms/employee/work-information/use-work-information-form"
import { Input, Select } from "@/components/ui"
import { DEFAULT_PAGE_SIZE_200 } from "@/config/constants"
import { useEmployeeOptions } from "@/hooks/hrms/employee/use-employee"
import {
  useCreateWorkInfo,
  useUpdateWorkInfo,
  useWorkInfoById,
} from "@/hooks/hrms/employee/use-work"
import { useWorkAddressList } from "@/hooks/hrms/employee/use-work-address"
import { useCountryList } from "@/hooks/use-countries"
import { useSelectOptions } from "@/hooks/use-select-options"
import { CountryList } from "@/modules/fms/types"
import { WorkInformation } from "@/types/hrms/employee/employee.types"
import { WorkAddress } from "@/types/hrms/employee/work-address.types"
import {
  WorkInformationFormInputType,
  WorkInformationSchema,
} from "@/validators/hrms/work-information.schema"

const defaultData: WorkInformationFormInputType = {
  id: 0,
  employeeId: 0,
  workingAddressId: null,
  state: "",
  country: null,
  workLocation: "",
  approverId: null,
  dailyHRId: null,
  workingScheduleId: null,
  timezone: "",
  dateOfJoining: "",
}

const WorkInformationForm = () => {
  const t = useTranslations("form")
  const params = useParams()
  const { mutateAsync: updateWorkInfo, isPending: isUpdatePending } =
    useUpdateWorkInfo()
  const { mutateAsync: createWorkInfo, isPending: isCreatePending } =
    useCreateWorkInfo()
  const { data: countryList, isLoading: isCountryLoading } = useCountryList({
    pageSize: DEFAULT_PAGE_SIZE_200,
  })
  const temporaryEmployeeId = params.employeeId
  const { data: workInfo } = useWorkInfoById(Number(temporaryEmployeeId))
  const { data: workAddress } = useWorkAddressList()
  const countryOptions = useSelectOptions<CountryList>(
    countryList?.data,
    "countryName"
  )
  const { employeeOptions, isLoading: isEmployeeLoading } = useEmployeeOptions()

  const workAddressOptions = useSelectOptions<WorkAddress>(
    workAddress?.data,
    "workingAddressName"
  )
  const { workScheduleOptions } = useWorkInformationForm()

  const onSubmit: SubmitHandler<WorkInformation> = async (data) => {
    if (temporaryEmployeeId && workInfo?.id) {
      await updateWorkInfo({ data })
    } else {
      // await createEmployee(data)
      await createWorkInfo({ ...data, employeeId: Number(temporaryEmployeeId) })
    }
  }

  const modifiedWorkInfo = {
    ...workInfo,
    workingAddressId: workInfo?.workingAddress?.id,
    workingScheduleId: workInfo?.workingSchedule?.id,
    approverId: workInfo?.approver?.id,
    dailyHRId: workInfo?.dailyHR?.id,
  }

  return (
    <Form<WorkInformationFormInputType>
      validationSchema={WorkInformationSchema}
      onSubmit={onSubmit}
      className="flex grow flex-col justify-between @container"
      useFormProps={{
        mode: "onChange",
        defaultValues: modifiedWorkInfo || defaultData,
        values: modifiedWorkInfo as WorkInformationFormInputType,
      }}>
      {({ register, control, formState: { errors } }) => {
        return (
          <>
            <FormGroupContainer className="px-0">
              <FormGroup
                title={t("form-location")}
                className="px-5 pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-7">
                <Controller
                  name="workingAddressId"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      label={t("form-work-address")}
                      options={workAddressOptions}
                      onChange={(selectedOption: any) =>
                        onChange(selectedOption?.value)
                      }
                      value={
                        workAddressOptions.find(
                          (option) => option.value === value
                        ) || null
                      }
                      error={
                        errors.workingAddressId?.message
                          ? t(errors.workingAddressId?.message)
                          : ""
                      }
                    />
                  )}
                />
                <Input
                  label={t("form-state")}
                  placeholder={t("form-state")}
                  {...register("state")}
                />
                <Controller
                  name="country"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      label={t("form-country")}
                      placeholder={t("form-country")}
                      options={countryOptions}
                      onChange={(selectedOption: any) => {
                        onChange(selectedOption?.label)
                      }}
                      value={
                        countryOptions.find(
                          (option) => option.label === value
                        ) || null // Set to null if no match found
                      }
                      isLoading={isCountryLoading}
                      error={
                        errors.country?.message
                          ? t(errors.country?.message)
                          : ""
                      }
                    />
                  )}
                />
                <Input
                  label={t("form-work-location")}
                  placeholder={t("form-work-location")}
                  {...register("workLocation")}
                />
                <Input
                  label={t("form-time-zone")}
                  placeholder={t("form-time-zone")}
                  {...register("timezone")}
                />
              </FormGroup>

              <FormGroup
                title={t("form-approvers")}
                className="px-5 pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-10">
                <Controller
                  name="approverId"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      label={t("form-select-leave-approver")}
                      options={employeeOptions}
                      onChange={(selectedOption: any) =>
                        onChange(selectedOption?.value)
                      }
                      value={
                        employeeOptions.find(
                          (option) => option.value === value
                        ) || null
                      }
                      isLoading={isEmployeeLoading}
                    />
                  )}
                />
                <Controller
                  name="dailyHRId"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      label={t("form-select-daily-hr")}
                      options={employeeOptions}
                      onChange={(selectedOption: any) =>
                        onChange(selectedOption?.value)
                      }
                      value={
                        employeeOptions.find(
                          (option) => option.value === value
                        ) || null
                      }
                      isLoading={isEmployeeLoading}
                    />
                  )}
                />
                <Controller
                  name="dateOfJoining"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <DatePicker
                      inputProps={{
                        label: t("form-joining-date"),
                        clearable: true,
                      }}
                      placeholderText={t("form-select-date")}
                      value={value ? new Date(value) : null}
                      onChange={(date: any) => {
                        const formattedDate = date
                          ? dayjs(date).format("YYYY-MM-DD")
                          : undefined
                        onChange(formattedDate)
                      }}
                      popperPlacement="bottom-end"
                      maxDate={new Date()}
                    />
                  )}
                />
              </FormGroup>

              <FormGroup
                title={t("form-schedule")}
                className="px-5 pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-8">
                <Controller
                  name="workingScheduleId"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      label={t("form-select-schedule")}
                      options={workScheduleOptions}
                      onChange={(selectedOption: any) =>
                        onChange(selectedOption?.value)
                      }
                      value={
                        workScheduleOptions.find(
                          (option) => option.value === value
                        ) || null
                      }
                      error={
                        errors.workingScheduleId?.message
                          ? t(errors.workingScheduleId?.message)
                          : ""
                      }
                    />
                  )}
                />
              </FormGroup>
            </FormGroupContainer>
            <EmployeeFormStickyActions
              isEditForm={temporaryEmployeeId && workInfo?.id ? true : false}
              isLoading={isUpdatePending || isCreatePending}
            />
          </>
        )
      }}
    </Form>
  )
}

export default WorkInformationForm
