"use client"

import { useEffect } from "react"

import { Form } from "@core/ui/form"
import { useTranslations } from "next-intl"
import { Controller } from "react-hook-form"

import FormGroup from "@/components/base/form-group"
import FormGroupContainer from "@/components/base/form-group-container"
import FormStickyActions from "@/components/base/form-sticky-actions"
import { Input, Select } from "@/components/ui"
import Box from "@/components/ui/box"
import { routes } from "@/config/routes"
import { useSCMSharedDataHook } from "@/modules/scm/constants/shared-data-hooks"
import {
  entryType,
  stockStatus,
  stockValuationMethodOptions,
} from "@/modules/scm/constants/shared-status-field-option"
import { useRequisitionStore } from "@/modules/scm/store/requisition-store"
import { Stock } from "@/modules/scm/types/inventory/stock-overview/stock-overview-types"
import { StockSchema } from "@/modules/scm/validators/inventory/stock.shcema"

import { useStockForm } from "./use-stock-form"

type IndexProps =
  | {
      initialData?: Stock
      isEditForm?: true
    }
  | {
      initialData?: undefined
      isEditForm?: false
    }

export default function StockEntry({ initialData, isEditForm }: IndexProps) {
  const { setSelectedProductTemplate } = useRequisitionStore()
  const { warehouse, productCode } = useSCMSharedDataHook([
    "warehouse",
    "productCode",
  ])

  const { warehouseOptions, isWarehouseLoading } = warehouse
  const { productCodeOptions, isProductCodeLoading } = productCode

  const { onSubmit, isLoading, getFormValues } = useStockForm({
    id: initialData?.id || 0,
    initialData: initialData,
    mode: isEditForm ? "edit" : "create",
  })
  const t = useTranslations("form")

  return (
    <Box>
      <Form<Stock>
        validationSchema={StockSchema}
        onSubmit={onSubmit}
        className="flex grow flex-col justify-between pt-7 @container @2xl:pt-9 @3xl:pt-11"
        useFormProps={{
          mode: "onChange",
          reValidateMode: "onChange",
          defaultValues: getFormValues(),
          values: getFormValues(),
        }}>
        {({ register, control, formState: { errors }, watch, setValue }) => {
          // Add watchers for the fields we need to calculate total
          const currentQuantity = watch("currentQuantity") || 0
          const unitStockValue = watch("unitStockValue") || 0

          // Calculate total and update the form whenever quantity or unit value changes
          useEffect(() => {
            const total = currentQuantity * unitStockValue
            setValue("totalStockValue", total)
          }, [currentQuantity, unitStockValue, setValue])

          return (
            <>
              <FormGroupContainer>
                <FormGroup title={t("form-stock-entry-information")}>
                  <Controller
                    control={control}
                    name="productId"
                    render={({ field: { onChange, value } }) => (
                      <Select
                        isRequired
                        placeholder={t("form-product-code")}
                        label={t("form-product-code")}
                        options={productCodeOptions}
                        onChange={(option: any) => {
                          const selectedValue = option?.value ?? null
                          setSelectedProductTemplate(selectedValue)
                          onChange(selectedValue)
                        }}
                        value={
                          productCodeOptions.find(
                            (option: any) => option.value === value
                          ) || null
                        }
                        isLoading={isProductCodeLoading}
                        isDisabled={isProductCodeLoading}
                        className="flex-grow"
                        error={
                          errors?.productId?.message
                            ? t(errors.productId?.message)
                            : ""
                        }
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="warehouseId"
                    render={({ field: { onChange, value } }) => (
                      <Select
                        placeholder={t("form-stock-location")}
                        label={t("form-stock-location")}
                        options={warehouseOptions}
                        onChange={(option: any) => onChange(option?.value)}
                        value={
                          warehouseOptions.find(
                            (option: any) => option.value === value
                          ) || null
                        }
                        isLoading={isWarehouseLoading}
                        isDisabled={isWarehouseLoading}
                        className="flex-grow"
                        error={
                          errors?.warehouseId?.message
                            ? t(errors.warehouseId?.message)
                            : ""
                        }
                        isRequired
                      />
                    )}
                  />
                  <Input
                    labelClassName="bg-paper"
                    label={t("form-current-quantity")}
                    isRequired
                    type="number"
                    min={0}
                    onKeyDown={(e) => {
                      if (e.key === "-" || e.key === "e") {
                        e.preventDefault()
                      }
                    }}
                    {...register("currentQuantity", {
                      valueAsNumber: true,
                      min: 0,
                    })}
                    error={
                      errors.currentQuantity?.message
                        ? t(errors.currentQuantity?.message)
                        : ""
                    }
                    className="flex-grow"
                  />
                  <Input
                    labelClassName="bg-paper"
                    label={t("form-reorder-level")}
                    type="number"
                    min={0}
                    onKeyDown={(e) => {
                      if (e.key === "-" || e.key === "e") {
                        e.preventDefault()
                      }
                    }}
                    isRequired
                    {...register("reorderLevel", {
                      valueAsNumber: true,
                      min: 0,
                    })}
                    error={
                      errors.reorderLevel?.message
                        ? t(errors.reorderLevel?.message)
                        : ""
                    }
                    className="flex-grow"
                  />
                  <Input
                    labelClassName="bg-paper"
                    label={t("form-reorder-quantity")}
                    isRequired
                    type="number"
                    min={0}
                    onKeyDown={(e) => {
                      if (e.key === "-" || e.key === "e") {
                        e.preventDefault()
                      }
                    }}
                    {...register("reorderQuantity", {
                      valueAsNumber: true,
                      min: 0,
                    })}
                    error={
                      errors.reorderQuantity?.message
                        ? t(errors.reorderQuantity?.message)
                        : ""
                    }
                    className="flex-grow"
                  />
                  <Controller
                    control={control}
                    name="stockValuationMethod"
                    render={({ field: { onChange, value } }) => (
                      <Select
                        label={t("form-select-stock-valuation-method")}
                        placeholder={t("form-select-stock-valuation-method")}
                        options={stockValuationMethodOptions}
                        onChange={(option: any) => onChange(option?.value)}
                        value={
                          stockValuationMethodOptions.find(
                            (option) => option.value === value
                          ) || null
                        }
                        isLoading={isProductCodeLoading}
                        isDisabled={isProductCodeLoading}
                        className="flex-grow"
                        error={
                          errors?.stockValuationMethod?.message
                            ? t(errors.stockValuationMethod?.message)
                            : ""
                        }
                        isRequired
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="entryType"
                    render={({ field: { onChange, value } }) => (
                      <Select
                        label={t("form-entry-type")}
                        placeholder={t("form-select-entry-type")}
                        options={entryType}
                        onChange={(option: any) => onChange(option?.value)}
                        value={
                          entryType.find((option) => option.value === value) ||
                          null
                        }
                        isLoading={isProductCodeLoading}
                        isDisabled={isProductCodeLoading}
                        className="flex-grow"
                        error={
                          errors?.entryType?.message
                            ? t(errors.entryType?.message)
                            : ""
                        }
                        isRequired
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="status"
                    render={({ field: { onChange, value } }) => (
                      <Select
                        label={t("form-status")}
                        placeholder={t("form-select-status")}
                        options={stockStatus}
                        onChange={(option: any) => onChange(option?.value)}
                        value={
                          stockStatus.find(
                            (option) => option.value === value
                          ) || null
                        }
                        isLoading={isProductCodeLoading}
                        isDisabled={isProductCodeLoading}
                        className="flex-grow"
                        error={
                          errors?.status?.message
                            ? t(errors.status?.message)
                            : ""
                        }
                        isRequired
                      />
                    )}
                  />
                  <Input
                    labelClassName="bg-paper"
                    label={t("form-unit-stock-value")}
                    type="number"
                    min={0}
                    onKeyDown={(e) => {
                      if (e.key === "-" || e.key === "e") {
                        e.preventDefault()
                      }
                    }}
                    {...register("unitStockValue", {
                      valueAsNumber: true,
                      min: 0,
                    })}
                    error={
                      errors.unitStockValue?.message
                        ? t(errors.unitStockValue?.message)
                        : ""
                    }
                    className="flex-grow"
                  />
                  <Input
                    labelClassName="bg-paper"
                    label={t("form-total-stock-value")}
                    type="number"
                    min={0}
                    onKeyDown={(e) => {
                      if (e.key === "-" || e.key === "e") {
                        e.preventDefault()
                      }
                    }}
                    {...register("totalStockValue", {
                      valueAsNumber: true,
                      min: 0,
                    })}
                    error={
                      errors.totalStockValue?.message
                        ? t(errors.totalStockValue?.message)
                        : ""
                    }
                    className="flex-grow"
                  />
                </FormGroup>
              </FormGroupContainer>
              <FormStickyActions
                isEditForm={isEditForm}
                isLoading={isLoading}
                backToListPath={routes.scm.inventory.stock.stockOverview}
                className="mt-7"
              />
            </>
          )
        }}
      </Form>
    </Box>
  )
}
