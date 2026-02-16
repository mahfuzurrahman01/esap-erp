import { useEffect } from "react"

import { useTranslations } from "next-intl"
import { Controller, useFieldArray, useWatch } from "react-hook-form"
import { PiTrashBold } from "react-icons/pi"
import { ActionIcon, Select, Text } from "rizzui"

import { Button, Input } from "@/components/ui"

const PlanActivityFieldArray = ({ control, register, errors }: any) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "activities",
  })
  const t = useTranslations("form")
  const watchActivities = useWatch({ control, name: "activities" })

  const assignedToOptions = [
    { value: 1, label: "John Doe" },
    { value: 2, label: "Jane Smith" },
    { value: 3, label: "Bob Johnson" },
  ]

  const isAddButtonDisabled = () => {
    if (!watchActivities || watchActivities.length === 0) return false
    const lastEntry = watchActivities[watchActivities.length - 1]
    return !(
      lastEntry.activityName &&
      lastEntry.summary &&
      lastEntry.assignedTo
    )
  }

  useEffect(() => {
    if (fields.length === 0) {
      append({
        activityName: "",
        summary: "",
        assignment: "",
        assignedTo: null,
      })
    }
  }, [fields])

  return (
    <div>
      <Text as="p" className="mb-4 text-lg font-medium">
        {t("form-activities")}
      </Text>

      {/* Labels for md devices and above */}
      <div className="hidden border-b border-t border-gray-500/20 py-2 md:mb-4 md:grid md:grid-cols-[1fr_1fr_1fr_1fr_0.5fr] md:gap-2">
        <Text className="font-medium">{t("form-activity-name")}</Text>
        <Text className="font-medium">{t("form-summary")}</Text>
        <Text className="font-medium">{t("form-assignment")}</Text>
        <Text className="font-medium">{t("form-assigned-to")}</Text>
        <Text className="font-medium"></Text>
      </div>

      {fields.map((field, index) => (
        <div
          key={field.id}
          className="mb-4 flex flex-col items-center md:grid md:grid-cols-[1fr_1fr_1fr_1fr_0.5fr] md:gap-2">
          <div className="mb-4 w-full md:mb-0">
            {/* <Text className="mb-2 font-medium md:hidden">
              {t("form-activity-name")}
            </Text> */}
            <Input
              {...register(`activities.${index}.activityName`)}
              placeholder={t("form-activity-name")}
              error={!!errors?.activities?.[index]?.activityName}
            />
          </div>
          <div className="mb-4 w-full md:mb-0">
            <Text className="mb-2 font-medium md:hidden">
              {t("form-summary")}
            </Text>
            <Input
              {...register(`activities.${index}.summary`)}
              placeholder={t("form-summary")}
              error={!!errors?.activities?.[index]?.summary}
            />
          </div>
          <div className="mb-4 w-full md:mb-0">
            <Text className="mb-2 font-medium md:hidden">
              {t("form-assignment")}
            </Text>
            <Input
              {...register(`activities.${index}.assignment`)}
              placeholder={t("form-assignment")}
            />
          </div>
          <div className="mb-4 w-full md:mb-0 md:mt-2">
            <Text className="mb-2 font-medium md:hidden">
              {t("form-assigned-to")}
            </Text>
            <Controller
              name={`activities.${index}.assignedTo`}
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select
                  {...field}
                  placeholder={t("form-select-assigned-to")}
                  options={assignedToOptions}
                  onChange={(selectedOption: {
                    label: string
                    value: number
                  }) => onChange(selectedOption?.value)}
                  value={
                    assignedToOptions.find(
                      (option) => option.value === value
                    ) || null
                  }
                  error={
                    errors?.activities?.[index]?.assignedTo?.message
                      ? t(errors?.activities?.[index]?.assignedTo?.message)
                      : ""
                  }
                  errorClassName="hidden"
                />
              )}
            />
          </div>
          <div className="mb-4 w-full md:mb-0 md:flex md:w-auto md:justify-center">
            <ActionIcon
              size="sm"
              variant="outline"
              color="danger"
              className="h-10 w-10"
              onClick={() => fields.length > 1 && remove(index)}
              disabled={fields.length === 1}>
              <PiTrashBold className="h-5 w-5" />
            </ActionIcon>
          </div>
        </div>
      ))}
      <Button
        type="button"
        color="primary"
        onClick={() =>
          append({
            activityName: "",
            summary: "",
            assignment: "",
            assignedTo: 0,
          })
        }
        className="mt-4"
        disabled={isAddButtonDisabled()}>
        {t("form-add-activity")}
      </Button>
    </div>
  )
}

export default PlanActivityFieldArray
