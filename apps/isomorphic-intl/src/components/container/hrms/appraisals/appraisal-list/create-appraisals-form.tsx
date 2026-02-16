"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

import { Form } from "@core/ui/form"
import dayjs from "dayjs"
import { useTranslations } from "next-intl"
import { Controller } from "react-hook-form"
import { Badge, Button } from "rizzui"

import { DatePicker } from "@/components/base/date-picker"
import FormGroup from "@/components/base/form-group"
import FormGroupContainer from "@/components/base/form-group-container"
import { Input, Select, Textarea } from "@/components/ui"
import {
  useCreateAppraisal,
  useUpdateAppraisal,
} from "@/hooks/hrms/appraisal/use-appraisal"
import { useAppraisalById } from "@/hooks/hrms/appraisal/use-appraisal"
import { useAppraisalTemplateList } from "@/hooks/hrms/appraisal/use-appraisal-templates"
import {
  useEmployeeById,
  useEmployeeList,
  useEmployeeOptions,
} from "@/hooks/hrms/employee/use-employee"
import { useSelectOptions } from "@/hooks/use-select-options"
import { AppraisalTemplate } from "@/types/hrms/appraisal/appraisal-templates.types"
import { Appraisal } from "@/types/hrms/appraisal/appraisals.types"
import { Employee } from "@/types/hrms/employee/employee.types"
import {
  AppraisalFormInput,
  appraisalSchema,
} from "@/validators/hrms/appraisals.schema"

import AppraisalFormStickyActions from "./appraisals-form-sticky-action"

const APPLICATION_STAGES = [
  {
    key: "New",
    label: "New",
    badgeColor: "warning",
    color: "text-[rgb(var(--orange-default))]",
    dotColor: "bg-[rgb(var(--orange-default))]",
  },
  {
    key: "Submitted",
    label: "Submitted",
    badgeColor: "info",
    color: "text-[rgb(var(--blue-default))]",
    dotColor: "bg-[rgb(var(--blue-default))]",
  },
  {
    key: "Done",
    label: "Done",
    badgeColor: "success",
    color: "text-[rgb(var(--green-default))]",
    dotColor: "bg-[rgb(var(--green-default))]",
  },
  {
    key: "Cancelled",
    label: "Cancelled",
    badgeColor: "danger",
    color: "text-[rgb(var(--red-default))]",
    dotColor: "bg-[rgb(var(--red-default))]",
  },
] as const

const defaultValues = {
  appraisalName: "",
  employeeId: undefined,
  templateId: undefined,
  managerId: undefined,
  description: "",
  startDate: "",
  endDate: "",
  status: "New" as "New" | "Submitted" | "Done" | "Cancelled",
}

