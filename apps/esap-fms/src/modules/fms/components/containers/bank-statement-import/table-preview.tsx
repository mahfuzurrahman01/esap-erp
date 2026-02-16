"use client"

import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"
import { useAtomValue } from "jotai"
import { useTranslations } from "next-intl"
import { Text } from "rizzui"

import TableGrid from "@/components/ui/table-grid"
import { columnMappingAtom } from "@/modules/fms/store/bank-statement-store"

interface TablePreviewProps {
  data: any[]
}

export default function TablePreview({ data }: TablePreviewProps) {
  const t = useTranslations("form")
  const columnMapping = useAtomValue(columnMappingAtom)

  dayjs.extend(customParseFormat)

  // Transform data based on column mapping
  const transformedData = data.map((row, index) => {
    const rawDate = row[columnMapping.date || ""]
    let formattedDate = ""

    const dateFormats = ["DD-MM-YYYY", "DD/MM/YYYY", "YYYY-MM-DD", "MM/DD/YYYY"]

    for (const format of dateFormats) {
      const parsed = dayjs(rawDate, format)
      if (parsed.isValid()) {
        formattedDate = parsed.format("DD-MM-YYYY")
        break
      }
    }

    return {
      no: index + 1,
      date: formattedDate,
      amount: row[columnMapping.amount || ""],
      transactionType: row[columnMapping.transactionType || ""],
      referenceNumber: row[columnMapping.referenceNumber || ""],
      description: row[columnMapping.description || ""],
    }
  })

  const columns = [
    {
      id: "no",
      header: t("form-no"),
      accessorKey: "no",
      width: "60px",
    },
    {
      id: "date",
      header: t("form-date"),
      accessorKey: "date",
      cell: (props: any) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {props.row.original.date}
        </Text>
      ),
    },
    {
      id: "amount",
      header: t("form-amount"),
      accessorKey: "amount",
    },
    {
      id: "transactionType",
      header: t("form-transaction-type"),
      accessorKey: "transactionType",
    },
    {
      id: "referenceNumber",
      header: t("form-reference-number"),
      accessorKey: "referenceNumber",
    },
    {
      id: "description",
      header: t("form-description"),
      accessorKey: "description",
    },
  ]

  return (
    <div className="mt-5">
      <TableGrid
        data={transformedData}
        columns={columns}
        variant="modern"
        gridTemplateColumns="60px 1fr 1fr 1fr 1fr 1fr"
        className="h-[400px]"
      />
    </div>
  )
}
