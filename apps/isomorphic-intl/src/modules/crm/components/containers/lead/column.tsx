import Link from "next/link"
import { useMemo } from "react"

import { createColumnHelper } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import { Checkbox, Text } from "rizzui"

import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import ListPopover from "@/components/base/list-popover"
import EyeIcon from "@/components/icons/eye"
import PencilIcon from "@/components/icons/pencil"
import TrashIcon from "@/components/icons/trash"
import { Button } from "@/components/ui"
import { routes } from "@/config/routes"
import { LeadList } from "@/modules/crm/types/lead"

import AssignedToCell from "../user/assigned-to-cell"
import { LuFileText } from "react-icons/lu"
import { UserIcon } from "@/components/icons/crm/user"

const columnHelper = createColumnHelper<LeadList>()

export const useColumn = () => {
  const { openDrawer } = useDrawer()
  const tableT = useTranslations("table")

  const columns = useMemo(() => {
    const leadOwner = tableT("table-text-lead-owner")
    const title = tableT("table-text-title")
    const email = tableT("table-text-email")
    const fullName = tableT("table-text-full-name")
    const phone = tableT("table-text-phone")
    const company = tableT("table-text-company")
    const industry = tableT("table-text-industry")
    const id = tableT("table-text-id")

    return [
      columnHelper.accessor("id", {
        id: "id",
        size: 60,
        header: ({ table }) => (
          <span className="inline-block">
            <div className="flex items-center gap-12">
              <Checkbox
                aria-label="Select all rows"
                checked={table.getIsAllPageRowsSelected()}
                onChange={() => table.toggleAllPageRowsSelected()}
                inputClassName="w-[18px] h-[18px] border-gray-600 dark:border-gray-500/20"
                iconClassName="w-[18px] h-[18px]"
              />
              <Text className="font-medium text-gray-600 dark:text-gray-500">
                {id}
              </Text>
            </div>
          </span>
        ),
        cell: ({ row }) => (
          <div className="flex items-center gap-12">
            <Checkbox
              aria-label="Select row"
              checked={row.getIsSelected()}
              onChange={() => row.toggleSelected()}
              inputClassName="w-[18px] h-[18px] border-gray-600 dark:border-gray-500/20"
              iconClassName="w-[18px] h-[18px]"
            />
            <Text className="font-medium text-gray-900 dark:text-gray-0">
              {row.original.shortOrder}
            </Text>
          </div>
        ),
      }),
      columnHelper.accessor("title", {
        id: "title",
        size: 250,
        header: title,
        cell: ({ row }) => (
          <Link href={routes.crm.leadDetails(row.original.id ?? "")}>
            <span
              className="block max-w-[250px] truncate font-medium text-gray-900 dark:text-gray-0 cursor-pointer"
              title={row.original.title}>
              {row.original.title}
            </span>
          </Link>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("firstName", {
        id: "firstName",
        size: 150,
        header: fullName,
        cell: ({ row }) => (
          <span
            className="block max-w-[150px] truncate font-medium text-gray-900 dark:text-gray-0"
            title={row.original.firstName}>
            {row.original.firstName}{" "}{row.original.lastName}
          </span>
        ),
      }),
      columnHelper.accessor("email", {
        id: "email",
        size: 150,
        header: email,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.email}
          </Text>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("phone", {
        id: "phone",
        size: 100,
        header: phone,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.phone}
          </Text>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("company", {
        id: "company",
        size: 100,
        header: company,
        cell: ({ row }) => (
          <span
            className="block max-w-[100px] truncate font-medium text-gray-900 dark:text-gray-0"
            title={row.original.company}>
            {row.original.company}
          </span>
        ),
      }),
      columnHelper.accessor("action", {
        id: "actions",
        size: 60,
        header: "",
        enablePinning: true,
        enableSorting: false,
        cell: ({
          row,
          table: {
            options: { meta },
          },
        }) => (
          <div className="flex items-center justify-end gap-3 pe-3">
            <ListPopover>
              <Link
                href={routes.crm.editLead(row.original.id ?? "")}
                aria-label="Edit Lead"
                className="flex w-full items-center gap-2 rounded-md px-2.5 py-1 font-semibold transition-colors hover:bg-gray-500/10">
                <PencilIcon className="h-4 w-4" />
                {tableT("table-text-edit")}
              </Link>
              <Link
                href={routes.crm.leadDetails(row.original.id ?? "")}
                aria-label="View Lead"
                className="flex w-full items-center gap-2 rounded-md px-2.5 py-1 font-semibold transition-colors hover:bg-gray-500/10">
                <EyeIcon className="h-4 w-4" />
                {tableT("table-text-view")}
              </Link>
              <Button
                size="sm"
                variant="text"
                color="danger"
                className="h-7 w-full justify-start gap-2 font-semibold text-title hover:bg-red/20 hover:text-red"
                onClick={() => {
                  meta?.handleDeleteRow && meta?.handleDeleteRow(row.original)
                }}>
                <TrashIcon className="h-4 w-4" />
                {tableT("table-text-delete")}
              </Button>
              <Link
                href={`/crm/opportunities/create?leadId=${row.original.id}`}
                aria-label="Opportunity create"
                className="flex w-full items-center gap-2 rounded-md px-2.5 py-1 font-semibold transition-colors hover:bg-gray-500/10">
                <LuFileText className="h-4 w-4 ml-1" />
                {tableT("table-text-generate-opportunity")}
              </Link>
              <Link
                href={`/crm/customers/create?leadId=${row.original.id}`}
                aria-label="Customer create"
                className="flex w-full items-center gap-2 rounded-md px-2.5 py-1 font-semibold transition-colors hover:bg-gray-500/10">
                <UserIcon className="h-4 w-4 ml-1" />
                {tableT("table-text-convert-to-customer")}
              </Link>
            </ListPopover>
          </div>
        ),
      }),
    ]
  }, [tableT, openDrawer])

  return columns
}
