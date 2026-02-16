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
import { Input, Select, Textarea } from "@/components/ui"
import Box from "@/components/ui/box"
import { useSharedDataHooks } from "@/modules/fms/constants/shared-data-hook"
import {
  useAssetRepairById,
  useCreateAssetRepair,
  useUpdateAssetRepair,
} from "@/modules/fms/hooks/use-asset-repair"
import {
  AssetRepairFormInput,
  assetRepairFormSchema,
} from "@/modules/fms/validators/asset-repair-schema"
import { useInvoiceList } from "@/modules/scm/hooks"
import { Invoice } from "@/modules/scm/types/procurement/invoice/invoice-types"

const assetRepairStatusOptions = [
  { value: "Pending", label: "Pending" },
  { value: "In Progress", label: "In Progress" },
  { value: "Completed", label: "Completed" },
  { value: "Cancelled", label: "Cancelled" },
]

export default function CreateEditAssetForm({
  id,
  mode = "create",
}: {
  id?: number
  mode?: "create" | "edit" | "view"
}) {
  const t = useTranslations("form")
  const router = useRouter()
  const { coa, company, asset } = useSharedDataHooks([
    "coa",
    "company",
    "asset",
  ])
  const { coaOptions, isCOALoading } = coa
  const { companyOptions, isCompanyLoading } = company
  const { assetOptions, assetList, isAssetLoading } = asset

  const { data: purchaseInvoice, isLoading: isPurchaseInvoiceLoading } =
    useInvoiceList()

  const { data: assetRepairById } = useAssetRepairById(Number(id))

  const isFieldDisabled = mode === "view"
  const isFieldCreate = mode === "create"

  const {
    mutateAsync: createAssetRepair,
    isPending: isCreateAssetRepairLoading,
  } = useCreateAssetRepair()
  const {
    mutateAsync: updateAssetRepair,
    isPending: isUpdateAssetRepairLoading,
  } = useUpdateAssetRepair()

  const onSubmit: SubmitHandler<AssetRepairFormInput> = async (data) => {
    const formattedData = {
      ...data,
      completionDate: data.completionDate || dayjs().format("YYYY-MM-DD"),
      repairDate: data.repairDate || dayjs().format("YYYY-MM-DD"),
      failureDate: data.failureDate || dayjs().format("YYYY-MM-DD"),
      purchaseInvoiceNo: data.purchaseInvoiceNo || "",
      repairCost: data.repairCost || 0,
      repairDescription: data.repairDescription || "",
      repairStatus: data.repairStatus || "Pending",
    }

    if (id) {
      await updateAssetRepair({ id, ...formattedData })
    } else {
      await createAssetRepair(formattedData)
    }
  }

  const defaultValues: Partial<AssetRepairFormInput> = {
    failureDate: "",
    repairStatus: "Pending",
    completionDate: "",
    repairDate: "",
    purchaseInvoiceNo: "",
    repairCost: 0,
    repairDescription: "",
    expenseAccountId: 0,
    companyId: 0,
    assetId: 0,
  }

  return (
    <Box>
      <Form<AssetRepairFormInput>
        validationSchema={assetRepairFormSchema}
        onSubmit={onSubmit}
        className="flex grow flex-col justify-between pt-7 @container @2xl:pt-9 @3xl:pt-11"
        useFormProps={{
          defaultValues: defaultValues,
          mode: "onChange",
          reValidateMode: "onChange",
          values: assetRepairById as AssetRepairFormInput,
        }}>
        {({ control, register, setValue, formState: { errors } }) => {
          return (
            <>
              <FormGroupContainer>
                <FormGroup title={t("form-details")}>
                  <Controller
                    name="assetId"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        label={t("form-asset")}
                        labelClassName="text-title"
                        placeholder={
                          isAssetLoading
                            ? "Loading asset..."
                            : t("form-select-asset")
                        }
                        options={assetOptions}
                        value={
                          value && assetOptions
                            ? assetOptions.find(
                              (option: any) =>
                                option.value === (value as number)
                            ) || null
                            : null
                        }
                        onChange={(option: any) => {
                          onChange(option?.value)
                          if (option?.value) {
                            const selectedAsset = assetList?.data?.find(
                              (acc: any) => acc.id === option.value
                            )
                            setValue("companyId", selectedAsset?.companyId || 0)
                          }
                        }}
                        isRequired
                        isLoading={isAssetLoading}
                        isDisabled={!isFieldCreate}
                      />
                    )}
                  />
                  <Controller
                    name="companyId"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        label={t("form-company")}
                        labelClassName="text-title"
                        isRequired
                        placeholder={
                          isAssetLoading
                            ? "Loading company..."
                            : t("form-select-company")
                        }
                        options={companyOptions}
                        value={
                          value && companyOptions
                            ? companyOptions.find(
                              (option: any) =>
                                option.value === (value as number)
                            ) || null
                            : null
                        }
                        onChange={(option: any) => onChange(option?.value)}
                        isLoading={isCompanyLoading}
                        isDisabled={!isFieldCreate}
                      />
                    )}
                  />
                </FormGroup>

                <FormGroup
                  title={t("form-accounting-details")}
                  className="pt-7 @2xl:pt-9 @3xl:pt-11">
                  <Controller
                    name="purchaseInvoiceNo"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        label={t("form-purchase-invoice")}
                        labelClassName="text-title"
                        isRequired
                        placeholder={
                          isAssetLoading
                            ? "Loading purchase invoice..."
                            : t("form-select-purchase-invoice")
                        }
                        options={purchaseInvoice?.data?.map(
                          (invoice: Invoice) => ({
                            value: invoice.invoiceBillNo,
                            label: invoice.invoiceBillNo,
                          })
                        )}
                        value={
                          value
                            ? {
                              value: value,
                              label: value,
                            }
                            : null
                        }
                        onChange={(option: any) => {
                          onChange(option?.value)
                          if (option?.value) {
                            const selectedPurchaseInvoice =
                              purchaseInvoice?.data?.find(
                                (acc: any) => acc.invoiceBillNo === option.value
                              )
                            setValue(
                              "repairCost",
                              selectedPurchaseInvoice?.billAmount || 0
                            )
                          }
                        }}
                        isLoading={isPurchaseInvoiceLoading}
                        isDisabled={!isFieldCreate}
                        error={
                          errors?.purchaseInvoiceNo?.message
                            ? t(errors?.purchaseInvoiceNo?.message)
                            : ""
                        }
                      />
                    )}
                  />
                  <Controller
                    name="expenseAccountId"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        label={t("form-expense-account")}
                        labelClassName="text-title"
                        isRequired
                        placeholder={
                          isCOALoading
                            ? "Loading expense account..."
                            : t("form-select-expense-account")
                        }
                        options={coaOptions}
                        value={
                          value && coaOptions
                            ? coaOptions.find(
                              (option: any) =>
                                option.value === (value as number)
                            ) || null
                            : null
                        }
                        onChange={(option: any) => onChange(option?.value)}
                        isLoading={isCOALoading}
                        isDisabled={!isFieldCreate}
                        error={
                          errors?.expenseAccountId?.message
                            ? t(errors?.expenseAccountId?.message)
                            : ""
                        }
                      />
                    )}
                  />
                </FormGroup>

                <FormGroup
                  title={t("form-repair-details")}
                  className="pt-7 @2xl:pt-9 @3xl:pt-11">
                  <Controller
                    name="failureDate"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <DatePicker
                        inputProps={{
                          label: t("form-failure-date"),
                        }}
                        placeholderText={t("form-select-date")}
                        value={value ? new Date(value) : null}
                        onChange={(date: any) => {
                          const formattedDate = date
                            ? dayjs(date).format("YYYY-MM-DD")
                            : undefined
                          onChange(formattedDate)
                        }}
                        isRequired
                        popperPlacement="bottom-end"
                        disabled={!isFieldCreate}
                      />
                    )}
                  />
                  <Controller
                    name="completionDate"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <DatePicker
                        inputProps={{
                          label: t("form-completion-date"),
                        }}
                        placeholderText={t("form-select-date")}
                        value={value ? new Date(value) : null}
                        onChange={(date: any) => {
                          const formattedDate = date
                            ? dayjs(date).format("YYYY-MM-DD")
                            : undefined
                          onChange(formattedDate)
                        }}
                        popperPlacement="bottom-end"
                        disabled={isFieldDisabled}
                      />
                    )}
                  />
                  <Controller
                    name="repairStatus"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        label={t("form-repair-status")}
                        labelClassName="text-title"
                        isRequired
                        placeholder={t("form-select-repair-status")}
                        options={assetRepairStatusOptions}
                        value={
                          value && assetRepairStatusOptions
                            ? assetRepairStatusOptions.find(
                              (option: any) => option.value === value
                            ) || null
                            : null
                        }
                        onChange={(option: any) => onChange(option?.value)}
                        isDisabled={isFieldDisabled}
                      />
                    )}
                  />
                  <Input
                    isRequired
                    label={t("form-repair-cost")}
                    placeholder={t("form-enter-repair-cost")}
                    labelClassName="text-sm font-medium text-gray-900"
                    {...register("repairCost")}
                    error={
                      errors?.repairCost?.message
                        ? t(errors?.repairCost?.message)
                        : ""
                    }
                    disabled={true}
                  />
                </FormGroup>

                <FormGroup
                  title={t("form-description")}
                  className="pt-7 @2xl:pt-9 @3xl:pt-11"
                  childrenContainerClassName="@2xl:grid-cols-1">
                  <Textarea
                    label={t("form-repair-description")}
                    placeholder={t("form-enter-repair-description")}
                    isRequired
                    labelClassName="text-sm font-medium text-gray-900"
                    {...register("repairDescription")}
                    error={
                      errors?.repairDescription?.message
                        ? t(errors?.repairDescription?.message)
                        : ""
                    }
                    disabled={isFieldDisabled}
                  />
                </FormGroup>
              </FormGroupContainer>

              {mode !== "view" && (
                <FormFooter
                  isLoading={
                    isCreateAssetRepairLoading || isUpdateAssetRepairLoading
                  }
                  handleAltBtn={() => router.back()}
                  altBtnText={t("form-back")}
                  submitBtnText={
                    id
                      ? t("form-update-asset-repair")
                      : t("form-new-asset-repair")
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
