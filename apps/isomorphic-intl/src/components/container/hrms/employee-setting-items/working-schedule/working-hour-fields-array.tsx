import { useState } from "react"

import { useTranslations } from "next-intl"
import { Controller, useFieldArray, useWatch } from "react-hook-form"
import { PiClockCountdown } from "react-icons/pi"
import { ActionIcon, Text } from "rizzui"

import TrashIcon from "@/components/icons/trash"
import { Button, Input, Select } from "@/components/ui"
import { cn } from "@/utils/cn"

const TimeDropdown = ({ value, onChange, isOpen, onClose }: any) => {
  const timeOptions = []
  for (let hour = 0; hour < 24; hour++) {
    for (let minute of ["00", "30"]) {
      const formattedHour = hour.toString().padStart(2, "0")
      timeOptions.push(`${formattedHour}:${minute}`)
    }
  }

  if (!isOpen) return null

  return (
    <div className="absolute left-0 top-full z-50 mt-1 w-full overflow-hidden rounded-md border border-transparent bg-paper shadow-lg">
      <div className="dropdown-gr before:absolute before:-end-4 before:-top-4 before:size-[80px] before:rounded-full before:bg-blue/50 before:blur-[80px] after:absolute after:-bottom-4 after:-start-4 after:size-[80px] after:rounded-full after:bg-red/50 after:blur-[80px]">
        <div className="relative z-10 grid h-[120px] grid-cols-2 gap-1 overflow-y-auto p-2">
          {timeOptions.map((time) => (
            <button
              key={time}
              className={cn(
                "rounded px-2 py-1 text-left text-sm text-gray-900 transition-colors duration-200 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700",
                value === time ? "bg-gray-100 font-medium dark:bg-gray-700" : ""
              )}
              onClick={() => {
                onChange({ target: { value: time } })
                onClose()
              }}>
              {time}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

const WorkingHoursFieldArray = ({
  control,
  register,
  errors,
  setValue,
}: any) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "workingHours",
  })

  const t = useTranslations("form")
  const watchWorkingHours = useWatch({ control, name: "workingHours" })
  const dayOfWeekOptions = [
    { value: "Monday", label: t("form-monday") },
    { value: "Tuesday", label: t("form-tuesday") },
    { value: "Wednesday", label: t("form-wednesday") },
    { value: "Thursday", label: t("form-thursday") },
    { value: "Friday", label: t("form-friday") },
    { value: "Saturday", label: t("form-saturday") },
    { value: "Sunday", label: t("form-sunday") },
  ]

  const [openTimeDropdown, setOpenTimeDropdown] = useState<{
    index: number
    field: "workFrom" | "workTo" | null
  }>({ index: -1, field: null })

  const isAddButtonDisabled = () => {
    if (!watchWorkingHours || watchWorkingHours.length === 0) return false
    const lastEntry = watchWorkingHours[watchWorkingHours.length - 1]
    return !(
      lastEntry.name &&
      lastEntry.dayOfWeek &&
      lastEntry.workFrom &&
      lastEntry.workTo
    )
  }

  const addNewWorkingHour = () => {
    const defaultWorkFrom = "00:00"
    const defaultWorkTo = "00:00"
    append({
      name: "",
      dayOfWeek: "Monday",
      dayPeriod: "Morning",
      workFrom: defaultWorkFrom,
      workTo: defaultWorkTo,
      duration: calculateDuration(defaultWorkFrom, defaultWorkTo),
    })
  }

  const calculateDuration = (from: string, to: string) => {
    const [fromHours, fromMinutes] = from.split(":").map(Number)
    const [toHours, toMinutes] = to.split(":").map(Number)
    let duration = toHours * 60 + toMinutes - (fromHours * 60 + fromMinutes)
    if (duration < 0) duration += 24 * 60 // Handle overnight shifts

    return duration / 60 // Convert minutes to hours
  }
  //console.log(errors)
  return (
    <div>
      <Text as="p" className="text-md mb-4 font-medium">
        {t("form-working-hours")}
      </Text>

      {/* Labels for md devices and above */}
      <div className="z-20 hidden rounded-t-lg border-b border-t border-gray-500/20 bg-gray-100 px-3 py-2 dark:bg-gray-700 md:mb-4 md:grid md:grid-cols-[1fr_1fr_1fr_1fr_1fr_0.5fr] md:gap-2">
        <Text className="font-medium">{t("form-name")}</Text>
        <Text className="font-medium">{t("form-day-of-week")}</Text>
        <Text className="font-medium">{t("form-day-period")}</Text>
        <Text className="font-medium">{t("form-work-from")}</Text>
        <Text className="font-medium">{t("form-work-to")}</Text>
        <Text className="font-medium"></Text>
      </div>

      {fields.map((field, index) => (
        <div
          key={field.id}
          className="mb-4 flex flex-col items-center md:grid md:grid-cols-[1fr_1fr_1fr_1fr_1fr_0.5fr] md:gap-2">
          <div className="mb-4 w-full md:mb-0">
            <Text className="mb-2 font-medium md:hidden">{t("form-name")}</Text>
            <Input
              {...register(`workingHours.${index}.name`)}
              error={!!errors?.workingHours?.[index]?.name}
            />
          </div>
          <div className="mb-4 w-full md:mb-0">
            <Text className="mb-2 font-medium md:hidden">
              {t("form-day-of-week")}
            </Text>
            <Controller
              name={`workingHours.${index}.dayOfWeek`}
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  placeholder={t("form-day-of-week")}
                  options={dayOfWeekOptions}
                  defaultValue="Monday"
                />
              )}
            />
          </div>
          <div className="mb-4 w-full md:mb-0">
            <Text className="mb-2 font-medium md:hidden">
              {t("form-day-period")}
            </Text>
            <Controller
              name={`workingHours.${index}.dayPeriod`}
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  placeholder={t("form-day-period")}
                  options={[
                    { value: "Morning", label: "Morning" },
                    { value: "Afternoon", label: "Afternoon" },
                    { value: "Break", label: "Break" },
                  ]}
                  defaultValue="Morning"
                />
              )}
            />
          </div>
          <div className="mb-4 w-full md:mb-0">
            <Text className="mb-2 font-medium md:hidden">
              {t("form-work-from")}
            </Text>
            <Controller
              name={`workingHours.${index}.workFrom`}
              control={control}
              render={({ field }) => (
                <div className="relative">
                  <Input
                    {...field}
                    type="time"
                    className="appearance-none [&::-webkit-calendar-picker-indicator]:bg-transparent [&::-webkit-calendar-picker-indicator]:hover:cursor-pointer"
                    prefix={
                      <PiClockCountdown
                        className="h-5 w-5 cursor-pointer text-gray-500"
                        onClick={(e) => {
                          e.stopPropagation()
                          setOpenTimeDropdown({
                            index,
                            field:
                              openTimeDropdown.index === index &&
                              openTimeDropdown.field === "workFrom"
                                ? null
                                : "workFrom",
                          })
                        }}
                      />
                    }
                    onChange={(e) => {
                      field.onChange(e)
                      const workTo = watchWorkingHours[index].workTo
                      if (workTo) {
                        const duration = calculateDuration(
                          e.target.value,
                          workTo
                        )
                        setValue(`workingHours.${index}.duration`, duration)
                      }
                    }}
                  />
                  <TimeDropdown
                    value={field.value}
                    onChange={(e: any) => {
                      field.onChange(e)
                      const workTo = watchWorkingHours[index].workTo
                      if (workTo) {
                        const duration = calculateDuration(
                          e.target.value,
                          workTo
                        )
                        setValue(`workingHours.${index}.duration`, duration)
                      }
                    }}
                    isOpen={
                      openTimeDropdown.index === index &&
                      openTimeDropdown.field === "workFrom"
                    }
                    onClose={() =>
                      setOpenTimeDropdown({ index: -1, field: null })
                    }
                  />
                  <style jsx global>{`
                    input[type="time"]::-webkit-calendar-picker-indicator {
                      background: none;
                      display: none;
                    }
                    input[type="time"]::-webkit-datetime-edit-fields-wrapper {
                      padding: 0;
                    }
                    input[type="time"]::-webkit-datetime-edit {
                      padding: 0;
                      color: #4b5563;
                    }
                    input[type="time"]:focus {
                      box-shadow: none;
                    }
                  `}</style>
                </div>
              )}
            />
          </div>
          <div className="mb-4 w-full md:mb-0">
            <Text className="mb-2 font-medium md:hidden">
              {t("form-work-to")}
            </Text>
            <Controller
              name={`workingHours.${index}.workTo`}
              control={control}
              render={({ field }) => (
                <div className="relative">
                  <Input
                    {...field}
                    type="time"
                    className="appearance-none [&::-webkit-calendar-picker-indicator]:bg-transparent [&::-webkit-calendar-picker-indicator]:hover:cursor-pointer"
                    prefix={
                      <PiClockCountdown
                        className="h-5 w-5 cursor-pointer text-gray-500"
                        onClick={(e) => {
                          e.stopPropagation()
                          setOpenTimeDropdown({
                            index,
                            field:
                              openTimeDropdown.index === index &&
                              openTimeDropdown.field === "workTo"
                                ? null
                                : "workTo",
                          })
                        }}
                      />
                    }
                    onChange={(e) => {
                      field.onChange(e)
                      const workFrom = watchWorkingHours[index].workFrom
                      if (workFrom) {
                        const duration = calculateDuration(
                          workFrom,
                          e.target.value
                        )
                        setValue(`workingHours.${index}.duration`, duration)
                      }
                    }}
                  />
                  <TimeDropdown
                    value={field.value}
                    onChange={(e: any) => {
                      field.onChange(e)
                      const workFrom = watchWorkingHours[index].workFrom
                      if (workFrom) {
                        const duration = calculateDuration(
                          workFrom,
                          e.target.value
                        )
                        setValue(`workingHours.${index}.duration`, duration)
                      }
                    }}
                    isOpen={
                      openTimeDropdown.index === index &&
                      openTimeDropdown.field === "workTo"
                    }
                    onClose={() =>
                      setOpenTimeDropdown({ index: -1, field: null })
                    }
                  />
                </div>
              )}
            />
          </div>
          <div className="mb-4 w-full md:mb-0 md:flex md:w-auto md:justify-center">
            <ActionIcon
              size="sm"
              variant="outline"
              color="danger"
              className="h-10 w-10"
              onClick={() => remove(index)}>
              <TrashIcon className="h-4 w-4" />
            </ActionIcon>
          </div>
        </div>
      ))}
      <Button
        type="button"
        color="primary"
        variant="flat"
        onClick={addNewWorkingHour}
        className="mt-4"
        disabled={isAddButtonDisabled()}>
        {t("form-add-working-hour")}
      </Button>
    </div>
  )
}

export default WorkingHoursFieldArray
