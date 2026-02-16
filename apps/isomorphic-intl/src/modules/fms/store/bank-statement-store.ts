import { atom } from "jotai"

import { COLUMN_PATTERNS } from "../constants/column-patterns"

export interface ColumnMapping {
  date?: string
  amount?: string
  transactionType?: string
  referenceNumber?: string
  description?: string
}

// Add type safety for column patterns
export type ColumnMappingKey = keyof ColumnMapping

// Ensure pattern keys match ColumnMapping
export const columnPatterns: Record<ColumnMappingKey, string[]> =
  COLUMN_PATTERNS

export const previewDataAtom = atom<any[]>([])
export const columnMappingAtom = atom<ColumnMapping>({})

/**
 * Finds a matching column from the CSV data based on predefined patterns
 * @param columns - Array of column names from the CSV
 * @param patterns - Array of patterns to match against
 * @returns The matched column name or undefined if no match found
 */
export const findMatchingColumn = (
  columns: string[],
  patterns: string[]
): string | undefined => {
  if (!columns.length || !patterns.length) return undefined

  const lowerCaseColumns = columns.map((col) => col.toLowerCase().trim())
  const index = lowerCaseColumns.findIndex((col) =>
    patterns.some((pattern) => col.includes(pattern.toLowerCase().trim()))
  )

  return index !== -1 ? columns[index] : undefined
}
