"use client"

import { Form } from "@core/ui/form"
import { useAtom } from "jotai"
import { useTranslations } from "next-intl"
import { Controller, SubmitHandler } from "react-hook-form"

import FormGroup from "@/components/base/form-group"
import FormGroupContainer from "@/components/base/form-group-container"
import FormStickyActions from "@/components/base/form-sticky-actions"
import { Input, Select, Textarea } from "@/components/ui"
import Box from "@/components/ui/box"
import { routes } from "@/config/routes"
import { useSCMSharedDataHook } from "@/modules/scm/constants/shared-data-hooks"
import { forecastPeriodOptions } from "@/modules/scm/constants/shared-status-field-option"
import {
  useCreateForecast,
  useUpdateForecast,
} from "@/modules/scm/hooks/demand-and-forecasting/forecast/use-forecast"
import { useStockById } from "@/modules/scm/hooks/inventory/stock/use-stock"
import { stockTemplateId } from "@/modules/scm/store/global-store-state"
import { Forecast } from "@/modules/scm/types/demand-and-forecasting/forecast/forecast-types"
import { Stock } from "@/modules/scm/types/inventory/stock-overview/stock-overview-types"
import {
  FindSelectOption,
  GetMenuListStyles,
} from "@/modules/scm/utils/select-options"
import { ForecastSchema } from "@/modules/scm/validators/demand-forecasting/forecast.schema"

import { defaultForecast } from "./form-utils"

type IndexProps =
  | {
      initialData?: Forecast
      isEditForm?: true
    }
  | {
      initialData?: undefined
      isEditForm?: false
    }

