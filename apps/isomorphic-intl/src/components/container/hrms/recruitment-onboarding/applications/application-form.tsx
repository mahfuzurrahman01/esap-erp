"use client"

import { Form } from "@core/ui/form"
import { useTranslations } from "next-intl"
import { Controller, SubmitHandler } from "react-hook-form"

import FileUpload from "@/components/base/file-upload"
import FormGroup from "@/components/base/form-group"
import PdfGreenIcon from "@/components/icons/hrms/pdf-green-icon"
import { Input, Select } from "@/components/ui"
import { useCreateApplication } from "@/hooks/hrms/recruitment/use-applications"
import { useRecruitmentList } from "@/hooks/hrms/recruitment/use-recruitment"
import { useSelectOptions } from "@/hooks/use-select-options"
import { Application } from "@/types/hrms/recruitment/applications-type"
import { Recruitment } from "@/types/hrms/recruitment/recruitment-type"
import {
  ApplicationFormInput,
  applicationSchema,
} from "@/validators/hrms/application.schema"

import ApplicationFormStickyActions from "./application-form-sticky-actions"

const defaultValues = {
  jobPostingId: 0,
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  linkedIn: "",
  gitHub: "",
  source: "",
  noticePeriod: 0,
  resumeFile: null,
  coverLetterFile: null,
}

const sourceOptions = [
  { value: "LinkedIn", label: "LinkedIn" },
  { value: "Indeed", label: "Indeed" },
  { value: "Company Website", label: "Company Website" },
  { value: "Referral", label: "Referral" },
  { value: "Other", label: "Other" },
]

const ApplicationForm = () => {
  const t = useTranslations("form")
  const { mutateAsync: createApplication, isPending: isCreatePending } =
    useCreateApplication()

  const { data: recruitmentList, isLoading: isRecruitmentLoading } =
    useRecruitmentList()

  const jobPositionOptions = useSelectOptions<Recruitment>(
    recruitmentList?.data,
    "jobPositionName"
  )

  const onSubmit: SubmitHandler<Application> = async (data) => {
    //console.log(data)
    await createApplication(data)
  }

  return (
    <Form<ApplicationFormInput>
      validationSchema={applicationSchema}
      onSubmit={onSubmit}
      className="flex h-full min-h-full grow @container"
      useFormProps={{
        defaultValues,
        mode: "onChange",
      }}>
      {({ register, control, formState: { errors }, setValue }) => {
        //console.log(errors)
        return (
          <div className="mx-auto flex w-full max-w-screen-2xl flex-col justify-between gap-7 divide-y @2xl:gap-9 @3xl:gap-11">
            <FormGroup
              title={t("form-details-form")}
              description={t("form-applicant-details-description")}
              className="grid-cols-12 px-5 pt-7 @3xl:grid-cols-12"
              childrenContainerClassName="@2xl:grid-cols-1 @4xl:col-span-8">
              <div className="grid gap-4 @2xl:grid-cols-2 @4xl:gap-5 xl:gap-7">
                <Controller
                  name="jobPostingId"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      label={t("form-select-job-position")}
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
                      isLoading={isRecruitmentLoading}
                      error={
                        errors?.jobPostingId?.message &&
                        t(errors?.jobPostingId?.message)
                      }
                    />
                  )}
                />

                <Input
                  label={t("form-first-name")}
                  placeholder={t("form-enter-first-name")}
                  {...register("firstName")}
                  error={
                    errors?.firstName?.message && t(errors?.firstName?.message)
                  }
                />

                <Input
                  label={t("form-last-name")}
                  placeholder={t("form-enter-last-name")}
                  {...register("lastName")}
                  error={
                    errors?.lastName?.message && t(errors?.lastName?.message)
                  }
                />

                <Input
                  label={t("form-email")}
                  placeholder={t("form-enter-email")}
                  {...register("email")}
                  error={errors?.email?.message && t(errors?.email?.message)}
                />

                <Input
                  label={t("form-phone")}
                  placeholder={t("form-enter-phone")}
                  {...register("phone")}
                  error={errors?.phone?.message && t(errors?.phone?.message)}
                />

                <Input
                  label={t("form-linkedin")}
                  placeholder={t("form-enter-linkedin")}
                  {...register("linkedIn")}
                  error={
                    errors?.linkedIn?.message && t(errors?.linkedIn?.message)
                  }
                />

                <Input
                  label={t("form-github")}
                  placeholder={t("form-enter-github")}
                  {...register("gitHub")}
                  error={errors?.gitHub?.message && t(errors?.gitHub?.message)}
                />

                <Controller
                  name="source"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      label={t("form-source")}
                      placeholder={t("form-select-source")}
                      options={sourceOptions}
                      onChange={(option: any) => onChange(option?.value)}
                      value={
                        sourceOptions.find(
                          (option) => option.value === value
                        ) || null
                      }
                      error={
                        errors?.source?.message && t(errors?.source?.message)
                      }
                    />
                  )}
                />

                <Input
                  type="number"
                  label={t("form-notice-period")}
                  placeholder={t("form-enter-notice-period")}
                  {...register("noticePeriod", { valueAsNumber: true })}
                  error={
                    errors?.noticePeriod?.message &&
                    errors?.noticePeriod?.message
                  }
                />
              </div>

              {/* File Upload Sections */}
              <div className="col-span-2 mt-8 space-y-8">
                {/* Resume Upload */}
                <div>
                  <h3 className="mb-4 text-base font-medium">
                    {t("form-resume")}
                  </h3>
                  <Controller
                    name="resumeFile"
                    control={control}
                    render={() => (
                      <FileUpload
                        accept="pdf"
                        multiple={false}
                        onUpload={(files) => setValue("resumeFile", files[0])}
                        btnLabel={t("form-upload")}
                        className="col-span-full w-full @2xl:p-0"
                        actionEnabled={false}
                      />
                    )}
                  />
                  {errors?.resumeFile?.message && (
                    <p className="text-red-500">
                      {t(errors?.resumeFile?.message)}
                    </p>
                  )}
                </div>

                {/* Cover Letter Upload */}
                <div>
                  <h3 className="mb-4 text-base font-medium">
                    {t("form-cover-letter")}
                  </h3>
                  <Controller
                    name="coverLetterFile"
                    control={control}
                    render={() => (
                      <FileUpload
                        accept="pdf"
                        multiple={false}
                        onUpload={(files) =>
                          setValue("coverLetterFile", files[0])
                        }
                        btnLabel={t("form-upload")}
                        className="col-span-full w-full @2xl:p-0"
                      />
                    )}
                  />
                </div>
              </div>
            </FormGroup>

            <ApplicationFormStickyActions isLoading={isCreatePending} />
          </div>
        )
      }}
    </Form>
  )
}

export default ApplicationForm
