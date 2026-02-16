"use client";

import { useMemo } from "react";



import { createColumnHelper } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { Checkbox, Text } from "rizzui";



import DeletePopover from "@/components/base/delete-popover";
import { useDrawer } from "@/components/base/drawer-views/use-drawer";
import EditIconButton from "@/components/base/edit-icon-button";
import ViewIconButton from "@/components/base/view-icon-button";
import { WorkCenter } from "@/modules/scm/types/production-control/work-order-tracking/work-center-types";



import WorkCenterFormDrawerView from "./work-center-drawer-form";
import WorkCenterDrawerView from "./work-center-drawer-view";





const columnHelper = createColumnHelper<WorkCenter>()

export const useWorkCenterTableColumns = () => {
  const t = useTranslations("table")
  const tText = useTranslations("common")
  const workCenterName = t("table-text-work-center-name")
  const location = t("table-text-location")
  const capacity = t("table-text-capacity")
  const editWorkCenter = t("table-text-edit")
  const viewWorkCenter = t("table-text-view")
  const { openDrawer } = useDrawer()

  const columns = useMemo(
    () => [
      columnHelper.accessor("id", {
        id: "id",
        size: 300,
        header: ({ table }) => (
          <div className="flex items-center gap-2">
            <Checkbox
              aria-label="Select all rows"
              checked={table.getIsAllPageRowsSelected()}
              onChange={() => table.toggleAllPageRowsSelected()}
              className="h-[18px] w-[18px]"
              inputClassName="w-[18px] h-[18px] border-gray-600 dark:border-gray-500"
              iconClassName="w-[18px] h-[18px]"
            />
            <Text className="ms-2 font-medium text-gray-900 dark:text-gray-500">
              {workCenterName}
            </Text>
          </div>
        ),
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <Checkbox
              aria-label="Select row"
              checked={row.getIsSelected()}
              onChange={() => row.toggleSelected()}
              className="h-[18px] w-[18px]"
              inputClassName="w-[18px] h-[18px] border-gray-600 dark:border-gray-500"
              iconClassName="w-[18px] h-[18px]"
            />
            <Text className="ms-2 font-medium text-gray-900 dark:text-gray-0">
              {row.original.workCenterName}
            </Text>
          </div>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("location", {
        id: "location",
        size: 340,
        header: location,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.location}
          </Text>
        ),
        enableSorting: true,
      }),
      columnHelper.accessor("capacity", {
        id: "capacity",
        size: 240,
        header: capacity,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.capacity}
          </Text>
        ),
        enableSorting: true,
      }),
      columnHelper.accessor("id", {
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
        }) => {
          return (
            <>
              <div className="flex items-center justify-end gap-3 pe-3">
                <EditIconButton
                  onClick={() =>
                    openDrawer({
                      view: (
                        <WorkCenterFormDrawerView
                          isEditForm
                          initialData={row.original}
                        />
                      ),
                      placement: "right",
                      containerClassName: "max-w-[26.25rem]",
                    })
                  }
                />
                <ViewIconButton
                  onClick={() => {
                    openDrawer({
                      view: <WorkCenterDrawerView initialData={row.original} />,
                      containerClassName: "max-w-[500px] overflow-auto",
                      placement: "right",
                    })
                  }}
                />
                <DeletePopover
                  translationObjectName="common"
                  title="text-delete"
                  description={`${tText("text-delete-prompt")} #${row.original.id}`}
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
    [t, workCenterName, location, capacity, editWorkCenter, viewWorkCenter]
  )

  return columns
}