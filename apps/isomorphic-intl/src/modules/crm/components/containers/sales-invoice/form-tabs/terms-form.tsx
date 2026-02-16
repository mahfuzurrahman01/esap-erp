"use client"

import { useTranslations } from "next-intl"
import {
  Controller,
} from "react-hook-form"

import FormGroup from "@/components/base/form-group"
import FormGroupContainer from "@/components/base/form-group-container"
import { Select, Textarea } from "@/components/ui"
import { useSCMSharedDataHook } from "@/modules/scm/constants/shared-data-hooks"
import {
  Invoice,
} from "@/modules/scm/types/procurement/invoice/invoice-types"
import { FindSelectOption } from "@/modules/scm/utils/select-options"

interface TermsFormProps {
  formMethods: any
  isFieldDisabled?: boolean
  initialData?: Invoice
  isEditForm?: boolean
}

export default function TermsForm({
  formMethods,
}: TermsFormProps) {
  const t = useTranslations("form")
  const { paymentTerms } = useSCMSharedDataHook(["paymentTerms"])

  const { paymentTermsOptions, isPaymentTermsLoading } = paymentTerms

  const {
    control,
    register,
    formState: { errors },
  } = formMethods

  return (
    <>
      <FormGroupContainer>
        <FormGroup
          title={t("form-terms-and-conditions")}
          className="pt-7 @2xl:pt-10 @3xl:pt-11">
          <Controller
            name="paymentTerms"
            control={control}
            render={({ field: { value, onChange } }) => (
              <div className="w-full">
                <Select
                  label={t("form-payment-terms")}
                  placeholder={t("form-select")}
                  labelClassName="text-title"
                  options={paymentTermsOptions}
                  value={FindSelectOption(paymentTermsOptions, value)}
                  isLoading={isPaymentTermsLoading}
                  isDisabled={isPaymentTermsLoading}
                  onChange={(selectedOption: any) =>
                    onChange(selectedOption.value)
                  }
                />
              </div>
            )}
          />
          <div className="col-span-2">
            <Textarea
              label={t("form-description")}
              {...register?.("description")}
              placeholder={t("form-enter-description")}
            />
          </div>
        </FormGroup>
      </FormGroupContainer>
    </>
  )
}
