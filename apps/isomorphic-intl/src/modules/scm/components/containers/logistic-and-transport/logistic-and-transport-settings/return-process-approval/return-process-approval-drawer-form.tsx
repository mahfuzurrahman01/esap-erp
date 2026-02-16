"use client"

import { Form } from "@core/ui/form"
import SimpleBar from "@core/ui/simplebar"
import { useTranslations } from "next-intl"
import { Controller } from "react-hook-form"

import { DatePicker } from "@/components/base/date-picker"
import DrawerFormActions from "@/components/base/drawer-form-actions"
import DrawerHeader from "@/components/base/drawer-header"
import { Input, Select } from "@/components/ui"
import { messages } from "@/config/messages"
import { ReturnProcessApproval } from "@/modules/scm/types/logistics-and-transport/return-process/return-process-approval-types"
import { ReturnProcessApprovalSchema } from "@/modules/scm/validators/logistic-and-transport/return-approval.schema"

import { approvalStatusOptions } from "./status-option"
import { useReturnProcessApprovalForm } from "./use-return-process-approval-form"

type ReturnProcessApprovalFormDrawerViewProps = {
  isEditForm?: boolean
  initialData?: ReturnProcessApproval
} & (
  | { isEditForm: true; initialData: ReturnProcessApproval }
  | { isEditForm?: false; initialData?: ReturnProcessApproval }
)

const ReturnProcessApprovalFormDrawerView = ({
  isEditForm = false,
  initialData,
}: ReturnProcessApprovalFormDrawerViewProps) => {
  const t = useTranslations("form")

  const { isLoading, onSubmit, handleCloseDrawer } =
    useReturnProcessApprovalForm(isEditForm, initialData)

  return (
    <div className="flex h-full flex-col">
      <DrawerHeader
        heading={
          isEditForm
            ? t(messages.editReturnProcessApproval)
            : t(messages.addNewReturnProcessApproval)
        }
        onClose={handleCloseDrawer}
        headerClassName="mb-0"
      />
      <Form<ReturnProcessApproval>
        validationSchema={ReturnProcessApprovalSchema}
        onSubmit={onSubmit}
        useFormProps={{
          mode: "onChange",
          reValidateMode: "onChange",
          values: initialData,
          defaultValues: initialData,
        }}
        className="flex grow flex-col">
        {({ register, control, formState: { errors } }) => (
          <>
            <SimpleBar className="h-full">
              <ReturnProcessApprovalForm
                register={register}
                errors={errors}
                control={control}
              />
            </SimpleBar>
            <DrawerFormActions
              handleCloseDrawer={handleCloseDrawer}
              isEditForm={isEditForm}
              isLoading={isLoading}
            />
          </>
        )}
      </Form>
    </div>
  )
}

export const ReturnProcessApprovalForm = ({
  register,
  control,
  errors,
}: any) => {
  const t = useTranslations("form")

  return (
    <div className="flex flex-col gap-4 px-5 py-6">
      {/* <Input
        type="text"
        label={t("form-approved-by")}
        placeholder={t("form-approved-by")}
        labelClassName="text-sm font-medium text-gray-900"
        {...register("approvedBy")}
        error={
          errors?.approvedBy?.message ? t(errors?.approvedBy?.message) : ""
        }
      /> */}
      <Controller
        control={control}
        name="approvalStatus"
        render={({ field: { onChange, value } }) => (
          <Select
            options={approvalStatusOptions}
            label={t("form-approval-status")}
            {...register("approvalStatus")}
            value={
              approvalStatusOptions.find((option) => option.value === value) ||
              null
            }
            onChange={(selectedValue: any) => {
              onChange(selectedValue?.value)
            }}
            // isLoading={isCreating}
            className="col-span-2 text-gray-900 dark:text-gray-0"
            // isClearable
            error={
              errors?.approvalStatus?.message
                ? t(errors?.approvalStatus?.message)
                : ""
            }
          />
        )}
      />
      <Input
        type="text"
        isRequired
        label={t("form-approval-notes")}
        placeholder={t("form-approval-notes")}
        labelClassName="text-sm font-medium text-gray-900"
        {...register("approvalNotes")}
        error={
          errors?.approvalNotes?.message
            ? t(errors?.approvalNotes?.message)
            : ""
        }
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
                {t("form-approval-date")}
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
              />
            </div>
          )}
        />
        {errors.approvalDate && (
          <p className="text-sm text-red-500">
            {t(errors?.approvalDate?.message)}
          </p>
        )}
      </div>
    </div>
  )
}

export default ReturnProcessApprovalFormDrawerView
