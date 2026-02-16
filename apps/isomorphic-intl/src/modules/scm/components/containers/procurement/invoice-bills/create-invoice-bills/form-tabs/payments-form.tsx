"use client";

import { useTranslations } from "next-intl";
import { Control, Controller, FormState, UseFormRegister, UseFormSetValue } from "react-hook-form";



import FormGroup from "@/components/base/form-group";
import FormGroupContainer from "@/components/base/form-group-container";
import { Input, Select } from "@/components/ui";
import { useSCMSharedDataHook } from "@/modules/scm/constants/shared-data-hooks";
import { Invoice, InvoiceInput, InvoiceUpdate } from "@/modules/scm/types/procurement/invoice/invoice-types";
import { FindSelectOption, GetMenuListStyles } from "@/modules/scm/utils/select-options";



import { AdvancedPaymentsTable } from "../advanced-payments/advanced-payments-table";
import { useInvoiceBillsForm } from "../use-invoice-bills-form";
import { useAtom } from "jotai";
import { writeOffAmountAtom } from "@/modules/scm/store/global-store-state";





interface PaymentsFormProps {
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

export default function PaymentsForm({
  formMethods,
  isFieldDisabled,
  initialData,
  isEditForm,
}: PaymentsFormProps) {
  const t = useTranslations("form")
   const [, setWriteOffAmount] = useAtom(writeOffAmountAtom)


  const { accountingTypes, costCenter } = useSCMSharedDataHook([
    "accountingTypes",
    "costCenter",
  ])

  const { accountingTypesOptions, isAccountingTypesLoading } = accountingTypes
  const { costCenterOptions, isCostCenterLoading } = costCenter

  const {
    advancedPayments,
    handleAdvancedPaymentChange,
    handleAdvancedPaymentDelete,
    handleAdvancedPaymentAdd,
  } = useInvoiceBillsForm({
    id: initialData?.id || 0,
    mode: isEditForm ? "edit" : "create",
  })

  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = formMethods

  const handleWriteOffAmountChange = (value: number) => {
    setWriteOffAmount(value)
  }

  return (
    <>
      <FormGroupContainer>

        <FormGroup
          title={t("form-advanced-payments")}
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
          title={t("form-write-off")}
          className="pt-7 @2xl:pt-10 @3xl:pt-11">
          <Input
            placeholder={t("form-write-off-amount")}
            label={t("form-write-off-amount")}
            labelClassName="text-title"
            {...(register &&
              register("writeOffAmount", { valueAsNumber: true }))}
            onChange={(e: any) => handleWriteOffAmountChange(e.target.value)}
            error={
              errors.writeOffAmount?.message
                ? t(errors.writeOffAmount?.message)
                : ""
            }
            disabled={isFieldDisabled}
          />
          <Controller
            control={control}
            name="writeOffAccountId"
            render={({ field: { value, onChange } }) => (
              <Select
                placeholder={t("form-write-off-account")}
                options={accountingTypesOptions}
                label={t("form-write-off-account")}
                error={
                  errors.writeOffAccountId?.message
                    ? t(errors.writeOffAccountId?.message)
                    : ""
                }
                onChange={(option: any) => onChange(option?.value)}
                value={FindSelectOption(accountingTypesOptions, value)}
                menuPortalTarget={document.body}
                styles={GetMenuListStyles(accountingTypesOptions.length)}
                isLoading={isAccountingTypesLoading}
                isDisabled={isFieldDisabled}
              />
            )}
          />
          <Controller
            control={control}
            name="writeOffCostCenterId"
            render={({ field: { value, onChange } }) => (
              <Select
                placeholder={t("form-write-off-cost-center")}
                options={costCenterOptions}
                label={t("form-write-off-cost-center")}
                error={
                  errors.writeOffCostCenterId?.message
                    ? t(errors.writeOffCostCenterId?.message)
                    : ""
                }
                onChange={(option: any) => onChange(option?.value)}
                value={FindSelectOption(costCenterOptions, value)}
                menuPortalTarget={document.body}
                styles={GetMenuListStyles(costCenterOptions.length)}
                isLoading={isCostCenterLoading}
                isDisabled={isFieldDisabled}
              />
            )}
          />
        </FormGroup>
      </FormGroupContainer>
    </>
  )
}