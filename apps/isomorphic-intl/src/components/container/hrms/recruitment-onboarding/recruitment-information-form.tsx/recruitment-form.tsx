"use client"

import { useParams } from "next/navigation"

import { Form } from "@core/ui/form"
import { useTranslations } from "next-intl"
import { Controller, SubmitHandler } from "react-hook-form"

import FormGroup from "@/components/base/form-group"
import { Input, Select, Textarea } from "@/components/ui"
import { useDepartmentList } from "@/hooks/hrms/employee/use-department"
import { useEmploymentTypeList } from "@/hooks/hrms/employee/use-employment-type"
import { useJobPositionList } from "@/hooks/hrms/employee/use-job-positions"
import { useWorkAddressList } from "@/hooks/hrms/employee/use-work-address"
import {
  useCreateRecruitment,
  useRecruitmentById,
  useUpdateRecruitment,
} from "@/hooks/hrms/recruitment/use-recruitment"
import { useSelectOptions } from "@/hooks/use-select-options"
import { useCompanyList } from "@/modules/fms/hooks/use-company"
import { CompanyList } from "@/modules/fms/types"
import { Department } from "@/types/hrms/employee/department.types"
import { EmploymentType } from "@/types/hrms/employee/employment-types.types"
import { JobPosition } from "@/types/hrms/employee/job-positions.types"
import { WorkAddress } from "@/types/hrms/employee/work-address.types"
import { Recruitment } from "@/types/hrms/recruitment/recruitment-type"
import { recruitmentSchema } from "@/validators/hrms/recruitment.schema"

import RecruitmentFormStickyActions from "../recruitment-form-sticky-actions"

const defaultValues = {
  jobPositionId: 0,
  description: "",
  responsibilities: "",
  experience: 0,
  companyName: "",
  departmentId: 0,
  workingAddressId: 0,
  employmentTypeId: 0,
  expectedNewEmployees: 0,
}

