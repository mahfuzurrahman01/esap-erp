import React from "react"

import { useTranslations } from "next-intl"
import { Controller } from "react-hook-form"
import { PiClock } from "react-icons/pi"

import { DatePicker } from "@/components/base/date-picker"
import { Input, Select } from "@/components/ui"
import { contactTypeOptions } from "@/data/crm/campaign"
import { quotationTypes } from "@/data/crm/quotation"
import FormGroup from "@/modules/crm/components/base/form-group"

export default function InformationFields({ register, control, errors }: any) {
  const t = useTranslations("form")
  return (
    <FormGroup
      title={t("form-information")}
      className="grid-cols-12 pt-7 @2xl:pt-10 @3xl:pt-11">
      <Controller
        name="type"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            isSearchable={true}
            label={t("form-contact-type")}
            options={contactTypeOptions}
            onChange={(selectedOption: any) => onChange(selectedOption?.value)}
            value={
              contactTypeOptions?.find(
                (option: any) => option.value === value
              ) || null
            }
            error={errors?.type?.message}
          />
        )}
      />

      <Input
        type="text"
        label={t("form-subject")}
        isRequired
        placeholder={t("form-enter-subject")}
        {...register("subject", { required: true })}
        error={errors.subject?.message && t("form-subject-is-required")}
      />

      <Input
        type="text"
        label={t("form-duration")}
        placeholder={t("form-enter-duration")}
        {...register("duration", { required: true })}
        error={
          errors?.duration?.message
            ? String(errors.duration.message)
            : undefined
        }
      />

      {/* <Controller
        name="contactDate"
        control={control}
        render={({ field: { value, onChange } }) => (
          <div className="relative">
            <label
              htmlFor="contactDate"
              className="mb-2 block text-sm font-medium text-title transition-colors duration-200">
              {t("form-contact-date")}
            </label>
            <DatePicker
              id="contactDate"
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
        name="contactTime"
        control={control}
        render={({ field: { value, onChange } }) => (
          <div className="relative">
            <label
              htmlFor="contactTime"
              className="mb-2 block text-sm font-medium text-title transition-colors duration-200">
              {t("form-contact-time")}{" "}
              <span className="text-orange-500">*</span>
            </label>
            <DatePicker
              id="contactTime"
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

      <Controller
        name="relatedTo"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            isSearchable={true}
            label={t("form-related-to")}
            options={quotationTypes}
            onChange={(selectedOption: any) => onChange(selectedOption?.value)}
            value={
              quotationTypes?.find((option: any) => option.value === value) ||
              null
            }
            error={errors?.relatedTo?.message}
          />
        )}
      />
    </FormGroup>
  )
}
