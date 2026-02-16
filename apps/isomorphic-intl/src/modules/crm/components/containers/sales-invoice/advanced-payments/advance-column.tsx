import { useTranslations } from "next-intl"
import { Text } from "rizzui"

export const useAdvanceColumns = () => {
  const t = useTranslations("table")
  return [
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
    {
      id: "referenceName",
      header: t("table-text-reference-name"),
      accessorKey: "taxTypeId",
      cell: (props: any) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {props.row.original.referenceName}
        </Text>
      ),
    },
    {
      id: "remarks",
      header: t("table-text-remarks"),
      accessorKey: "remarks",
      cell: (props: any) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {props.row.original.remarks || 0}
        </Text>
      ),
    },
    {
      id: "advanceAmount",
      header: t("table-text-advance-amount"),
      accessorKey: "advanceAmount",
      cell: (props: any) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {props.row.original.advanceAmount || 0}
        </Text>
      ),
    },
    {
      id: "allocatedAmount",
      header: t("table-text-allocated-amount"),
      accessorKey: "allocatedAmount",
      cell: (props: any) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {props.row.original.allocatedAmount}
        </Text>
      ),
    }
  ]
}

