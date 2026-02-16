"use client"



import { Form } from "@core/ui/form"
import { useTranslations } from "next-intl"
import { Controller, SubmitHandler } from "react-hook-form"

import FormGroup from "@/components/base/form-group"
import FormGroupContainer from "@/components/base/form-group-container"
import FormStickyActions from "@/components/base/form-sticky-actions"
import { Input, Select } from "@/components/ui"
import Box from "@/components/ui/box"
import {
  useCreateSalesOperationPlan,
  useUpdateSalesOperationPlan,
} from "@/modules/scm/hooks/demand-and-forecasting/sales-operation-plan/use-sales-operation-plan"
import { useProductList } from "@/modules/scm/hooks/inventory/product/use-product"
import { useStockList } from "@/modules/scm/hooks/inventory/stock/use-stock"
import { SalesOperationPlan } from "@/modules/scm/types/demand-and-forecasting/sales-operation-plan/sales-operation-plan-types"
import { GetMenuListStyles } from "@/modules/scm/utils/select-options"
import {
  SalesOperationPlanFormInput,
  SalesOperationPlanSchema,
} from "@/modules/scm/validators/demand-forecasting/sales-operation-plan.schema"

import { defaultSalesOperationPlan } from "./form-utils"
import { useSelectOptions } from "@/hooks/use-select-options"
import { Product } from "@/modules/scm/types/inventory/products/products-types"
import { Stock } from "@/modules/scm/types/inventory/stock-overview/stock-overview-types"
import { routes } from "@/config/routes"

type IndexProps =
  | {
      initialData?: SalesOperationPlan
      isEditForm?: true
    }
  | {
      initialData?: any
      isEditForm?: false
    }

