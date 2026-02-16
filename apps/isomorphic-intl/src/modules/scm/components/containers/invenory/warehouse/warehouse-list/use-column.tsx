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
import { Warehouse } from "@/modules/scm/types/inventory/warehouse/warehouse-types";



import { getWarehouseStatusBadge } from "./status-badge";
import WarehouseViewDrawer from "./warehouse-view-drawer";
import { useCurrentRole } from "@/hooks/use-current-role";





const columnHelper = createColumnHelper<Warehouse>()

export const useWarehouseColumn = () => {
  const t = useTranslations("form")
  const tableT = useTranslations("table")

  const { openDrawer } = useDrawer()
  const { hasAnyRole } = useCurrentRole()
  const isAuthority = hasAnyRole(["Super Admin", "SCM Admin"])

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
              {t("form-warehouse-name")}
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
              {row.original.warehouseName}
            </Text>
          </div>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("companyName", {
        id: "companyName",
        size: 240,
        header: t("form-company-name"),
        enableSorting: true,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue()}
          </Text>
        ),
      }),
      columnHelper.accessor("location", {
        id: "location",
        size: 240,
        header: t("form-locations"),
        enableSorting: true,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue()}
          </Text>
        ),
      }),
      columnHelper.accessor("capacity", {
        id: "capacity",
        size: 240,
        header: t("form-capacity"),
        enableSorting: true,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue()}
          </Text>
        ),
      }),
      columnHelper.accessor("inUseCapacity", {
        id: "inUseCapacity",
        size: 240,
        header: t("form-in-use-capacity"),
        enableSorting: true,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue()}
          </Text>
        ),
      }),
      columnHelper.accessor("warehouseManagerName", {
        id: "warehouseManagerName",
        size: 240,
        header: t("form-warehouse-manager"),
        enableSorting: true,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue()}
          </Text>
        ),
      }),
      columnHelper.accessor((row) => `${row.startHour} - ${row.endHour}`, {
        id: "startHour",
        size: 240,
        header: t("form-operational-hours"),
        enableSorting: true,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.startHour} - {row.original.endHour}
          </Text>
        ),
      }),

      columnHelper.accessor("status", {
        id: "status",
        size: 240,
        header: t("form-status"),
        filterFn: "statusFilter" as any,
        enableSorting: true,
        cell: (info) => {
          const value = info.renderValue()
          return value ? getWarehouseStatusBadge(value) : null
        },
      }),
      columnHelper.accessor("id", {
        id: "action",
        size: 100,
        header: "",
        enablePinning: true,
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
                href={routes.scm.inventory.warehouse.editWarehouse(
                  Number(row.original.id)
                )}
                aria-label="go to stock edit">
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
              onClick={() => {
                openDrawer({
                  view: <WarehouseViewDrawer initialData={row.original} />,
                  containerClassName: "max-w-[30rem] overflow-auto",
                  placement: "right",
                })
              }}
            />
            {
              isAuthority && (
                <DeletePopover
              title="table-text-delete"
              description={`Are you sure you want to delete this warehouse #${row.original.id}?`}
              onDelete={() =>
                meta?.handleDeleteRow && meta?.handleDeleteRow(row.original)
              }
            />
              )
            }
          </div>
        ),
      }),
    ],
    [t, tableT, openDrawer]
  )

  return columns
}