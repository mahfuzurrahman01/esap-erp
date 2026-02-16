"use client";

import React from "react";



import { Form } from "@core/ui/form";
import { useTranslations } from "next-intl";
import { Controller, SubmitHandler } from "react-hook-form";
import SimpleBar from "simplebar-react";



import DrawerFormActions from "@/components/base/drawer-form-actions";
import DrawerHeader from "@/components/base/drawer-header";
import { useDrawer } from "@/components/base/drawer-views/use-drawer";
import { Input, Select } from "@/components/ui";
import { useSCMSharedDataHook } from "@/modules/scm/constants/shared-data-hooks";
import { useUpdateReturnProcess } from "@/modules/scm/hooks";
import { usePatchStockUpdate } from "@/modules/scm/hooks/inventory/stock/use-stock";
import { StockAdjustment } from "@/modules/scm/types/inventory/stock-overview/stock-overview-types";
import { FindSelectOption } from "@/modules/scm/utils/select-options";
import { StockAdjustmentSchema } from "@/modules/scm/validators/logistic-and-transport/update-stock.schema";





type IndexProps =
  | {
      initialData?: StockAdjustment
      isEditForm?: true
    }
  | {
      initialData?: any
      isEditForm?: false
    }

export default function UpdateStockForm({
  initialData,
  isEditForm,
}: IndexProps) {
  const { closeDrawer } = useDrawer()

  const { productCode } = useSCMSharedDataHook(["productCode"])

  const { productCodeOptions, isProductCodeLoading } = productCode

  const {
    mutate: updateStock,
    isPending: isUpdateStockPending,
    isSuccess: isUpdateStockSuccess,
  } = usePatchStockUpdate()

  const {
    mutate: updateReturnProcess,
    isPending: isUpdateReturnProcessPending,
  } = useUpdateReturnProcess()

  const defaultValues = {
    productId: 0,
    quantity: initialData?.quantityReturned || 0,
  }

  const returnProcessData = {
    id: initialData?.id,
    shipmentId: initialData?.shipmentId,
    productId: initialData?.productId,
    reasonForReturn: initialData?.reasonForReturn,
    quantityReturned: initialData?.quantityReturned,
    requestDate: initialData?.requestDate,
    returnStatus: "completed",
  }


  const onSubmit: SubmitHandler<StockAdjustment> = (data) => {
    updateStock({
      ...data,
      adjustmentType: 2,
    })
    if (!isUpdateStockSuccess) {
      updateReturnProcess({
        data: returnProcessData,
      })
    }
  }
  const t = useTranslations("form")


  return (
    <div className="flex h-full flex-col">
      <DrawerHeader
        heading={
          isEditForm
            ? t("form-edit-stock-update")
            : t("form-add-new-stock-update")
        }
        onClose={closeDrawer}
        headerClassName="mb-0"
      />
      <Form<StockAdjustment>
        onSubmit={onSubmit}
        validationSchema={StockAdjustmentSchema}
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
                    name="productId"
                    render={({ field: { onChange, value } }) => (
                      <Select
                        options={productCodeOptions}
                        label={t("form-product-code")}
                        value={FindSelectOption(productCodeOptions, value)}
                        onChange={(selectedValue: any) => {
                          onChange(selectedValue?.value)
                        }}
                        className="col-span-2 text-gray-900 dark:text-gray-0"
                        error={
                          errors.productId?.message
                            ? t(errors.productId?.message)
                            : ""
                        }
                        isLoading={isProductCodeLoading}
                        isDisabled={true}
                      />
                    )}
                  />

                  <Input
                    labelClassName="bg-paper"
                    type="number"
                    label={t("form-quantity")}
                    {...register("quantity", {
                      valueAsNumber: true,
                    })}
                    error={
                      errors.quantity?.message
                        ? t(errors.quantity?.message)
                        : ""
                    }
                    className="col-span-2"
                  />
                </div>
              </SimpleBar>
              <DrawerFormActions
                handleCloseDrawer={closeDrawer}
                isEditForm={isEditForm}
                isLoading={isUpdateStockPending || isUpdateReturnProcessPending}
              />
            </>
          )
        }}
      </Form>
    </div>
  )
}