"use client"

import { useEffect } from "react"

import { Form } from "@core/ui/form"
import SimpleBar from "@core/ui/simplebar"
import dayjs from "dayjs"
import { useTranslations } from "next-intl"
import { Controller } from "react-hook-form"

import { DatePicker } from "@/components/base/date-picker"
import DrawerFormActions from "@/components/base/drawer-form-actions"
import DrawerHeader from "@/components/base/drawer-header"
import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import { Input, Textarea } from "@/components/ui"
import { useCreateReconciliation } from "@/hooks/hrms/attendance-and-leave/use-reconciliation"
import { ReconciliationRequest } from "@/types/hrms/attendance-and-leave/reconciliation.types"
import {
  ReconciliationFormInput,
  reconciliationFormSchema,
} from "@/validators/hrms/reconciliation.schema"

type ReconciliationFormDrawerViewProps = {
  attendanceId: number
  checkout: string
}

const ReconciliationFormDrawerView: React.FC<
  ReconciliationFormDrawerViewProps
> = ({ attendanceId, checkout }) => {
  const { closeDrawer } = useDrawer()
  const t = useTranslations("form")
  const {
    mutateAsync: addRequest,
    isPending: requestPending,
    isSuccess: requestSuccess,
  } = useCreateReconciliation()

  const defaultData = {
    requestedCheckOut: "",
    reason: "",
    attendanceId: attendanceId,
  }
  const initialData = defaultData

  const handleCloseDrawer = () => {
    closeDrawer()
  }

  const onSubmit = async (data: ReconciliationRequest) => {
    // Format the date to match API requirements before submission
    const formattedData = {
      ...data,
      requestedCheckOut: dayjs(data.requestedCheckOut).format(
        "YYYY-MM-DDTHH:mm"
      ),
    }
    await addRequest(formattedData)
  }

  useEffect(() => {
    if (requestSuccess) {
      closeDrawer()
    }
  }, [requestSuccess])

  return (
    <div className="flex h-full flex-col">
      <DrawerHeader
        heading={t("form-add-new-reconciliation")}
        onClose={handleCloseDrawer}
        headerClassName="mb-0"
      />
      <Form<ReconciliationFormInput>
        validationSchema={reconciliationFormSchema}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: initialData,
        }}
        className="flex grow flex-col">
        {({ register, control, formState: { errors } }) => (
          <>
            <SimpleBar className="h-0 grow">
              <ReconciliationForm
                control={control}
                register={register}
                errors={errors}
                checkOut={checkout}
                attendanceId={attendanceId}
              />
            </SimpleBar>
            <DrawerFormActions
              handleCloseDrawer={handleCloseDrawer}
              isLoading={requestPending}
              isEditForm={false}
            />
          </>
        )}
      </Form>
    </div>
  )
}

export function ReconciliationForm({
  register,
  control,
  errors,
  checkOut,
  attendanceId,
}: any) {
  const t = useTranslations("form")

  return (
    <div className="flex h-[100vh] flex-col gap-4 px-5 py-6">
      <Controller
        control={control}
        name="attendanceId"
        render={({ field: {} }) => (
          <Input
            type="text"
            label={t("form-attendance-id")}
            readOnly
            disabled
            defaultValue={attendanceId}
          />
        )}
      />
      <Controller
        control={control}
        name="requestedCheckOut"
        render={({ field: { onChange, value } }) => (
          <DatePicker
            inputProps={{
              label: t("form-requested-checkout"),
              clearable: false,
            }}
            placeholderText={t("form-attendance-date-time")}
            value={value ? new Date(value) : null}
            onChange={(date: any) => {
              if (!date) {
                onChange(null)
                return
              }
              // Convert the date to local timezone and store
              const localDate = new Date(date)
              const formattedDate = dayjs(localDate).format()
              onChange(formattedDate)
            }}
            popperPlacement="bottom-start"
            showTimePicker={true}
          />
        )}
      />

      <Textarea
        label={t("form-reason")}
        labelClassName="text-sm font-medium text-gray-900"
        {...register("reason")}
        error={errors?.reason?.message ? t(errors?.reason?.message) : ""}
      />
    </div>
  )
}
export default ReconciliationFormDrawerView
