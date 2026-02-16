"use client";

import React, { useState } from "react";



import { Form } from "@core/ui/form";
import { useTranslations } from "next-intl";
import { Controller, SubmitHandler } from "react-hook-form";
import SimpleBar from "simplebar-react";



import { DatePicker } from "@/components/base/date-picker";
import DrawerFormActions from "@/components/base/drawer-form-actions";
import DrawerHeader from "@/components/base/drawer-header";
import { useDrawer } from "@/components/base/drawer-views/use-drawer";
import { Input, Select } from "@/components/ui";
import { useCreateStockReplanishmentApproval, useUpdateStockReplanishmentApproval } from "@/modules/scm/hooks/inventory/stock-replanishment/use-stock-replanishment-approval";
import { StockReplanishmentApproval } from "@/modules/scm/types/inventory/stock-replanishment/stock-replanishment-approval-types";



import { approvalStatusOptions } from "./status-option";
import { useCurrentUser } from "@/hooks/auth/use-auth";
import { StockReplenishmentApprovalSchema } from "@/modules/scm/validators/inventory/stock-replenishment-approval.schema";
import { FindSelectOption } from "@/modules/scm/utils/select-options";





type IndexProps =
  | {
      initialData?: StockReplanishmentApproval
      stockReplenishmentId: number
      isEditForm?: true
    }
  | {
      initialData?: undefined
      stockReplenishmentId: number
      isEditForm?: false
    }

export default function StockReplenishmentApprovalForm({
  initialData,
  isEditForm,
  stockReplenishmentId,
}: IndexProps) {
  const { closeDrawer } = useDrawer()
  const { user } = useCurrentUser()

  // const [status, setStatus] = useState<string>("")

  const {
    mutateAsync: createStockReplenishmentApproval,
    isPending: isCreating,
  } = useCreateStockReplanishmentApproval()
  const {
    mutateAsync: updateStockReplenishmentApproval,
    isPending: isUpdating,
  } = useUpdateStockReplanishmentApproval()

  const defaultValues: StockReplanishmentApproval = {
    approvalStatus: "",
    approvalNotes: "",
    approvalDate: "",
  }

  const onSubmit: SubmitHandler<StockReplanishmentApproval> = (data) => {
    if (isEditForm) {
      updateStockReplenishmentApproval({
        data: {
          ...data,
          id: initialData?.id,
          approvedBy: user?.name || "",
          // approvalStatus: status,
        },
      })
    } else {
      createStockReplenishmentApproval({
        ...data,
        stockReplenishmentId: stockReplenishmentId,
        // approvalStatus: status,
        approvedBy: user?.name || "",
      })
    }

    closeDrawer()
  }
  const t = useTranslations("form")

  return (
    <div className="flex h-full flex-col">
      <DrawerHeader
        heading={t("form-stock-replenishment-approval")}
        onClose={closeDrawer}
        headerClassName="mb-0"
      />
      <Form<StockReplanishmentApproval>
        onSubmit={onSubmit}
        validationSchema={StockReplenishmentApprovalSchema}
        useFormProps={{
          defaultValues,
        }}
        className="flex grow flex-col">
        {({ register, control, formState: { errors } }) => {
          return (
            <>
              <SimpleBar className="h-full grow">
                <div className="grid grid-cols-2 gap-6 px-5 py-6">
                  <Controller
                    control={control}
                    name="approvalStatus"
                    render={({ field: { onChange, value } }) => (
                      <Select
                        options={approvalStatusOptions}
                        label={t("form-approval-status")}
                        {...register("approvalStatus")}
                        value={FindSelectOption(approvalStatusOptions, value)}
                        onChange={(selectedValue: any) => {
                          onChange(selectedValue?.value)
                          // setStatus(selectedValue?.value)
                        }}
                        className="col-span-2 text-gray-900 dark:text-gray-0"
                        error={errors.approvalStatus?.message ? t(errors.approvalStatus?.message) : ""}
                        isRequired
                      />
                    )}
                  />
                  <Input
                    labelClassName="bg-paper"
                    label={t("form-approval-notes")}
                    {...register("approvalNotes")}
                    error={errors.approvalNotes?.message}
                    className="col-span-2"
                  />
                  <div className="col-span-full">
                    <Controller
                      control={control}
                      name="approvalDate"
                      render={({ field: { value, onChange } }) => (
                        <div className="relative">
                          <label
                            htmlFor="approvalDate"
                            className="mb-2 block text-sm font-medium text-title transition-colors duration-200">
                            {t("form-requested-date")} {" "}
                            <span className="text-orange-500">*</span>
                          </label>
                          <DatePicker
                            id="requestedDate"
                            value={value ? new Date(value) : null}
                            onChange={(date: any) =>
                              onChange(date ? date.toISOString() : "")
                            }
                            minDate={new Date()}
                            placeholderText={t("form-select-date")}
                            className="w-full"
                            defaultDate={new Date()}
                          />
                        </div>
                      )}
                    />
                    {errors.approvalDate && (
                      <p className="text-sm text-red-500">
                        {errors.approvalDate.message ? t(errors.approvalDate.message) : ""}
                      </p>
                    )}
                  </div>
                </div>
              </SimpleBar>
              <DrawerFormActions
                handleCloseDrawer={closeDrawer}
                isLoading={isCreating || isUpdating}
              />
            </>
          )
        }}
      </Form>
    </div>
  )
}