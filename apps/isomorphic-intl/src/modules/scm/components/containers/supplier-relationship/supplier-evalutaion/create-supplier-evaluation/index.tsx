"use client"

import { Form } from "@core/ui/form"
import { useTranslations } from "next-intl"
import { Controller } from "react-hook-form"


import { DatePicker } from "@/components/base/date-picker"
import FormGroup from "@/components/base/form-group"
import FormGroupContainer from "@/components/base/form-group-container"
import FormStickyActions from "@/components/base/form-sticky-actions"
import { Input, Select, Textarea } from "@/components/ui"
import Box from "@/components/ui/box"
import { routes } from "@/config/routes"
import { useSelectOptions } from "@/hooks/use-select-options"
import { useSupplierList } from "@/modules/scm/hooks/procurement/supplier/use-supplier"
import {
  CreateSupplierEvaluationInput,
  SupplierEvaluation,
} from "@/modules/scm/types/supplier-relationship/supplier-evaluation/supplier-evaluation-types"
import {
  FindSelectOption,
  GetMenuListStyles,
} from "@/modules/scm/utils/select-options"
import { SupplierEvaluationSchema } from "@/modules/scm/validators/supplier-relationship/supplier-evaluation.shcema"

import { calculateAverageScore } from "./utils"
import { useSupplierEvaluationForm } from "./use-supplier-evaluation-form"
import { EvaluationCriteriaTable } from "./evaluation-criteria-list/evaluation-criteria-table"

type IndexProps =
  | {
      initialData?: SupplierEvaluation
      isEditForm?: true
      isViewForm?: false
    }
  | {
      initialData?: any
      isEditForm?: false
      isViewForm?: false
    }
  | {
      initialData?: SupplierEvaluation
      isEditForm?: false
      isViewForm?: true
    }

export default function SupplierEvaluationCreateEdit({
  initialData,
  isEditForm,
  isViewForm,
}: IndexProps) {
  const t = useTranslations("form")

  const {
    onSubmit,
    evaluationCriteria,
    handleEvaluationCriteriaChange,
    handleEvaluationCriteriaDelete,
    handleEvaluationCriteriaAdd,
    getFormValues,
    isLoading: isCreateSupplierEvaluationLoading,
  } = useSupplierEvaluationForm({
    id: initialData?.id ?? 0,
    mode: isEditForm ? "edit" : "create",
  })

  const { data: supplierData, isLoading: isSupplierLoading } = useSupplierList({
    pageSize: 200,
  })

  const supplierOptions = useSelectOptions(supplierData?.data, "supplierName")


  return (
    <Box>
      <Form<CreateSupplierEvaluationInput>
        onSubmit={onSubmit}
        validationSchema={SupplierEvaluationSchema}
        className="flex grow flex-col justify-between pt-7 @container @2xl:pt-9 @3xl:pt-11"
        useFormProps={{
          mode: "onChange",
          reValidateMode: "onChange",
          defaultValues: getFormValues(),
          values: getFormValues(),
        }}>
        {({ register, control, formState: { errors }, setValue }) => (
          <>
            <FormGroupContainer>
              <FormGroup title={t("form-supplier-evaluation-information")}>
                <Input
                  isRequired
                  labelClassName="bg-paper"
                  label={t("form-evaluator-name")}
                  {...register("evaluatorName")}
                  error={
                    errors.evaluatorName?.message
                      ? t(errors.evaluatorName.message)
                      : ""
                  }
                  className="flex-grow"
                  disabled={isViewForm}
                />
                <Controller
                  control={control}
                  name="supplierId"
                  render={({ field: { onChange, value } }) => (
                    <Select
                      label={t("form-supplier")}
                      placeholder={t("form-supplier")}
                      labelClassName="text-title"
                      options={supplierOptions}
                      onChange={(option: any) => onChange(option?.value)}
                      value={FindSelectOption(supplierOptions, value)}
                      isLoading={isSupplierLoading}
                      isDisabled={isSupplierLoading || true || isViewForm}
                      error={
                        errors?.supplierId?.message
                          ? t(errors.supplierId.message)
                          : ""
                      }
                      menuPortalTarget={document.body}
                      styles={GetMenuListStyles(supplierOptions.length)}
                    />
                  )}
                />
                <div>
                  <Controller
                    control={control}
                    name="evaluationDate"
                    render={({ field: { value, onChange } }) => (
                      <div className="relative">
                        <label
                          htmlFor="evaluationDate"
                          className="mb-2 block text-sm font-medium text-title transition-colors duration-200">
                          {t("form-evaluation-date")}{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <DatePicker
                          id="evaluationDate"
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
                  {errors.evaluationDate && (
                    <p className="text-sm text-red-500">
                      {errors.evaluationDate.message}
                    </p>
                  )}
                </div>
                <Input
                  label={t("form-overall-score")}
                  value={
                    evaluationCriteria.length > 0 ? calculateAverageScore(evaluationCriteria, 1, 100).average : 0
                  }
                  error={
                    errors.overallScore?.message
                      ? t(errors.overallScore.message)
                      : ""
                  }
                  disabled={isViewForm}
                />
                <Textarea
                  labelClassName="bg-paper"
                  label={t("form-comments")}
                  {...register("comments")}
                  error={
                    errors.comments?.message ? t(errors.comments.message) : ""
                  }
                  className="flex-grow text-title"
                  disabled={isViewForm}
                />
              </FormGroup>
              <FormGroup
                title={t("form-evaluation-criteria")}
                className="pt-7 @2xl:pt-10 @3xl:pt-11"
                childrenContainerClassName="@2xl:grid-cols-1 @4xl:col-span-12">
                <EvaluationCriteriaTable
                  data={evaluationCriteria}
                  onRowChange={handleEvaluationCriteriaChange}
                  onRowDelete={handleEvaluationCriteriaDelete}
                  onAddRow={handleEvaluationCriteriaAdd}
                  setValue={setValue}
                  isFieldDisabled={isViewForm}
                />
              </FormGroup>
            </FormGroupContainer>
            {!isViewForm && (
              <FormStickyActions
                isEditForm={isEditForm}
                isLoading={isCreateSupplierEvaluationLoading}
                className="mt-7"
                backToListPath={routes.scm.supplierRelationship.evaluationHistory.evaluationHistory}
              />
            )}
          </>
        )}
      </Form>
    </Box>
  )
}