export default function ForecastCreateEdit({
  initialData,
  isEditForm,
}: IndexProps) {
  const t = useTranslations("form")

  const { stock, productCode } = useSCMSharedDataHook(["stock", "productCode"])

  const [stockTemplate, setStockTemplate] = useAtom(stockTemplateId)

  const { stockOptions, isStockLoading } = stock
  const { productCodeOptions, isProductCodeLoading } = productCode

  const { data: stockDetails, isLoading: isStockDetailsLoading } = useStockById(
    stockTemplate
  ) as {
    data: Stock | undefined
    isLoading: boolean
  }

  const { mutateAsync: createForecast, isPending: isCreateForecastLoading } =
    useCreateForecast()
  const { mutateAsync: updateForecast, isPending: isUpdateForecastLoading } =
    useUpdateForecast()

  const onSubmit: SubmitHandler<Forecast> = async (data) => {
    if (isEditForm) {
      await updateForecast({ data: { id: initialData?.id!, ...data } })
    } else {
      await createForecast(data)
    }
  }
  return (
    <Box>
      <Form<Forecast>
        onSubmit={onSubmit}
        validationSchema={ForecastSchema}
        // resetValues={reset}
        className="flex grow flex-col justify-between pt-7 @container @2xl:pt-9 @3xl:pt-11"
        useFormProps={{
          mode: "onChange",
          defaultValues: defaultForecast || initialData,
          reValidateMode: "onChange",
          values: initialData,
        }}>
        {({ register, control, setValue, formState: { errors } }) => (
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
                      options={stockOptions}
                      value={
                        stockOptions.find(
                          (option: any) => option.value === value
                        ) || null
                      }
                      onChange={(option: any) => {
                        onChange(option?.value)
                        setStockTemplate(option?.value)
                      }}
                      onMenuClose={() => {
                        if (stockDetails?.productId) {
                          setValue("productId", stockDetails.productId)
                        }
                      }}
                      isLoading={isStockLoading}
                      isDisabled={isStockLoading}
                      placeholder={t("form-inventory")}
                      menuPortalTarget={document.body}
                      styles={GetMenuListStyles(stockOptions.length)}
                      isRequired
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
                      options={productCodeOptions}
                      value={
                        productCodeOptions.find(
                          (option: any) =>
                            option.value === (value || stockDetails?.productId)
                        ) || null
                      }
                      onChange={(option: any) => onChange(option?.value)}
                      isLoading={isProductCodeLoading || isStockDetailsLoading}
                      isDisabled={isProductCodeLoading || isStockDetailsLoading || true}
                      placeholder={t("form-product")}
                      menuPortalTarget={document.body}
                      styles={GetMenuListStyles(productCodeOptions.length)}
                      isRequired
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="forecastPeriod"
                  render={({ field: { onChange, value } }) => (
                    <Select
                      label={t("form-forecast-period")}
                      labelClassName="text-title"
                      placeholder={t("form-forecast-period")}
                      options={forecastPeriodOptions}
                      onChange={(option: any) => onChange(option?.value)}
                      value={FindSelectOption(forecastPeriodOptions, value)}
                      error={
                        errors.forecastPeriod?.message
                          ? t(errors.forecastPeriod?.message)
                          : ""
                      }
                      menuPortalTarget={document.body}
                      styles={GetMenuListStyles(forecastPeriodOptions.length)}
                      isDisabled={isProductCodeLoading || isStockDetailsLoading}
                      isRequired
                      
                    />
                  )}
                />
                <Input
                  labelClassName="bg-paper"
                  label={t("form-forecast-method")}
                  {...register("forecastMethod")}
                  error={
                    errors.forecastMethod?.message
                      ? t(errors.forecastMethod?.message)
                      : ""
                  }
                  className="flex-grow"
                  helperText={
                    "Enter forecasting technique (e.g., Moving Average, Exponential Smoothing)"
                  }
                  isRequired
                />
                 <Input
                  labelClassName="bg-paper"
                  label={t("form-historical-lead-time")}
                  type="number"
                  min={0}
                  onKeyDown={(e) => {
                    if (e.key === "-" || e.key === "e") {
                      e.preventDefault()
                    }
                  }}
                  {...register("historicalLeadTime", {
                    setValueAs: (value) => value.toString(),
                    min: 0,
                  })}
                  error={
                    errors.historicalLeadTime?.message
                      ? t(errors.historicalLeadTime?.message)
                      : ""
                  }
                  className="flex-grow"
                  helperText={
                    "Average time between order placement and delivery (in days)"
                  }
                  isRequired
                />
                <Input
                  labelClassName="bg-paper"
                  type="number"
                  min={0}
                  onKeyDown={(e) => {
                    if (e.key === "-" || e.key === "e") {
                      e.preventDefault()
                    }
                  }}
                  label={t("form-forecasted-demand")}
                  {...register("forecastedDemand", {
                    setValueAs: (value) => value.toString(),
                    min: 0,
                  })}
                  error={
                    errors.forecastedDemand?.message
                      ? t(errors.forecastedDemand?.message)
                      : ""
                  }
                  className="flex-grow"
                  helperText={
                    "Predicted quantity needed for the forecast period"
                  }
                  isRequired
                />
                <Input
                  type="number"
                  min={0}
                  onKeyDown={(e) => {
                    if (e.key === "-" || e.key === "e") {
                      e.preventDefault()
                    }
                  }}
                  labelClassName="bg-paper"
                  label={t("form-past-sales-data")}
                  {...register("pastSalesData", {
                    setValueAs: (value) => {
                      // Convert to number and format to 2 decimal places
                      const numValue = parseFloat(value);
                      return numValue ? numValue.toFixed(2) : value;
                    },
                    min: 0,
                  })}
                  error={
                    errors.pastSalesData?.message
                      ? t(errors.pastSalesData?.message)
                      : ""
                  }
                  className="flex-grow"
                  helperText={"Historical sales quantity for previous period"}
                  isRequired
                />
                <Input
                  labelClassName="bg-paper"
                  label={t("form-confidence-interval")}
                  type="number"
                  min={0}
                  onKeyDown={(e) => {
                    if (e.key === "-" || e.key === "e") {
                      e.preventDefault()
                    }
                  }}
                  {...register("confidenceInterval", {
                    valueAsNumber: true,
                    min: 0,
                  })}
                  error={
                    errors.confidenceInterval?.message
                      ? t(errors.confidenceInterval?.message)
                      : ""
                  }
                  className="flex-grow"
                  helperText={"Statistical confidence level (0-100%)"}
                />
                <Input
                  labelClassName="bg-paper"
                  label={t("form-forecast-adjustments")}
                  {...register("forecastAdjustments")}
                  error={
                    errors.forecastAdjustments?.message
                      ? t(errors.forecastAdjustments?.message)
                      : ""
                  }
                  className="flex-grow"
                  helperText={
                    "Manual adjustments based on market conditions or events"
                  }
                />
                <Input
                  labelClassName="bg-paper"
                  label={t("form-seasonality-adjustments")}
                  {...register("seasonalityAdjustments")}
                  error={
                    errors.seasonalityAdjustments?.message
                      ? t(errors.seasonalityAdjustments?.message)
                      : ""
                  }
                  className="flex-grow"
                  helperText={"Adjustments for seasonal patterns or trends"}
                />

                <Textarea
                  labelClassName="bg-paper"
                  label={t("form-notes")}
                  {...register("notes")}
                  error={errors.notes?.message ? t(errors.notes?.message) : ""}
                  className="flex-grow text-title"
                  helperText={
                    "Additional comments or observations about the forecast"
                  }
                />
              </FormGroup>
            </FormGroupContainer>
            <FormStickyActions
              isEditForm={isEditForm}
              backToListPath={
                routes.scm.demandForecasting.forecast.demandForecasting
              }
              isLoading={isCreateForecastLoading || isUpdateForecastLoading}
              className="mt-7"
            />
          </>
        )}
      </Form>
    </Box>
  )
}
