import React from "react"

import { useTranslations } from "next-intl"
import { Controller } from "react-hook-form"

import { DatePicker } from "@/components/base/date-picker"
import { Input, Select, Textarea } from "@/components/ui"
import UploadZone from "@/components/ui/crm/upload-zone"
import { billCategoryOptions, billTypeOption } from "@/data/crm/campaign"
import { paymentMethods } from "@/data/crm/quotation"
import FormGroup from "@/modules/crm/components/base/form-group"

import { useSOTemplate } from "../sales-orders/so-template"

export default function InformationFields({
  register,
  control,
  errors,
  file,
  setFile,
}: any) {
  const t = useTranslations("form")
  const {
    customerOptions,
    isCustomerLoading,
    chartOfAccountOptions,
    isCOALoading,
  } = useSOTemplate()
  return (
    <FormGroup title={t("form-information")}>
      <Controller
        name="incomeCategory"
        control={control}
        render={({ field: { value, onChange } }) => (
          <div className="w-full">
            <Select
              label={t("form-category")}
              placeholder={t("form-select")}
              labelClassName="text-title"
              options={billCategoryOptions}
              value={
                billCategoryOptions.find(
                  (option: any) => option.value === value
                ) || null
              }
              onChange={(selectedOption: any) => onChange(selectedOption.value)}
            />
          </div>
        )}
      />

      <Controller
        name="type"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            label={t("form-type")}
            options={billTypeOption}
            onChange={(billTypeOption: any) => onChange(billTypeOption?.value)}
            value={
              billTypeOption.find((option: any) => option.value === value) ||
              null
            }
          />
        )}
      />

      <Input
        type="number"
        label={t("form-amount")}
        isRequired
        placeholder={t("form-amount")}
        {...register("amount", { valueAsNumber: true })}
        error={errors.amount?.message && t("form-amount-is-required")}
      />

      <Controller
        name="issueDate"
        control={control}
        render={({ field: { value, onChange } }) => (
          <div className="relative lg:col-start-2">
            <label
              htmlFor="issue_date"
              className="mb-2 block text-sm font-medium text-title transition-colors duration-200">
              {t("form-issue-date")}
            </label>
            <DatePicker
              id="issue_date"
              autoComplete="off"
              value={value ? new Date(value) : null}
              onChange={(date: any) => onChange(date ? date.toISOString() : "")}
              placeholderText={t("form-select-date")}
              className="w-full"
            />
          </div>
        )}
      />

      <Controller
        name="customerId"
        control={control}
        render={({ field: { value, onChange } }) => (
          <div className="w-full">
            <Select
              label={t("form-customer")}
              placeholder={t("form-select")}
              labelClassName="text-title"
              options={customerOptions}
              isLoading={isCustomerLoading}
              isDisabled={isCustomerLoading}
              value={
                customerOptions.find((option: any) => option.value === value) ||
                null
              }
              onChange={(selectedOption: any) => onChange(selectedOption.value)}
              error={
                errors.customerId?.message && t("form-customer-is-required")
              }
            />
          </div>
        )}
      />

      <Controller
        name="paymentMethod"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            label={t("form-payment-method")}
            className="lg:col-start-2"
            options={paymentMethods}
            onChange={(selectedOption: any) => onChange(selectedOption?.value)}
            value={
              paymentMethods.find((option: any) => option.value === value) ||
              null
            }
          />
        )}
      />

      <Controller
        name="chartOfAccountId"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            label={t("form-account-head")}
            options={chartOfAccountOptions}
            isLoading={isCOALoading}
            isDisabled={isCOALoading}
            onChange={(selectedOption: any) => onChange(selectedOption?.value)}
            value={
              chartOfAccountOptions.find(
                (option: any) => option.value == value
              ) || null
            }
          />
        )}
      />

      <Textarea
        label={t("form-note")}
        placeholder={t("form-enter-note")}
        {...register("note")}
      />

      <Controller
        name="file"
        control={control}
        render={() => (
          <div className="grid gap-5 @3xl:grid-cols-1 lg:col-span-2">
            <label
              htmlFor="file"
              className="block text-sm font-medium text-gray-700 dark:text-white">
              {t("form-attachment")}
            </label>
            <UploadZone
              multiple={false}
              btnLabel="upload"
              className="col-span-full w-full @2xl:p-0"
              file={file}
              setFile={setFile}
            />
          </div>
        )}
      />
    </FormGroup>
  )
}
