import { useCOAById } from "@/modules/fms/hooks/use-coa"
import { useTranslations } from "next-intl"
import { Text } from "rizzui"

export const useTaxColumns = () => {
  const t = useTranslations("table")
  
  const AccountHeadCell = ({ chartOfAccountId }: { chartOfAccountId: number }) => {
    const tableT = useTranslations("table")
    const { data: accountData, isLoading } = useCOAById(chartOfAccountId) as {
      data: any | undefined
      isLoading: boolean
    }
  
    if (isLoading)
      return (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {tableT("table-text-loading")}
        </Text>
      )
    return (
      <Text className="font-medium text-gray-900 dark:text-gray-0">
        {accountData?.chartOfAccountName}
      </Text>
    )
  }
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
      id: "taxTypeId",
      header: t("table-text-tax-type"),
      accessorKey: "taxTypeId",
      cell: (props: any) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {props.row.original.taxTypeId || ""}
        </Text>
      ),
    },
    {
      id: "chartOfAccountId",
      header: t("table-text-account-head"),
      accessorKey: "chartOfAccountId",
      cell: (props: any) => (
        <AccountHeadCell chartOfAccountId={Number(props.row.original.chartOfAccountId)} />
      ),
    },
    {
      id: "taxRate",
      header: t("table-text-tax-rate"),
      accessorKey: "taxRate",
      cell: (props: any) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {props.row.original.taxRate || 0}
        </Text>
      ),
    },
    {
      id: "total",
      header: t("table-text-total"),
      accessorKey: "total",
      cell: (props: any) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {props.row.original.taxAmount}
        </Text>
      ),
    }
  ]
}

