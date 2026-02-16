"use client"

import { useState } from "react"

import WidgetCard from "@core/components/cards/widget-card"

import { useQueryParams } from "@/hooks/use-query-params"
import GeneralLedgerReport from "@/modules/fms/components/containers/reports/general-ledger/general-ledger-report"
import GeneralLedgerToolbar from "@/modules/fms/components/containers/reports/general-ledger/general-ledger-toolbar"
import { useGeneralLedgerColumns } from "@/modules/fms/components/containers/reports/general-ledger/use-general-ledger-columns"
import { useGeneralLedgerList } from "@/modules/fms/hooks/use-general-ledger"
import { GeneralLedgerQueryOptions } from "@/modules/fms/types/general-ledger"

export default function GeneralLedgerTemplate() {
  const { params, updateParams } = useQueryParams<GeneralLedgerQueryOptions>({
    params: [
      {
        key: "companyId",
        defaultValue: "",
        parse: (value) => value || "",
      },
      {
        key: "startDate",
        defaultValue: "",
        parse: (value) => value || "",
      },
      {
        key: "endDate",
        defaultValue: "",
        parse: (value) => value || "",
      },
      {
        key: "voucherNumber",
        defaultValue: "",
        parse: (value) => value || "",
      },
    ],
  })

  const { data } = useGeneralLedgerList({
    companyId: params.companyId,
    startDate: params.startDate,
    endDate: params.endDate,
    voucherNumber: params.voucherNumber,
  })

  const columns = useGeneralLedgerColumns()
  const [filterValue, setFilterValue] = useState("")

  const handleFilterChange = (value: string) => {
    setFilterValue(value)
  }

  return (
    <>
      <WidgetCard
        rounded="xl"
        className="card-shadow flex flex-col gap-4 border-none bg-paper px-5 dark:bg-paper lg:px-7">
        <GeneralLedgerToolbar
          params={params}
          updateParams={updateParams}
          filterValue={filterValue}
          onFilterChange={handleFilterChange}
        />
        <GeneralLedgerReport
          data={data || []}
          columns={columns}
          filterValue={filterValue}
          onFilterChange={handleFilterChange}
          enableFiltering={true}
        />
      </WidgetCard>
    </>
  )
}
