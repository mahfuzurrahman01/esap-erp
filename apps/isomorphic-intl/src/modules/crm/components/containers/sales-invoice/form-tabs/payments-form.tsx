"use client"

import { useTranslations } from "next-intl"

import FormGroup from "@/components/base/form-group"
import FormGroupContainer from "@/components/base/form-group-container"
import { Input } from "@/components/ui"
import { AdvancedPaymentsTable } from "../advanced-payments/advanced-payments-table"

interface PaymentsFormProps {
  formMethods: any
  initialData:any
  isFieldDisabled?: boolean
  advancedPayments: any
  setAdvancedPayments: any
  handleAdvancedPaymentChange: any
  handleAdvancedPaymentDelete: any
  handleAdvancedPaymentAdd: any
}

export default function PaymentsForm({
  formMethods,
  isFieldDisabled,
  advancedPayments,
  handleAdvancedPaymentChange,
  handleAdvancedPaymentDelete,
  handleAdvancedPaymentAdd,
}: PaymentsFormProps) {
  const t = useTranslations("form")

  const {
    register,
    setValue,
    formState: { errors },
  } = formMethods

  return (
    <>
      <FormGroupContainer>
        <FormGroup
          title={t("form-advance-payments")}
          className="pt-7 @2xl:pt-10 @3xl:pt-11"
          childrenContainerClassName="@2xl:grid-cols-1 @4xl:col-span-12">
          <AdvancedPaymentsTable
            isFieldDisabled={isFieldDisabled}
            data={advancedPayments}
            onRowChange={handleAdvancedPaymentChange}
            onRowDelete={handleAdvancedPaymentDelete}
            onAddRow={handleAdvancedPaymentAdd}
            setValue={setValue}
          />
        </FormGroup>
        <FormGroup
          title={t("form-total")}
          className="pt-7 @2xl:pt-10 @3xl:pt-11">
          <Input
            label={t("form-total-quantity")}
            {...register("totalAdvanceQuantity")}
            disabled={isFieldDisabled}
          />
          <Input
            label={t("form-total-amount")}
            {...register("totalAdvanceAmount")}
            disabled={isFieldDisabled}
            onChange={(e) => {
              const value = Number(e.target.value) || 0
              setValue("totalAdvanceAmount", value)
              register("totalAdvanceAmount").onChange(e)
            }}
          />
        </FormGroup>
      </FormGroupContainer>
    </>
  )
}
