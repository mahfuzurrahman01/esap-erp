"use client"

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
import { selectedPartyTypeAtom } from "@/modules/fms/store/party-type-atom"
import { selectedTransactionTypeAtom } from "@/modules/fms/store/transaction-payment-type-atom"
import { PaymentFormInput } from "@/modules/fms/validators/payment-schema"
import { useSelectOptions } from "@/hooks/use-select-options"
import { useBankAccountList } from "@/modules/fms/hooks/use-bank-account"
import { BankAccountList } from "@/modules/fms/types/bank-account"

interface PartyTypeOption {
  value: string
  label: string
}

const partyTypeOptions: PartyTypeOption[] = [
  { value: "Supplier", label: "Supplier" },
  { value: "Customer", label: "Customer" },
  { value: "Employee", label: "Employee" },
]

interface PaymentFromToProps {
  isFieldDisabled?: boolean
  formMethods: {
    register?: UseFormRegister<PaymentFormInput>
    control?: Control<PaymentFormInput>
    formState: FormState<PaymentFormInput>
    watch?: UseFormWatch<PaymentFormInput>
    setValue?: UseFormSetValue<PaymentFormInput>
  }
}

export default function PaymentFromTo({
  isFieldDisabled,
  formMethods,
}: PaymentFromToProps) {
  const t = useTranslations("form")
  const [selectedPartyType, setSelectedPartyType] = useAtom(selectedPartyTypeAtom)
  const [selectedTransactionType] = useAtom(selectedTransactionTypeAtom)
  const { supplier, customer, employee } =
    useSharedDataHooks([
      "supplier",
      "customer",
      "employee",
    ])

  const { supplierOptions, isSupplierLoading } = supplier
  const { customerOptions, isCustomerLoading } = customer
  const { employeeOptions, isEmployeeLoading } = employee

  const { data: companyBankAccountList, isLoading: isCompanyBankAccountLoading } =
    useBankAccountList({ pageSize: 100, isCompanyAccount: true })
  const companyBankAccountOptions = useSelectOptions<BankAccountList>(
    companyBankAccountList?.data,
    "accountName"
  )

  const { data: partyBankAccountList, isLoading: isPartyBankAccountLoading } =
    useBankAccountList({ pageSize: 100, isCompanyAccount: false, partyType: selectedPartyType || undefined })
  const partyBankAccountOptions = useSelectOptions<BankAccountList>(
    partyBankAccountList?.data,
    "accountName"
  )

  const {
    control,
    register,
    formState: { errors },
    setValue,
  } = formMethods

  type Option = {
    label: string;
    value: string;
  };


  // Filter party type options based on transaction type
  const filteredPartyTypeOptions = selectedTransactionType === "Pay"
    ? partyTypeOptions.filter((option: Option) => option.value === "Supplier" || option.value === "Employee")
    : selectedTransactionType === "Receive"
      ? partyTypeOptions.filter((option: Option) => option.value === "Customer")
      : partyTypeOptions

  return (
    <>
      <Controller
        name="partyType"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Select
            label={t("form-party-type")}
            labelClassName="text-title"
            options={filteredPartyTypeOptions}
            value={
              value && filteredPartyTypeOptions
                ? filteredPartyTypeOptions.find((option: any) => option.value === value)
                : null
            }
            onChange={(option: any) => {
              onChange(option?.value)
              setSelectedPartyType(option?.label || null)
            }}
            isDisabled={isFieldDisabled}
            placeholder={t("form-select-party-type")}
            error={errors.partyType?.message && t(errors.partyType.message)}
          />
        )}
      />

      {selectedPartyType === "Supplier" && !isFieldDisabled && (
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
                  )
                  : null
              }
              onChange={(option: any) => onChange(option?.value)}
              isLoading={isSupplierLoading}
              isDisabled={isFieldDisabled}
              placeholder={t("form-select-supplier")}
              error={errors.partyId?.message}
            />
          )}
        />
      )}

      {selectedPartyType === "Customer" && !isFieldDisabled && (
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
                  )
                  : null
              }
              onChange={(option: any) => onChange(option?.value)}
              isLoading={isCustomerLoading}
              isDisabled={isFieldDisabled}
              placeholder={t("form-select-customer")}
              error={errors.partyId?.message}
            />
          )}
        />
      )}

      {selectedPartyType === "Employee" && !isFieldDisabled && (
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
                  )
                  : null
              }
              onChange={(option: any) => onChange(option?.value)}
              isLoading={isEmployeeLoading}
              isDisabled={isFieldDisabled}
              placeholder={t("form-select-employee")}
              error={errors.partyId?.message}
            />
          )}
        />
      )}

      {isFieldDisabled && (
        <Input
          label={t("form-party-name")}
          placeholder={t("form-party-name")}
          {...register?.("partyName")}
          disabled={isFieldDisabled}
          error={
            errors.partyName?.message &&
            t(errors.partyName.message)
          }
        />
      )}

      <Controller
        name="partyBankAccountId"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Select
            label={t("form-party-bank-account")}
            labelClassName="text-title"
            options={partyBankAccountOptions}
            value={
              value && partyBankAccountOptions
                ? partyBankAccountOptions.find(
                  (option: any) => option.value === value
                )
                : null
            }
            onChange={(option: any) => {
              if (option?.value) {
                onChange(option.value)
                const selectedAccount = partyBankAccountList?.data?.find(
                  (acc: any) => acc.id === option.value
                )
                if (selectedAccount && setValue) {
                  setValue("partyBankAccountId", selectedAccount.id || null)
                }
              }
            }}
            isLoading={isPartyBankAccountLoading}
            isDisabled={isFieldDisabled}
            placeholder={t("form-select-party-bank-account")}
            error={errors.partyBankAccountId?.message}
          />
        )}
      />

      <Controller
        name="companyBankAccountId"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Select
            label={t("form-company-bank-account")}
            labelClassName="text-title"
            options={companyBankAccountOptions}
            value={
              value && companyBankAccountOptions
                ? companyBankAccountOptions.find(
                  (option: any) => option.value === value
                )
                : null
            }
            onChange={(option: any) => {
              if (option?.value) {
                onChange(option.value)
                const selectedAccount = companyBankAccountList?.data?.find(
                  (acc: any) => acc.id === option.value
                )
                if (selectedAccount && setValue) {
                  setValue("companyBankAccountId", selectedAccount.id || null)
                }
              }
            }}
            isLoading={isCompanyBankAccountLoading}
            isDisabled={isFieldDisabled}
            placeholder={t("form-select-bank-account")}
            error={errors.companyBankAccountId?.message}
          />
        )}
      />
    </>
  )
}
