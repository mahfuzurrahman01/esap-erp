"use client"

import Link from "next/link"
import { useMemo } from "react"

import EyeIcon from "@core/components/icons/eye"
import PencilIcon from "@core/components/icons/pencil"
import { createColumnHelper } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import { Checkbox, Text } from "rizzui"

import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import ListPopover from "@/components/base/list-popover"
import { SendArrow } from "@/components/icons/scm/send-arrow"
import TrashIcon from "@/components/icons/trash"
import { Button } from "@/components/ui"
import { routes } from "@/config/routes"
import { useRequisitionById } from "@/modules/scm/hooks/procurement/requisition/use-requisition"
import { Requisition } from "@/modules/scm/types/procurement/requisition/requisition-types"
import { formatDate } from "@/utils/format-date"

import RequisitionApprovalForm from "../requisition-approval"
import {
  getApprovalStatusBadge,
  getPriorityStatusBadge,
} from "./status-badge"
import ApproveIcon from "@/components/icons/scm/approve-icon"
import { getBillingStatusBadge } from "@/modules/scm/components/base/billing-status-badge"
import { useCurrentRole } from "@/hooks/use-current-role"

const columnHelper = createColumnHelper<Requisition>()

export const useRequisitionColumn = () => {
  const t = useTranslations("form")
  const tableT = useTranslations("table")

  const { openDrawer } = useDrawer()

  const { hasAnyRole } = useCurrentRole()
  const isAuthority = hasAnyRole(["Super Admin", "SCM Admin"])

  const columns = useMemo(() => {
    const supplierName = t("form-supplier-name")
    const requestedBy = t("form-requested-by")
    const expectedDeliveryDate = t("form-expected-delivery-date")
    const status = t("form-status")
    const priority = t("form-priority")
    const approvalStatus = t("form-approval-status")
    const requisitionNo = t("form-requisition-no")
    const fiscalPosition = t("form-fiscal-position")
    return [
      columnHelper.accessor("id", {
        id: "id",
        size: 350,
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
              {requisitionNo}
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
              {row.original.requisitionNo}
            </Text>
          </div>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor((row) => `${row?.supplierName}`, {
        id: "supplierName",
        size: 240,
        header: supplierName,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue() || "-"}
          </Text>
        ),
        enableSorting: true,
      }),
      columnHelper.accessor("requestedBy", {
        id: "requestedBy",
        size: 240,
        header: requestedBy,
        enableSorting: true,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue() || "-"}
          </Text>
        ),
      }),
      columnHelper.accessor("expectedDeliveryDate", {
        id: "expectedDeliveryDate",
        size: 240,
        header: expectedDeliveryDate,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {formatDate(row.original.expectedDeliveryDate, "DD/MM/YYYY")}
          </Text>
        ),
      }),
      columnHelper.accessor("billingStatus", {
        id: "billingStatus",
        size: 240,
        header: status,
        // filterFn: "statusFilter" as any,
        enableSorting: true,
        cell: (info) => getBillingStatusBadge(info.renderValue() || "pending"),
      }),
      columnHelper.accessor("approvalStatus", {
        id: "approvalStatus",
        size: 240,
        header: approvalStatus,
        // filterFn: "statusFilter" as any,
        enableSorting: true,
        cell: (info) => getApprovalStatusBadge(info.renderValue() || "pending"),
      }),
      columnHelper.accessor("priority", {
        id: "priority",
        size: 240,
        header: priority,
        enableSorting: true,
        cell: (info) => getPriorityStatusBadge(info.renderValue() || "pending"),
      }),

      columnHelper.accessor("fiscalPosition", {
        id: "fiscalPosition",
        size: 240,
        header: fiscalPosition,
        enableSorting: true,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue()?.toUpperCase() || "-"}
          </Text>
        ),
      }),
      columnHelper.accessor("requisitionItemDtos.id", {
        id: "action",
        size: 60,
        header: "",
        // enablePinning: true,
        enableSorting: false,
        cell: ({
          row,
          table: {
            options: { meta },
          },
        }) => {
          return (
            <>
              <div className="flex items-center justify-end">
                <ListPopover>
                  <Link
                    href={routes.scm.procurement.requisitions.editRequisitions(
                      Number(row.original.id)
                    )}
                    aria-label="Edit Requisition"
                    className="flex w-full items-center gap-2 rounded-md px-2.5 py-1 font-semibold transition-colors hover:bg-gray-500/10">
                    <PencilIcon className="h-4 w-4" />
                    {tableT("table-text-edit")}
                  </Link>
                  <Link
                    href={routes.scm.procurement.requisitions.requisitionDetails(
                      Number(row.original.id)
                    )}
                    aria-label="View Requisition"
                    className="flex w-full items-center gap-2 rounded-md px-2.5 py-1 font-semibold transition-colors hover:bg-gray-500/10">
                    <EyeIcon className="h-4 w-4" />
                    {tableT("table-text-view")}
                  </Link>
                  <Link
                    href={routes.scm.procurement.requisitions.sendByEmail(
                      Number(row.original.id)
                    )}
                    aria-label="Send By Email"
                    className="flex w-full items-center gap-2 rounded-md px-2.5 py-1 font-semibold transition-colors hover:bg-gray-500/10">
                    <SendArrow className="h-4 w-4" />
                    {tableT("table-text-send-by-email")}
                  </Link>
                  {/* {row.original.approvalStatus === " approved" && (
                    <Link
                      href={routes.scm.procurement.requisitions.generatePo(
                        Number(row.original.id)
                      )}
                      aria-label="Generate PO"
                      className="flex w-full items-center gap-2 rounded-md px-2.5 py-1 font-semibold transition-colors hover:bg-gray-500/10">
                      <GeneratePoIcon className="h-4 w-4" />
                      {tableT("table-text-generate-po")}
                    </Link>
                  )} */}
                  {isAuthority && row.original.approvalStatus === null && (
                    <Button
                      as="span"
                      className="dark:text-title-dark dark:bg-paper-dark h-7 !px-2.5 w-full cursor-pointer justify-start gap-2 bg-transparent  font-semibold text-title transition-colors hover:bg-gray-500/10 dark:hover:bg-gray-600/10"
                      onClick={() =>
                        openDrawer({
                          view: (
                            <RequisitionApprovalForm
                              requisitionId={Number(row.original.id)}
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
                  {
                    isAuthority && (
                      <Button
                    size="sm"
                    variant="text"
                    color="danger"
                    className="h-7 w-full justify-start gap-2 !px-2.5 font-semibold text-title hover:bg-red/20 hover:text-red"
                    onClick={() => {
                      meta?.handleDeleteRow &&
                        meta?.handleDeleteRow(row.original)
                    }}>
                    <TrashIcon className="h-4 w-4" />
                    {tableT("table-text-delete")}
                  </Button>
                    )
                  }
                </ListPopover>
              </div>
            </>
          )
        },
      }),
    ]
  }, [t, tableT, useRequisitionById])
  return columns
}
