import { BalanceSheetAccount } from "@/modules/fms/types/balance-sheet"

import { BalanceSheetItem } from "./types"

let idCounter = 1

const generateId = (name: string) => {
  return `acc_${name.toLowerCase().replace(/\s+/g, "_")}_${idCounter++}`
}

export const flattenBalanceSheetData = (
  item: BalanceSheetAccount & { id?: string },
  expandedRows: Set<string>,
  level = 0,
  parentExpanded = true
): BalanceSheetItem[] => {
  const rows: BalanceSheetItem[] = []
  const id = item.id || generateId(item.accountName)
  const isExpanded = expandedRows.has(id)
  const isParent = Boolean(item.childAccounts?.length)

  if (level === 0 || parentExpanded) {
    rows.push({
      ...item,
      id,
      level,
      hasChildren: Boolean(item.childAccounts?.length),
      isExpanded,
      isParent,
    })
  }

  if (isExpanded && item.childAccounts && (level === 0 || parentExpanded)) {
    item.childAccounts.forEach((child) => {
      rows.push(
        ...flattenBalanceSheetData(
          { ...child, id: generateId(child.accountName) },
          expandedRows,
          level + 1,
          true
        )
      )
    })
  }

  return rows
}

export const resetIdCounter = () => {
  idCounter = 1
}
