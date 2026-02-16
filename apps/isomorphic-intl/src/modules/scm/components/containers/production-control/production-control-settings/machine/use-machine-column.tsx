"use client";

import { useMemo } from "react";



import { createColumnHelper } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { Checkbox, Text } from "rizzui";



import DeletePopover from "@/components/base/delete-popover";
import { useDrawer } from "@/components/base/drawer-views/use-drawer";
import EditIconButton from "@/components/base/edit-icon-button";
import ViewIconButton from "@/components/base/view-icon-button";
import { Machine } from "@/modules/scm/types/production-control/work-order-tracking/machine-types";
import { formatDate } from "@/utils/format-date";



import MachineFormDrawerView from "./machine-drawer-form";
import MachineDrawerView from "./machine-drawer-view";
import { getMachineStatusBadge } from "./status-badge";





const columnHelper = createColumnHelper<Machine>()

export const useMachineTableColumns = () => {
  const t = useTranslations("table")
  const tText = useTranslations("common")
  const machineName = t("table-text-machine-name")
  const description = t("table-text-description")
  const registerDate = t("table-text-register-date")
  const expireDate = t("table-text-expire-date")
  const cost = t("table-text-cost")
  const status = t("table-text-status")
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
              {machineName}
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
              {row.original.machineName}
            </Text>
          </div>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("description", {
        id: "description",
        size: 240,
        header: description,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.description}
          </Text>
        ),
        enableSorting: true,
      }),
      columnHelper.accessor("registerDate", {
        id: "registerDate",
        size: 240,
        header: registerDate,
        cell: ({ row }) => {
          const date = row.original.registerDate
            ? new Date(row.original.registerDate)
            : null
          return (
            <Text className="font-medium text-gray-900 dark:text-gray-0">
              {date ? formatDate(date, "DD/MM/YYYY") : "-"}
            </Text>
          )
        },
        enableSorting: true,
      }),
      columnHelper.accessor("expireDate", {
        id: "expireDate",
        size: 240,
        header: expireDate,
        cell: ({ row }) => {
          const date = row.original.expireDate
            ? new Date(row.original.expireDate)
            : null
          return (
            <Text className="font-medium text-gray-900 dark:text-gray-0">
              {date ? formatDate(date, "DD/MM/YYYY") : "-"}
            </Text>
          )
        },
        enableSorting: true,
      }),
      columnHelper.accessor("cost", {
        id: "cost",
        size: 240,
        header: cost,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.cost}
          </Text>
        ),
        enableSorting: true,
      }),
      columnHelper.accessor("status", {
        id: "status",
        size: 240,
        header: status,
        cell: ({ row }) => (
          <Text>{getMachineStatusBadge(row.original.status)}</Text>
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
                        <MachineFormDrawerView
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
                      view: <MachineDrawerView initialData={row.original} />,
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
    [t, tText, description, registerDate, expireDate, cost, status]
  )

  return columns
}