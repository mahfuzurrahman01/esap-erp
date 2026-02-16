"use client"

import React from "react"

import { Form } from "@core/ui/form"
import { useTranslations } from "next-intl"
import { Controller, SubmitHandler } from "react-hook-form"
import SimpleBar from "simplebar-react"

import DrawerFormActions from "@/components/base/drawer-form-actions"
import DrawerHeader from "@/components/base/drawer-header"
import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import { Input, Select } from "@/components/ui"
import { usePatchShipmentReceived, useUpdateShipment } from "@/modules/scm/hooks/logistic-and-transport/shipment/use-shipment"
import { Shipment } from "@/modules/scm/types/logistics-and-transport/shipment/shipment-types"
import {
  FindSelectOption,
  GetMenuListStyles,
} from "@/modules/scm/utils/select-options"
import {
  ShipmentReceivedFormInput,
  ShipmentReceivedSchema,
} from "@/modules/scm/validators/logistic-and-transport/shipment.schema"

import { ShipmentReceivedStatusOption } from "./status-option"
import { useStockTransferById, useUpdateStockTransfer } from "@/modules/scm/hooks"
import { StockTransfer } from "@/modules/scm/types/inventory/stock-transfer/stock-transfer-types"

type IndexProps =
  | {
      initialData?: Shipment
      isEditForm?: true
    }
  | {
      initialData?: Shipment
      isEditForm?: false
    }

export default function ReceivedApprovalForm({
  initialData,
  isEditForm,
}: IndexProps) {
  const { closeDrawer } = useDrawer()
  const t = useTranslations("form")

  const {
    mutate: patchShipmentReceived,
    isPending: isPatchShipmentReceivedPending,
    isSuccess: isPatchShipmentReceivedSuccess,
  } = usePatchShipmentReceived()

  const { data: stockTransferData, isLoading: isStockTransferLoading } = useStockTransferById(Number(initialData?.stockTransferId)) as {
    data: StockTransfer | undefined
    isLoading: boolean
  }

  const { mutate: updateShipment, isPending: isUpdateShipmentPending } =
    useUpdateShipment()

  const { mutateAsync: updateStockTransfer, isPending: isUpdatePending } =
    useUpdateStockTransfer()

  const updateShipmentData = {
    id: initialData?.id,
    stockTransferId: initialData?.stockTransferId,
    carrierId: initialData?.carrierId,
    shipmentDate: initialData?.shipmentDate,
    expectedDeliveryDate: initialData?.expectedDeliveryDate,
    currentStatus: "delivered",
    receivedStatus: initialData?.receivedStatus,
    receivedNote: initialData?.receivedNote,
  }

  const updateStockTransferData = {
    id: stockTransferData?.id,
    transferToWarehouseId: stockTransferData?.transferToWarehouseId,
    transferFromWarehouseId: stockTransferData?.transferFromWarehouseId,
    status: "transfer",
    transferDate: stockTransferData?.transferDate,
    stockTransferDetails: stockTransferData?.stockTransferDetails ?? [],
  }

  const onSubmit: SubmitHandler<ShipmentReceivedFormInput> = (data) => {
    patchShipmentReceived({
      data: {
        ...data,
        id: initialData?.id,
      },
    })

    if (!isPatchShipmentReceivedSuccess) {
      updateShipment({
        data: updateShipmentData,
      })
      updateStockTransfer({
        data: updateStockTransferData
      })
    }
  }

  const defaultValues = {
    receivedStatus: "",
    receivedDate: new Date().toISOString(),
    receivedNote: "",
  }

  return (
    <div className="flex h-full flex-col">
      <DrawerHeader
        heading={t("form-received-approval")}
        onClose={closeDrawer}
        headerClassName="mb-0"
      />
      <Form<ShipmentReceivedFormInput>
        onSubmit={onSubmit}
        validationSchema={ShipmentReceivedSchema}
        useFormProps={{
          mode: "onChange",
          reValidateMode: "onChange",
          defaultValues: defaultValues,
        }}
        className="flex grow flex-col">
        {({ control, formState: { errors }, register }) => {
          return (
            <>
              <SimpleBar className="h-full grow">
                <div className="flex flex-col gap-4 px-5 py-6">
                  <Controller
                    control={control}
                    name="receivedStatus"
                    render={({ field: { onChange, value } }) => (
                      <Select
                        label={t("form-received-status")}
                        placeholder={t("form-received-status")}
                        labelClassName="text-title"
                        options={ShipmentReceivedStatusOption}
                        onChange={(option: any) => onChange(option?.value)}
                        value={FindSelectOption(
                          ShipmentReceivedStatusOption,
                          value
                        )}
                        error={
                          errors?.receivedStatus?.message
                            ? t(errors.receivedStatus.message)
                            : ""
                        }
                        styles={GetMenuListStyles(
                          ShipmentReceivedStatusOption.length
                        )}
                        isLoading={isStockTransferLoading}
                        isRequired
                      />
                    )}
                  />
                  <Input
                    labelClassName="bg-paper"
                    isRequired
                    label={t("form-approval-notes")}
                    {...register("receivedNote")}
                    error={
                      errors.receivedNote?.message
                        ? t(errors.receivedNote.message)
                        : ""
                    }
                    className="col-span-2"
                  />
                </div>
              </SimpleBar>
              <DrawerFormActions
                handleCloseDrawer={closeDrawer}
                isEditForm={isEditForm}
                isLoading={isPatchShipmentReceivedPending || isUpdateShipmentPending || isUpdatePending}
              />
            </>
          )
        }}
      </Form>
    </div>
  )
}
