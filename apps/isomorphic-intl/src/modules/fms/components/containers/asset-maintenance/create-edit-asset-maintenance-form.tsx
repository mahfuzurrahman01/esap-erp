"use client"

import { useRouter } from "next/navigation"

import { Form } from "@core/ui/form"
import { useTranslations } from "next-intl"

import FormFooter from "@/components/base/form-footer"
import FormGroup from "@/components/base/form-group"
import FormGroupContainer from "@/components/base/form-group-container"
import { Textarea } from "@/components/ui"
import Box from "@/components/ui/box"
import {
  AssetMaintenanceSchema,
  assetMaintenanceSchema,
} from "@/modules/fms/validators/asset-maintenance-schema"

import { AssetMaintenanceDetailsTable } from "./asset-maintenance-details-table"
import { BasicInformationForm } from "./basic-information-form"
import { AssetMaintenanceFormProps } from "./types"
import { useAssetMaintenanceForm } from "./use-asset-maintenance-form"

export default function CreateEditAssetMaintenanceForm({
  id,
  mode = "create",
}: AssetMaintenanceFormProps) {
  const router = useRouter()
  const t = useTranslations("form")
  const {
    defaultValues,
    assetMaintenanceById,
    isFieldDisabled,
    assetMaintenanceDetails,
    handleRowChange,
    handleRowDelete,
    addNewRow,
    onSubmit,
    isLoading,
  } = useAssetMaintenanceForm({ id, mode })

  return (
    <Box>
      <Form<AssetMaintenanceSchema>
        validationSchema={assetMaintenanceSchema}
        useFormProps={{
          defaultValues,
          mode: "onChange",
          values: assetMaintenanceById,
        }}
        onSubmit={onSubmit}
        className="flex grow flex-col justify-between pt-7 @container @2xl:pt-9 @3xl:pt-11">
        {({ register, setValue, control, formState: { errors } }) => {
          return (
            <>
              <FormGroupContainer>
                <FormGroup title={t("form-information")}>
                  <BasicInformationForm
                    register={register}
                    control={control}
                    setValue={setValue}
                    errors={errors}
                    isFieldDisabled={isFieldDisabled}
                  />
                </FormGroup>

                <FormGroup
                  title={t("form-assets-maintenance-details")}
                  className="pt-7 @2xl:pt-10 @3xl:pt-11"
                  childrenContainerClassName="@2xl:grid-cols-1 @4xl:col-span-12">
                  <AssetMaintenanceDetailsTable
                    assetMaintenanceDetails={assetMaintenanceDetails}
                    isFieldDisabled={isFieldDisabled}
                    onRowChange={handleRowChange}
                    onRowDelete={handleRowDelete}
                    onAddRow={addNewRow}
                  />
                </FormGroup>

                <FormGroup
                  title={t("form-comments")}
                  className="pt-7 @2xl:pt-10 @3xl:pt-11"
                  childrenContainerClassName="@2xl:grid-cols-1">
                  <Textarea
                    {...register("comments")}
                    placeholder={t("form-enter-comments")}
                    className="w-full"
                    error={errors.comments?.message}
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
                    id
                      ? t("form-update-asset-maintenance")
                      : t("form-create-asset-maintenance")
                  }
                />
              )}
            </>
          )
        }}
      </Form>
    </Box>
  )
}
