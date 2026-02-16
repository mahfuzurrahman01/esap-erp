"use client"

import { useMemo } from "react"

import { createColumnHelper } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import { Checkbox, Text } from "rizzui"

import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import ListPopover from "@/components/base/list-popover"
import EyeIcon from "@/components/icons/eye"
import PencilIcon from "@/components/icons/pencil"
import ApproveIcon from "@/components/icons/scm/approve-icon"
import TrashIcon from "@/components/icons/trash"
import { Button } from "@/components/ui"
import { ReturnProcess } from "@/modules/scm/types/logistics-and-transport/return-process/return-process-types"
import { formatDate } from "@/utils/format-date"

import ReturnProcessApprovalForm from "./return-approval-form"
import ReturnProcessCreateEditFormDrawer from "./return-process-create-edit-form-drawer"
import ReturnProcessViewDrawer from "./return-process-view-drawer"
import {
  getReturnApprovalStatusBadge,
  getReturnProcessStatusBadge,
} from "./status-badge"
import UpdateStockForm from "./update-stock-form"
import { useCurrentRole } from "@/hooks/use-current-role"

const columnHelper = createColumnHelper<ReturnProcess>()

export const useReturnProcessColumn = () => {
  const t = useTranslations("form")
  const tableT = useTranslations("table")
  const { hasAnyRole } = useCurrentRole()
  const isAuthority = hasAnyRole(["Super Admin", "SCM Admin"])

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
              {t("form-product-name")}
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
              {row.original.productName}
            </Text>
          </div>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("reasonForReturn", {
        id: "reasonForReturn",
        size: 240,
        header: t("form-reason-for-return"),
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue() || "-"}
          </Text>
        ),
        enableSorting: true,
      }),
      columnHelper.accessor("quantityReturned", {
        id: "quantityReturned",
        size: 240,
        enableSorting: true,
        header: t("form-quantity-returned"),
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue() || "-"}
          </Text>
        ),
      }),
      columnHelper.accessor("requestDate", {
        id: "requestDate",
        size: 240,
        enableSorting: true,
        header: t("form-request-date"),
        cell: ({ row }) => {
          const date = row.original.requestDate
            ? new Date(row.original.requestDate)
            : null
          return (
            <Text className="font-medium text-gray-900 dark:text-gray-0">
              {date ? formatDate(date, "DD/MM/YYYY") : "-"}
            </Text>
          )
        },
      }),
      columnHelper.accessor("returnStatus", {
        id: "returnStatus",
        size: 240,
        enableSorting: true,
        header: t("form-return-status"),
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {getReturnProcessStatusBadge(info.renderValue() || "in-progress")}
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
            {getReturnApprovalStatusBadge(info.renderValue() || "pending")}
          </Text>
        ),
      }),
      columnHelper.accessor("updatedDate", {
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
              <Button
                as="span"
                className="dark:text-title-dark dark:bg-paper-dark h-7 w-full cursor-pointer justify-start gap-2 bg-transparent px-3 font-semibold text-title transition-colors hover:bg-gray-500/10 dark:hover:bg-gray-600/10"
                onClick={() =>
                  openDrawer({
                    view: (
                      <ReturnProcessCreateEditFormDrawer
                        isEditForm
                        initialData={row.original}
                      />
                    ),
                    placement: "right",
                    containerClassName: "max-w-[25.25rem]",
                  })
                }>
                <PencilIcon className="h-4 w-4" />
                {tableT("table-text-edit")}
              </Button>
              <Button
                as="span"
                className="dark:text-title-dark dark:bg-paper-dark h-7 w-full cursor-pointer justify-start gap-2 bg-transparent px-3 font-semibold text-title transition-colors hover:bg-gray-500/10 dark:hover:bg-gray-600/10"
                onClick={() =>
                  openDrawer({
                    view: (
                      <ReturnProcessViewDrawer initialData={row.original} />
                    ),
                    placement: "right",
                    containerClassName: "max-w-[25.25rem]",
                  })
                }>
                <EyeIcon className="h-4 w-4" />
                {tableT("table-text-view")}
              </Button>
              { isAuthority && row.original.approvalStatus !== "approved" &&
                row.original.approvalStatus !== "rejected" && (
                  <Button
                    as="span"
                    className="dark:text-title-dark dark:bg-paper-dark h-7 w-full cursor-pointer justify-start gap-2 bg-transparent px-3 font-semibold text-title transition-colors hover:bg-gray-500/10 dark:hover:bg-gray-600/10"
                    onClick={() =>
                      openDrawer({
                        view: (
                          <ReturnProcessApprovalForm
                            initialData={row.original}
                            returnRequestId={Number(row.original.id)}
                          />
                        ),
                        placement: "right",
                        containerClassName: "max-w-[25.25rem]",
                      })
                    }>
                    <ApproveIcon className="h-4 w-4" />
                    {tableT("table-text-return-approval")}
                  </Button>
                )}
              {row.original.approvalStatus === "approved" && (
                <Button
                  as="span"
                  className="dark:text-title-dark dark:bg-paper-dark h-7 w-full cursor-pointer justify-start gap-2 bg-transparent px-3 font-semibold text-title transition-colors hover:bg-gray-500/10 dark:hover:bg-gray-600/10"
                  onClick={() =>
                    openDrawer({
                      view: <UpdateStockForm initialData={row.original} />,
                      placement: "right",
                      containerClassName: "max-w-[25.25rem]",
                    })
                  }>
                  <PencilIcon className="h-4 w-4" />
                  {tableT("table-text-update-stock")}
                </Button>
              )}
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
    [t, tableT]
  )

  return columns
}
