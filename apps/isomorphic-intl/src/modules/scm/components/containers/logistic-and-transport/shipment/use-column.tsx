"use client";

import Link from "next/link";
import { useMemo } from "react";



import { createColumnHelper } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { Checkbox, Text } from "rizzui";



import { useDrawer } from "@/components/base/drawer-views/use-drawer";
import ListPopover from "@/components/base/list-popover";
import EyeIcon from "@/components/icons/eye";
import PencilIcon from "@/components/icons/pencil";
import ApproveIcon from "@/components/icons/scm/approve-icon";
import FreightIcon from "@/components/icons/scm/freight-icon";
import ReturnProcessIcon from "@/components/icons/scm/return-process-icon";
import TrashIcon from "@/components/icons/trash";
import { Button } from "@/components/ui";
import { routes } from "@/config/routes";
import { Shipment } from "@/modules/scm/types/logistics-and-transport/shipment/shipment-types";
import { formatDate } from "@/utils/format-date";



import ReceivedApprovalForm from "./received-approval-form";
import ReturnProcessCreateEditFormDrawer from "./return-process-create-edit-form-drawer";
import ShipmentCreateEditFormDrawer from "./shipment-create-edit-form-drawer";
import ShipmentViewDrawer from "./shipment-view-drawer";
import { getShipmentStatusBadge } from "./status-badge";
import { useCurrentRole } from "@/hooks/use-current-role";





const columnHelper = createColumnHelper<Shipment>()

export const useShipmentColumn = () => {
  const t = useTranslations("form")
  const tableT = useTranslations("table")

  const { openDrawer } = useDrawer()
  const { hasAnyRole } = useCurrentRole()
  const isAuthority = hasAnyRole(["Super Admin", "SCM Admin"])

  const columns = useMemo(
    () => [
      columnHelper.accessor("id", {
        id: "id",
        size: 100,
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
              {tableT("table-text-id")}
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
              {row.original.stockTransferId}
            </Text>
          </div>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("trackingNo", {
        id: "trackingNo",
        size: 340,
        header: t("form-tracking-no"),
        enableSorting: true,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue() || "-"}
          </Text>
        ),
      }),
      columnHelper.accessor("carrierName", {
        id: "carrierName",
        size: 340,
        header: t("form-carrier-name"),
        enableSorting: true,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue() || "-"}
          </Text>
        ),
      }),
      columnHelper.accessor("shipmentDate", {
        id: "shipmentDate",
        size: 340,
        header: t("form-shipment-date"),
        cell: ({ row }) => {
          const date = row.original.shipmentDate
            ? new Date(row.original.shipmentDate)
            : null
          return (
            <Text className="font-medium text-gray-900 dark:text-gray-0">
              {date ? formatDate(date, "DD/MM/YYYY") : "-"}
            </Text>
          )
        },
        enableSorting: true,
      }),
      columnHelper.accessor("currentStatus", {
        id: "currentStatus",
        size: 240,
        enableSorting: true,
        header: t("form-current-status"),
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {getShipmentStatusBadge(info.renderValue() || "in-transit")}
          </Text>
        ),
      }),
      columnHelper.accessor("updatedDate", {
        id: "action",
        size: 60,
        header: "",
        cell: ({
          row,
          table: {
            options: { meta },
          },
        }) => (
          <div className="flex items-center justify-end">
            <ListPopover>
              <Button
                as="span"
                className="dark:text-title-dark dark:bg-paper-dark h-7 w-full cursor-pointer justify-start gap-2 bg-transparent px-3 font-semibold text-title transition-colors hover:bg-gray-500/10 dark:hover:bg-gray-600/10"
                onClick={() =>
                  openDrawer({
                    view: (
                      <ShipmentCreateEditFormDrawer
                        isEditForm
                        initialData={row.original}
                      />
                    ),
                    placement: "right",
                    containerClassName: "max-w-[25.25rem]",
                  })
                }>
                <PencilIcon className="h-4 w-4" />
                {tableT("table-text-edit")}
              </Button>
              <Button
                as="span"
                className="dark:text-title-dark dark:bg-paper-dark h-7 w-full cursor-pointer justify-start gap-2 bg-transparent px-3 font-semibold text-title transition-colors hover:bg-gray-500/10 dark:hover:bg-gray-600/10"
                onClick={() =>
                  openDrawer({
                    view: <ShipmentViewDrawer initialData={row.original} />,
                    placement: "right",
                    containerClassName: "max-w-[30rem]",
                  })
                }>
                <EyeIcon className="h-4 w-4" />
                {tableT("table-text-view")}
              </Button>
              <Button
                as="span"
                className="dark:text-title-dark dark:bg-paper-dark h-7 w-full cursor-pointer justify-start gap-2 bg-transparent px-3 font-semibold text-title transition-colors hover:bg-gray-500/10 dark:hover:bg-gray-600/10"
                onClick={() =>
                  openDrawer({
                    view: (
                      <ReturnProcessCreateEditFormDrawer
                        initialData={row.original}
                        isEditForm={false}
                      />
                    ),
                    placement: "right",
                    containerClassName: "max-w-[25.25rem]",
                  })
                }>
                <ReturnProcessIcon className="h-4 w-4" />
                {tableT("table-text-return-process")}
              </Button>
              {
                isAuthority && (
                <Button
                as="span"
                className="dark:text-title-dark dark:bg-paper-dark h-7 w-full cursor-pointer justify-start gap-2 bg-transparent px-3 font-semibold text-title transition-colors hover:bg-gray-500/10 dark:hover:bg-gray-600/10"
                onClick={() =>
                  openDrawer({
                    view: (
                      <ReceivedApprovalForm
                        initialData={row.original}
                        isEditForm
                      />
                    ),
                    placement: "right",
                    containerClassName: "max-w-[25.25rem]",
                  })
                }>
                <ApproveIcon className="h-4 w-4" />
                {tableT("table-text-received-approval")}
              </Button>
                )
              }
              <Link
                href={routes.scm.logisticsAndTransport.shipment.createFreight(
                  Number(row.original.id)
                )}
                aria-label="Generate PO"
                className="flex w-full items-center gap-2 rounded-md px-3 py-1 font-semibold transition-colors hover:bg-gray-500/10">
                <FreightIcon className="h-4 w-4" />
                {tableT("table-text-create-freight")}
              </Link>
              {
                isAuthority && (
                <Button
                size="sm"
                variant="text"
                color="danger"
                className="h-7 w-full justify-start gap-2 font-semibold text-title hover:bg-red/20 hover:text-red"
                onClick={() => {
                  meta?.handleDeleteRow && meta?.handleDeleteRow(row.original)
                }}>
                <TrashIcon className="h-4 w-4" />
                {tableT("table-text-delete")}
              </Button>
                )
              }
            </ListPopover>
          </div>
        ),
      }),
    ],
    [t, tableT]
  )

  return columns
}