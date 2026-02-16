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
import { useGlobalStoreState } from "@/modules/scm/store/global-store-state"
import { useRequisitionStore } from "@/modules/scm/store/requisition-store"
import {
  InvoiceInput,
  InvoiceUpdate,
} from "@/modules/scm/types/procurement/invoice/invoice-types"
import {
  FindSelectOption,
  GetMenuListStyles,
} from "@/modules/scm/utils/select-options"

interface PurchaseInvoiceInformationFormProps {
  isFieldDisabled?: boolean
  formMethods: {
    register?: UseFormRegister<InvoiceInput | InvoiceUpdate>
    control?: Control<InvoiceInput | InvoiceUpdate>
    formState: FormState<InvoiceInput>
    watch?: UseFormWatch<InvoiceInput | InvoiceUpdate>
    setValue?: UseFormSetValue<InvoiceInput | InvoiceUpdate>
  }
}

export default function PurchaseOrderInformationForm({
  isFieldDisabled,
  formMethods,
}: PurchaseInvoiceInformationFormProps) {
  const t = useTranslations("form")

  const { setSelectedRequisitionTemplate } = useRequisitionStore()

  const { setSelectedPurchaseOrderTemplate } = useGlobalStoreState()

  const { company, supplier, requisition, purchaseOrder } =
    useSCMSharedDataHook([
      "company",
      "supplier",
      "requisition",
      "purchaseOrder",
    ])

  const { companyOptions, isCompanyLoading } = company
  const { supplierOptions, isSupplierLoading } = supplier
  const { purchaseOrderOptions, isPurchaseOrderLoading } = purchaseOrder
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
        name="purchaseOrderId"
        render={({ field: { value, onChange } }) => (
          <Select
            placeholder={t("form-purchase-order")}
            options={purchaseOrderOptions}
            label={t("form-purchase-order")}
            error={
              errors.purchaseOrderId?.message
                ? t(errors.purchaseOrderId?.message)
                : ""
            }
            onChange={(option: any) => {
              setSelectedPurchaseOrderTemplate(option?.value)
              onChange(option?.value)
            }}
            value={FindSelectOption(purchaseOrderOptions, value)}
            menuPortalTarget={document.body}
            styles={GetMenuListStyles(purchaseOrderOptions.length)}
            isLoading={isPurchaseOrderLoading}
            isDisabled={isFieldDisabled}
            isRequired
          />
        )}
      />
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
            value={FindSelectOption(requisitionOptions, value)}
            menuPortalTarget={document.body}
            styles={GetMenuListStyles(requisitionOptions.length)}
            isLoading={isRequisitionLoading}
            isDisabled={isFieldDisabled || true}
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
        disabled={isFieldDisabled || true}
        isRequired
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
            isDisabled={isFieldDisabled || true}
            isRequired
          />
        )}
      />
      <div>
        <Controller
          control={control}
          name="invoiceDate"
          render={({ field: { value, onChange } }) => (
            <div className="relative">
              <label
                htmlFor="invoiceDate"
                className="mb-2 block text-sm text-title transition-colors duration-200">
                {t("form-invoice-date")}{" "}
                <span className="text-orange-500">*</span>
              </label>
              <DatePicker
                id="invoiceDate"
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
        {errors.invoiceDate && (
          <p className="text-sm text-red-500">
            error=
            {errors.invoiceDate?.message ? t(errors.invoiceDate?.message) : ""}
          </p>
        )}
      </div>
      <div>
        <Controller
          control={control}
          name="dueDate"
          render={({ field: { value, onChange } }) => (
            <div className="relative">
              <label
                htmlFor="dueDate"
                className="mb-2 block text-sm text-title transition-colors duration-200">
                {t("form-due-date")} <span className="text-orange-500">*</span>
              </label>
              <DatePicker
                id="dueDate"
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
        {errors.dueDate && (
          <p className="text-sm text-red-500">
            {errors.dueDate?.message ? t(errors.dueDate?.message) : ""}
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
                {t("form-expected-delivery-date")}{" "}
                <span className="text-orange-500">*</span>
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
                disabled={isFieldDisabled}
              />
            </div>
          )}
        />
        {errors.expectedDeliveryDate && (
          <p className="text-sm text-red-500">
            {errors.expectedDeliveryDate?.message
              ? t(errors.expectedDeliveryDate?.message)
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
            onChange={(option: any) => onChange(option?.value)}
            value={FindSelectOption(companyOptions, value)}
            isLoading={isCompanyLoading}
            error={
              errors?.companyId?.message ? t(errors?.companyId?.message) : ""
            }
            menuPortalTarget={document.body}
            styles={GetMenuListStyles(companyOptions.length)}
            isDisabled={isFieldDisabled || true}
            isRequired
          />
        )}
      />
      {/* <Checkbox
        label={t("form-is-returned")}
        {...register?.("isReturned")}
        inputClassName="w-[18px] h-[18px] border-gray-600 dark:border-gray-500"
        className="items-start justify-center"
        iconClassName="w-[18px] h-[18px]"
        onChange={(e) => {
          setValue?.("isReturned", e.target.checked)
        }}
        disabled={isFieldDisabled}
      />
      {errors.isReturned && (
        <p className="text-sm text-red-500">
          {errors.isReturned?.message
            ? t(errors.isReturned?.message)
            : ""}
        </p>
      )} */}
    </>
  )
}