const RecruitmentForm = () => {
  const t = useTranslations("form")
  const params = useParams()
  const recruitmentId = params.recruitmentId

  const { data: recruitment } = useRecruitmentById(Number(recruitmentId))
  const { mutateAsync: createRecruitment, isPending: isCreatePending } =
    useCreateRecruitment()
  const { mutateAsync: updateRecruitment, isPending: isUpdatePending } =
    useUpdateRecruitment()

  const { data: departmentList, isLoading: isDepartmentLoading } =
    useDepartmentList()
  const { data: jobPositionList, isLoading: isJobPositionLoading } =
    useJobPositionList()
  const { data: employmentTypeList, isLoading: isEmploymentTypeLoading } =
    useEmploymentTypeList()
  const { data: workAddressList, isLoading: isWorkAddressLoading } =
    useWorkAddressList()
  const { data: companyList, isLoading: isCompanyLoading } = useCompanyList()

  const departmentOptions = useSelectOptions<Department>(
    departmentList?.data,
    "departmentName"
  )
  const jobPositionOptions = useSelectOptions<JobPosition>(
    jobPositionList?.data,
    "jobPositionName"
  )
  const employmentTypeOptions = useSelectOptions<EmploymentType>(
    employmentTypeList?.data,
    "employmentTypeName"
  )
  const workAddressOptions = useSelectOptions<WorkAddress>(
    workAddressList?.data,
    "workingAddressName"
  )
  const companyOptions = useSelectOptions<CompanyList>(
    companyList?.data,
    "companyName"
  )

  const onSubmit: SubmitHandler<Recruitment> = async (data) => {
    //console.log(data)
    if (recruitmentId) {
      await updateRecruitment(data)
    } else {
      await createRecruitment(data)
    }
  }

  //console.log(recruitment)

  return (
    <Form<Recruitment>
      validationSchema={recruitmentSchema}
      onSubmit={onSubmit}
      className="flex h-full min-h-full grow @container"
      useFormProps={{
        defaultValues: recruitment || defaultValues,
        mode: "onChange",
        values: recruitment || defaultValues,
      }}>
      {({ register, control, formState: { errors } }) => {
        //console.log(errors)
        return (
          <div className="mx-auto flex w-full max-w-screen-2xl flex-col justify-between gap-7 divide-y @2xl:gap-9 @3xl:gap-11">
            <FormGroup
              title={t("form-details")}
              className="grid-cols-12 px-5 pt-7 @3xl:grid-cols-12"
              childrenContainerClassName="@2xl:grid-cols-1 @4xl:col-span-8">
              <div className="grid gap-4 @2xl:grid-cols-2 @4xl:gap-5 xl:gap-7">
                <Controller
                  name="jobPositionId"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      label={t("form-job-position")}
                      placeholder={t("form-select-job-position")}
                      options={jobPositionOptions}
                      onChange={(option: any) =>
                        onChange(Number(option?.value))
                      }
                      value={
                        jobPositionOptions.find(
                          (option) => option.value === value
                        ) || null
                      }
                      isLoading={isJobPositionLoading}
                      error={
                        errors?.jobPositionId?.message &&
                        t(errors?.jobPositionId?.message)
                      }
                    />
                  )}
                />
                <Controller
                  name="departmentId"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      label={t("form-department")}
                      placeholder={t("form-select-department")}
                      options={departmentOptions}
                      onChange={(option: any) =>
                        onChange(Number(option?.value))
                      }
                      value={
                        departmentOptions.find(
                          (option) => option.value === value
                        ) || null
                      }
                      isLoading={isDepartmentLoading}
                      error={
                        errors?.departmentId?.message &&
                        t(errors?.departmentId?.message)
                      }
                    />
                  )}
                />
                <Controller
                  name="employmentTypeId"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      label={t("form-employment-type")}
                      placeholder={t("form-select-employment-type")}
                      options={employmentTypeOptions}
                      onChange={(option: any) =>
                        onChange(Number(option?.value))
                      }
                      value={
                        employmentTypeOptions.find(
                          (option) => option.value === value
                        ) || null
                      }
                      isLoading={isEmploymentTypeLoading}
                      error={
                        errors?.employmentTypeId?.message &&
                        t(errors?.employmentTypeId?.message)
                      }
                    />
                  )}
                />
                <Controller
                  name="workingAddressId"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      label={t("form-job-location")}
                      placeholder={t("form-select-job-location")}
                      options={workAddressOptions}
                      onChange={(option: any) =>
                        onChange(Number(option?.value))
                      }
                      value={
                        workAddressOptions.find(
                          (option) => option.value === value
                        ) || null
                      }
                      isLoading={isWorkAddressLoading}
                      error={
                        errors?.workingAddressId?.message &&
                        t(errors?.workingAddressId?.message)
                      }
                    />
                  )}
                />
                <Controller
                  name="companyName"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      label={t("form-company")}
                      placeholder={t("form-select-company")}
                      options={companyOptions}
                      onChange={(option: any) => onChange(option?.label)}
                      value={
                        companyOptions.find(
                          (option) => option.label === value
                        ) || null
                      }
                      isLoading={isCompanyLoading}
                      error={
                        errors?.companyName?.message &&
                        t(errors?.companyName?.message)
                      }
                    />
                  )}
                />
                <Input
                  type="number"
                  label={t("form-experience-expected")}
                  placeholder={t("form-enter-experience-expected")}
                  {...register("experience", { valueAsNumber: true })}
                  error={
                    errors?.experience?.message &&
                    t("form-expected-experience-required")
                  }
                />
                <Input
                  type="number"
                  label={t("form-expected-employees")}
                  placeholder={t("form-enter-expected-employees")}
                  {...register("expectedNewEmployees", { valueAsNumber: true })}
                  error={
                    errors?.expectedNewEmployees?.message &&
                    t("form-expected-employees-required")
                  }
                />
              </div>
              <div className="col-span-2">
                <Textarea
                  label={t("form-description")}
                  placeholder={t("form-enter-description")}
                  {...register("description")}
                  error={
                    errors?.description?.message &&
                    t(errors?.description?.message)
                  }
                />
              </div>
              <div className="col-span-2">
                <Textarea
                  label={t("form-responsibilities")}
                  placeholder={t("form-enter-responsibilities")}
                  {...register("responsibilities")}
                  error={
                    errors?.responsibilities?.message &&
                    t(errors?.responsibilities?.message)
                  }
                  className="h-20"
                />
              </div>
            </FormGroup>
            <RecruitmentFormStickyActions
              isEditForm={!!recruitmentId}
              isLoading={isCreatePending || isUpdatePending}
            />
          </div>
        )
      }}
    </Form>
  )
}

export default RecruitmentForm
