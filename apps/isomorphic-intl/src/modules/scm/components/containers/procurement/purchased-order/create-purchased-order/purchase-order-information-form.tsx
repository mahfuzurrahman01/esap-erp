"use client"

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
import { priority } from "@/modules/scm/constants/shared-status-field-option"
import { useRequisitionStore } from "@/modules/scm/store/requisition-store"
import {
  PurchasedOrderInput,
  PurchasedOrderUpdate,
} from "@/modules/scm/types/procurement/purchased-order/purchased-order-types"
import {
  FindSelectOption,
  GetMenuListStyles,
} from "@/modules/scm/utils/select-options"

interface PurchaseOrderInformationFormProps {
  isFieldDisabled?: boolean
  formMethods: {
    register?: UseFormRegister<PurchasedOrderInput | PurchasedOrderUpdate>
    control?: Control<PurchasedOrderInput | PurchasedOrderUpdate>
    formState: FormState<PurchasedOrderInput>
    watch?: UseFormWatch<PurchasedOrderInput | PurchasedOrderUpdate>
    setValue?: UseFormSetValue<PurchasedOrderInput | PurchasedOrderUpdate>
  }
}

export default function PurchaseOrderInformationForm({
  isFieldDisabled,
  formMethods,
}: PurchaseOrderInformationFormProps) {
  const t = useTranslations("form")

  const { setSelectedRequisitionTemplate } = useRequisitionStore()

  const { company, supplier, requisition } = useSCMSharedDataHook([
    "company",
    "supplier",
    "requisition",
  ])

  const { companyOptions, isCompanyLoading } = company
  const { supplierOptions, isSupplierLoading } = supplier

  const { requisitionOptions, isRequisitionLoading } = requisition

  const {
    control,
    register,
    formState: { errors },
  } = formMethods

  return (
    <>
      <Controller
        control={control}
        name="requisitionId"
        render={({ field: { value, onChange } }) => (
          <Select
            placeholder={t("form-requisition")}
            options={requisitionOptions}
            label={t("form-requisition")}
            error={
              errors.requisitionId?.message
                ? t(errors.requisitionId?.message)
                : ""
            }
            onChange={(option: any) => {
              setSelectedRequisitionTemplate(option?.value)
              onChange(option?.value)
            }}
            value={requisitionOptions}
            menuPortalTarget={document.body}
            styles={GetMenuListStyles(requisitionOptions.length)}
            isLoading={isRequisitionLoading}
            isDisabled={isFieldDisabled}
            isRequired
          />
        )}
      />
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
            isDisabled={isFieldDisabled || true}
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
        disabled={isFieldDisabled || true}
      />
      <Input
        placeholder={t("form-project-name")}
        label={t("form-project-name")}
        labelClassName="text-title"
        {...(register && register("projectName"))}
        error={
          errors.projectName?.message ? t(errors.projectName?.message) : ""
        }
        disabled={isFieldDisabled || true}
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
            isDisabled={isFieldDisabled || true}
          />
        )}
      />
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
            onChange={(option: any) => onChange(option?.value)}
            value={FindSelectOption(companyOptions, value)}
            isLoading={isCompanyLoading}
            error={
              errors.companyId?.message ? t(errors.companyId?.message) : ""
            }
            menuPortalTarget={document.body}
            styles={GetMenuListStyles(companyOptions.length)}
            isDisabled={isFieldDisabled || true}
          />
        )}
      />
      <div>
        <Controller
          control={control}
          name="poDate"
          render={({ field: { value, onChange } }) => (
            <div className="relative">
              <label
                htmlFor="poDate"
                className="mb-2 block text-sm text-title transition-colors duration-200">
                {t("form-po-date")} <span className="text-orange-500">*</span>
              </label>
              <DatePicker
                id="poDate"
                value={value ? new Date(value) : null}
                onChange={(date: any) =>
                  onChange(date ? date.toISOString() : "")
                }
                minDate={new Date()}
                placeholderText={t("form-select-date")}
                className="w-full"
                disabled={isFieldDisabled}
              />
            </div>
          )}
        />
        {errors.poDate && (
          <p className="text-sm text-red-500">
            {errors.poDate.message ? t(errors.poDate.message) : ""}
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
                className="mb-2 block text-sm text-title transition-colors duration-200">
                {t("form-expected-delivery-date")}
              </label>
              <DatePicker
                id="expectedDeliveryDate"
                value={value ? new Date(value) : null}
                onChange={(date: any) =>
                  onChange(date ? date.toISOString() : "")
                }
                minDate={new Date()}
                placeholderText={t("form-select-date")}
                className="w-full"
                disabled={isFieldDisabled || true}
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
    </>
  )
}
