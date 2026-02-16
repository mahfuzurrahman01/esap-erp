import { useTranslations } from "next-intl"
import { Controller } from "react-hook-form"

import { DatePicker } from "@/components/base/date-picker"
import FormGroup from "@/components/base/form-group"
import { Checkbox, Input, Select } from "@/components/ui"
import {
  salesOrderTypes,
  soStatusOptions,
  statusOptions,
} from "@/data/crm/quotation"
import { useSharedDataHooks } from "@/modules/fms/constants/shared-data-hook"

import { useSOTemplate } from "./so-template"

export function SalesOrderInformation({
  register,
  control,
  errors,
  setSalesOrderType,
  setEntries,
  handleQuotationChange,
  info,
  setInfo
}: any) {
  const t = useTranslations("form")

  const { company } = useSharedDataHooks(["company"])
  const { companyOptions, isCompanyLoading } = company

  const {
    quotationOptions,
    customerOptions,
    currencyOptions,
    isCurrencyLoading,
    isQuotationLoading,
    isCustomerLoading,
  } = useSOTemplate()

  return (
    <FormGroup title={t("form-information")}>
      <Input
        {...register("title")}
        type="text"
        isRequired
        label={t("form-title")}
        placeholder={t("form-title")}
        inputClassName="border-gray-500/20 ring-0"
        error={errors.title?.message && t("form-title-is-required")}
      />
      <Controller
        name="quotationId"
        control={control}
        render={({ field: { value, onChange } }) => (
          <div className="w-full">
            <Select
              label={t("form-quotation")}
              placeholder={t("form-select")}
              labelClassName="text-title"
              options={quotationOptions}
              isLoading={isQuotationLoading}
              isDisabled={isQuotationLoading}
              value={
                value
                  ? quotationOptions?.find(
                      (option: any) => option.value === value
                    )
                  : null
              }
              onChange={(selectedOption: any) => {
                onChange(selectedOption.value)
                handleQuotationChange(selectedOption.value)
              }}
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
              label={t("form-sales-order-type")}
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
                setSalesOrderType(selected.value)
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
              isRequired
              placeholder={t("form-select")}
              labelClassName="text-title"
              options={customerOptions}
              isLoading={isCustomerLoading}
              isDisabled={isCustomerLoading}
              value={
                customerOptions?.find(
                  (option: any) => option.value == value || option.value == info.customerId
                ) || null
              }
              onChange={(selectedOption: any) => {
                const selectedValue = selectedOption.value
                onChange(selectedValue);
                setInfo((prevInfo: any) => ({
                  ...prevInfo,
                  customerId: selectedValue,
                }));
              }}
              error={
                errors.customerId?.message && t("form-customer-is-required")
              }
            />
          </div>
        )}
      />
      <Input
        {...register("salesOrderNo")}
        type="text"
        disabled
        label={t("form-salesorder-no")}
        placeholder={t("form-salesorder-no")}
        inputClassName="border-gray-500/20 ring-0"
        autoComplete="off"
      />
      <Controller
        name="postingDate"
        control={control}
        render={({ field: { value, onChange } }) => (
          <div className="relative">
            <label
              htmlFor="postingDate"
              className="mb-2 block text-sm font-medium text-title transition-colors duration-200">
              {t("form-posting-date")}
            </label>
            <DatePicker
              id="postingDate"
              autoComplete="off"
              value={value ? new Date(value) : null}
              onChange={(date: any) => {
                const formattedDate = date ? date.toISOString() : ""
                onChange(date);
                setInfo((prevInfo: any) => ({
                  ...prevInfo,
                  postingDate: formattedDate,
                }));
              }}
              placeholderText={t("form-select-date")}
              className="w-full"
            />
          </div>
        )}
      />
      <Controller
        name="delivaryDate"
        control={control}
        render={({ field: { value, onChange } }) => (
          <div className="relative">
            <label
              htmlFor="delivaryDate"
              className="mb-2 block text-sm font-medium text-title transition-colors duration-200">
              {t("form-delivery-date")}
            </label>
            <DatePicker
              id="delivaryDate"
              autoComplete="off"
              value={value ? new Date(value) : null}
              onChange={(date: any) => {
                const formattedDate = date ? date.toISOString() : ""
                onChange(date);
                setInfo((prevInfo: any) => ({
                  ...prevInfo,
                  delivaryDate: formattedDate,
                }));
              }}
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
            value={
              companyOptions?.find(
                (option: any) => option.value == value || option.value == info.companyId
              ) || null
            }
            onChange={(selectedOption: any) => {
              const selectedValue = selectedOption.value
              onChange(selectedValue);
              setInfo((prevInfo: any) => ({
                ...prevInfo,
                companyId: selectedValue,
              }));
            }}
          />
        )}
      />
      <Controller
        name="currencyId"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            label={t("form-currency")}
            isRequired
            isSearchable
            placeholder={
              isCurrencyLoading ? t("form-loading") : t("form-select")
            }
            options={currencyOptions}
            isLoading={isCurrencyLoading}
            isDisabled={isCurrencyLoading}
            value={
              currencyOptions?.find(
                (option: any) => option.value == value || option.value == info.currencyId
              ) || null
            }
            onChange={(selectedOption: any) => {
              const selectedValue = selectedOption.value
              onChange(selectedValue);
              setInfo((prevInfo: any) => ({
                ...prevInfo,
                currencyId: selectedValue,
              }));
            }}
            error={errors.currencyId?.message && t("form-currency-is-required")}
          />
        )}
      />
      <Controller
        name="stages"
        control={control}
        render={({ field: { value, onChange } }) => (
          <div className="w-full">
            <Select
              label={t("form-status")}
              placeholder={t("form-select")}
              labelClassName="text-title"
              options={soStatusOptions}
              value={
                soStatusOptions?.find(
                  (option: any) => option.value === value
                ) || null
              }
              onChange={(selectedOption: any) => onChange(selectedOption.value)}
            />
          </div>
        )}
      />
      <Controller
        name="updateStock"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Checkbox
            label={t("form-update-stock")}
            checked={value}
            onChange={onChange}
          />
        )}
      />
    </FormGroup>
  )
}
