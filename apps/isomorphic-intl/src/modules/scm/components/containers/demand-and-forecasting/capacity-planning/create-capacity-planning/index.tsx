"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

import { Form } from "@core/ui/form"
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
import {
  useCreateCapacityPlanning,
  useUpdateCapacityPlanning,
} from "@/modules/scm/hooks/demand-and-forecasting/capacity-planning/use-capacity-planning"
import { useProductList } from "@/modules/scm/hooks/inventory/product/use-product"
import {
  useStockById,
  useStockList,
} from "@/modules/scm/hooks/inventory/stock/use-stock"
import { CapacityPlanning } from "@/modules/scm/types/demand-and-forecasting/capacity-planning/capacity-planning-types"
import { Stock } from "@/modules/scm/types/inventory/stock-overview/stock-overview-types"
import { GetMenuListStyles } from "@/modules/scm/utils/select-options"
import { CapacityPlanningSchema } from "@/modules/scm/validators/demand-forecasting/capacity-planning.schema"

import { defaultCapacityPlanning } from "./form-utils"

const inventoryTemplateId = atom<number>(0)
const productIdAtom = atom<number>(0)
type IndexProps =
  | {
      initialData?: CapacityPlanning
      isEditForm?: true
    }
  | {
      initialData?: undefined
      isEditForm?: false
    }

