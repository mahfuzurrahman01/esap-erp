"use client"

import Link from "next/link"
import { useMemo } from "react"

import { createColumnHelper } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import { ActionIcon, Text, Tooltip } from "rizzui"
import { Checkbox } from "@/components/ui"

import DeletePopover from "@/components/base/delete-popover"
import EyeIcon from "@/components/icons/eye"
import PencilIcon from "@/components/icons/pencil"
import { routes } from "@/config/routes"
import { useCurrentRole } from "@/hooks/use-current-role"
import { ADMIN_MENU_ROLES } from "@/layouts/beryllium/fixed-menu-items/user-roles"
import { CompanyList } from "@/modules/fms/types"
import { formatDate } from "@/utils/format-date"

const columnHelper = createColumnHelper<CompanyList>()

export const useColumn = () => {
  const t = useTranslations("form")
  const tableT = useTranslations("table")
  // const { hasAnyRole } = useCurrentRole()
  // const isDeleteVisible = hasAnyRole(ADMIN_MENU_ROLES)
  const columns = useMemo(() => {
    const companyName = t("form-company-name")
    const country = t("form-country")
    const currency = t("form-currency")
    const dateOfEstablishment = t("form-date-of-establishment")
    const createdAt = t("form-created-at")
    const updatedAt = t("form-updated-at")

    return [
      columnHelper.accessor("id", {
        id: "id",
        size: 350,
        header: ({ table }) => (
          <div className="flex items-center gap-2">
            <Checkbox
              aria-label="Select all rows"
              checked={table.getIsAllPageRowsSelected()}
              onChange={() => table.toggleAllPageRowsSelected()}
            />
            <Text className="ms-2 font-medium text-gray-900 dark:text-gray-500">
              {companyName}
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
              {row.original.companyName}
            </Text>
          </div>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("country", {
        id: "country",
        size: 180,
        header: country,
        cell: ({ row }) => (
          <Text className="font-medium text-title">
            {row.original.country?.countryName}
          </Text>
        ),
      }),
      columnHelper.accessor("currency.currencyName", {
        id: "currency",
        size: 180,
        header: currency,
        cell: ({ row }) => (
          <Text className="font-medium text-title">
            {row.original.currency?.currencyName}
          </Text>
        ),
      }),
      columnHelper.accessor("dateOfEstablishment", {
        id: "dateOfEstablishment",
        size: 240,
        header: dateOfEstablishment,
        cell: ({ row }) => (
          <Text className="font-medium text-title">
            {row.original.dateOfEstablishment &&
              formatDate(row.original.dateOfEstablishment, "DD-MM-YYYY")}
          </Text>
        ),
      }),
      columnHelper.accessor("actions", {
        id: "actions",
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
          <div className="flex items-center justify-end gap-3 pe-3">
            <Tooltip
              size="sm"
              content={tableT("table-text-edit-company")}
              placement="top"
              rounded="lg"
              className="dropdown-gr card-shadow !rounded-lg border-transparent bg-paper text-title dark:bg-paper dark:text-title"
              arrowClassName="dark:fill-paper [&>path]:stroke-transparent"
              color="invert">
              <Link
                href={routes.fms.editCompany(row.original.id ?? 0)}
                aria-label="Edit company">
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
              content={tableT("table-text-view-company")}
              placement="top"
              rounded="lg"
              className="dropdown-gr card-shadow !rounded-lg border-transparent bg-paper text-title dark:bg-paper dark:text-title"
              arrowClassName="dark:fill-paper [&>path]:stroke-transparent"
              color="invert">
              <Link
                href={routes.fms.viewCompany(row.original.id ?? 0)}
                aria-label="View company">
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
              title="table-text-delete-company"
              description={`${tableT("table-text-delete-confirm-company")} #${row.original.id}`}
              onDelete={() =>
                meta?.handleDeleteRow && meta?.handleDeleteRow(row.original)
              }
            />
            {/* {isDeleteVisible && (
            )} */}
          </div>
        ),
      }),
    ]
  }, [t, tableT])

  return columns
}
