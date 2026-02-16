"use client"

import { useParams } from "next/navigation"

import { Form } from "@core/ui/form"
import { useTranslations } from "next-intl"
import { Controller, SubmitHandler } from "react-hook-form"

import FormGroup from "@/components/base/form-group"
import EmployeeFormStickyActions from "@/components/container/hrms/employee/employee-form-sticky-actions"
import { Input, Select, Textarea } from "@/components/ui"
import UploadPhoto from "@/components/ui/upload-photo"
import { DEFAULT_PAGE_SIZE_200 } from "@/config/constants"
import { useDepartmentList } from "@/hooks/hrms/employee/use-department"
import {
  useCreateEmployee,
  useEmployeeById,
  useEmployeeList,
  useEmployeeOptions,
  useUpdateEmployee,
} from "@/hooks/hrms/employee/use-employee"
import { useJobPositionList } from "@/hooks/hrms/employee/use-job-positions"
import { useSelectOptions } from "@/hooks/use-select-options"
import { useCountryList } from "@/modules/fms/hooks/use-country"
import { CountryList } from "@/modules/fms/types"
import { EmployeeShortInfo } from "@/types/hrms/common.types"
import { Department } from "@/types/hrms/employee/department.types"
import { JobPosition } from "@/types/hrms/employee/job-positions.types"
import {
  EmployeeBasicInformationPostData,
  employeeBasicInformationSchema,
} from "@/validators/hrms/employee-basic-information.schema"

const defaultValues = {
  id: 0,
  firstName: "",
  lastName: "",
  avatarUrl: "",
  email: "",
  about: "",
  departmentId: null,
  phone: "",
  emergencyPhone: "",
  jobPosition: "",
  countryId: null,
  managerId: null,
  coachId: null,
  createdDate: null,
  updatedDate: null,
}

