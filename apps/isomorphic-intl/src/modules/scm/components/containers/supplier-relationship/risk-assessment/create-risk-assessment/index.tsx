"use client"

import { Form } from "@core/ui/form"
import { useTranslations } from "next-intl"
import { Controller, SubmitHandler } from "react-hook-form"

import FormGroup from "@/components/base/form-group"
import FormGroupContainer from "@/components/base/form-group-container"
import FormStickyActions from "@/components/base/form-sticky-actions"
import { Select, Textarea } from "@/components/ui"
import Box from "@/components/ui/box"
import { useSelectOptions } from "@/hooks/use-select-options"
import { useSupplierList } from "@/modules/scm/hooks/procurement/supplier/use-supplier"
import {
  useCreateRiskAssessment,
  useUpdateRiskAssessment,
} from "@/modules/scm/hooks/supplier-relationship/risk-assessment/use-risk-assessment"
import { RiskAssessment } from "@/modules/scm/types/supplier-relationship/risk-assessment/risk-assessment-types"
import {
  RiskAssessmentFormInput,
  RiskAssessmentSchema,
} from "@/modules/scm/validators/supplier-relationship/risk-assessment.shcema"

import { riskStatusOptions, riskTypeOptions } from "./data-options"
import { defaultRiskAssessment } from "./form-utils"
import { GetMenuListStyles } from "@/modules/scm/utils/select-options"
import { routes } from "@/config/routes"

type IndexProps =
  | {
      initialData?: RiskAssessment
      isEditForm?: true
    }
  | {
      initialData?: undefined
      isEditForm?: false
    }

export default function RiskAssessmentCreateEdit({
  initialData,
  isEditForm,
}: IndexProps) {
  const t = useTranslations("form")

  const { data: supplierData, isLoading: isSupplierLoading } = useSupplierList()

  const supplierOptions = useSelectOptions(supplierData?.data, "supplierName")

  const {
    mutateAsync: createRiskAssessment,
    isPending: isCreateRiskAssessmentLoading,
  } = useCreateRiskAssessment()
  const {
    mutateAsync: updateRiskAssessment,
    isPending: isUpdateRiskAssessmentLoading,
  } = useUpdateRiskAssessment()

  const onSubmit: SubmitHandler<RiskAssessment> = async (data) => {
    if (isEditForm) {
      await updateRiskAssessment({ data: { ...data } })
    } else {
      await createRiskAssessment(data)
    }
  }
  return (
    <Box>
      <Form<RiskAssessment>
        onSubmit={onSubmit}
        validationSchema={RiskAssessmentSchema}
        className="flex grow flex-col justify-between pt-7 @container @2xl:pt-9 @3xl:pt-11"
        useFormProps={{
          mode: "onChange",
          defaultValues: defaultRiskAssessment || initialData,
          reValidateMode: "onChange",
          values: initialData,
        }}>
        {({ control, register, formState: { errors } }) => (
          <>
            <FormGroupContainer>
              <FormGroup title={t("form-risk-assessment-create")}>
                <Controller
                  control={control}
                  name="supplierId"
                  render={({ field: { onChange, value } }) => (
                    <Select
                      isRequired
                      label={t("form-supplier")}
                      labelClassName="text-title"
                      options={supplierOptions}
                      value={
                        supplierOptions.find(
                          (option) => option.value === value
                        ) || null
                      }
                      onChange={(option: any) => onChange(option?.value)}
                      isLoading={isSupplierLoading}
                      isDisabled={isSupplierLoading || isEditForm}
                      placeholder={t("form-supplier")}
                      menuPortalTarget={document.body}
                      styles={
                        supplierOptions.length > 4
                          ? {
                              menuList: (base: any) => ({
                                ...base,
                                maxHeight: "160px",
                                overflow: "auto",
                              }),
                            }
                          : {}
                      }
                      error={
                        errors.supplierId?.message
                          ? t(errors.supplierId.message)
                          : ""
                      }
                      
                    />
                  )}
                />
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
                      onChange={(option: any) => onChange(option?.value)}
                      placeholder={t("form-risk-type")}
                      menuPortalTarget={document.body}
                      styles={
                        riskTypeOptions.length > 4
                          ? {
                              menuList: (base: any) => ({
                                ...base,
                                maxHeight: "160px",
                                overflow: "auto",
                              }),
                            }
                          : {}
                      }
                      error={
                        errors.riskType?.message
                          ? t(errors.riskType.message)
                          : ""
                      }
                      isRequired
                    />
                  )}
                />
                <Textarea
                  labelClassName="bg-paper"
                  label={t("form-description")}
                  {...register("riskDescription")}
                  error={
                    errors.riskDescription?.message
                      ? t(errors.riskDescription.message)
                      : ""
                  }
                  className="flex-grow text-title"
                />

                <Textarea
                  labelClassName="bg-paper"
                  label={t("form-mitigation-plan")}
                  {...register("mitigationPlan")}
                  error={
                    errors.mitigationPlan?.message
                      ? t(errors.mitigationPlan.message)
                      : ""
                  }
                  className="flex-grow text-title"
                />
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
                      onChange={(option: any) => onChange(option?.value)}
                      placeholder={t("form-risk-status")}
                      menuPortalTarget={document.body}
                      styles={GetMenuListStyles(riskStatusOptions.length)}
                      error={
                        errors.riskStatus?.message
                          ? t(errors.riskStatus.message)
                          : ""
                      }
                      isRequired
                    />
                  )}
                />
              </FormGroup>
            </FormGroupContainer>
            <FormStickyActions
              isEditForm={isEditForm}
              backToListPath={
                routes.scm.supplierRelationship.riskAssessment.riskAssessment
              }
              isLoading={
                isCreateRiskAssessmentLoading || isUpdateRiskAssessmentLoading
              }
              className="mt-7"
            />
          </>
        )}
      </Form>
    </Box>
  )
}
