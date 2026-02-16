"use client"

import { useMemo } from "react"

import { createColumnHelper } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import { Checkbox, Text } from "rizzui"

import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import ListPopover from "@/components/base/list-popover"
import EyeIcon from "@/components/icons/eye"
import { Button } from "@/components/ui"
import { typeLabels } from "@/data/crm/common-column"
import { useUpdateApproval } from "@/modules/crm/hooks/use-approval"
import { ApprovalList } from "@/modules/crm/types/approval"

import AssignedToCell from "../user/assigned-to-cell"
import { responseForApproval } from "../../../../../components/base/notifications/approval-utils"
import ApprovalDrawerView from "./drawer-view"
import { getApprovalStatusBadge } from "./status-badge"
import { ApproveIcon } from "@/components/icons/crm/appprove"
import { RejectIcon } from "@/components/icons/crm/reject"
import { HiPauseCircle } from "react-icons/hi2"
import { routes } from "@/config/routes"
import Link from "next/link"
import UserByEmail from "../user/user-by-email"

const columnHelper = createColumnHelper<ApprovalList>()

export const useColumn = (refetch: () => void) => {
  const { openDrawer } = useDrawer()
  const tableT = useTranslations("table")
  const updateApproval = useUpdateApproval()

  const columns = useMemo(() => {
    const id = tableT("table-text-id")
    const type = tableT("table-text-type")
    const status = tableT("table-text-status")
    const referenceId = tableT("table-text-reference-id")
    const referenceName = tableT("table-text-reference-name")
    const sentBy = tableT("table-text-sent-by")

    return [
      columnHelper.accessor("id", {
        id: "id",
        size: 60,
        header: ({ table }) => (
          <span className="inline-block">
            <div className="flex items-center gap-12">
              <Checkbox
                aria-label="Select all rows"
                checked={table.getIsAllPageRowsSelected()}
                onChange={() => table.toggleAllPageRowsSelected()}
                inputClassName="w-[18px] h-[18px] border-gray-600 dark:border-gray-500/20"
                iconClassName="w-[18px] h-[18px]"
              />
              <Text className="font-medium text-gray-600 dark:text-gray-500">
                {id}
              </Text>
            </div>
          </span>
        ),
        cell: ({ row }) => (
          <div className="flex items-center gap-12">
            <Checkbox
              aria-label="Select row"
              checked={row.getIsSelected()}
              onChange={() => row.toggleSelected()}
              inputClassName="w-[18px] h-[18px] border-gray-600 dark:border-gray-500/20"
              iconClassName="w-[18px] h-[18px]"
            />
            <Text
              className="cursor-pointer font-medium text-gray-900 dark:text-gray-0"
              onClick={() => {
                openDrawer({
                  view: <ApprovalDrawerView id={row.original.id} />,
                  placement: "right",
                  containerClassName: "lg:min-w-[500px] dropdown-gr",
                })
              }}>
              {row.original.shortOrder}
            </Text>
          </div>
        ),
      }),
      columnHelper.accessor("referenceId", {
        id: "referenceId",
        size: 85,
        header: referenceId,
        cell: ({ row }) => (
          <span
            className="block max-w-[85px] truncate font-medium text-gray-900 dark:text-gray-0"
            title={row.original.referenceId}>
            {row.original.referenceId}
          </span>
        ),
      }),
      columnHelper.accessor("type", {
        id: "type",
        size: 200,
        header: type,
        cell: ({ row }: { row: { original: { type?: number } } }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.type !== undefined && typeLabels[row.original.type]
              ? typeLabels[row.original.type]
              : "Unknown"}
          </Text>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("referenceName", {
        id: "referenceName",
        size: 240,
        header: referenceName,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.referenceName}
          </Text>
        ),
      }),
      columnHelper.accessor("createdBy", {
        id: "createdBy",
        size: 150,
        header: sentBy,
        cell: ({ row }) => {
          if (row.original.createdBy && row.original.createdBy.includes("@")) {
            return <UserByEmail email={row.original.createdBy} />
          } else {
            return <Link href={routes.crm.viewProfile(row.original.createdBy ?? "")}><AssignedToCell assignedTo={row.original.createdBy} /></Link>
          }
        },
      }), 
      columnHelper.accessor("approvalStatus", {
        id: "approvalStatus",
        size: 100,
        header: status,
        cell: (row) => row.renderValue() && getApprovalStatusBadge(row.renderValue()),
        enableSorting: false,
      }),
      columnHelper.accessor("action", {
        id: "actions",
        size: 60,
        header: "",
        enablePinning: true,
        enableSorting: false,
        cell: ({ row }) => {
          const { id, referenceId, type, approvalStatus } = row.original
          return (
          <div className="flex items-center justify-end gap-3 pe-3">
            <ListPopover>
              <Button
                size="sm"
                variant="text"
                className="h-7 w-full justify-start gap-2 font-semibold text-title transition-colors hover:bg-gray-500/10"
                onClick={() => {
                  openDrawer({
                    view: <ApprovalDrawerView id={id} />,
                    placement: "right",
                    containerClassName: "lg:min-w-[500px] dropdown-gr",
                  })
                }}>
                <EyeIcon className="h-4 w-4" />
                {tableT("table-text-view")}
              </Button>
              {approvalStatus && type && Number(type) > 0 && (
                  <>
                    {approvalStatus !== "Approved" && (
                      <Button
                        size="sm"
                        variant="text"
                        className="h-7 w-full justify-start gap-2 font-semibold text-title transition-colors hover:bg-gray-500/10"
                        onClick={async function () {
                          await responseForApproval(
                            updateApproval,
                            referenceId!,
                            "Approved",
                            type!
                          )
                          refetch()
                        }}>
                        <ApproveIcon className="h-4 w-4" />
                        {tableT("table-text-approve")}
                      </Button>
                    )}
                    {approvalStatus !== "Hold" && (
                      <Button
                        size="sm"
                        variant="text"
                        className="h-7 w-full justify-start gap-2 font-semibold text-title transition-colors hover:bg-gray-500/10"
                        onClick={async function () {
                          await responseForApproval(
                            updateApproval,
                            referenceId!,
                            "Hold",
                            type!
                          )
                          refetch()
                        }}>
                        <HiPauseCircle className="h-4 w-4" />
                        {tableT("table-text-hold")}
                      </Button>
                    )}
                    {approvalStatus !== "Declined" && (
                      <Button
                        size="sm"
                        variant="text"
                        className="h-7 w-full justify-start gap-2 font-semibold text-title transition-colors hover:bg-gray-500/10"
                        onClick={async function () {
                          await responseForApproval(
                            updateApproval,
                            referenceId!,
                            "Declined",
                            type!
                          )
                          refetch()
                        }}>
                        <RejectIcon className="h-4 w-4" />
                        {tableT("table-text-decline")}
                      </Button>
                    )}
                  </>
                )}
            </ListPopover>
          </div>
        )},
      }),
    ]
  }, [tableT, refetch, updateApproval, openDrawer])

  return columns
}
