import cn from "@core/utils/class-names"
import { useTranslations } from "next-intl"
import { PiPlusBold } from "react-icons/pi"
import { Text } from "rizzui"

import { Badge, Button } from "@/components/ui"
import Select from "@/components/ui/select"
import TableGrid from "@/components/ui/table-grid"

import { ModeOfPaymentTableProps } from "./types"

export function ModeOfPaymentDetailsTable({
  modeOfPaymentDetails,
  isFieldDisabled,
  onRowChange,
  onRowDelete,
  onAddRow,
  companyOptions,
  chartOfAccountOptions,
  isCOALoading,
}: ModeOfPaymentTableProps) {
  const t = useTranslations("form")

  const columns = [
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
    ...(isFieldDisabled
      ? [
          {
            id: "companyId",
            header: t("form-company-name"),
            accessorKey: "companyId",
            cell: (props: any) => (
              <Text className="font-medium text-gray-900 dark:text-gray-0">
                {props.row.original.companyName}
              </Text>
            ),
          },
          {
            id: "chartOfAccountName",
            header: t("form-chart-of-account-name"),
            accessorKey: "chartOfAccountName",
            cell: (props: any) => (
              <Text className="font-medium text-gray-900 dark:text-gray-0">
                {props.row.original.chartOfAccountName}
              </Text>
            ),
          },
        ]
      : [
          {
            id: "companyId",
            header: t("form-company-name"),
            accessorKey: "companyId",
            cell: (props: any) => {
              const currentValue = props.row.original.companyId
              return (
                <Select
                  labelClassName="text-title"
                  options={companyOptions}
                  value={
                    companyOptions.find(
                      (option) => option.value === currentValue
                    ) || null
                  }
                  onChange={(option: any) =>
                    props.table.options.meta?.updateData(
                      props.row.index,
                      "companyId",
                      option?.value
                    )
                  }
                  menuPortalTarget={document.body}
                  isDisabled={isCOALoading || isFieldDisabled}
                />
              )
            },
          },
          {
            id: "chartOfAccountId",
            header: t("form-accounts-head"),
            accessorKey: "chartOfAccountId",
            cell: (props: any) => {
              const currentValue = props.row.original.chartOfAccountId
              return (
                <Select
                  labelClassName="text-title"
                  options={chartOfAccountOptions}
                  value={
                    chartOfAccountOptions.find(
                      (option) => option.value === currentValue
                    ) || null
                  }
                  onChange={(option: any) =>
                    props.table.options.meta?.updateData(
                      props.row.index,
                      "chartOfAccountId",
                      option?.value
                    )
                  }
                  menuPortalTarget={document.body}
                  isDisabled={isCOALoading || isFieldDisabled}
                />
              )
            },
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
        ]),
  ]

  return (
    <div className="space-y-4">
      <TableGrid
        columns={columns}
        data={modeOfPaymentDetails}
        gridTemplateColumns={cn(
          "50px 1fr 1fr 100px",
          isFieldDisabled && "100px"
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
