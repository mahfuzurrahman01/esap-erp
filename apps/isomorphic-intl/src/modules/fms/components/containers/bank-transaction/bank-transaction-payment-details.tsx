"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import {
  Control,
  Controller,
  FormState,
  UseFormRegister,
} from "react-hook-form"
import { SelectOption } from "rizzui"

import FormGroup from "@/components/base/form-group"
import { Input, Select } from "@/components/ui"
import { useSharedDataHooks } from "@/modules/fms/constants/shared-data-hook"
import { BankTransactionFormInput } from "@/modules/fms/validators/bank-transaction-schema"

interface BankTransactionPaymentDetailsProps {
  formMethods: {
    register: UseFormRegister<BankTransactionFormInput>
    control: Control<BankTransactionFormInput>
    formState: FormState<BankTransactionFormInput>
  }
  isFieldDisabled?: boolean
}

type PartyType = "Supplier" | "Customer" | "Employee"

interface PartySelectConfig {
  name: "supplierId" | "customerId" | "employeeId"
  options: SelectOption[]
  isLoading: boolean
}

export function BankTransactionPaymentDetails({
  formMethods,
  isFieldDisabled,
}: BankTransactionPaymentDetailsProps) {
  const t = useTranslations("form")
  const {
    register,
    control,
    formState: { errors },
  } = formMethods

  const [selectedPartyType, setSelectedPartyType] = useState<PartyType | null>(null)

  const {
    supplier,
    customer,
    employee,
  } = useSharedDataHooks([
    "supplier",
    "customer",
    "employee",
  ])

  const { supplierOptions, isSupplierLoading } = supplier
  const { customerOptions, isCustomerLoading } = customer
  const { employeeOptions, isEmployeeLoading } = employee

  const partyTypeOptions = [
    { label: "Supplier", value: "Supplier" },
    { label: "Customer", value: "Customer" },
    { label: "Employee", value: "Employee" },
  ]

  const partyTypeConfigs: Record<PartyType, PartySelectConfig> = {
    Supplier: {
      name: "supplierId",
      options: supplierOptions,
      isLoading: isSupplierLoading,
    },
    Customer: {
      name: "customerId",
      options: customerOptions,
      isLoading: isCustomerLoading,
    },
    Employee: {
      name: "employeeId",
      options: employeeOptions,
      isLoading: isEmployeeLoading,
    },
  }

  return (
    <FormGroup
      title={t("form-payment-from-to")}
      className="pt-7 @2xl:pt-9 @3xl:pt-11">
      <Controller
        name="partyType"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Select
            label={t("form-party-type")}
            labelClassName="text-title"
            options={partyTypeOptions}
            value={value ? partyTypeOptions.find(option => option.value === value) : null}
            onChange={(option: any) => {
              onChange(option?.value)
              setSelectedPartyType(option?.value)
              if (option?.value) {
                const selectedPartyType = partyTypeOptions.find(
                  opt => opt.value === option.value
                )
                if (selectedPartyType) {
                  control._formValues.partyTypeName = selectedPartyType.label
                }
              }
            }}
            isDisabled={isFieldDisabled}
            placeholder={t("form-select-party-type")}
            menuPortalTarget={document.body}
            error={errors.partyType?.message && t(errors.partyType.message)}
          />
        )}
      />

      {selectedPartyType && (
        <Controller
          name="partyName"
          control={control}
          render={({ field: { value, onChange } }) => {
            const config = partyTypeConfigs[selectedPartyType]
            return (
              <Select
                label={t("form-party")}
                labelClassName="text-title"
                options={config.options}
                value={value ? config.options.find(option => option.value === value) : null}
                onChange={(option: any) => {
                  onChange(option?.value)
                  if (option?.value) {
                    const selectedParty = config.options.find(
                      opt => opt.value === option.value
                    )
                    if (selectedParty) {
                      const partyNameField = `${selectedPartyType.toLowerCase()}Name`
                      control._formValues[partyNameField] = selectedParty.label
                      control._formValues.partyName = selectedParty.label
                    }
                  }
                }}
                menuPortalTarget={document.body}
                isLoading={config.isLoading}
                isDisabled={config.isLoading || isFieldDisabled}
                placeholder={config.isLoading ? t("form-loading") : t("form-select")}
              />
            )
          }}
        />
      )}

      <Input
        label={t("form-party-account-number")}
        placeholder={t("form-enter-party-account-number")}
        {...register("partyAccountNumber")}
        error={errors.partyAccountNumber?.message && t(errors.partyAccountNumber.message)}
        disabled={isFieldDisabled}
      />
      <Input
        label={t("form-party-iban")}
        placeholder={t("form-enter-party-iban")}
        {...register("partyIBAN")}
        error={errors.partyIBAN?.message && t(errors.partyIBAN.message)}
        disabled={isFieldDisabled}
      />
    </FormGroup>
  )
}
