import { Form } from "@core/ui/form"
import { useTranslations } from "next-intl"
import { z } from "node_modules/zod/lib"
import { SubmitHandler, useFieldArray, useWatch } from "react-hook-form"
import { Controller } from "react-hook-form"
import { Text } from "rizzui"
import SimpleBar from "simplebar-react"

import { DatePicker } from "@/components/base/date-picker"
import EmployeeFormStickyActions from "@/components/container/hrms/employee/employee-form-sticky-actions"
import { Button, Input } from "@/components/ui"
import { Select } from "@/components/ui"
import { offDaySchema } from "@/validators/hrms/off-day.schema"

const offDayFormSchema = z.object({
  offDays: z
    .array(offDaySchema)
    .min(1, { message: "Please add at least one off day" }),
})
type FormInput = z.infer<typeof offDayFormSchema>

const AddOffDaysForm = () => {
  const onSubmit: SubmitHandler<FormInput> = (data) => {
    console.log(data)
  }

  return (
    <>
      <Form<FormInput>
        className="flex h-full min-h-full grow flex-col justify-between @container"
        validationSchema={offDayFormSchema}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: {
            offDays: [],
          },
        }}>
        {({ register, control, formState: { errors } }) => (
          <>
            <SimpleBar className="grow">
              <OffDayForm
                register={register}
                control={control}
                errors={errors}
              />
            </SimpleBar>
            <EmployeeFormStickyActions isEditForm={false} isLoading={false} />
          </>
        )}
      </Form>
    </>
  )
}

export default AddOffDaysForm

const OffDayForm = ({ register, control, errors }: any) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "offDays",
  })
  const t = useTranslations("form")
  const offDaysData = useWatch({ control, name: "offDays" })

  const isAddButtonDisabled = () => {
    if (!offDaysData || offDaysData.length === 0) return false
    const lastEntry = offDaysData[offDaysData.length - 1]
    return !(
      lastEntry.offDayName &&
      lastEntry.leaveTypeId &&
      lastEntry.dateFrom &&
      lastEntry.dateTo
    )
  }

  const addNewOffDay = () => {
    append({
      offDayName: "",
      leaveTypeId: null,
      dateFrom: new Date(),
      dateTo: new Date(),
      description: "",
    })
  }

  const dummyLeaveTypes = [
    { value: 1, label: "Annual Leave" },
    { value: 2, label: "National Holiday" },
    { value: 3, label: "Public Holiday" },
    { value: 4, label: "Sick Leave" },
    { value: 5, label: "Vacation Leave" },
  ]

  const getErrorMessage = (data: string | undefined) => {
    return data ? t(data) : ""
  }

  return (
    <div>
      <Text
        as="p"
        className="typography-primary p-5 text-lg font-medium md:text-xl">
        {t("form-off-days-entry-list")}
      </Text>

      <div className="hidden border-gray-500/20 bg-gray-200 px-4 py-2 dark:bg-gray-700 md:mb-4 md:grid md:h-12 md:grid-cols-[60px_1fr_1fr_1fr_1fr_1fr_0.5fr] md:items-center md:gap-2">
        <Text className="font-medium">{t("form-sn")}</Text>
        <Text className="font-medium">{t("form-name")}</Text>
        <Text className="font-medium">{t("form-leave-type")}</Text>
        <Text className="font-medium">{t("form-from")}</Text>
        <Text className="font-medium">{t("form-to")}</Text>
        <Text className="font-medium">{t("form-description")}</Text>
        <Text className="font-medium"></Text>
      </div>

      {fields.map((field, index) => (
        <div
          key={index}
          className="mb-4 flex flex-col items-center px-4 md:grid md:grid-cols-[60px_1fr_1fr_1fr_1fr_1fr_0.5fr] md:items-start md:gap-2">
          <div className="mb-4 flex h-full w-full items-center md:mb-0">
            <Text className="mb-2 font-medium md:hidden">
              {t("form-sn")}: {index + 1}
            </Text>
            <div className="typography-primary flex items-center max-md:hidden">
              {index + 1}
            </div>
          </div>

          <div className="mb-4 w-full md:mb-0">
            <Text className="mb-2 font-medium md:hidden">{t("form-name")}</Text>
            <Input
              {...register(`offDays.${index}.offDayName`)}
              error={!!errors?.offDays?.[index]?.offDayName?.message}
            />
          </div>

          <div className="mb-4 w-full md:mb-0">
            <Text className="mb-2 font-medium md:hidden">
              {t("form-leave-type")}
            </Text>
            <Controller
              name={`offDays.${index}.leaveTypeId`}
              control={control}
              render={({ field: { value, onChange } }) => (
                <Select
                  options={dummyLeaveTypes}
                  onChange={(newValue: any) =>
                    onChange(Number(newValue?.value))
                  }
                  value={
                    dummyLeaveTypes.find(
                      (option) => option.value === Number(value)
                    ) || null
                  }
                  error={getErrorMessage(
                    errors?.offDays?.[index]?.leaveTypeId?.message
                  )}
                />
              )}
            />
          </div>

          <div className="mb-4 w-full md:mb-0">
            <Text className="mb-2 font-medium md:hidden">{t("form-from")}</Text>
            <Controller
              name={`offDays.${index}.dateFrom`}
              control={control}
              render={({ field: { value, onChange } }) => (
                <DatePicker
                  value={value ? new Date(value) : null}
                  onChange={(date: any) => onChange(date)}
                  placeholderText={t("form-select-date-from")}
                  className="w-full"
                />
              )}
            />
            {errors?.offDays?.[index]?.dateCompare?.message && (
              <Text className="text-red-500">
                {getErrorMessage(
                  errors?.offDays?.[index]?.dateCompare?.message
                )}
              </Text>
            )}
          </div>

          <div className="mb-4 w-full md:mb-0">
            <Text className="mb-2 font-medium md:hidden">{t("form-to")}</Text>
            <Controller
              name={`offDays.${index}.dateTo`}
              control={control}
              render={({ field: { value, onChange } }) => (
                <DatePicker
                  value={value ? new Date(value) : null}
                  onChange={(date: any) => onChange(date)}
                  placeholderText={t("form-select-date-to")}
                  className="w-full"
                />
              )}
            />
          </div>

          <div className="mb-4 w-full md:mb-0">
            <Text className="mb-2 font-medium md:hidden">
              {t("form-description")}
            </Text>
            <Input {...register(`offDays.${index}.description`)} />
          </div>

          <div className="mb-4 w-full md:mb-0 md:flex md:w-auto md:justify-center">
            <Button
              type="button"
              variant="outline"
              color="danger"
              onClick={() => remove(index)}>
              {t("form-delete")}
            </Button>
          </div>
        </div>
      ))}
      <Button
        type="button"
        color="primary"
        onClick={addNewOffDay}
        className="ml-5 mt-4"
        disabled={isAddButtonDisabled()}>
        {t("form-add-off-day")}
      </Button>
    </div>
  )
}
