"use client"

import { useRouter } from "next/navigation"

import { Form } from "@core/ui/form"
import { useAtom } from "jotai"
import { useTranslations } from "next-intl"
import { Controller } from "react-hook-form"

import { DatePicker } from "@/components/base/date-picker"
import FormFooter from "@/components/base/form-footer"
import FormGroup from "@/components/base/form-group"
import FormGroupContainer from "@/components/base/form-group-container"
import { Input } from "@/components/ui"
import Box from "@/components/ui/box"
import {
  paymentAmountAtom,
  totalTaxAtom,
} from "@/modules/fms/store/payment-allocation"
import {
  PaymentFormInput,
  paymentFormSchema,
} from "@/modules/fms/validators/payment-schema"

import { DeductionsOrLossTable } from "./deductions-or-loss/deductions-or-loss-table"
import PaymentAccounts from "./payment-accounts"
import PaymentFromTo from "./payment-from-to"
import { PaymentReferenceTable } from "./payment-reference/payment-reference-table"
import { PaymentTaxAndChargeTable } from "./payment-tax-and-charge/payment-tax-and-charge-table"
import TypeOfPayment from "./type-of-payment"
import { usePaymentForm } from "./use-payment-form"
import PaymentWriteOff from "./writeoff"
import { selectedTransactionTypeAtom } from "@/modules/fms/store/transaction-payment-type-atom"

interface CreateEditPaymentsFormProps {
  id?: number
  mode?: "create" | "edit" | "view"
  requestFor?: "HRMS" | "FMS" | "SCM" | "CRM"
}

