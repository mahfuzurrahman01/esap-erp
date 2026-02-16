"use client"

import { useState } from "react"

import { Form } from "@core/ui/form"
import { useTranslations } from "next-intl"
import { Controller, SubmitHandler } from "react-hook-form"
import { Text } from "rizzui/typography"

import { DatePicker } from "@/components/base/date-picker"
import FormGroup from "@/components/base/form-group"
import FormGroupContainer from "@/components/base/form-group-container"
import FormStickyActions from "@/components/base/form-sticky-actions"
import { Input, Select, Textarea } from "@/components/ui"
import Box from "@/components/ui/box"
import { routes } from "@/config/routes"
import {
  useCreateRiskEvaluation,
  useUpdateRiskEvaluation,
} from "@/modules/scm/hooks/compliance-and-risk/risk-evaluation/use-risk-evaluation"
import { RiskEvaluation } from "@/modules/scm/types/compliance-and-risk/risk-evaluation"
import { FindSelectOption } from "@/modules/scm/utils/select-options"
import { RiskEvaluationSchema } from "@/modules/scm/validators/compliance-and-risk/risk-evaluation.schema"

import {
  getMitigationStatusOptionsBadge,
  getResidualRiskOptionsBadge,
  getRiskImpactOptionsBadge,
  getRiskProbabilityOptionsBadge,
  getRiskStatusOptionsBadge,
} from "../risk-evaluation-list/status-badge"
import {
  mitigationStatusOptions,
  residualRiskOptions,
  riskImpactOptions,
  riskProbabilityOptions,
  riskStatusOptions,
  riskTypeOptions,
} from "../risk-evaluation-list/status-options"
import { defaultRiskEvaluation } from "./form-utils"
import { useRiskEvaluationData } from "./use-risk-evaluation-form"

