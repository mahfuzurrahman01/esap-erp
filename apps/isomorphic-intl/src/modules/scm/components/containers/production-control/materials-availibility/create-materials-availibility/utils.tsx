interface Entry {
  requiredQuantity?: number
  availableQuantity?: number
}

export const calculateRowTotal = (
  index: number,
  entries: Array<Entry>
): number => {
  // Validate the entries array
  if (!Array.isArray(entries) || entries.length === 0) {
    throw new Error("Invalid or empty entries array")
  }

  // Validate the index
  if (index < 0 || index >= entries.length) {
    return 0
  }

  const entry = entries[index]
  // Convert values to numbers and default to 0 if invalid
  const requiredQuantity = isNaN(Number(entry.requiredQuantity))
    ? 0
    : Number(entry.requiredQuantity)
  const availableQuantity = isNaN(Number(entry.availableQuantity))
    ? 0
    : Number(entry.availableQuantity)

  // Calculate shortage (required - available)
  // If shortage is negative (more available than required), return 0
  // If shortage is positive (less available than required), return shortage amount
  return Math.max(0, requiredQuantity - availableQuantity)
}

export const updateRowData = (
  entries: any[],
  index: number,
  field: string,
  value: any
) => {
  const newEntries = [...entries]
  newEntries[index] = {
    ...newEntries[index],
    [field]: value,
  }

  // Recalculate total if price-related fields change
  if (["requiredQuantity", "availableQuantity"].includes(field)) {
    newEntries[index].totalCost = calculateRowTotal(index, newEntries)
  }

  return newEntries
}
