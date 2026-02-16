import { useMemo } from "react"

import { createColumnHelper } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import { Checkbox, Text } from "rizzui"

import DeletePopover from "@/components/base/delete-popover"
import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import EditIconButton from "@/components/base/edit-icon-button"
import PlanFormDrawerView from "@/components/container/hrms/employee-setting-items/plans/plan-form-drawer-view"
import { Plan } from "@/types/hrms/employee/plan.types"
import { formatDate } from "@/utils/format-date"

const columnHelper = createColumnHelper<Plan>()

export const usePlanTableColumns = () => {
  const t = useTranslations("table")
  const tForm = useTranslations("form")
  const planName = tForm("form-plan-name")
  const departmentName = tForm("form-department-name")
  const activitiesCount = t("table-text-activities-count")
  const createdDate = t("table-text-created-date")

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
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            aria-label="Select row"
            checked={row.getIsSelected()}
            onChange={() => row.toggleSelected()}
          />
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("planName", {
        id: "planName",
        size: 240,
        header: planName,
        cell: ({ row }) => <Text>{row.original.planName}</Text>,
        enableSorting: true,
      }),
      columnHelper.accessor("departmentName", {
        id: "departmentName",
        size: 180,
        header: departmentName,
        cell: ({ row }) => <Text>{row.original.departmentName}</Text>,
        enableSorting: true,
      }),
      columnHelper.accessor("activities", {
        id: "activitiesCount",
        size: 180,
        header: activitiesCount,
        cell: ({ row }) => <Text>{row.original.activities.length}</Text>,
        enableSorting: true,
      }),
      columnHelper.accessor("createdDate", {
        id: "createdDate",
        size: 240,
        header: createdDate,
        cell: ({ row }) => <Text>{formatDate(row.original.createdDate)}</Text>,
        enableSorting: true,
      }),
      columnHelper.accessor("planName", {
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
                <EditIconButton
                  onClick={() =>
                    openDrawer({
                      view: (
                        <PlanFormDrawerView
                          initialData={row.original}
                          isEditForm
                        />
                      ),
                      placement: "right",
                      containerClassName: "max-w-4xl",
                    })
                  }
                />
                <DeletePopover
                  translationObjectName="hrms"
                  title="text-delete-plan"
                  description="text-delete-plan-prompt"
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
    [t, tForm]
  )

  return columns
}