type IndexProps =
  | {
      initialData?: RiskEvaluation
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

export default function CreateRiskEvaluationForm({
  initialData,
  isEditForm,
  isViewForm,
}: IndexProps) {
  const t = useTranslations("form")
  const [employeeName, setEmployeeName] = useState("")
  const { employeeOptions, isLoading } = useRiskEvaluationData()

  const { mutateAsync: createRiskEvaluation, isPending: isCreating } =
    useCreateRiskEvaluation()
  const { mutateAsync: updateRiskEvaluation, isPending: isUpdating } =
    useUpdateRiskEvaluation()

  const onSubmit: SubmitHandler<RiskEvaluation> = async (data) => {
    if (isEditForm) {
      await updateRiskEvaluation({
        data: {
          ...data,
          id: initialData?.id,
        },
      })
    } else {
      await createRiskEvaluation({
        ...data,
      })
    }
  }

  return (
    <Box>
      <Form<RiskEvaluation>
        onSubmit={onSubmit}
        validationSchema={RiskEvaluationSchema}
        className="flex grow flex-col justify-between pt-7 @container @2xl:pt-9 @3xl:pt-11"
        useFormProps={{
          mode: "onChange",
          reValidateMode: "onChange",
          defaultValues: initialData || defaultRiskEvaluation,
          values: initialData,
        }}>
        {({ register, control, formState: { errors } }) => (
          <>
            <FormGroupContainer>
              <FormGroup title={t("form-risk-evaluation-information")}>
                <Controller
                  control={control}
                  name="riskType"
                  render={({ field: { onChange, value } }) => (
                    <Select
                      label={t("form-risk-type")}
                      labelClassName="text-title"
                      options={riskTypeOptions}
                      value={
                        riskTypeOptions.find(
                          (option) => option.value === value
                        ) || null
                      }
                      onChange={(selectedValue: any) => {
                        onChange(selectedValue.value)
                      }}
                      isLoading={isLoading}
                      isDisabled={isLoading || isViewForm}
                      placeholder={t("form-risk-type")}
                      isRequired
                      error={
                        errors.riskType?.message
                          ? t(errors.riskType?.message)
                          : ""
                      }
                    />
                  )}
                />
                {isViewForm && (
                  <div>
                    <Text className="mb-2 text-title">
                      {t("form-risk-impact")}
                    </Text>
                    {getRiskImpactOptionsBadge(
                      initialData?.riskImpact || "pending"
                    )}
                  </div>
                )}
                {!isViewForm && (
                  <Controller
                    control={control}
                    name="riskImpact"
                    render={({ field: { onChange, value } }) => (
                      <Select
                        label={t("form-risk-impact")}
                        labelClassName="text-title"
                        options={riskImpactOptions}
                        value={
                          riskImpactOptions.find(
                            (option) => option.value === value
                          ) || null
                        }
                        onChange={(selectedValue: any) => {
                          onChange(selectedValue.value)
                        }}
                        isLoading={isLoading}
                        isDisabled={isLoading}
                        placeholder={t("form-risk-type")}
                        isRequired
                        error={
                          errors.riskImpact?.message
                            ? t(errors.riskImpact?.message)
                            : ""
                        }
                      />
                    )}
                  />
                )}
                {isViewForm && (
                  <div>
                    <Text className="mb-2 text-title">
                      {t("form-risk-probability")}
                    </Text>
                    {getRiskProbabilityOptionsBadge(
                      initialData?.riskProbability || "pending"
                    )}
                  </div>
                )}
                {!isViewForm && (
                  <Controller
                    control={control}
                    name="riskProbability"
                    render={({ field: { onChange, value } }) => (
                      <Select
                        label={t("form-risk-probability")}
                        labelClassName="text-title"
                        options={riskProbabilityOptions}
                        value={
                          riskProbabilityOptions.find(
                            (option) => option.value === value
                          ) || null
                        }
                        onChange={(selectedValue: any) => {
                          onChange(selectedValue.value)
                        }}
                        isLoading={isLoading}
                        isDisabled={isLoading}
                        placeholder={t("form-risk-probability")}
                        isRequired
                        error={
                          errors.riskProbability?.message
                            ? t(errors.riskProbability?.message)
                            : ""
                        }
                      />
                    )}
                  />
                )}
                {isViewForm && (
                  <div>
                    <Text className="mb-2 text-title">
                      {t("form-residual-risk")}
                    </Text>
                    {getResidualRiskOptionsBadge(
                      initialData?.residualRisk || "pending"
                    )}
                  </div>
                )}

                {!isViewForm && (
                  <Controller
                    control={control}
                    name="residualRisk"
                    render={({ field: { onChange, value } }) => (
                      <Select
                        label={t("form-residual-risk")}
                        labelClassName="text-title"
                        options={residualRiskOptions}
                        value={
                          residualRiskOptions.find(
                            (option) => option.value === value
                          ) || null
                        }
                        onChange={(selectedValue: any) => {
                          onChange(selectedValue.value)
                        }}
                        isLoading={isLoading}
                        isDisabled={isLoading}
                        placeholder={t("form-residual-risk")}
                        error={
                          errors.residualRisk?.message
                            ? t(errors.residualRisk?.message)
                            : ""
                        }
                      />
                    )}
                  />
                )}

                <Input
                  labelClassName="bg-paper"
                  label={t("form-mitigation-action")}
                  type="text"
                  {...register("mitigationAction")}
                  error={
                    errors.mitigationAction?.message
                      ? t(errors.mitigationAction?.message)
                      : ""
                  }
                  className="flex-grow"
                  disabled={isViewForm}
                  defaultValue={initialData?.mitigationAction}
                />
                {isViewForm && (
                  <div>
                    <Text className="mb-2 text-title">
                      {t("form-responsible-party")}
                    </Text>
                    <Input
                      className="flex-grow"
                      disabled
                      value={initialData?.responsibleParty}
                    />
                  </div>
                )}
                {isEditForm && (
                  <Input
                    label={t("form-responsible-party")}
                    labelClassName="bg-paper"
                    className="flex-grow"
                    disabled
                    value={initialData?.responsibleParty}
                    isRequired
                    error={
                      errors.responsibleParty?.message
                        ? t(errors.responsibleParty?.message)
                        : ""
                    }
                  />
                )}
                {!isViewForm && !isEditForm && (
                  // <Controller
                  //   control={control}
                  //   name="responsibleParty"
                  //   render={({ field: { onChange, value } }) => (
                  //     <Select
                  //       label={t("form-responsible-party")}
                  //       labelClassName="text-title"
                  //       options={employeeOptions}
                  //       value={FindSelectOption(employeeOptions, value)}
                  //       onChange={(selectedValue: any) => {
                  //         onChange(selectedValue.value)
                  //         setEmployeeName(selectedValue.label)
                  //       }}
                  //       isLoading={isLoading}
                  //       isDisabled={isLoading}
                  //       placeholder={t("form-responsible-party")}
                  //       isRequired
                  //       error={
                  //         errors.responsibleParty?.message
                  //           ? t(errors.responsibleParty?.message)
                  //           : ""
                  //       }
                  //     />
                  //   )}
                  // />
                  <Input
                    label={t("form-responsible-party")}
                    labelClassName="bg-paper"
                    className="flex-grow"
                    {...register("responsibleParty")}
                    isRequired
                    error={
                      errors.responsibleParty?.message
                        ? t(errors.responsibleParty?.message)
                        : ""
                    }
                  />
                )}

                <div>
                  <Controller
                    control={control}
                    name="mitigationDeadline"
                    render={({ field: { value, onChange } }) => (
                      <div className="relative">
                        <label
                          htmlFor="mitigationDeadline"
                          data-required
                          className="mb-2 block text-sm font-medium text-title transition-colors duration-200 [&[data-required=true]]:after:ml-1 [&[data-required=true]]:after:text-orange-500 [&[data-required=true]]:after:content-['*']">
                          {t("form-mitigation-deadline")}
                        </label>
                        <DatePicker
                          id="mitigationDeadline"
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
                  {errors.mitigationDeadline && (
                    <p className="text-sm text-red-500">
                      {errors.mitigationDeadline.message
                        ? t(errors.mitigationDeadline.message)
                        : ""}
                    </p>
                  )}
                </div>

                {isViewForm && (
                  <div>
                    <Text className="mb-2 text-title">
                      {t("form-mitigation-status")}
                    </Text>
                    {getMitigationStatusOptionsBadge(
                      initialData?.mitigationStatus || "pending"
                    )}
                  </div>
                )}
                {!isViewForm && (
                  <Controller
                    control={control}
                    name="mitigationStatus"
                    render={({ field: { onChange, value } }) => (
                      <Select
                        label={t("form-mitigation-status")}
                        labelClassName="text-title"
                        options={mitigationStatusOptions}
                        value={
                          mitigationStatusOptions.find(
                            (option) => option.value === value
                          ) || null
                        }
                        onChange={(selectedValue: any) => {
                          onChange(selectedValue.value)
                        }}
                        isLoading={isLoading}
                        isDisabled={isLoading}
                        placeholder={t("form-mitigation-status")}
                        isRequired
                        error={
                          errors.mitigationStatus?.message
                            ? t(errors.mitigationStatus?.message)
                            : ""
                        }
                      />
                    )}
                  />
                )}

                {isViewForm && (
                  <div>
                    <Text className="mb-2 text-title">
                      {t("form-risk-status")}
                    </Text>
                    {getRiskStatusOptionsBadge(
                      initialData?.riskStatus || "pending"
                    )}
                  </div>
                )}

                {!isViewForm && (
                  <Controller
                    control={control}
                    name="riskStatus"
                    render={({ field: { onChange, value } }) => (
                      <Select
                        label={t("form-risk-status")}
                        labelClassName="text-title"
                        options={riskStatusOptions}
                        value={
                          riskStatusOptions.find(
                            (option) => option.value === value
                          ) || null
                        }
                        onChange={(selectedValue: any) => {
                          onChange(selectedValue.value)
                        }}
                        isLoading={isLoading}
                        isDisabled={isLoading}
                        placeholder={t("form-risk-status")}
                        isRequired
                        error={
                          errors.riskStatus?.message
                            ? t(errors.riskStatus?.message)
                            : ""
                        }
                      />
                    )}
                  />
                )}

                <Textarea
                  labelClassName="bg-paper"
                  label={t("form-risk-description")}
                  {...register("riskDescription")}
                  error={
                    errors.riskDescription?.message
                      ? t(errors.riskDescription?.message)
                      : ""
                  }
                  className="flex-grow text-title"
                  disabled={isViewForm}
                />

                <Textarea
                  labelClassName="bg-paper"
                  label={t("form-comments")}
                  {...register("comments")}
                  error={
                    errors.comments?.message ? t(errors.comments?.message) : ""
                  }
                  className="flex-grow text-title"
                  disabled={isViewForm}
                />
                <Textarea
                  labelClassName="bg-paper"
                  label={t("form-follow-up-action")}
                  {...register("followUpAction")}
                  error={
                    errors.followUpAction?.message
                      ? t(errors.followUpAction?.message)
                      : ""
                  }
                  className="flex-grow text-title"
                  disabled={isViewForm}
                />
              </FormGroup>
            </FormGroupContainer>
            {!isViewForm && (
              <FormStickyActions
                isEditForm={isEditForm}
                backToListPath={
                  routes.scm.complianceAndRisk.riskEvaluation.riskEvaluation
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
