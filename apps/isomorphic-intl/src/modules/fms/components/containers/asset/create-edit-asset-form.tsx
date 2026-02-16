"use client"

import { useRouter } from "next/navigation"

import { Form } from "@core/ui/form"
import { useTranslations } from "next-intl"
import { Controller, SubmitHandler } from "react-hook-form"

import FormFooter from "@/components/base/form-footer"
import FormGroup from "@/components/base/form-group"
import FormGroupContainer from "@/components/base/form-group-container"
import { Checkbox, Select } from "@/components/ui"
import Box from "@/components/ui/box"
import {
  useAssetById,
  useCreateAsset,
  useUpdateAsset,
} from "@/modules/fms/hooks/use-asset"
import { AssetList } from "@/modules/fms/types"
import {
  AssetFormInput,
  assetFormSchema,
} from "@/modules/fms/validators/asset-schema"

import AssetDepreciation from "./form-details/asset-depreciation"
import AssetDetailsForm from "./form-details/asset-details-form"
import AssetInsuranceDetails from "./form-details/asset-insurance-details"
import AssetPurchaseDetails from "./form-details/asset-purchase-details"
import { useAtomValue } from "jotai"
import { isProductAvailableAtom } from "@/modules/fms/store/asset-store"
import Image from "next/image"
import FileUpload from "@/components/base/file-upload"

interface AssetStatusOptions {
  value: string
  label: string
}