export default function CreateAppraisalForm() {
  const t = useTranslations("form")

  const { appraisalId } = useParams()
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number>()

  const { data: templateList, isLoading: isTemplateLoading } =
    useAppraisalTemplateList()
  const { mutate: createAppraisal, isPending: isCreatePending } =
    useCreateAppraisal()
  const { mutate: updateAppraisal, isPending: isUpdatePending } =
    useUpdateAppraisal()

  const { employeeOptions, isLoading: isEmployeeLoading } = useEmployeeOptions()

  const activeTemplates =
    templateList?.data?.filter((template) => template.isActive) || []

  const templateOptions = useSelectOptions<AppraisalTemplate>(
    appraisalId ? templateList?.data : activeTemplates,
    "templateName"
  )

  const { data: selectedEmployee } = useEmployeeById(
    selectedEmployeeId as number
  )

  const { data: appraisalData, isLoading: isAppraisalLoading } =
    useAppraisalById(Number(appraisalId))

  const [currentStatus, setCurrentStatus] =
    useState<(typeof APPLICATION_STAGES)[number]["key"]>()

  useEffect(() => {
    if (appraisalData) {
      setSelectedEmployeeId(Number(appraisalData.employee?.id))
    }
  }, [appraisalData])

  useEffect(() => {
    if (appraisalData?.status) {
      setCurrentStatus(appraisalData.status)
    }
  }, [appraisalData?.status])

  const handleStatusChange = (
    newStatus: (typeof APPLICATION_STAGES)[number]["key"]
  ) => {
    setCurrentStatus(newStatus)
    if (appraisalId) {
      updateAppraisal({
        id: Number(appraisalId),
        status: newStatus,
        employeeId: Number(appraisalData?.employee?.id),
        appraisalName: appraisalData?.appraisalName as string,
        startDate: appraisalData?.startDate as string,
        endDate: appraisalData?.endDate as string,
        templateId: Number(appraisalData?.templateId),
      })
    }
  }

  const onSubmit = (data: any) => {
    const formData: Appraisal = {
      ...data,
      managerId: selectedEmployee?.manager?.id,
      status: "New",
    }

    if (appraisalId) {
      updateAppraisal({ ...formData, id: Number(appraisalId) })
    } else {
      createAppraisal(formData)
    }
  }

  if (appraisalId && isAppraisalLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div className="card-shadow flex flex-col border-none bg-gray-0 pt-6 dark:bg-gray-800">
        {appraisalId && (
          <div className="mb-6 rounded-2xl bg-white px-10 dark:bg-paper">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-semibold">Appraisal Status</h3>
                <Badge
                  color={
                    APPLICATION_STAGES.find(
                      (stage) => stage.key === currentStatus
                    )?.badgeColor as any
                  }
                  className="px-3 py-1 text-sm capitalize">
                  {currentStatus}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                {APPLICATION_STAGES.map((stage) => {
                  const isCurrentStage = currentStatus === stage.key

                  let textColorClass = "text-gray-500"
                  let dotColorClass = "bg-gray-300"
                  let buttonClass =
                    "border border-gray-200 hover:border-gray-300 hover:text-gray-900 dark:border-gray-0 dark:text-gray-0 dark:hover:border-gray-0 dark:hover:text-gray-0"

                  if (isCurrentStage) {
                    textColorClass = stage.color
                    dotColorClass = stage.dotColor
                    buttonClass = "" // Remove border for active stage
                  }

                  return (
                    <Button
                      key={stage.key}
                      size="sm"
                      variant="text"
                      onClick={() => handleStatusChange(stage.key)}
                      className={`min-h-9 gap-2 px-3.5 ${textColorClass} ${buttonClass} transition-colors duration-200`}>
                      <span
                        className={`size-2 rounded-full ${dotColorClass} transition-colors duration-200`}
                      />
                      <span className="font-medium">{stage.label}</span>
                    </Button>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        <Form<AppraisalFormInput>
          validationSchema={appraisalSchema}
          onSubmit={onSubmit}
          className="flex h-full min-h-full grow @container"
          useFormProps={{
            defaultValues: appraisalData
              ? {
                  ...appraisalData,
                  managerId: Number(appraisalData.manager?.id),
                  employeeId: Number(appraisalData.employee?.id),
                  templateId: Number(appraisalData.templateId),
                  description: appraisalData.description,
                  startDate: appraisalData.startDate,
                  endDate: appraisalData.endDate,
                  status: appraisalData.status,
                }
              : defaultValues,
            mode: "onChange",
          }}>
          {({ register, control, formState: { errors } }) => {
            //console.log(errors)
            return (
              <>
                <FormGroupContainer>
                  <FormGroup
                    title={t("form-details")}
                    className="grid-cols-12 @3xl:grid-cols-12"
                    childrenContainerClassName="@2xl:grid-cols-1 @4xl:col-span-8">
                    <div className="grid gap-4 @2xl:grid-cols-2 @4xl:gap-5 xl:gap-7">
                      <Controller
                        name="employeeId"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <Select
                            label={t("form-employee")}
                            placeholder={t("form-select-employee")}
                            options={employeeOptions}
                            onChange={(option: any) => {
                              onChange(Number(option?.value))
                              setSelectedEmployeeId(Number(option?.value))
                            }}
                            value={
                              employeeOptions.find(
                                (option) => option.value === value
                              ) || null
                            }
                            isLoading={isEmployeeLoading}
                            error={
                              errors?.employeeId?.message &&
                              t(errors?.employeeId?.message)
                            }
                          />
                        )}
                      />
                      <Input
                        type="text"
                        label={t("form-manager")}
                        value={selectedEmployee?.manager?.firstName || ""}
                        disabled
                      />
                      <Input
                        type="number"
                        label={t("form-manager")}
                        {...register("managerId", { valueAsNumber: true })}
                        value={selectedEmployee?.manager?.id || 0}
                        className="hidden"
                      />
                      <Input
                        type="text"
                        label={t("form-department")}
                        value={
                          selectedEmployee?.department?.departmentName || ""
                        }
                        disabled
                      />
                      <Input
                        type="text"
                        label={t("form-job-position")}
                        value={
                          selectedEmployee?.jobPosition?.jobPositionName || ""
                        }
                        disabled
                      />
                      <Input
                        type="text"
                        label={t("form-appraisal-name")}
                        placeholder={t("form-enter-appraisal-name")}
                        {...register("appraisalName")}
                        error={
                          errors?.appraisalName?.message &&
                          t(errors?.appraisalName?.message)
                        }
                      />
                      <Controller
                        name="templateId"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <Select
                            label={t("form-template")}
                            placeholder={t("form-select-template")}
                            options={templateOptions}
                            onChange={(option: any) => {
                              onChange(Number(option?.value))
                            }}
                            value={
                              templateOptions.find(
                                (option) => option.value === value
                              ) || null
                            }
                            isLoading={isTemplateLoading}
                            error={
                              errors?.templateId?.message &&
                              t(errors?.templateId?.message)
                            }
                          />
                        )}
                      />

                      <Controller
                        name="startDate"
                        control={control}
                        render={({ field: { value, onChange } }) => (
                          <div className="relative">
                            <DatePicker
                              inputProps={{
                                label: t("form-appraisal-date"),
                                clearable: false,
                              }}
                              placeholderText={t("form-select-appraisal-date")}
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
                                label: t("form-appraisal-deadline"),
                                clearable: false,
                              }}
                              placeholderText={t(
                                "form-select-appraisal-deadline"
                              )}
                              value={value ? new Date(value) : null}
                              onChange={(date: any) => {
                                const formattedDate = date
                                  ? dayjs(date).format("YYYY-MM-DD")
                                  : null
                                onChange(formattedDate)
                              }}
                              minDate={control._formValues?.startDate}
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
                  </FormGroup>

                  <AppraisalFormStickyActions
                    isEditForm={!!appraisalId}
                    isLoading={isCreatePending || isUpdatePending}
                  />
                </FormGroupContainer>
              </>
            )
          }}
        </Form>
      </div>
    </>
  )
}
