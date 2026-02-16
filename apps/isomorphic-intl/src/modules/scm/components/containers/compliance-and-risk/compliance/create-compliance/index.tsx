"use client"

import Link from "next/link"
import { useState } from "react"

import { Form } from "@core/ui/form"
import { useAtom } from "jotai"
import { useTranslations } from "next-intl"
import { Controller, SubmitHandler } from "react-hook-form"
import { Empty } from "rizzui/empty"

import { DatePicker } from "@/components/base/date-picker"
import FileUpload from "@/components/base/file-upload"
import FormGroup from "@/components/base/form-group"
import FormGroupContainer from "@/components/base/form-group-container"
import FormStickyActions from "@/components/base/form-sticky-actions"
import PdfIcon from "@/components/icons/pdf-icon"
import { Button, Input, Select, Textarea } from "@/components/ui"
import Box from "@/components/ui/box"
import { routes } from "@/config/routes"
import {
  useCreateCompliance,
  useUpdateCompliance,
} from "@/modules/scm/hooks/compliance-and-risk/compliance/use-compliance"
import { Compliance } from "@/modules/scm/types/compliance-and-risk/compliance-types"
import { FindSelectOption } from "@/modules/scm/utils/select-options"
import { ComplianceSchema } from "@/modules/scm/validators/compliance-and-risk/compliance.schema"

import { previewDataTemplate } from "../../../procurement/requisition/create-requisition"
import { defaultCompliance } from "./form-utils"
import { useComplianceData } from "./use-compliance-form"

type IndexProps =
  | {
      initialData?: Compliance
      isEditForm?: true
      isViewForm?: false
    }
  | {
      initialData?: undefined
      isEditForm?: false
      isViewForm?: false
    }
  | {
      initialData?: any
      isEditForm?: false
      isViewForm?: true
    }

