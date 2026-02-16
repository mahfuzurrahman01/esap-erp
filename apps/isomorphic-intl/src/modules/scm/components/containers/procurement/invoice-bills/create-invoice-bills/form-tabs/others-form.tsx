"use client"

import { useTranslations } from "next-intl"
import {
  Control,
  Controller,
  FormState,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form"
import { Checkbox } from "rizzui/checkbox"

import FormGroup from "@/components/base/form-group"
import FormGroupContainer from "@/components/base/form-group-container"
import { Select } from "@/components/ui"
import { useSCMSharedDataHook } from "@/modules/scm/constants/shared-data-hooks"
import {
  billingStatus,
  fiscalPosition,
} from "@/modules/scm/constants/shared-status-field-option"
import { useGlobalStoreState } from "@/modules/scm/store/global-store-state"
import {
  Invoice,
  InvoiceInput,
  InvoiceUpdate,
} from "@/modules/scm/types/procurement/invoice/invoice-types"
import {
  FindSelectOption,
  GetMenuListStyles,
} from "@/modules/scm/utils/select-options"

interface OthersFormProps {
  formMethods: {
    register: UseFormRegister<InvoiceInput | InvoiceUpdate>
    control: Control<InvoiceInput | InvoiceUpdate>
    formState: FormState<InvoiceInput | InvoiceUpdate>
    setValue: UseFormSetValue<InvoiceInput | InvoiceUpdate>
  }
  isFieldDisabled?: boolean
  initialData?: Invoice
  isEditForm?: boolean
}

export default function OthersForm({
  formMethods,
  isFieldDisabled,
}: OthersFormProps) {
  const t = useTranslations("form")

  const { setSelectedCreditToName, setSelectedCreditToId } =
    useGlobalStoreState()

  const { accountingTypes } = useSCMSharedDataHook(["accountingTypes"])

  const { accountingTypesOptions, isAccountingTypesLoading } = accountingTypes

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
          title={t("form-others")}
          className="pt-7 @2xl:pt-10 @3xl:pt-11">
          <Controller
            control={control}
            name="billingStatus"
            render={({ field: { onChange, value } }) => (
              <Select
                label={t("form-billing-status")}
                labelClassName="text-title"
                placeholder={t("form-select-billing-status")}
                options={billingStatus}
                onChange={(option: any) => onChange(option?.value)}
                value={FindSelectOption(billingStatus, value)}
                error={
                  errors.billingStatus?.message
                    ? t(errors.billingStatus?.message)
                    : ""
                }
                menuPortalTarget={document.body}
                styles={GetMenuListStyles(billingStatus.length)}
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
        </FormGroup>
        <FormGroup
          title={t("form-account-details")}
          className="pt-7 @2xl:pt-10 @3xl:pt-11">
          <Controller
            control={control}
            name="creditToId"
            render={({ field: { value, onChange } }) => (
              <Select
                placeholder={t("form-credit-to")}
                options={accountingTypesOptions}
                label={t("form-credit-to")}
                error={
                  errors.creditToId?.message
                    ? t(errors.creditToId?.message)
                    : ""
                }
                onChange={(option: any) => {
                  setSelectedCreditToName(option?.label)
                  setSelectedCreditToId(option?.value)
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
          <Checkbox
            label={t("form-is-opening-entry")}
            {...register?.("isOpeningEntry")}
            inputClassName="w-[18px] h-[18px] border-gray-600 dark:border-gray-500"
            className="items-start justify-center"
            iconClassName="w-[18px] h-[18px]"
            onChange={(e) => {
              setValue?.("isOpeningEntry", e.target.checked)
            }}
            disabled={isFieldDisabled}
          />
          {errors.isOpeningEntry && (
            <p className="text-sm text-red-500">
              {errors.isOpeningEntry.message
                ? t(errors.isOpeningEntry.message)
                : ""}
            </p>
          )}
        </FormGroup>
      </FormGroupContainer>
    </>
  )
}