const EmployeeBasicInformationForm = () => {
  const t = useTranslations("form")
  const params = useParams()
  const temporaryEmployeeId = params.employeeId
  const { data: employee } = useEmployeeById(Number(temporaryEmployeeId))
  const { mutateAsync: createEmployee, isPending: isCreatePending } =
    useCreateEmployee()
  const { mutateAsync: updateEmployee, isPending: isUpdatePending } =
    useUpdateEmployee()
  const { data: departmentList, isLoading: isDepartmentLoading } =
    useDepartmentList()

  const { data: countryList, isLoading: isCountryLoading } = useCountryList({
    pageSize: DEFAULT_PAGE_SIZE_200,
  })
  const { data: jobPositionList, isLoading: isJobPositionLoading } =
    useJobPositionList()

  const departmentOptions = useSelectOptions<Department>(
    departmentList?.data,
    "departmentName"
  )

  const { employeeOptions, isLoading: isEmployeeLoading } = useEmployeeOptions()

  const countryOptions = useSelectOptions<CountryList>(
    countryList?.data,
    "countryName"
  )
  const jobPositionOptions = useSelectOptions<JobPosition>(
    jobPositionList?.data,
    "jobPositionName"
  )

  const onSubmit: SubmitHandler<EmployeeBasicInformationPostData> = async (
    data
  ) => {
    if (temporaryEmployeeId) {
      await updateEmployee({ data })
    } else {
      await createEmployee(data)
    }
  }

  let modifiedEmployee = {}
  if (employee) {
    modifiedEmployee = {
      ...employee,
      departmentId: employee?.department ? employee?.department.id : null,
      managerId: employee?.manager ? employee?.manager.id : null,
      coachId: employee?.coach ? employee?.coach.id : null,
      jobPositionId: employee?.jobPosition ? employee?.jobPosition.id : null,
    }
  }

  return (
    <Form<EmployeeBasicInformationPostData>
      validationSchema={employeeBasicInformationSchema}
      onSubmit={onSubmit}
      className="flex h-full min-h-full grow @container"
      useFormProps={{
        defaultValues: modifiedEmployee || defaultValues,
        mode: "onChange",
        values: modifiedEmployee as EmployeeBasicInformationPostData,
      }}>
      {({ register, control, formState: { errors } }) => {
        return (
          <div className="mx-auto flex w-full max-w-screen-2xl flex-col justify-between gap-7 divide-y @2xl:gap-9 @3xl:gap-11">
            <FormGroup
              title={t("form-basic-information")}
              className="grid-cols-12 px-5 pt-7 @3xl:grid-cols-12"
              childrenContainerClassName="@2xl:grid-cols-1 @4xl:col-span-8">
              <Controller
                control={control}
                name="avatarFile"
                render={({ field: { onChange, value } }) => (
                  <UploadPhoto
                    onChange={(file) => onChange(file)}
                    value={value || employee?.avatarUrl}
                  />
                )}
              />
              <Textarea placeholder={t("form-about")} {...register("about")} />
              <div className="grid gap-4 @2xl:grid-cols-2 @4xl:gap-5 xl:gap-7">
                <Input
                  label={t("form-badgeId")}
                  placeholder={t("form-badgeId-placeholder")}
                  disabled={temporaryEmployeeId ? true : false}
                  {...register("badgeId")}
                  error={
                    errors?.badgeId?.message ? t(errors?.badgeId?.message) : ""
                  }
                />
                <Input
                  label={t("form-email")}
                  placeholder={t("form-email")}
                  {...register("email")}
                  error={
                    errors?.email?.message ? t(errors?.email?.message) : ""
                  }
                />
                <Input
                  label={t("form-first-name")}
                  placeholder={t("form-first-name")}
                  {...register("firstName")}
                  error={
                    errors?.firstName?.message
                      ? t(errors?.firstName?.message)
                      : ""
                  }
                />
                <Input
                  label={t("form-last-name")}
                  placeholder={t("form-last-name")}
                  {...register("lastName")}
                />
                <Input
                  type="text"
                  label={t("form-phone")}
                  placeholder={t("form-phone")}
                  labelClassName="bg-paper"
                  {...register("phone")}
                />
                <Input
                  type="text"
                  label={t("form-emergency-phone")}
                  placeholder={t("form-emergency-phone")}
                  labelClassName="bg-paper"
                  {...register("emergencyPhone")}
                />
                <Controller
                  name="departmentId"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      label={t("form-department")}
                      placeholder={t("form-department")}
                      options={departmentOptions}
                      onChange={(option: any) => onChange(option?.value)}
                      value={
                        departmentOptions.find(
                          (option) => option.value === Number(value)
                        ) || null // Set to null if no match found
                      }
                      isLoading={isDepartmentLoading}
                    />
                  )}
                />
                <Controller
                  name="jobPositionId"
                  control={control}
                  render={({ field: { onChange, value } }) => {
                    return (
                      <Select
                        label={t("form-job-position")}
                        placeholder={t("form-job-position")}
                        options={jobPositionOptions}
                        onChange={(selectedOption: any) =>
                          onChange(Number(selectedOption?.value))
                        }
                        value={
                          jobPositionOptions.find(
                            (option) => option.value == value
                          ) || null
                        }
                        isLoading={isJobPositionLoading}
                      />
                    )
                  }}
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
                    />
                  )}
                />
                <Controller
                  name="managerId"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      label={t("form-manager")}
                      placeholder={t("form-manager")}
                      options={employeeOptions}
                      onChange={(selectedOption: any) =>
                        onChange(Number(selectedOption?.value))
                      }
                      value={
                        employeeOptions.find(
                          (option) => option.value === value
                        ) || null // Set to null if no match found
                      }
                      isLoading={isEmployeeLoading}
                    />
                  )}
                />
                <Controller
                  name="coachId"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      label={t("form-coach")}
                      placeholder={t("form-coach")}
                      options={employeeOptions}
                      onChange={(selectedOption: any) =>
                        onChange(Number(selectedOption?.value))
                      }
                      value={
                        employeeOptions.find(
                          (option) => option.value === value
                        ) || null // Set to null if no match found
                      }
                    />
                  )}
                />
              </div>
            </FormGroup>
            <EmployeeFormStickyActions
              isEditForm={temporaryEmployeeId ? true : false}
              isLoading={isCreatePending || isUpdatePending}
            />
          </div>
        )
      }}
    </Form>
  )
}

export default EmployeeBasicInformationForm