const assetStatusOptions: AssetStatusOptions[] = [
  {
    value: "Draft",
    label: "Draft",
  },
  {
    value: "Submitted",
    label: "Submitted",
  },
  {
    value: "Partially Depreciated",
    label: "Partially Depreciated",
  },
  {
    value: "Fully Depreciated",
    label: "Fully Depreciated",
  },
  {
    value: "Sold",
    label: "Sold",
  },
  {
    value: "Scrapped",
    label: "Scrapped",
  },
  {
    value: "In Maintenance",
    label: "In Maintenance",
  },
]
export default function CreateEditAssetForm({
  id,
  mode = "create",
}: {
  id?: number
  mode?: "create" | "edit" | "view"
}) {
  const router = useRouter()
  const t = useTranslations("form")

  const { data: assetById } = useAssetById(Number(id))
  const isProductAvailable = useAtomValue(isProductAvailableAtom) && !id

  const isFieldDisabled = mode === "view"

  const { mutateAsync: createAsset, isPending: isCreateAssetLoading } =
    useCreateAsset()
  const { mutateAsync: updateAsset, isPending: isUpdateAssetLoading } =
    useUpdateAsset()

  const onSubmit: SubmitHandler<AssetFormInput> = async (data) => {
    const formattedData: AssetList = {
      ...data,
      id: id || 0,
      assetStatus: mode === "create" ? "Submitted" : data.assetStatus,
      companyId: data.companyId || 0,
      productId: data.productId || 0,
      assetCategoryId: data.assetCategoryId || 0,
      purchaseInvoiceId: data.purchaseInvoiceId || 0,
      purchaseInvoiceNo: data.purchaseInvoiceNo || "",
      availableForUseDate: data.availableForUseDate || "",
      grossPurchaseAmount: data.grossPurchaseAmount || 0,
      assetQuantity: data.assetQuantity || 0,
      isExistingAsset: data.isExistingAsset || false,
      isCompositeAsset: data.isCompositeAsset || false,
      isCalculatedDepreciation: data.isCalculatedDepreciation || false,
      openingAccumulatedDepreciation:
        data.openingAccumulatedDepreciation || null,
      openingNumberOfBookDepreciation:
        data.openingNumberOfBookDepreciation || null,
      isFullyDepreciated: data.isFullyDepreciated || false,
      financeBookId: data.financeBookId || 0,
      financeBookName: data.financeBookName || "",
      depreciationMethod: data.depreciationMethod || "",
      totalDepreciationPeriod: data.totalDepreciationPeriod || 0,
      frequencyOfDepreciation: data.frequencyOfDepreciation || 0,
      depreciationStartDate: data.depreciationStartDate || "",
      expectedResidualValue: data.expectedResidualValue || 0,
      insurancePolicyNumber: data.insurancePolicyNumber || "",
      insuranceCompanyName: data.insuranceCompanyName || "",
      insurancePolicyStartDate: data.insurancePolicyStartDate || "",
      insurancePolicyEndDate: data.insurancePolicyEndDate || "",
      insuranceAmount: Number(data.insuranceAmount) || 0,
      isMaintenanceRequired: data.isMaintenanceRequired || false,
    } as AssetList

    if (id) {
      await updateAsset({ id, ...formattedData })
    } else {
      await createAsset(formattedData)
    }
  }

  const defaultValues: Partial<AssetFormInput> = {
    assetName: "",
    assetCategoryId: 0,
    assetStatus: "Draft",
    assetLocationId: 0,
    assetLocation: null,
    purchaseInvoiceId: null,
    purchaseInvoiceNo: null,
    availableForUseDate: null,
    grossPurchaseAmount: 0,
    assetQuantity: 1,
    productId: 0,
    productName: null,
    companyId: 0,
    maintainerId: 0,
    maintainerName: null,
    isExistingAsset: false,
    isCompositeAsset: false,
    isCalculatedDepreciation: false,
    openingAccumulatedDepreciation: 0,
    openingNumberOfBookDepreciation: 0,
    isFullyDepreciated: false,
    financeBookId: null,
    financeBookName: null,
    depreciationMethod: "Straight Line",
    totalDepreciationPeriod: 0,
    frequencyOfDepreciation: 0,
    depreciationStartDate: null,
    expectedResidualValue: 0,
    insurancePolicyNumber: null,
    insuranceCompanyName: null,
    insurancePolicyStartDate: null,
    insurancePolicyEndDate: null,
    insuranceAmount: null,
    isMaintenanceRequired: false,
  }

  return (
    <Box>
      <Form<AssetFormInput>
        validationSchema={assetFormSchema}
        onSubmit={onSubmit}
        className="flex grow flex-col justify-between pt-7 @container @2xl:pt-9 @3xl:pt-11"
        useFormProps={{
          defaultValues: defaultValues,
          mode: "onChange",
          values: assetById as AssetFormInput,
        }}>
        {({ control, register, formState, trigger, setValue, watch }) => {
          const handleFileUpload = (files: File[]) => {
            if (files && files.length > 0) {
              setValue("assetImageFile", files[0], {
                shouldValidate: true,
                shouldDirty: true,
              })
              const imageUrl = URL.createObjectURL(files[0])
              setValue("assetImageUrl", imageUrl, {
                shouldValidate: true,
                shouldDirty: true,
              })
            }
          }

          return (
            <>
              <FormGroupContainer>
                <AssetDetailsForm
                  formMethods={{
                    register,
                    control,
                    formState,
                    trigger,
                    setValue,
                    watch,
                  }}
                  isFieldDisabled={isFieldDisabled}
                  assetById={assetById}
                  mode={mode}
                />

                <AssetPurchaseDetails
                  formMethods={{
                    register,
                    control,
                    formState,
                    watch,
                  }}
                  isFieldDisabled={isFieldDisabled}
                  mode={mode}
                />

                <AssetDepreciation
                  formMethods={{
                    register,
                    control,
                    formState,
                    watch,
                  }}
                  isFieldDisabled={isFieldDisabled}
                  mode={mode}
                />

                <AssetInsuranceDetails
                  formMethods={{
                    register,
                    control,
                    formState,
                    watch,
                  }}
                  isFieldDisabled={isFieldDisabled}
                />

                <FormGroup
                  title={t("form-maintenance-details")}
                  className="pt-7 @2xl:pt-9 @3xl:pt-11">
                  <Controller
                    name="isMaintenanceRequired"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <Checkbox
                        label={t("form-is-maintenance-required")}
                        helperText={t("form-is-maintenance-description")}
                        checked={value || false}
                        onChange={(e: any) => {
                          onChange(e)
                        }}
                        disabled={isFieldDisabled}
                      />
                    )}
                  />
                </FormGroup>

                <FormGroup
                  title={t("form-other-details")}
                  className="pt-7 @2xl:pt-9 @3xl:pt-11">
                  <Controller
                    name="assetStatus"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        label={t("form-asset-status")}
                        labelClassName="text-title"
                        options={assetStatusOptions}
                        defaultValue={assetStatusOptions[0]}
                        value={
                          assetStatusOptions.find(
                            (option: any) => option.value === value
                          ) || null
                        }
                        onChange={(option: any) => onChange(option?.value)}
                        isDisabled={isFieldDisabled}
                        placeholder={t("form-select-asset-status")}
                        error={
                          formState.errors.assetStatus?.message &&
                          t(formState.errors.assetStatus.message)
                        }
                      />
                    )}
                  />
                </FormGroup>
                <FormGroup
                  title={t("form-attachments")}
                  className="pt-7 @2xl:pt-9 @3xl:pt-11">
                  {assetById?.assetImageUrl && (
                    <div className="col-span-full size-full max-h-[400px] w-full shrink-0 grow-0 basis-auto @2xl:p-0">
                      <div className="w-[400px] h-[300px]">
                        <Image
                          src={assetById?.assetImageUrl}
                          alt="Asset Image"
                          width={400}
                          height={400}
                          className="size-full rounded-lg object-cover"
                        />
                      </div>
                    </div>
                  )}
                  {!isFieldDisabled && (
                    <Controller
                      name="assetImageFile"
                      control={control}
                      render={() => (
                        <FileUpload
                          multiple
                          onUpload={handleFileUpload}
                          btnLabel={t("form-upload")}
                          className="col-span-full w-full @2xl:p-0"
                        />
                      )}
                    />
                  )}
                </FormGroup>
              </FormGroupContainer>

              {mode !== "view" && (
                <FormFooter
                  isLoading={isCreateAssetLoading || isUpdateAssetLoading}
                  handleAltBtn={() => router.back()}
                  altBtnText={t("form-back")}
                  submitBtnText={
                    id ? t("form-update-asset") : t("form-new-asset")
                  }
                  className="border-gray-500/20 dark:bg-paper"
                  isDisabled={isProductAvailable}
                />
              )}
            </>
          )
        }}
      </Form>
    </Box>
  )
}
