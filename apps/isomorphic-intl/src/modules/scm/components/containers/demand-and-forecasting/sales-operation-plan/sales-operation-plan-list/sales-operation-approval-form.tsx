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
import { useCurrentUser } from "@/hooks/auth/use-auth"
import {
  useCreateSalesOperationApproval,
  useUpdateSalesOperationApproval,
} from "@/modules/scm/hooks/demand-and-forecasting/sales-operation-plan/use-sales-operation-approval"
import { SalesOperationApproval } from "@/modules/scm/types/demand-and-forecasting/sales-operation-plan/sales-operation-approval-types"
import { FindSelectOption } from "@/modules/scm/utils/select-options"
import { SalesOperationApprovalSchema } from "@/modules/scm/validators/demand-forecasting/sales-operation-approval.schema"

import { approvalStatusOptions } from "./status-option"

type IndexProps =
  | {
      initialData?: SalesOperationApproval
      salesOperationId: number
      isEditForm?: true
    }
  | {
      initialData?: undefined
      salesOperationId: number
      isEditForm?: false
    }

export default function SalesOperationApprovalForm({
  initialData,
  isEditForm,
  salesOperationId,
}: IndexProps) {
  const { closeDrawer } = useDrawer()
  const { user } = useCurrentUser()
  const t = useTranslations("form")

  const { mutateAsync: createSalesOperationApproval, isPending: isCreating } =
    useCreateSalesOperationApproval()
  const { mutateAsync: updateSalesOperationApproval, isPending: isUpdating } =
    useUpdateSalesOperationApproval()

  const onSubmit: SubmitHandler<SalesOperationApproval> = (data) => {
    if (isEditForm) {
      updateSalesOperationApproval({
        data: {
          ...data,
          id: initialData?.id,
        },
      })
    } else {
      createSalesOperationApproval({
        ...data,
        forecastReviewId: salesOperationId,
        approvedBy: user?.name ?? "",
      })
    }

    closeDrawer()
  }

  const defaultValues = {
    approvalStatus: "",
    approvalNotes: "",
    approvalDate: new Date().toISOString(),
  }

  return (
    <div className="flex h-full flex-col">
      <DrawerHeader
        heading={t("form-sales-operation-approval")}
        onClose={closeDrawer}
        headerClassName="mb-0"
      />
      <Form<SalesOperationApproval>
        onSubmit={onSubmit}
        validationSchema={SalesOperationApprovalSchema}
        useFormProps={{
          mode: "onChange",
          reValidateMode: "onChange",
          defaultValues: defaultValues,
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
                        }}
                        className="col-span-2 text-gray-900 dark:text-gray-0"
                        isRequired
                        error={
                          errors?.approvalStatus?.message
                            ? t(errors.approvalStatus.message)
                            : ""
                        }
                      />
                    )}
                  />
                  <Input
                    labelClassName="bg-paper"
                    label={t("form-approval-notes")}
                    {...register("approvalNotes")}
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
                            {t("form-requested-date")}{" "}
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
                            popperPlacement="bottom-end"
                          />
                        </div>
                      )}
                    />
                    {errors.approvalDate && (
                      <p className="text-sm text-red-500">
                        {errors.approvalDate?.message
                          ? t(errors.approvalDate.message)
                          : t("form-required-field")}
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
