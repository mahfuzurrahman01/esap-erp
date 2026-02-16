interface Entry {
  score?: number
}

/**
 * Calculates the average score from an array of entries.
 * Normalizes scores to a selectable scale.
 * @param entries - Array of entries with optional `score` values.
 * @param minScale - Minimum scale value for normalization.
 * @param maxScale - Maximum scale value for normalization.
 * @returns An object containing the average score normalized to the selected scale, total score, and count of valid scores.
 */
export const calculateAverageScore = (
  entries: Array<Entry>,
  minScale: number = 1,
  maxScale: number = 5
): { average: number; total: number; count: number } => {
  if (!Array.isArray(entries) || entries.length === 0) {
    return { average: 0, total: 0, count: 0 }
  }

  // Filter valid scores
  const validScores = entries
    .map((entry) => Number(entry.score))
    .filter((score) => !isNaN(score))

  if (validScores.length === 0) {
    return { average: 0, total: 0, count: 0 }
  }

  // Normalize and calculate total score
  const totalScore = validScores.reduce((acc, score) => {
    const normalizedScore =
      Math.min(Math.max(score, minScale), maxScale) *
      (100 / (maxScale - minScale + 1))
    return acc + normalizedScore
  }, 0)

  // Calculate and return average
  const averageScore = totalScore / validScores.length
  return { average: averageScore, total: totalScore, count: validScores.length }
}

/**
 * Calculates the total score for a row in a table based on score and modifiers.
 * @param index - The index of the row in the items array.
 * @param items - Array of item details with score and optional modifiers.
 * @returns The total score for the row.
 */
export const calculateRowTotalScore = (index: number, items: any[]): number => {
  const item = items[index]
  if (!item) return 0

  const { score, multiplier = 1, bonus = 0 } = item // Assuming default values for multiplier and bonus if not provided
  const totalScore = score * multiplier + bonus

  return totalScore
}
