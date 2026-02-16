"use client";

import { useAtom } from "jotai";
import { useTranslations } from "next-intl";
import { Text } from "rizzui/typography";



import { DatePicker } from "@/components/base/date-picker";
import { Input, Select } from "@/components/ui";
import { useSCMSharedDataHook } from "@/modules/scm/constants/shared-data-hooks";
import { employeeName, materialAvailabilityItemRowsAtom } from "@/modules/scm/store/global-store-state";
import { FindSelectOption, GetMenuListStyles } from "@/modules/scm/utils/select-options";





interface ColumnProps {
  isFieldDisabled: boolean
  onDelete: (index: number) => void
  setValue: (field: string, value: any) => void
}

export const useItemsListColumns = ({
  isFieldDisabled,
  onDelete,
}: ColumnProps) => {
  const t = useTranslations("form")
  const [, setEmployeeNameTemplate] = useAtom(employeeName)

  const [, setMaterialAvailabilityItemRows] = useAtom(
    materialAvailabilityItemRowsAtom
  )

  const { productCode, machine, employee } = useSCMSharedDataHook([
    "productCode",
    "machine",
    "employee",
  ])

  const { productCodeOptions, isProductCodeLoading } = productCode
  const { machineOptions, isMachineLoading } = machine
  const { employeeOptions, isEmployeeLoading } = employee

  const baseColumns = [
    {
      id: "id",
      header: t("form-no"),
      accessorKey: "id",
      cell: (props: any) => <span>{props.row.index + 1}</span>,
    },
  ]

  const viewColumns = [
    {
      id: "employeeId",
      header: t("form-employee"),
      accessorKey: "employeeId",
      cell: (props: any) => (
        <Text className="text-title">{props.row.original.employeeName}</Text>
      ),
    },
    {
      id: "productId",
      header: t("form-product-code"),
      accessorKey: "productId",
      cell: (props: any) => (
        <Text className="text-title">{props.row.original.productName}</Text>
      ),
    },

    {
      id: "machineId",
      header: t("form-machine"),
      accessorKey: "machineId",
      cell: (props: any) => (
        <Text className="text-title">{props.row.original.machineName}</Text>
      ),
    },
    {
      id: "startTime",
      header: t("form-start-time"),
      accessorKey: "startTime",
      cell: (props: any) => (
        <Text className="text-title">{props.row.original.startTime}</Text>
      ),
    },
    {
      id: "endTime",
      header: t("form-end-time"),
      accessorKey: "endTime",
      cell: (props: any) => (
        <Text className="text-title">{props.row.original.endTime}</Text>
      ),
    },
    {
      id: "productivity",
      header: t("form-productivity"),
      accessorKey: "productivity",
      cell: (props: any) => (
        <Text className="text-title">{props.row.original.productivity}</Text>
      ),
    },
  ]
  const editColumns = [
    {
      id: "employeeId",
      header: t("form-employee"),
      accessorKey: "employeeId",

      cell: (props: any) => (
        <Select
          labelClassName="text-title"
          options={employeeOptions}
          value={
            employeeOptions.find(
              (option: any) => option.value === props.row.original.employeeId
            ) || null
          }
          onChange={(option: any) => {
            const employeeName = option?.label
            setEmployeeNameTemplate(employeeName)
            return props.table.options.meta?.updateData(
              props.row.index,
              "employeeId",
              option?.value ?? 0
            )
          }}
          isLoading={isEmployeeLoading}
          isDisabled={isFieldDisabled}
          placeholder={t("form-employee")}
          menuPortalTarget={document.body}
          styles={GetMenuListStyles(employeeOptions.length)}
        />
      ),
    },
    {
      id: "productId",
      header: t("form-product-code"),
      accessorKey: "productId",
      cell: (props: any) => (
        <Select
          labelClassName="text-title"
          options={productCodeOptions}
          value={
            productCodeOptions.find(
              (option: any) => option.value === props.row.original.productId
            ) || null
          }
          onChange={(selectedValue: any) => {
            props.onChange(selectedValue.value)
            props.table.options.meta?.updateData(
              props.row.index,
              "productId",
              selectedValue.value
            )
          }}
          isLoading={isProductCodeLoading}
          isDisabled={isFieldDisabled || true}
          placeholder={t("form-product-code")}
          menuPortalTarget={document.body}
          styles={GetMenuListStyles(productCodeOptions.length)}
        />
      ),
    },
    {
      id: "machineId",
      header: t("form-machine"),
      accessorKey: "machineId",
      cell: (props: any) => (
        <Select
          labelClassName="text-title"
          options={machineOptions}
          value={FindSelectOption(machineOptions, props.value)}
          onChange={(selectedValue: any) => {
            props.onChange(selectedValue.value)
            props.table.options.meta?.updateData(
              props.row.index,
              "machineId",
              selectedValue.value
            )
          }}
          isLoading={isMachineLoading}
          isDisabled={isFieldDisabled}
          placeholder={t("form-machine")}
          menuPortalTarget={document.body}
          styles={GetMenuListStyles(machineOptions.length)}
        />
      ),
    },
    {
      id: "startTime",
      header: t("form-start-time"),
      accessorKey: "startTime",
      cell: (props: any) => (
        <DatePicker
          id="startTime"
          selected={props.value ? new Date(props.value) : null}
          onChange={(date: any) => {
            if (date) {
              const isoString = date.toISOString()
              props.table.options.meta?.updateData(
                props.row.index,
                "startTime",
                isoString
              )
            } else {
              props.table.options.meta?.updateData(
                props.row.index,
                "startTime",
                null
              )
            }
          }}
          dateFormat="yyyy-MM-dd h:mm aa"
          placeholderText={t("form-select-start-time")}
          // showTimeSelect
          // timeIntervals={30}
          // timeCaption="Time"
          className="w-full"
          popperPlacement="bottom-start"
          showTimePicker
          portal
          // popperProps={{ strategy: "fixed" }}
          // withPortal={true}
          // portalId="root-portal"
        />
      ),
    },
    {
      id: "endTime",
      header: t("form-end-time"),
      accessorKey: "endTime",
      cell: (props: any) => (
        <DatePicker
          id="endTime"
          selected={props.value ? new Date(props.value) : null}
          onChange={(date: any) => {
            if (date) {
              const isoString = date.toISOString()
              props.table.options.meta?.updateData(
                props.row.index,
                "endTime",
                isoString
              )
            } else {
              props.table.options.meta?.updateData(
                props.row.index,
                "endTime",
                null
              )
            }
          }}
          dateFormat="yyyy-MM-dd h:mm aa"
          placeholderText={t("form-select-end-time")}
          showTimeSelect
          timeIntervals={30}
          timeCaption="Time"
          className="w-full"
          showTimePicker
          popperPlacement="bottom-start"
          portal
          portalTarget={document.body}
          // popperProps={{ strategy: "fixed" }}
          // withPortal
          // portalId="root-portal"
        />
      ),
    },
    {
      id: "productivity",
      header: t("form-productivity"),
      accessorKey: "productivity",
      cell: (props: any) => (
        <Input
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
          placeholder=""
          disabled={isFieldDisabled}
        />
      ),
    },
  ]

  return [...baseColumns, ...(isFieldDisabled ? viewColumns : editColumns)]
}