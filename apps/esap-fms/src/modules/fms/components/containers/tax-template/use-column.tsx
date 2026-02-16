import Link from "next/link"
import { useMemo } from "react"

import { createColumnHelper } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import { ActionIcon, Text, Tooltip } from "rizzui"

import DeletePopover from "@/components/base/delete-popover"
import EyeIcon from "@/components/icons/eye"
import PencilIcon from "@/components/icons/pencil"
import { Badge, Checkbox   } from "@/components/ui"
import { routes } from "@/config/routes"
import { TaxTemplateList } from "@/modules/fms/types"

function getStatus(isActive: boolean, tableT: (key: string) => string) {
  return isActive ? (
    <Badge variant="flat" rounded="lg">
      {tableT("table-text-active")}
    </Badge>
  ) : (
    <Badge color="success" variant="flat" rounded="lg">
      {tableT("table-text-inactive")}
    </Badge>
  )
}

const columnHelper = createColumnHelper<TaxTemplateList>()

export const useColumn = () => {
  const t = useTranslations("form")
  const tableT = useTranslations("table")

  const columns = useMemo(() => {
    return [
      columnHelper.accessor("id", {
        id: "id",
        size: 280,
        header: ({ table }) => (
          <div className="flex items-center gap-2">
            <Checkbox
              aria-label="Select all rows"
              checked={table.getIsAllPageRowsSelected()}
              onChange={() => table.toggleAllPageRowsSelected()}
            />
            <Text className="ms-2 font-medium text-gray-900 dark:text-gray-500">
              {tableT("table-text-title")}
            </Text>
          </div>
        ),
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <Checkbox
              aria-label="Select row"
              checked={row.getIsSelected()}
              onChange={() => row.toggleSelected()}
            />
            <Text className="ms-2 font-medium text-title">
              {row.original.taxTemplateName}
            </Text>
          </div>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("templateType", {
        id: "templateType",
        size: 250,
        header: tableT("table-text-tax-template"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.templateType}
          </Text>
        ),
      }),
      columnHelper.accessor("taxCategory", {
        id: "taxCategory",
        size: 250,
        header: tableT("table-text-tax-category"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original?.taxCategory?.taxCategoryName}
          </Text>
        ),
      }),
      columnHelper.accessor("company", {
        id: "company",
        size: 200,
        header: tableT("table-text-company"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original?.company?.companyName}
          </Text>
        ),
      }),
      columnHelper.accessor("isActive", {
        id: "isActive",
        size: 140,
        header: tableT("table-text-status"),
        cell: ({ row }) => getStatus(row.original.isActive!, tableT),
      }),
      columnHelper.accessor("action", {
        id: "action",
        size: 160,
        header: "",
        enablePinning: true,
        enableSorting: false,
        cell: ({
          row,
          table: {
            options: { meta },
          },
        }) => (
          <>
            <div className="flex items-center justify-end gap-3 pe-3">
              <Tooltip
                size="sm"
                content={tableT("table-text-edit-tax-template")}
                placement="top"
                rounded="lg"
                className="dropdown-gr card-shadow !rounded-lg border-transparent bg-paper text-title dark:bg-paper dark:text-title"
                arrowClassName="dark:fill-paper [&>path]:stroke-transparent"
                color="invert">
                <Link
                  href={routes.fms.editTaxTemplate(row.original.id!)}
                  aria-label="Edit tax template">
                  <ActionIcon
                    as="span"
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
                content={tableT("table-text-view-tax-template")}
                placement="top"
                rounded="lg"
                className="dropdown-gr card-shadow !rounded-lg border-transparent bg-paper text-title dark:bg-paper dark:text-title"
                arrowClassName="dark:fill-paper [&>path]:stroke-transparent"
                color="invert">
                <Link
                  href={routes.fms.viewTaxTemplate(row.original.id!)}
                  aria-label="View tax template">
                  <ActionIcon
                    as="span"
                    size="sm"
                    variant="outline"
                    rounded="lg"
                    className="h-6 w-7 border-gray-500/20">
                    <EyeIcon className="h-4 w-4" />
                  </ActionIcon>
                </Link>
              </Tooltip>
              <DeletePopover
                title="table-text-delete-tax-template"
                description={`${tableT("table-text-delete-confirm-tax-template")} #${row.original.id}`}
                onDelete={() =>
                  meta?.handleDeleteRow && meta?.handleDeleteRow(row.original)
                }
              />
            </div>
          </>
        ),
      }),
    ]
  }, [t, tableT])

  return columns
}
