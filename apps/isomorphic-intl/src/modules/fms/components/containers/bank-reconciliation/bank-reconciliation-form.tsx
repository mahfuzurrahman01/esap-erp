"use client"

import { useTranslations } from "next-intl"
import { useEffect } from "react"
import { useAtom } from "jotai"

import FormGroup from "@/components/base/form-group"
import FormGroupContainer from "@/components/base/form-group-container"
import Box from "@/components/ui/box"
import { useQueryParams } from "@/hooks/use-query-params"
import { useSelectOptions } from "@/hooks/use-select-options"
import { useBankAccountList } from "@/modules/fms/hooks/use-bank-account"
import { useCompanyList } from "@/modules/fms/hooks/use-company"
import { useBankReconciliation } from "@/modules/fms/hooks/use-bank-reconciliation"
import { BankAccountList } from "@/modules/fms/types/bank-account"
import { BankReconciliationQueryOptions } from "@/modules/fms/types/bank-reconciliation"
import { CompanyList } from "@/modules/fms/types/company"
import { bankReconciliationQueryOptionsAtom } from "@/modules/fms/store/bank-reconciliation-store"

import BankReconciliationDetails from "./bank-reconciliation-details"
import BankReconciliationState from "./bank-reconciliation-state"
import BankUnreconciliationTransactionTable from "./transaction-table/table"

export default function BankReconciliation() {
  const t = useTranslations("form")
  const { params, updateParams } = useQueryParams<BankReconciliationQueryOptions>({
    params: [
      {
        key: "companyId",
        defaultValue: undefined,
        parse: (value) => Number(value) || undefined,
      },
      {
        key: "bankAccountId",
        defaultValue: undefined,
        parse: (value) => Number(value) || undefined,
      },
      {
        key: "fromDate",
        defaultValue: undefined,
        parse: (value) => value || undefined,
      },
      {
        key: "toDate",
        defaultValue: undefined,
        parse: (value) => value || undefined,
      },
    ],
  })

  const [, setQueryOptions] = useAtom(bankReconciliationQueryOptionsAtom)

  useEffect(() => {
    setQueryOptions({
      companyId: params.companyId,
      bankAccountId: params.bankAccountId,
    })
  }, [params.companyId, params.bankAccountId, setQueryOptions])

  const { data: companyList, isLoading: isCompanyLoading } = useCompanyList()
  const { data: bankAccountList, isLoading: isBankAccountLoading } = useBankAccountList({
    isCompanyAccount: true,
  })

  const { data: bankReconciliationData, isLoading, refetch } = useBankReconciliation({
    companyId: params.companyId,
    bankAccountId: params.bankAccountId,
    fromDate: params.fromDate,
    toDate: params.toDate,
  })

  const companyOptions = useSelectOptions<CompanyList>(
    companyList?.data,
    "companyName"
  )

  const bankAccountOptions = useSelectOptions<BankAccountList>(
    bankAccountList?.data,
    "accountName"
  )

  const handleCompanyChange = (option: any) => {
    updateParams?.({
      companyId: option?.value,
    })
  }

  const handleBankAccountChange = (option: any) => {
    updateParams?.({
      bankAccountId: option?.value,
    })
  }

  return (
    <Box>
      <div className="flex grow flex-col justify-between pt-7 @container @2xl:pt-9 @3xl:pt-11">
        <FormGroupContainer>
          <BankReconciliationDetails
            companyOptions={companyOptions}
            bankAccountOptions={bankAccountOptions}
            params={params}
            updateParams={updateParams}
            handleCompanyChange={handleCompanyChange}
            handleBankAccountChange={handleBankAccountChange}
            isCompanyLoading={isCompanyLoading}
            isBankAccountLoading={isBankAccountLoading}
          />

          <FormGroup
            title={t("form-reconciliation")}
            className="pt-7 @2xl:pt-9 @3xl:pt-11"
            childrenContainerClassName="@2xl:grid-cols-1 @4xl:col-span-12">
            {bankReconciliationData && (
              <BankReconciliationState bankReconciliationData={bankReconciliationData} />
            )}
          </FormGroup>

          <FormGroup
            title={t("form-transaction")}
            className="pt-7 @2xl:pt-9 @3xl:pt-11"
            childrenContainerClassName="@2xl:grid-cols-1 @4xl:col-span-12">
            <BankUnreconciliationTransactionTable
              data={bankReconciliationData?.transactions || []}
              isLoading={isLoading}
              refetch={refetch}
            />
          </FormGroup>
        </FormGroupContainer>
      </div>
    </Box>
  )
}