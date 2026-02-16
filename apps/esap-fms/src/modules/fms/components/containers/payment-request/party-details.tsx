"use client"

import { useEffect } from "react"

import { useAtom } from "jotai"
import { useTranslations } from "next-intl"
import {
  Control,
  Controller,
  FormState,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form"

import { Input, Select } from "@/components/ui"
import { useSharedDataHooks } from "@/modules/fms/constants/shared-data-hook"
import {
  PartyType,
  selectedPartyTypeAtom,
} from "@/modules/fms/store/party-type-atom"
import { PaymentRequestFormInput } from "@/modules/fms/validators/payment-request-schema"

const partyTypeOptions = [
  { value: "Supplier", label: "Supplier" },
  { value: "Customer", label: "Customer" },
  { value: "Employee", label: "Employee" },
]

interface PartyDetailsProps {
  isFieldDisabled?: boolean
  formMethods: {
    register?: UseFormRegister<PaymentRequestFormInput>
    control?: Control<PaymentRequestFormInput>
    formState: FormState<PaymentRequestFormInput>
    watch?: UseFormWatch<PaymentRequestFormInput>
    setValue?: UseFormSetValue<PaymentRequestFormInput>
  }
}

export default function PartyDetails({
  isFieldDisabled,
  formMethods,
}: PartyDetailsProps) {
  const t = useTranslations("form")
  const { supplier, customer, employee } = useSharedDataHooks([
    "supplier",
    "customer",
    "employee",
  ])
  const { supplierOptions, isSupplierLoading } = supplier
  const { customerOptions, isCustomerLoading } = customer
  const { employeeOptions, isEmployeeLoading } = employee

  const [selectedPartyType, setSelectedPartyType] = useAtom(selectedPartyTypeAtom)

  const {
    register,
    control,
    formState: { errors },
    setValue,
  } = formMethods

  // Set party type when selectedPartyType changes
  useEffect(() => {
    if (selectedPartyType) {
      setValue?.("partyType", selectedPartyType)
    }
  }, [selectedPartyType, setValue])

  // Enhanced helper function to set party details
  const handlePartySelect = (option: any, onChange: (value: any) => void) => {
    if (option) {
      onChange(option.value)
      setValue?.("partyName", option.label)
    } else {
      onChange(null)
      setValue?.("partyName", "")
    }
  }

  // Add effect to handle initial values for edit mode
  useEffect(() => {
    const currentPartyId = formMethods.watch?.("partyId")
    const currentPartyType = selectedPartyType

    if (currentPartyId && currentPartyType) {
      let options
      switch (currentPartyType) {
        case "Supplier":
          options = supplierOptions
          break
        case "Customer":
          options = customerOptions
          break
        case "Employee":
          options = employeeOptions
          break
      }

      const selectedOption = options?.find((opt: any) => opt.value === currentPartyId)
      if (selectedOption) {
        setValue?.("partyName", selectedOption.label)
      }
    }
  }, [formMethods.watch?.("partyId"), selectedPartyType])

  return (
    <>
      <Controller
        name="partyType"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Select
            label={t("form-party-type")}
            labelClassName="text-title"
            isRequired
            options={partyTypeOptions}
            value={
              partyTypeOptions?.find(
                (option: any) =>
                  option.value === value || option.label === selectedPartyType
              ) || null
            }
            onChange={(option: any) => {
              if (option?.value) {
                onChange(option.value)
                setSelectedPartyType(option.value as PartyType)
                // Clear party selection when party type changes
                setValue?.("partyId", 0)
                setValue?.("partyName", "")
              }
            }}
            isLoading={false}
            isDisabled={isFieldDisabled}
            placeholder={t("form-select-party-type")}
            error={errors.partyType?.message && t(errors.partyType.message)}
          />
        )}
      />

      {selectedPartyType === "Supplier" && (
        <Controller
          name="partyId"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Select
              label={t("form-supplier")}
              labelClassName="text-title"
              options={supplierOptions}
              value={
                value && supplierOptions
                  ? supplierOptions.find(
                    (option: any) => option.value === value
                  ) || null
                  : null
              }
              onChange={(option: any) => handlePartySelect(option, onChange)}
              isLoading={isSupplierLoading}
              isDisabled={isFieldDisabled}
              placeholder={t("form-select-supplier")}
              error={errors.partyId?.message && t(errors.partyId.message)}
            />
          )}
        />
      )}

      {selectedPartyType === "Customer" && (
        <Controller
          name="partyId"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Select
              label={t("form-customer")}
              labelClassName="text-title"
              options={customerOptions}
              value={
                value && customerOptions
                  ? customerOptions.find(
                    (option: any) => option.value === value
                  ) || null
                  : null
              }
              onChange={(option: any) => handlePartySelect(option, onChange)}
              isLoading={isCustomerLoading}
              isDisabled={isFieldDisabled}
              placeholder={t("form-select-customer")}
              error={errors.partyId?.message && t(errors.partyId.message)}
            />
          )}
        />
      )}

      {selectedPartyType === "Employee" && (
        <Controller
          name="partyId"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Select
              label={t("form-employee")}
              labelClassName="text-title"
              options={employeeOptions}
              value={
                value && employeeOptions
                  ? employeeOptions.find(
                    (option: any) => option.value === value
                  ) || null
                  : null
              }
              onChange={(option: any) => handlePartySelect(option, onChange)}
              isLoading={isEmployeeLoading}
              isDisabled={isFieldDisabled}
              placeholder={t("form-select-employee")}
              error={errors.partyId?.message && t(errors.partyId.message)}
            />
          )}
        />
      )}

      <Input
        label={t("form-reference-type")}
        placeholder={t("form-enter-reference-type")}
        {...register?.("referenceType")}
        disabled={true}
        error={errors.referenceType?.message && t(errors.referenceType.message)}
      />

      <Input
        label={t("form-reference-number")}
        placeholder={t("form-enter-reference-number")}
        {...register?.("referenceNumber")}
        disabled={true}
        error={errors.referenceNumber?.message && t(errors.referenceNumber.message)}
      />
    </>
  )
}
