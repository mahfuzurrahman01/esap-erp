"use client"

import { Form } from "@core/ui/form"
import { useTranslations } from "next-intl"

import FormGroup from "@/components/base/form-group"
import FormGroupContainer from "@/components/base/form-group-container"
import Box from "@/components/ui/box"
import { AssetDepreciationList } from "@/modules/fms/types/asset-depreciation-schedule"
import { assetDepreciationListSchema } from "@/modules/fms/validators/asset-depreciation-schedule-schema"

import AssetDepreciationDetailsForm from "./asset-depreciation-details"
import { AssetDepreciationScheduleTable } from "./asset-depreciation-schedule-table"
import { BasicInformationForm } from "./basic-information-form"
import { AssetDepreciationFormProps } from "./types"
import { useAssetDepreciationForm } from "./use-asset-depreciation-form"

export default function AssetDepreciationForm({
  id,
}: AssetDepreciationFormProps) {
  const t = useTranslations("form")
  const {
    defaultValues,
    assetDepreciationById,
    isFieldDisabled,
    assetDepreciationDetails,
  } = useAssetDepreciationForm({ id })

  return (
    <Box>
      <Form<AssetDepreciationList>
        validationSchema={assetDepreciationListSchema}
        useFormProps={{
          defaultValues,
          mode: "onChange",
          values: assetDepreciationById,
        }}
        onSubmit={() => { }}
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
                />
              </FormGroup>

              <FormGroup
                title={t("form-depreciation-details")}
                className="pt-7 @2xl:pt-10 @3xl:pt-11">
                <AssetDepreciationDetailsForm
                  register={register}
                  control={control}
                  errors={errors}
                  isFieldDisabled={isFieldDisabled}
                />
              </FormGroup>

              <FormGroup
                title={t("form-depreciation-schedule")}
                className="pt-7 @2xl:pt-10 @3xl:pt-11"
                childrenContainerClassName="@2xl:grid-cols-1 @4xl:col-span-12">
                <AssetDepreciationScheduleTable
                  assetDepreciationDetails={assetDepreciationDetails}
                  isFieldDisabled={isFieldDisabled}
                />
              </FormGroup>
            </FormGroupContainer>
          </>
        )}
      </Form>
    </Box>
  )
}
