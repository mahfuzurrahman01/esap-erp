"use client"

import Link from "next/link"
import React from "react"

import { useDirection } from "@core/hooks/use-direction"
import { useTranslations } from "next-intl"
import { Text } from "rizzui"

import MainTable from "@/components/base/table/main-table"
import { useTanStackTable } from "@/components/container/tan-table/custom-table-components/use-tanstack-table"
import { Button } from "@/components/ui"
import { routes } from "@/config/routes"
import { serviceLevelAgreements } from "@/modules/scm/types/procurement/supplier/contract-types"

import { useSlaColumn } from "./contract-use-column"

export default function SlaTable({ contractData }: any) {
  const { direction } = useDirection()
  const columns = useSlaColumn()

  const { table, columnOrder } = useTanStackTable<serviceLevelAgreements>({
    tableData: contractData,
    columnConfig: columns,
    options: {
      columnResizeDirection: direction as any,
      columnResizeMode: "onChange",
    },
  })

  const tCommon = useTranslations("common")

  return (
    <div className="rounded-lg py-4 shadow-md @container">
      <Text className="my-2 ml-4 text-base font-medium text-gray-900 dark:text-gray-0">
        SLA Table
      </Text>
      <MainTable table={table} columnOrder={columnOrder} variant={"modern"} />
      <div className="mt-4 flex !w-full justify-end">
        <Button className="mr-4" variant="outline">
          <Link href={routes.scm.procurement.suppliers.suppliers}>
            {tCommon("text-common-back")}
          </Link>
        </Button>
      </div>
    </div>
  )
}
