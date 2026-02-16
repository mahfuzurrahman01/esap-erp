import React from "react"

import { useTranslations } from "next-intl"
import { Controller } from "react-hook-form"

import { Select, Textarea } from "@/components/ui"
import UploadZone from "@/components/ui/crm/upload-zone"
import { purposeOptions } from "@/data/crm/campaign"
import FormGroup from "@/modules/crm/components/base/form-group"

import { useSOTemplate } from "../sales-orders/so-template"

export default function OptionalFields({
  register,
  control,
  errors,
  setFile,
  file,
}: any) {
  const t = useTranslations("form")
  const {
    quotationOptions,
    isQuotationLoading,
    campaignOptions,
    isCampaignLoading,
    leadOptions,
    isLeadLoading,
    opportunityOptions,
    isOpportunityLoading,
    salesOrderOptions,
    isSalesOrderLoading,
    invoiceOptions,
    isInvoiceLoading
  } = useSOTemplate()
  return (
    <FormGroup
      title={t("form-optional-data")}
      className="grid-cols-12 pt-7 @2xl:pt-10 @3xl:pt-11">
      <Controller
        name="leadId"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            label={t("form-leads")}
            isSearchable={true}
            options={leadOptions}
            isLoading={isLeadLoading}
            isDisabled={isLeadLoading}
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
            isLoading={isCampaignLoading}
            isDisabled={isCampaignLoading}
            onChange={(selectedOption: any) => onChange(selectedOption?.value)}
            value={
              campaignOptions?.find((option: any) => option.value === value) ||
              null
            }
            error={errors?.campaignId?.message}
          />
        )}
      />

      <Controller
        name="opportunityId"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            label={t("form-opportunity")}
            isSearchable={true}
            options={opportunityOptions}
            isLoading={isOpportunityLoading}
            isDisabled={isOpportunityLoading}
            onChange={(selectedOption: any) => onChange(selectedOption?.value)}
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
            isSearchable={true}
            options={salesOrderOptions}
            isLoading={isSalesOrderLoading}
            isDisabled={isSalesOrderLoading}
            onChange={(selectedOption: any) => onChange(selectedOption?.value)}
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
            isSearchable={true}
            options={quotationOptions}
            isLoading={isQuotationLoading}
            isDisabled={isQuotationLoading}
            onChange={(selectedOption: any) => onChange(selectedOption?.value)}
            value={
              quotationOptions?.find((option: any) => option.value === value) ||
              null
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
            isSearchable={true}
            options={invoiceOptions}
            isLoading={isInvoiceLoading}
            isDisabled={isInvoiceLoading}
            onChange={(selectedOption: any) => onChange(selectedOption?.value)}
            value={
              invoiceOptions?.find((option: any) => option.value === value) ||
              null
            }
            error={errors?.invoiceId?.message}
          />
        )}
      />

      <Textarea
        label={t("form-description")}
        placeholder={t("form-enter-description")}
        {...register("description")}
      />

      <Controller
        name="status"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            isSearchable={true}
            label={t("form-purpose")}
            options={purposeOptions}
            onChange={(selectedOption: any) => onChange(selectedOption?.value)}
            value={
              purposeOptions.find((option: any) => option.value === value) ||
              null
            }
            error={errors?.status?.message}
          />
        )}
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
