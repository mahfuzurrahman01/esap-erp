"use client"

import { useEffect } from "react"

import { Form } from "@core/ui/form"
import { format } from "date-fns"
import { atom, useAtom } from "jotai"
import { useTranslations } from "next-intl"
import { Controller, SubmitHandler, useForm } from "react-hook-form"

import { DatePicker } from "@/components/base/date-picker"
import FormGroup from "@/components/base/form-group"
import FormGroupContainer from "@/components/base/form-group-container"
import FormStickyActions from "@/components/base/form-sticky-actions"
import { Input, Select } from "@/components/ui"
import Box from "@/components/ui/box"
import { routes } from "@/config/routes"
import { useSelectOptions } from "@/hooks/use-select-options"
import { useProductList } from "@/modules/scm/hooks/inventory/product/use-product"
import {
  useCreateStockReplenishment,
  useUpdateStockReplenishment,
} from "@/modules/scm/hooks/inventory/stock-replanishment/use-stock-replanishment"
import {
  useStockById,
  useStockList,
} from "@/modules/scm/hooks/inventory/stock/use-stock"
import { useSupplierList } from "@/modules/scm/hooks/procurement/supplier/use-supplier"
import { Stock } from "@/modules/scm/types/inventory/stock-overview/stock-overview-types"
import { StockReplenishment } from "@/modules/scm/types/inventory/stock-replanishment/stock-replanishment-types"
import { StockReplenishmentSchema } from "@/modules/scm/validators/inventory/stock-replanishment.schema"

import { defaultStockReplenishment } from "./form-utils"

const inventoryTemplateId = atom<number>(0)
const productIdAtom = atom<number>(0)

type IndexProps =
  | {
      initialData?: StockReplenishment
      isEditForm?: true
    }
  | {
      initialData?: undefined
      isEditForm?: false
    }

const replenishmentMethod = [
  { label: "FIFO", value: "FIFO" },
  { label: "LIFO", value: "LIFO" },
  { label: "Average Cost", value: "AverageCost" },
]

