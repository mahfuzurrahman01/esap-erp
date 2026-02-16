import { useTranslations } from "next-intl"
import { Badge, Text } from "rizzui"

import { Input, Select } from "@/components/ui"
import { taxTypeOptions } from "@/modules/fms/constants/shared-data-hook"

console.log("taxTypeOptions", taxTypeOptions)

import { useSOTemplate } from "./so-template"

export const useVatTaxColumns = () => {
  const t = useTranslations("form")
  const { chartOfAccountOptions, isCOALoading } = useSOTemplate()

  return [
    {
      id: "sn",
      header: "sl",
      accessorKey: "sn",
      width: "70px",
      cell: ({ row }: { row: any }) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {row.index + 1}
        </Text>
      ),
    },
    {
      id: "taxTypeId",
      header: t("form-tax-type"),
      accessorKey: "taxTypeId",
      width: "460px",
      cell: (props: any) => (
        <Select
          options={taxTypeOptions}
          menuPortalTarget={document.body}
          value={taxTypeOptions.find(
            (option: any) =>
              option.value == props.row.original.taxTypeId
          )}
          onChange={(option: any) =>
            props.table.options.meta?.updateData(
              props.row.index,
              "taxTypeId",
              option?.value
            )
          }
          placeholder={t("form-select")}
        />
      ),
    },
    {
      id: "chartOfAccountId",
      header: t("form-accounts-head"),
      accessorKey: "chartOfAccountId",
      width: "460px",
      cell: (props: any) => (
        <Select
          menuPortalTarget={document.body}
          options={chartOfAccountOptions}
          value={chartOfAccountOptions.find(
            (option: any) =>
              option.id == props.row.original.chartOfAccountId || props.value
          )}
          onChange={(option: any) =>
            props.table.options.meta?.updateData(
              props.row.index,
              "chartOfAccountId",
              option?.value
            )
          }
          isLoading={isCOALoading}
          isDisabled={isCOALoading}
          placeholder={t("form-select")}
        />
      ),
    },
    {
      id: "taxRate",
      header: t("form-tax-rate"),
      accessorKey: "taxRate",
      width: "210px",
      cell: (props: any) => (
        <Input
          type="number"
          value={props.value}
          disabled={props.row.original.taxTypeId == 2}
          onChange={(e) =>
            props.table.options.meta?.updateData(
              props.row.index,
              "taxRate",
              Number(e.target.value)
            )
          }
          placeholder="0.00"
        />
      ),
    },
    {
      id: "taxAmount",
      header: t("form-tax-amount"),
      accessorKey: "taxAmount",
      width: "210px",
      cell: (props: any) => (
        <Input
          type="number"
          value={props.value}
          disabled={props.row.original.taxTypeId == 1}
          onChange={(e) =>
            props.table.options.meta?.updateData(
              props.row.index,
              "taxAmount",
              Number(e.target.value)
            )
          }
          placeholder="0.00"
        />
      ),
    },
    {
      id: "actions",
      header: "",
      accessorKey: "actions",
      width: "80px",
      cell: (props: any) => (
        <center>
          <Badge
            variant="flat"
            color="danger"
            rounded="lg"
            className="cursor-pointer"
            onClick={() => props.onDelete()}>
            {t("form-delete")}
          </Badge>
        </center>
      ),
    },
  ]
}
