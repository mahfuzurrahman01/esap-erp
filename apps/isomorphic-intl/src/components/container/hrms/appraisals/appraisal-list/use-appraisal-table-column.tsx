import Link from "next/link"
import { useMemo } from "react"

import { createColumnHelper } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import { ActionIcon, Checkbox, Text, Tooltip } from "rizzui"

import DeletePopover from "@/components/base/delete-popover"
import PencilIcon from "@/components/icons/pencil"
import { routes } from "@/config/routes"
import { Appraisal } from "@/types/hrms/appraisal/appraisals.types"
import { formatDate } from "@/utils/format-date"

import { getListTemplateStatusBadge } from "../appraisal-templates/template-status-option"

const columnHelper = createColumnHelper<Appraisal>()

export const useAppraisalTableColumn = () => {
  const t = useTranslations("table")
  const tText = useTranslations("hrms")

  const getStatusBadge = (status: string) => {
    return getListTemplateStatusBadge(status)
  }

  const columns = useMemo(
    () => [
      columnHelper.accessor("id", {
        id: "id",
        size: 60,
        header: ({ table }) => (
          <Checkbox
            aria-label="Select all rows"
            checked={table.getIsAllPageRowsSelected()}
            onChange={() => table.toggleAllPageRowsSelected()}
            inputClassName="w-[18px] h-[18px] border-gray-600 dark:border-gray-500"
            iconClassName="w-[18px] h-[18px]"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            aria-label="Select row"
            checked={row.getIsSelected()}
            onChange={() => row.toggleSelected()}
            inputClassName="w-[18px] h-[18px] border-gray-600 dark:border-gray-500"
            iconClassName="w-[18px] h-[18px]"
          />
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("employeeId", {
        id: "employeeName",
        size: 250,
        header: t("table-text-employee-name"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {`${row.original.employee?.firstName} ${row.original.employee?.lastName || ""}`}
          </Text>
        ),
      }),
      columnHelper.accessor("managerId", {
        id: "managerName",
        size: 250,
        header: t("table-text-manager-name"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {`${row?.original?.manager ? row.original.manager?.firstName : ""} ${row?.original?.manager ? row.original.manager?.lastName : ""}`}
          </Text>
        ),
      }),
      columnHelper.accessor("templateId", {
        id: "templateName",
        size: 250,
        header: t("table-text-template-name"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.template?.templateName}
          </Text>
        ),
      }),
      columnHelper.accessor("startDate", {
        id: "startDate",
        size: 200,
        header: t("table-text-start-date"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {formatDate(row.original.startDate)}
          </Text>
        ),
      }),
      columnHelper.accessor("endDate", {
        id: "endDate",
        size: 200,
        header: t("table-text-end-date"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {formatDate(row.original.endDate)}
          </Text>
        ),
      }),
      columnHelper.accessor("status", {
        id: "status",
        size: 200,
        header: t("table-text-status"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {getStatusBadge(row.original.status || "pending")}
          </Text>
        ),
      }),
      columnHelper.accessor("id", {
        id: "action",
        size: 120,
        header: "",
        cell: ({
          row,
          table: {
            options: { meta },
          },
        }) => (
          <div className="flex items-center justify-end gap-3 pe-3">
            <Tooltip
              size="sm"
              content={t("table-text-edit")}
              placement="top"
              rounded="lg"
              className="dropdown-gr card-shadow !rounded-lg border-transparent bg-paper text-title dark:bg-paper dark:text-title"
              arrowClassName="dark:fill-paper [&>path]:stroke-transparent"
              color="invert">
              <Link href={routes.hr.editAppraisal(Number(row.original.id))}>
                <ActionIcon
                  as="span"
                  size="sm"
                  variant="outline"
                  rounded="lg"
                  className="h-6 w-7 cursor-pointer border-gray-500/20">
                  <PencilIcon className="h-4 w-4" />
                </ActionIcon>
              </Link>
            </Tooltip>

            <DeletePopover
              translationObjectName="hrms"
              title="text-delete-appraisal"
              description={`${tText("text-delete-appraisal-message")} #${row.original.id}`}
              onDelete={() =>
                meta?.handleDeleteRow && meta?.handleDeleteRow(row.original)
              }
            />
          </div>
        ),
      }),
    ],
    [t, tText]
  )

  return columns
}
