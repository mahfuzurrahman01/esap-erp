import { useTranslations } from "next-intl"
import { Controller } from "react-hook-form"

import { DatePicker } from "@/components/base/date-picker"
import FormGroup from "@/components/base/form-group"
import { Input, Select, Textarea } from "@/components/ui"
import {
  leadSourceOptions,
  stageOptions,
  typeOptions,
} from "@/data/crm/opportunities"

import { useSOTemplate } from "../sales-orders/so-template"

export function InformationFields({ register, control, errors }: any) {
  const t = useTranslations("form")
  const {
    userOptions,
    isUserLoading,
    campaignOptions,
    leadOptions,
    customerOptions,
  } = useSOTemplate()

  return (
    <FormGroup
      title={t("form-information")}
      className="grid-cols-12 pt-7 @2xl:pt-10 @3xl:pt-11">
      <Controller
        name="dealOwner"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            isSearchable={true}
            label={t("form-deal-owner")}
            isRequired
            options={userOptions}
            isLoading={isUserLoading}
            isDisabled={isUserLoading}
            onChange={(selectedOption: any) => onChange(selectedOption?.value)}
            value={
              userOptions?.find((option: any) => option.value == value) || null
            }
            error={
              errors.dealOwner?.message && t("form-deal-owner-is-required")
            }
          />
        )}
      />

      <Input
        type="text"
        label={t("form-deal-name")}
        isRequired
        placeholder={t("form-deal-name")}
        autoComplete="off"
        {...register("name")}
        error={errors.name?.message && t("form-deal-name-is-required")}
      />

      <Controller
        name="leadSource"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            label={t("form-lead-source")}
            isSearchable={true}
            options={leadSourceOptions}
            onChange={(selectedOption: any) => onChange(selectedOption?.value)}
            value={
              leadSourceOptions?.find(
                (option: any) => option.value === value
              ) || null
            }
            error={errors?.leadSource?.message}
          />
        )}
      />

      <Controller
        name="leadId"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            label={t("form-leads")}
            isSearchable={true}
            options={leadOptions}
            onChange={(selectedOption: any) => onChange(selectedOption?.value)}
            value={
              leadOptions?.find((option: any) => option.value === value) || null
            }
            error={errors?.leadId?.message}
          />
        )}
      />

      <Controller
        name="campaignId"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            label={t("form-campaign")}
            isSearchable={true}
            options={campaignOptions}
            onChange={(selectedOption: any) => onChange(selectedOption?.value)}
            value={
              campaignOptions?.find((option: any) => option.value == value) ||
              null
            }
            error={errors?.campaignId?.message}
          />
        )}
      />

      <Controller
        name="customerId"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            label={t("form-customer")}
            isSearchable={true}
            options={customerOptions}
            onChange={(selectedOption: any) => onChange(selectedOption?.value)}
            value={
              customerOptions?.find((option: any) => option.value === value) ||
              null
            }
            error={errors.customerId?.message && t("form-customer-is-required")}
          />
        )}
      />

      <Controller
        name="closingDate"
        control={control}
        render={({ field: { value, onChange } }) => (
          <div className="relative">
            <label
              htmlFor="closingDate"
              className="mb-2 block text-sm font-medium text-title transition-colors duration-200">
              {t("form-closing-date")}
            </label>
            <DatePicker
              id="closingDate"
              autoComplete="off"
              value={value ? new Date(value) : null}
              onChange={(date: any) => onChange(date ? date.toISOString() : "")}
              placeholderText={t("form-select-date")}
              className="w-full"
            />
          </div>
        )}
      />

      <Input
        type="number"
        label={t("form-amount")}
        placeholder={t("form-amount")}
        inputClassName="border-gray-500/20 ring-0"
        {...register("amount", {
          required: true,
          valueAsNumber: true,
        })}
        error={errors.amount?.message && t("form-amount-is-required")}
      />

      <Input
        type="number"
        label={t("form-probability")}
        placeholder={t("form-probability")}
        {...register("probability", {
          required: true,
          valueAsNumber: true,
        })}
        error={errors.probability?.message && t("form-probability-is-required")}
      />

      <Controller
        name="type"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            label={t("form-type")}
            isRequired
            placeholder={t("form-types")}
            isSearchable={true}
            options={typeOptions}
            onChange={(selectedOption: any) => onChange(selectedOption?.value)}
            value={
              typeOptions?.find((option: any) => option.value === value) || null
            }
            error={errors.type?.message && t("form-type-is-required")}
          />
        )}
      />

      <Input
        type="text"
        label={t("form-primary-contact")}
        placeholder={t("form-primary-contact")}
        autoComplete="off"
        {...register("primaryContact")}
      />

      <Input
        type="number"
        label={t("form-expected-revenue")}
        placeholder={t("form-expected-revenue")}
        autoComplete="off"
        {...register("forecastedRevenue", { valueAsNumber: true })}
      />

      <Input
        type="text"
        label={t("form-next-step")}
        placeholder={t("form-next-step")}
        autoComplete="off"
        {...register("nextStep")}
      />

      <Controller
        name="stage"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            label={t("form-stages")}
            isSearchable={true}
            options={stageOptions}
            onChange={(selectedOption: any) => onChange(selectedOption?.value)}
            value={
              stageOptions?.find((option: any) => option.value === value) ||
              null
            }
            error={errors?.stage?.message}
          />
        )}
      />

      <Textarea
        label={t("form-description")}
        placeholder={t("form-enter-description")}
        {...register("description")}
      />
    </FormGroup>
  )
}
