import Link from "next/link"
import { useMemo } from "react"

import { createColumnHelper } from "@tanstack/react-table"
import dayjs from "dayjs"
import { useTranslations } from "next-intl"
import { ActionIcon, Checkbox, Text, Tooltip } from "rizzui"

import DeletePopover from "@/components/base/delete-popover"
import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import EyeIcon from "@/components/icons/eye"
import PencilIcon from "@/components/icons/pencil"
import { routes } from "@/config/routes"
import { OpportunityList } from "@/modules/crm/types/opportunity"

import CustomerCell from "../customers/customer-cell"
import { formatDate } from "@/utils/format-date"

const columnHelper = createColumnHelper<OpportunityList>()

export const useColumn = () => {
  const { openDrawer } = useDrawer()
  const tableT = useTranslations("table")

  const columns = useMemo(() => {
    const lead = tableT("table-text-lead")
    const customer = tableT("table-text-customer")
    const closingDate = tableT("table-text-closing-date")
    const amount = tableT("table-text-amount")
    const probability = tableT("table-text-probability")
    const stage = tableT("table-text-stage")
    const id = tableT("table-text-id")
    const name = tableT("table-text-name")

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
            <Text
              className="cursor-pointer font-medium text-gray-900 dark:text-gray-0">
              {row.original.shortOrder}
            </Text>
          </div>
        ),
      }),
      columnHelper.accessor("name", {
        id: "name",
        size: 100,
        header: name,
        cell: ({ row }) => (
          <Link href={routes.crm.viewOpportunity(row.original.id ?? "")}>
            <span className="block max-w-[100px] truncate font-medium text-gray-900 dark:text-gray-0 cursor-pointer">
              {row.original.name}
            </span>
          </Link>
        ),
      }),
      columnHelper.accessor("lead", {
        id: "lead",
        size: 100,
        header: lead,
        cell: ({ row }) => (
          <span className="block max-w-[100px] truncate font-medium text-gray-900 dark:text-gray-0">
            {row.original.lead?.title}
          </span>
        ),
      }),
      columnHelper.accessor("customerId", {
        id: "customerId",
        size: 150,
        header: customer,
        cell: ({ row }) => {
          return <Link
          href={routes.crm.viewCustomer(row.original.customerId ?? "")}><CustomerCell customerId={row.original.customerId} /></Link>
        },
        enableSorting: false,
      }),
      columnHelper.accessor("closingDate", {
        id: "closingDate",
        size: 130,
        header: closingDate,
        cell: ({ row }) => {
          const date = row.original.closingDate 
            ? new Date(row.original.closingDate) 
            : null;
          return (
            <Text className="font-medium text-gray-900 dark:text-gray-0">
              {date ? formatDate(date, "DD/MM/YYYY") : ""}
            </Text>
          );
        },
      }),
      columnHelper.accessor("amount", {
        id: "amount",
        size: 50,
        header: amount,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.amount}
          </Text>
        ),
      }),
      columnHelper.accessor("stage", {
        id: "stage",
        size: 100,
        header: stage,
        cell: ({ row }) => (
          <span
            className="block max-w-[100px] truncate font-medium text-gray-900 dark:text-gray-0"
            title={row.original.stage}>
            {row.original.stage}
          </span>
        ),
        enableSorting: false,
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
            <Tooltip
              size="sm"
              content={tableT("table-text-edit")}
              placement="top"
              className="dropdown-gr card-shadow !rounded-lg border-transparent bg-paper text-title dark:bg-paper dark:text-title"
              arrowClassName="dark:fill-paper [&>path]:stroke-transparent"
              color="invert">
              <Link
                href={routes.crm.editOpportunity(row.original.id ?? "")}
                aria-label="Edit opportunity">
                <ActionIcon
                  as="button"
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
              content={tableT("table-text-view")}
              placement="top"
              className="dropdown-gr card-shadow !rounded-lg border-transparent bg-paper text-title dark:bg-paper dark:text-title"
              arrowClassName="dark:fill-paper [&>path]:stroke-transparent"
              color="invert">
              <Link href={routes.crm.viewOpportunity(row.original.id ?? "")}>
              <ActionIcon
                as="button"
                size="sm"
                variant="outline"
                rounded="lg"
                className="h-6 w-7 border-gray-500/20">
                <EyeIcon className="h-4 w-4" />
              </ActionIcon>
              </Link>
            </Tooltip>
            <DeletePopover
              title="table-text-delete"
              description={tableT("table-text-delete-confirm-opportunity")}
              onDelete={() =>
                meta?.handleDeleteRow && meta?.handleDeleteRow(row.original)
              }
            />
          </div>
        ),
      }),
    ]
  }, [tableT, openDrawer])

  return columns
}
