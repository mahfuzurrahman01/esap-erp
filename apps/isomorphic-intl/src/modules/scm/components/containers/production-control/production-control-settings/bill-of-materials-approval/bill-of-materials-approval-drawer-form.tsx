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
import { BillOfMaterialsApproval } from "@/modules/scm/types/production-control/bill-of-materials/bill-of-materials-approval-types"
import { BillOfMaterialsApprovalSchema } from "@/modules/scm/validators/production-control/bill-of-materials/bill-of-materials-approval.schema"

import { approvalStatusOptions } from "./status-option"
import { useBillOfMaterialsApprovalForm } from "./use-bill-of-materials-approval-form"

type BillOfMaterialsApprovalFormDrawerViewProps = {
  isEditForm?: boolean
  initialData?: BillOfMaterialsApproval
} & (
  | { isEditForm: true; initialData: BillOfMaterialsApproval }
  | { isEditForm?: false; initialData?: BillOfMaterialsApproval }
)

const BillOfMaterialsApprovalFormDrawerView = ({
  isEditForm = false,
  initialData,
}: BillOfMaterialsApprovalFormDrawerViewProps) => {
  const t = useTranslations("form")

  const { isLoading, onSubmit, handleCloseDrawer } =
    useBillOfMaterialsApprovalForm(isEditForm, initialData)

  return (
    <div className="flex h-full flex-col">
      <DrawerHeader
        heading={
          isEditForm
            ? t(messages.editBillOfMaterialsApproval)
            : t(messages.addNewBillOfMaterialsApproval)
        }
        onClose={handleCloseDrawer}
        headerClassName="mb-0"
      />
      <Form<BillOfMaterialsApproval>
        validationSchema={BillOfMaterialsApprovalSchema}
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
              <BillOfMaterialsApprovalForm
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

export const BillOfMaterialsApprovalForm = ({
  register,
  control,
  errors,
}: any) => {
  const t = useTranslations("form")

  return (
    <div className="flex flex-col gap-4 px-5 py-6">
      <Input
        type="text"
        isRequired
        label={t("form-approved-by")}
        placeholder={t("form-approved-by")}
        labelClassName="text-sm font-medium text-gray-900"
        {...register("approvedBy")}
        error={
          errors?.approvedBy?.message ? t(errors?.approvedBy?.message) : ""
        }
      />
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
        {...register("approvedNotes")}
        error={
          errors?.approvedNotes?.message
            ? t(errors?.approvedNotes?.message)
            : ""
        }
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
                {t("form-approved-date")}
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
            {t(errors?.approvedDate?.message)}
          </p>
        )}
      </div>
    </div>
  )
}

export default BillOfMaterialsApprovalFormDrawerView
