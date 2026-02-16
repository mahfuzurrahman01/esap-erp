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
import { billingStatus, fiscalPosition } from "@/modules/scm/constants/shared-status-field-option"
import {
  PurchasedOrder,
  PurchasedOrderInput,
} from "@/modules/scm/types/procurement/purchased-order/purchased-order-types"
import {
  FindSelectOption,
  GetMenuListStyles,
} from "@/modules/scm/utils/select-options"

interface OthersFormProps {
  formMethods: {
    register: UseFormRegister<PurchasedOrderInput>
    control: Control<PurchasedOrderInput>
    formState: FormState<PurchasedOrderInput>
    setValue: UseFormSetValue<PurchasedOrderInput>
  }
  isFieldDisabled?: boolean
  initialData?: PurchasedOrder
  isEditForm?: boolean
}

export default function OthersForm({ formMethods, isFieldDisabled }: OthersFormProps) {
  const t = useTranslations("form")

  const {
    control,

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
      </FormGroupContainer>
    </>
  )
}
