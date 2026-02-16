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
import { useCreateRequisitionApproval } from "@/modules/scm/hooks/procurement/requisition/use-requisition-approval"
import { RequisitionApproval } from "@/modules/scm/types/procurement/requisition/requisition-approval-types"

const approvalStatusOptions = [
  { label: "Approved", value: "approved" },
  { label: "Rejected", value: "rejected" },
]

export default function RequisitionApprovalForm({
  requisitionId,
}: {
  requisitionId: number
}) {
  const { closeDrawer } = useDrawer()
  const { user } = useCurrentUser()

  const [status, setStatus] = useState<string>("")

  const { mutateAsync: createRequisitionApproval, isPending: isCreating } =
    useCreateRequisitionApproval()

  const onSubmit: SubmitHandler<RequisitionApproval> = (data) => {
    createRequisitionApproval({
      ...data,
      requisitionId: requisitionId,
      approvedBy: user?.name || "",
      approvalStatus: status,
    })

    closeDrawer()
  }
  const t = useTranslations("form")

  return (
    <div className="flex h-full flex-col">
      <DrawerHeader
        heading={t("form-add-new-requisition-approval")}
        onClose={closeDrawer}
        headerClassName="mb-0"
      />
      <Form<RequisitionApproval>
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
                        {...register("approvalStatus")}
                        value={value}
                        onChange={(selectedValue: any) => {
                          onChange(selectedValue)
                          setStatus(selectedValue?.value)
                        }}
                        className="col-span-2 text-gray-900 dark:text-gray-0"
                        isRequired
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
                    {...register("approvalNotes")}
                    error={
                      errors.approvalNotes?.message
                        ? t(errors.approvalNotes?.message)
                        : ""
                    }
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
                            id="approvalDate"
                            value={value ? new Date(value) : null}
                            onChange={(date: any) =>
                              onChange(date ? date.toISOString() : "")
                            }
                            minDate={new Date()}
                            placeholderText={t("form-select-date")}
                            className="w-full"
                            popperPlacement="bottom-end"
                          />
                        </div>
                      )}
                    />
                    {errors.approvalDate && (
                      <p className="text-sm text-red-500">
                        {errors.approvalDate.message
                          ? t(errors.approvalDate.message)
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
