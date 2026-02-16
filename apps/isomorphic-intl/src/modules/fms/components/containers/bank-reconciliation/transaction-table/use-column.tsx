import dynamic from "next/dynamic"
import { useMemo } from "react"

import { createColumnHelper } from "@tanstack/react-table"
import dayjs from "dayjs"
import { useTranslations } from "next-intl"
import { Text, Tooltip } from "rizzui"

import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import { Badge } from "@/components/ui"
import { BankTransaction } from "@/modules/fms/types/bank-reconciliation"

const BankTransactionMatchDrawerView = dynamic(
  () => import("../bank-transaction-match-drawer-view"),
  {
    ssr: false,
  }
)

const columnHelper = createColumnHelper<BankTransaction>()

interface UseColumnProps {
  refetch?: () => Promise<any>
}

export const useColumn = ({ refetch }: UseColumnProps = {}) => {
  const t = useTranslations("form")
  const tableT = useTranslations("table")
  const { openDrawer } = useDrawer()

  const columns = useMemo(() => {
    return [
      columnHelper.accessor("transactionDate", {
        id: "transactionDate",
        size: 180,
        header: ({ table }) => (
          <div className="flex items-center gap-2">
            <Text className="ms-2 font-medium text-gray-900 dark:text-gray-500">
              {tableT("table-text-transaction-date")}
            </Text>
          </div>
        ),
        cell: ({ row }) => (
          <Text className="font-medium text-title">
            {dayjs(row.original.transactionDate).format("DD-MM-YYYY")}
          </Text>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("bankTransactionCode", {
        id: "bankTransactionCode",
        size: 200,
        header: tableT("table-text-transaction-code"),
        cell: ({ row }) => (
          <Text className="font-medium text-title">
            {row.original.bankTransactionCode}
          </Text>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("transactionType", {
        id: "transactionType",
        size: 200,
        header: tableT("table-text-transaction-type"),
        cell: ({ row }) => (
          <Text className="font-medium text-title">
            {row.original.transactionType}
          </Text>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("amount", {
        id: "amount",
        size: 150,
        header: tableT("table-text-amount"),
        cell: ({ row }) => (
          <Text className="font-medium text-title">
            {row.original.amount}
          </Text>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("description", {
        id: "description",
        size: 250,
        header: tableT("table-text-description"),
        cell: ({ row }) => (
          <Text className="font-medium text-title">
            {row.original.description}
          </Text>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("totalUnAllocatedAmount", {
        id: "totalUnAllocatedAmount",
        size: 200,
        header: tableT("table-text-unallocated-amount"),
        cell: ({ row }) => (
          <Text className="font-medium text-title">
            {row.original.totalUnAllocatedAmount}
          </Text>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("actions", {
        id: "actions",
        size: 100,
        header: "",
        enablePinning: true,
        enableSorting: false,
        cell: ({ row }) => (
          <div className="flex items-center justify-end gap-3 pe-3">
            <Tooltip
              size="sm"
              content={tableT("table-text-match")}
              placement="top"
              className="dropdown-gr card-shadow !rounded-lg border-transparent bg-paper text-title dark:bg-paper dark:text-title"
              arrowClassName="dark:fill-paper [&>path]:stroke-transparent"
              color="invert">
              <Badge
                variant="flat"
                color="success"
                className="cursor-pointer"
                onClick={() => {
                  openDrawer({
                    view: (
                      <BankTransactionMatchDrawerView
                        id={row.original.id}
                        refetch={refetch}
                      />
                    ),
                    placement: "right",
                    containerClassName: "max-w-[668px]",
                  })
                }}>
                {tableT("table-text-match")}
              </Badge>
            </Tooltip>
          </div>
        ),
      }),
    ]
  }, [t, tableT, refetch])

  return columns
}