"use client"

import { useState } from "react"

import dayjs from "dayjs"
import { useTranslations } from "next-intl"

import { DatePicker } from "@/components/base/date-picker"
import FormGroup from "@/components/base/form-group"
import FormGroupContainer from "@/components/base/form-group-container"
import { Input, Select } from "@/components/ui"
import Box from "@/components/ui/box"
import TableGrid from "@/components/ui/table-grid"
import { useQueryParams } from "@/hooks/use-query-params"
import { useSelectOptions } from "@/hooks/use-select-options"
import { useBankAccountList } from "@/modules/fms/hooks"
import { useBankStatementReportList } from "@/modules/fms/hooks/use-bank-statement-report"
import { BankAccountList } from "@/modules/fms/types"
import { BankStatementReportQueryOptions } from "@/modules/fms/types/bank-statement-report"

import { useTransactionDetailsColumns } from "./transaction-details-columns"

export default function BankStatementForm() {
  const t = useTranslations("form")

  const { params, updateParams } =
    useQueryParams<BankStatementReportQueryOptions>({
      params: [
        {
          key: "bankAccountId",
          defaultValue: undefined,
          parse: (value) => Number(value) || undefined,
        },
        {
          key: "StartDate",
          defaultValue: "",
          parse: (value) => value || "",
        },
        {
          key: "EndDate",
          defaultValue: "",
          parse: (value) => value || "",
        },
      ],
    })

  const { data: bankStatementReportData }: any = useBankStatementReportList({
    bankAccountId: params.bankAccountId,
    StartDate: params.StartDate,
    EndDate: params.EndDate,
  })

  const [localData, setLocalData] = useState<Record<number, string>>({})

  const handleDateChange = (id: number, date: string) => {
    setLocalData((prev) => ({
      ...prev,
      [id]: date,
    }))
  }

  const columns = useTransactionDetailsColumns({
    onDateChange: handleDateChange,
  })

  const { data: bankAccountList, isLoading: isBankAccountLoading } =
    useBankAccountList({
      isCompanyAccount: true,
    })

  const bankAccountOptions = useSelectOptions<BankAccountList>(
    bankAccountList?.data,
    "accountName"
  )

  const handleStartDate = (date: any) => {
    updateParams?.({
      StartDate: date ? dayjs(date).format("YYYY-MM-DD") : undefined,
    })
  }

  const handleEndDate = (date: any) => {
    updateParams?.({
      EndDate: date ? dayjs(date).format("YYYY-MM-DD") : undefined,
    })
  }

  return (
    <Box>
      <FormGroupContainer className="flex grow flex-col justify-between pt-7 @container @2xl:pt-9 @3xl:pt-11">
        <FormGroup title={t("form-information")}>
          <Select
            label={t("form-account-name")}
            labelClassName="text-title"
            options={bankAccountOptions}
            value={bankAccountOptions.find(
              (option) => option.value === params.bankAccountId
            )}
            onChange={(option: any) => {
              updateParams({ bankAccountId: option?.value })
            }}
            isLoading={isBankAccountLoading}
          />

          <div>
            <label className="mb-2 block text-sm font-medium text-title transition-colors duration-200">
              {t("form-start-date")}
            </label>
            <DatePicker
              placeholderText={t("form-start-date")}
              selected={params?.StartDate ? new Date(params.StartDate) : null}
              onChange={handleStartDate}
              maxDate={params?.EndDate ? new Date(params.EndDate) : undefined}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-title transition-colors duration-200">
              {t("form-end-date")}
            </label>
            <DatePicker
              placeholderText={t("form-end-date")}
              selected={params?.EndDate ? new Date(params.EndDate) : null}
              onChange={handleEndDate}
              minDate={
                params?.StartDate ? new Date(params.StartDate) : undefined
              }
            />
          </div>
          <Input
            label={t("form-bank-name")}
            value={
              bankAccountList?.data?.find(
                (row) => row.id == params.bankAccountId
              )?.bank?.bankName
            }
            readOnly
            disabled
          />
        </FormGroup>

        <FormGroup
          title={t("form-transactions")}
          className="pt-7 @2xl:pt-10 @3xl:pt-11"
          childrenContainerClassName="@2xl:grid-cols-1 @4xl:col-span-12">
          <div className="space-y-4">
            <TableGrid
              data={bankStatementReportData?.transactions || []}
              columns={columns}
              gridTemplateColumns="50px 1fr 1fr 1fr 1fr 1fr"
              variant="modern"
            />
          </div>
        </FormGroup>
      </FormGroupContainer>
    </Box>
  )
}
