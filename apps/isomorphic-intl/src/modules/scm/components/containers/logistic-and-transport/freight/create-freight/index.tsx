"use client"

import { Form } from "@core/ui/form"
import { useTranslations } from "next-intl"
import { Controller, SubmitHandler } from "react-hook-form"

import { DatePicker } from "@/components/base/date-picker"
import FormGroup from "@/components/base/form-group"
import FormGroupContainer from "@/components/base/form-group-container"
import FormStickyActions from "@/components/base/form-sticky-actions"
import { Input } from "@/components/ui"
import Box from "@/components/ui/box"
import { routes } from "@/config/routes"
import {
  useCreateFreight,
  useUpdateFreight,
} from "@/modules/scm/hooks/logistic-and-transport/freight/use-freight"
import { Freight } from "@/modules/scm/types/logistics-and-transport/freight/freight-types"
import { FreightSchema } from "@/modules/scm/validators/logistic-and-transport/freight.schema"

import { defaultFreight } from "./form-utils"

type IndexProps =
  | {
      initialData?: Freight
      isEditForm?: true
    }
  | {
      initialData?: any
      isEditForm?: false
    }

export default function FreightCreateEdit({
  initialData,
  isEditForm,
}: IndexProps) {
  const t = useTranslations("form")

  const { mutateAsync: createFreight, isPending: isCreateFreightLoading } =
    useCreateFreight()
  const { mutateAsync: updateFreight, isPending: isUpdateFreightLoading } =
    useUpdateFreight()

  const onSubmit: SubmitHandler<Freight> = async (data) => {
    const payload = {
      ...data,
      transitCost: Number(data.transitCost) || 0,
    }
    if (isEditForm) {
      await updateFreight({ data: { id: initialData?.id!, ...payload } })
    } else {
      await createFreight({
        ...payload,
        shipmentId: initialData?.id,
        carrierId: initialData?.carrierId,
      })
    }
  }
  return (
    <Box>
      <Form<Freight>
        onSubmit={onSubmit}
        validationSchema={FreightSchema}
        className="flex grow flex-col justify-between pt-7 @container @2xl:pt-9 @3xl:pt-11"
        useFormProps={{
          mode: "onChange",
          defaultValues: defaultFreight || initialData,
          reValidateMode: "onChange",
          values: initialData,
        }}>
        {({ register, control, formState: { errors } }) => (
          <>
            <FormGroupContainer>
              <FormGroup
                title={t(
                  isEditForm ? "form-freight-edit" : "form-create-freight"
                )}>
                <Input
                  labelClassName="bg-paper"
                  type="text"
                  label={t("form-origin")}
                  {...register("origin")}
                  error={
                    errors.origin?.message ? t(errors.origin?.message) : ""
                  }
                  className="flex-grow"
                />
                <Input
                  labelClassName="bg-paper"
                  type="text"
                  label={t("form-destination")}
                  {...register("destination")}
                  error={
                    errors.destination?.message
                      ? t(errors.destination?.message)
                      : ""
                  }
                  className="flex-grow"
                />
                <Input
                  labelClassName="bg-paper"
                  isRequired
                  type="number"
                  label={t("form-transit-cost")}
                  {...register("transitCost", { valueAsNumber: true })}
                  error={
                    errors.transitCost?.message
                      ? t(errors.transitCost?.message)
                      : ""
                  }
                  className="flex-grow"
                />
                {/* <Controller
                  control={control}
                  name="origin"
                  render={({ field: { onChange, value } }) => (
                    <Select
                      label={t("form-origin")}
                      labelClassName="text-title"
                      options={warehouseOptions}
                      value={FindSelectOption(warehouseOptions, value)}
                      onChange={(option: any) => {
                        onChange(option?.value)
                        setOrigin(option?.label)
                      }}
                      isLoading={isWarehouseLoading}
                      isDisabled={isWarehouseLoading}
                      placeholder={t("form-origin")}
                      menuPortalTarget={document.body}
                      styles={GetMenuListStyles(warehouseOptions.length)}
                    />
                  )}
                /> */}
                {/* <Controller
                  control={control}
                  name="destination"
                  render={({ field: { onChange, value } }) => (
                    <Select
                      label={t("form-destination")}
                      labelClassName="text-title"
                      options={warehouseOptions}
                      value={FindSelectOption(warehouseOptions, value)}
                      onChange={(option: any) => {
                        onChange(option?.value)
                        setDestination(option?.label)
                      }}
                      isLoading={isWarehouseLoading}
                      isDisabled={isWarehouseLoading}
                      placeholder={t("form-destination")}
                      menuPortalTarget={document.body}
                      styles={GetMenuListStyles(warehouseOptions.length)}
                    />
                  )}
                /> */}
                <div>
                  <Controller
                    control={control}
                    name="routeStart"
                    render={({ field: { value, onChange } }) => (
                      <div className="relative">
                        <label
                          htmlFor="routeStart"
                          className="mb-2 block text-sm font-medium text-title transition-colors duration-200">
                          {t("form-route-start")}
                        </label>
                        <DatePicker
                          id="routeStart"
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
                  {errors.routeStart && (
                    <p className="text-sm text-red-500">
                      {errors.routeStart.message
                        ? t(errors.routeStart.message)
                        : ""}
                    </p>
                  )}
                </div>
                <div>
                  <Controller
                    control={control}
                    name="routeEnd"
                    render={({ field: { value, onChange } }) => (
                      <div className="relative">
                        <label
                          htmlFor="routeEnd"
                          className="mb-2 block text-sm font-medium text-title transition-colors duration-200">
                          {t("form-route-end")}
                        </label>
                        <DatePicker
                          id="routeEnd"
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
                  {errors.routeEnd && (
                    <p className="text-sm text-red-500">
                      {errors.routeEnd.message
                        ? t(errors.routeEnd.message)
                        : ""}
                    </p>
                  )}
                </div>
              </FormGroup>
            </FormGroupContainer>
            <FormStickyActions
              isEditForm={isEditForm}
              backToListPath={routes.scm.logisticsAndTransport.freight.freight}
              isLoading={isCreateFreightLoading || isUpdateFreightLoading}
              className="mt-7"
            />
          </>
        )}
      </Form>
    </Box>
  )
}
