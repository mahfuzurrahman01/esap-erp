"use client"

import { useTranslations } from "next-intl"
import { Controller } from "react-hook-form"

import { DatePicker } from "@/components/base/date-picker"
import FormGroup from "@/components/base/form-group"
import FormGroupContainer from "@/components/base/form-group-container"
import { Checkbox, Select } from "@/components/ui"
import { useGlobalStoreState } from "@/modules/crm/store/global-store-state"
import { useSCMSharedDataHook } from "@/modules/scm/constants/shared-data-hooks"
import { Invoice } from "@/modules/scm/types/procurement/invoice/invoice-types"
import {
  FindSelectOption,
  GetMenuListStyles,
} from "@/modules/scm/utils/select-options"

interface OthersFormProps {
  formMethods: any
  isFieldDisabled?: boolean
  initialData?: Invoice
  isEditForm?: boolean
}

export default function OthersForm({
  formMethods,
  isFieldDisabled,
}: OthersFormProps) {
  const t = useTranslations("form")

  const { setSelectedDebitToName, setSelectedDebitToId } = useGlobalStoreState()

  const { accountingTypes } = useSCMSharedDataHook(["accountingTypes"])

  const { accountingTypesOptions, isAccountingTypesLoading } = accountingTypes

  const { purchaseOrder } = useSCMSharedDataHook(["purchaseOrder"])
  const { purchaseOrderOptions, isPurchaseOrderLoading } = purchaseOrder

  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = formMethods

  return (
    <>
      <FormGroupContainer>
        <FormGroup
          title={t("form-customer-po-details")}
          className="pt-7 @2xl:pt-10 @3xl:pt-11">
          <Controller
            control={control}
            name="customersPO"
            render={({ field: { onChange, value } }) => (
              <Select
                label={t("form-customers-po")}
                labelClassName="text-title"
                placeholder={t("form-select")}
                options={purchaseOrderOptions}
                isLoading={isPurchaseOrderLoading}
                onChange={(option: any) => onChange(option?.value)}
                value={FindSelectOption(purchaseOrderOptions, value)}
                error={
                  errors.purchaseOrderOptions?.message
                    ? t(errors.purchaseOrderOptions?.message)
                    : ""
                }
                menuPortalTarget={document.body}
                styles={GetMenuListStyles(purchaseOrderOptions.length)}
                isDisabled={isFieldDisabled || isPurchaseOrderLoading}
              />
            )}
          />
          <Controller
            name="customerPODate"
            control={control}
            render={({ field: { value, onChange } }) => (
              <div className="relative">
                <label
                  htmlFor="customerPODate"
                  className="mb-2 block text-sm font-medium text-title transition-colors duration-200">
                  {t("form-customers-po-date")}
                </label>
                <DatePicker
                  id="customerPODate"
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
        </FormGroup>
        <FormGroup
          title={t("form-account-details")}
          className="pt-7 @2xl:pt-10 @3xl:pt-11">
          <Controller
            control={control}
            name="debitToId"
            render={({ field: { value, onChange } }) => (
              <Select
                placeholder={t("form-debit-to")}
                options={accountingTypesOptions}
                label={t("form-debit-to")}
                error={
                  errors.debitToId?.message ? t(errors.debitToId?.message) : ""
                }
                onChange={(option: any) => {
                  setSelectedDebitToName(option?.label)
                  setSelectedDebitToId(option?.value)
                  onChange(option?.value)
                }}
                value={FindSelectOption(accountingTypesOptions, value)}
                menuPortalTarget={document.body}
                styles={GetMenuListStyles(accountingTypesOptions.length)}
                isLoading={isAccountingTypesLoading}
                isDisabled={isFieldDisabled}
              />
            )}
          />
          <Controller
            name="isOpeningEntry"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Checkbox
                label={t("form-is-opening-entry")}
                checked={value}
                onChange={onChange}
              />
            )}
          />
        </FormGroup>
      </FormGroupContainer>
    </>
  )
}
