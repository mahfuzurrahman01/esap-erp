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
import { CapacityPlanning } from "@/modules/scm/types/demand-and-forecasting/capacity-planning/capacity-planning-types";
import { formatDate } from "@/utils/format-date";



import CapacityPlanningViewDrawer from "./capacity-planning-view-drawer";





const columnHelper = createColumnHelper<CapacityPlanning>()

export const useCapacityPlanningColumn = () => {
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
              {t("form-sku")}
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
              {row.original.sku}
            </Text>
          </div>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("productName", {
        id: "productName",
        size: 300,
        header: t("form-product-name"),
        enableSorting: true,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue() || "-"}
          </Text>
        ),
      }),
      columnHelper.accessor("supplierCapacity", {
        id: "supplierCapacity",
        size: 300,
        header: t("form-supplier-capacity"),
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue() || "-"}
          </Text>
        ),
        enableSorting: true,
      }),
      columnHelper.accessor("manufacturingCapacity", {
        id: "manufacturingCapacity",
        size: 300,
        enableSorting: true,
        header: t("form-manufacturing-capacity"),
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue() || "-"}
          </Text>
        ),
      }),
      columnHelper.accessor("warehouseCapacity", {
        id: "warehouseCapacity",
        size: 300,
        header: t("form-warehouse-capacity"),
        enableSorting: true,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue() || "-"}
          </Text>
        ),
      }),
      columnHelper.accessor("plannedProductionDate", {
        id: "plannedProductionDate",
        size: 300,
        header: t("form-planned-production-date"),
        enableSorting: true,
        cell: ({ row }) => {
          const date = row.original.plannedProductionDate
            ? new Date(row.original.plannedProductionDate)
            : null
          return (
            <Text className="font-medium text-gray-900 dark:text-gray-0">
              {date ? formatDate(date, "DD/MM/YYYY") : "-"}
            </Text>
          )
        },
      }),
      columnHelper.accessor("plannedProductionQuantity", {
        id: "plannedProductionQuantity",
        size: 300,
        header: t("form-planned-production-quantity"),
        enableSorting: true,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue() || "-"}
          </Text>
        ),
      }),
      columnHelper.accessor("createdDate", {
        id: "createdDate",
        size: 300,
        header: t("form-created-date"),
        enableSorting: true,
        cell: ({ row }) => {
          const date = row.original.createdDate
            ? new Date(row.original.createdDate)
            : null
          return (
            <Text className="font-medium text-gray-900 dark:text-gray-0">
              {date ? formatDate(date, "DD/MM/YYYY") : "-"}
            </Text>
          )
        },
      }),
      columnHelper.accessor("updatedDate", {
        id: "updatedDate",
        size: 300,
        header: t("form-updated-date"),
        enableSorting: true,
        cell: ({ row }) => {
          const date = row.original.updatedDate
            ? new Date(row.original.updatedDate)
            : null
          return (
            <Text className="font-medium text-gray-900 dark:text-gray-0">
              {date ? formatDate(date, "DD/MM/YYYY") : "-"}
            </Text>
          )
        },
      }),
      columnHelper.accessor("productId", {
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
                href={routes.scm.demandForecasting.capacityPlanning.editCapacityPlanning(
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
                  view: (
                    <CapacityPlanningViewDrawer initialData={row.original} />
                  ),
                  placement: "right",
                })
              }
            />

            <DeletePopover
              title="table-text-delete"
              description={`Are you sure you want to delete this forecast #${row.original.id}?`}
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