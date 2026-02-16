"use client";

import Link from "next/link";
import { useMemo } from "react";



import EyeIcon from "@core/components/icons/eye";
import { createColumnHelper } from "@tanstack/react-table";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";
import { Checkbox, Text } from "rizzui";



import { useDrawer } from "@/components/base/drawer-views/use-drawer";
import ListPopover from "@/components/base/list-popover";
import PencilIcon from "@/components/icons/pencil";
import ApproveIcon from "@/components/icons/scm/approve-icon";
import AvailableCheckIcon from "@/components/icons/scm/available-check-icon";
import BomVersionIcon from "@/components/icons/scm/bom-version-icon";
import { WorkOrderIcon } from "@/components/icons/scm/work-order-icon";
import TrashIcon from "@/components/icons/trash";
import { Button } from "@/components/ui";
import { routes } from "@/config/routes";
import { BillOfMaterials } from "@/modules/scm/types/production-control/bill-of-materials/bill-of-materials-type";



import BillOfMaterialsApprovalForm from "./bill-of-materials-approval-form";
import BillOfMaterialsVersionCreateEditFormDrawer from "./bill-of-materials-version-create-edit-form-drawer";
import { getBillOfMaterialsStatusBadge } from "./status-badge";
import { useCurrentRole } from "@/hooks/use-current-role";





const columnHelper = createColumnHelper<BillOfMaterials>()

export const useBillOfMaterialsColumn = () => {
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
              {t("form-company-name")}
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
              {row.original.companyName}
            </Text>
          </div>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("currencyName", {
        id: "currencyName",
        size: 240,
        header: t("form-currency-name"),
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue()}
          </Text>
        ),
        enableSorting: true,
      }),
      columnHelper.accessor("workCenterName", {
        id: "workCenterName",
        size: 240,
        header: t("form-work-center"),
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue()}
          </Text>
        ),
        enableSorting: true,
      }),
      columnHelper.accessor("scheduledFrom", {
        id: "scheduledFrom",
        size: 240,
        header: t("form-scheduled-from"),
        cell: (info) => {
          const scheduledFrom = info.getValue()
          return (
            <Text className="font-medium text-gray-900 dark:text-gray-0">
              {scheduledFrom
                ? dayjs(scheduledFrom).format("DD/MM/YYYY")
                : "-"}
            </Text>
          )
        },
        enableSorting: true,
      }),
      columnHelper.accessor("scheduledTo", {
        id: "scheduledTo",
        size: 240,
        header: t("form-scheduled-to"),
        cell: (info) => {
          const scheduledTo = info.getValue()
          return (
            <Text className="font-medium text-gray-900 dark:text-gray-0">
              {scheduledTo ? dayjs(scheduledTo).format("DD/MM/YYYY") : "-"}
            </Text>
          )
        },
        enableSorting: true,
      }),
      columnHelper.accessor("materialCost", {
        id: "materialCost",
        size: 240,
        header: t("form-material-cost"),
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue()}
          </Text>
        ),
        enableSorting: true,
      }),
      columnHelper.accessor("approvalStatus", {
        id: "approvalStatus",
        size: 240,
        header: t("form-approval-status"),
        filterFn: "statusFilter" as any,
        cell: (info) => {
          const value = info.renderValue() ?? "pending"
          return getBillOfMaterialsStatusBadge(value)
        },
        enableSorting: true,
      }),
      columnHelper.accessor("id", {
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
              <Link
                href={routes.scm.productionControl.billOfMaterials.editBillOfMaterials(
                  Number(row.original.id)
                )}
                aria-label="Edit Bill of Materials"
                className="flex w-full items-center gap-2 rounded-md px-2.5 py-1 font-semibold transition-colors hover:bg-gray-500/10">
                <PencilIcon className="h-4 w-4" />
                {tableT("table-text-edit")}
              </Link>
              <Link
                href={routes.scm.productionControl.billOfMaterials.billOfMaterialsDetails(
                  Number(row.original.id)
                )}
                aria-label="View Bill of Materials"
                className="flex w-full items-center gap-2 rounded-md px-2.5 py-1 font-semibold transition-colors hover:bg-gray-500/10">
                <EyeIcon className="h-4 w-4" />
                {tableT("table-text-view")}
              </Link>
              { isAuthority && row.original.approvalStatus === null && (
                <Button
                  as="span"
                  className="dark:text-title-dark dark:bg-paper-dark h-7 w-full cursor-pointer justify-start gap-2 bg-transparent !px-2.5 font-semibold text-title transition-colors hover:bg-gray-500/10 dark:hover:bg-gray-600/10"
                  onClick={() =>
                    openDrawer({
                      view: (
                        <BillOfMaterialsApprovalForm
                          billOfMaterialsId={row.original.id!}
                        />
                      ),
                      placement: "right",
                      containerClassName: "max-w-[25.25rem]",
                    })
                  }>
                  <ApproveIcon className="h-4 w-4" />
                  {tableT("table-text-approval")}
                </Button>
              )}
              <Button
                as="span"
                className="dark:text-title-dark dark:bg-paper-dark h-7 w-full cursor-pointer justify-start gap-2 bg-transparent !px-2.5 font-semibold text-title transition-colors hover:bg-gray-500/10 dark:hover:bg-gray-600/10"
                onClick={() =>
                  openDrawer({
                    view: (
                      <BillOfMaterialsVersionCreateEditFormDrawer
                        initialData={row.original}
                        isEditForm={false}
                      />
                    ),
                    placement: "right",
                    containerClassName: "max-w-[25.25rem]",
                  })
                }>
                <BomVersionIcon className="h-4 w-4" />
                {tableT("table-text-bom-version")}
              </Button>
              {row.original.approvalStatus === "approved" && (
                <>
                  <Link
                    href={routes.scm.productionControl.billOfMaterials.createMaterialAvailability(
                      Number(row.original.id)
                    )}
                    aria-label="View Bill of Materials"
                    className="flex w-full items-center gap-2 rounded-md !px-2.5 py-1 font-semibold transition-colors hover:bg-gray-500/10">
                    <AvailableCheckIcon className="h-4 w-4" />
                    {tableT("table-text-check-availability")}
                  </Link>
                  <Link
                    href={routes.scm.productionControl.billOfMaterials.createWorkOrderTracking(
                      Number(row.original.id)
                    )}
                    aria-label="Create Work Order Tracking"
                    className="flex w-full items-center gap-2 rounded-md !px-2.5 py-1 font-semibold transition-colors hover:bg-gray-500/10">
                    <WorkOrderIcon className="h-4 w-4" />
                    {tableT("table-text-create-work-order")}
                  </Link>
                </>
              )}
              <Button
                size="sm"
                variant="text"
                color="danger"
                className="h-7 w-full justify-start gap-2 !px-2.5 font-semibold text-title hover:bg-red/20 hover:text-red"
                onClick={() => {
                  meta?.handleDeleteRow && meta?.handleDeleteRow(row.original)
                }}>
                <TrashIcon className="h-4 w-4" />
                {tableT("table-text-delete")}
              </Button>
            </ListPopover>
          </div>
        ),
      }),
    ],
    [t, tableT, openDrawer]
  )

  return columns
}