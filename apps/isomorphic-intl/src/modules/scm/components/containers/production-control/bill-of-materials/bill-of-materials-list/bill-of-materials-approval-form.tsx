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
import { useCurrentUser } from "@/hooks/auth/use-auth"
import {
  useCreateBillOfMaterialsApproval,
  useUpdateBillOfMaterialsApproval,
} from "@/modules/scm/hooks/production-control/bill-of-materials/use-bill-of-materials-approval"
import { BillOfMaterialsApproval } from "@/modules/scm/types/production-control/bill-of-materials/bill-of-materials-approval-types"
import { FindSelectOption } from "@/modules/scm/utils/select-options"
import { BillOfMaterialsApprovalSchema } from "@/modules/scm/validators/production-control/bill-of-materials/bill-of-materials-approval.schema"

import { billOfMaterialsStatusOptions } from "./status-option"

type IndexProps =
  | {
      initialData?: BillOfMaterialsApproval
      billOfMaterialsId: number
      isEditForm?: true
    }
  | {
      initialData?: undefined
      billOfMaterialsId: number
      isEditForm?: false
    }

export default function BillOfMaterialsApprovalForm({
  initialData,
  isEditForm,
  billOfMaterialsId,
}: IndexProps) {
  const { closeDrawer } = useDrawer()
  const { user } = useCurrentUser()

  const { mutateAsync: createBillOfMaterialsApproval, isPending: isCreating } =
    useCreateBillOfMaterialsApproval()
  const { mutateAsync: updateBillOfMaterialsApproval, isPending: isUpdating } =
    useUpdateBillOfMaterialsApproval()

  const onSubmit: SubmitHandler<BillOfMaterialsApproval> = (data) => {
    if (isEditForm) {
      updateBillOfMaterialsApproval({
        data: {
          ...data,
          id: initialData?.id,
          approvedBy: user?.name || "",
        },
      })
    } else {
      createBillOfMaterialsApproval({
        ...data,
        billOfMaterialId: billOfMaterialsId,
        approvedBy: user?.name || "",
      })
    }

    closeDrawer()
  }
  const t = useTranslations("form")

  return (
    <div className="flex h-full flex-col">
      <DrawerHeader
        heading={t("form-bill-of-materials-approval")}
        onClose={closeDrawer}
        headerClassName="mb-0"
      />
      <Form<BillOfMaterialsApproval>
        onSubmit={onSubmit}
        validationSchema={BillOfMaterialsApprovalSchema}
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
                        options={billOfMaterialsStatusOptions}
                        label={t("form-approval-status")}
                        {...register("approvalStatus")}
                        value={FindSelectOption(
                          billOfMaterialsStatusOptions,
                          value
                        )}
                        onChange={(selectedValue: any) => {
                          onChange(selectedValue?.value)
                        }}
                        className="col-span-2 text-gray-900 dark:text-gray-0"
                        // error={errors.approvalStatus?.message ? t(errors.approvalStatus.message) : undefined}
                        isRequired
                      />
                    )}
                  />
                  <Input
                    labelClassName="bg-paper"
                    label={t("form-approval-notes")}
                    {...register("approvedNotes")}
                    // error={errors.approvedNotes?.message ? t(errors.approvedNotes.message) : undefined}
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
                            {t("form-approved-date")}{" "}
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
                    {/* {errors.approvedDate && (
                      <p className="text-sm text-red-500">
                        {t(errors.approvedDate.message)}
                      </p>
                    )} */}
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
