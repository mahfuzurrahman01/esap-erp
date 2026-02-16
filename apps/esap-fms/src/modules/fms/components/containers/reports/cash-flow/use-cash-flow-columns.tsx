import { PiCaretDownBold, PiCaretRightBold } from "react-icons/pi"
import { Text } from "rizzui"

import { cn } from "@/utils/cn"

export const useCashFlowColumns = (toggleRow: (id: string) => void) => {
  const columns = [
    {
      id: "id",
      header: "SN",
      accessorKey: "id",
      cell: ({ row }: any) => {
        return <div>{row.index + 1}</div>
      },
    },
    {
      id: "name",
      header: "Section",
      accessorKey: "name",
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
            <span>{row.original.name}</span>
          </div>
        )
      },
    },
    {
      id: "amount",
      header: () => <Text className="text-right font-semibold">Amount</Text>,
      accessorKey: "amount",
      cell: ({ row }: any) => {
        if (row.original.isBlank) return null

        const formattedAmount = new Intl.NumberFormat("en-US", {
          style: "decimal",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(Math.abs(row.original.amount))

        return (
          <div
            className={cn(
              "text-right",
              row.original.isTotal || row.original.isParent ? "font-bold" : "",
              row.original.amount < 0 ? "text-red-500" : "text-green-500"
            )}>
            {`${row.original.amount < 0 ? "-" : ""}${formattedAmount}`}
          </div>
        )
      },
    },
  ]

  return columns
}
