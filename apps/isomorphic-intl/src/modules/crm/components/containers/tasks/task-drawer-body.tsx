import React from "react"

import { useTranslations } from "next-intl"
import { Controller } from "react-hook-form"
import SimpleBar from "simplebar-react"

import { DatePicker } from "@/components/base/date-picker"
import { Checkbox, Input, Textarea } from "@/components/ui"
import UploadZone from "@/components/ui/crm/upload-minimal"
import { priorityOptions } from "@/data/crm/quotation"

import { useSOTemplate } from "../sales-orders/so-template"
import Select from "./select"
import { useUserList } from "@/modules/crm/hooks"

export default function TaskDrawerBody({
  register,
  control,
  errors,
  setFiles,
  files,
  getValues,
  setValue,
}: any) {
  const t = useTranslations("crm")
  const {
    quotationOptions,
    isQuotationLoading,
    ticketOptions,
    isTicketLoading,
    campaignOptions,
    isCampaignLoading,
    leadOptions,
    isLeadLoading,
    opportunityOptions,
    isOpportunityLoading,
    salesOrderOptions,
    isSalesOrderLoading,
    invoiceOptions,
    isInvoiceLoading,
  } = useSOTemplate()
  const { data: output, isLoading: isUserLoading } = useUserList({pageSize:100})
  const users = output?.data || []
  const userOptions = users
    ?.filter((user: any) => user.firstName && user.firstName.trim() !== "")
    .map((user: any) => ({
      value: user.email,
      label: `${user.firstName} ${user.lastName ?? ""}`.trim(),
    }))

  return (
    <SimpleBar className="h-full grow">
      <div className="flex flex-col gap-3 px-10 py-6">
        <Input
          type="text"
          className="mt-1"
          inputClassName="border-none font-medium text-lg pl-1 py-6"
          placeholder={`${t("form-enter-title")} *`}
          {...register("subject", { required: true })}
          error={errors.subject?.message && t("form-subject-is-required")}
        />

        <Controller
          name="ticketId"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              label={t("form-ticket")}
              className="mt-3 grid grid-cols-[1.5fr_5.5fr] items-center gap-3 border-none pl-1 text-xs font-medium"
              labelClassName="text-xs mt-2 text-[#637381] dark:text-gray-500"
              isSearchable
              options={ticketOptions}
              isLoading={isTicketLoading}
              isDisabled={isTicketLoading}
              onChange={(selectedOption: any) =>
                onChange(selectedOption?.value)
              }
              value={
                ticketOptions?.find((option: any) => option.value === value) ||
                null
              }
              error={errors?.ticketId?.message}
            />
          )}
        />

        <Controller
          name="assignedTo"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              label={t("form-assigned-to")}
              className="mt-3 grid grid-cols-[1.5fr_5.5fr] items-center gap-3 border-none pl-1 text-xs font-medium"
              labelClassName="text-xs mt-2 text-[#637381] dark:text-gray-500"
              isSearchable
              options={userOptions}
              isLoading={isUserLoading}
              isDisabled={isUserLoading}
              onChange={(selectedOption: any) =>
                onChange(selectedOption?.value)
              }
              value={
                userOptions?.find((option: any) => option.value === value) ||
                null
              }
              error={errors?.assignedTo?.message}
            />
          )}
        />

        <Controller
          name="startDate"
          control={control}
          render={({ field: { value, onChange } }) => (
            <div className="mt-2 grid grid-cols-[1.5fr_5.5fr] items-center gap-3 border-none pl-1">
              <label
                htmlFor="startDate"
                className="mt-1 block text-xs font-medium text-[#637381] transition-colors duration-200 dark:text-gray-500">
                {t("form-start-date")}
              </label>
              <DatePicker
                id="startDate"
                autoComplete="off"
                value={value ? new Date(value) : null}
                onChange={(date: any) =>
                  onChange(date ? date.toISOString() : "")
                }
                placeholderText={t("form-select-date")}
                className="w-full"
              />
            </div>
          )}
        />

        <Controller
          name="dueDate"
          control={control}
          render={({ field: { value, onChange } }) => (
            <div className="mt-2 grid grid-cols-[1.5fr_5.5fr] items-center gap-3 border-none pl-1">
              <label
                htmlFor="dueDate"
                className="mt-1 block text-xs font-medium text-[#637381] transition-colors duration-200 dark:text-gray-500">
                {t("form-end-date")}
              </label>
              <DatePicker
                id="endDate"
                autoComplete="off"
                value={value ? new Date(value) : null}
                onChange={(date: any) =>
                  onChange(date ? date.toISOString() : "")
                }
                placeholderText={t("form-select-date")}
                className="w-full"
              />
            </div>
          )}
        />

        <Controller
          name="priority"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              label={t("form-priority")}
              className="mt-3 grid grid-cols-[1.5fr_5.5fr] gap-3 border-none pl-1 text-xs font-medium items-center"
              labelClassName="text-xs mt-2 text-[#637381] dark:text-gray-500"
              isSearchable
              options={priorityOptions}
              onChange={(selectedOption: any) =>
                onChange(selectedOption?.value)
              }
              value={
                priorityOptions?.find(
                  (option: any) => option.value === value
                ) || null
              }
              error={errors?.priority?.message}
            />
          )}
        />

        <Controller
          name="repeatDate"
          control={control}
          render={({ field: { value, onChange } }) => (
            <div className="mt-2 grid grid-cols-[1.5fr_5.5fr] items-center gap-3 border-none pl-1">
              <label
                htmlFor="repeatDate"
                className="mt-1 block text-xs font-medium text-[#637381] transition-colors duration-200 dark:text-gray-500">
                {t("form-repeat-date")}
              </label>
              <DatePicker
                id="repeatDate"
                autoComplete="off"
                value={value ? new Date(value) : null}
                onChange={(date: any) =>
                  onChange(date ? date.toISOString() : "")
                }
                placeholderText={t("form-select-date")}
                className="w-full"
              />
            </div>
          )}
        />

        <Controller
          name="campaignId"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              label={t("form-campaign")}
              className="mt-3 grid grid-cols-[1.5fr_5.5fr] items-center gap-3 border-none pl-1 text-xs font-medium"
              labelClassName="text-xs mt-2 text-[#637381] dark:text-gray-500"
              isSearchable
              options={campaignOptions}
              isLoading={isCampaignLoading}
              isDisabled={isCampaignLoading}
              onChange={(selectedOption: any) =>
                onChange(selectedOption?.value)
              }
              value={
                campaignOptions?.find(
                  (option: any) => option.value === value
                ) || null
              }
              error={errors?.campaignId?.message}
            />
          )}
        />

        <Controller
          name="leadId"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              label={t("form-lead")}
              className="mt-3 grid grid-cols-[1.5fr_5.5fr] items-center gap-3 border-none pl-1 text-xs font-medium"
              labelClassName="text-xs mt-2 text-[#637381] dark:text-gray-500"
              isSearchable
              options={leadOptions}
              isLoading={isLeadLoading}
              isDisabled={isLeadLoading}
              onChange={(selectedOption: any) =>
                onChange(selectedOption?.value)
              }
              value={
                leadOptions?.find((option: any) => option.value === value) ||
                null
              }
              error={errors?.leadId?.message}
            />
          )}
        />

        <Controller
          name="opportunityId"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              label={t("form-opportunity")}
              className="mt-3 grid grid-cols-[1.5fr_5.5fr] items-center gap-3 border-none pl-1 text-xs font-medium"
              labelClassName="text-xs mt-2 text-[#637381] dark:text-gray-500"
              isSearchable
              options={opportunityOptions}
              isLoading={isOpportunityLoading}
              isDisabled={isOpportunityLoading}
              onChange={(selectedOption: any) =>
                onChange(selectedOption?.value)
              }
              value={
                opportunityOptions?.find(
                  (option: any) => option.value === value
                ) || null
              }
              error={errors?.opportunityId?.message}
            />
          )}
        />

        <Controller
          name="salesOrdersId"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              label={t("form-sales-order")}
              className="mt-3 grid grid-cols-[1.5fr_5.5fr] items-center gap-3 border-none pl-1 text-xs font-medium"
              labelClassName="text-xs mt-2 text-[#637381] dark:text-gray-500"
              isSearchable
              options={salesOrderOptions}
              isLoading={isSalesOrderLoading}
              isDisabled={isSalesOrderLoading}
              onChange={(selectedOption: any) =>
                onChange(selectedOption?.value)
              }
              value={
                salesOrderOptions?.find(
                  (option: any) => option.value === value
                ) || null
              }
              error={errors?.salesOrdersId?.message}
            />
          )}
        />

        <Controller
          name="quotationId"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              label={t("form-quotation")}
              className="mt-3 grid grid-cols-[1.5fr_5.5fr] items-center gap-3 border-none pl-1 text-xs font-medium"
              labelClassName="text-xs mt-2 text-[#637381] dark:text-gray-500"
              isSearchable
              options={quotationOptions}
              isLoading={isQuotationLoading}
              isDisabled={isQuotationLoading}
              onChange={(selectedOption: any) =>
                onChange(selectedOption?.value)
              }
              value={
                quotationOptions?.find(
                  (option: any) => option.value === value
                ) || null
              }
              error={errors?.quotationId?.message}
            />
          )}
        />

        <Controller
          name="invoiceId"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              label={t("form-invoice")}
              className="mt-3 grid grid-cols-[1.5fr_5.5fr] items-center gap-3 border-none pl-1 text-xs font-medium"
              labelClassName="text-xs mt-2 text-[#637381] dark:text-gray-500"
              isSearchable
              options={invoiceOptions}
              isLoading={isInvoiceLoading}
              isDisabled={isInvoiceLoading}
              onChange={(selectedOption: any) =>
                onChange(selectedOption?.value)
              }
              value={
                invoiceOptions?.find((option: any) => option.value === value) ||
                null
              }
              error={errors?.invoiceId?.message}
            />
          )}
        />

        <div className="mt-2 grid grid-cols-[1.5fr_5.5fr] gap-3 border-none pl-1">
          <label
            htmlFor="description"
            className="mt-2 block text-xs font-medium text-[#637381] transition-colors duration-200 dark:text-gray-500">
            {t("form-description")}
          </label>
          <Textarea
            placeholder={t("form-enter-description")}
            textareaClassName="text-[#1c252e] dark:text-gray-0 border-gray-300 border-0"
            {...register("description")}
          />
        </div>

        <Controller
          name="file"
          control={control}
          render={() => (
            <div className="mt-2 grid grid-cols-[1.5fr_5.5fr] gap-3 border-none pl-1">
              <label
                htmlFor="file"
                className="mt-1 block text-xs font-medium text-[#637381] dark:text-gray-500">
                {t("form-attachment")}
              </label>
              <UploadZone
                files={files}
                setFiles={setFiles}
                name="file"
                getValues={getValues}
                setValue={setValue}
              />
            </div>
          )}
        />

        <div className="mt-2 grid grid-cols-[1.5fr_5.5fr] gap-3 border-none pl-1">
          <label
            htmlFor="reminder"
            className="mt-1 block text-xs font-medium text-[#637381] transition-colors duration-200 dark:text-gray-500">
            {t("form-reminder")}
          </label>
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
        </div>
      </div>
    </SimpleBar>
  )
}
