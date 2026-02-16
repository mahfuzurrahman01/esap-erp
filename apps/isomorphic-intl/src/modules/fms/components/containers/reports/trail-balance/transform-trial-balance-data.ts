import { TrialBalanceList } from "@/modules/fms/types/trial-balance"

import { TrialBalanceRowData } from "./types"

let idCounter = 1

const generateId = (name: string) => {
  return `acc_${name.toLowerCase().replace(/\s+/g, "_")}_${idCounter++}`
}

export const flattenTrialBalanceData = (
  item: TrialBalanceList,
  expandedRows: Set<string>,
  level = 0,
  parentExpanded = true
): TrialBalanceRowData[] => {
  const rows: TrialBalanceRowData[] = []
  const id = generateId(item.accountName)
  const isExpanded = expandedRows.has(id)
  const isParent = Boolean(item.children?.length)

  // Only add this row if it's a root level item or if its parent is expanded
  if (level === 0 || parentExpanded) {
    rows.push({
      ...item,
      id,
      level,
      hasChildren: Boolean(item.children?.length),
      isExpanded,
      isParent,
    })
  }

  // Process children if this item is expanded and has children
  if (isExpanded && item.children && (level === 0 || parentExpanded)) {
    item.children.forEach((child) => {
      rows.push(
        ...flattenTrialBalanceData(child, expandedRows, level + 1, true)
      )
    })
  }

  return rows
}

export const resetIdCounter = () => {
  idCounter = 1
}