export default function StockReplenishmentEntry({
  initialData,
  isEditForm,
}: IndexProps) {
  const t = useTranslations("form")
  const { setValue } = useForm()
  const [inventoryTemplate, setInventoryTemplate] = useAtom(inventoryTemplateId)

  const [productId, setProductId] = useAtom(productIdAtom)

  const { data: productList, isLoading: isProductLoading } = useProductList()
  const { data: supplierList, isLoading: isSupplierLoading } = useSupplierList()
  const { data: stockList, isLoading: isStockLoading } = useStockList()

  const supplierOptions = useSelectOptions(supplierList?.data, "supplierName")

  const stockOptions = useSelectOptions(stockList?.data, "sku")

  const productOptions = useSelectOptions(productList?.data, "productName")

  const { data: inventoryDetails, isLoading: isInventoryDetailsLoading } =
    useStockById(inventoryTemplate) as {
      data: Stock | undefined
      isLoading: boolean
    }

  useEffect(() => {
    if (inventoryDetails && inventoryDetails.productId) {
      setProductId(inventoryDetails.productId)
      setValue(
        "productId",
        initialData?.productId || inventoryDetails.productId || 0,
        {
          shouldValidate: true,
        }
      )
    }
  }, [
    inventoryDetails,
    setProductId,
    setValue,
    setInventoryTemplate,
    initialData,
  ])

  const { mutateAsync: createStockReplenishment, isPending: isCreating } =
    useCreateStockReplenishment()

  const { mutateAsync: updateStockReplenishment, isPending: isUpdating } =
    useUpdateStockReplenishment()

  const onSubmit: SubmitHandler<StockReplenishment> = async (data) => {
    const formattedData = {
      ...data,
      expectedDeliveryDate: data.expectedDeliveryDate
        ? format(new Date(data.expectedDeliveryDate), "yyyy-MM-dd")
        : undefined,
    }
    if (isEditForm) {
      await updateStockReplenishment({
        ...data,
        data: {
          id: initialData?.id,
          ...formattedData,
          productId: productId || initialData?.productId,
          status: "pending" as "pending" | "completed" | "cancelled",
        },
      })
    } else {
      await createStockReplenishment({
        ...formattedData,
        status: "pending" as "pending" | "completed" | "cancelled",
        productId: productId,
      })
    }
  }

  return (
    <Box>
      <Form<StockReplenishment>
        validationSchema={StockReplenishmentSchema}
        onSubmit={onSubmit}
        className="flex grow flex-col justify-between pt-7 @container @2xl:pt-9 @3xl:pt-11"
        useFormProps={{
          mode: "onChange",
          reValidateMode: "onChange",
          defaultValues: initialData || defaultStockReplenishment,
          values: initialData,
        }}>
        {({ register, control, formState: { errors } }) => (
          <>
            <FormGroupContainer>
              <FormGroup title={t("form-stock-replenishment-information")}>
                <Controller
                  control={control}
                  name="inventoryId"
                  render={({ field: { onChange, value } }) => (
                    <Select
                      placeholder={t("form-inventory-id")}
                      isRequired
                      label={t("form-inventory-id")}
                      options={stockOptions}
                      value={
                        stockOptions.find((option) => option.value === value) ||
                        null
                      }
                      onChange={(option: any) => {
                        const selectedValue = option?.value ?? null
                        onChange(selectedValue)
                        setInventoryTemplate(selectedValue)
                        // Clear product when inventory is cleared
                        if (!selectedValue) {
                          setValue("productId", undefined, {
                            shouldValidate: true,
                          })
                        }
                      }}
                      isLoading={isStockLoading}
                      isDisabled={isStockLoading}
                      className="flex-grow"
                      error={
                        errors?.inventoryId?.message
                          ? t(errors.inventoryId?.message)
                          : ""
                      }
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="productId"
                  render={({ field: { onChange, value } }) => (
                    <Select
                      placeholder={t("form-product-id")}
                      label={t("form-product-id")}
                      options={productOptions}
                      value={
                        productOptions.find(
                          (option) =>
                            option.value ===
                            (inventoryDetails?.productId || value)
                        ) || null
                      }
                      onChange={(option: any) => onChange(option?.value)}
                      isLoading={isProductLoading || isInventoryDetailsLoading}
                      isDisabled={true}
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
                  name="supplierId"
                  render={({ field: { onChange, value } }) => (
                    <Select
                      placeholder={t("form-supplier-id")}
                      isRequired
                      label={t("form-supplier-id")}
                      options={supplierOptions}
                      onChange={(option: any) => onChange(option?.value)}
                      value={
                        supplierOptions.find(
                          (option) => option.value === value
                        ) || null
                      }
                      isLoading={isSupplierLoading}
                      isDisabled={isSupplierLoading}
                      className="flex-grow"
                      error={
                        errors?.supplierId?.message
                          ? t(errors.supplierId?.message)
                          : ""
                      }
                    />
                  )}
                />
                <Input
                  labelClassName="bg-paper"
                  label={t("form-replenishment-quantity")}
                  type="number"
                  min={0}
                  onKeyDown={(e) => {
                    if (e.key === "-" || e.key === "e") {
                      e.preventDefault()
                    }
                  }}
                  {...register("replenishmentQty", {
                    setValueAs: (value: any) => Number(value),
                    min: 0,
                  })}
                  error={
                    errors.replenishmentQty?.message
                      ? t(errors.replenishmentQty?.message)
                      : ""
                  }
                  className="flex-grow"
                  isRequired
                />
                <Controller
                  control={control}
                  name="replenishmentMethod"
                  render={({ field: { onChange, value } }) => (
                    <Select
                      placeholder={t("form-replenishment-method")}
                      label={t("form-replenishment-method")}
                      options={replenishmentMethod}
                      onChange={(option: any) => onChange(option?.value)}
                      value={
                        replenishmentMethod.find(
                          (option) => option.value === value
                        ) || null
                      }
                      className="flex-grow"
                      error={
                        errors?.replenishmentMethod?.message
                          ? t(errors.replenishmentMethod?.message)
                          : ""
                      }
                      isRequired
                    />
                  )}
                />
                <div>
                  <Controller
                    control={control}
                    name="expectedDeliveryDate"
                    render={({ field: { value, onChange } }) => (
                      <div className="relative">
                        <label
                          htmlFor="expectedDeliveryDate"
                          className="mb-2 block text-sm font-medium text-title transition-colors duration-200">
                          {t("form-expected-delivery-date")}{" "}
                          <span className="text-orange-500">*</span>
                        </label>
                        <DatePicker
                          id="expectedDeliveryDate"
                          value={value ? new Date(value) : null}
                          onChange={(date: any) =>
                            onChange(date ? date.toISOString() : "")
                          }
                          placeholderText={t("form-select-date")}
                          className="w-full"
                          minDate={new Date()}
                        />
                      </div>
                    )}
                  />
                  {errors.expectedDeliveryDate && (
                    <p className="text-sm text-red-500">
                      {errors.expectedDeliveryDate.message
                        ? t(errors.expectedDeliveryDate.message)
                        : ""}
                    </p>
                  )}
                </div>
              </FormGroup>
            </FormGroupContainer>
            <FormStickyActions
              isEditForm={isEditForm}
              backToListPath={
                routes.scm.inventory.stockReplenishment.stockReplenishment
              }
              isLoading={isCreating || isUpdating}
              className="mt-7"
            />
          </>
        )}
      </Form>
    </Box>
  )
}
