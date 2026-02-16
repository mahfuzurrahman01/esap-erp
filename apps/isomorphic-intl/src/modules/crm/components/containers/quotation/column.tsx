import Link from "next/link"
import { useMemo } from "react"

import { createColumnHelper } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import { HiPauseCircle } from "react-icons/hi2"
import { LuFileText } from "react-icons/lu"
import { Checkbox, Text } from "rizzui"

import ListPopover from "@/components/base/list-popover"
import { ApproveIcon } from "@/components/icons/crm/appprove"
import { RejectIcon } from "@/components/icons/crm/reject"
import EyeIcon from "@/components/icons/eye"
import PencilIcon from "@/components/icons/pencil"
import SendIcon from "@/components/icons/send-icon"
import { Button } from "@/components/ui"
import { routes } from "@/config/routes"
import {
  useCreateApproval,
  useUpdateApproval,
} from "@/modules/crm/hooks/use-approval"
import { useCreateNotification } from "@/modules/crm/hooks/use-notification"
import { QuotationList } from "@/modules/crm/types/quotation"
import { formatDate } from "@/utils/format-date"

import { sendForApproval } from "../../../../../components/base/notifications/approval-utils"
import { responseForApproval } from "../../../../../components/base/notifications/approval-utils"
import { getApprovalStatusBadge } from "../approvals/status-badge"
import CustomerCell from "../customers/customer-cell"

const columnHelper = createColumnHelper<QuotationList>()

export const useColumn = (refetch: () => void) => {
  const tableT = useTranslations("table")
  const createNotification = useCreateNotification()
  const createApproval = useCreateApproval()
  const updateApproval = useUpdateApproval()

  const columns = useMemo(() => {
    const quotationNo = tableT("table-text-quotation-no")
    const customer = tableT("table-text-customer")
    const type = tableT("table-text-type")
    const title = tableT("table-text-title")
    const courier = tableT("table-text-courier")
    const status = tableT("table-text-status")
    const expiryDate = tableT("table-text-expiry-date")

    return [
      columnHelper.accessor("id", {
        id: "id",
        size: 20,
        header: ({ table }) => (
          <Checkbox
            aria-label="Select all rows"
            checked={table.getIsAllPageRowsSelected()}
            onChange={() => table.toggleAllPageRowsSelected()}
            inputClassName="w-[18px] h-[18px] border-gray-600 dark:border-gray-500/20"
            iconClassName="w-[18px] h-[18px]"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            aria-label="Select row"
            checked={row.getIsSelected()}
            onChange={() => row.toggleSelected()}
            inputClassName="w-[18px] h-[18px] border-gray-600 dark:border-gray-500/20"
            iconClassName="w-[18px] h-[18px]"
          />
        ),
        enableSorting: false,
      }),

      columnHelper.accessor("quotationNo", {
        id: "quotationNo",
        size: 150,
        header: quotationNo,
        cell: ({ row }) => {
          return (
            <Link href={routes.crm.viewQuotation(row.original.id ?? "")}>
              <Text className="font-medium text-gray-900 dark:text-gray-0">
                {row.original?.quotationNo}
              </Text>
            </Link>
          )
        },
      }),

      columnHelper.accessor("title", {
        id: "title",
        size: 150,
        header: title,
        cell: ({ row }) => {
          return (
            <span className="block max-w-[150px] truncate font-medium text-gray-900 dark:text-gray-0" title={row.original.title}>
              {row.original.title}
            </span>
          )
        },
      }),

      columnHelper.accessor("customer", {
        id: "customer",
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

      columnHelper.accessor("deliveryStatus", {
        id: "deliveryStatus",
        size: 150,
        header: courier,
        cell: ({ row }) => {
          return (
            <span className="font-medium text-gray-900 dark:text-gray-0">
              {row.original.deliveryStatus}
            </span>
          )
        },
      }),

      columnHelper.accessor("expiryDate", {
        id: "expiryDate",
        size: 150,
        header: expiryDate,
        cell: ({ row }) => {
          const date = row.original.expiryDate
            ? new Date(row.original.expiryDate)
            : null
          return (
            <Text className="font-medium text-gray-900 dark:text-gray-0">
              {date ? formatDate(date, "DD/MM/YYYY") : ""}
            </Text>
          )
        },
      }),
      columnHelper.accessor("approvalStatus", {
        id: "approvalStatus",
        size: 150,
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
        cell: ({ row }) => {
          const { id, quotationNo, approvalStatus } = row.original
          return (
            <div className="flex items-center justify-end gap-3 pe-3">
              <ListPopover>
                <Link
                  href={routes.crm.editQuotation(id ?? "")}
                  aria-label="Edit Quotation"
                  className="flex w-full items-center gap-2 rounded-md px-2.5 py-1 font-semibold transition-colors hover:bg-gray-500/10">
                  <PencilIcon className="h-4 w-4" />
                  {tableT("table-text-edit")}
                </Link>
                <Link
                  href={routes.crm.viewQuotation(id ?? "")}
                  aria-label="View Quotation"
                  className="flex w-full items-center gap-2 rounded-md px-2.5 py-1 font-semibold transition-colors hover:bg-gray-500/10">
                  <EyeIcon className="h-4 w-4" />
                  {tableT("table-text-view")}
                </Link>
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
                        quotationNo,
                        4
                      )
                      refetch()
                    }}>
                    <SendIcon className="h-4 w-4" />
                    {tableT("table-text-send-for-approval")}
                  </Button>
                )}
                {approvalStatus && approvalStatus != "Draft" && (
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
                            4
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
                            4 // approval type 4 for quotation
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
                            4 // approval type 4 for quotation
                          )
                          refetch()
                        }}>
                        <RejectIcon className="h-4 w-4" />
                        {tableT("table-text-decline")}
                      </Button>
                    )}
                  </>
                )}
                {approvalStatus && approvalStatus == "Approved" && (
                  <Link
                    href={`/crm/sales-orders/create?quotationId=${id}`}
                    aria-label="Order create"
                    className="flex w-full items-center gap-2 rounded-md px-3 py-1 font-semibold transition-colors hover:bg-gray-500/10">
                    <LuFileText className="h-4 w-4" />
                    {tableT("table-text-generate-order")}
                  </Link>
                )}
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
              </ListPopover>
            </div>
          )
        },
      }),
    ]
  }, [tableT, createApproval, updateApproval, refetch, createNotification])

  return columns
}