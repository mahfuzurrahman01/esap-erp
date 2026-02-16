"use client"

import cn from "@core/utils/class-names"
import dayjs from "dayjs"
import { useTranslations } from "next-intl"
import { PiPlusBold } from "react-icons/pi"
import { SelectOption, Text } from "rizzui"

import { DatePicker } from "@/components/base/date-picker"
import { Badge, Button, Input } from "@/components/ui"
import Select from "@/components/ui/select"
import TableGrid from "@/components/ui/table-grid"
import { useSharedDataHooks } from "@/modules/fms/constants/shared-data-hook"

import { AssetMaintenanceTableProps } from "./types"

const assetMaintenanceStatusOptions = [
  { label: "Pending", value: "Pending" },
  { label: "Completed", value: "Completed" },
  { label: "Cancelled", value: "Cancelled" },
]

const assetMaintenanceRepetitionOptions = [
  { label: "Daily", value: "Daily" },
  { label: "Weekly", value: "Weekly" },
  { label: "Monthly", value: "Monthly" },
  { label: "Half-Yearly", value: "Half-Yearly" },
  { label: "Yearly", value: "Yearly" },
]

const useAssetMaintenanceColumns = ({
  isFieldDisabled,
  onRowDelete,
  onRowChange,
}: {
  isFieldDisabled: boolean
  onRowDelete: (index: number) => void
  onRowChange?: (index: number, field: string, value: any) => void
}) => {
  const t = useTranslations("form")
  const { employee } = useSharedDataHooks([
    "employee",
  ])
  const { employeeOptions } = employee

  const baseColumns = [
    {
      id: "id",
      header: "ID",
      accessorKey: "id",
      width: "50px",
      cell: (props: any) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {props.row.index + 1}
        </Text>
      ),
    },
  ]

  const viewColumns = [
    {
      id: "assetMaintenanceTaskName",
      header: t("form-asset-maintenance-task-name"),
      accessorKey: "assetMaintenanceTaskName",
      cell: (props: any) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {props.row.original.assetMaintenanceTaskName}
        </Text>
      ),
    },
    {
      id: "maintenanceStatus",
      header: t("form-asset-maintenance-status-name"),
      accessorKey: "maintenanceStatus",
      cell: (props: any) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {props.row.original.maintenanceStatus}
        </Text>
      ),
    },
    {
      id: "maintenanceRepetition",
      header: t("form-asset-maintenance-repetition"),
      accessorKey: "maintenanceRepetition",
      cell: (props: any) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {props.row.original.maintenanceRepetition}
        </Text>
      ),
    },
    {
      id: "assignedToName",
      header: t("form-assigned-to"),
      accessorKey: "assignedToName",
      cell: (props: any) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {props.row.original.assignedToName}
        </Text>
      ),
    },
    {
      id: "nextMaintenanceDate",
      header: t("form-next-maintenance-date"),
      accessorKey: "nextMaintenanceDate",
      cell: (props: any) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {props.row.original.nextMaintenanceDate
            ? dayjs(props.row.original.nextMaintenanceDate).format("DD-MM-YYYY")
            : ""}
        </Text>
      ),
    },
  ]

  const editColumns = [
    {
      id: "assetMaintenanceTaskName",
      header: t("form-asset-maintenance-task-name"),
      accessorKey: "assetMaintenanceTaskName",
      cell: (props: any) => (
        <Input
          value={props.row.original.assetMaintenanceTaskName}
          onChange={(e) =>
            props.table.options.meta?.updateData(
              props.row.index,
              "assetMaintenanceTaskName",
              e.target.value
            )
          }
        />
      ),
    },
    {
      id: "maintenanceStatus",
      header: t("form-asset-maintenance-status-name"),
      accessorKey: "maintenanceStatus",
      cell: (props: any) => (
        <Select
          labelClassName="text-title"
          options={assetMaintenanceStatusOptions}
          value={assetMaintenanceStatusOptions.find(
            (option: SelectOption) =>
              option.value === props.row.original.maintenanceStatus
          )}
          onChange={(option: any) =>
            props.table.options.meta?.updateData(
              props.row.index,
              "maintenanceStatus",
              option?.value
            )
          }
          menuPortalTarget={document.body}
          isDisabled={isFieldDisabled}
        />
      ),
    },
    {
      id: "maintenanceRepetition",
      header: t("form-asset-maintenance-repetition"),
      accessorKey: "maintenanceRepetition",
      cell: (props: any) => (
        <Select
          labelClassName="text-title"
          options={assetMaintenanceRepetitionOptions}
          value={assetMaintenanceRepetitionOptions.find(
            (option) =>
              option.value === props.row.original.maintenanceRepetition
          )}
          onChange={(option: any) => {
            // Get the current date
            const currentDate = dayjs()
            let nextDate = currentDate

            // Calculate next maintenance date based on repetition value
            const repetitionType = option?.value?.toLowerCase() || ''

            switch (repetitionType) {
              case 'daily':
                nextDate = currentDate.add(1, 'day')
                break
              case 'weekly':
                nextDate = currentDate.add(1, 'week')
                break
              case 'monthly':
                nextDate = currentDate.add(1, 'month')
                break
              case 'half-yearly':
                nextDate = currentDate.add(6, 'month')
                break
              case 'yearly':
                nextDate = currentDate.add(1, 'year')
                break
              default:
                // Keep the current date if no match
                break
            }

            // Update the repetition value
            onRowChange?.(props.row.index, "maintenanceRepetition", option?.value)

            // Update the next maintenance date
            if (nextDate) {
              onRowChange?.(props.row.index, "nextMaintenanceDate", nextDate.format("YYYY-MM-DD"))
            }
          }}
          menuPortalTarget={document.body}
          isDisabled={isFieldDisabled}
        />
      ),
    },
    {
      id: "assignedToId",
      header: t("form-assigned-to"),
      accessorKey: "assignedToId",
      cell: (props: any) => (
        <Select
          labelClassName="text-title"
          options={employeeOptions}
          value={employeeOptions.find(
            (option: SelectOption) =>
              option.value === props.row.original.assignedToId
          )}
          onChange={(option: any) =>
            props.table.options.meta?.updateData(
              props.row.index,
              "assignedToId",
              option?.value
            )
          }
          menuPortalTarget={document.body}
          isDisabled={isFieldDisabled}
        />
      ),
    },
    {
      id: "nextMaintenanceDate",
      header: t("form-next-maintenance-date"),
      accessorKey: "nextMaintenanceDate",
      cell: (props: any) => (
        <DatePicker
          placeholderText={t("form-select-date")}
          value={
            props.row.original.nextMaintenanceDate
              ? dayjs(props.row.original.nextMaintenanceDate).toDate()
              : null
          }
          onChange={(date: any) => {
            if (date) {
              props.table.options.meta?.updateData(
                props.row.index,
                "nextMaintenanceDate",
                dayjs(date).format("YYYY-MM-DD")
              )
            } else {
              props.table.options.meta?.updateData(
                props.row.index,
                "nextMaintenanceDate",
                ""
              )
            }
          }}
          popperPlacement="bottom-end"
          portalId="asset-maintenance-details-table"
          portal
          disabled={isFieldDisabled}
        />
      ),
    },
    {
      id: "actions",
      header: "",
      accessorKey: "actions",
      width: "80px",
      cell: (props: any) => (
        <Badge
          variant="flat"
          color="danger"
          rounded="lg"
          className="cursor-pointer"
          onClick={() => onRowDelete(props.row.index)}>
          {t("form-delete")}
        </Badge>
      ),
    },
  ]

  return [...baseColumns, ...(isFieldDisabled ? viewColumns : editColumns)]
}

export function AssetMaintenanceDetailsTable({
  isFieldDisabled,
  onRowChange,
  onRowDelete,
  onAddRow,
  assetMaintenanceDetails,
}: AssetMaintenanceTableProps) {
  const t = useTranslations("form")
  const columns = useAssetMaintenanceColumns({ isFieldDisabled, onRowDelete, onRowChange })

  return (
    <div className="space-y-4">
      <TableGrid
        columns={columns}
        data={assetMaintenanceDetails}
        gridTemplateColumns={cn(
          "50px 1fr 1fr 1fr 1fr 1fr",
          !isFieldDisabled && "80px"
        )}
        variant="modern"
        onRowChange={onRowChange}
      />
      {!isFieldDisabled && (
        <Button variant="outline" onClick={onAddRow} className="mt-4">
          <PiPlusBold className="me-2 h-4 w-4" />
          {t("form-add-row")}
        </Button>
      )}
    </div>
  )
}
