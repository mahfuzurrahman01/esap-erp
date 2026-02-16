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
import { useModal } from "@/components/base/modal-views/use-modal"
import { Select } from "@/components/ui"
import { useSelectOptions } from "@/hooks/use-select-options"
import { useStockTransferDropdown } from "@/modules/scm/hooks/inventory/stock-transfer/use-stock-transfer"
import { useCarrierList } from "@/modules/scm/hooks/logistic-and-transport/carrier/use-carrier"
import {
  useCreateShipment,
  useUpdateShipment,
} from "@/modules/scm/hooks/logistic-and-transport/shipment/use-shipment"
import { StockTransfer } from "@/modules/scm/types/inventory/stock-transfer/stock-transfer-types"
import { Carrier } from "@/modules/scm/types/logistics-and-transport/carriers/carriers-types"
import { Shipment } from "@/modules/scm/types/logistics-and-transport/shipment/shipment-types"
import {
  FindSelectOption,
  GetMenuListStyles,
  WithAddNewOption,
} from "@/modules/scm/utils/select-options"
import { ShipmentSchema } from "@/modules/scm/validators/logistic-and-transport/shipment.schema"

import CarrierForm from "../carriers/create-carriers"

type IndexProps =
  | {
      initialData?: Shipment
      isEditForm?: true
    }
  | {
      initialData?: undefined
      isEditForm?: false
    }

export default function ShipmentCreateEditFormDrawer({
  initialData,
  isEditForm,
}: IndexProps) {
  const { closeDrawer } = useDrawer()

  const { data: carrierList, isLoading: isCarrierLoading } = useCarrierList()

  const { data: stockTransferList, isLoading: isStockTransferLoading } =
    useStockTransferDropdown()

  const carrierOptions = useSelectOptions<Carrier>(
    carrierList?.data,
    "carrierName"
  )

  const stockTransferOptions = useSelectOptions<StockTransfer>(
    stockTransferList,
    "stockTransferNo"
  )

  const { mutate: createShipment, isPending: isCreateShipmentPending } =
    useCreateShipment()

  const { mutate: updateShipment, isPending: isUpdateShipmentPending } =
    useUpdateShipment()

  const onSubmit: SubmitHandler<Shipment> = (data) => {
    if (isEditForm) {
      updateShipment({
        data: {
          ...data,
          id: initialData?.id,
        },
      })
    } else {
      createShipment(data)
    }
  }
  const t = useTranslations("form")
  const { openModal } = useModal()

  const handleCarrier = () => {
    openModal({
      view: <CarrierForm />,
    })
  }

  return (
    <div className="flex h-full flex-col">
      <DrawerHeader
        heading={
          isEditForm ? t("form-edit-shipment") : t("form-add-new-shipment")
        }
        onClose={closeDrawer}
        headerClassName="mb-0"
      />
      <Form<Shipment>
        onSubmit={onSubmit}
        validationSchema={ShipmentSchema}
        useFormProps={{
          mode: "onChange",
          reValidateMode: "onChange",
          values: initialData,
          defaultValues: initialData,
        }}
        className="flex grow flex-col">
        {({ control, formState: { errors } }) => {
          return (
            <>
              <SimpleBar className="h-full grow">
                <div className="flex flex-col gap-4 px-5 py-6">
                  <Controller
                    control={control}
                    name="stockTransferId"
                    render={({ field: { onChange, value } }) => (
                      <Select
                        label={t("form-stock-transfer")}
                        placeholder={t("form-stock-transfer")}
                        labelClassName="text-title"
                        options={stockTransferOptions}
                        onChange={(option: any) => onChange(option?.value)}
                        value={FindSelectOption(stockTransferOptions, value)}
                        isLoading={isStockTransferLoading}
                        isDisabled={isStockTransferLoading || isEditForm}
                        error={
                          errors?.stockTransferId?.message
                            ? t(errors.stockTransferId.message)
                            : ""
                        }
                        styles={GetMenuListStyles(stockTransferOptions.length)}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="carrierId"
                    render={({ field: { onChange, value } }) => (
                      <Select
                        label={t("form-carrier")}
                        placeholder={t("form-carrier")}
                        labelClassName="text-title"
                        showAddNewOption
                        options={WithAddNewOption(
                          carrierOptions,
                          t("form-add-new-carrier")
                        )}
                        onChange={(option: any) => {
                          if (option.value === 0) {
                            handleCarrier()
                          } else {
                            onChange(option.value)
                          }
                        }}
                        value={FindSelectOption(carrierOptions, value)}
                        isLoading={isCarrierLoading}
                        isDisabled={isCarrierLoading}
                        error={
                          errors?.carrierId?.message
                            ? t(errors.carrierId.message)
                            : ""
                        }
                        styles={GetMenuListStyles(carrierOptions.length)}
                      />
                    )}
                  />
                  <div>
                    <Controller
                      control={control}
                      name="shipmentDate"
                      render={({ field: { value, onChange } }) => (
                        <div className="relative">
                          <label
                            htmlFor="shipmentDate"
                            className="mb-2 block text-sm font-medium text-title transition-colors duration-200">
                            {t("form-shipment-date")}
                          </label>
                          <DatePicker
                            id="shipmentDate"
                            placeholderText={t("form-shipment-date")}
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
                    {errors.shipmentDate && (
                      <p className="text-sm text-red-500">
                        {t(errors.shipmentDate.message)}
                      </p>
                    )}
                  </div>
                </div>
              </SimpleBar>
              <DrawerFormActions
                handleCloseDrawer={closeDrawer}
                isEditForm={isEditForm}
                isLoading={isCreateShipmentPending || isUpdateShipmentPending}
              />
            </>
          )
        }}
      </Form>
    </div>
  )
}
