"use client"

import { useEffect, useState } from "react"

import { useTranslations } from "next-intl"
import {
  Control,
  Controller,
  FormState,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form"

import { DatePicker } from "@/components/base/date-picker"
import { Input, Select } from "@/components/ui"
import { useSCMSharedDataHook } from "@/modules/scm/constants/shared-data-hooks"
import {
  billingStatus,
  fiscalPosition,
  priority,
} from "@/modules/scm/constants/shared-status-field-option"
import {
  RequisitionInput,
  RequisitionUpdate,
} from "@/modules/scm/types/procurement/requisition/requisition-types"
import {
  FindSelectOption,
  GetMenuListStyles,
} from "@/modules/scm/utils/select-options"

interface RequisitionInformationFormProps {
  isFieldDisabled?: boolean
  formMethods: {
    register?: UseFormRegister<RequisitionInput | RequisitionUpdate>
    control?: Control<RequisitionInput | RequisitionUpdate>
    formState: FormState<RequisitionInput | RequisitionUpdate>
    watch?: UseFormWatch<RequisitionInput | RequisitionUpdate>
    setValue?: UseFormSetValue<RequisitionInput | RequisitionUpdate>
  }
}

export default function RequisitionInformationForm({
  isFieldDisabled,
  formMethods,
}: RequisitionInformationFormProps) {
  const t = useTranslations("form")
  const [companyName, setCompanyName] = useState<string>("")

  const {
    control,
    register,
    formState: { errors },
    setValue,
    watch,
  } = formMethods

  const { company, supplier, paymentTerms } = useSCMSharedDataHook([
    "company",
    "supplier",
    "paymentTerms",
    "currency",
  ])

  const { companyOptions, isCompanyLoading } = company
  const { supplierOptions, isSupplierLoading } = supplier
  const { paymentTermsOptions, isPaymentTermsLoading } = paymentTerms

  useEffect(() => {
    if (setValue) {
      setValue("companyName", companyName)
    }
  }, [companyName])

  return (
    <>
      <Controller
        control={control}
        name="supplierId"
        render={({ field: { value, onChange } }) => (
          <Select
            placeholder={t("form-supplier")}
            options={supplierOptions}
            label={t("form-supplier")}
            error={
              errors.supplierId?.message ? t(errors.supplierId?.message) : ""
            }
            onChange={(option: any) => onChange(option?.value)}
            value={FindSelectOption(supplierOptions, value)}
            menuPortalTarget={document.body}
            styles={GetMenuListStyles(supplierOptions.length)}
            isLoading={isSupplierLoading}
            isDisabled={isFieldDisabled}
            isRequired
          />
        )}
      />
      <Input
        placeholder={t("form-requested-by")}
        label={t("form-requested-by")}
        labelClassName="text-title"
        {...(register && register("requestedBy"))}
        error={
          errors.requestedBy?.message ? t(errors.requestedBy?.message) : ""
        }
        isRequired
        disabled={isFieldDisabled}
      />
      <Input
        placeholder={t("form-project-name")}
        label={t("form-project-name")}
        labelClassName="text-title"
        {...(register && register("projectName"))}
        error={
          errors.projectName?.message ? t(errors.projectName?.message) : ""
        }
        disabled={isFieldDisabled}
        isRequired
      />

      <Controller
        control={control}
        name="priority"
        render={({ field: { onChange, value } }) => (
          <Select
            label={t("form-priority")}
            labelClassName="text-title"
            placeholder={t("form-select-priority")}
            options={priority}
            onChange={(option: any) => onChange(option?.value)}
            value={FindSelectOption(priority, value)}
            menuPortalTarget={document.body}
            styles={GetMenuListStyles(priority.length)}
            error={errors.priority?.message ? t(errors.priority?.message) : ""}
            isDisabled={isFieldDisabled}
            isRequired
          />
        )}
      />
      <div>
        <Controller
          control={control}
          name="requestedDate"
          render={({ field: { value, onChange } }) => (
            <div className="relative">
              <label
                htmlFor="requestedDate"
                className="mb-2 block text-sm font-medium text-title transition-colors duration-200">
                {t("form-posting-date")}{" "}
                <span className="text-orange-500">*</span>
              </label>
              <DatePicker
                id="requestedDate"
                value={value ? new Date(value) : null}
                onChange={(date: any) =>
                  onChange(date ? date.toISOString() : "")
                }
                minDate={new Date()}
                placeholderText={t("form-select-date")}
                className="w-full"
                disabled={isFieldDisabled}
                required
              />
            </div>
          )}
        />
        {errors.requestedDate && (
          <p className="text-sm text-red-500">
            {errors.requestedDate.message
              ? t(errors.requestedDate.message)
              : ""}
          </p>
        )}
      </div>
      <div>
        <Controller
          control={control}
          name="expectedDeliveryDate"
          render={({ field: { value, onChange } }) => (
            <div className="relative">
              <label
                htmlFor="expectedDeliveryDate"
                className="mb-2 block text-sm font-medium text-title transition-colors duration-200">
                {t("form-expected-delivery-date")}{" "}
                <span className="text-orange-500">*</span>
              </label>
              <DatePicker
                id="expectedDeliveryDate"
                value={value ? new Date(value) : null}
                onChange={(date: any) =>
                  onChange(date ? date.toISOString() : "")
                }
                minDate={
                  watch?.("requestedDate")
                    ? new Date(watch("requestedDate") as string)
                    : new Date()
                }
                placeholderText={t("form-select-date")}
                className="w-full"
                disabled={isFieldDisabled}
                required
              />
            </div>
          )}
        />
        {errors.expectedDeliveryDate && (
          <p className="text-sm text-red-500">
            {errors.expectedDeliveryDate.message
              ? t(errors.expectedDeliveryDate.message)
              : ""}
          </p>
        )}
      </div>
      <Controller
        control={control}
        name="companyId"
        render={({ field: { onChange, value } }) => (
          <Select
            label={t("form-company")}
            placeholder={t("form-company")}
            labelClassName="text-title"
            showAddNewOption={true}
            options={companyOptions}
            onChange={(option: any) => {
              onChange(option?.value)
              setCompanyName(option?.label)
            }}
            value={FindSelectOption(companyOptions, value)}
            isLoading={isCompanyLoading}
            error={
              errors.companyId?.message ? t(errors.companyId?.message) : ""
            }
            menuPortalTarget={document.body}
            styles={GetMenuListStyles(companyOptions.length)}
            isDisabled={isFieldDisabled}
            isRequired
          />
        )}
      />
      <Controller
        control={control}
        name="fiscalPosition"
        render={({ field: { onChange, value } }) => (
          <Select
            label={t("form-fiscal-position")}
            labelClassName="text-title"
            placeholder={t("form-select-fiscal-position")}
            options={fiscalPosition}
            onChange={(option: any) => onChange(option?.value)}
            value={FindSelectOption(fiscalPosition, value)}
            error={
              errors.fiscalPosition?.message
                ? t(errors.fiscalPosition?.message)
                : ""
            }
            menuPortalTarget={document.body}
            styles={GetMenuListStyles(fiscalPosition.length)}
            isDisabled={isFieldDisabled}
            isRequired
          />
        )}
      />
      <Controller
        control={control}
        name="paymentTermsId"
        render={({ field: { value, onChange } }) => (
          <Select
            placeholder={t("form-payment-terms")}
            options={paymentTermsOptions}
            label={t("form-payment-terms")}
            error={
              errors.paymentTermsId?.message
                ? t(errors.paymentTermsId?.message)
                : ""
            }
            onChange={(option: any) => onChange(option?.value)}
            value={FindSelectOption(paymentTermsOptions, value)}
            menuPortalTarget={document.body}
            styles={GetMenuListStyles(paymentTermsOptions.length)}
            isLoading={isPaymentTermsLoading}
            isDisabled={isFieldDisabled}
            isRequired
          />
        )}
      />
      <Controller
        control={control}
        name="billingStatus"
        render={({ field: { onChange, value } }) => (
          <Select
            label={t("form-status")}
            labelClassName="text-title"
            placeholder={t("form-select-status")}
            options={billingStatus}
            onChange={(option: any) => onChange(option?.value)}
            value={FindSelectOption(billingStatus, value)}
            error={
              errors.billingStatus?.message
                ? t(errors.billingStatus?.message)
                : ""
            }
            // menuPortalTarget={document.body}
            styles={GetMenuListStyles(billingStatus.length)}
            isDisabled={isFieldDisabled}
            isRequired
          />
        )}
      />
    </>
  )
}
