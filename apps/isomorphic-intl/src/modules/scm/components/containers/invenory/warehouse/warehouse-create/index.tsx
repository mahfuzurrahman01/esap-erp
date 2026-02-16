"use client"

import { useState } from "react"

import { Form } from "@core/ui/form"
import { useTranslations } from "next-intl"
import { Controller, SubmitHandler } from "react-hook-form"

import { DatePicker } from "@/components/base/date-picker"
import FormStickyActions from "@/components/base/form-sticky-actions"
import SectionGroup from "@/components/base/section-group"
import { Checkbox, Input, Select } from "@/components/ui"
import { routes } from "@/config/routes"
import { useSCMSharedDataHook } from "@/modules/scm/constants/shared-data-hooks"
import {
  useCreateWarehouse,
  useUpdateWarehouse,
} from "@/modules/scm/hooks/inventory/warehouse/use-warehouse"
import {
  Warehouse,
  WarehouseInput,
} from "@/modules/scm/types/inventory/warehouse/warehouse-types"
import { FindSelectOption } from "@/modules/scm/utils/select-options"
import { WarehouseSchema } from "@/modules/scm/validators/inventory/warehouse.schema"

import { defaultWarehouse } from "./form-utils"

type IndexProps =
  | {
      initialData?: Warehouse
      isEditForm?: true
    }
  | {
      initialData?: undefined
      isEditForm?: false
    }

