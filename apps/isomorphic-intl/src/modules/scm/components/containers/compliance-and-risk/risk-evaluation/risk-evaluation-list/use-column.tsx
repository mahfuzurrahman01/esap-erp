"use client"

import Link from "next/link"
import { useMemo } from "react"

import { createColumnHelper } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import { ActionIcon, Checkbox, Text, Tooltip } from "rizzui"

import DeletePopover from "@/components/base/delete-popover"
import EyeIcon from "@/components/icons/eye"
import PencilIcon from "@/components/icons/pencil"
import { routes } from "@/config/routes"
import { RiskEvaluation } from "@/modules/scm/types/compliance-and-risk/risk-evaluation"
import { formatDate } from "@/utils/format-date"

import {
  getMitigationStatusOptionsBadge,
  getResidualRiskOptionsBadge,
  getRiskImpactOptionsBadge,
  getRiskProbabilityOptionsBadge,
  getRiskStatusOptionsBadge,
} from "./status-badge"

const columnHelper = createColumnHelper<RiskEvaluation>()

export const useRiskEvaluationColumn = () => {
  const t = useTranslations("form")
  const tableT = useTranslations("table")

  const columns = useMemo(() => {
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
              {t("form-risk-type")}
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
              {row.original.riskType}
            </Text>
          </div>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("riskImpact", {
        id: "riskImpact",
        size: 240,
        header: t("form-risk-impact"),
        cell: (info) =>
          getRiskImpactOptionsBadge(info.renderValue() || "pending"),
        enableSorting: true,
      }),

      columnHelper.accessor("riskProbability", {
        id: "riskProbability",
        size: 240,
        header: t("form-risk-probability"),
        cell: (info) =>
          getRiskProbabilityOptionsBadge(info.renderValue() || "pending"),
        enableSorting: true,
      }),

      columnHelper.accessor("residualRisk", {
        id: "residualRisk",
        size: 240,
        header: t("form-residual-risk"),
        cell: (info) =>
          getResidualRiskOptionsBadge(info.renderValue() || "pending"),
        enableSorting: true,
      }),
      columnHelper.accessor("followUpAction", {
        id: "followUpAction",
        size: 240,
        header: t("form-follow-up-action"),
        cell: (info) => {
          const rawText = info.renderValue() || "-"
          const textWithoutHtml = rawText.replace(/<[^>]*>/g, "")
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
        enableSorting: true,
      }),
      columnHelper.accessor("riskDescription", {
        id: "riskDescription",
        size: 240,
        header: t("form-risk-description"),
        cell: (info) => {
          const rawText = info.renderValue() || "-"
          const textWithoutHtml = rawText.replace(/<[^>]*>/g, "")
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
        enableSorting: true,
      }),
      columnHelper.accessor("mitigationAction", {
        id: "mitigationAction",
        size: 240,
        header: t("form-mitigation-action"),
        cell: (info) => {
          const rawText = info.renderValue() || "-"
          const textWithoutHtml = rawText.replace(/<[^>]*>/g, "")
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
        enableSorting: true,
      }),
      columnHelper.accessor("responsibleParty", {
        id: "responsibleParty",
        size: 240,
        header: t("form-responsible-party"),
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue() || "N/A"}
          </Text>
        ),
        enableSorting: true,
      }),
      columnHelper.accessor("mitigationDeadline", {
        id: "mitigationDeadline",
        size: 240,
        header: t("form-mitigation-deadline"),
        cell: ({ row }) => {
          const date = row.original.mitigationDeadline
            ? new Date(row.original.mitigationDeadline)
            : null
          return (
            <Text className="font-medium text-gray-900 dark:text-gray-0">
              {date ? formatDate(date, "DD/MM/YYYY") : ""}
            </Text>
          )
        },
        enableSorting: true,
      }),
      columnHelper.accessor("mitigationStatus", {
        id: "mitigationStatus",
        size: 240,
        header: t("form-mitigation-status"),
        filterFn: "statusFilter" as any,
        cell: (info) =>
          getMitigationStatusOptionsBadge(info.renderValue() || "pending"),
        enableSorting: true,
      }),
      columnHelper.accessor("riskStatus", {
        id: "riskStatus",
        size: 240,
        header: t("form-risk-status"),
        filterFn: "statusFilter" as any,
        cell: (info) =>
          getRiskStatusOptionsBadge(info.renderValue() || "pending"),
        enableSorting: true,
      }),
      columnHelper.accessor("comments", {
        id: "comments",
        size: 240,
        header: t("form-comments"),
        enableSorting: true,
        cell: (info) => {
          const rawText = info.renderValue() || "-"
          const textWithoutHtml = rawText.replace(/<[^>]*>/g, "")
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
        size: 100,
        header: "",
        enablePinning: true,
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
                href={routes.scm.complianceAndRisk.riskEvaluation.editRiskEvaluation(
                  Number(row.original.id)
                )}
                aria-label="go to risk evaluation edit">
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
                href={routes.scm.complianceAndRisk.riskEvaluation.riskEvaluationDetails(
                  Number(row.original.id)
                )}
                aria-label="go to risk evaluation details">
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
              description={`Are you sure you want to delete this risk evaluation #${row.original.id}?`}
              onDelete={() =>
                meta?.handleDeleteRow && meta?.handleDeleteRow(row.original)
              }
            />
          </div>
        ),
      }),
    ]
  }, [t, tableT])
  return columns
}
