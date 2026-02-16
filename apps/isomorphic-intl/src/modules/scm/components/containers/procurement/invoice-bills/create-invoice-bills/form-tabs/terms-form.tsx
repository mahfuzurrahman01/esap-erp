"use client"

import { useTranslations } from "next-intl"
import {
  Control,
  Controller,
  FormState,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form"

import FormGroup from "@/components/base/form-group"
import FormGroupContainer from "@/components/base/form-group-container"
import { Select } from "@/components/ui"
import { useSCMSharedDataHook } from "@/modules/scm/constants/shared-data-hooks"
import {
  Invoice,
  InvoiceInput,
  InvoiceUpdate,
} from "@/modules/scm/types/procurement/invoice/invoice-types"
import {
  FindSelectOption,
  GetMenuListStyles,
} from "@/modules/scm/utils/select-options"

interface TermsFormProps {
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

export default function TermsForm({
  formMethods,
  isFieldDisabled,
}: TermsFormProps) {
  const t = useTranslations("form")
  const { paymentTerms } = useSCMSharedDataHook(["paymentTerms"])

  const { paymentTermsOptions, isPaymentTermsLoading } = paymentTerms

  const {
    control,
    formState: { errors },
  } = formMethods

  return (
    <>
      <FormGroupContainer>
        <FormGroup
          title={t("form-payment-terms")}
          className="pt-7 @2xl:pt-10 @3xl:pt-11">
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

        </FormGroup>
      </FormGroupContainer>
    </>
  )
}
