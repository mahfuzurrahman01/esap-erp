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
import { PurchasedOrderApproval } from "@/modules/scm/types/procurement/purchased-order/purchased-order-approval-types"
import { RequisitionApproval } from "@/modules/scm/types/procurement/requisition/requisition-approval-types"
import { purchasedOrderApprovalSchema } from "@/modules/scm/validators/procurement/purchased-order-approval.schema"

import { approvalStatusOptions } from "./status-option"
import { usePurchasedOrderApprovalForm } from "./use-purchased-order-approval-form"

type PurchasedOrderApprovalFormDrawerViewProps = {
  isEditForm?: boolean
  initialData?: PurchasedOrderApproval
} & (
  | { isEditForm: true; initialData: PurchasedOrderApproval }
  | { isEditForm?: false; initialData?: PurchasedOrderApproval }
)

const PurchasedOrderApprovalFormDrawerView = ({
  isEditForm = false,
  initialData,
}: PurchasedOrderApprovalFormDrawerViewProps) => {
  const t = useTranslations("form")

  const { isLoading, onSubmit, handleCloseDrawer } =
    usePurchasedOrderApprovalForm(isEditForm, initialData)

  return (
    <div className="flex h-full flex-col">
      <DrawerHeader
        heading={
          isEditForm
            ? t(messages.editPurchasedOrderApproval)
            : t(messages.addNewPurchasedOrderApproval)
        }
        onClose={handleCloseDrawer}
        headerClassName="mb-0"
      />
      <Form<PurchasedOrderApproval>
        validationSchema={purchasedOrderApprovalSchema}
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
              <PurchasedOrderApprovalForm
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

export const PurchasedOrderApprovalForm = ({
  register,
  control,
  errors,
}: any) => {
  const t = useTranslations("form")

  return (
    <div className="flex flex-col gap-4 px-5 py-6">
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
            isRequired
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
        label={t("form-approval-notes")}
        placeholder={t("form-approval-notes")}
        labelClassName="text-sm font-medium text-gray-900"
        {...register("approveNotes")}
        error={
          errors?.approveNotes?.message ? t(errors?.approveNotes?.message) : ""
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
                {t("form-approval-date")}{" "}
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
            {t(errors?.approvedDate?.message)}
          </p>
        )}
      </div>
    </div>
  )
}

export default PurchasedOrderApprovalFormDrawerView
