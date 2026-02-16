import Link from "next/link"
import { useMemo } from "react"

import { createColumnHelper } from "@tanstack/react-table"
import dayjs from "dayjs"
import { useTranslations } from "next-intl"
import { ActionIcon, Text, Tooltip } from "rizzui"

import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import EyeIcon from "@/components/icons/eye"
import PencilIcon from "@/components/icons/pencil"
import { routes } from "@/config/routes"
import { Application } from "@/types/hrms/recruitment/applications-type"
import { formatDate } from "@/utils/format-date"

import { getListApplicationStatusBadge } from "./application-status-badge"
import ApplicationStatusFormDrawerView from "./application-status-drawer-view"

const columnHelper = createColumnHelper<Application>()

export const useApplicationTableColumns = () => {
  const t = useTranslations("table")
  const tForm = useTranslations("form")
  const updateStatus = tForm("form-update-status")
  const viewApplication = tForm("form-view-application")
  const status = tForm("form-status")
  const { openDrawer } = useDrawer()

  return useMemo(
    () => [
      // columnHelper.accessor("id", {
      //   id: "id",
      //   size: 80,
      //   header: ({ table }) => (
      //     <Checkbox
      //       aria-label="Select all rows"
      //       checked={table.getIsAllPageRowsSelected()}
      //       onChange={() => table.toggleAllPageRowsSelected()}
      //       inputClassName="w-[18px] h-[18px] border-gray-600 dark:border-gray-500"
      //       iconClassName="w-[18px] h-[18px]"
      //     />
      //   ),
      //   cell: ({ row }) => (
      //     <Checkbox
      //       aria-label="Select row"
      //       checked={row.getIsSelected()}
      //       onChange={() => row.toggleSelected()}
      //       inputClassName="w-[18px] h-[18px] border-gray-600 dark:border-gray-500"
      //       iconClassName="w-[18px] h-[18px]"
      //     />
      //   ),
      //   enableSorting: false,
      // }),
      columnHelper.accessor("firstName", {
        id: "name",
        size: 180,
        header: tForm("form-name"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {`${row.original.firstName} ${row.original.lastName}`}
          </Text>
        ),
      }),
      columnHelper.accessor("email", {
        id: "email",
        size: 200,
        header: tForm("form-email"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.email}
          </Text>
        ),
      }),
      columnHelper.accessor("jobPosting.jobPosition.jobPositionName", {
        id: "position",
        size: 200,
        header: tForm("form-job-position"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.jobPosting?.jobPosition?.jobPositionName}
          </Text>
        ),
      }),
      columnHelper.accessor("jobPosting.department.departmentName", {
        id: "department",
        size: 160,
        header: tForm("form-department"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.jobPosting?.department?.departmentName}
          </Text>
        ),
      }),
      columnHelper.accessor("phone", {
        id: "phone",
        size: 140,
        header: tForm("form-phone"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.phone}
          </Text>
        ),
      }),
      columnHelper.accessor("source", {
        id: "source",
        size: 130,
        header: tForm("form-source"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.source}
          </Text>
        ),
      }),
      columnHelper.accessor("appliedDate", {
        id: "appliedDate",
        size: 200,
        header: t("table-text-applied-date"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {formatDate(row.original.appliedDate)}
          </Text>
        ),
      }),
      columnHelper.accessor("status", {
        id: "status",
        size: 180,
        header: status,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {getListApplicationStatusBadge(row.original.status)}
          </Text>
        ),
      }),
      columnHelper.accessor("id", {
        id: "actions",
        size: 120,
        header: "",
        enablePinning: true,
        cell: ({ row }) => (
          <>
            <div className="flex items-center justify-end gap-3 pe-3">
              <Tooltip
                size="sm"
                content={updateStatus}
                placement="top"
                rounded="lg"
                className="dropdown-gr card-shadow !rounded-lg border-transparent bg-paper text-title dark:bg-paper dark:text-title"
                arrowClassName="dark:fill-paper [&>path]:stroke-transparent"
                color="invert">
                <ActionIcon
                  onClick={() =>
                    openDrawer({
                      view: (
                        <ApplicationStatusFormDrawerView
                          isEditForm
                          initialData={row.original}
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
              <Tooltip
                size="sm"
                content={viewApplication}
                placement="top"
                rounded="lg"
                color="invert"
                className="dropdown-gr card-shadow !rounded-lg border-transparent bg-paper text-title dark:bg-paper dark:text-title"
                arrowClassName="dark:fill-paper [&>path]:stroke-transparent">
                <Link
                  href={routes.hr.applicationDetails(Number(row.original.id))}>
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
              {/* <DeletePopover
                title="table-text-delete-account"
                description={`${t("table-text-delete-confirm-account")} #${row.original.id}`}
                onDelete={() =>
                  meta?.handleDeleteRow && meta?.handleDeleteRow(row.original)
                }
              /> */}
            </div>
          </>
        ),
      }),
    ],
    [t, tForm]
  )
}
