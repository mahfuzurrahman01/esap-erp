"use client";

import { useAtom } from "jotai";
import { useTranslations } from "next-intl";
import { Text } from "rizzui/typography";



import { Badge, Input } from "@/components/ui";
import { agreementItemRowsAtom } from "@/modules/scm/store/requisition-store";





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

  const [, setAgreementItemRows] = useAtom(agreementItemRowsAtom)

  const baseColumns = [
    {
      id: "id",
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
      id: "criteria",
      header: t("form-criteria"),
      accessorKey: "criteria",
      cell: (props: any) => <Text className="text-title">{props.value}</Text>,
    },
    {
      id: "metric",
      header: t("form-metrics"),
      accessorKey: "metric",
      cell: (props: any) => <Text className="text-title">{props.value}</Text>,
    },
  ]

  const editColumns = [
    {
      id: "criteria",
      header: t("form-criteria"),
      accessorKey: "criteria",
      cell: (props: any) => (
        <Input
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
          disabled={isFieldDisabled}
        />
      ),
    },
    {
      id: "metric",
      header: t("form-metrics"),
      accessorKey: "metric",
      cell: (props: any) => (
        <Input
          type="number"
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
          disabled={isFieldDisabled}
        />
      ),
    },
    {
      id: "actions",
      header: "",
      accessorKey: "actions",
      cell: (props: any) => {
        if (isFieldDisabled) {
          return null
        }
        return (
          <Badge
            variant="flat"
            color="danger"
            rounded="lg"
            className="cursor-pointer"
            onClick={() => {
              onDelete(props.row.index)
              setAgreementItemRows((prev) => {
                const newRows = [...prev]
                newRows.splice(props.row.index, 1)
                return newRows
              })
            }}>
            {t("form-delete")}
          </Badge>
        )
      },
    },
  ]

 return [...baseColumns, ...(isFieldDisabled ? viewColumns : editColumns)]
}