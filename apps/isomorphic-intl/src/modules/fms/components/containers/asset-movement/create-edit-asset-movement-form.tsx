"use client"

import { useRouter } from "next/navigation"

import { Form } from "@core/ui/form"
import dayjs from "dayjs"
import { useTranslations } from "next-intl"
import { Controller, SubmitHandler } from "react-hook-form"

import { DatePicker } from "@/components/base/date-picker"
import FormFooter from "@/components/base/form-footer"
import FormGroup from "@/components/base/form-group"
import FormGroupContainer from "@/components/base/form-group-container"
import { Input, Select } from "@/components/ui"
import Box from "@/components/ui/box"
import { useSharedDataHooks } from "@/modules/fms/constants/shared-data-hook"
import {
  useAssetMovementById,
  useCreateAssetMovement,
  useUpdateAssetMovement,
} from "@/modules/fms/hooks/use-asset-movement"
import { AssetList, AssetMovementList } from "@/modules/fms/types"
import {
  AssetMovementFormInput,
  assetMovementFormSchema,
} from "@/modules/fms/validators/asset-movement-schema"
import { useSelectOptions } from "@/hooks/use-select-options"
import { useAssetListWithoutMovement } from "@/modules/fms/hooks/use-asset"

interface PurposeOfMovementOptions {
  value: string
  label: string
}

const purposeOfMovementOptions: PurposeOfMovementOptions[] = [
  {
    value: "Transfer",
    label: "Transfer",
  },
  {
    value: "Receipt",
    label: "Receipt",
  },
  {
    value: "Issue",
    label: "Issue",
  }
]

