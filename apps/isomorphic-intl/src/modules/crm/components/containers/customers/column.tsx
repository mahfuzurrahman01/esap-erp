import Link from "next/link"
import { useMemo } from "react"

import AvatarCard from "@core/ui/avatar-card"
import { createColumnHelper } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import { HiPauseCircle } from "react-icons/hi2"
import { Checkbox, Text } from "rizzui"

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
import { CustomerList } from "@/modules/crm/types/customer"
import { useCompanyById } from "@/modules/fms/hooks/use-company"
import { useCountryById } from "@/modules/fms/hooks/use-country"

import {
  responseForApproval,
  sendForApproval,
} from "../../../../../components/base/notifications/approval-utils"
import { getApprovalStatusBadge } from "../approvals/status-badge"

const columnHelper = createColumnHelper<CustomerList>()

const CountryCell = ({ countryId }: any) => {
  const tableT = useTranslations("table")
  const { data: countryData, isLoading } = useCountryById(countryId)
  if (isLoading)
    return (
      <Text className="font-medium text-gray-900 dark:text-gray-0">
        {tableT("table-text-loading")}
      </Text>
    )
  const countryName = countryData?.countryName || ""
  return (
    <Text className="font-medium text-gray-900 dark:text-gray-0">
      {countryName}
    </Text>
  )
}

const CompanyCell = ({ companyId }: any) => {
  const tableT = useTranslations("table")
  const { data: companyData, isLoading }: any = useCompanyById(companyId)
  if (isLoading)
    return (
      <Text className="font-medium text-gray-900 dark:text-gray-0">
        {tableT("table-text-loading")}
      </Text>
    )
  const companyName = companyData?.companyName || ""
  return (
    <span
      className="block max-w-[150px] truncate font-medium text-gray-900 dark:text-gray-0"
      title={companyName}>
      {companyName}
    </span>
  )
}

export const useColumn = (refetch: () => void) => {
  const tableT = useTranslations("table")
  const createNotification = useCreateNotification()
  const createApproval = useCreateApproval()
  const updateApproval = useUpdateApproval()

  const fullName = tableT("table-text-full-name")
  const email = tableT("table-text-email")
  const phone = tableT("table-text-phone")
  const company = tableT("table-text-company")
  const country = tableT("table-text-country")
  const status = tableT("table-text-status")
  const id = tableT("table-text-id")

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
                inputClassName="w-[18px] h-[18px] border-gray-600 dark:border-gray-500"
                iconClassName="w-[18px] h-[18px]"
              />
              <Text className="font-medium text-gray-900 dark:text-gray-0">
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
              inputClassName="w-[18px] h-[18px] border-gray-600 dark:border-gray-500"
              iconClassName="w-[18px] h-[18px]"
            />
            <Text className="font-medium text-gray-900 dark:text-gray-0">
              {row.original.shortOrder}
            </Text>
          </div>
        ),
      }),
      columnHelper.accessor("firstName", {
        id: "firstName",
        size: 200,
        header: fullName,
        cell: ({ row }) => (
          <Link href={routes.crm.viewCustomer(row.original.id ?? "")}>
            <AvatarCard
              src={row.original.photoPath as string}
              name={row.original.firstName || ""}
            />
          </Link>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("email", {
        id: "email",
        size: 150,
        header: email,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.email}
          </Text>
        ),
      }),
      columnHelper.accessor("phone", {
        id: "phone",
        size: 150,
        header: phone,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.phone}
          </Text>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("company", {
        id: "company",
        size: 150,
        header: company,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.company}
          </Text>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("country", {
        id: "country",
        size: 150,
        header: country,
        cell: ({ row }) => {
          if (isNaN(Number(row.original.country))) {
            return ""
          } else {
            return <CountryCell countryId={Number(row.original.country)} />
          }
        },
        enableSorting: false,
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
        cell: ({
          row,
          table: {
            options: { meta },
          },
        }) => {
          const { id, approvalStatus, firstName } = row.original
          return (
            <div className="flex items-center justify-end gap-3 pe-3">
              <ListPopover>
                <Link
                  href={routes.crm.editCustomer(id ?? "")}
                  aria-label="Edit Opportunity"
                  className="flex w-full items-center gap-2 rounded-md px-2.5 py-1 font-semibold transition-colors hover:bg-gray-500/10">
                  <PencilIcon className="h-4 w-4" />
                  {tableT("table-text-edit")}
                </Link>
                <Link
                  href={routes.crm.viewCustomer(id ?? "")}
                  aria-label="View account"
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
                        firstName!,
                        2 // approval type 2 for customer
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
                            2 // approval type 2 for customer
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
                            2 // approval type 2 for customer
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
                            2 // approval type 2 for customer
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
  }, [tableT, refetch, createApproval])

  return columns
}
