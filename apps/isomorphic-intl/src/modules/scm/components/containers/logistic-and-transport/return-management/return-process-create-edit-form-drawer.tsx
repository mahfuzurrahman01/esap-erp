"use client"

import React from "react"

import { Form } from "@core/ui/form"
import { useTranslations } from "next-intl"
import { Controller, SubmitHandler } from "react-hook-form"
import SimpleBar from "simplebar-react"

import { DatePicker } from "@/components/base/date-picker"
import DrawerFormActions from "@/components/base/drawer-form-actions"
import DrawerHeader from "@/components/base/drawer-header"
import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import { Input, Select } from "@/components/ui"
import { useSelectOptions } from "@/hooks/use-select-options"
import { useProductList } from "@/modules/scm/hooks/inventory/product/use-product"
import {
  useCreateReturnProcess,
  useUpdateReturnProcess,
} from "@/modules/scm/hooks/logistic-and-transport/return-process/use-return-process"
import { useShipmentList } from "@/modules/scm/hooks/logistic-and-transport/shipment/use-shipment"
import { Product } from "@/modules/scm/types/inventory/products/products-types"
import { ReturnProcess } from "@/modules/scm/types/logistics-and-transport/return-process/return-process-types"
import { Shipment } from "@/modules/scm/types/logistics-and-transport/shipment/shipment-types"
import {
  FindSelectOption,
  GetMenuListStyles,
} from "@/modules/scm/utils/select-options"
import {
  ReturnProcessSchema,
  UpdateReturnProcessSchema,
} from "@/modules/scm/validators/logistic-and-transport/return-process.schema"

import { returnStatusOptions } from "./status-option"

type IndexProps =
  | {
      initialData?: ReturnProcess
      isEditForm?: true
    }
  | {
      initialData?: undefined
      isEditForm?: false
    }

export default function ReturnProcessCreateEditFormDrawer({
  initialData,
  isEditForm,
}: IndexProps) {
  const { closeDrawer } = useDrawer()

  const { data: shipmentList, isLoading: isShipmentLoading } = useShipmentList()

  const { data: productList, isLoading: isProductLoading } = useProductList()

  const shipmentOptions = useSelectOptions<Shipment>(shipmentList?.data, "id")

  const productOptions = useSelectOptions<Product>(
    productList?.data,
    "productName"
  )

  const {
    mutate: createReturnProcess,
    isPending: isCreateReturnProcessPending,
  } = useCreateReturnProcess()

  const {
    mutate: updateReturnProcess,
    isPending: isUpdateReturnProcessPending,
  } = useUpdateReturnProcess()

  const onSubmit: SubmitHandler<ReturnProcess> = (data) => {
    if (isEditForm) {
      updateReturnProcess({
        data: {
          ...data,
          id: initialData?.id,
        },
      })
    } else {
      createReturnProcess({
        ...data,
      })
    }
  }
  const t = useTranslations("form")

  const defaultValues = {
    shipmentId: 0,
    productId: 0,
    reasonForReturn: "",
    quantityReturned: 0,
    requestDate: new Date().toISOString(),
    returnStatus: "in-progress",
    approvalStatus: "pending",
  }

  return (
    <div className="flex h-full flex-col">
      <DrawerHeader
        heading={
          isEditForm
            ? t("form-edit-return-process")
            : t("form-add-new-return-process")
        }
        onClose={closeDrawer}
        headerClassName="mb-0"
      />
      <Form<ReturnProcess>
        onSubmit={onSubmit}
        validationSchema={
          isEditForm ? UpdateReturnProcessSchema : ReturnProcessSchema
        }
        useFormProps={{
          mode: "onChange",
          reValidateMode: "onChange",
          defaultValues: defaultValues || initialData,
          values: initialData,
        }}
        className="flex grow flex-col">
        {({ register, control, formState: { errors } }) => {
          return (
            <>
              <SimpleBar className="h-full grow">
                <div className="flex flex-col gap-4 px-5 py-6">
                  <Controller
                    control={control}
                    name="shipmentId"
                    render={({ field: { onChange, value } }) => (
                      <Select
                        label={t("form-shipment")}
                        placeholder={t("form-shipment")}
                        labelClassName="text-title"
                        options={shipmentOptions}
                        onChange={(option: any) => onChange(option?.value)}
                        value={FindSelectOption(shipmentOptions, value)}
                        isLoading={isShipmentLoading}
                        isDisabled={isShipmentLoading || isEditForm}
                        error={
                          errors?.shipmentId?.message
                            ? t(errors.shipmentId.message)
                            : ""
                        }
                        styles={GetMenuListStyles(shipmentOptions.length)}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="productId"
                    render={({ field: { onChange, value } }) => (
                      <Select
                        label={t("form-product")}
                        placeholder={t("form-product")}
                        labelClassName="text-title"
                        options={productOptions}
                        onChange={(option: any) => {
                          onChange(option.value)
                        }}
                        value={FindSelectOption(productOptions, value)}
                        isLoading={isProductLoading}
                        isDisabled={isProductLoading || isEditForm}
                        error={
                          errors?.productId?.message
                            ? t(errors.productId.message)
                            : ""
                        }
                        styles={GetMenuListStyles(productOptions.length)}
                      />
                    )}
                  />
                  <Input
                    labelClassName="bg-paper"
                    label={t("form-reason-for-return")}
                    {...register("reasonForReturn")}
                    error={
                      errors.reasonForReturn?.message
                        ? t(errors.reasonForReturn.message)
                        : ""
                    }
                    className="col-span-2"
                  />
                  <Input
                    labelClassName="bg-paper"
                    type="number"
                    label={t("form-quantity-returned")}
                    {...register("quantityReturned", {
                      valueAsNumber: true,
                    })}
                    error={
                      errors.quantityReturned?.message
                        ? t(errors.quantityReturned.message)
                        : ""
                    }
                    className="col-span-2"
                  />
                  <div>
                    <Controller
                      control={control}
                      name="requestDate"
                      render={({ field: { value, onChange } }) => (
                        <div className="relative">
                          <label
                            htmlFor="requestDate"
                            className="mb-2 block text-sm font-medium text-title transition-colors duration-200">
                            {t("form-request-date")}
                          </label>
                          <DatePicker
                            id="requestDate"
                            placeholderText={t("form-request-date")}
                            value={value ? new Date(value) : null}
                            onChange={(date: any) =>
                              onChange(date ? date.toISOString() : "")
                            }
                            minDate={new Date()}
                            className="w-full"
                          />
                        </div>
                      )}
                    />
                    {errors.requestDate && (
                      <p className="text-sm text-red-500">
                        {t(errors.requestDate.message)}
                      </p>
                    )}
                  </div>
                  <Controller
                    control={control}
                    name="returnStatus"
                    render={({ field: { onChange, value } }) => (
                      <Select
                        options={returnStatusOptions}
                        label={t("form-return-status")}
                        {...register("returnStatus")}
                        value={FindSelectOption(returnStatusOptions, value)}
                        onChange={(selectedValue: any) => {
                          onChange(selectedValue?.value)
                        }}
                        className="col-span-2 text-gray-900 dark:text-gray-0"
                        error={
                          errors.returnStatus?.message
                            ? t(errors.returnStatus.message)
                            : ""
                        }
                      />
                    )}
                  />
                </div>
              </SimpleBar>
              <DrawerFormActions
                handleCloseDrawer={closeDrawer}
                isEditForm={isEditForm}
                isLoading={
                  isCreateReturnProcessPending || isUpdateReturnProcessPending
                }
              />
            </>
          )
        }}
      </Form>
    </div>
  )
}
