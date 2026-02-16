"use client";

import Link from "next/link";
import { useMemo } from "react";



import { createColumnHelper } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { ActionIcon, Checkbox, Text, Tooltip } from "rizzui";



import DeletePopover from "@/components/base/delete-popover";
import { useDrawer } from "@/components/base/drawer-views/use-drawer";
import ViewIconButton from "@/components/base/view-icon-button";
import PencilIcon from "@/components/icons/pencil";
import { routes } from "@/config/routes";
import { RiskAssessment } from "@/modules/scm/types/supplier-relationship/risk-assessment/risk-assessment-types";



import RiskAssessmentViewDrawer from "./risk-assessment-view-drawer";





const columnHelper = createColumnHelper<RiskAssessment>()

export const useRiskAssessmentColumn = () => {
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
      columnHelper.accessor("riskType", {
        id: "riskType",
        size: 240,
        header: t("form-risk-type"),
        enableSorting: true,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue() || "-"}
          </Text>
        ),
      }),
      columnHelper.accessor("riskDescription", {
        id: "riskDescription",
        size: 240,
        header: t("form-risk-description"),
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
      columnHelper.accessor("mitigationPlan", {
        id: "mitigationPlan",
        size: 240,
        enableSorting: true,
        header: t("form-mitigation-plan"),
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
      columnHelper.accessor("riskStatus", {
        id: "riskStatus",
        size: 240,
        header: t("form-risk-status"),
        enableSorting: true,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue() || "-"}
          </Text>
        ),
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
                href={routes.scm.supplierRelationship.riskAssessment.editRiskAssessment(
                  Number(row.original.id)
                )}
                aria-label="go to risk assessment edit">
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

            <ViewIconButton
              onClick={() =>
                openDrawer({
                  view: <RiskAssessmentViewDrawer initialData={row.original} />,
                  placement: "right",
                })
              }
            />

            <DeletePopover
              title="table-text-delete"
              description={`Are you sure you want to delete this risk assessment #${row.original.id}?`}
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