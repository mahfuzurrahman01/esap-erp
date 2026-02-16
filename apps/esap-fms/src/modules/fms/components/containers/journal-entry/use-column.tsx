import Link from "next/link"
import { useMemo } from "react"

import { createColumnHelper } from "@tanstack/react-table"
import dayjs from "dayjs"
import { useTranslations } from "next-intl"
import { ActionIcon, Text, Tooltip } from "rizzui"

import DeletePopover from "@/components/base/delete-popover"
import EyeIcon from "@/components/icons/eye"
import PencilIcon from "@/components/icons/pencil"
import { Checkbox } from "@/components/ui"
import { routes } from "@/config/routes"
import { useCurrentRole } from "@/hooks/use-current-role"
import { ADMIN_MENU_ROLES } from "@/layouts/beryllium/fixed-menu-items/user-roles"
import { JournalEntryList } from "@/modules/fms/types"

const columnHelper = createColumnHelper<JournalEntryList>()

export const useColumn = () => {
  const tableT = useTranslations("table")
  // const { hasAnyRole } = useCurrentRole()
  // const isDeleteVisible = hasAnyRole(ADMIN_MENU_ROLES)
  const columns = useMemo(() => {
    return [
      columnHelper.accessor("journalNo", {
        id: "id",
        size: 280,
        header: ({ table }) => (
          <div className="flex items-center gap-2">
            <Checkbox
              aria-label="Select all rows"
              checked={table.getIsAllPageRowsSelected()}
              onChange={() => table.toggleAllPageRowsSelected()}
              className="h-[18px] w-[18px]"
            />
            <Text className="ms-2 font-medium text-gray-900 dark:text-gray-500">
              {tableT("table-text-id")}
            </Text>
          </div>
        ),
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <Checkbox
              aria-label="Select row"
              checked={row.getIsSelected()}
              onChange={() => row.toggleSelected()}
              className="h-[18px] w-[18px]"
            />
            <Text className="ms-2 font-medium text-title">
              {row.original.journalNo}
            </Text>
          </div>
        ),
        enableSorting: false,
      }),
      // columnHelper.accessor("journalDetails.chartOfAccount.accountName", {
      //   id: "chartOfAccountName",
      //   size: 240,
      //   header: tableT("table-text-title"),
      //   cell: ({ row }) => (
      //     <Text className="font-medium text-gray-900 dark:text-gray-0">
      //       {row.original.journalDetails[0].chartOfAccount.accountName}
      //     </Text>
      //   ),
      // }),
      columnHelper.accessor("journalType.journalTypeName", {
        id: "journalEntryTypeName",
        size: 240,
        header: tableT("table-text-journal-entry-type"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.journalType?.journalTypeName}
          </Text>
        ),
      }),
      columnHelper.accessor("postingDate", {
        id: "postingDate",
        size: 240,
        header: tableT("table-text-posting-date"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {dayjs(row.original.postingDate).format("DD-MM-YYYY")}
          </Text>
        ),
      }),
      columnHelper.accessor("company.companyName", {
        id: "companyName",
        size: 240,
        header: tableT("table-text-company"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.company?.companyName}
          </Text>
        ),
      }),
      columnHelper.accessor("referenceNo", {
        id: "referenceNo",
        size: 240,
        header: tableT("table-text-reference-no"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.referenceNo}
          </Text>
        ),
      }),
      columnHelper.accessor("totalDebit", {
        id: "totalDebit",
        size: 240,
        header: tableT("table-text-total-debit"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.totalDebit}
          </Text>
        ),
      }),
      columnHelper.accessor("action", {
        id: "action",
        size: 120,
        header: "",
        enablePinning: true,
        enableSorting: false,
        cell: ({
          row,
          table: {
            options: { meta },
          },
        }) => (
          <>
            <div className="flex items-center justify-end gap-3 pe-3">
              <Tooltip
                size="sm"
                content={tableT("table-text-edit-journal-entry")}
                placement="top"
                rounded="lg"
                className="dropdown-gr card-shadow !rounded-lg border-transparent bg-paper text-title dark:bg-paper dark:text-title"
                arrowClassName="dark:fill-paper [&>path]:stroke-transparent"
                color="invert">
                <Link
                  href={routes.fms.editJournalEntry(row.original.id ?? 0)}
                  aria-label="Edit journal entry">
                  <ActionIcon
                    as="span"
                    size="sm"
                    variant="outline"
                    rounded="lg"
                    className="h-6 w-7 border-gray-500/20">
                    <PencilIcon className="h-4 w-4" />
                  </ActionIcon>
                </Link>
              </Tooltip>
              <Tooltip
                size="sm"
                content={tableT("table-text-view-journal-entry")}
                placement="top"
                rounded="lg"
                className="dropdown-gr card-shadow !rounded-lg border-transparent bg-paper text-title dark:bg-paper dark:text-title"
                arrowClassName="dark:fill-paper [&>path]:stroke-transparent"
                color="invert">
                <Link
                  href={routes.fms.viewJournalEntry(row.original.id ?? 0)}
                  aria-label="View journal entry">
                  <ActionIcon
                    as="span"
                    size="sm"
                    variant="outline"
                    rounded="lg"
                    className="h-6 w-7 border-gray-500/20">
                    <EyeIcon className="h-4 w-4" />
                  </ActionIcon>
                </Link>
              </Tooltip>
              <DeletePopover
                title="table-text-delete-journal-entry"
                description={`${tableT("table-text-delete-confirm-journal-entry")} #${row.original.id}`}
                onDelete={() =>
                  meta?.handleDeleteRow && meta?.handleDeleteRow(row.original)
                }
              />
              {/* {isDeleteVisible && (
              )} */}
            </div>
          </>
        ),
      }),
    ]
  }, [tableT])

  return columns
}
