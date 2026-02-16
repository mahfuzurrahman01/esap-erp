import { useTranslations } from "next-intl"
import { Controller } from "react-hook-form"

import FormGroup from "@/components/base/form-group"
import { Input, Select, Textarea } from "@/components/ui"
import {
  industryOptions,
  leadStatusOptions,
  ratingOptions,
} from "@/data/crm/leads"
import { leadSourceOptions } from "@/data/crm/opportunities"

import { useSOTemplate } from "../sales-orders/so-template"

export function InformationFields({ register, control, errors }: any) {
  const t = useTranslations("form")

  const { userOptions, isUserLoading } = useSOTemplate()

  return (
    <>
      <FormGroup
        title={t("form-information")}
        className="grid-cols-12 pt-7 @2xl:pt-10 @3xl:pt-11">
        <Input
          type="text"
          label={t("form-first-name")}
          isRequired
          placeholder={t("form-first-name")}
          {...register("firstName")}
          error={errors.firstName?.message && t("form-first-name-is-required")}
        />

        <Input
          type="text"
          label={t("form-last-name")}
          placeholder={t("form-last-name")}
          {...register("lastName")}
          error={errors?.lastName?.message}
        />

        <Input
          type="email"
          label={t("form-email")}
          isRequired
          placeholder={t("form-email")}
          {...register("email", { required: true })}
          error={errors.email?.message && t("form-email-is-required")}
        />

        <Input
          type="text"
          placeholder={t("form-phone")}
          isRequired
          label={t("form-phone")}
          {...register("phone", { required: true })}
          error={errors.phone?.message && t("form-phone-no-is-required")}
        />

        <Input
          type="text"
          label={t("form-company")}
          placeholder={t("form-company")}
          {...register("company")}
        />

        <Controller
          name="owner"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              isSearchable={true}
              label={t("form-lead-owner")}
              options={userOptions}
              isLoading={isUserLoading}
              isDisabled={isUserLoading}
              onChange={(selectedOption: any) =>
                onChange(selectedOption?.value)
              }
              value={
                userOptions.find((option: any) => option.value === value) ||
                null
              }
              error={errors?.owner?.message}
            />
          )}
        />

        <Controller
          name="industry"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              isSearchable={true}
              isRequired
              label={t("form-industry")}
              options={industryOptions}
              onChange={(selectedOption: any) =>
                onChange(selectedOption?.value)
              }
              value={
                industryOptions.find((option: any) => option.value === value) ||
                null
              }
              error={errors.industry?.message && t("form-industry-is-required")}
            />
          )}
        />

        <Controller
          name="rating"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              isSearchable={true}
              label={t("form-rating")}
              options={ratingOptions}
              onChange={(selectedOption: any) =>
                onChange(selectedOption?.value)
              }
              value={
                ratingOptions.find((option: any) => option.value == value) ||
                null
              }
              error={errors.rating?.message && t("form-rating-is-required")}
            />
          )}
        />

        <Input
          type="text"
          label={t("form-title")}
          isRequired
          placeholder={t("form-title")}
          {...register("title")}
          error={errors.title?.message && t("form-title-is-required")}
        />

        <Input
          type="number"
          label={t("form-cost")}
          isRequired
          placeholder={t("form-cost")}
          {...register("cost", { valueAsNumber: true })}
          error={errors.cost?.message && t("form-cost-is-required")}
        />

        <Input
          type="text"
          label={t("form-fax")}
          placeholder={t("form-fax")}
          {...register("fax")}
          error={errors.fax?.message && t("form-fax-is-required")}
        />

        <Input
          type="number"
          label={t("form-no-of-employees")}
          placeholder={t("form-no-of-employees")}
          {...register("noOfEmployees", { valueAsNumber: true })}
          error={
            errors.noOfEmployees?.message &&
            t("form-no-of-employees-is-required")
          }
        />

        <Input
          type="number"
          label={t("form-annual-revenue")}
          placeholder={t("form-annual-revenue")}
          {...register("annualRevenue", { valueAsNumber: true })}
          error={
            errors.annualRevenue?.message &&
            t("form-annual-revenue-is-required")
          }
        />

        <Input
          type="text"
          label={t("form-website")}
          placeholder={t("form-website")}
          {...register("website")}
          error={errors.website?.message && t("form-website-is-required")}
        />

        <Input
          type="text"
          label={t("form-skypeId")}
          placeholder={t("form-skypeId")}
          {...register("skypeId")}
          error={errors.skypeId?.message && t("form-skype-id-is-required")}
        />

        <Input
          type="text"
          label={t("form-secondary-email")}
          placeholder={t("form-secondary-email")}
          {...register("secondaryEmail")}
          error={
            errors.secondaryEmail?.message &&
            t("form-secondary-email-is-required")
          }
        />

        <Input
          type="text"
          label={t("form-twitter")}
          placeholder={t("form-twitter")}
          {...register("twitter")}
          error={errors.twitter?.message && t("form-twitter-is-required")}
        />

        <Controller
          name="leadSource"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              label={t("form-lead-source")}
              isSearchable={true}
              options={leadSourceOptions}
              onChange={(selectedOption: any) =>
                onChange(selectedOption?.value)
              }
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
          name="status"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              isSearchable={true}
              label={t("form-status")}
              isRequired
              options={leadStatusOptions}
              onChange={(selectedOption: any) =>
                onChange(selectedOption?.value)
              }
              value={
                leadStatusOptions.find(
                  (option: any) => option.value === value
                ) || null
              }
              error={errors.status?.message && t("form-status-is-required")}
            />
          )}
        />

        <Textarea
          label={t("form-description")}
          labelClassName="text-title"
          placeholder={t("form-enter-description")}
          {...register("description")}
        />
      </FormGroup>
    </>
  )
}
