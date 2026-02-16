import dynamic from "next/dynamic"
import { useMemo } from "react"

import { createColumnHelper } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import { ActionIcon, Checkbox, Text, Tooltip } from "rizzui"

import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import EyeIcon from "@/components/icons/eye"
import { taskStatusOptions } from "@/data/crm/campaign"
import { TaskList } from "@/modules/crm/types/task"

import { getApprovalStatusBadge } from "../approvals/status-badge"
import PencilIcon from "@core/components/icons/pencil"
import DeletePopover from "@/components/base/delete-popover"
import { formatDate } from "@/utils/format-date"

const TaskDrawerView = dynamic(() => import("./drawer-view"), {
  ssr: false,
})

const columnHelper = createColumnHelper<TaskList>()

export const useColumn = () => {
  const { openDrawer } = useDrawer()
  const tableT = useTranslations("table")

  const subject = tableT("table-text-subject")
  const startDate = tableT("table-text-start-date")
  const endDate = tableT("table-text-end-date")
  const priority = tableT("table-text-priority")
  const status = tableT("table-text-status")
  const assignedTo = tableT("table-text-assigned-to")
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
            className="block max-w-[100px] truncate font-medium text-gray-900 dark:text-gray-0 cursor-pointer"
            title={row.original.subject}
            onClick={() =>
              openDrawer({
                view: <TaskDrawerView id={row.original.id} view />,
                placement: "right",
                containerClassName: "lg:min-w-[26.25rem] dropdown-gr",
              })
            }>
            {row.original.subject}
          </span>
        ),
      }),
      columnHelper.accessor("ticketSubject", {
        id: "ticketSubject",
        size: 100,
        header: "ticket",
        cell: ({ row }) => (
          <span
            className="block max-w-[100px] truncate font-medium text-gray-900 dark:text-gray-0"
            title={row.original.ticketSubject}>
            {row.original.ticketSubject}
          </span>
        ),
      }),
      columnHelper.accessor("dueDate", {
        id: "dueDate",
        size: 100,
        header: endDate,
        cell: ({ row }) => {
          const date = row.original.dueDate 
            ? new Date(row.original.dueDate) 
            : null;
          return (
            <Text className="font-medium text-gray-900 dark:text-gray-0">
              {date ? formatDate(date, "DD/MM/YYYY") : ""}
            </Text>
          );
        },
      }),
      columnHelper.accessor("assignedTo", {
        id: "assignedTo",
        size: 240,
        header: assignedTo,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.assignedTo}
          </Text>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("priority", {
        id: "priority",
        size: 100,
        header: priority,
        cell: (row) => row.renderValue() && getApprovalStatusBadge(row.renderValue()),
        enableSorting: false,
      }),
      columnHelper.accessor("status", {
        id: "status",
        size: 100,
        header: status,
        cell: ({ row }) => {
          const statusLabel =
            taskStatusOptions.find(
              (option) => option.value === row.original.status
            )?.label || row.original.status
          return row.original.status ? getApprovalStatusBadge(statusLabel) : null
        },
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
                <ActionIcon
                  as="button"
                  size="sm"
                  variant="outline"
                  rounded="lg"
                  className="h-6 w-7 border-gray-500/20"
                  onClick={() => {
                    openDrawer({
                      view: <TaskDrawerView id={row.original.id} />,
                      placement: "right",
                      containerClassName: "lg:min-w-[26.25rem] dropdown-gr",
                    })
                  }}>
                  <PencilIcon className="h-4 w-4" />
                </ActionIcon>
            </Tooltip>
            <Tooltip
              size="sm"
              content={tableT("table-text-view")}
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
                    view: <TaskDrawerView id={row.original.id} view />,
                    placement: "right",
                    containerClassName: "lg:min-w-[26.25rem] dropdown-gr",
                  })
                }}>
                <EyeIcon className="h-4 w-4" />
              </ActionIcon>
            </Tooltip>
            <DeletePopover
              title="table-text-delete"
              description={`${tableT("table-text-delete-confirm-task")}`}
              onDelete={() =>
                meta?.handleDeleteRow && meta?.handleDeleteRow(row.original)
              }
            />
          </div>
        ),
      }),
    ]
  }, [tableT])

  return columns
}
