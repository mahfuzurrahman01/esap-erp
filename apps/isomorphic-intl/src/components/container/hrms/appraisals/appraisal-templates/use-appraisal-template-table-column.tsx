import Link from "next/link"
import { useMemo } from "react"

import { createColumnHelper } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import { ActionIcon, Checkbox, Text, Tooltip } from "rizzui"

import DeletePopover from "@/components/base/delete-popover"
import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import EyeIcon from "@/components/icons/eye"
import PencilIcon from "@/components/icons/pencil"
import { routes } from "@/config/routes"
import { AppraisalTemplate } from "@/types/hrms/appraisal/appraisal-templates.types"

import { getListTemplateStatusBadge } from "./template-status-option"

const columnHelper = createColumnHelper<AppraisalTemplate>()

export const useAppraisalTemplateTableColumn = () => {
  const t = useTranslations("table")
  const tText = useTranslations("hrms")
  const { openDrawer } = useDrawer()

  const getStatusBadge = (isActive: boolean) => {
    if (!isActive) {
      return getListTemplateStatusBadge("inactive")
    }
    return getListTemplateStatusBadge("active")
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
      columnHelper.accessor("templateName", {
        id: "templateName",
        size: 200,
        header: t("table-text-template-name"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.templateName}
          </Text>
        ),
      }),

      columnHelper.accessor("description", {
        id: "description",
        size: 450,
        header: t("table-text-description"),
        cell: ({ row }) => row.original.description,
      }),
      columnHelper.accessor("isActive", {
        id: "status",
        size: 160,
        header: t("table-text-status"),
        cell: ({ row }) => getStatusBadge(row.original.isActive || false),
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
              <Link
                href={routes.hr.editAppraisalTemplate(Number(row.original.id))}>
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

            <Tooltip
              size="sm"
              content={t("table-text-view")}
              placement="top"
              rounded="lg"
              className="dropdown-gr card-shadow !rounded-lg border-transparent bg-paper text-title dark:bg-paper dark:text-title"
              arrowClassName="dark:fill-paper [&>path]:stroke-transparent"
              color="invert">
              <Link
                href={routes.hr.editAppraisalTemplate(Number(row.original.id))}>
                <ActionIcon
                  as="span"
                  size="sm"
                  variant="outline"
                  rounded="lg"
                  className="h-6 w-7 cursor-pointer border-gray-500/20">
                  <EyeIcon className="h-4 w-4" />
                </ActionIcon>
              </Link>
            </Tooltip>

            <DeletePopover
              translationObjectName="hrms"
              title="text-delete-appraisal-template"
              description={`${tText("text-delete-appraisal-template-message")} #${row.original.id}`}
              onDelete={() =>
                meta?.handleDeleteRow && meta?.handleDeleteRow(row.original)
              }
            />
          </div>
        ),
      }),
    ],
    [t, openDrawer]
  )

  return columns
}
