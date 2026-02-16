"use client"

import React from "react"

import { Form } from "@core/ui/form"
import { useTranslations } from "next-intl"
import { Controller, SubmitHandler } from "react-hook-form"

import { DatePicker } from "@/components/base/date-picker"
import FormGroup from "@/components/base/form-group"
import FormGroupContainer from "@/components/base/form-group-container"
import FormStickyActions from "@/components/base/form-sticky-actions"
import { Input, Select, Textarea } from "@/components/ui"
import { routes } from "@/config/routes"
import {
  useCreateSLAMonitor,
  useUpdateSLAMonitor,
} from "@/modules/scm/hooks/procurement/supplier/use-sla-monitoring"
import {
  ServiceLevelAgreementMonitoring,
  SlaMonitoringInput,
} from "@/modules/scm/types/procurement/supplier/service-level-agreement-monitoring-types"
import { FindSelectOption } from "@/modules/scm/utils/select-options"
import { SlaPerformanceSchema } from "@/modules/scm/validators/procurement/sla-monitoring.schema"
import { useCurrentUser } from "@/hooks/auth/use-auth"

type IndexProps =
  | {
    contractId?: number
    initialData?: ServiceLevelAgreementMonitoring
    isEditForm?: true
  }
  | {
    contractId?: number
    initialData?: ServiceLevelAgreementMonitoring
    isEditForm?: false
  }

const statusOptions = [
  { label: "Compliant", value: "compliant" },
  { label: "Non-compliant", value: "non-compliant" },
]

export default function SlaMonitoring({
  contractId,
  initialData,
  isEditForm,
}: IndexProps) {
  const { user } = useCurrentUser()
  const t = useTranslations("form")
  const { mutate: createSlaMonitoring, isPending: isCreating } =
    useCreateSLAMonitor()
  const { mutate: updateSlaMonitoring, isPending: isUpdating } =
    useUpdateSLAMonitor()
  const onSubmit: SubmitHandler<SlaMonitoringInput> = async (data) => {
    if (isEditForm) {
      await updateSlaMonitoring({
        data: {
          ...data,
          id: initialData?.id,
          supplierContractInfoId: initialData?.supplierContractInfoId,
        },
      })
    } else {
      await createSlaMonitoring({
        ...data,
        supplierContractInfoId: contractId ?? 0,
      })
    }
  }


  const defaultValues = {
    auditName: user?.name ?? "",
    expectedPerformance: "",
    actualPerformance: "",
    auditDate: "",
    status: "",
    comments: "",
  }

  return (
    <Form<SlaMonitoringInput>
      validationSchema={SlaPerformanceSchema}
      onSubmit={onSubmit}
      className="card-shadow border-none bg-gray-0 @container dark:bg-gray-800"
      useFormProps={{
        mode: "onChange",
        defaultValues: initialData ?? defaultValues,
        values: initialData,
      }}>
      {({ register, control, formState: { errors } }) => {
        return (
          <>
            <FormGroupContainer>
              <FormGroup
                title={t("form-sla-performance")}
                className="pt-7 @2xl:pt-10 @3xl:pt-11">
                <Input
                  {...register("auditName")}
                  labelClassName="bg-paper"
                  label={t("form-auditor-name")}
                  error={
                    errors.auditName?.message
                      ? t(errors.auditName?.message)
                      : ""
                  }
                  isRequired
                />
                <Input
                  {...register("expectedPerformance")}
                  labelClassName="bg-paper"
                  label={t("form-expected-performance")}
                  error={
                    errors.expectedPerformance?.message
                      ? t(errors.expectedPerformance?.message)
                      : ""
                  }
                  helperText={t("form-expected-performance-example")}
                  isRequired
                />
                <Input
                  {...register("actualPerformance")}
                  labelClassName="bg-paper"
                  label={t("form-actual-performance")}
                  error={
                    errors.actualPerformance?.message
                      ? t(errors.actualPerformance?.message)
                      : ""
                  }
                  helperText={t("form-actual-performance-example")}
                  isRequired
                />

                <Controller
                  control={control}
                  name="status"
                  render={({ field: { onChange, value } }) => (
                    <Select
                      options={statusOptions}
                      value={FindSelectOption(statusOptions, value)}
                      onChange={(selectedValue: any) => {
                        onChange(selectedValue.value)
                      }}
                      label={t("form-status")}
                      placeholder={t("form-select-status")}
                      error={
                        errors.status?.message ? t(errors.status?.message) : ""
                      }
                      isRequired
                    />
                  )}
                />
                <div>
                  <Controller
                    control={control}
                    name="auditDate"
                    render={({ field: { value, onChange } }) => (
                      <div className="relative">
                        <label
                          htmlFor="auditDate"
                          className="mb-2 block text-sm font-medium text-title transition-colors duration-200">
                          {t("form-audit-date")}{" "}
                          <span className="text-orange-500">*</span>
                        </label>

                        <DatePicker
                          id="requestedDate"
                          value={value ? new Date(value) : null}
                          onChange={(date: any) =>
                            onChange(date ? date.toISOString() : "")
                          }
                          minDate={new Date()}
                          placeholderText={t("form-select-date")}
                          className="w-full"
                          required
                        />
                      </div>
                    )}
                  />
                  {errors.auditDate && (
                    <p className="text-sm text-red-500">
                      {errors.auditDate.message
                        ? t(errors.auditDate.message)
                        : ""}
                    </p>
                  )}
                </div>
              </FormGroup>
              <FormGroup
                title={t("form-comments")}
                className="pt-7 @2xl:pt-10 @3xl:pt-11">
                <Textarea
                  labelClassName="bg-paper"
                  label={t("form-comments")}
                  {...register("comments")}
                  error={
                    errors.comments?.message ? t(errors.comments?.message) : ""
                  }
                  className="flex-grow text-title"
                />
              </FormGroup>
            </FormGroupContainer>
            <FormStickyActions
              className="mt-7"
              backToListPath={routes.scm.procurement.suppliers.suppliers}
              isLoading={isCreating || isUpdating}
            />
          </>
        )
      }}
    </Form>
  )
}
