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
import {
  useCreateReturnProcessApproval,
  useUpdateReturnProcessApproval,
} from "@/modules/scm/hooks/logistic-and-transport/return-process/use-return-procss-approval"
import { ReturnProcessApproval } from "@/modules/scm/types/logistics-and-transport/return-process/return-process-approval-types"
import { FindSelectOption } from "@/modules/scm/utils/select-options"
import { ReturnProcessApprovalSchema } from "@/modules/scm/validators/logistic-and-transport/return-approval.schema"

import { approvalStatusOptions } from "./status-option"

type IndexProps =
  | {
      initialData?: ReturnProcessApproval
      returnRequestId: number
      isEditForm?: true
    }
  | {
      initialData?: undefined
      returnRequestId: number
      isEditForm?: false
    }

export default function ReturnProcessApprovalForm({
  initialData,
  isEditForm,
  returnRequestId,
}: IndexProps) {
  const { closeDrawer } = useDrawer()
  const t = useTranslations("form")

  const {
    mutate: createReturnProcessApproval,
    isPending: isCreateReturnProcessApprovalPending,
  } = useCreateReturnProcessApproval()

  const {
    mutate: updateReturnProcessApproval,
    isPending: isUpdateReturnProcessApprovalPending,
  } = useUpdateReturnProcessApproval()

  const onSubmit: SubmitHandler<ReturnProcessApproval> = (data) => {
    if (isEditForm) {
      updateReturnProcessApproval({
        data: {
          ...data,
          id: initialData?.id,
        },
      })
    } else {
      createReturnProcessApproval({
        ...data,
        returnRequestId: returnRequestId,
      })
    }
  }

  const defaultValues = {
    approvalStatus: "",
    approvalDate: new Date().toISOString(),
    approvalNotes: "",
  }

  return (
    <div className="flex h-full flex-col">
      <DrawerHeader
        heading={
          isEditForm
            ? t("form-edit-return-process-approval")
            : t("form-add-new-return-process-approval")
        }
        onClose={closeDrawer}
        headerClassName="mb-0"
      />
      <Form<ReturnProcessApproval>
        onSubmit={onSubmit}
        validationSchema={ReturnProcessApprovalSchema}
        useFormProps={{
          mode: "onChange",
          reValidateMode: "onChange",
          defaultValues: defaultValues,
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
                    name="approvalStatus"
                    render={({ field: { onChange, value } }) => (
                      <Select
                        options={approvalStatusOptions}
                        label={t("form-approval-status")}
                        value={FindSelectOption(approvalStatusOptions, value)}
                        onChange={(selectedValue: any) => {
                          onChange(selectedValue.value)
                        }}
                        className="col-span-2 text-gray-900 dark:text-gray-0"
                        isRequired
                      />
                    )}
                  />

                  <Input
                    labelClassName="bg-paper"
                    label={t("form-approval-notes")}
                    {...register("approvalNotes")}
                    className="col-span-2"
                  />

                  <div>
                    <Controller
                      control={control}
                      name="approvalDate"
                      render={({ field: { value, onChange } }) => (
                        <div className="relative">
                          <label
                            htmlFor="approvalDate"
                            className="mb-2 block text-sm font-medium text-title transition-colors duration-200">
                            {t("form-approval-date")}{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <DatePicker
                            id="approvalDate"
                            placeholderText={t("form-approval-date")}
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
                    {errors.approvalDate && (
                      <p className="text-sm text-red-500">
                        {errors.approvalDate.message as string}
                      </p>
                    )}
                  </div>
                </div>
              </SimpleBar>
              <DrawerFormActions
                handleCloseDrawer={closeDrawer}
                isEditForm={isEditForm}
                isLoading={
                  isCreateReturnProcessApprovalPending ||
                  isUpdateReturnProcessApprovalPending
                }
              />
            </>
          )
        }}
      </Form>
    </div>
  )
}
