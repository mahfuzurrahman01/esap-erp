"use client";

import { useMemo } from "react";



import { createColumnHelper } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { Checkbox, Text } from "rizzui";



import DeletePopover from "@/components/base/delete-popover";
import { useDrawer } from "@/components/base/drawer-views/use-drawer";
import EditIconButton from "@/components/base/edit-icon-button";
import ViewIconButton from "@/components/base/view-icon-button";
import { StockReplanishmentApproval } from "@/modules/scm/types/inventory/stock-replanishment/stock-replanishment-approval-types";
import { formatDate } from "@/utils/format-date";



import { getListApprovalStatusBadge } from "./status-option";
import StockReplenishmentApprovalFormDrawerForm from "./stock-replenishment-approval-drawer-form";
import StockReplenishmentApprovalDrawerView from "./stock-replenishment-approval-drawer-view";
import { useCurrentRole } from "@/hooks/use-current-role";





const columnHelper = createColumnHelper<StockReplanishmentApproval>()

export const useStockReplenishmentApprovalTableColumns = () => {
  const t = useTranslations("table")
  const tText = useTranslations("common")
    const { openDrawer } = useDrawer()
  const { hasAnyRole } = useCurrentRole()
  const isAuthority = hasAnyRole(["Super Admin", "SCM Admin"])
  const name = t("table-text-name")
  const description = t("table-text-description")
  const edit = t("table-text-edit")
  const view = t("table-text-view")


  const columns = useMemo(
    () => [
      columnHelper.accessor("id", {
        id: "id",
        size: 100,
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
              {t("table-text-id")}
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
              {row.original.stockReplenishmentId}
            </Text>
          </div>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("approvedBy", {
        id: "approvedBy",
        size: 240,
        header: t("table-text-approved-by"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.approvedBy}
          </Text>
        ),
      }),
      columnHelper.accessor("approvalNotes", {
        id: "approvalNotes",
        size: 240,
        header: t("table-text-approval-notes"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.approvalNotes}
          </Text>
        ),
      }),
      columnHelper.accessor("approvalDate", {
        id: "approvalDate",
        size: 240,
        header: t("table-text-approval-date"),
        cell: ({ row }) => {
          const date = row.original.approvalDate
            ? new Date(row.original.approvalDate)
            : null
          return (
            <Text className="font-medium text-gray-900 dark:text-gray-0">
              {date ? formatDate(date, "DD/MM/YYYY") : "-"}
            </Text>
          )
        },
      }),
      columnHelper.accessor("approvalStatus", {
        id: "approvalStatus",
        size: 240,
        header: t("table-text-approval-status"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {getListApprovalStatusBadge(row.original.approvalStatus)}
          </Text>
        ),
      }),
      columnHelper.accessor("createdDate", {
        id: "createdDate",
        size: 240,
        header: t("table-text-created-date"),
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
        header: t("table-text-updated-date"),
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
        }) => {
          return (
            <>
              <div className="flex items-center justify-end gap-3 pe-3">
                {
                  isAuthority && (
                <EditIconButton
                  onClick={() =>
                    openDrawer({
                      view: (
                        <StockReplenishmentApprovalFormDrawerForm
                          isEditForm
                          initialData={row.original}
                        />
                      ),

                      placement: "right",
                      containerClassName: "max-w-[26.25rem]",
                    })
                  }
                />
                  )
                }

                <ViewIconButton
                  onClick={() => {
                    openDrawer({
                      view: (
                        <StockReplenishmentApprovalDrawerView
                          initialData={row.original}
                        />
                      ),
                      containerClassName: "max-w-[500px] overflow-auto",
                      placement: "right",
                    })
                  }}
                />
                {
                  isAuthority && (
 <DeletePopover
                  translationObjectName="common"
                  title="text-delete"
                  description={`${tText("table-delete-row-prompt")} #${row.original.id}`}
                  onDelete={() =>
                    meta?.handleDeleteRow && meta?.handleDeleteRow(row.original)
                  }
                />
                  )
                }
               
              </div>
            </>
          )
        },
      }),
    ],
    [t, name, description, edit, view]
  )

  return columns
}