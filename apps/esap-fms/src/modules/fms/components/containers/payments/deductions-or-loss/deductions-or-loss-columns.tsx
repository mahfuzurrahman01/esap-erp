"use client"

import { useAtom } from "jotai"
import { useTranslations } from "next-intl"
import { Text } from "rizzui"

import { Badge, Input, Select } from "@/components/ui"
import { useSharedDataHooks } from "@/modules/fms/constants/shared-data-hook"
import {
  deductionRowsAtom,
  deductionSyncAtom,
} from "@/modules/fms/store/payment-allocation"

interface ColumnProps {
  isFieldDisabled: boolean
  onDelete: (index: number) => void
}

export const useDeductionsOrLossColumns = ({
  isFieldDisabled,
  onDelete,
}: ColumnProps) => {
  const t = useTranslations("form")
  const { coa, costCenter } = useSharedDataHooks(["coa", "costCenter"])
  const { coaOptions, isCOALoading } = coa
  const { costCenterOptions, isCostCenterLoading } = costCenter

  const [, setDeductionRows] = useAtom(deductionRowsAtom)
  const [, syncDeduction] = useAtom(deductionSyncAtom)

  const baseColumns = [
    {
      id: "serialNumber",
      header: "SN",
      accessorKey: "id",
      cell: (props: any) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {props.row.index + 1}
        </Text>
      ),
    },
  ]

  const viewColumns = [
    {
      id: "account",
      header: t("form-chart-of-account"),
      accessorKey: "account",
      cell: (props: any) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {props.row.original.account.accountName}
        </Text>
      ),
    },
    {
      id: "costCenter",
      header: t("form-cost-center"),
      accessorKey: "costCenter",
      cell: (props: any) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {props.row.original.costCenter?.costCenterName}
        </Text>
      ),
    },
    {
      id: "amountView",
      header: t("form-amount"),
      accessorKey: "amount",
      cell: (props: any) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {props.row.original.amount}
        </Text>
      ),
    },
  ]

  const editColumns = [
    {
      id: "accountId",
      header: t("form-chart-of-account"),
      accessorKey: "accountId",
      cell: (props: any) => (
        <Select
          options={coaOptions}
          menuPortalTarget={document.body}
          value={
            props.row.original.accountId
              ? coaOptions.find(
                (option: any) =>
                  option.value === props.row.original.accountId
              )
              : null
          }
          onChange={(option: any) => {
            syncDeduction({
              updateData: props.table.options.meta?.updateData,
              index: props.row.index,
              amount: props.row.original.amount || 0,
              accountId: option?.value,
              costCenterId: props.row.original.costCenterId,
            })
          }}
          isLoading={isCOALoading}
          placeholder={t("form-select")}
          isDisabled={isFieldDisabled}
        />
      ),
    },
    {
      id: "costCenterEdit",
      header: t("form-cost-center"),
      accessorKey: "costCenterId",
      cell: (props: any) => (
        <Select
          options={costCenterOptions}
          menuPortalTarget={document.body}
          value={
            props.row.original.costCenterId
              ? costCenterOptions.find(
                (option: any) =>
                  option.value === props.row.original.costCenterId
              )
              : null
          }
          onChange={(option: any) => {
            syncDeduction({
              updateData: props.table.options.meta?.updateData,
              index: props.row.index,
              amount: props.row.original.amount || 0,
              accountId: props.row.original.accountId,
              costCenterId: option?.value,
            })
          }}
          isLoading={isCostCenterLoading}
          placeholder={t("form-select")}
          isDisabled={isFieldDisabled}
        />
      ),
    },
    {
      id: "amountEdit",
      header: t("form-amount"),
      accessorKey: "amount",
      cell: (props: any) => (
        <Input
          type="number"
          value={props.row.original.amount || ""}
          onChange={(e) => {
            const newValue = Number(e.target.value) || 0
            syncDeduction({
              updateData: props.table.options.meta?.updateData,
              index: props.row.index,
              amount: newValue,
              accountId: props.row.original.accountId,
              costCenterId: props.row.original.costCenterId,
            })
          }}
          placeholder="0.00"
          min={0}
          disabled={isFieldDisabled}
        />
      ),
    },
    {
      id: "actions",
      header: "",
      accessorKey: "actions",
      cell: (props: any) => (
        <Badge
          variant="flat"
          color="danger"
          rounded="lg"
          className="cursor-pointer"
          onClick={() => {
            onDelete(props.row.index)
            setDeductionRows((prev) => {
              const newRows = [...prev]
              newRows.splice(props.row.index, 1)
              return newRows
            })
          }}>
          {t("form-delete")}
        </Badge>
      ),
    },
  ]

  return [...baseColumns, ...(isFieldDisabled ? viewColumns : editColumns)]
}
