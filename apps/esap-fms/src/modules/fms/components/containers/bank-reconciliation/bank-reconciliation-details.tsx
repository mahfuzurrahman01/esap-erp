import React from "react"

import { useTranslations } from "next-intl"
import { SelectOption } from "rizzui"
import { useAtom } from "jotai"

import { DatePicker } from "@/components/base/date-picker"
import FormGroup from "@/components/base/form-group"
import { Input } from "@/components/ui"
import { Select } from "@/components/ui"
import {
  updateClosingBalanceAsPerBankStatementAtom,
  updateBankReconciliationQueryOptionsAtom,
} from "@/modules/fms/store/bank-reconciliation-store"

interface BankReconciliationDetailsProps {
  companyOptions: SelectOption[]
  bankAccountOptions: SelectOption[]
  params: {
    companyId?: number | undefined
    bankAccountId?: number | undefined
    fromDate?: string
    toDate?: string
    pageIndex?: number
    pageSize?: number
  }
  updateParams?: (params: any) => void
  handleCompanyChange: (option: any) => void
  handleBankAccountChange: (option: any) => void
  isCompanyLoading: boolean
  isBankAccountLoading: boolean
}

export default function BankReconciliationDetails({
  companyOptions,
  bankAccountOptions,
  params,
  updateParams,
  handleCompanyChange,
  handleBankAccountChange,
  isCompanyLoading,
  isBankAccountLoading,
}: BankReconciliationDetailsProps) {
  const t = useTranslations("form")
  const [, updateClosingBalance] = useAtom(updateClosingBalanceAsPerBankStatementAtom)
  const [, updateQueryOptions] = useAtom(updateBankReconciliationQueryOptionsAtom)

  const handleClosingBalanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0
    updateClosingBalance(value)
  }

  const handleCompanySelect = (option: any) => {
    handleCompanyChange(option)
    updateQueryOptions({
      companyId: option?.value,
      bankAccountId: params.bankAccountId,
    })
  }

  const handleBankAccountSelect = (option: any) => {
    handleBankAccountChange(option)
    updateQueryOptions({
      companyId: params.companyId,
      bankAccountId: option?.value,
    })
  }

  return (
    <>
      <FormGroup title={t("form-details")}>
        <Select
          label={t("form-company-name")}
          labelClassName="text-title"
          options={companyOptions}
          value={
            companyOptions.find(
              (option) => option.value === params.companyId
            ) || null
          }
          onChange={handleCompanySelect}
          isLoading={isCompanyLoading}
          isDisabled={isCompanyLoading}
          placeholder={
            isCompanyLoading ? "Loading companies..." : t("form-select-company")
          }
        />
        <Select
          label={t("form-bank-account-name")}
          labelClassName="text-title"
          options={bankAccountOptions}
          value={
            bankAccountOptions.find(
              (option) => option.value === params.bankAccountId
            ) || null
          }
          onChange={handleBankAccountSelect}
          isLoading={isBankAccountLoading}
          isDisabled={isBankAccountLoading}
          placeholder={
            isBankAccountLoading
              ? "Loading bank accounts..."
              : t("form-select-bank-account")
          }
        />
        <DatePicker
          id="fromDate"
          selected={params.fromDate ? new Date(params.fromDate) : null}
          onChange={(date: any) =>
            updateParams?.({
              fromDate: date ? date.toISOString() : "",
            })
          }
          placeholderText={t("form-from-date")}
          className="w-full"
        />
        <DatePicker
          id="toDate"
          selected={params.toDate ? new Date(params.toDate) : null}
          onChange={(date: any) =>
            updateParams?.({
              toDate: date ? date.toISOString() : "",
            })
          }
          placeholderText={t("form-to-date")}
          className="w-full"
        />
        <Input
          type="number"
          label={t("form-closing-balance")}
          placeholder={t("form-enter-closing-balance")}
          onChange={handleClosingBalanceChange}
        />
      </FormGroup>
    </>
  )
}