export default function SalesOperationPlanCreateEdit({
  initialData,
  isEditForm,
}: IndexProps) {
  const t = useTranslations("form")

  const { data: inventoryData, isLoading: isInventoryLoading } = useStockList({
    pageSize: 200
  })

  const { data: productData, isLoading: isProductLoading } = useProductList()

  const inventoryOptions = useSelectOptions<Stock>(inventoryData?.data, "sku")

  const productOptions = useSelectOptions<Product>(productData?.data, "productName")

  const {
    mutateAsync: createSalesOperationPlan,
    isPending: isCreateSalesOperationPlanLoading,
  } = useCreateSalesOperationPlan()
  const {
    mutateAsync: updateSalesOperationPlan,
    isPending: isUpdateSalesOperationPlanLoading,
  } = useUpdateSalesOperationPlan()

  const onSubmit: SubmitHandler<SalesOperationPlan> = async (data) => {
    if (isEditForm) {
      await updateSalesOperationPlan({
        data: { id: initialData?.id!, ...data },
      })
    } else {
      await createSalesOperationPlan({
        ...data,
        forecastId: initialData?.id,
        approvalStatus: "pending",
      })
    }
  }
  return (
    <Box>
      <Form<SalesOperationPlanFormInput>
        onSubmit={onSubmit}
        validationSchema={SalesOperationPlanSchema}
        className="flex grow flex-col justify-between pt-7 @container @2xl:pt-9 @3xl:pt-11"
        useFormProps={{
          mode: "onChange",
          defaultValues: defaultSalesOperationPlan || initialData,
          reValidateMode: "onChange",
          values: initialData,
        }}>
        {({ register, control, formState: { errors } }) => (
          <>
            <FormGroupContainer>
              <FormGroup title={t("form-forecast-create")}>
                <Controller
                  control={control}
                  name="inventoryId"
                  render={({ field: { onChange, value } }) => (
                    <Select
                      label={t("form-inventory")}
                      labelClassName="text-title"
                      options={inventoryOptions}
                      value={
                        inventoryOptions.find(
                          (option) => option.value === value
                        ) || null
                      }
                      onChange={(option: any) => onChange(option?.value)}
                      isLoading={isInventoryLoading}
                      isDisabled={isInventoryLoading || true}
                      placeholder={t("form-inventory")}
                      menuPortalTarget={document.body}
                      styles={GetMenuListStyles(inventoryOptions.length)}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="productId"
                  render={({ field: { onChange, value } }) => (
                    <Select
                      label={t("form-product")}
                      labelClassName="text-title"
                      options={productOptions}
                      value={
                        productOptions.find(
                          (option) => option.value === value
                        ) || null
                      }
                      onChange={(option: any) => onChange(option?.value)}
                      isLoading={isProductLoading}
                      isDisabled={isProductLoading || true}
                      placeholder={t("form-product")}
                      menuPortalTarget={document.body}
                      styles={GetMenuListStyles(inventoryOptions.length)}
                    />
                  )}
                />
                <Input
                  isRequired
                  labelClassName="bg-paper"
                  label={t("form-forecast-period")}
                  {...register("forecastPeriod")}
                  error={
                    errors.forecastPeriod?.message
                      ? t(errors.forecastPeriod?.message)
                      : ""
                  }
                  disabled={true}
                  className="flex-grow"
                  helperText={("Specify the time period for planning (e.g., Q1 2024, Jan-Mar 2024)")}
                />
                <Input
                  labelClassName="bg-paper"
                  isRequired
                  label={t("form-sales-data-integration")}
                  {...register("salesDataIntegration")}
                  error={
                    errors.salesDataIntegration?.message
                      ? t(errors.salesDataIntegration?.message)
                      : ""
                  }
                  className="flex-grow"
                  helperText={("Source of sales data integration (e.g., ERP, CRM, Manual Entry)")}
                />
                <Input
                  labelClassName="bg-paper"
                  isRequired
                  min={0}
                  onKeyDown={(e) => {
                    if (e.key === "-" || e.key === "e") {
                      e.preventDefault()
                    }
                  }}
                  label={t("form-current-sales-data")}
                  {...register("currentSalesData", {
                    valueAsNumber: true,
                    min: 0,
                  })}
                  error={
                    errors.currentSalesData?.message
                      ? t(errors.currentSalesData?.message)
                      : ""
                  }
                  className="flex-grow"
                   helperText={("Actual sales volume for the current period")}
                />
                <Input
                  labelClassName="bg-paper"
                  isRequired
                   min={0}
                  onKeyDown={(e) => {
                    if (e.key === "-" || e.key === "e") {
                      e.preventDefault()
                    }
                  }}
                  label={t("form-adjusted-forecast")}
                  {...register("adjustedForecast", {
                    valueAsNumber: true,
                    min: 0,
                  })}
                  error={
                    errors.adjustedForecast?.message
                      ? t(errors.adjustedForecast?.message)
                      : ""
                  }
                  className="flex-grow"
                  helperText={("Modified forecast based on current market conditions and trends")}
                />
                <Input
                  labelClassName="bg-paper"
                  isRequired
                   min={0}
                  onKeyDown={(e) => {
                    if (e.key === "-" || e.key === "e") {
                      e.preventDefault()
                    }
                  }}
                  label={t("form-planned-sales-target")}
                  {...register("plannedSalesTarget", {
                    valueAsNumber: true,
                    min: 0,
                  })}
                  error={
                    errors.plannedSalesTarget?.message
                      ? t(errors.plannedSalesTarget?.message)
                      : ""
                  }
                  className="flex-grow"
                  helperText={("Target sales volume to be achieved in the planning period")}
                />
                <Input
                  labelClassName="bg-paper"
                  isRequired
                 min={0}
                  onKeyDown={(e) => {
                    if (e.key === "-" || e.key === "e") {
                      e.preventDefault()
                    }
                  }}
                  label={t("form-confidence-interval")}
                  type="number"
                  {...register("demandVariationPercentage", {
                    valueAsNumber: true,
                    min: 0,
                  })}
                  error={
                    errors.demandVariationPercentage?.message
                      ? t(errors.demandVariationPercentage?.message)
                      : ""
                  }
                  className="flex-grow"
                   helperText={("Confidence level in percentage (0-100%) for the forecast accuracy")}
                />
              </FormGroup>
            </FormGroupContainer>
            <FormStickyActions
              isEditForm={isEditForm}
              backToListPath={
                routes.scm.demandForecasting.salesOperationsPlan.salesOperationPlan
              }
              isLoading={
                isCreateSalesOperationPlanLoading ||
                isUpdateSalesOperationPlanLoading
              }
              className="mt-7"
            />
          </>
        )}
      </Form>
    </Box>
  )
}
