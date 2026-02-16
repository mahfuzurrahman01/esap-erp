import { useTranslations } from "next-intl"
import { Text } from "rizzui"

import { useTanStackTable } from "@/components/container/tan-table/custom-table-components/use-tanstack-table"

import MainTable from "../table/table"
import { useItemsColumn } from "./items-column"

export default function ItemsTable({ invoiceData }: any) {
  const t = useTranslations("form")

  const columns = useItemsColumn()

  const { table, columnOrder } = useTanStackTable<any>({
    tableData: invoiceData,
    columnConfig: columns,
  })

  return (
    <div className="container">
      <Text className="p-6 text-base font-medium text-black">
        {t("form-product-data")}
      </Text>
      <MainTable table={table} columnOrder={columnOrder} variant={"modern"} />
    </div>
  )
}
