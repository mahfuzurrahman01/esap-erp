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
  useCreateStockTransferApproval,
  useUpdateStockTransferApproval,
} from "@/modules/scm/hooks/inventory/stock-transfer/use-stock-transfer-approval"
import { StockTransferApproval } from "@/modules/scm/types/inventory/stock-transfer/stock-transfer-approval"
import { FindSelectOption } from "@/modules/scm/utils/select-options"
import { StockTransferApprovalSchema } from "@/modules/scm/validators/inventory/stock-transfer-approval.schema"

import { approvalStatusOptions } from "./status-option"

type IndexProps =
  | {
      initialData?: StockTransferApproval
      stockTransferId: number
      isEditForm?: true
    }
  | {
      initialData?: undefined
      stockTransferId: number
      isEditForm?: false
    }

export default function StockTransferApprovalForm({
  initialData,
  isEditForm,
  stockTransferId,
}: IndexProps) {
  const t = useTranslations("form")
  const { closeDrawer } = useDrawer()
  const { user } = useCurrentUser()

  // const [status, setStatus] = useState<string>("")

  const { mutateAsync: createStockTransferApproval, isPending: isCreating } =
    useCreateStockTransferApproval()
  const { mutateAsync: updateStockTransferApproval, isPending: isUpdating } =
    useUpdateStockTransferApproval()

  const onSubmit: SubmitHandler<StockTransferApproval> = (data) => {
    if (isEditForm) {
      updateStockTransferApproval({
        data: {
          ...data,
          id: initialData?.id,
        },
      })
    } else {
      createStockTransferApproval({
        ...data,
        stockTransferId: stockTransferId,
        approvedBy: user?.name || "",
      })
    }

    closeDrawer()
  }

  return (
    <div className="flex h-full flex-col">
      <DrawerHeader
        heading={t("form-stock-transfer-approval")}
        onClose={closeDrawer}
        headerClassName="mb-0"
      />
      <Form<StockTransferApproval>
        onSubmit={onSubmit}
        validationSchema={StockTransferApprovalSchema}
        useFormProps={{
          defaultValues: {
            approvalStatus: "",
            approvalDate: "",
            approvalNotes: "",
          },
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
                          onChange(selectedValue.value)
                        }}
                        className="col-span-2 text-gray-900 dark:text-gray-0"
                        error={
                          errors.approvalStatus?.message
                            ? t(errors.approvalStatus?.message)
                            : ""
                        }
                        isRequired
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
                            defaultDate={new Date()}
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
                isLoading={isCreating || isUpdating}
              />
            </>
          )
        }}
      </Form>
    </div>
  )
}
