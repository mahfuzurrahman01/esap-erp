import dynamic from "next/dynamic"
import Link from "next/link"
import { useMemo } from "react"

import { createColumnHelper } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import { HiPauseCircle } from "react-icons/hi2"
import { Checkbox, Text } from "rizzui"

import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import ListPopover from "@/components/base/list-popover"
import { ApproveIcon } from "@/components/icons/crm/appprove"
import { RejectIcon } from "@/components/icons/crm/reject"
import EyeIcon from "@/components/icons/eye"
import PencilIcon from "@/components/icons/pencil"
import SendIcon from "@/components/icons/send-icon"
import TrashIcon from "@/components/icons/trash"
import { Button } from "@/components/ui"
import { routes } from "@/config/routes"
import {
  useCreateApproval,
  useUpdateApproval,
} from "@/modules/crm/hooks/use-approval"
import { useCreateNotification } from "@/modules/crm/hooks/use-notification"
import { BillList } from "@/modules/crm/types/bill"

import {
  responseForApproval,
  sendForApproval,
} from "@/components/base/notifications/approval-utils"
import { getApprovalStatusBadge } from "../approvals/status-badge"
import CustomerCell from "../customers/customer-cell"

const BillDrawerView = dynamic(() => import("@/components/base/notifications/drawer-view"), {
  ssr: false,
})

const columnHelper = createColumnHelper<BillList>()

export const useColumn = (refetch: () => void) => {
  const tableT = useTranslations("table")
  const createNotification = useCreateNotification()
  const createApproval = useCreateApproval()
  const updateApproval = useUpdateApproval()

  const { openDrawer } = useDrawer()
  const category = tableT("table-text-category")
  const id = tableT("table-text-id")
  const type = tableT("table-text-type")
  const status = tableT("table-text-status")
  const amount = tableT("table-text-amount")
  const customer = tableT("table-text-customer")
  const paymentMethod = tableT("table-text-payment-method")

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
            <Text
              className="cursor-pointer font-medium text-gray-900 dark:text-gray-0"
              onClick={() =>
                openDrawer({
                  view: <BillDrawerView id={row.original.id} />,
                  placement: "right",
                  containerClassName: "lg:min-w-[500px] dropdown-gr",
                })
              }>
              {row.original.shortOrder}
            </Text>
          </div>
        ),
      }),

      columnHelper.accessor("customerId", {
        id: "customerId",
        size: 150,
        header: customer,
        cell: ({ row }) => {
          return (
            <Link href={routes.crm.viewCustomer(row.original.customerId ?? "")}>
              <CustomerCell customerId={row.original.customerId} />
            </Link>
          )
        },
        enableSorting: false,
      }),

      columnHelper.accessor("incomeCategory", {
        id: "incomeCategory",
        size: 150,
        header: category,
        cell: ({ row }) => {
          return (
            <span className="font-medium text-gray-900 dark:text-gray-0">
              {row.original.incomeCategory}
            </span>
          )
        },
      }),

      columnHelper.accessor("type", {
        id: "type",
        size: 150,
        header: type,
        cell: ({ row }) => {
          return (
            <span className="font-medium text-gray-900 dark:text-gray-0">
              {row.original.type}
            </span>
          )
        },
      }),

      columnHelper.accessor("amount", {
        id: "amount",
        size: 150,
        header: amount,
        cell: ({ row }) => {
          return (
            <span className="font-medium text-gray-900 dark:text-gray-0">
              {row.original.amount}
            </span>
          )
        },
      }),

      columnHelper.accessor("paymentMethod", {
        id: "paymentMethod",
        size: 150,
        header: paymentMethod,
        cell: ({ row }) => {
          return (
            <span className="font-medium text-gray-900 dark:text-gray-0">
              {row.original.paymentMethod}
            </span>
          )
        },
      }),
      columnHelper.accessor("approvalStatus", {
        id: "approvalStatus",
        size: 150,
        header: status,
        cell: (row) =>
          row.renderValue() && getApprovalStatusBadge(row.renderValue()),
      }),
      columnHelper.accessor("action", {
        id: "actions",
        size: 60,
        header: "",
        enablePinning: true,
        enableSorting: false,
        cell: ({ row }) => {
          const { id, approvalStatus } = row.original
          return (
            <div className="flex items-center justify-end gap-3 pe-3">
              <ListPopover>
                <Link
                  href={routes.crm.editBill(id ?? "")}
                  aria-label="Edit account"
                  className="flex w-full items-center gap-2 rounded-md px-2.5 py-1 font-semibold transition-colors hover:bg-gray-500/10">
                  <PencilIcon className="h-4 w-4" />
                  {tableT("table-text-edit")}
                </Link>
                <Button
                  size="sm"
                  variant="text"
                  color="primary"
                  className="h-7 w-full justify-start gap-2 font-semibold text-black transition-colors hover:bg-gray-500/10 hover:text-black dark:text-white"
                  onClick={() =>
                    openDrawer({
                      view: <BillDrawerView id={id} />,
                      placement: "right",
                      containerClassName: "lg:min-w-[500px] dropdown-gr",
                    })
                  }>
                  <EyeIcon className="h-4 w-4" />
                  {tableT("table-text-view")}
                </Button>
                {/* <Button
                size="sm"
                variant="text"
                color="danger"
                className="h-7 w-full justify-start gap-2 font-semibold text-title hover:bg-red/20 hover:text-red"
                onClick={() => {
                  meta?.handleDeleteRow && meta?.handleDeleteRow(row.original)
                }}>
                <TrashIcon className="h-4 w-4" />
                {tableT("table-text-delete")}
              </Button> */}
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
                        "",
                        5 // 5 for bill
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
                            5 // 5 for bill
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
                            5 // 5 for bill
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
                            5 // 5 for bill
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
          )
        },
      }),
    ]
  }, [tableT])

  return columns
}
