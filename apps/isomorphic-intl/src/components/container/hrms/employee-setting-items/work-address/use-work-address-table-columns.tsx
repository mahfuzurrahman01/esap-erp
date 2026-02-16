import Link from "next/link"
import { useMemo } from "react"

import PencilIcon from "@core/components/icons/pencil"
import { createColumnHelper } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import { ActionIcon, Checkbox, Text, Tooltip } from "rizzui"

import DeletePopover from "@/components/base/delete-popover"
import EyeIcon from "@/components/icons/eye"
import { routes } from "@/config/routes"
import { useCurrentRole } from "@/hooks/use-current-role"
import { WorkAddress } from "@/types/hrms/employee/work-address.types"

const columnHelper = createColumnHelper<WorkAddress>()

export const useWorkAddressTableColumns = () => {
  const { hasAnyRole } = useCurrentRole()
  const t = useTranslations("table")
  const tHrms = useTranslations("hrms")
  const tForm = useTranslations("form")
  const workAddressName = tForm("form-name")
  const city = tForm("form-city")
  const country = tForm("form-country")

  const zip = tForm("form-zip")
  const taxID = tForm("form-tax-id")
  const companyName = tForm("form-company-name")
  const industry = tForm("form-industry")
  const phone = tForm("form-phone")
  const email = tForm("form-email")
  const website = tForm("form-website")

  const isDeleteVisible = hasAnyRole(["Admin", "HR Admin"])

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
      columnHelper.accessor("workingAddressName", {
        id: "workAddressName",
        size: 200,
        header: workAddressName,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.workingAddressName}
          </Text>
        ),
      }),
      columnHelper.accessor("city", {
        id: "city",
        size: 180,
        header: city,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.city}
          </Text>
        ),
      }),
      columnHelper.accessor("country", {
        id: "country",
        size: 180,
        header: country,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.country}
          </Text>
        ),
      }),
      columnHelper.accessor("zip", {
        id: "zip",
        size: 180,
        header: zip,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.zip}
          </Text>
        ),
      }),
      columnHelper.accessor("taxID", {
        id: "taxID",
        size: 180,
        header: taxID,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.taxID}
          </Text>
        ),
      }),
      columnHelper.accessor("companyName", {
        id: "companyName",
        size: 240,
        header: companyName,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.companyName}
          </Text>
        ),
      }),
      columnHelper.accessor("industry", {
        id: "industry",
        size: 180,
        header: industry,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.industry}
          </Text>
        ),
      }),
      columnHelper.accessor("phone", {
        id: "phone",
        size: 180,
        header: phone,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.phone}
          </Text>
        ),
      }),
      columnHelper.accessor("email", {
        id: "email",
        size: 180,
        header: email,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.email}
          </Text>
        ),
      }),
      columnHelper.accessor("website", {
        id: "website",
        size: 180,
        header: website,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.website}
          </Text>
        ),
      }),

      columnHelper.accessor("workingAddressName", {
        id: "action",
        size: isDeleteVisible ? 160 : 120,
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
                  content={t("table-text-edit")}
                  placement="top"
                  rounded="lg"
                  className="dropdown-gr card-shadow !rounded-lg border-transparent bg-paper text-title dark:bg-paper dark:text-title"
                  arrowClassName="dark:fill-paper [&>path]:stroke-transparent"
                  color="invert">
                  <Link href={routes.hr.editWorkAddress(row.original.id!)}>
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
                  <Link href={routes.hr.viewWorkAddress(row.original.id!)}>
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
                {isDeleteVisible && (
                  <DeletePopover
                    title="text-delete-work-address"
                    description={`${tHrms("text-delete-work-address-prompt")} #${row.original.id}`}
                    onDelete={() =>
                      meta?.handleDeleteRow &&
                      meta?.handleDeleteRow(row.original)
                    }
                  />
                )}
              </div>
            </>
          )
        },
      }),
    ],
    [t, tForm]
  )

  return columns
}
