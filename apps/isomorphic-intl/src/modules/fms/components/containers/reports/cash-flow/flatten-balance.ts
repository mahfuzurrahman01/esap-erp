import { CashFlowItem } from "./types"

export const flattenCashFlowData = (
  item: CashFlowItem,
  expandedRows: Set<string>,
  level = 0
): any[] => {
  const rows: any[] = []
  const isExpanded = expandedRows.has(item.id)
  const isParent = item.id === "1000" || item.id === "2000"

  rows.push({
    id: item.id,
    name: item.name,
    amount: item.amount,
    level,
    hasChildren: Boolean(item.children?.length),
    isExpanded,
    isParent,
  })

  if (isExpanded && item.children) {
    item.children.forEach((child) => {
      rows.push(...flattenCashFlowData(child, expandedRows, level + 1))
    })
  }

  return rows
}
