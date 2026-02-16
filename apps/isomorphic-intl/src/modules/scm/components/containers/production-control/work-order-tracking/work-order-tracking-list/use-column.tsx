"use client"

import Link from "next/link"
import { useMemo } from "react"

import EyeIcon from "@core/components/icons/eye"
import { createColumnHelper } from "@tanstack/react-table"
import dayjs from "dayjs"
import { useTranslations } from "next-intl"
import { Checkbox, Text } from "rizzui"

import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import ListPopover from "@/components/base/list-popover"
import PencilIcon from "@/components/icons/pencil"
import TrashIcon from "@/components/icons/trash"
import { Button } from "@/components/ui"
import { routes } from "@/config/routes"
import { WorkOrder } from "@/modules/scm/types/production-control/work-order-tracking/work-order-types"

import { getWorkOrderTrackingStatusBadge } from "./status-badge"

const columnHelper = createColumnHelper<WorkOrder>()

export const useWorkOrderTrackingColumn = () => {
  const t = useTranslations("form")
  const tableT = useTranslations("table")

  const { openDrawer } = useDrawer()

  const columns = useMemo(
    () => [
      columnHelper.accessor("id", {
        id: "id",
        size: 300,
        header: ({ table }) => (
          <div className="flex items-center gap-2">
            <Checkbox
              aria-label="Select all rows"
              checked={table.getIsAllPageRowsSelected()}
              onChange={() => table.toggleAllPageRowsSelected()}
              className="h-[18px] w-[18px]"
              inputClassName="w-[18px] h-[18px] border-gray-600 dark:border-gray-500"
              iconClassName="w-[18px] h-[18px]"
            />
            <Text className="ms-2 font-medium text-gray-900 dark:text-gray-500">
              {t("form-work-order-name")}
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
              inputClassName="w-[18px] h-[18px] border-gray-600 dark:border-gray-500"
              iconClassName="w-[18px] h-[18px]"
            />
            <Text className="ms-2 font-medium text-gray-900 dark:text-gray-0">
              {row.original.workOrderName}
            </Text>
          </div>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("assignedToName", {
        id: "assignedToName",
        size: 240,
        header: t("form-assigned-to"),
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue()}
          </Text>
        ),
        enableSorting: true,
      }),

      columnHelper.accessor("workCenterName", {
        id: "workCenterName",
        size: 240,
        header: t("form-work-center-name"),
        cell: (info) => {
          const workCenterName = info.getValue()
          return (
            <Text className="font-medium text-gray-900 dark:text-gray-0">
              {workCenterName ? workCenterName : "-"}
            </Text>
          )
        },
        enableSorting: true,
      }),
      columnHelper.accessor("quantity", {
        id: "quantity",
        size: 240,
        header: t("form-quantity"),
        cell: (info) => {
          const quantity = info.getValue()
          return (
            <Text className="font-medium text-gray-900 dark:text-gray-0">
              {quantity ? quantity : "-"}
            </Text>
          )
        },
        enableSorting: true,
      }),
      columnHelper.accessor("expectedDuration", {
        id: "expectedDuration",
        size: 240,
        header: t("form-expected-duration"),
        cell: (info) => {
          const expectedDuration = info.getValue()
          return (
            <Text className="font-medium text-gray-900 dark:text-gray-0">
              {expectedDuration ? expectedDuration : "-"}
            </Text>
          )
        },
        enableSorting: true,
      }),
      columnHelper.accessor("jobDescription", {
        id: "jobDescription",
        size: 240,
        header: t("form-job-description"),
        cell: (info) => {
          const jobDescription = info.getValue()
          return (
            <Text className="font-medium text-gray-900 dark:text-gray-0">
              {jobDescription ? jobDescription : "-"}
            </Text>
          )
        },
        enableSorting: true,
      }),
      columnHelper.accessor("estCompletionStart", {
        id: "estCompletionStart",
        size: 300,
        header: t("form-est-completion-start"),
        cell: (info) => {
          const estCompletionStart = info.getValue()
          return (
            <Text className="font-medium text-gray-900 dark:text-gray-0">
              {estCompletionStart
                ? dayjs(estCompletionStart).format("DD/MM/YYYY")
                : "-"}
            </Text>
          )
        },
        enableSorting: true,
      }),
      columnHelper.accessor("estCompletionEnd", {
        id: "estCompletionEnd",
        size: 300,
        header: t("form-est-completion-end"),
        cell: (info) => {
          const estCompletionEnd = info.getValue()
          return (
            <Text className="font-medium text-gray-900 dark:text-gray-0">
              {estCompletionEnd
                ? dayjs(estCompletionEnd).format("DD/MM/YYYY")
                : "-"}
            </Text>
          )
        },
        enableSorting: true,
      }),
      columnHelper.accessor("workProgress", {
        id: "workProgress",
        size: 240,
        header: t("form-work-progress"),
        cell: (info) => {
          const value = info.renderValue()
          return getWorkOrderTrackingStatusBadge(value)
        },
        enableSorting: true,
      }),
      columnHelper.accessor("id", {
        id: "action",
        size: 60,
        header: "",
        cell: ({
          row,
          table: {
            options: { meta },
          },
        }) => (
          <div className="flex items-center justify-end">
            <ListPopover>
              <Link
                href={routes.scm.productionControl.workOrderTracking.editWorkOrderTracking(
                  Number(row.original.id)
                )}
                aria-label="Edit Material Availability"
                className="flex w-full items-center gap-2 rounded-md px-2.5 py-1 font-semibold transition-colors hover:bg-gray-500/10">
                <PencilIcon className="h-4 w-4" />
                {tableT("table-text-edit")}
              </Link>
              <Link
                href={routes.scm.productionControl.workOrderTracking.workOrderTrackingDetails(
                  Number(row.original.id)
                )}
                aria-label="View Work Order Tracking"
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
            </ListPopover>
          </div>
        ),
      }),
    ],
    [t, tableT, openDrawer]
  )

  return columns
}
