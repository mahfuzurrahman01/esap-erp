import { ProfitAndLossItem } from "./types"

let idCounter = 1

const generateId = (name: string) => {
  return `acc_${name.toLowerCase().replace(/\s+/g, "_")}_${idCounter++}`
}

export const flattenProfitAndLossData = (
  item: ProfitAndLossItem,
  expandedRows: Set<string>,
  level = 0,
  parentExpanded = true
): any[] => {
  const rows: any[] = []
  const id = item.id || generateId(item.accountName)
  const isExpanded = expandedRows.has(id)
  const isParent =
    item.accountName === "Income" ||
    item.accountName === "Expense" ||
    item.accountName === "Equity" ||
    Boolean(item.childAccounts?.length)

  if (level === 0 || parentExpanded) {
    rows.push({
      id,
      name: item.accountName,
      amount: item.amount,
      level,
      hasChildren: Boolean(item.childAccounts?.length),
      isExpanded,
      isParent,
    })
  }

  if (isExpanded && item.childAccounts && (level === 0 || parentExpanded)) {
    item.childAccounts.forEach((child) => {
      rows.push(
        ...flattenProfitAndLossData(
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
