import { ColumnDef, CellContext } from "@tanstack/react-table"
import { Text } from "rizzui"
import { BudgetVarianceItem } from "@/modules/fms/types/budget-variance"
import { cn } from "@/utils/cn"

const formatAmount = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

const createMonthlyColumns = (): ColumnDef<BudgetVarianceItem, unknown>[] => {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  const baseColumns: ColumnDef<BudgetVarianceItem, unknown>[] = [
    {
      id: "sl",
      header: "ID",
      accessorKey: "sl",
    },
    {
      id: "costCenter",
      header: "Cost Center",
      accessorKey: "costCenter",
    },
    {
      id: "chartOfAccount",
      header: "Account",
      accessorKey: "chartOfAccount",
    },
  ]

  const monthlyColumns = months.flatMap(month => [
    {
      id: `budget_${month}`,
      header: () => <Text className="text-right font-semibold">{`Budget ${month}`}</Text>,
      accessorKey: `budget_${month}`,
      cell: (props: CellContext<BudgetVarianceItem, unknown>) => {
        const amount = props.getValue() as number
        return (
          <div className="text-right">
            {formatAmount(amount)}
          </div>
        )
      },
    },
    {
      id: `actual_${month}`,
      header: () => <Text className="text-right font-semibold">{`Actual ${month}`}</Text>,
      accessorKey: `actual_${month}`,
      cell: (props: CellContext<BudgetVarianceItem, unknown>) => {
        const amount = props.getValue() as number
        return (
          <div className="text-right">
            {formatAmount(amount)}
          </div>
        )
      },
    },
    {
      id: `variance_${month}`,
      header: () => <Text className="text-right font-semibold">{`Variance ${month}`}</Text>,
      accessorKey: `variance_${month}`,
      cell: (props: CellContext<BudgetVarianceItem, unknown>) => {
        const variance = props.getValue() as number
        return (
          <div className={cn(
            "text-right",
            variance > 0 ? "text-green-500" : "text-red-500"
          )}>
            {formatAmount(variance)}
          </div>
        )
      },
    },
  ])

  return [...baseColumns, ...monthlyColumns]
}

const createYearlyColumns = (): ColumnDef<BudgetVarianceItem, unknown>[] => {
  return [
    {
      id: "sl",
      header: "ID",
      accessorKey: "sl",
    },
    {
      id: "costCenter",
      header: "Cost Center",
      accessorKey: "costCenter",
    },
    {
      id: "chartOfAccount",
      header: "Account",
      accessorKey: "chartOfAccount",
    },
    {
      id: "budgetAmount",
      header: () => <Text className="text-right font-semibold">Budget Amount</Text>,
      accessorKey: "budgetAmount",
      cell: (props: CellContext<BudgetVarianceItem, unknown>) => {
        const amount = props.getValue() as number
        return (
          <div className="text-right">
            {formatAmount(amount)}
          </div>
        )
      },
    },
    {
      id: "actualAmount",
      header: () => <Text className="text-right font-semibold">Actual Amount</Text>,
      accessorKey: "actualAmount",
      cell: (props: CellContext<BudgetVarianceItem, unknown>) => {
        const amount = props.getValue() as number
        return (
          <div className="text-right">
            {formatAmount(amount)}
          </div>
        )
      },
    },
    {
      id: "variance",
      header: () => <Text className="text-right font-semibold">Variance</Text>,
      accessorKey: "variance",
      cell: (props: CellContext<BudgetVarianceItem, unknown>) => {
        const variance = props.getValue() as number
        return (
          <div className={cn(
            "text-right",
            variance > 0 ? "text-green-500" : "text-red-500"
          )}>
            {formatAmount(variance)}
          </div>
        )
      },
    },
  ]
}

export const useBudgetVarianceColumns = (reportType?: string): ColumnDef<BudgetVarianceItem, unknown>[] => {
  return reportType === "Monthly" ? createMonthlyColumns() : createYearlyColumns()
}
