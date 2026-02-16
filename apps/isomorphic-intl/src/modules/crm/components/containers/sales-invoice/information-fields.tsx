import { useTranslations } from "next-intl"
import { Controller } from "react-hook-form"

import { DatePicker } from "@/components/base/date-picker"
import FormGroup from "@/components/base/form-group"
import { Input, Select } from "@/components/ui"
import { paymentTermOptions, salesOrderTypes } from "@/data/crm/quotation"
import { useSharedDataHooks } from "@/modules/fms/constants/shared-data-hook"

import { useSOTemplate } from "./so-template"

export function SalesInvoiceInformation({
  register,
  control,
  errors,
  setSalesInvoiceType,
  setEntries,
}: any) {
  const t = useTranslations("form")

  const { company } = useSharedDataHooks(["company"])
  const { companyOptions, isCompanyLoading } = company
  const {
    salesOrderOptions,
    customerOptions,
    currencyOptions,
    isCurrencyLoading,
    isSalesOrderLoading,
    isCustomerLoading,
  } = useSOTemplate()

  return (
    <FormGroup title={t("form-information")}>
      <Controller
        name="salesOrderId"
        control={control}
        render={({ field: { value, onChange } }) => (
          <div className="w-full">
            <Select
              label={t("form-sales-order")}
              placeholder={t("form-select")}
              labelClassName="text-title"
              options={salesOrderOptions}
              isLoading={isSalesOrderLoading}
              isDisabled={isSalesOrderLoading}
              value={
                salesOrderOptions?.find(
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
        render={({ field: { value, onChange } }) => (
          <div className="w-full">
            <Select
              label={t("form-invoice-type")}
              placeholder={t("form-select")}
              labelClassName="text-title"
              options={salesOrderTypes}
              value={
                salesOrderTypes?.find(
                  (option: any) => option.value === value
                ) || null
              }
              onChange={(selected: any) => {
                onChange(selected.value)
                setSalesInvoiceType(selected.value)
                setEntries([
                  {
                    id: "",
                    productId: "",
                    quantity: 0,
                    unitPrice: 0,
                    total: 0,
                  },
                ])
              }}
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
                customerOptions?.find((option: any) => option.value == value) ||
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
        name="invoiceDate"
        control={control}
        render={({ field: { value, onChange } }) => (
          <div className="relative">
            <label
              htmlFor="invoiceDate"
              className="mb-2 block text-sm font-medium text-title transition-colors duration-200">
              {t("form-invoice-date")}
            </label>
            <DatePicker
              id="invoiceDate"
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
        name="dueDate"
        control={control}
        render={({ field: { value, onChange } }) => (
          <div className="relative">
            <label
              htmlFor="dueDate"
              className="mb-2 block text-sm font-medium text-title transition-colors duration-200">
              {t("form-due-date")}
            </label>
            <DatePicker
              id="dueDate"
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
            isDisabled={isCompanyLoading}
            onChange={(selectedOption: any) => onChange(selectedOption?.value)}
            value={
              value
                ? companyOptions?.find((option: any) => option.value == value)
                : null
            }
          />
        )}
      />
      <Controller
        name="currencyId"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            label={t("form-currency")}
            isSearchable
            placeholder={
              isCurrencyLoading ? t("form-loading") : t("form-select")
            }
            options={currencyOptions}
            isLoading={isCurrencyLoading}
            isDisabled={isCurrencyLoading}
            onChange={(selectedOption: any) => onChange(selectedOption?.value)}
            value={
              currencyOptions?.find((option: any) => option.value == value) ||
              null
            }
          />
        )}
      />
      <Controller
        name="paymentTerms"
        control={control}
        render={({ field: { value, onChange } }) => (
          <div className="w-full">
            <Select
              label={t("form-payment-terms")}
              placeholder={t("form-select")}
              labelClassName="text-title"
              options={paymentTermOptions}
              value={
                paymentTermOptions.find(
                  (option: any) => option.value === value
                ) || null
              }
              onChange={(selectedOption: any) => onChange(selectedOption.value)}
            />
          </div>
        )}
      />
    </FormGroup>
  )
}
