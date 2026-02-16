"use client"

import { Form } from "@core/ui/form"
import { useTranslations } from "next-intl"
import { Controller } from "react-hook-form"
import { Text } from "rizzui/typography"

import { DatePicker } from "@/components/base/date-picker"
import FormGroup from "@/components/base/form-group"
import FormGroupContainer from "@/components/base/form-group-container"
import FormStickyActions from "@/components/base/form-sticky-actions"
import { Select } from "@/components/ui"
import { routes } from "@/config/routes"
import { useSCMSharedDataHook } from "@/modules/scm/constants/shared-data-hooks"
import { StockTransfer } from "@/modules/scm/types/inventory/stock-transfer/stock-transfer-types"
import { GetMenuListStyles } from "@/modules/scm/utils/select-options"
import { FindSelectOption } from "@/modules/scm/utils/select-options"
import { stockTransferSchema } from "@/modules/scm/validators/inventory/stock-transfer.schema"

import { getStockTransferStatusBadge } from "../stock-transfer-list/status-badge"
import { ItemsListTable } from "./items-form/items-table"
import { useStockTransferFrom } from "./use-stock-transfer-from"

interface UseRequisitionFormProps {
  id?: number
  mode?: "create" | "edit" | "view"
}

export default function StockTransferCreate({
  id,
  mode = "create",
}: UseRequisitionFormProps) {
  const t = useTranslations("form")

  const {
    isFieldDisabled,
    isLoading,
    onSubmit,
    getFormValues,
    stockTransferItems,
    handleStockTransferItemsChange,
    handleStockTransferItemsDelete,
    handleStockTransferItemsAdd,
  } = useStockTransferFrom({
    id: id || 0,
    mode: mode,
  })

  const { warehouse, stockTransfer } = useSCMSharedDataHook([
    "warehouse",
    "product",
    "stockTransfer",
  ])

  const { isWarehouseTransferToLoading, warehouseTransferToOptions } = warehouse
  const { isWarehouseTransferFromLoading, warehouseTransferFromOptions } =
    warehouse

  const { isStockTransferOptionsLoading, stockTransferOptions } = stockTransfer

  return (
    <Form<StockTransfer>
      validationSchema={stockTransferSchema}
      onSubmit={onSubmit}
      className="card-shadow border-none bg-gray-0 @container dark:bg-gray-800"
      useFormProps={{
        mode: "onChange",
        reValidateMode: "onChange",
        defaultValues: getFormValues(),
        values: getFormValues(),
      }}>
      {({ control, setValue, formState: { errors } }) => (
        <>
          <FormGroupContainer>
            <div className="grid gap-7 @2xl:pt-9 @3xl:pt-11">
              <FormGroup title={t("form-warehouse")}>
                <Controller
                  control={control}
                  name="transferToWarehouseId"
                  render={({ field: { onChange, value } }) => (
                    <Select
                      placeholder={t("form-warehouse")}
                      isRequired
                      label={t("form-transfer-to")}
                      options={warehouseTransferToOptions}
                      value={
                        warehouseTransferToOptions.find(
                          (option: any) => option.value === value
                        ) || null
                      }
                      onChange={(option: any) => onChange(option?.value)}
                      isLoading={isWarehouseTransferToLoading}
                      isDisabled={
                        isWarehouseTransferToLoading || isFieldDisabled
                      }
                      className="flex-grow"
                      labelClassName="text-gray-900 dark:text-gray-0"
                      error={
                        errors?.transferToWarehouseId?.message
                          ? t(errors.transferToWarehouseId?.message)
                          : ""
                      }
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="transferFromWarehouseId"
                  render={({ field: { onChange, value } }) => (
                    <Select
                      placeholder={t("form-warehouse")}
                      isRequired
                      label={t("form-transfer-from")}
                      options={warehouseTransferFromOptions}
                      value={
                        warehouseTransferFromOptions.find(
                          (option: any) => option.value === value
                        ) || null
                      }
                      onChange={(option: any) => onChange(option?.value)}
                      isLoading={isWarehouseTransferFromLoading}
                      isDisabled={
                        isWarehouseTransferFromLoading || isFieldDisabled
                      }
                      className="flex-grow"
                      labelClassName="text-gray-900 dark:text-gray-0"
                      error={
                        errors?.transferFromWarehouseId?.message
                          ? t(errors.transferFromWarehouseId?.message)
                          : ""
                      }
                    />
                  )}
                />
                <div>
                  <Controller
                    control={control}
                    name="transferDate"
                    render={({ field: { value, onChange } }) => (
                      <div className="relative">
                        <label
                          htmlFor="transferDate"
                          className="mb-2 block text-sm font-medium text-title transition-colors duration-200">
                          {t("form-transfer-date")}{" "}
                          <span className="text-orange-500">*</span>
                        </label>
                        <DatePicker
                          id="transferDate"
                          value={value ? new Date(value) : null}
                          onChange={(date: any) =>
                            onChange(date ? date.toISOString() : "")
                          }
                          placeholderText={t("form-select-date")}
                          className="w-full"
                          minDate={new Date()}
                          disabled={isFieldDisabled}
                        />
                      </div>
                    )}
                  />
                  {errors.transferDate && (
                    <p className="text-sm text-red-500">
                      {errors.transferDate.message
                        ? t(errors.transferDate.message)
                        : ""}
                    </p>
                  )}
                </div>
                {mode === "view" && (
                  <Controller
                    control={control}
                    name="id"
                    render={({ field: { onChange, value } }) => (
                      <Select
                        label={t("form-stock-transfer")}
                        placeholder={t("form-stock-transfer")}
                        labelClassName="text-title"
                        options={stockTransferOptions}
                        onChange={(option: any) => onChange(option?.value)}
                        value={FindSelectOption(stockTransferOptions, value)}
                        isLoading={isStockTransferOptionsLoading}
                        isDisabled={isStockTransferOptionsLoading || true}
                        error={
                          errors?.stockTransferNo?.message
                            ? t(errors?.stockTransferNo?.message)
                            : ""
                        }
                        styles={GetMenuListStyles(stockTransferOptions.length)}
                        isRequired
                      />
                    )}
                  />
                )}
                {mode === "view" && (
                  <div>
                    <Text className="mb-2 text-title">
                      {t("form-stock-transfer-status")}
                    </Text>
                    {getStockTransferStatusBadge(
                      getFormValues()?.status || "pending"
                    )}
                  </div>
                )}
              </FormGroup>
              <FormGroup
                title={t("form-product-details")}
                className="pt-7 @2xl:pt-10 @3xl:pt-11"
                childrenContainerClassName="@2xl:grid-cols-1 @4xl:col-span-12">
                <ItemsListTable
                  data={stockTransferItems}
                  onRowChange={handleStockTransferItemsChange}
                  onRowDelete={handleStockTransferItemsDelete}
                  onAddRow={handleStockTransferItemsAdd}
                  setValue={setValue}
                  isFieldDisabled={isFieldDisabled}
                />
              </FormGroup>
            </div>
          </FormGroupContainer>
          {mode !== "view" && (
            <FormStickyActions
              isEditForm={mode === "edit"}
              isLoading={isLoading}
              className="mt-7"
              backToListPath={routes.scm.inventory.stockTransfer.stockTransfer}
            />
          )}
        </>
      )}
    </Form>
  )
}