export default function CreateEditPaymentsForm({
  id,
  mode = "create",
  requestFor = "FMS",
}: CreateEditPaymentsFormProps) {
  const router = useRouter()
  const t = useTranslations("form")
  const [, setPaymentAmount] = useAtom(paymentAmountAtom)
  const [selectedTransactionType] = useAtom(selectedTransactionTypeAtom)
  const [totalTax] = useAtom(totalTaxAtom)
  const {
    isFieldDisabled,
    paymentReferences,
    paymentTaxCharges,
    paymentDeductionAndLosses,
    handleReferenceChange,
    handleReferenceDelete,
    handleReferenceAdd,
    handleTaxChargeChange,
    handleTaxChargeDelete,
    handleTaxChargeAdd,
    handleDeductionChange,
    handleDeductionDelete,
    handleDeductionAdd,
    onSubmit,
    getFormValues,
    isLoading,
  } = usePaymentForm({ id, mode, requestFor })

  return (
    <Box>
      <Form<PaymentFormInput>
        validationSchema={paymentFormSchema}
        onSubmit={onSubmit}
        className="flex grow flex-col justify-between pt-7 @container @2xl:pt-9 @3xl:pt-11"
        useFormProps={{
          defaultValues: getFormValues(),
          mode: "onChange",
          reValidateMode: "onChange",
          values: getFormValues(),
        }}>
        {({ register, control, formState, setValue, watch }) => {
          return (
            <>
              <FormGroupContainer>
                <FormGroup title={t("form-payment-details")}>
                  <TypeOfPayment
                    isFieldDisabled={isFieldDisabled}
                    formMethods={{
                      register,
                      control,
                      formState,
                      setValue,
                      watch,
                    }}
                  />
                </FormGroup>

                {selectedTransactionType !== "Internal Transfer" && (
                  <FormGroup
                    title={t("form-payment-from-to")}
                    className="pt-7 @2xl:pt-10 @3xl:pt-11">
                    <PaymentFromTo
                      isFieldDisabled={isFieldDisabled}
                      formMethods={{
                        register,
                        control,
                        formState,
                        setValue,
                        watch,
                      }}
                    />
                  </FormGroup>
                )}

                <FormGroup
                  title={t("form-payment-accounts")}
                  className="pt-7 @2xl:pt-10 @3xl:pt-11">
                  <PaymentAccounts
                    isFieldDisabled={isFieldDisabled}
                    formMethods={{
                      register,
                      control,
                      formState,
                      setValue,
                    }}
                  />
                </FormGroup>

                <FormGroup
                  title={t("form-payment-amount")}
                  className="pt-7 @2xl:pt-10 @3xl:pt-11">
                  <Input
                    label={t("form-payment-amount")}
                    isRequired
                    placeholder={t("form-enter-payment-amount")}
                    {...register("paymentAmount")}
                    onChange={(e) => {
                      const value = Number(e.target.value) || 0
                      setPaymentAmount(value)
                      register("paymentAmount").onChange(e)
                    }}
                    disabled={isFieldDisabled}
                    error={
                      formState.errors.paymentAmount?.message &&
                      t(formState.errors.paymentAmount.message)
                    }
                  />
                </FormGroup>

                {(selectedTransactionType !== "Internal Transfer" && (mode !== "view" ||
                  (mode === "view" && paymentReferences.length > 0))) &&
                  requestFor !== "HRMS" && (
                    <FormGroup
                      title={t("form-payment-references")}
                      className="pt-7 @2xl:pt-10 @3xl:pt-11"
                      childrenContainerClassName="@2xl:grid-cols-1 @4xl:col-span-12">
                      <PaymentReferenceTable
                        isFieldDisabled={isFieldDisabled}
                        data={paymentReferences}
                        onRowChange={handleReferenceChange}
                        onRowDelete={handleReferenceDelete}
                        onAddRow={handleReferenceAdd}
                      />
                    </FormGroup>
                  )}

                <FormGroup
                  title={t("form-payment-amount")}
                  className="pt-7 @2xl:pt-10 @3xl:pt-11">
                  <PaymentWriteOff
                    isFieldDisabled={isFieldDisabled}
                    formMethods={{
                      register,
                      control,
                      formState,
                      setValue,
                      watch,
                    }}
                  />
                </FormGroup>

                {(selectedTransactionType !== "Internal Transfer" && (mode !== "view" ||
                  (mode === "view" && paymentTaxCharges.length > 0))) &&
                  requestFor !== "HRMS" && (
                    <FormGroup
                      title={t("form-payment-tax-and-charges")}
                      className="pt-7 @2xl:pt-10 @3xl:pt-11"
                      childrenContainerClassName="@2xl:grid-cols-1 @4xl:col-span-12">
                      <PaymentTaxAndChargeTable
                        isFieldDisabled={isFieldDisabled}
                        data={paymentTaxCharges}
                        onRowChange={handleTaxChargeChange}
                        onRowDelete={handleTaxChargeDelete}
                        onAddRow={handleTaxChargeAdd}
                        setValue={setValue}
                      />
                      <div className="grid grid-cols-1 gap-4 @2xl:grid-cols-12">
                        <Input
                          type="number"
                          label={t("form-total-tax")}
                          placeholder={t("form-enter-total-tax")}
                          className="@2xl:col-span-4 @2xl:col-start-9"
                          value={totalTax?.toFixed(2) || "0.00"}
                          {...register("totalTax")}
                          readOnly
                          disabled
                        />
                      </div>
                    </FormGroup>
                  )}

                {(mode !== "view" ||
                  (mode === "view" && paymentDeductionAndLosses.length > 0)) &&
                  requestFor !== "HRMS" && (
                    <FormGroup
                      title={t("form-payment-deductions-or-loss")}
                      className="pt-7 @2xl:pt-10 @3xl:pt-11"
                      childrenContainerClassName="@2xl:grid-cols-1 @4xl:col-span-12">
                      <DeductionsOrLossTable
                        isFieldDisabled={isFieldDisabled}
                        data={paymentDeductionAndLosses}
                        onRowChange={handleDeductionChange}
                        onRowDelete={handleDeductionDelete}
                        onAddRow={handleDeductionAdd}
                      />
                    </FormGroup>
                  )}

                <FormGroup
                  title={t("form-transaction-id")}
                  className="pt-7 @2xl:pt-10 @3xl:pt-11">
                  <Input
                    label={t("form-reference-no")}
                    placeholder={t("form-enter-reference-no")}
                    {...register("referenceNumber")}
                    disabled={isFieldDisabled}
                    isRequired
                    error={
                      formState.errors?.referenceNumber?.message &&
                      t(formState.errors.referenceNumber.message)
                    }
                  />
                  <Controller
                    name="referenceDate"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <DatePicker
                        value={value ? new Date(value) : null}
                        onChange={(date: any) =>
                          onChange(date ? date.toISOString() : null)
                        }
                        inputProps={{
                          label: t("form-reference-date"),
                          error:
                            formState.errors?.referenceDate?.message &&
                            t(formState.errors.referenceDate.message),
                        }}
                        isRequired
                        disabled={isFieldDisabled}
                        placeholderText={t("form-select-date")}
                        popperPlacement="bottom-end"
                      />
                    )}
                  />
                </FormGroup>
              </FormGroupContainer>

              {mode !== "view" && (
                <FormFooter
                  isLoading={isLoading}
                  altBtnText={t("form-back")}
                  handleAltBtn={() => router.back()}
                  submitBtnText={
                    id && requestFor == "FMS"
                      ? t("form-update-payment")
                      : t("form-create-payment")
                  }
                  className="border-gray-500/20 dark:bg-paper"
                />
              )}
            </>
          )
        }}
      </Form>
    </Box>
  )
}
