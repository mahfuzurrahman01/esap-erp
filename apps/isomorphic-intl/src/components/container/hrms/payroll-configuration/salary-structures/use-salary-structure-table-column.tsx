import { useMemo } from "react"

import { createColumnHelper } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import { ActionIcon, Checkbox, Text, Tooltip } from "rizzui"

import DeletePopover from "@/components/base/delete-popover"
import EyeIcon from "@/components/icons/eye"
import PencilIcon from "@/components/icons/pencil"
import { routes } from "@/config/routes"
import { Link } from "@/i18n/routing"
import { SalaryStructure } from "@/types/hrms/payroll-configuration/salary-structure.types"

const columnHelper = createColumnHelper<SalaryStructure>()

export const useSalaryStructureTableColumns = () => {
  const t = useTranslations("table")
  const tForm = useTranslations("form")

  return useMemo(
    () => [
      columnHelper.accessor("id", {
        id: "id",
        size: 50,
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
        enablePinning: true,
      }),
      columnHelper.accessor("salaryStructureName", {
        id: "name",
        size: 250,
        header: tForm("form-name"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.salaryStructureName}
          </Text>
        ),
      }),
      columnHelper.accessor("salaryStructureType.salaryStructureTypeName", {
        id: "type",
        size: 200,
        header: t("table-text-type"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.salaryStructureType?.salaryStructureTypeName}
          </Text>
        ),
      }),
      columnHelper.accessor("salaryRules", {
        id: "rules",
        size: 300,
        header: t("table-text-salary-rules"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.salaryRules
              ?.map((rule) => rule.salaryRuleName)
              .join(", ")}
          </Text>
        ),
      }),
      columnHelper.accessor("description", {
        id: "description",
        size: 200,
        header: t("table-text-description"),
        cell: ({ row }) => (
          <Text className="line-clamp-1 font-medium text-gray-900 dark:text-gray-0">
            {row.original.description}
          </Text>
        ),
      }),
      columnHelper.accessor("id", {
        id: "actions",
        size: 100,
        header: "",
        enablePinning: true,
        cell: ({
          row,
          table: {
            options: { meta },
          },
        }) => (
          <div className="flex items-center justify-end gap-3 pe-4">
            <Tooltip
              size="sm"
              content={t("table-text-edit")}
              placement="top"
              rounded="lg"
              className="dropdown-gr card-shadow !rounded-lg border-transparent bg-paper text-title dark:bg-paper dark:text-title"
              arrowClassName="dark:fill-paper [&>path]:stroke-transparent"
              color="invert">
              <ActionIcon
                as="span"
                size="sm"
                variant="outline"
                rounded="lg"
                className="h-6 w-7 cursor-pointer border-gray-500/20">
                <Link
                  href={routes.hr.editSalaryStructure(Number(row.original.id))}>
                  <PencilIcon className="h-4 w-4" />
                </Link>
              </ActionIcon>
            </Tooltip>
            <Tooltip
              size="sm"
              content={t("table-text-view")}
              placement="top"
              rounded="lg"
              className="dropdown-gr card-shadow !rounded-lg border-transparent bg-paper text-title dark:bg-paper dark:text-title"
              arrowClassName="dark:fill-paper [&>path]:stroke-transparent"
              color="invert">
              <ActionIcon
                as="span"
                size="sm"
                variant="outline"
                rounded="lg"
                className="h-6 w-7 cursor-pointer border-gray-500/20">
                <Link
                  href={routes.hr.editSalaryStructure(Number(row.original.id))}>
                  <EyeIcon className="h-4 w-4" />
                </Link>
              </ActionIcon>
            </Tooltip>
            <DeletePopover
              title="table-text-delete-salary-structure"
              description={`${t("table-text-delete-confirm-salary-structure")} #${row.original.id}`}
              onDelete={() =>
                meta?.handleDeleteRow && meta?.handleDeleteRow(row.original)
              }
            />
          </div>
        ),
      }),
    ],
    [t, tForm]
  )
}
