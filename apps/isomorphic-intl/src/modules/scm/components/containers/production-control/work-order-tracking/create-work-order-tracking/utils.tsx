interface Entry {
  quantity?: number
  unitCost?: number
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
    return 0 // Return 0 if the index is out of bounds
  }

  // Extract values from the entry, using 0 as the default
  const entry = entries[index]
  const quantity = isNaN(Number(entry.quantity)) ? 0 : Number(entry.quantity)
  const unitCost = isNaN(Number(entry.unitCost)) ? 0 : Number(entry.unitCost)

  // Calculate components of the total price
  const subtotal = quantity * unitCost
  const totalPrice = subtotal

  // Ensure totalPrice is not negative
  return Math.max(0, totalPrice)
}

export const calculateSubTotal = (entries: Array<Entry>): number => {
  if (!Array.isArray(entries) || entries.length === 0) return 0

  return entries.reduce((sum, entry) => {
    const quantity = Number(entry.quantity) || 0
    const unitCost = Number(entry.unitCost) || 0
    return sum + quantity * unitCost
  }, 0)
}

export const calculateTotalAmount = (entries: Array<Entry>): number => {
  const subTotal = calculateSubTotal(entries)

  return subTotal
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
  if (["quantity", "unitCost"].includes(field)) {
    newEntries[index].totalCost = calculateRowTotal(index, newEntries)
  }

  return newEntries
}
