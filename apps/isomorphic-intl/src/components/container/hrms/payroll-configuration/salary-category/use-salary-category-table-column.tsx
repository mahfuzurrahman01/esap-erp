import { useMemo } from "react"

import PencilIcon from "@core/components/icons/pencil"
import { createColumnHelper } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import { ActionIcon, Checkbox, Text, Tooltip } from "rizzui"

import DeletePopover from "@/components/base/delete-popover"
import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import { SalaryCategory } from "@/types/hrms/payroll-configuration/salary-category.types"

import SalaryCategoryFormDrawerView from "./salary-category-form-drawer"

const columnHelper = createColumnHelper<SalaryCategory>()

export const useSalaryCategoryTableColumns = () => {
  const t = useTranslations("table")
  const tForm = useTranslations("form")
  const fullname = t("table-text-fullname")
  const transactionType = t("table-text-transaction-type")
  const description = tForm("form-description")
  const editSalaryCategory = t("table-text-edit-salary-category")

  const code = tForm("form-code")
  const { openDrawer } = useDrawer()
  return useMemo(
    () => [
      columnHelper.accessor("id", {
        id: "id",
        size: 45,
        header: ({ table }) => (
          <div className="px-2">
            <Checkbox
              aria-label="Select all rows"
              checked={table.getIsAllPageRowsSelected()}
              onChange={() => table.toggleAllPageRowsSelected()}
              inputClassName="w-[18px] h-[18px] border-gray-600 dark:border-gray-500"
              iconClassName="w-[18px] h-[18px]"
            />
          </div>
        ),
        cell: ({ row }) => (
          <div className="px-2">
            <Checkbox
              aria-label="Select row"
              checked={row.getIsSelected()}
              onChange={() => row.toggleSelected()}
              inputClassName="w-[18px] h-[18px] border-gray-600 dark:border-gray-500"
              iconClassName="w-[18px] h-[18px]"
            />
          </div>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("salaryCategoryName", {
        id: "salaryCategoryName",
        size: 180,
        header: fullname,
        cell: ({ row }) => (
          <Text className="pl-1 font-medium text-gray-900 dark:text-gray-0">
            {row.original.salaryCategoryName}
          </Text>
        ),
      }),
      columnHelper.accessor("transactionType", {
        id: "transactionType",
        size: 140,
        header: transactionType,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.transactionType}
          </Text>
        ),
      }),
      columnHelper.accessor("code", {
        id: "code",
        size: 140,
        header: code,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.code}
          </Text>
        ),
      }),
      columnHelper.accessor("description", {
        id: "description",
        size: 180,
        header: description,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.description}
          </Text>
        ),
      }),

      columnHelper.accessor("id", {
        id: "actions",
        size: 160,
        header: "",
        enablePinning: true,
        cell: ({
          row,
          table: {
            options: { meta },
          },
        }) => {
          return (
            <>
              <div className="flex items-center justify-end gap-3 pe-3">
                <Tooltip
                  size="sm"
                  content={editSalaryCategory}
                  placement="top"
                  rounded="lg"
                  className="dropdown-gr card-shadow !rounded-lg border-transparent bg-paper text-title dark:bg-paper dark:text-title"
                  arrowClassName="dark:fill-paper [&>path]:stroke-transparent"
                  color="invert">
                  <ActionIcon
                    onClick={() =>
                      openDrawer({
                        view: (
                          <SalaryCategoryFormDrawerView
                            isEditForm
                            initialData={{
                              ...row.original,
                            }}
                          />
                        ),
                        placement: "right",
                        containerClassName: "max-w-[26.25rem]",
                      })
                    }
                    as="span"
                    size="sm"
                    variant="outline"
                    rounded="lg"
                    className="h-6 w-7 cursor-pointer border-gray-500/20">
                    <PencilIcon className="h-4 w-4" />
                  </ActionIcon>
                </Tooltip>
                {/* <Tooltip
                  size="sm"
                  content={viewSalaryCategory}
                  placement="top"
                  rounded="lg"
                  color="invert"
                  className="dropdown-gr card-shadow !rounded-lg border-transparent bg-paper text-title dark:bg-paper dark:text-title"
                  arrowClassName="dark:fill-paper [&>path]:stroke-transparent">
                  <Link href={routes.hr.employeeDetails(row.original.id!)}>
                    <ActionIcon
                      as="span"
                      size="sm"
                      variant="outline"
                      rounded="lg"
                      className="h-6 w-7 border-gray-500/20">
                      <EyeIcon className="h-4 w-4" />
                    </ActionIcon>
                  </Link>
                </Tooltip> */}
                <DeletePopover
                  title="table-text-delete-salary-category"
                  description={`${t("table-text-delete-confirm-salary-category")} #${row.original.id}`}
                  onDelete={() =>
                    meta?.handleDeleteRow && meta?.handleDeleteRow(row.original)
                  }
                />
              </div>
            </>
          )
        },
      }),
    ],
    [t, tForm]
  )
}
