"use client"

import { Form } from "@core/ui/form"
import SimpleBar from "@core/ui/simplebar"
import dayjs from "dayjs"
import { useTranslations } from "next-intl"
import { Controller } from "react-hook-form"

import { DatePicker } from "@/components/base/date-picker"
import DrawerFormActions from "@/components/base/drawer-form-actions"
import DrawerHeader from "@/components/base/drawer-header"
import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import { Input } from "@/components/ui"
import {
  useCreateFiscalYear,
  useFiscalYearById,
  useUpdateFiscalYear,
} from "@/modules/fms/hooks/use-fiscal-year"
import { FiscalYearList } from "@/modules/fms/types/fiscal-year"
import {
  FiscalYearFormInput,
  fiscalYearFormSchema,
} from "@/modules/fms/validators/fiscal-year-schema"

export default function FiscalYearFormDrawerView({ id }: { id?: number }) {
  const { closeDrawer } = useDrawer()
  const t = useTranslations("form")
  const { data: dataById, isLoading: isLoadingById } = useFiscalYearById(id!)

  const { mutateAsync: createMutation, isPending: isCreating } =
    useCreateFiscalYear()
  const { mutateAsync: updateMutation, isPending: isUpdating } =
    useUpdateFiscalYear()

  const handleCloseDrawer = () => {
    closeDrawer()
  }

  const isEditMode = !!id

  const onSubmit = async (data: FiscalYearList) => {
    if (isEditMode && id) {
      await updateMutation(data)
      closeDrawer()
    } else {
      await createMutation(data)
      closeDrawer()
    }
  }

  const defaultValues: FiscalYearFormInput = {
    yearRange: dataById?.yearRange || "",
    startDate: dataById?.startDate || "",
    endDate: dataById?.endDate || "",
  }

  return (
    <div className="flex h-full flex-col">
      <DrawerHeader
        heading={
          isEditMode
            ? t("form-edit-fiscal-year")
            : t("form-add-new-fiscal-year")
        }
        onClose={handleCloseDrawer}
        headerClassName="mb-0 px-6"
      />
      <Form<FiscalYearFormInput>
        validationSchema={fiscalYearFormSchema}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: dataById || defaultValues,
          mode: "onChange",
          values: dataById as FiscalYearList,
        }}
        className="flex grow flex-col">
        {({ register, control, formState: { errors } }) => (
          <>
            <SimpleBar className="h-0 grow">
              <div className="flex min-h-[500px] flex-col gap-4 px-5 py-6">
                <Input
                  label={t("form-fiscal-year")}
                  placeholder={t("form-enter-fiscal-year")}
                  labelClassName="text-sm font-medium text-gray-900"
                  {...register("yearRange")}
                  error={
                    errors?.yearRange?.message
                      ? t(errors?.yearRange?.message)
                      : ""
                  }
                />
                <div className="[&>.react-datepicker-wrapper]:w-full">
                  <Controller
                    name="startDate"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <DatePicker
                        inputProps={{
                          label: t("form-start-date"),
                        }}
                        placeholderText={t("form-select-date")}
                        value={value ? new Date(value) : null}
                        onChange={(date: any) => {
                          const formattedDate = date
                            ? dayjs(date).format("YYYY-MM-DD")
                            : undefined
                          onChange(formattedDate)
                        }}
                        popperPlacement="bottom-end"
                        maxDate={new Date()}
                        portal                        
                      />
                    )}
                  />
                </div>
                <div className="[&>.react-datepicker-wrapper]:w-full">
                  <Controller
                    name="endDate"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <DatePicker
                        inputProps={{
                          label: t("form-end-date"),
                        }}
                        placeholderText={t("form-select-date")}
                        value={value ? new Date(value) : null}
                        onChange={(date: any) => {
                          const formattedDate = date
                            ? dayjs(date).format("YYYY-MM-DD")
                            : undefined
                          onChange(formattedDate)
                        }}
                        popperPlacement="bottom-end"
                        minDate={new Date()}
                        portal
                      />
                    )}
                  />
                </div>
              </div>
            </SimpleBar>
            <DrawerFormActions
              handleCloseDrawer={handleCloseDrawer}
              isLoading={isCreating || isUpdating || isLoadingById}
              isEditForm={isEditMode}
            />
          </>
        )}
      </Form>
    </div>
  )
}
