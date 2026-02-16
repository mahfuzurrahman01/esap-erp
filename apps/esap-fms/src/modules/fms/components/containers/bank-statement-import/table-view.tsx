"use client"

import Link from "next/link"

import { useTranslations } from "next-intl"
import { Text } from "rizzui"

import TableGrid from "@/components/ui/table-grid"
import { BankTransactionImport } from "@/modules/fms/types/bank-statement-import"
import { useRouter } from "next/navigation"
import { routes } from "@/config/routes"

export default function TableView({ data }: { data: BankTransactionImport[] }) {
  const t = useTranslations("form")
  const router = useRouter()
  const columns = [
    {
      id: "id",
      header: t("form-id"),
      accessorKey: "id",
      width: "60px",
      cell: (props: any) => (
        <Text className="flex items-center gap-2 font-medium text-gray-900 dark:text-gray-0">
          {props.row.index + 1}
        </Text>
      ),
    },
    {
      id: "bankTransactionCode",
      header: t("form-bank-transaction-code"),
      accessorKey: "bankTransactionCode",
      cell: (props: any) => (
        <Text className="flex items-center gap-2 font-medium text-gray-900 dark:text-gray-0">
          {t("form-successfully-imported")}
          <Link
            href={routes.fms.viewBankTransaction(props.row.original.id)}
            className="underline">
            {props.row.original.bankTransactionCode}
          </Link>
        </Text>
      ),
    },
  ]

  return (
    <div className="mt-5">
      <TableGrid
        data={data}
        columns={columns}
        variant="modern"
        gridTemplateColumns="60px 1fr"
        className="h-[400px]"
      />
    </div>
  )
}
