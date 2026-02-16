import { useTranslations } from "next-intl"
import { Controller } from "react-hook-form"

import { DatePicker } from "@/components/base/date-picker"
import FormGroup from "@/components/base/form-group"
import { Input, Select } from "@/components/ui"
import {
  courierOptions,
  paymentTermOptions,
  quotationTypes,
} from "@/data/crm/quotation"

import { useSOTemplate } from "../sales-orders/so-template"

export function InformationFields({
  register,
  control,
  errors,
  setQuotationType,
  setEntries,
}: any) {
  const t = useTranslations("form")
  const { customerOptions, isCustomerLoading } = useSOTemplate()

  return (
    <>
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
          name="type"
          control={control}
          render={({ field: { value, onChange } }) => (
            <div className="w-full">
              <Select
                label={t("form-quotation-type")}
                placeholder={t("form-select")}
                labelClassName="text-title"
                options={quotationTypes}
                value={
                  quotationTypes.find(
                    (option: any) => option.value === value
                  ) || null
                }
                onChange={(selected: any) => {
                  onChange(selected.value)
                  setQuotationType(selected.value)
                  setEntries([
                    {
                      id: 1,
                      productId: "",
                      quantity: 0,
                      unit: "",
                      unitPrice: 0,
                      vat: 0,
                      tax: 0,
                      discount: 0,
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
                isRequired
                isLoading={isCustomerLoading}
                isDisabled={isCustomerLoading}
                value={
                  customerOptions.find(
                    (option: any) => option.value === value
                  ) || null
                }
                onChange={(selectedOption: any) =>
                  onChange(selectedOption.value)
                }
                error={
                  errors.customerId?.message && t("form-customer-is-required")
                }
              />
            </div>
          )}
        />
        <Input
          {...register("quotationNo")}
          type="text"
          label={t("form-quotation-no")}
          placeholder={t("form-quotation-no")}
          inputClassName="border-gray-500/20 ring-0"
          disabled
          error={errors.quotationNo?.message && t("form-quotation-is-required")}
        />
        <Controller
          name="expiryDate"
          control={control}
          render={({ field: { value, onChange } }) => (
            <div className="relative">
              <label
                htmlFor="expiryDate"
                className="mb-2 block text-sm font-medium text-title transition-colors duration-200">
                {t("form-expiry-date")}
              </label>
              <DatePicker
                id="expiryDate"
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
                onChange={(selectedOption: any) =>
                  onChange(selectedOption.value)
                }
              />
            </div>
          )}
        />
        <Controller
          name="courier"
          control={control}
          render={({ field: { value, onChange } }) => (
            <div className="w-full">
              <Select
                label={t("form-courier")}
                placeholder={t("form-select")}
                labelClassName="text-title"
                options={courierOptions}
                value={
                  courierOptions.find(
                    (option: any) => option.value === value
                  ) || null
                }
                onChange={(selectedOption: any) =>
                  onChange(selectedOption.value)
                }
              />
            </div>
          )}
        />
      </FormGroup>
    </>
  )
}