export default function WarehouseCreateEdit({
  initialData,
  isEditForm,
}: IndexProps) {
  const { warehouseManager, company } = useSCMSharedDataHook([
    "warehouseManager",
    "company",
  ])

  const { warehouseManagerOptions, isWarehouseManagerLoading } =
    warehouseManager

  const { companyOptions, isCompanyLoading } = company

  const [selectedWarehouseManagerId, setSelectedWarehouseManagerId] = useState<
    number | undefined
  >()
  const [selectedCompanyName, setSelectedCompanyName] = useState<
    string | undefined
  >(undefined)

  const { mutate: createWarehouse, isPending: isCreateWarehousePending } =
    useCreateWarehouse()
  const { mutate: updateWarehouse, isPending: isUpdateWarehousePending } =
    useUpdateWarehouse()

  const onSubmit: SubmitHandler<WarehouseInput> = async (data) => {
    const warehouseData = {
      ...data,
      warehouseManagerId:
        selectedWarehouseManagerId || initialData?.warehouseManagerId,
      companyName: selectedCompanyName || initialData?.companyName,
      status: true,
      // Format time values to only include the time portion
      startHour: data.startHour || initialData?.startHour,
      endHour: data.endHour || initialData?.endHour,
      // datePicked: data.datePicked || initialData?.datePicked,
    }

    if (isEditForm) {
      updateWarehouse({
        data: {
          id: initialData?.id,
          ...warehouseData,
        },
      })
    } else {
      createWarehouse(warehouseData)
    }
  }

  const t = useTranslations("form")

  return (
    <Form<WarehouseInput>
      onSubmit={onSubmit}
      validationSchema={WarehouseSchema}
      className="card-shadow border-none bg-gray-0 @container dark:bg-gray-800"
      useFormProps={{
        mode: "onChange",
        defaultValues: {
          ...defaultWarehouse,
          ...initialData,
          // Convert time strings to Date objects for the DatePicker
          startHour: initialData?.startHour || "",
          endHour: initialData?.endHour || "",
        },
        values: initialData,
      }}>
      {({ register, control, formState: { errors } }) => (
        <>
          <div className="grid gap-7 @2xl:pt-9 @3xl:pt-11">
            <SectionGroup>
              <Input
                labelClassName="bg-paper"
                isRequired
                label={t("form-warehouse-name")}
                type="text"
                {...register("warehouseName")}
                error={
                  errors.warehouseName?.message
                    ? t(errors.warehouseName?.message)
                    : ""
                }
                className="flex-grow"
              />
              <Controller
                control={control}
                name="warehouseManagerId"
                render={({ field: { onChange, value } }) => (
                  <Select
                    label={t("form-warehouse-manager")}
                    isRequired
                    labelClassName="text-title"
                    options={warehouseManagerOptions}
                    value={FindSelectOption(warehouseManagerOptions, value)}
                    onChange={(selectedValue: any) => {
                      setSelectedWarehouseManagerId(selectedValue.value)
                      onChange(selectedValue.value)
                    }}
                    isLoading={isWarehouseManagerLoading}
                    isDisabled={isWarehouseManagerLoading}
                    placeholder={t("form-warehouse-manager")}
                    error={
                      errors?.warehouseManagerId?.message
                        ? t(errors.warehouseManagerId?.message)
                        : ""
                    }
                  />
                )}
              />
              <Controller
                control={control}
                name="companyId"
                render={({ field: { onChange, value } }) => (
                  <Select
                    label={t("form-company")}
                    isRequired
                    labelClassName="text-title"
                    options={companyOptions}
                    value={FindSelectOption(companyOptions, value)}
                    onChange={(selectedValue: any) => {
                      setSelectedCompanyName(selectedValue.label)
                      onChange(selectedValue.value)
                    }}
                    isLoading={isCompanyLoading}
                    isDisabled={isCompanyLoading}
                    placeholder={t("form-company")}
                    error={
                      errors?.companyId?.message
                        ? t(errors.companyId?.message)
                        : ""
                    }
                  />
                )}
              />
              <Input
                labelClassName="bg-paper"
                label={t("form-locations")}
                isRequired
                type="text"
                {...register("location")}
                error={
                  errors.location?.message ? t(errors.location?.message) : ""
                }
                className="flex-grow"
              />
              <Input
                labelClassName="bg-paper"
                label={t("form-capacity")}
                isRequired
                type="number"
                {...register("capacity", {
                  valueAsNumber: true,
                })}
                error={
                  errors.capacity?.message ? t(errors.capacity?.message) : ""
                }
                className="flex-grow"
              />
              <Input
                labelClassName="bg-paper"
                isRequired
                label={t("form-in-use-capacity")}
                type="number"
                {...register("inUseCapacity", {
                  valueAsNumber: true,
                })}
                error={
                  errors.inUseCapacity?.message
                    ? t(errors.inUseCapacity?.message)
                    : ""
                }
                className="flex-grow"
              />
              <Input
                labelClassName="bg-paper"
                label={t("form-emergency-contact")}
                type="text"
                {...register("emergencyContact")}
                error={
                  errors.emergencyContact?.message
                    ? t(errors.emergencyContact?.message)
                    : ""
                }
                className="flex-grow"
              />
              <Input
                labelClassName="bg-paper"
                label={t("form-bin-location")}
                type="text"
                {...register("binLocation")}
                error={
                  errors.binLocation?.message
                    ? t(errors.binLocation?.message)
                    : ""
                }
                className="flex-grow"
              />
              <Input
                labelClassName="bg-paper"
                label={t("form-zoning-location")}
                type="text"
                {...register("zoningLocation")}
                error={
                  errors.zoningLocation?.message
                    ? t(errors.zoningLocation?.message)
                    : ""
                }
                className="flex-grow"
              />
              <div className="col-span-full">
                <div className="grid grid-cols-2 gap-7">
                  <div>
                    <Controller
                      control={control}
                      name="startHour"
                      render={({ field: { onChange, value } }) => (
                        <div className="relative">
                          <label
                            htmlFor="startHour"
                            className="mb-2 block text-sm font-medium text-title transition-colors duration-200">
                            {t("form-start-time")}{" "}
                            <span className="text-orange-500">*</span>
                          </label>
                          <DatePicker
                            id="startHour"
                            selected={
                              value
                                ? new Date(
                                    `${new Date().toISOString().split("T")[0]}T${value}`
                                  )
                                : null
                            }
                            onChange={(date: any) => {
                              if (date) {
                                const timeString = date
                                  .toTimeString()
                                  .slice(0, 8)
                                onChange(timeString)
                              } else {
                                onChange(null)
                              }
                            }}
                            dateFormat="yyyy-MM-dd h:mm aa"
                            placeholderText={t("form-select-start-time")}
                            popperPlacement="bottom-start"
                            showTimePicker={true}
                            withPortal
                            error={
                              errors.startHour?.message
                                ? t(errors.startHour?.message)
                                : ""
                            }
                          />
                        </div>
                      )}
                    />
                  </div>
                  <div>
                    <Controller
                      control={control}
                      name="endHour"
                      render={({ field: { onChange, value } }) => (
                        <div className="relative">
                          <label
                            htmlFor="endHour"
                            className="mb-2 block text-sm font-medium text-title transition-colors duration-200">
                            {t("form-end-time")}{" "}
                            <span className="text-orange-500">*</span>
                          </label>
                          <DatePicker
                            id="endHour"
                            selected={
                              value
                                ? new Date(
                                    `${new Date().toISOString().split("T")[0]}T${value}`
                                  )
                                : null
                            }
                            onChange={(date: any) => {
                              if (date) {
                                const timeString = date
                                  .toTimeString()
                                  .slice(0, 8)
                                onChange(timeString)
                              } else {
                                onChange(null)
                              }
                            }}
                            dateFormat="yyyy-MM-dd h:mm aa"
                            placeholderText={t("form-select-end-time")}
                            popperPlacement="bottom-start"
                            showTimePicker={true}
                            withPortal
                            error={
                              errors.endHour?.message
                                ? t(errors.endHour?.message)
                                : ""
                            }
                          />
                        </div>
                      )}
                    />
                  </div>
                </div>
              </div>
              <Input
                labelClassName="bg-paper"
                isRequired
                label={t("form-picked-by")}
                type="text"
                {...register("pickedBy")}
                error={
                  errors.pickedBy?.message
                    ? t(errors.pickedBy?.message)
                    : ""
                }
                className="flex-grow"
              />
              <Input
                labelClassName="bg-paper"
                isRequired
                label={t("form-packed-by")}
                type="text"
                {...register("packedBy")}
                error={
                  errors.packedBy?.message
                    ? t(errors.packedBy?.message)
                    : ""
                }
                className="flex-grow"
              />
              <Input
                labelClassName="bg-paper"
                label={t("form-quantity-to-pick")}
                isRequired
                type="number"
                {...register("quantityToPick", {
                  valueAsNumber: true,
                })}
                error={
                  errors.quantityToPick?.message
                    ? t(errors.quantityToPick?.message)
                    : ""
                }
                className="flex-grow"
              />
              <div>
                <Controller
                  control={control}
                  name="datePicked"
                  render={({ field: { value, onChange } }) => (
                    <div className="relative">
                      <label
                        htmlFor="datePicked"
                        className="mb-2 block text-sm font-medium text-title transition-colors duration-200">
                        {t("form-date-picked")}{" "}
                        <span className="text-orange-500">*</span>
                      </label>
                      <DatePicker
                        id="datePicked"
                        value={value ? new Date(value) : null}
                        onChange={(date: any) =>
                          onChange(date ? date.toISOString() : "")
                        }
                        placeholderText={t("form-select-date")}
                        className="w-full"
                        minDate={new Date()}
                        error={
                          errors.datePicked?.message
                            ? t(errors.datePicked?.message)
                            : ""
                        }
                      />
                    </div>
                  )}
                />
              </div>
              <Controller
                name="temperatureControlled"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Checkbox
                    label={t("form-temperature-controlled")}
                    checked={value}
                    onChange={onChange}
                  />
                )}
              />
              {errors.temperatureControlled && (
                <p className="text-sm text-red-500">
                  {errors.temperatureControlled.message
                    ? t(errors.temperatureControlled.message)
                    : ""}
                </p>
              )}
              <Controller
                name="fireSafetyCompliance"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Checkbox
                    label={t("form-fire-safety-compliance")}
                    checked={value}
                    onChange={onChange}
                  />
                )}
              />
              {errors.fireSafetyCompliance && (
                <p className="text-sm text-red-500">
                  {errors.fireSafetyCompliance.message
                    ? t(errors.fireSafetyCompliance.message)
                    : ""}
                </p>
              )}
            </SectionGroup>
          </div>
          <FormStickyActions
            isEditForm={isEditForm}
            backToListPath={routes.scm.inventory.warehouse.warehouse}
            isLoading={isCreateWarehousePending || isUpdateWarehousePending}
            className="mt-7"
          />
        </>
      )}
    </Form>
  )
}
