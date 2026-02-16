interface Entry {
  quantity?: number
  unitPrice?: number
  tax?: number
  discount?: number
  shippingCost?: number
}

export const ProductItemsUtils = () => {
  const calculateRowTotal = (index: number, entries: Array<Entry>): number => {
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
    const unitPrice = isNaN(Number(entry.unitPrice))
      ? 0
      : Number(entry.unitPrice)

    // Calculate components of the total price
    const totalPrice = quantity * unitPrice
    // Ensure totalPrice is not negative
    return Math.max(0, totalPrice)
  }

  const calculateTotal = (entries: Array<Entry>): number => {
    if (!Array.isArray(entries) || entries.length === 0) return 0

    return entries.reduce((sum, entry) => {
      const quantity = Number(entry.quantity) || 0
      const unitPrice = Number(entry.unitPrice) || 0
      return sum + quantity * unitPrice
    }, 0)
  }

  const calculateTotalQuantity = (entries: Array<Entry>): number => {
    if (!Array.isArray(entries) || entries.length === 0) return 0

    return entries.reduce((sum, entry) => {
      const quantity = Number(entry.quantity) || 0
      return sum + quantity
    }, 0)
  }

  const calculateTotalAmount = (entries: Array<Entry>): number => {
    const total = calculateTotal(entries)
    return total
  }

  const generateCode = (prefix: string = "P") => {
    return `${prefix}-${Math.floor(Math.random() * 10000)}`
  }

  const updateRowData = (
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
    if (
      ["quantity", "unitPrice", "tax", "discount", "shippingCost"].includes(
        field
      )
    ) {
      newEntries[index].totalPrice = calculateRowTotal(index, newEntries)
    }

    return newEntries
  }

  return {
    calculateRowTotal,
    calculateTotal,
    calculateTotalQuantity,
    calculateTotalAmount,
    generateCode,
    updateRowData,
  }
}
