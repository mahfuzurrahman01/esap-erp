import Link from "next/link"
import { useMemo } from "react"

import { createColumnHelper } from "@tanstack/react-table"
import dayjs from "dayjs"
import { useTranslations } from "next-intl"
import { ActionIcon, Checkbox, Text, Tooltip } from "rizzui"

import DeletePopover from "@/components/base/delete-popover"
import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import EyeIcon from "@/components/icons/eye"
import PencilIcon from "@/components/icons/pencil"
import { routes } from "@/config/routes"
import { CampaignList } from "@/modules/crm/types/campaign"
import { formatDate } from "@/utils/format-date"

const columnHelper = createColumnHelper<CampaignList>()

export const useColumn = () => {
  const { openDrawer } = useDrawer()
  const tableT = useTranslations("table")

  const columns = useMemo(() => {
    const subject = tableT("table-text-subject")
    const endDate = tableT("table-text-end-date")
    const company = tableT("table-text-company")
    const service = tableT("table-text-service")
    const source = tableT("table-text-source")
    const type = tableT("table-text-type")
    const id = tableT("table-text-id")

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
      columnHelper.accessor("subject", {
        id: "subject",
        size: 150,
        header: subject,
        cell: ({ row }) => (
          <Link href={routes.crm.campaignDetails(row.original.id)}>
            <span className="block max-w-[150px] truncate font-medium text-gray-900 dark:text-gray-0 cursor-pointer" title={row.original.subject}>
              {row.original.subject}
            </span>
          </Link>
        ),
      }),
      columnHelper.accessor("endDate", {
        id: "endDate",
        size: 90,
        header: endDate,
        cell: ({ row }) => {
          const date = row.original.endDate 
            ? new Date(row.original.endDate) 
            : null;
          return (
            <Text className="font-medium text-gray-900 dark:text-gray-0">
              {date ? formatDate(date, "DD/MM/YYYY") : ""}
            </Text>
          );
        },
      }),
      columnHelper.accessor("company", {
        id: "company",
        size: 100,
        header: company,
        cell: ({ row }) => (
          <span className="block max-w-[150px] truncate font-medium text-gray-900 dark:text-gray-0 cursor-pointer" title={row.original.company}>
            {row.original.company}
          </span>
        ),
      }),
      columnHelper.accessor("service", {
        id: "service",
        size: 150,
        header: service,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.service}
          </Text>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("source", {
        id: "source",
        size: 100,
        header: source,
        cell: ({ row }) => (
          <span
            className="block max-w-[150px] truncate font-medium text-gray-900 dark:text-gray-0"
            title={row.original.source}>
            {row.original.source}
          </span>
        ),
      }),
      columnHelper.accessor("type", {
        id: "type",
        size: 60,
        header: type,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.type}
          </Text>
        ),
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
        }) => (
          <div className="flex items-center justify-end gap-3 pe-3">
            <Tooltip
              size="sm"
              content={tableT("table-text-edit-campaign")}
              placement="top"
              className="dropdown-gr card-shadow !rounded-lg border-transparent bg-paper text-title dark:bg-paper dark:text-title"
              arrowClassName="dark:fill-paper [&>path]:stroke-transparent"
              color="invert">
              <Link
                href={routes.crm.editCampaign(row.original.id ?? "")}
                aria-label="Edit Campaign">
                <ActionIcon
                  as="button"
                  size="sm"
                  variant="outline"
                  rounded="lg"
                  className="h-6 w-7 border-gray-500/20">
                  <PencilIcon className="h-4 w-4" />
                </ActionIcon>
              </Link>
            </Tooltip>
            <Tooltip
              size="sm"
              content={tableT("table-text-view-campaign")}
              placement="top"
              className="dropdown-gr card-shadow !rounded-lg border-transparent bg-paper text-title dark:bg-paper dark:text-title"
              arrowClassName="dark:fill-paper [&>path]:stroke-transparent"
              color="invert">
              <Link
                href={routes.crm.campaignDetails(row.original.id ?? "")}
                aria-label="View Campaign">
                <ActionIcon
                  as="button"
                  size="sm"
                  variant="outline"
                  rounded="lg"
                  className="h-6 w-7 border-gray-500/20">
                  <EyeIcon className="h-4 w-4" />
                </ActionIcon>
              </Link>
            </Tooltip>
            <DeletePopover
              title="table-text-delete-campaign"
              description={tableT("table-text-delete-confirm-campaign")}
              onDelete={() =>
                meta?.handleDeleteRow && meta?.handleDeleteRow(row.original)
              }
            />
          </div>
        ),
      }),
    ]
  }, [tableT, openDrawer])

  return columns
}
