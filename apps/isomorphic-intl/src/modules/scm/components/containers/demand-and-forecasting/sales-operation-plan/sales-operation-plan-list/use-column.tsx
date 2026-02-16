"use client"

import Link from "next/link"
import { useMemo } from "react"

import { createColumnHelper } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import { Checkbox, Text } from "rizzui"

import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import ListPopover from "@/components/base/list-popover"
import EyeIcon from "@/components/icons/eye"
import PencilIcon from "@/components/icons/pencil"
import ApproveIcon from "@/components/icons/scm/approve-icon"
import { GeneratePoIcon } from "@/components/icons/scm/generate-po-icon"
import TrashIcon from "@/components/icons/trash"
import { Button } from "@/components/ui"
import { routes } from "@/config/routes"
import { SalesOperationPlan } from "@/modules/scm/types/demand-and-forecasting/sales-operation-plan/sales-operation-plan-types"
import { formatDate } from "@/utils/format-date"

import { getApprovalStatusBadge } from "../create-sales-operation-plan/status-option"
import SalesOperationPlanViewDrawer from "./forecast-view-drawer"
import SalesOperationApprovalForm from "./sales-operation-approval-form"
import { useCurrentRole } from "@/hooks/use-current-role"

const columnHelper = createColumnHelper<SalesOperationPlan>()

export const useSalesOperationPlanColumn = () => {
  const t = useTranslations("form")
  const tableT = useTranslations("table")

  const { openDrawer } = useDrawer()
  const { hasAnyRole } = useCurrentRole()
  const isAuthority = hasAnyRole(["Super Admin", "SCM Admin"])

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
              {t("form-sku")}
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
              {row.original.sku}
            </Text>
          </div>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("productName", {
        id: "productName",
        size: 240,
        header: t("form-product-name"),
        enableSorting: true,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue() || "-"}
          </Text>
        ),
      }),
      columnHelper.accessor("forecastPeriod", {
        id: "forecastPeriod",
        size: 240,
        header: t("form-forecast-period"),
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue() || "-"}
          </Text>
        ),
        enableSorting: true,
      }),
      columnHelper.accessor("currentSalesData", {
        id: "currentSalesData",
        size: 240,
        header: t("form-current-sales-data"),
        enableSorting: true,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue() || "-"}
          </Text>
        ),
      }),
      columnHelper.accessor("adjustedForecast", {
        id: "adjustedForecast",
        size: 240,
        header: t("form-adjusted-forecast"),
        enableSorting: true,
        cell: (info) => {
          return (
            <Text className="font-medium text-gray-900 dark:text-gray-0">
              {info.renderValue() || "-"}
            </Text>
          )
        },
      }),

      columnHelper.accessor("plannedSalesTarget", {
        id: "plannedSalesTarget",
        size: 240,
        header: t("form-planned-sales-target"),
        enableSorting: true,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue() || "-"}
          </Text>
        ),
      }),
      columnHelper.accessor("demandVariationPercentage", {
        id: "demandVariationPercentage",
        size: 300,
        enableSorting: true,
        header: t("form-demand-variation-percentage"),
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue() || "-"}
          </Text>
        ),
      }),
      columnHelper.accessor("approvalStatus", {
        id: "approvalStatus",
        size: 240,
        enableSorting: true,
        header: t("form-approval-status"),
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {getApprovalStatusBadge(info.renderValue() || "pending")}
          </Text>
        ),
      }),
      columnHelper.accessor("createdDate", {
        id: "createdDate",
        size: 240,
        header: t("form-created-date"),
        enableSorting: true,
        cell: ({ row }) => {
          const date = row.original.createdDate
            ? new Date(row.original.createdDate)
            : null
          return (
            <Text className="font-medium text-gray-900 dark:text-gray-0">
              {date ? formatDate(date, "DD/MM/YYYY") : "-"}
            </Text>
          )
        },
      }),
      columnHelper.accessor("updatedDate", {
        id: "updatedDate",
        size: 240,
        header: t("form-updated-date"),
        enableSorting: true,
        cell: ({ row }) => {
          const date = row.original.updatedDate
            ? new Date(row.original.updatedDate)
            : null
          return (
            <Text className="font-medium text-gray-900 dark:text-gray-0">
              {date ? formatDate(date, "DD/MM/YYYY") : "-"}
            </Text>
          )
        },
      }),
      columnHelper.accessor("productId", {
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
                href={routes.scm.demandForecasting.salesOperationsPlan.editSalesOperationPlan(
                  Number(row.original.id)
                )}
                aria-label="Edit Sales Operation Plan"
                className="flex w-full items-center gap-2 rounded-md px-2.5 py-1 font-semibold transition-colors hover:bg-gray-500/10">
                <PencilIcon className="h-4 w-4" />
                {tableT("table-text-edit")}
              </Link>
              <Button
                as="span"
                className="dark:text-title-dark dark:bg-paper-dark h-7 w-full cursor-pointer justify-start gap-2 bg-transparent !px-2.5 font-semibold text-title transition-colors hover:bg-gray-500/10 dark:hover:bg-gray-600/10"
                onClick={() =>
                  openDrawer({
                    view: (
                      <SalesOperationPlanViewDrawer
                        initialData={row.original}
                      />
                    ),
                    placement: "right",
                    containerClassName: "max-w-[30rem]",
                  })
                }>
                <EyeIcon className="h-4 w-4" />
                {tableT("table-text-view")}
              </Button>
              { isAuthority && row.original.approvalStatus === null && (
                <Button
                  as="span"
                  className="dark:text-title-dark dark:bg-paper-dark h-7 w-full cursor-pointer justify-start gap-2 bg-transparent !px-2.5 font-semibold text-title transition-colors hover:bg-gray-500/10 dark:hover:bg-gray-600/10"
                  onClick={() =>
                    openDrawer({
                      view: (
                        <SalesOperationApprovalForm
                          initialData={row.original}
                          salesOperationId={row.original.id!}
                        />
                      ),
                      placement: "right",
                      containerClassName: "max-w-[25.25rem]",
                    })
                  }>
                  <ApproveIcon className="h-4 w-4" />
                  {tableT("table-text-approval")}
                </Button>
              )}
              {row.original.approvalStatus === "approved" && (
                <Link
                  href={routes.scm.demandForecasting.salesOperationsPlan.createRequisition(
                    Number(row.original.id)
                  )}
                  aria-label="Edit Sales Operation Plan"
                  className="flex w-full items-center gap-2 rounded-md px-2.5 py-1 font-semibold transition-colors hover:bg-gray-500/10">
                  <GeneratePoIcon className="h-4 w-4" />
                  {tableT("table-text-create-requisition")}
                </Link>
              )}
              {
                isAuthority && (
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
                )
              }
            </ListPopover>
          </div>
        ),
      }),
    ],
    [t, tableT, openDrawer]
  )

  return columns
}