export default function CreateEditAssetMovementForm({
  id,
  mode = "create",
}: {
  id?: number
  mode?: "create" | "edit" | "view"
}) {
  const router = useRouter()
  const t = useTranslations("form")
  const { company, assetLocation, employee } =
    useSharedDataHooks([
      "company",
      "assetLocation",
      "employee",
    ])

  const { companyOptions, isCompanyLoading } = company
  const { assetLocationOptions, isAssetLocationLoading } = assetLocation
  const { employeeOptions, isEmployeeLoading } = employee

  const { data: assetListWithoutMovement, isLoading: isAssetLoading } =
    useAssetListWithoutMovement({
      pageSize: 100,
    })
  const assetListWithoutMovementOptions = useSelectOptions<AssetList>(
    // @ts-ignore
    assetListWithoutMovement,
    "assetSerialNumber"
  )

  const { data: assetMovementById } = useAssetMovementById(id!)

  const isFieldDisabled = mode === "view"
  const isCreate = mode === "create"

  const {
    mutateAsync: createAssetMovement,
    isPending: isCreateAssetMovementLoading,
  } = useCreateAssetMovement()
  const {
    mutateAsync: updateAssetMovement,
    isPending: isUpdateAssetMovementLoading,
  } = useUpdateAssetMovement()

  const onSubmit: SubmitHandler<AssetMovementFormInput> = async (data) => {
    const formattedData = {
      ...data,
      id: id || 0,
      assetId: data.assetId || 0,
      assetLocationId: data.assetLocationId || 0,
      purposeOfMovement: data.purposeOfMovement || "",
      fromEmployeeId: data.fromEmployeeId || 0,
      fromEmployeeName: data.fromEmployeeName || "",
      toEmployeeId: data.toEmployeeId || 0,
      toEmployeeName: data.toEmployeeName || "",
      targetedLocationId: data.targetedLocationId || 0
    }

    if (id) {
      await updateAssetMovement({
        ...formattedData,
        id,
      })
    } else {
      await createAssetMovement(formattedData)
    }
  }

  const defaultValues: Partial<AssetMovementFormInput> = {
    companyId: 0,
    transactionDate: dayjs().format("YYYY-MM-DD"),
    purposeOfMovement: "",
    assetId: 0,
    assetLocationId: 0,
    assetLocationName: "",
    fromEmployeeId: 0,
    fromEmployeeName: "",
    toEmployeeId: 0,
    toEmployeeName: "",
    targetedLocationId: 0,
    targetedLocationName: "",
  }

  const formValues = id ? {
    ...defaultValues,
    ...assetMovementById,
    companyId: assetMovementById?.companyId || 0,
    assetId: assetMovementById?.assetId || 0,
    assetLocationId: assetMovementById?.assetLocationId || 0,
    fromEmployeeId: assetMovementById?.fromEmployeeId || 0,
    toEmployeeId: assetMovementById?.toEmployeeId || 0,
    targetedLocationId: assetMovementById?.targetedLocationId || 0,
    transactionDate: assetMovementById?.transactionDate || dayjs().format("YYYY-MM-DD"),
  } : defaultValues

  return (
    <Box>
      <Form<AssetMovementFormInput>
        validationSchema={assetMovementFormSchema}
        onSubmit={onSubmit}
        className="flex grow flex-col justify-between pt-7 @container @2xl:pt-9 @3xl:pt-11"
        useFormProps={{
          defaultValues: formValues,
          mode: "onChange",
          values: formValues as AssetMovementFormInput,
        }}>
        {({ control, formState: { errors }, setValue }) => {
          return (
            <>
              <FormGroupContainer>
                <FormGroup title={t("form-asset-movement-details")}>
                  {!isCreate && (
                    <Input
                      label={t("form-asset")}
                      labelClassName="text-title"
                      value={assetMovementById?.asset?.assetSerialNumber!}
                      disabled={true}
                    />
                  )}

                  {isCreate && (
                    <Controller
                      name="assetId"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <Select
                          label={t("form-asset")}
                          labelClassName="text-title"
                          options={assetListWithoutMovementOptions}
                          value={
                            assetListWithoutMovementOptions.find(
                              (option: any) => option.value === value
                            ) || null
                          }
                          onChange={(option: any) => {
                            onChange(option?.value)
                            if (option?.value) {
                              // @ts-ignore
                              const selectedAsset = assetListWithoutMovement?.find(
                                (asset: any) => asset.id === option.value
                              )
                              setValue(
                                "assetLocationId",
                                selectedAsset?.assetLocationId || 0
                              )
                              setValue(
                                "companyId",
                                selectedAsset?.companyId || 0
                              )
                              setValue(
                                "fromEmployeeId",
                                selectedAsset?.maintainerId || ""
                              )
                            }
                          }}
                          isRequired
                          isLoading={isAssetLoading}
                          isDisabled={isFieldDisabled || isAssetLoading}
                          placeholder={
                            isAssetLoading
                              ? "Loading assets..."
                              : t("form-select")
                          }
                          error={
                            errors.assetId?.message && t(errors.assetId.message)
                          }
                        />
                      )}
                    />
                  )}
                  <Controller
                    name="companyId"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        label={t("form-company-name")}
                        labelClassName="text-title"
                        options={companyOptions}
                        value={
                          companyOptions.find(
                            (option: any) => option.value === (value as number)
                          ) || null
                        }
                        onChange={(option: any) => onChange(option?.value)}
                        isRequired
                        isLoading={isCompanyLoading}
                        isDisabled={mode !== "create" && true || isCompanyLoading}
                        placeholder={
                          isCompanyLoading
                            ? "Loading companies..."
                            : t("form-select-company")
                        }
                        error={
                          errors.companyId?.message &&
                          t(errors.companyId.message)
                        }
                      />
                    )}
                  />
                  <Controller
                    name="transactionDate"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <DatePicker
                        inputProps={{
                          label: t("form-transaction-date"),
                        }}
                        value={value ? new Date(value) : new Date()}
                        placeholderText={t("form-select-date")}
                        onChange={(date: any) => {
                          const formattedDate = date
                            ? dayjs(date).format("YYYY-MM-DD")
                            : undefined
                          onChange(formattedDate)
                        }}
                        isRequired
                        popperPlacement="bottom-end"
                        disabled={isFieldDisabled}
                      />
                    )}
                  />
                  <Controller
                    name="purposeOfMovement"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        label={t("form-purpose-of-movement")}
                        labelClassName="text-title"
                        options={purposeOfMovementOptions}
                        value={
                          purposeOfMovementOptions.find(
                            (option: any) => option.value === value
                          ) || null
                        }
                        onChange={(option: any) => onChange(option?.value)}
                        isRequired
                        isDisabled={isFieldDisabled}
                        placeholder={t("form-select")}
                        error={
                          errors.purposeOfMovement?.message &&
                          t(errors.purposeOfMovement.message)
                        }
                      />
                    )}
                  />
                  <Controller
                    name="assetLocationId"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        label={t("form-asset-source-location")}
                        labelClassName="text-title"
                        options={assetLocationOptions}
                        value={
                          assetLocationOptions.find(
                            (option: any) => option.value === value
                          ) || null
                        }
                        onChange={(option: any) => onChange(option?.value)}
                        isRequired
                        isLoading={isAssetLocationLoading}
                        isDisabled={isFieldDisabled || isAssetLocationLoading}
                        placeholder={
                          isAssetLocationLoading
                            ? "Loading asset locations..."
                            : t("form-select")
                        }
                        error={
                          errors.assetLocationId?.message &&
                          t(errors.assetLocationId.message)
                        }
                      />
                    )}
                  />
                  <Controller
                    name="targetedLocationId"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        label={t("form-asset-targeted-location")}
                        labelClassName="text-title"
                        options={assetLocationOptions}
                        value={
                          assetLocationOptions.find(
                            (option: any) => option.value === value
                          ) || null
                        }
                        onChange={(option: any) => onChange(option?.value)}
                        isRequired
                        isLoading={isAssetLocationLoading}
                        isDisabled={isFieldDisabled || isAssetLocationLoading}
                        placeholder={
                          isAssetLocationLoading
                            ? "Loading asset locations..."
                            : t("form-select")
                        }
                        error={
                          errors.targetedLocationId?.message &&
                          t(errors.targetedLocationId.message)
                        }
                      />
                    )}
                  />
                  <Controller
                    name="fromEmployeeId"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        label={t("form-from-employee")}
                        labelClassName="text-title"
                        options={employeeOptions}
                        value={
                          employeeOptions.find(
                            (option: any) => option.value === value
                          ) || null
                        }
                        onChange={(option: any) => {
                          onChange(option?.value)
                          const selectedEmployee = employeeOptions.find(
                            (emp: any) => emp.value === option?.value
                          )
                          setValue(
                            "fromEmployeeName",
                            selectedEmployee?.label || ""
                          )
                        }}
                        isLoading={isEmployeeLoading}
                        isDisabled={isFieldDisabled || isEmployeeLoading}
                        placeholder={
                          isEmployeeLoading
                            ? "Loading employees..."
                            : t("form-select")
                        }
                        error={
                          errors.fromEmployeeId?.message &&
                          t(errors.fromEmployeeId.message)
                        }
                      />
                    )}
                  />
                  <Controller
                    name="toEmployeeId"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        label={t("form-to-employee")}
                        labelClassName="text-title"
                        options={employeeOptions}
                        value={
                          employeeOptions.find(
                            (option: any) => option.value === value
                          ) || null
                        }
                        onChange={(option: any) => {
                          onChange(option?.value)
                          const selectedEmployee = employeeOptions.find(
                            (emp: any) => emp.value === option?.value
                          )
                          setValue(
                            "toEmployeeName",
                            selectedEmployee?.label || ""
                          )
                        }}
                        isLoading={isEmployeeLoading}
                        isDisabled={isFieldDisabled || isEmployeeLoading}
                        placeholder={
                          isEmployeeLoading
                            ? "Loading employees..."
                            : t("form-select")
                        }
                        error={
                          errors.toEmployeeId?.message &&
                          t(errors.toEmployeeId.message)
                        }
                      />
                    )}
                  />
                </FormGroup>
              </FormGroupContainer>

              {mode !== "view" && (
                <FormFooter
                  isLoading={
                    isCreateAssetMovementLoading || isUpdateAssetMovementLoading
                  }
                  handleAltBtn={() => router.back()}
                  altBtnText={t("form-back")}
                  submitBtnText={
                    id
                      ? t("form-update-asset-movement")
                      : t("form-create-asset-movement")
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
