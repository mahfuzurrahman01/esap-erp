import { PiCaretDownBold, PiCaretRightBold } from "react-icons/pi"
import { Text } from "rizzui"

import { cn } from "@/utils/cn"
import { formatCurrency } from "@/utils/format-currency"

export const useTrialBalanceColumns = (toggleRow: (id: string) => void) => {
  const columns = [
    {
      id: "id",
      header: "ID",
      accessorKey: "id",
      cell: ({ row }: any) => {
        return <div>{row.index + 1}</div>
      },
    },
    {
      id: "accountName",
      header: "Account",
      accessorKey: "accountName",
      cell: ({ row }: any) => {
        if (row.original.isBlank) return <div className="h-4" />

        return (
          <div
            className={cn(
              "flex items-center gap-2",
              row.original.isTotal || row.original.isParent ? "font-bold" : ""
            )}
            style={{
              paddingLeft: row.original.isTotal
                ? 0
                : `${row.original.level * 20}px`,
            }}>
            {row.original.hasChildren && (
              <button
                onClick={() => toggleRow(row.original.id)}
                className="rounded-sm p-0.5 hover:bg-paper">
                {row.original.isExpanded ? (
                  <PiCaretDownBold className="h-3 w-3" />
                ) : (
                  <PiCaretRightBold className="h-3 w-3" />
                )}
              </button>
            )}
            <span>{row.original.accountName}</span>
          </div>
        )
      },
    },
    {
      id: "debit",
      header: () => <Text className="text-right font-semibold">Debit</Text>,
      accessorKey: "debit",
      cell: ({ row }: any) => {
        if (row.original.isBlank) return null
        const formattedValue = formatCurrency(row.original.debit)
        return (
          <div
            className={cn(
              "text-right",
              row.original.isTotal || row.original.isParent ? "font-bold" : ""
            )}>
            <span>{`${formattedValue.mainPart}${formattedValue.decimalPart}`}</span>
          </div>
        )
      },
    },
    {
      id: "credit",
      header: () => <Text className="text-right font-semibold">Credit</Text>,
      accessorKey: "credit",
      cell: ({ row }: any) => {
        if (row.original.isBlank) return null
        const formattedValue = formatCurrency(row.original.credit)
        return (
          <div
            className={cn(
              "text-right",
              row.original.isTotal || row.original.isParent ? "font-bold" : ""
            )}>
            {`${formattedValue.mainPart}${formattedValue.decimalPart}`}
          </div>
        )
      },
    },
  ]

  return columns
}