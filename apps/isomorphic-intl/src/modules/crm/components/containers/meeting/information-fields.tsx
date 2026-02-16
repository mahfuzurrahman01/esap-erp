import React from "react"

import { useTranslations } from "next-intl"
import { Controller } from "react-hook-form"
import { PiClock } from "react-icons/pi"

import { DatePicker } from "@/components/base/date-picker"
import { Checkbox, Input, Select } from "@/components/ui"
import { participantTypeOptions } from "@/data/crm/campaign"
import { quotationTypes } from "@/data/crm/quotation"
import FormGroup from "@/modules/crm/components/base/form-group"

import { useSOTemplate } from "../sales-orders/so-template"

export default function InformationFields({ register, control, errors }: any) {
  const t = useTranslations("form")
  const { userOptions, isUserLoading } = useSOTemplate()

  return (
    <FormGroup
      title={t("form-information")}
      className="grid-cols-12 pt-7 @2xl:pt-10 @3xl:pt-11">
      <Input
        type="text"
        isRequired
        label={t("form-title")}
        autoComplete="off"
        placeholder={t("form-enter-title")}
        {...register("title", { required: true })}
        error={errors?.title?.message && t("form-title-is-required")}
      />

      {/* <Controller
        name="meetingDate"
        control={control}
        render={({ field: { value, onChange } }) => (
          <div className="relative">
            <label
              htmlFor="meetingDate"
              className="mb-2 block text-sm font-medium text-title transition-colors duration-200">
              {t("form-meeting-date")}
            </label>
            <DatePicker
              id="meetingDate"
              autoComplete="off"
              value={value ? new Date(value) : null}
              onChange={(date: Date | null) =>
                onChange(date ? date.toISOString() : "")
              }
              placeholderText={t("form-select-date")}
              className="w-full"
            />
          </div>
        )}
      /> */}

      <Controller
        name="meetingTime"
        control={control}
        render={({ field: { value, onChange } }) => (
          <div className="relative">
            <label
              htmlFor="meetingTime"
              className="mb-2 block text-sm font-medium text-title transition-colors duration-200">
              {t("form-meeting-time")}{" "}
              <span className="text-orange-500">*</span>
            </label>
            <DatePicker
              id="meetingTime"
              autoComplete="off"
              value={value ? new Date(value) : null}
              onChange={(date: any) => onChange(date ? date.toISOString() : "")}
              showTimeSelect
              showTimePicker={true}
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="h:mm aa"
              placeholderText={t("form-select-time")}
              className="crm-time w-full"
              customInput={
                <Input
                  labelClassName="mb-0"
                  className="w-full rounded-lg border-gray-500/20 text-title shadow-none ring-0"
                  placeholder={t("form-select-time")}
                  suffix={<PiClock className="h-5 w-5 text-gray-500" />}
                  value={value}
                  readOnly
                />
              }
            />
            <span className="mt-1 text-xs text-red-500">
              {errors.meetingTime?.message && t("form-time-is-required")}
            </span>
          </div>
        )}
      />

      <Controller
        name="relatedTo"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            isSearchable={true}
            isRequired
            label={t("form-related-to")}
            options={quotationTypes}
            onChange={(selectedOption: any) => onChange(selectedOption?.value)}
            value={
              quotationTypes?.find((option: any) => option.value === value) ||
              null
            }
            error={
              errors?.relatedTo?.message && t("form-related-to-is-required")
            }
          />
        )}
      />

      <Controller
        name="participateType"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            isSearchable={true}
            label={t("form-participant-type")}
            options={participantTypeOptions}
            onChange={(selectedOption: any) => onChange(selectedOption?.value)}
            value={
              participantTypeOptions?.find(
                (option: any) => option.value === value
              ) || null
            }
            error={errors?.participateType?.message}
          />
        )}
      />

      <Controller
        name="participantIds"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Select
            label={t("form-participant")}
            labelClassName="text-title"
            isRequired
            isMulti
            options={userOptions}
            value={
              Array.isArray(value)
                ? userOptions.filter((option: any) =>
                    value.includes(option.value.toString())
                  )
                : []
            }
            onChange={(options: any) => {
              const values = options
                ? options.map((option: any) => option.value)
                : []
              onChange(values)
            }}
            isLoading={isUserLoading}
            isDisabled={isUserLoading}
            placeholder={isUserLoading ? t("form-loading") : t("form-select")}
            error={
              errors.participantIds?.message &&
              t("form-participant-is-required")
            }
          />
        )}
      />

      {/* <Controller
        name="repeatDate"
        control={control}
        render={({ field: { value, onChange } }) => (
          <div className="relative lg:col-start-2">
            <label
              htmlFor="repeatDate"
              className="mb-2 block text-sm font-medium text-title transition-colors duration-200">
              {t("form-repeat-date")}
            </label>
            <DatePicker
              id="repeatDate"
              autoComplete="off"
              value={value ? new Date(value) : null}
              onChange={(date: Date | null) =>
                onChange(date ? date.toISOString() : "")
              }
              placeholderText={t("form-select-date")}
              className="w-full"
            />
          </div>
        )}
      /> */}

      <Controller
        name="repeatTime"
        control={control}
        render={({ field: { value, onChange } }) => (
          <div className="relative">
            <label
              htmlFor="repeatTime"
              className="mb-2 block text-sm font-medium text-title transition-colors duration-200">
              {t("form-repeat-time")}
            </label>
            <DatePicker
              id="repeatTime"
              autoComplete="off"
              value={value ? new Date(value) : null}
              onChange={(date: any) => onChange(date ? date.toISOString() : "")}
              showTimeSelect
              showTimePicker={true}
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="h:mm aa"
              placeholderText={t("form-select-time")}
              className="crm-time w-full"
              customInput={
                <Input
                  labelClassName="mb-0"
                  className="w-full rounded-lg border-gray-500/20 text-title shadow-none ring-0"
                  placeholder={t("form-select-time")}
                  suffix={<PiClock className="h-5 w-5 text-gray-500" />}
                  value={value}
                  readOnly
                />
              }
            />
          </div>
        )}
      />

      <Input
        type="text"
        label={t("form-locations")}
        placeholder={t("form-enter-location")}
        {...register("location", { required: true })}
        error={
          errors?.location?.message
            ? String(errors.location.message)
            : undefined
        }
      />

      <Controller
        name="reminder"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Checkbox
            label={t("form-reminder")}
            checked={value}
            onChange={onChange}
          />
        )}
      />
    </FormGroup>
  )
}
