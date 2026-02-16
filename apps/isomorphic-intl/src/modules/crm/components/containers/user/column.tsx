import Link from "next/link"
import { useMemo } from "react"

import AvatarCard from "@core/ui/avatar-card"
import { createColumnHelper } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import { ActionIcon, Checkbox, Text, Tooltip } from "rizzui"

import EyeIcon from "@/components/icons/eye"
import { routes } from "@/config/routes"
import { UserList } from "@/types/auth"
import { useCountryById } from "@/modules/fms/hooks/use-country"

const columnHelper = createColumnHelper<UserList>()

const CountryCell = ({ countryId }: { countryId: number }) => {
  const tableT = useTranslations("table")
  const { data: countryData, isLoading, error } = useCountryById(countryId)
  if (error)
    return (
      <Text className="font-medium text-gray-900 dark:text-gray-0">
        ...
      </Text>
    )
  if (isLoading)
    return (
      <Text className="font-medium text-gray-900 dark:text-gray-0">
        {tableT("table-text-loading")}
      </Text>
    )
  const countryName = countryData?.countryName || ""
  return (
    <Text className="font-medium text-title">
      {countryName}
    </Text>
  )
}

export const useColumn = () => {
  const tableT = useTranslations("table")

  const columns = useMemo(() => {
    const fullName = tableT("table-text-full-name")
    const phone = tableT("table-text-phone")
    const email = tableT("table-text-email")
    const roles = tableT("table-text-roles")
    const country = tableT("table-text-country")
    const id = tableT("table-text-id")

    return [
      columnHelper.accessor("shortOrder", {
        id: "shortOrder",
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
              inputClassName="w-[18px] h-[18px] border-gray-600 dark:border-gray-500/20"
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
        size: 220,
        header: fullName,
        cell: ({ row }) => (
          <Link href={routes.crm.viewProfile(row.original.userId ?? "")}>
            <AvatarCard
              src={row.original.profilePicturePath as string}
              name={`${row.original?.firstName || tableT("table-text-user")} ${row.original?.lastName || ""}`}
            />
          </Link>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("phoneNumber", {
        id: "phoneNumber",
        size: 100,
        header: phone,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.phoneNumber}
          </Text>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("email", {
        id: "email",
        size: 100,
        header: email,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original?.email}
          </Text>
        ),
      }),
      columnHelper.accessor("roles", {
        id: "roles",
        size: 100,
        header: roles,
        cell: ({ row }) => (
          <span
            className="block max-w-[100px] truncate font-medium text-gray-900 dark:text-gray-0"
            title={row.original.roles}>
            {row.original.roles}
          </span>
        ),
      }),
      columnHelper.accessor("country", {
        id: "country",
        size: 100,
        header: country,
        cell: ({ row }) => {
          const country = row.original.country;
          if (typeof country === 'string' && isNaN(Number(country))) {
            return <span className="text-title">{country}</span>;
          } else if (country === null || country === undefined) {
            return <span>N/A</span>;
          } else {
            return <CountryCell countryId={country} />;
          }
        },
        enableSorting: false,
      }),
      columnHelper.accessor("action", {
        id: "actions",
        size: 100,
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
            {/* <Tooltip
              size="sm"
              content={tableT("table-text-edit-user")}
              placement="top"
              className="dropdown-gr card-shadow !rounded-lg border-transparent bg-paper text-title dark:bg-paper dark:text-title"
              arrowClassName="dark:fill-paper [&>path]:stroke-transparent"
              color="invert">
              <Link
                href={routes.crm.editProfile(row.original.userId ?? "")}
                aria-label="Edit user">
                <ActionIcon
                  as="button"
                  size="sm"
                  variant="outline"
                  rounded="lg"
                  className="h-6 w-7 border-gray-500/20">
                  <PencilIcon className="h-4 w-4" />
                </ActionIcon>
              </Link>
            </Tooltip> */}
            <Tooltip
              size="sm"
              content={tableT("table-text-view-user")}
              placement="top"
              className="dropdown-gr card-shadow !rounded-lg border-transparent bg-paper text-title dark:bg-paper dark:text-title"
              arrowClassName="dark:fill-paper [&>path]:stroke-transparent"
              color="invert">
              <Link
                href={routes.crm.viewProfile(row.original.userId ?? "")}
                aria-label="View user">
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
          </div>
        ),
      }),
    ]
  }, [tableT])

  return columns
}
