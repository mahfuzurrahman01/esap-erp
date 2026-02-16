import dynamic from "next/dynamic"
import { useMemo } from "react"

import { createColumnHelper } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import { HiPauseCircle } from "react-icons/hi2"
import { Checkbox, Text } from "rizzui"

import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import ListPopover from "@/components/base/list-popover"
import {
  responseForApproval,
  sendForApproval,
} from "@/components/base/notifications/approval-utils"
import { ApproveIcon } from "@/components/icons/crm/appprove"
import { RejectIcon } from "@/components/icons/crm/reject"
import EyeIcon from "@/components/icons/eye"
import PencilIcon from "@/components/icons/pencil"
import SendIcon from "@/components/icons/send-icon"
import TrashIcon from "@/components/icons/trash"
import { Button } from "@/components/ui"
import {
  useCreateApproval,
  useUpdateApproval,
} from "@/modules/crm/hooks/use-approval"
import { useCreateNotification } from "@/modules/crm/hooks/use-notification"
import { TargetList } from "@/modules/crm/types/target"
import { formatDate } from "@/utils/format-date"

import { getApprovalStatusBadge } from "../approvals/status-badge"

const TargetDrawerView = dynamic(
  () => import("@/components/base/notifications/targets-drawer-view"),
  {
    ssr: false,
  }
)

const columnHelper = createColumnHelper<TargetList>()

export const useColumn = (refetch: () => void) => {
  const { openDrawer } = useDrawer()
  const createNotification = useCreateNotification()
  const createApproval = useCreateApproval()
  const updateApproval = useUpdateApproval()

  const tableT = useTranslations("table")
  const id = tableT("table-text-id")
  const title = tableT("table-text-title")
  const targetType = tableT("table-text-target-type")
  const targetValue = tableT("table-text-target-value")
  const quarter = tableT("table-text-quarter")
  const month = tableT("table-text-month")
  const status = tableT("table-text-status")

  const columns = useMemo(() => {
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
            <Text className="font-medium text-gray-900 dark:text-gray-0">
              {row.original.shortOrder}
            </Text>
          </div>
        ),
      }),
      columnHelper.accessor("title", {
        id: "title",
        size: 200,
        header: title,
        cell: ({ row }) => (
          <span
            className="block max-w-[100px] cursor-pointer truncate font-medium text-gray-900 dark:text-gray-0"
            title={row.original.title}
            onClick={() =>
              openDrawer({
                view: <TargetDrawerView id={row.original.id} view={true} />,
                placement: "right",
                containerClassName: "lg:min-w-[500px] dropdown-gr",
              })
            }>
            {row.original.title}
          </span>
        ),
      }),
      columnHelper.accessor("type", {
        id: "type",
        size: 150,
        header: targetType,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.type}
          </Text>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("targetValue", {
        id: "targetValue",
        size: 150,
        header: targetValue,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.targetValue}
          </Text>
        ),
      }),
      columnHelper.accessor("quarter", {
        id: "quarter",
        size: 150,
        header: quarter,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.quarter}
          </Text>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("month", {
        id: "month",
        size: 150,
        header: month,
        cell: ({ row }) => {
          const date = row.original.month ? new Date(row.original.month) : null
          return (
            <Text className="font-medium text-gray-900 dark:text-gray-0">
              {date ? formatDate(date, "MM/YYYY") : ""}
            </Text>
          )
        },
      }),
      columnHelper.accessor("approvalStatus", {
        id: "approvalStatus",
        size: 100,
        header: status,
        cell: (row) =>
          row.renderValue() && getApprovalStatusBadge(row.renderValue()),
        enableSorting: false,
      }),
      columnHelper.accessor("action", {
        id: "actions",
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
          const { id, type, approvalStatus } = row.original
          return (
            <div className="flex items-center justify-end gap-3 pe-3">
              <ListPopover>
                <Button
                  size="sm"
                  variant="text"
                  color="primary"
                  className="h-7 w-full justify-start gap-2 font-semibold text-black transition-colors hover:bg-gray-500/10 hover:text-black dark:text-white"
                  onClick={() =>
                    openDrawer({
                      view: <TargetDrawerView id={id} />,
                      placement: "right",
                      containerClassName: "lg:min-w-[500px] dropdown-gr",
                    })
                  }>
                  <PencilIcon className="h-4 w-4" />
                  {tableT("table-text-edit")}
                </Button>
                <Button
                  size="sm"
                  variant="text"
                  color="primary"
                  className="h-7 w-full justify-start gap-2 font-semibold text-black transition-colors hover:bg-gray-500/10 hover:text-black dark:text-white"
                  onClick={() =>
                    openDrawer({
                      view: <TargetDrawerView id={id} view={true} />,
                      placement: "right",
                      containerClassName: "lg:min-w-[500px] dropdown-gr",
                    })
                  }>
                  <EyeIcon className="h-4 w-4" />
                  {tableT("table-text-view")}
                </Button>
                {approvalStatus && approvalStatus == "Draft" && (
                  <Button
                    size="sm"
                    variant="text"
                    className="h-7 w-full justify-start gap-2 font-semibold text-title transition-colors hover:bg-gray-500/10"
                    onClick={async function () {
                      await sendForApproval(
                        createApproval,
                        createNotification,
                        id,
                        type,
                        6 // approvalType 6 for targetGoal
                      )
                      refetch()
                    }}>
                    <SendIcon className="h-4 w-4" />
                    {tableT("table-text-send-for-approval")}
                  </Button>
                )}
                {approvalStatus && approvalStatus?.toLowerCase() != "draft" && (
                  <>
                    {approvalStatus !== "Approved" && (
                      <Button
                        size="sm"
                        variant="text"
                        className="h-7 w-full justify-start gap-2 font-semibold text-title transition-colors hover:bg-gray-500/10"
                        onClick={async function () {
                          await responseForApproval(
                            updateApproval,
                            id,
                            "Approved",
                            6 // approvalType 6 for targetGoal
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
                            id,
                            "Hold",
                            6 // approvalType 6 for targetGoal
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
                            id,
                            "Declined",
                            6 // approvalType 6 for targetGoal
                          )
                          refetch()
                        }}>
                        <RejectIcon className="h-4 w-4" />
                        {tableT("table-text-decline")}
                      </Button>
                    )}
                  </>
                )}
                {approvalStatus && approvalStatus == "Draft" && (
                  <Button
                    size="sm"
                    variant="text"
                    color="danger"
                    className="h-7 w-full justify-start gap-2 font-semibold text-title hover:bg-red/20 hover:text-red"
                    onClick={() => {
                      meta?.handleDeleteRow &&
                        meta?.handleDeleteRow(row.original)
                    }}>
                    <TrashIcon className="h-4 w-4" />
                    {tableT("table-text-delete")}
                  </Button>
                )}
              </ListPopover>
            </div>
          )
        },
      }),
    ]
  }, [tableT])

  return columns
}
