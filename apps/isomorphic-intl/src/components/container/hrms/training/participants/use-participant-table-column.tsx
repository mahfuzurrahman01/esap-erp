"use client"

import { useMemo } from "react"

import PencilIcon from "@core/components/icons/pencil"
import { createColumnHelper } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import { ActionIcon, Text, Tooltip } from "rizzui"

import DeletePopover from "@/components/base/delete-popover"
import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import { Participant } from "@/types/hrms/training/participants-type"

import ParticipantFormDrawerView from "./participant-form-drawer"

const columnHelper = createColumnHelper<Participant>()

export const useParticipantsTableColumns = () => {
  const tHrms = useTranslations("hrms")
  const t = useTranslations("form")

  const { openDrawer } = useDrawer()

  const columns = useMemo(
    () => [
      columnHelper.accessor("id", {
        id: "id",
        header: t("form-id"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.id}
          </Text>
        ),
      }),

      columnHelper.accessor("trainingProgram", {
        id: "trainingProgram",
        header: t("form-program"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.trainingProgram?.trainingProgramName}
          </Text>
        ),
      }),

      columnHelper.accessor("id", {
        id: "action",
        header: "",
        cell: ({
          row,
          table: {
            options: { meta },
          },
        }) => {
          return (
            <div className="flex items-center justify-end gap-3 pe-3">
              <Tooltip
                size="sm"
                content={t("form-edit")}
                placement="top"
                color="invert">
                <ActionIcon
                  onClick={() =>
                    openDrawer({
                      view: (
                        <ParticipantFormDrawerView
                          initialData={row.original}
                          isEditForm
                        />
                      ),
                      placement: "right",
                    })
                  }
                  variant="outline"
                  className="cursor-pointer">
                  <PencilIcon className="h-4 w-4" />
                </ActionIcon>
              </Tooltip>
              <DeletePopover
                title={t("form-delete-participant")}
                description={`${tHrms("text-delete-participant-prompt")} #${
                  row.original.id
                }`}
                onDelete={() =>
                  meta?.handleDeleteRow && meta?.handleDeleteRow(row.original)
                }
              />
            </div>
          )
        },
      }),
    ],
    [t, tHrms, openDrawer]
  )

  return columns
}
