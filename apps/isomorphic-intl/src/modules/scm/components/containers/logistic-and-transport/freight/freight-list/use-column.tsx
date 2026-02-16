"use client";

import Link from "next/link";
import { useMemo } from "react";



import { createColumnHelper } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { ActionIcon, Checkbox, Text, Tooltip } from "rizzui";



import DeletePopover from "@/components/base/delete-popover";
import { useDrawer } from "@/components/base/drawer-views/use-drawer";
import ViewIconButton from "@/components/base/view-icon-button";
import PencilIcon from "@/components/icons/pencil";
import { routes } from "@/config/routes";
import { Freight } from "@/modules/scm/types/logistics-and-transport/freight/freight-types";
import { formatDate } from "@/utils/format-date";



import FreightViewDrawer from "./freight-view-drawer";





const columnHelper = createColumnHelper<Freight>()

export const useFreightColumn = () => {
  const t = useTranslations("form")
  const tableT = useTranslations("table")

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
              {t("form-carrier")}
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
              {row.original.carrierName}
            </Text>
          </div>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("origin", {
        id: "origin",
        size: 240,
        header: t("form-origin"),
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue() || "-"}
          </Text>
        ),
        enableSorting: true,
      }),
      columnHelper.accessor("destination", {
        id: "destination",
        size: 190,
        enableSorting: true,
        header: t("form-destination"),
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue() || "-"}
          </Text>
        ),
      }),
      columnHelper.accessor("routeStart", {
        id: "routeStart",
        size: 150,
        enableSorting: true,
        header: t("form-route-start"),
        cell: ({ row }) => {
          const date = row.original.routeStart
            ? new Date(row.original.routeStart)
            : null
          return (
            <Text className="font-medium text-gray-900 dark:text-gray-0">
              {date ? formatDate(date, "DD/MM/YYYY") : "-"}
            </Text>
          )
        },
      }),
      columnHelper.accessor("routeEnd", {
        id: "routeEnd",
        size: 150,
        enableSorting: true,
        header: t("form-route-end"),
        cell: ({ row }) => {
          const date = row.original.routeEnd
            ? new Date(row.original.routeEnd)
            : null
          return (
            <Text className="font-medium text-gray-900 dark:text-gray-0">
              {date ? formatDate(date, "DD/MM/YYYY") : "-"}
            </Text>
          )
        },
      }),
      columnHelper.accessor("transitCost", {
        id: "transitCost",
        size: 140,
        header: t("form-transit-cost"),
        enableSorting: true,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue() || "-"}
          </Text>
        ),
      }),
      columnHelper.accessor("updatedDate", {
        id: "action",
        size: 100,
        header: "",
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
                href={routes.scm.logisticsAndTransport.freight.editFreight(
                  Number(row.original.id)
                )}
                aria-label="go to forecast edit">
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

            <ViewIconButton
              onClick={() =>
                openDrawer({
                  view: <FreightViewDrawer initialData={row.original} />,
                  placement: "right",
                })
              }
            />

            <DeletePopover
              title="table-text-delete"
              description={`Are you sure you want to delete this freight #${row.original.id}?`}
              onDelete={() => {
                meta?.handleDeleteRow && meta?.handleDeleteRow(row.original)
              }}
            />
          </div>
        ),
      }),
    ],
    [t, tableT]
  )

  return columns
}