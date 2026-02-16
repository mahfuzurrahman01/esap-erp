"use client"

import Link from "next/link"
import { useMemo, useState } from "react"

import PencilIcon from "@core/components/icons/pencil"
import { createColumnHelper } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import { ActionIcon, Text, Tooltip } from "rizzui"

import DeletePopover from "@/components/base/delete-popover"
import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import ViewIconButton from "@/components/base/view-icon-button"
import { routes } from "@/config/routes"
import { useContractById } from "@/modules/scm/hooks/procurement/supplier/use-contract"
import { Contract } from "@/modules/scm/types/procurement/supplier/contract-types"
import { ServiceLevelAgreementMonitoring } from "@/modules/scm/types/procurement/supplier/service-level-agreement-monitoring-types"

import SLAViewDrawer from "./sla-monitoring-drawer-view"

const columnHelper = createColumnHelper<ServiceLevelAgreementMonitoring>()

export const useSLAMonitoringColumn = () => {
  const t = useTranslations("form")
  const tText = useTranslations("common")
  const tableT = useTranslations("table")
  const [contractId, setContractId] = useState<number>(0)

  const { data: contractData } = useContractById(contractId) as {
    data: Contract
  }

  const { openDrawer } = useDrawer()

  const columns = useMemo(() => {
    const auditName = t("form-audit-name")
    const expectedPerformance = t("form-expected-performance")
    const actualPerformance = t("form-actual-performance")
    const auditDate = t("form-audit-date")
    const comments = t("form-comments")
    const complaintStatus = t("form-complaint-status")

    return [
      columnHelper.accessor("auditName", {
        id: "auditName",
        size: 240,
        header: auditName,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.auditName || "-"}
          </Text>
        ),
        enableSorting: false,
      }),

      columnHelper.accessor((row) => `${row.expectedPerformance}`, {
        id: "expectedPerformance",
        size: 240,
        header: expectedPerformance,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue() || "-"}
          </Text>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("actualPerformance", {
        id: "actualPerformance",
        size: 240,
        header: actualPerformance,
        enableSorting: false,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue() || "-"}
          </Text>
        ),
      }),
      columnHelper.accessor("auditDate", {
        id: "auditDate",
        size: 240,
        header: auditDate,
        enableSorting: false,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue()?.split("T")[0] ?? "-"}
          </Text>
        ),
      }),
      columnHelper.accessor("status", {
        id: "status",
        size: 240,
        header: complaintStatus,
        enableSorting: false,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue() || "-"}
          </Text>
        ),
      }),
      columnHelper.accessor("comments", {
        id: "comments",
        size: 240,
        header: comments,
        enableSorting: false,
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
            <div className="flex items-center justify-end gap-3 pe-3">
              <Tooltip
                size="sm"
                content={tableT("table-text-edit")}
                placement="top"
                className="dropdown-gr card-shadow !rounded-lg border-transparent bg-paper text-title dark:bg-paper dark:text-title"
                arrowClassName="dark:fill-paper [&>path]:stroke-transparent"
                color="invert">
                <Link
                  onClick={() =>
                    setContractId(row.original.supplierContractInfoId ?? 0)
                  }
                  href={routes.scm.procurement.suppliers.editSlaMonitoring(
                    row.original.id ?? 0,
                    row.original.supplierContractInfoId ?? 0,
                    contractData?.supplierId ?? 0
                  )}
                  aria-label="go to supplier edit">
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
                onClick={() => {
                  openDrawer({
                    view: <SLAViewDrawer initialData={row.original} />,

                    containerClassName: "max-w-[500px] overflow-auto",
                    placement: "right",
                  })
                }}
              />
              <DeletePopover
                translationObjectName="common"
                title="text-delete-supplier-category"
                description={`${tText("text-delete-supplier-category-prompt")} #${row.original.id}`}
                onDelete={() =>
                  meta?.handleDeleteRow && meta?.handleDeleteRow(row.original)
                }
              />
            </div>
          </>
        ),
      }),
    ]
  }, [t, tableT])
  return columns
}
