"use client"

import Link from "next/link"
import { useMemo } from "react"

import { createColumnHelper } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import { ActionIcon, Text, Tooltip } from "rizzui"

import DeletePopover from "@/components/base/delete-popover"
import EyeIcon from "@/components/icons/eye"
import PencilIcon from "@/components/icons/pencil"
import { Checkbox } from "@/components/ui"
import { routes } from "@/config/routes"
import { useCurrentRole } from "@/hooks/use-current-role"
import { ADMIN_MENU_ROLES } from "@/layouts/beryllium/fixed-menu-items/user-roles"
import { JournalTemplate } from "@/modules/fms/types"

const columnHelper = createColumnHelper<JournalTemplate>()

export const useColumn = () => {
  const t = useTranslations("form")
  const tableT = useTranslations("table")
  // const { hasAnyRole } = useCurrentRole()
  // const isDeleteVisible = hasAnyRole(ADMIN_MENU_ROLES)

  const columns = useMemo(() => {
    return [
      columnHelper.accessor("id", {
        id: "id",
        size: 340,
        header: ({ table }) => (
          <div className="flex items-center gap-2">
            <Checkbox
              aria-label="Select all rows"
              checked={table.getIsAllPageRowsSelected()}
              onChange={() => table.toggleAllPageRowsSelected()}
            />
            <Text className="ms-2 font-medium text-gray-900 dark:text-gray-500">
              {tableT("table-text-name")}
            </Text>
          </div>
        ),
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <Checkbox
              aria-label="Select row"
              checked={row.getIsSelected()}
              onChange={() => row.toggleSelected()}
            />
            <Text className="ms-2 font-medium text-title">
              {row.original.journalTemplateTitle}
            </Text>
          </div>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("company.companyName", {
        id: "companyName",
        size: 200,
        header: t("form-company-name"),
        cell: ({ row }) => (
          <Text className="font-medium text-title">
            {row.original.company?.companyName}
          </Text>
        ),
      }),
      columnHelper.accessor("journalType.journalTypeName", {
        id: "journalTypeName",
        size: 200,
        header: tableT("table-text-journal-type"),
        cell: ({ row }) => (
          <Text className="font-medium text-title">
            {row.original.journalType?.journalTypeName}
          </Text>
        ),
      }),
      // columnHelper.accessor("journalType.journalTypeName", {
      //   id: "journalTypeName",
      //   size: 200,
      //   header: t("form-entry-type"),
      //   cell: ({ row }) => (
      //     <Text className="font-medium text-title">
      //       {row.original.journalType.journalTypeName}
      //     </Text>
      //   ),
      // }),
      columnHelper.accessor("actions", {
        id: "actions",
        header: "",
        cell: ({
          row,
          table: {
            options: { meta },
          },
        }) => (
          <div className="flex items-center justify-end gap-3 pe-3">
            <Tooltip
              size="sm"
              content={tableT("table-text-edit-journal-template")}
              placement="top"
              rounded="lg"
              className="dropdown-gr card-shadow !rounded-lg border-transparent bg-paper text-title dark:bg-paper dark:text-title"
              arrowClassName="dark:fill-paper [&>path]:stroke-transparent"
              color="invert">
              <Link
                href={routes.fms.editJournalTemplate(row.original.id ?? 0)}
                aria-label="Edit journal template">
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
              content={tableT("table-text-view-journal-template")}
              placement="top"
              rounded="lg"
              className="dropdown-gr card-shadow !rounded-lg border-transparent bg-paper text-title dark:bg-paper dark:text-title"
              arrowClassName="dark:fill-paper [&>path]:stroke-transparent"
              color="invert">
              <Link
                href={routes.fms.viewJournalTemplate(row.original.id ?? 0)}
                aria-label="View journal template">
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
              title="table-text-delete-journal-template"
              description={`${tableT("table-text-delete-confirm-journal-template")} #${row.original.id}`}
              onDelete={() =>
                meta?.handleDeleteRow && meta?.handleDeleteRow(row.original)
              }
            />
            {/* {isDeleteVisible && (
            )} */}
          </div>
        ),
        size: 120,
        enableSorting: false,
      }),
    ]
  }, [t, tableT])

  return columns
}
