"use client"

import Link from "next/link"
import { useMemo } from "react"

import EyeIcon from "@core/components/icons/eye"
import { createColumnHelper } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import { ActionIcon, Checkbox, Text, Tooltip } from "rizzui"

import DeletePopover from "@/components/base/delete-popover"
import PencilIcon from "@/components/icons/pencil"
import { routes } from "@/config/routes"
import { SupplierEvaluation } from "@/modules/scm/types/supplier-relationship/supplier-evaluation/supplier-evaluation-types"
import { formatDate } from "@/utils/format-date"

const columnHelper = createColumnHelper<SupplierEvaluation>()

export const useSupplierEvaluationColumn = () => {
  const t = useTranslations("form")
  const tableT = useTranslations("table")

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
              {t("form-supplier-name")}
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
              {row.original.supplierName}
            </Text>
          </div>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("overallScore", {
        id: "overallScore",
        size: 240,
        header: t("form-overall-score"),
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue() || "-"}
          </Text>
        ),
      }),
      columnHelper.accessor("evaluatorName", {
        id: "evaluatorName",
        size: 240,
        header: t("form-evaluator-name"),
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue() || "-"}
          </Text>
        ),
      }),
      columnHelper.accessor("evaluationDate", {
        id: "evaluationDate",
        size: 240,
        header: t("form-evaluation-date"),
        cell: ({ row }) => {
          const date = row.original.evaluationDate
            ? new Date(row.original.evaluationDate)
            : null
          return (
            <Text className="font-medium text-gray-900 dark:text-gray-0">
              {date ? formatDate(date, "DD/MM/YYYY") : "-"}
            </Text>
          )
        },
      }),
      columnHelper.accessor("comments", {
        id: "comments",
        size: 240,
        header: t("form-comments"),
        cell: (info) => {
          const value = info.renderValue() || "-"
          const htmlValue = value.replace(/<[^>]*>?/g, "")
          const truncatedValue =
            htmlValue.length > 20 ? `${htmlValue.slice(0, 20)}...` : htmlValue
          return (
            <Text className="font-medium text-gray-900 dark:text-gray-0">
              {truncatedValue}
            </Text>
          )
        },
      }),
      columnHelper.accessor("id", {
        id: "action",
        size: 100,
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
              content={tableT("table-text-edit")}
              placement="top"
              className="dropdown-gr card-shadow !rounded-lg border-transparent bg-paper text-title dark:bg-paper dark:text-title"
              arrowClassName="dark:fill-paper [&>path]:stroke-transparent"
              color="invert">
              <Link
                href={routes.scm.supplierRelationship.evaluationHistory.editEvaluationHistory(
                  Number(row.original.id)
                )}
                aria-label="go to stock edit">
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
              content={tableT("table-text-view")}
              placement="top"
              className="dropdown-gr card-shadow !rounded-lg border-transparent bg-paper text-title dark:bg-paper dark:text-title"
              arrowClassName="dark:fill-paper [&>path]:stroke-transparent"
              color="invert">
              <Link
                href={routes.scm.supplierRelationship.evaluationHistory.evaluationHistoryDetails(
                  Number(row.original.id)
                )}
                aria-label="go to stock transfer view">
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
              title="table-text-delete"
              description={`Are you sure you want to delete this evaluation history item #${row.original.id}?`}
              onDelete={() => {
                meta?.handleDeleteRow && meta?.handleDeleteRow(row.original)
              }}
            />
          </div>
        ),
      }),
    ],
    [t, tableT]
  )

  return columns
}
