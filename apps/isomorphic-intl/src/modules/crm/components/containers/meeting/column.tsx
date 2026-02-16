import dynamic from "next/dynamic"
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
import { useCurrentRole } from "@/hooks/use-current-role"
import { ADMIN_MENU_ROLES } from "@/layouts/beryllium/fixed-menu-items/user-roles"
import { MeetingList } from "@/modules/crm/types/meeting"
import { formatDate } from "@/utils/format-date"

import AssignedToCell from "../user/assigned-to-cell"
import UserByEmail from "../user/user-by-email"

const MeetingDrawerView = dynamic(() => import("./drawer-view"), {
  ssr: false,
})

const columnHelper = createColumnHelper<MeetingList>()

export const useColumn = () => {
  const { openDrawer } = useDrawer()
  const tableT = useTranslations("table")

  const title = tableT("table-text-title")
  const location = tableT("table-text-location")
  const meetingDate = tableT("table-text-meeting-date")
  const relatedTo = tableT("table-text-related-to")
  const participantType = tableT("table-text-participant-type")
  const host = tableT("table-text-host")
  const id = tableT("table-text-id")
  const { roles, hasAnyRole } = useCurrentRole()
  const isDeleteVisible = hasAnyRole(ADMIN_MENU_ROLES)
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
      columnHelper.accessor("title", {
        id: "title",
        size: 100,
        header: title,
        cell: ({ row }) => (
          <span
            className="block max-w-[100px] cursor-pointer truncate font-medium text-gray-900 dark:text-gray-0"
            title={row.original.title}
            onClick={() =>
              openDrawer({
                view: <MeetingDrawerView id={row.original.id} />,
                placement: "right",
                containerClassName: "lg:min-w-[500px] dropdown-gr",
              })
            }>
            {row.original.title}
          </span>
        ),
      }),
      columnHelper.accessor("location", {
        id: "location",
        size: 100,
        header: location,
        cell: ({ row }) => (
          <span
            className="block max-w-[100px] truncate font-medium text-gray-900 dark:text-gray-0"
            title={row.original.location}>
            {row.original.location}
          </span>
        ),
      }),
      columnHelper.accessor("meetingTime", {
        id: "meetingTime",
        size: 150,
        header: meetingDate,
        cell: ({ row }) => {
          const date = row.original.meetingTime
            ? new Date(row.original.meetingTime)
            : null
          return (
            <Text className="font-medium text-gray-900 dark:text-gray-0">
              {date ? formatDate(date, "DD/MM/YYYY h:m a") : ""}
            </Text>
          )
        },
      }),
      columnHelper.accessor("relatedTo", {
        id: "relatedTo",
        size: 100,
        header: relatedTo,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.relatedTo}
          </Text>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("participateType", {
        id: "participateType",
        size: 150,
        header: participantType,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.participateType}
          </Text>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("createdBy", {
        id: "createdBy",
        size: 150,
        header: host,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.createdBy}
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
              content={tableT("table-text-edit")}
              placement="top"
              className="dropdown-gr card-shadow !rounded-lg border-transparent bg-paper text-title dark:bg-paper dark:text-title"
              arrowClassName="dark:fill-paper [&>path]:stroke-transparent"
              color="invert">
              <Link
                href={routes.crm.editMeeting(row.original.id ?? "")}
                aria-label="Edit Meeting">
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
              content={tableT("table-text-view")}
              placement="top"
              className="dropdown-gr card-shadow !rounded-lg border-transparent bg-paper text-title dark:bg-paper dark:text-title"
              arrowClassName="dark:fill-paper [&>path]:stroke-transparent"
              color="invert">
              <ActionIcon
                as="button"
                size="sm"
                variant="outline"
                rounded="lg"
                className="h-6 w-7 border-gray-500/20"
                onClick={() => {
                  openDrawer({
                    view: <MeetingDrawerView id={row.original.id} />,
                    placement: "right",
                    containerClassName: "lg:min-w-[500px] dropdown-gr",
                  })
                }}>
                <EyeIcon className="h-4 w-4" />
              </ActionIcon>
            </Tooltip>
            {isDeleteVisible && (
              <DeletePopover
                title="table-text-delete"
                description={tableT("table-text-delete-confirm-meeting")}
                onDelete={() =>
                  meta?.handleDeleteRow && meta?.handleDeleteRow(row.original)
                }
              />
            )}
          </div>
        ),
      }),
    ]
  }, [tableT])

  return columns
}
