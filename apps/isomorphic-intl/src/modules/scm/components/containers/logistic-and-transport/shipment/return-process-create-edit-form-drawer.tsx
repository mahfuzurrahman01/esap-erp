"use client"

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
import { Product } from "@/modules/scm/types/inventory/products/products-types"
import { ReturnProcess } from "@/modules/scm/types/logistics-and-transport/return-process/return-process-types"
import {
  FindSelectOption,
  GetMenuListStyles,
} from "@/modules/scm/utils/select-options"
import { ReturnProcessSchema } from "@/modules/scm/validators/logistic-and-transport/return-process.schema"

import { returnStatusOptions } from "../return-management/status-option"
import { useStockTransferById } from "@/modules/scm/hooks"
import { StockTransfer } from "@/modules/scm/types/inventory/stock-transfer/stock-transfer-types"

type IndexProps =
  | {
      initialData?: ReturnProcess
      isEditForm?: true
    }
  | {
      initialData?: any
      isEditForm?: false
    }

export default function ReturnProcessCreateEditFormDrawer({
  initialData,
  isEditForm,
}: IndexProps) {
  const { closeDrawer } = useDrawer()
  // console.log(initialData)

  const { data: productList, isLoading: isProductLoading } = useProductList({
    pageSize: 200,
  })

  const { data: stockTransfer, isLoading: isStockTransferLoading } = useStockTransferById(initialData?.id) as {
    data: StockTransfer
    isLoading: boolean
  }

  

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
        shipmentId: initialData?.id,
      })
    }
  }
  const t = useTranslations("form")

  const defaultValues = {
    productId: stockTransfer?.stockTransferDetails?.[0]?.productId ?? 0,
    reasonForReturn: "",
    quantityReturned: 0,
    requestDate: "",
    returnStatus: "",
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
        validationSchema={ReturnProcessSchema}
        useFormProps={{
          defaultValues: defaultValues,
          values: stockTransfer ? {
            ...defaultValues,
            productId: stockTransfer?.stockTransferDetails?.[0]?.productId
          } : undefined
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
                        label={t("form-product")}
                        placeholder={t("form-product")}
                        labelClassName="text-title"
                        options={productOptions}
                        onChange={(option: any) => {
                          onChange(option.value)
                        }}
                        value={FindSelectOption(productOptions, value)}
                        isLoading={isProductLoading || isStockTransferLoading}
                        isDisabled={isProductLoading || isStockTransferLoading || true}
                        error={
                          errors?.productId?.message
                            ? t(errors.productId.message)
                            : ""
                        }
                        styles={GetMenuListStyles(productOptions.length)}
                        isRequired
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
                    isRequired
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
                    isRequired
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
                            {t("form-request-date")}{" "}
                            <span className="text-red-500">*</span>
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
                        // isClearable
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