export default function ComplianceForm({
  initialData,
  isEditForm,
  isViewForm,
}: IndexProps) {
  const t = useTranslations("form")
  const [assignedToName, setAssignedToName] = useState("")
  const [previewData, setPreviewData] = useAtom(previewDataTemplate)
  const { assignedToOptions, complianceStatusOptions, isLoading } =
    useComplianceData()

  const { mutateAsync: createCompliance, isPending: isCreating } =
    useCreateCompliance()
  const { mutateAsync: updateCompliance, isPending: isUpdating } =
    useUpdateCompliance()

  const handleFileUpload = (files: File[]) => {
    if (files) {
      setPreviewData(files)
    }
  }

  const fileInput = document.querySelector(
    'input[type="file"]'
  ) as HTMLInputElement

  const file = fileInput?.files?.[0]

  const formData = new FormData()
  if (file) {
    formData.append("bsFile", file)
  }

  const onSubmit: SubmitHandler<Compliance> = async (data) => {
    if (isEditForm) {
      await updateCompliance({
        data: {
          ...data,
          id: initialData?.id,
          assignedToName: assignedToName || initialData?.assignedToName,
          proofDocumentUrl: previewData[0] || data.proofDocumentUrl || "",
          comments: data.comments || "",
        },
      })
    } else {
      await createCompliance({
        ...data,
        assignedToName: assignedToName,
        proofDocumentUrl: previewData[0] || "",
      })
    }
  }

  return (
    <Box>
      <Form<Compliance>
        onSubmit={onSubmit}
        validationSchema={ComplianceSchema}
        className="flex grow flex-col justify-between pt-7 @container @2xl:pt-9 @3xl:pt-11"
        useFormProps={{
          mode: "onChange",
          reValidateMode: "onChange",
          defaultValues: initialData || defaultCompliance,
          values: initialData,
        }}>
        {({ register, control, formState: { errors } }) => (
          <>
            <FormGroupContainer>
              <FormGroup title={t("form-compliance-information")}>
                <Input
                  labelClassName="bg-paper"
                  isRequired
                  label={t("form-compliance-area")}
                  type="text"
                  {...register("complianceArea")}
                  error={
                    errors.complianceArea?.message
                      ? t(errors.complianceArea?.message)
                      : ""
                  }
                  className="flex-grow"
                  disabled={isViewForm}
                />
                <Input
                  labelClassName="bg-paper"
                  isRequired
                  label={t("form-task-name")}
                  type="text"
                  {...register("taskName")}
                  error={
                    errors.taskName?.message ? t(errors.taskName?.message) : ""
                  }
                  className="flex-grow"
                  disabled={isViewForm}
                />
                <Input
                  labelClassName="bg-paper"
                  isRequired
                  label={t("form-regulation-standard")}
                  type="text"
                  {...register("regulationStandard")}
                  error={
                    errors.regulationStandard?.message
                      ? t(errors.regulationStandard?.message)
                      : ""
                  }
                  className="flex-grow"
                  disabled={isViewForm}
                />
                <Controller
                  control={control}
                  name="assignedToId"
                  render={({ field: { onChange, value } }) => (
                    <Select
                      isRequired
                      label={t("form-assigned-to")}
                      labelClassName="text-title"
                      showAddNewOption={true}
                      options={assignedToOptions}
                      value={
                        assignedToOptions.find(
                          (option) => option.value === value
                        ) || null
                      }
                      onChange={(selectedValue: any) => {
                        onChange(selectedValue.value)
                        setAssignedToName(selectedValue.label)
                      }}
                      isLoading={isLoading}
                      isDisabled={isLoading || isViewForm}
                      placeholder={t("form-assigned-to")}
                      error={
                        errors.assignedToId?.message
                          ? t(errors.assignedToId?.message)
                          : ""
                      }
                    />
                  )}
                />
                <div>
                  <Controller
                    control={control}
                    name="dueDate"
                    render={({ field: { value, onChange } }) => (
                      <div className="relative">
                        <label
                          htmlFor="dueDate"
                          className="mb-2 block text-sm font-medium text-title transition-colors duration-200">
                          {t("form-due-date")}{" "}
                          <span className="text-orange-500">*</span>
                        </label>
                        <DatePicker
                          id="dueDate"
                          value={value ? new Date(value) : null}
                          onChange={(date: any) =>
                            onChange(date ? date.toISOString() : "")
                          }
                          minDate={new Date()}
                          placeholderText={t("form-select-date")}
                          className="w-full"
                          disabled={isViewForm}
                        />
                      </div>
                    )}
                  />
                  {errors.dueDate && (
                    <p className="text-sm text-red-500">
                      {errors.dueDate.message ? t(errors.dueDate.message) : ""}
                    </p>
                  )}
                </div>
                <Controller
                  control={control}
                  name="completionStatus"
                  render={({ field: { onChange, value } }) => (
                    <Select
                      options={complianceStatusOptions}
                      isRequired
                      label={t("form-completion-status")}
                      {...register("completionStatus")}
                      value={FindSelectOption(complianceStatusOptions, value)}
                      onChange={(selectedValue: any) => {
                        onChange(selectedValue?.value)
                      }}
                      className="text-gray-900 dark:text-gray-0"
                      error={
                        errors.completionStatus?.message
                          ? t(errors.completionStatus?.message)
                          : ""
                      }
                      isDisabled={isViewForm}
                    />
                  )}
                />

                <Textarea
                  labelClassName="bg-paper"
                  label={t("form-comments")}
                  {...register("comments", { required: false })}
                  error={
                    errors.comments?.message ? t(errors.comments?.message) : ""
                  }
                  className="flex-grow text-title"
                  disabled={isViewForm}
                />
              </FormGroup>
              {isViewForm && (
                <FormGroup
                  title={t("form-document")}
                  className="pt-7 @2xl:pt-10 @3xl:pt-11">
                  {initialData?.proofDocumentUrl === null ? (
                    <Empty text="No Data" textClassName="mt-2" />
                  ) : (
                    <div className="col-span-full flex items-center justify-between rounded-lg">
                      <div className="flex items-center">
                        <PdfIcon className="mr-2 h-8 w-8" />
                        <span className="font-base text-gray-900 dark:text-gray-0">
                          {t("form-document")}
                        </span>
                      </div>
                      <Button variant="outline">
                        <Link
                          href={initialData?.proofDocumentUrl || ""}
                          download>
                          {t("form-download")}
                        </Link>
                      </Button>
                    </div>
                  )}
                </FormGroup>
              )}
              {!isViewForm && (
                <FormGroup
                  title={t("form-document")}
                  className="pt-7 @2xl:pt-10 @3xl:pt-11">
                  <FileUpload
                    accept="pdf"
                    multiple={false}
                    onUpload={handleFileUpload}
                    btnLabel="upload"
                    className="col-span-full w-full @2xl:p-0"
                  />
                </FormGroup>
              )}
            </FormGroupContainer>
            {!isViewForm && (
              <FormStickyActions
                isEditForm={isEditForm}
                backToListPath={
                  routes.scm.complianceAndRisk.compliance.compliance
                }
                isLoading={isCreating || isUpdating}
                className="mt-7"
              />
            )}
          </>
        )}
      </Form>
    </Box>
  )
}
