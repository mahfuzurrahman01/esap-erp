"use client"

import React, { useState } from "react"

import { Form } from "@core/ui/form"
import { useTranslations } from "next-intl"
import { Controller, SubmitHandler } from "react-hook-form"
import SimpleBar from "simplebar-react"

import { DatePicker } from "@/components/base/date-picker"
import DrawerFormActions from "@/components/base/drawer-form-actions"
import DrawerHeader from "@/components/base/drawer-header"
import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import { Input, Select } from "@/components/ui"
import { useCurrentUser } from "@/hooks/auth/use-auth"
import { useCreatePurchasedOrderApproval } from "@/modules/scm/hooks/procurement/purchased-order/use-purchased-order-approval"
import { PurchasedOrderApproval } from "@/modules/scm/types/procurement/purchased-order/purchased-order-approval-types"

const approvalStatusOptions = [
  { label: "Approved", value: "approved" },
  { label: "Rejected", value: "rejected" },
]

export default function PurchasedOrderApprovalForm({
  purchasedOrderId,
}: {
  purchasedOrderId: number
}) {
  const { closeDrawer } = useDrawer()
  const { user } = useCurrentUser()
  const [status, setStatus] = useState<string>("")

  const { mutateAsync: createPurchasedOrderApproval, isPending: isCreating } =
    useCreatePurchasedOrderApproval()

  const onSubmit: SubmitHandler<PurchasedOrderApproval> = (data) => {
    createPurchasedOrderApproval({
      ...data,
      purchaseOrderId: purchasedOrderId,
      approvalStatus: status,
      approvedBy: user?.name || "",
    })
    closeDrawer()
  }
  const t = useTranslations("form")

  return (
    <div className="flex h-full flex-col">
      <DrawerHeader
        heading={t("form-add-new-purchased-order-approval")}
        onClose={closeDrawer}
        headerClassName="mb-0"
      />
      <Form<PurchasedOrderApproval>
        onSubmit={onSubmit}
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
                        isRequired
                        {...register("approvalStatus")}
                        value={value}
                        onChange={(selectedValue: any) => {
                          onChange(selectedValue)
                          setStatus(selectedValue?.value)
                        }}
                        className="col-span-2 text-gray-900 dark:text-gray-0"
                        error={
                          errors.approvalStatus?.message
                            ? t(errors.approvalStatus?.message)
                            : ""
                        }
                      />
                    )}
                  />
                  <Input
                    labelClassName="bg-paper"
                    label={t("form-approval-notes")}
                    {...register("approveNotes")}
                    error={
                      errors.approveNotes?.message
                        ? t(errors.approveNotes?.message)
                        : ""
                    }
                    className="col-span-2"
                  />
                  <div className="col-span-full">
                    <Controller
                      control={control}
                      name="approvedDate"
                      render={({ field: { value, onChange } }) => (
                        <div className="relative">
                          <label
                            htmlFor="approvedDate"
                            className="mb-2 block text-sm font-medium text-title transition-colors duration-200">
                            {t("form-requested-date")}{" "}
                            <span className="text-orange-500">*</span>
                          </label>
                          <DatePicker
                            id="approvedDate"
                            value={value ? new Date(value) : null}
                            onChange={(date: any) =>
                              onChange(date ? date.toISOString() : "")
                            }
                            minDate={new Date()}
                            placeholderText={t("form-select-date")}
                            className="w-full"
                          />
                        </div>
                      )}
                    />
                    {errors.approvedDate && (
                      <p className="text-sm text-red-500">
                        {errors.approvedDate.message
                          ? t(errors.approvedDate.message)
                          : ""}
                      </p>
                    )}
                  </div>
                </div>
              </SimpleBar>
              <DrawerFormActions
                handleCloseDrawer={closeDrawer}
                isLoading={isCreating}
              />
            </>
          )
        }}
      </Form>
    </div>
  )
}
