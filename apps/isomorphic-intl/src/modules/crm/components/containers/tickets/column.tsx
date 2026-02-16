import dynamic from "next/dynamic"
import Link from "next/link"
import { useMemo } from "react"

import { createColumnHelper } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import { ActionIcon, Checkbox, Text, Tooltip } from "rizzui"

import DeletePopover from "@/components/base/delete-popover"
import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import ListPopover from "@/components/base/list-popover"
import EyeIcon from "@/components/icons/eye"
import PencilIcon from "@/components/icons/pencil"
import SendIcon from "@/components/icons/send-icon"
import TrashIcon from "@/components/icons/trash"
import { Button } from "@/components/ui"
import { routes } from "@/config/routes"
import { TicketList } from "@/modules/crm/types/ticket"

import { getApprovalStatusBadge } from "../approvals/status-badge"
import CustomerCell from "../customers/customer-cell"
import AssignedToCell from "../user/assigned-to-cell"
import UserByEmail from "../user/user-by-email"

const TicketDrawerView = dynamic(() => import("./drawer-view"), {
  ssr: false,
})

const columnHelper = createColumnHelper<TicketList>()

export const useColumn = () => {
  const { openDrawer } = useDrawer()
  const tableT = useTranslations("table")

  const subject = tableT("table-text-subject")
  const service = tableT("table-text-service")
  const project = tableT("table-text-project")
  const customer = tableT("table-text-customer")
  const createdBy = tableT("table-text-created-by")
  const email = tableT("table-text-email")
  const status = tableT("table-text-status")
  const id = tableT("table-text-id")

  const columns = useMemo(() => {
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
      columnHelper.accessor("subject", {
        id: "subject",
        size: 100,
        header: subject,
        cell: ({ row }) => (
          <span
            className="block max-w-[100px] cursor-pointer truncate font-medium text-gray-900 dark:text-gray-0"
            title={row.original.subject}
            onClick={() =>
              openDrawer({
                view: <TicketDrawerView id={row.original.id} />,
                placement: "right",
                containerClassName: "lg:min-w-[500px] dropdown-gr",
              })
            }>
            {row.original.subject}
          </span>
        ),
      }),
      columnHelper.accessor("service", {
        id: "service",
        size: 120,
        header: service,
        cell: ({ row }) => (
          <span
            className="block max-w-[100px] truncate font-medium text-gray-900 dark:text-gray-0"
            title={row.original.service}>
            {row.original.service}
          </span>
        ),
      }),
      columnHelper.accessor("departmentId", {
        id: "departmentId",
        size: 100,
        header: customer,
        cell: ({ row }) => {
          return (
            <Link
              href={routes.crm.viewCustomer(row.original.departmentId ?? "")}>
              <CustomerCell customerId={row.original.departmentId} />
            </Link>
          )
        },
      }),
      columnHelper.accessor("email", {
        id: "email",
        size: 100,
        header: email,
        cell: ({ row }) => (
          <span
            className="block max-w-[100px] truncate font-medium text-gray-900 dark:text-gray-0"
            title={row.original.email}>
            {row.original.email}
          </span>
        ),
      }),
      columnHelper.accessor("createdBy", {
        id: "createdBy",
        size: 150,
        header: createdBy,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.createdBy}
          </Text>
        ),
      }),
      columnHelper.accessor("status", {
        id: "status",
        size: 100,
        header: status,
        cell: (row) =>
          row.renderValue() && getApprovalStatusBadge(row.renderValue()),
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
          <>
            <div className="flex items-center justify-end gap-3 pe-3">
              <Tooltip
                size="sm"
                content={tableT("table-text-edit-ticket")}
                placement="top"
                className="dropdown-gr card-shadow !rounded-lg border-transparent bg-paper text-title dark:bg-paper dark:text-title"
                arrowClassName="dark:fill-paper [&>path]:stroke-transparent"
                color="invert">
                <Link href={routes.crm.editTicket(row.original.id ?? "")}>
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
                content={tableT("table-text-view-ticket")}
                placement="top"
                className="dropdown-gr card-shadow !rounded-lg border-transparent bg-paper text-title dark:bg-paper dark:text-title"
                arrowClassName="dark:fill-paper [&>path]:stroke-transparent"
                color="invert">
                <ActionIcon
                  as="button"
                  size="sm"
                  variant="outline"
                  rounded="lg"
                  className="h-6 w-7 border-gray-500/20"
                  onClick={() => {
                    openDrawer({
                      view: <TicketDrawerView id={row.original.id} />,
                      placement: "right",
                      containerClassName: "lg:min-w-[500px] dropdown-gr",
                    })
                  }}>
                  <EyeIcon className="h-4 w-4" />
                </ActionIcon>
              </Tooltip>
              <DeletePopover
                title="table-text-delete-ticket"
                description={tableT("table-text-delete-confirm-ticket")}
                onDelete={() =>
                  meta?.handleDeleteRow && meta?.handleDeleteRow(row.original)
                }
              />
            </div>
          </>
        ),
      }),
    ]
  }, [tableT])

  return columns
}
