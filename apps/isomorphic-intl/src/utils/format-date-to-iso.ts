export const formatDateToISO = (date: Date | null): string | undefined => {
  if (!date) return undefined
  const isoString = date.toISOString()
  return isoString
}
