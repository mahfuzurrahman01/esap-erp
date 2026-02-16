"use client"

import { Form } from "@core/ui/form"
import { useTranslations } from "next-intl"
import { Controller, SubmitHandler } from "react-hook-form"
import { Checkbox, Grid } from "rizzui"

import FormFooter from "@/components/base/form-footer"
import FormGroup from "@/components/base/form-group"
import FormGroupContainer from "@/components/base/form-group-container"
import { Input, Textarea } from "@/components/ui"
import Box from "@/components/ui/box"
import {
  useCreateTermsAndConditions,
  useTermsAndConditionsById,
  useUpdateTermsAndConditions,
} from "@/modules/fms/hooks/use-terms-and-conditions"
import { TermsAndConditionsList } from "@/modules/fms/types"
import {
  TermsAndConditionsFormInput,
  termsAndConditionsFormSchema,
} from "@/modules/fms/validators/terms-and-conditions-schema"

export default function CreateEditTermsAndConditionsForm({
  id,
  mode = "create",
}: {
  id?: number
  mode?: "create" | "edit" | "view"
}) {
  const t = useTranslations("form")

  const { data: termsAndConditionsById } = useTermsAndConditionsById(Number(id))

  const isFieldDisabled = mode === "view"

  const {
    mutateAsync: createTermsAndConditions,
    isPending: isCreateTermsAndConditionsLoading,
  } = useCreateTermsAndConditions()
  const {
    mutateAsync: updateTermsAndConditions,
    isPending: isUpdateTermsAndConditionsLoading,
  } = useUpdateTermsAndConditions()

  const onSubmit: SubmitHandler<TermsAndConditionsFormInput> = async (data) => {
    const formattedData = {
      ...data,
      id: id || 0,
      termsAndConditionName: data.termsAndConditionName,
      isActive: data.isActive || false,
      isSelling: data.isSelling || false,
      isBuying: data.isBuying || false,
      description: data.description || "",
    }

    if (id) {
      await updateTermsAndConditions({
        id,
        data: formattedData,
      })
    } else {
      await createTermsAndConditions(formattedData)
    }
  }

  const defaultValues: Partial<TermsAndConditionsFormInput> = {
    termsAndConditionName: "",
    isActive: false,
    isSelling: false,
    isBuying: false,
    description: "",
  }

  return (
    <Box>
      <Form<TermsAndConditionsFormInput>
        validationSchema={termsAndConditionsFormSchema}
        onSubmit={onSubmit}
        className="flex grow flex-col justify-between pt-7 @container @2xl:pt-9 @3xl:pt-11"
        useFormProps={{
          defaultValues: defaultValues || termsAndConditionsById,
          mode: "onChange",
          reValidateMode: "onChange",
          values: termsAndConditionsById as TermsAndConditionsList,
        }}>
        {({ control, register, formState: { errors } }) => {
          return (
            <>
              <FormGroupContainer>
                <FormGroup title={t("form-terms-and-conditions-details")}>
                  <Input
                    {...register("termsAndConditionName")}
                    label={t("form-terms-and-conditions-name")}
                    placeholder={t("form-enter-terms-and-conditions-name")}
                    error={errors.termsAndConditionName?.message}
                    disabled={isFieldDisabled}
                  />
                  <Grid columns="3" className="col-span-2">
                    <Controller
                      name="isActive"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <Checkbox
                          label={t("form-is-active")}
                          size="md"
                          checked={value ?? false}
                          onChange={onChange}
                          disabled={isFieldDisabled}
                        />
                      )}
                    />
                    <Controller
                      name="isSelling"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <Checkbox
                          label={t("form-is-selling")}
                          size="md"
                          checked={value}
                          onChange={onChange}
                          disabled={isFieldDisabled}
                        />
                      )}
                    />
                    <Controller
                      name="isBuying"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <Checkbox
                          label={t("form-is-buying")}
                          size="md"
                          checked={value}
                          onChange={onChange}
                          disabled={isFieldDisabled}
                        />
                      )}
                    />
                  </Grid>
                </FormGroup>
                <FormGroup
                  title={t("form-description")}
                  className="pt-7 @2xl:pt-9 @3xl:pt-11"
                  childrenContainerClassName="@2xl:grid-cols-1 @4xl:col-span-8">
                  <Textarea
                    {...register("description")}
                    label={t("form-description")}
                    placeholder={t("form-enter-description")}
                    error={errors.description?.message}
                    disabled={isFieldDisabled}
                    className="col-span-full"
                  />
                  {/* <Controller
                    control={control}
                    name="description"
                    render={({ field: { onChange, value } }) => (
                      <div>
                        <label className="mb-1.5 block font-medium text-gray-900 dark:text-gray-0">
                          {t("form-description")}
                        </label>
                        <QuillEditor
                          value={value}
                          onChange={onChange}
                          className="col-span-full text-gray-900 dark:text-gray-0 [&_.ql-editor]:min-h-[100px]"
                          disabled={isFieldDisabled}
                          error={
                            errors?.description?.message &&
                            t(errors?.description?.message)
                          }
                        />
                      </div>
                    )}
                  /> */}
                </FormGroup>
              </FormGroupContainer>

              {mode !== "view" && (
                <FormFooter
                  isLoading={
                    isCreateTermsAndConditionsLoading ||
                    isUpdateTermsAndConditionsLoading
                  }
                  altBtnText={t("form-back")}
                  submitBtnText={
                    id
                      ? t("form-update-terms-and-conditions")
                      : t("form-create-terms-and-conditions")
                  }
                  className="border-gray-500/20 dark:bg-paper"
                />
              )}
            </>
          )
        }}
      </Form>
    </Box>
  )
}
