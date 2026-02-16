"use client"

import { useMemo } from "react"

import PencilIcon from "@core/components/icons/pencil"
import { createColumnHelper } from "@tanstack/react-table"
import dayjs from "dayjs"
import { useTranslations } from "next-intl"
import { ActionIcon, Checkbox, Text, Tooltip } from "rizzui"

import DeletePopover from "@/components/base/delete-popover"
import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import { TrainingSession } from "@/types/hrms/training/training-session-type"
import { formatDate } from "@/utils/format-date"

import { getTrainingProgramStatusBadge } from "../training-utils/status-badge"
import TrainingSessionFormDrawerView from "./training-session-form-drawer"

const columnHelper = createColumnHelper<TrainingSession>()

export const useTrainingSessionTableColumns = () => {
  const tTable = useTranslations("table")
  const tHrms = useTranslations("hrms")
  const t = useTranslations("form")

  const { openDrawer } = useDrawer()

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
      columnHelper.accessor("sessionName", {
        id: "sessionName",
        size: 200,
        header: t("form-session-name"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.sessionName}
          </Text>
        ),
      }),
      columnHelper.accessor("trainingProgram", {
        id: "trainingProgram",
        size: 200,
        header: t("form-program-name"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.trainingProgram?.trainingProgramName}
          </Text>
        ),
      }),
      columnHelper.accessor("trainer", {
        id: "trainer",
        size: 200,
        header: t("form-trainer"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.trainer?.firstName} {row.original.trainer?.lastName}
          </Text>
        ),
      }),
      columnHelper.accessor("sessionDate", {
        id: "sessionDate",
        size: 180,
        header: t("form-session-date"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {formatDate(row.original.sessionDate, "DD/MM/YYYY")}
          </Text>
        ),
      }),
      columnHelper.accessor("duration", {
        id: "duration",
        size: 180,
        header: t("form-duration"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.duration} hrs
          </Text>
        ),
      }),
      columnHelper.accessor("location", {
        id: "location",
        size: 200,
        header: t("form-locations"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.location}
          </Text>
        ),
      }),

      columnHelper.accessor("status", {
        id: "status",
        size: 180,
        header: t("form-status"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {getTrainingProgramStatusBadge(row.original.status)}
          </Text>
        ),
      }),
      columnHelper.accessor("id", {
        id: "action",
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
                  content={t("form-edit")}
                  placement="top"
                  rounded="lg"
                  className="dropdown-gr card-shadow !rounded-lg border-transparent bg-paper text-title dark:bg-paper dark:text-title"
                  arrowClassName="dark:fill-paper [&>path]:stroke-transparent"
                  color="invert">
                  <ActionIcon
                    onClick={() =>
                      openDrawer({
                        view: (
                          <TrainingSessionFormDrawerView
                            initialData={row.original}
                            isEditForm
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
                <DeletePopover
                  title="table-text-delete-session"
                  description={`${tHrms("text-delete-session-prompt")} #${row.original.id}`}
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
    [tTable, t, tHrms, openDrawer]
  )

  return columns
}
