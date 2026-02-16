"use client"

import Link from "next/link"
import { useMemo } from "react"

import { createColumnHelper } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import { Checkbox, Text } from "rizzui"

import ListPopover from "@/components/base/list-popover"
import EyeIcon from "@/components/icons/eye"
import PencilIcon from "@/components/icons/pencil"
import TrashIcon from "@/components/icons/trash"
import { Button } from "@/components/ui"
import { routes } from "@/config/routes"
import { Compliance } from "@/modules/scm/types/compliance-and-risk/compliance-types"
import { formatDate } from "@/utils/format-date"

import { getComplianceStatusBadge } from "./status-badge"

const columnHelper = createColumnHelper<Compliance>()

export const useComplianceColumn = () => {
  const t = useTranslations("form")
  const tableT = useTranslations("table")

  const columns = useMemo(() => {
    const complianceArea = t("form-compliance-area")
    const regulationStandard = t("form-regulation-standard")
    const taskName = t("form-task-name")
    const assignedToName = t("form-assigned-to-name")
    const dueDate = t("form-due-date")
    const completionStatus = t("form-completion-status")
    const comments = t("form-comments")

    return [
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
              {complianceArea}
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
              {row.original.complianceArea}
            </Text>
          </div>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("regulationStandard", {
        id: "regulationStandard",
        size: 240,
        header: regulationStandard,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue() || "N/A"}
          </Text>
        ),
        enableSorting: true,
      }),

      columnHelper.accessor("taskName", {
        id: "taskName",
        size: 240,
        header: taskName,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue() || "N/A"}
          </Text>
        ),
        enableSorting: true,
      }),

      columnHelper.accessor("assignedToName", {
        id: "assignedToName",
        size: 240,
        header: assignedToName,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue() || "N/A"}
          </Text>
        ),
        enableSorting: true,
      }),
      columnHelper.accessor("dueDate", {
        id: "dueDate",
        size: 240,
        header: dueDate,
        cell: ({ row }) => {
          const date = row.original.dueDate
            ? new Date(row.original.dueDate)
            : null
          return (
            <Text className="font-medium text-gray-900 dark:text-gray-0">
              {date ? formatDate(date, "DD/MM/YYYY") : ""}
            </Text>
          )
        },
        enableSorting: true,
      }),
      columnHelper.accessor("completionStatus", {
        id: "completionStatus",
        size: 240,
        header: completionStatus,
        filterFn: "statusFilter" as any,
        cell: (info) =>
          getComplianceStatusBadge(info.renderValue() || "pending"),
        enableSorting: true,
      }),
      columnHelper.accessor("comments", {
        id: "comments",
        size: 240,
        header: comments,
        enableSorting: true,
        cell: (info) => {
          const rawText = info.renderValue() || "-"
          const textWithoutHtml = rawText.replace(/<[^>]*>/g, "")
          // const words = textWithoutHtml.split(" ")
          const truncatedText =
            textWithoutHtml.length > 20
              ? `${textWithoutHtml.substring(0, 20)}...`
              : textWithoutHtml

          return (
            <Text className="font-medium text-gray-900 dark:text-gray-0">
              {truncatedText}
            </Text>
          )
        },
      }),
      columnHelper.accessor("id", {
        id: "action",
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
            <div className="flex items-center justify-end">
              <ListPopover>
                <Link
                  href={routes.scm.complianceAndRisk.compliance.editCompliance(
                    Number(row.original.id)
                  )}
                  aria-label="Edit Compliance"
                  className="flex w-full items-center gap-2 rounded-md px-2.5 py-1 font-semibold transition-colors hover:bg-gray-500/10">
                  <PencilIcon className="h-4 w-4" />
                  {tableT("table-text-edit")}
                </Link>
                <Link
                  href={routes.scm.complianceAndRisk.compliance.complianceDetails(
                    Number(row.original.id)
                  )}
                  aria-label="View Compliance"
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
          </>
        ),
      }),
    ]
  }, [t, tableT])
  return columns
}
