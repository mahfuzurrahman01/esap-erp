"use client"

import { useRouter } from "next/navigation"

import { Form } from "@core/ui/form"
import { useTranslations } from "next-intl"

import FormFooter from "@/components/base/form-footer"
import FormGroup from "@/components/base/form-group"
import FormGroupContainer from "@/components/base/form-group-container"
import { Select, Textarea } from "@/components/ui"
import Box from "@/components/ui/box"
import { modeOfPaymentFormSchema } from "@/modules/fms/validators/mode-of-payment-schema"

import { BasicInformationForm } from "./basic-information-form"
import { ModeOfPaymentFormProps } from "./types"
import { useModeOfPaymentForm } from "./use-mode-of-payment-form"
import { Controller } from "react-hook-form"

export default function CreateEditModeOfPaymentForm({
  id,
  mode = "create",
}: ModeOfPaymentFormProps) {
  const router = useRouter()
  const t = useTranslations("form")
  const {
    defaultValues,
    modeOfPaymentById,
    isFieldDisabled,
    onSubmit,
    isLoading,
    modeOfPaymentTypeOptions,
    companyOptions,
    isCompanyLoading,
    chartOfAccountOptions,
    isCOALoading,
    searchCOA,
  } = useModeOfPaymentForm({ id, mode })

  console.log("chartOfAccountOptions", chartOfAccountOptions)

  return (
    <Box>
      <Form
        validationSchema={modeOfPaymentFormSchema}
        useFormProps={{
          defaultValues,
          mode: "onChange",
          values: modeOfPaymentById,
        }}
        onSubmit={onSubmit}
        className="flex grow flex-col justify-between pt-7 @container @2xl:pt-9 @3xl:pt-11">
        {({ register, control, formState: { errors } }) => (
          <>
            <FormGroupContainer>
              <FormGroup title={t("form-information")}>
                <BasicInformationForm
                  register={register}
                  control={control}
                  errors={errors}
                  isFieldDisabled={isFieldDisabled}
                  modeOfPaymentTypeOptions={modeOfPaymentTypeOptions}
                />
              </FormGroup>

              <FormGroup
                title={t("form-accounts-head")}
                className="pt-7 @2xl:pt-10 @3xl:pt-11"
                childrenContainerClassName="@2xl:grid-cols-2">
                <Controller
                  name="companyId"
                  control={control}
                  defaultValue={
                    companyOptions?.data?.find((company: any) => company.isDefault)?.id ||
                    0
                  }
                  render={({ field: { value, onChange } }) => (
                    <Select
                      label={t("form-company-name")}
                      labelClassName="text-title"
                      menuPortalTarget={document.body}
                      options={companyOptions}
                      value={
                        value && companyOptions
                          ? companyOptions.find((option: any) => option.value === value)
                          : companyOptions?.find(
                            (option: any) =>
                              option.value ===
                              companyOptions?.data?.find(
                                (company: any) => company.isDefault
                              )?.id
                          ) || null
                      }
                      onChange={(option: any) => onChange(option.value)}
                      isLoading={isCompanyLoading}
                      isDisabled={isCompanyLoading || isFieldDisabled}
                      placeholder={
                        isCompanyLoading
                          ? "Loading companies..."
                          : t("form-select-company")
                      }
                      error={errors.companyId?.message && t(errors.companyId.message)}
                    />
                  )}
                />

                <Controller
                  name="chartOfAccountId"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      label={t("form-account-name")}
                      options={chartOfAccountOptions}
                      onSearch={searchCOA}
                      isLoading={isCOALoading}
                      isDisabled={isCOALoading || isFieldDisabled}
                      onChange={(selectedOption: any) => onChange(selectedOption?.value)}
                      value={
                        chartOfAccountOptions.find(
                          (option: any) => option.value == value
                        ) || null
                      }
                    />
                  )}
                />
              </FormGroup>

              <FormGroup
                title={t("form-comments")}
                className="pt-7 @2xl:pt-10 @3xl:pt-11"
                childrenContainerClassName="@2xl:grid-cols-1">
                <Textarea
                  {...register("comment")}
                  placeholder={t("form-enter-comments")}
                  className="w-full"
                  error={errors.comment?.message}
                  disabled={isFieldDisabled}
                />
              </FormGroup>
            </FormGroupContainer>

            {!isFieldDisabled && (
              <FormFooter
                isLoading={isLoading}
                altBtnText={t("form-cancel")}
                handleAltBtn={() => router.back()}
                submitBtnText={
                  id ? t("form-update") : t("form-create")
                }
              />
            )}
          </>
        )}
      </Form>
    </Box>
  )
}
