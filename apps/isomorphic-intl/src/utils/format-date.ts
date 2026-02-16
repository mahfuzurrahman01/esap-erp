import { usePathname } from "next/navigation"

import dayjs from "dayjs"
import "dayjs/locale/ar"

// Import Arabic locale

// import { DEFAULT_DATE_FORMAT } from "@/config/constants"

const arabicNumbers = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"]

const convertToArabicNumbers = (str: string) => {
  return str.replace(/[0-9]/g, (w) => arabicNumbers[+w])
}

export const formatDate = (
  date: string | Date | null | undefined,
  format: string = "DD-MM-YYYY"
) => {
  if (!date) return ""

  const pathname = window.location.pathname
  const isArabic = pathname.includes("/ar")
  const dateLocale = isArabic ? "ar" : "en"

  const formattedDate = dayjs(date).locale(dateLocale).format(format)
  return isArabic ? convertToArabicNumbers(formattedDate) : formattedDate
}

// Usage example:
// formatDate(date, "DD MMMM YYYY", pathname.includes("/ar") ? "ar" : "en")
