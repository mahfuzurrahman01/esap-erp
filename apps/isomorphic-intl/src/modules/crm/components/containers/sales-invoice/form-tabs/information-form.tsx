"use client"

import { useEffect } from "react"

import { useTranslations } from "next-intl"
import { Controller } from "react-hook-form"

import { DatePicker } from "@/components/base/date-picker"
import { Checkbox, Input, Select } from "@/components/ui"
import { statusOptions } from "@/data/crm/quotation"
import { useSCMSharedDataHook } from "@/modules/scm/constants/shared-data-hooks"
import {
  FindSelectOption,
  GetMenuListStyles,
} from "@/modules/scm/utils/select-options"

import { useSOTemplate } from "../so-template"

export default function InformationForm({
  isFieldDisabled,
  isDisabled,
  formMethods,
  handleOrderChange,
  handleCustomerChange,
  handleCompanyChange,
  info,
  setInfo
}: any) {
  const t = useTranslations("form")

  const { company } = useSCMSharedDataHook(["company", "purchaseOrder"])

  const { companyOptions, isCompanyLoading } = company

  const {
    salesOrderOptions,
    isSalesOrderLoading,
    customerOptions,
    isCustomerLoading,
  } = useSOTemplate()

  const {
    control,
    register,
    formState: { errors },
    setValue,
    watch,
  } = formMethods

  const invoiceDate = watch("invoiceDate")
  const dueDate = watch("dueDate")

  useEffect(() => {
    if (invoiceDate && dueDate && new Date(invoiceDate) > new Date(dueDate)) {
      setValue("dueDate", "")
    }
  }, [invoiceDate, dueDate, setValue])

  return (
    <>
      <Controller
        control={control}
        name="salesOrderId"
        render={({ field: { value, onChange } }) => (
          <Select
            placeholder={t("form-sales-order")}
            options={salesOrderOptions}
            label={t("form-sales-order")}
            error={
              errors.salesOrderId?.message
                ? t(errors.salesOrderId?.message)
                : ""
            }
            onChange={(selectedOption: any) => {
              onChange(selectedOption.value)
              handleOrderChange(selectedOption.value)
            }}
            value={
              salesOrderOptions?.find((option: any) => option.value == value) ||
              null
            }
            menuPortalTarget={document.body}
            styles={GetMenuListStyles(salesOrderOptions.length)}
            isLoading={isSalesOrderLoading}
            isDisabled={isFieldDisabled || isSalesOrderLoading}
          />
        )}
      />
      <Controller
        name="customerId"
        control={control}
        render={({ field: { value, onChange } }) => (
          <div className="w-full">
            <Select
              label={t("form-customer")}
              placeholder={t("form-select-customer")}
              labelClassName="text-title"
              options={customerOptions}
              isLoading={isCustomerLoading}
              isDisabled={isDisabled || isCustomerLoading}
              value={
                customerOptions?.find((option: any) => option.value == value) ||
                null
              }
              onChange={(selectedOption: any) => {
                onChange(selectedOption.value)
                handleCustomerChange(selectedOption.value)
              }}
              error={
                errors.customerId?.message && t("form-customer-is-required")
              }
            />
          </div>
        )}
      />
      <Controller
        name="companyId"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            label={t("form-company")}
            isSearchable
            placeholder={
              isCompanyLoading ? t("form-loading") : t("form-select")
            }
            options={companyOptions}
            isLoading={isCompanyLoading}
            isDisabled={isDisabled || isCompanyLoading}
            onChange={(selectedOption: any) => {
              onChange(selectedOption.value)
              handleCompanyChange(selectedOption.value)
            }}
            value={
              companyOptions?.find((option: any) => option.value == value) ||
              null
            }
          />
        )}
      />
      <Input
        {...register("invoiceNo")}
        type="text"
        disabled
        label={t("form-invoice-no")}
        placeholder={t("form-salesInvoice-no")}
        inputClassName="border-gray-500/20 ring-0"
        autoComplete="off"
      />
      <Controller
        control={control}
        name="invoiceDate"
        render={({ field: { value, onChange } }) => (
          <div className="relative">
            <label
              htmlFor="invoiceDate"
              className="mb-2 block text-sm text-title transition-colors duration-200">
              {t("form-invoice-date")}
            </label>
            <DatePicker
              id="invoiceDate"
              value={value ? new Date(value) : null}
              onChange={(date: any) => {
                const formattedDate = date ? date.toISOString() : ""
                onChange(date);
                setInfo((prevInfo: any) => ({
                  ...prevInfo,
                  invoiceDate: formattedDate,
                }));
              }}
              minDate={new Date()}
              placeholderText={t("form-select-date")}
              className="w-full"
              disabled={isFieldDisabled}
              autoComplete="off"
            />
          </div>
        )}
      />
      <Controller
        control={control}
        name="dueDate"
        render={({ field: { value, onChange } }) => (
          <div className="relative">
            <label
              htmlFor="dueDate"
              className="mb-2 block text-sm text-title transition-colors duration-200">
              {t("form-due-date")}
            </label>
            <DatePicker
              id="dueDate"
              value={value ? new Date(value) : null}
              onChange={(date: any) => {
                const formattedDate = date ? date.toISOString() : ""
                onChange(date);
                setInfo((prevInfo: any) => ({
                  ...prevInfo,
                  dueDate: formattedDate,
                }));
              }}
              autoComplete="off"
              minDate={new Date()}
              placeholderText={t("form-select-date")}
              className="w-full"
              disabled={isFieldDisabled}
            />
          </div>
        )}
      />
      <Controller
        name="status"
        control={control}
        render={({ field: { value, onChange } }) => (
          <div className="w-full">
            <Select
              label={t("form-status")}
              placeholder={t("form-select")}
              labelClassName="text-title"
              options={statusOptions}
              value={
                statusOptions?.find((option: any) => option.value === value) ||
                null
              }
              onChange={(selectedOption: any) => onChange(selectedOption.value)}
            />
          </div>
        )}
      />
      <Controller
        name="isReturn"
        control={control}
        render={({ field: { value } }) => (
          <Checkbox
            label={t("form-is-return")}
            checked={value}
            onChange={(event:any) => {
              setInfo((prevInfo: any) => ({
                ...prevInfo,
                isReturn: event.target.checked,
              }));
            }}
          />
        )}
      />
      <Controller
        name="isRateAdjustmentEntry"
        control={control}
        render={({ field: { value } }) => (
          <Checkbox
          label={t("form-is-rate-adjustment-entry")}
            checked={value}
            onChange={(event:any) => {
              setInfo((prevInfo: any) => ({
                ...prevInfo,
                isRateAdjustmentEntry: event.target.checked,
              }));
            }}
          />
        )}
      />
    </>
  )
}