export default function CapacityPlanningCreateEdit({
  initialData,
  isEditForm,
}: IndexProps) {
  const t = useTranslations("form")
  const methods = useForm<CapacityPlanning>({
    mode: "onChange",
    defaultValues: defaultCapacityPlanning || initialData,
    reValidateMode: "onChange",
    values: initialData,
  })
  const { setValue } = methods

  const [inventoryTemplate, setInventoryTemplate] = useAtom(inventoryTemplateId)

  const [productId, setProductId] = useAtom(productIdAtom)

  const router = useRouter()

  const { data: inventoryData, isLoading: isInventoryLoading } = useStockList({
    pageSize: 200
  })

  const { data: productData, isLoading: isProductLoading } = useProductList({
    pageSize: 200
  })

  const inventoryOptions = useSelectOptions(inventoryData?.data, "sku")

  const productOptions = useSelectOptions(productData?.data, "productName")

  const { data: inventoryDetails, isLoading: isInventoryDetailsLoading } =
    useStockById(inventoryTemplate) as {
      data: Stock | undefined
      isLoading: boolean
    }

  // Update useEffect to handle inventory selection
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
    setValue,
    setProductId,
    setInventoryTemplate,
    initialData,
  ])

  const {
    mutateAsync: createCapacityPlanning,
    isPending: isCreateCapacityPlanningLoading,
  } = useCreateCapacityPlanning()
  const {
    mutateAsync: updateCapacityPlanning,
    isPending: isUpdateCapacityPlanningLoading,
  } = useUpdateCapacityPlanning()

  const onSubmit: SubmitHandler<CapacityPlanning> = async (data) => {
    if (isEditForm) {
      await updateCapacityPlanning({
        data: {
          id: initialData?.id!,
          ...data,
          productId: productId || initialData?.productId,
        },
      })
    } else {
      await createCapacityPlanning({
        ...data,
        productId: productId,
      })
    }
  }
  return (
    <Box>
      <Form<CapacityPlanning>
        onSubmit={onSubmit}
        validationSchema={CapacityPlanningSchema}
        className="flex grow flex-col justify-between pt-7 @container @2xl:pt-9 @3xl:pt-11"
        useFormProps={{
          mode: "onChange",
          defaultValues: defaultCapacityPlanning || initialData,
          reValidateMode: "onChange",
          values: initialData,
        }}>
        {({ register, setValue, control, formState: { errors } }) => (
          <>
            <FormGroupContainer>
              <FormGroup title={t("form-capacity-planning-create")}>
                <Controller
                  control={control}
                  name="inventoryId"
                  render={({ field: { onChange, value } }) => (
                    <Select
                      label={t("form-inventory")}
                      isRequired
                      labelClassName="text-title"
                      options={inventoryOptions}
                      value={
                        inventoryOptions.find(
                          (option) => option.value === value
                        ) || null
                      }
                      onChange={(option: any) => {
                        const selectedValue = option?.value ?? null
                        setInventoryTemplate(selectedValue)
                        onChange(selectedValue)
                        // Clear product when inventory is cleared
                        if (!selectedValue) {
                          setValue("productId", undefined, {
                            shouldValidate: true,
                          })
                        }
                      }}
                      isLoading={isInventoryLoading}
                      isDisabled={isInventoryLoading}
                      placeholder={t("form-inventory")}
                      menuPortalTarget={document.body}
                      styles={GetMenuListStyles(inventoryOptions.length)}
                      error={
                        errors.inventoryId?.message
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
                      label={t("form-product")}
                      isRequired
                      labelClassName="text-title"
                      options={productOptions}
                      value={
                        productOptions.find(
                          (option) =>
                            option.value ===
                            (inventoryDetails?.productId || value)
                        ) || null
                      }
                      onChange={(option: any) => {
                        onChange(option?.value)
                      }}
                      isLoading={isProductLoading || isInventoryDetailsLoading}
                      isDisabled={true}
                      placeholder={t("form-product")}
                      menuPortalTarget={document.body}
                      styles={GetMenuListStyles(productOptions.length)}
                    />
                  )}
                />
                <Input
                  type="number"
                  isRequired
                  min={0}
                  onKeyDown={(e) => {
                    if (e.key === "-" || e.key === "e") {
                      e.preventDefault()
                    }
                  }}
                  labelClassName="bg-paper"
                  label={t("form-supplier-capacity")}
                  {...register("supplierCapacity", {
                    valueAsNumber: true,
                    min: 0,
                  })}
                  error={
                    errors.supplierCapacity?.message
                      ? t(errors.supplierCapacity?.message)
                      : ""
                  }
                  className="flex-grow"
                />
                <Input
                  type="number"
                  isRequired
                  min={0}
                  onKeyDown={(e) => {
                    if (e.key === "-" || e.key === "e") {
                      e.preventDefault()
                    }
                  }}
                  labelClassName="bg-paper"
                  label={t("form-manufacturing-capacity")}
                  {...register("manufacturingCapacity", {
                    valueAsNumber: true,
                    min: 0,
                  })}
                  error={
                    errors.manufacturingCapacity?.message
                      ? t(errors.manufacturingCapacity?.message)
                      : ""
                  }
                  className="flex-grow"
                />
                <Input
                  type="number"
                  isRequired
                  min={0}
                  onKeyDown={(e) => {
                    if (e.key === "-" || e.key === "e") {
                      e.preventDefault()
                    }
                  }}
                  labelClassName="bg-paper"
                  label={t("form-warehouse-capacity")}
                  {...register("warehouseCapacity", {
                    valueAsNumber: true,
                    min: 0,
                  })}
                  error={
                    errors.warehouseCapacity?.message
                      ? t(errors.warehouseCapacity?.message)
                      : ""
                  }
                  className="flex-grow"
                />
                <Input
                  type="number"
                  isRequired
                  min={0}
                  onKeyDown={(e) => {
                    if (e.key === "-" || e.key === "e") {
                      e.preventDefault()
                    }
                  }}
                  labelClassName="bg-paper"
                  label={t("form-planned-production-quantity")}
                  {...register("plannedProductionQuantity", {
                    valueAsNumber: true,
                    min: 0,
                  })}
                  error={
                    errors.plannedProductionQuantity?.message
                      ? t(errors.plannedProductionQuantity?.message)
                      : ""
                  }
                  className="flex-grow"
                />
                <div className="col-span-full">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Controller
                        control={control}
                        name="plannedProductionDate"
                        render={({ field: { value, onChange } }) => (
                          <div className="relative">
                            <label
                              htmlFor="plannedProductionDate"
                              className="mb-2 block text-sm font-medium text-title transition-colors duration-200">
                              {t("form-planned-production-date")}{" "}
                              <span className="text-orange-500">*</span>
                            </label>
                            <DatePicker
                              id="plannedProductionDate"
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
                      {errors.plannedProductionDate && (
                        <p className="text-sm text-red-500">
                          {errors.plannedProductionDate.message
                            ? t(errors.plannedProductionDate.message)
                            : ""}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </FormGroup>
            </FormGroupContainer>
            <FormStickyActions
              backButton={
                isEditForm
                  ? {
                      label: t("form-back"),
                      onClick: () => router.back(),
                    }
                  : undefined
              }
              backToListPath={
                routes.scm.demandForecasting.capacityPlanning.capacityPlanning
              }
              isEditForm={isEditForm}
              isLoading={
                isCreateCapacityPlanningLoading ||
                isUpdateCapacityPlanningLoading
              }
              className="mt-7"
            />
          </>
        )}
      </Form>
    </Box>
  )
}
