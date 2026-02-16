interface Entry {
  advanceAmount?: number
  allocatedAmount?: number
}

export const AdvancedAmountUtils = () => {
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
    const advanceAmount = isNaN(Number(entry.advanceAmount))
      ? 0
      : Number(entry.advanceAmount)
    const allocatedAmount = isNaN(Number(entry.allocatedAmount))
      ? 0
      : Number(entry.allocatedAmount)

    // Calculate components of the total price
    const totalPrice = advanceAmount - allocatedAmount
    // Ensure totalPrice is not negative
    return Math.max(0, totalPrice)
  }

   const calculateTotal = (entries: Array<Entry>): number => {
     if (!Array.isArray(entries) || entries.length === 0) return 0

     return entries.reduce((sum, entry) => {
       const advanceAmount = Number(entry.advanceAmount) || 0
       const allocatedAmount = Number(entry.allocatedAmount) || 0
       return sum + advanceAmount - allocatedAmount
     }, 0)
   }

  const calculateTotalAmount = (entries: Array<Entry>): number => {
    const total = calculateTotal(entries)
    return total
  }

  const calculateOutstandingAmount = (netTotal: number, totalAdvance: number, writeOffAmount: number): number => {
    const outstandingAmount = netTotal - totalAdvance - writeOffAmount
    return outstandingAmount
  }

  const calculateNetTotal = (paymentAmount: number, totalTax: number): number => {
    const netTotal = paymentAmount + totalTax
    return netTotal
  }

  return {
    calculateRowTotal,
    calculateTotal,
    calculateTotalAmount,
    calculateOutstandingAmount,
  }
}
