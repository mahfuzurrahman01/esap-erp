"use client"

import { useEffect } from "react"

import { Form } from "@core/ui/form"
import SimpleBar from "@core/ui/simplebar"
import { useTranslations } from "next-intl"
import { Controller, SubmitHandler } from "react-hook-form"

import DrawerFormActions from "@/components/base/drawer-form-actions"
import DrawerHeader from "@/components/base/drawer-header"
import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import { Select } from "@/components/ui"
import { useLeaveRequestApproval } from "@/hooks/hrms/attendance-and-leave/use-leave-request"
import { ApprovalLeaveRequestFormInput } from "@/types/hrms/attendance-and-leave/leave-request.types"

import { approvalStatusOptions } from "../reconciliation/approval-status-option"
import { approvalLeaveSchema } from "./approval-leave-request-schema"

type ApprovalFormDrawerViewProps = {
  initialData?: ApprovalLeaveRequestFormInput
}

const ApprovalLeaveRequestDrawerView = ({
  initialData,
}: ApprovalFormDrawerViewProps) => {
  const t = useTranslations("form")
  const { closeDrawer } = useDrawer()
  const {
    mutateAsync: updateApproval,
    isPending: isUpdatePending,
    isSuccess: updateSuccess,
    error: updateError,
  } = useLeaveRequestApproval()

  const handleCloseDrawer = () => {
    closeDrawer()
  }

  const onSubmit: SubmitHandler<ApprovalLeaveRequestFormInput> = async (
    data
  ) => {
    updateApproval({ ...data, id: initialData?.id })
  }
  useEffect(() => {
    if (updateSuccess) {
      handleCloseDrawer()
    }
  }, [updateSuccess])

  useEffect(() => {
    if (updateError) {
      handleCloseDrawer()
    }
  }, [updateError])

  return (
    <div className="flex h-full flex-col">
      <DrawerHeader
        heading={t("form-approval-form")}
        onClose={handleCloseDrawer}
        headerClassName="mb-0"
      />
      <Form<ApprovalLeaveRequestFormInput>
        validationSchema={approvalLeaveSchema}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: initialData,
        }}
        className="flex grow flex-col">
        {({ register, control, formState: { errors } }) => {
          return (
            <>
              <SimpleBar className="h-0 grow">
                <RequisitionApprovalForm
                  register={register}
                  errors={errors}
                  control={control}
                />
              </SimpleBar>
              <DrawerFormActions
                handleCloseDrawer={handleCloseDrawer}
                isLoading={isUpdatePending}
              />
            </>
          )
        }}
      </Form>
    </div>
  )
}

export const RequisitionApprovalForm = ({ register, control, errors }: any) => {
  const t = useTranslations("form")

  return (
    <div className="flex min-h-[400px] flex-col gap-4 overflow-visible px-5 py-6">
      <Controller
        control={control}
        name="status"
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
            isClearable={false}
            error={
              errors?.approvalStatus?.message
                ? t(errors?.approvalStatus?.message)
                : ""
            }
          />
        )}
      />
    </div>
  )
}

export default ApprovalLeaveRequestDrawerView
