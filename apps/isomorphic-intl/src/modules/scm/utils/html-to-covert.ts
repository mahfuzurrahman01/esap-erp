/**
 * Utility function to process a risk description.
 * @param {string} description - The raw HTML description.
 * @param {boolean} showFullDescription - Flag to indicate if the full description should be shown.
 * @returns {string} - The processed description.
 */
export function processDescription(
  description: string,
  showFullDescription: boolean
): string {
  const textWithoutHtml = description.replace(/<[^>]*>/g, "")
  const isLongDescription = textWithoutHtml.length > 200

  return isLongDescription && !showFullDescription
    ? `${textWithoutHtml.substring(0, 200)}...`
    : textWithoutHtml
}
