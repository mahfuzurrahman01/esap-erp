"use client"

import { atom } from "jotai"
import { dataAtom } from "./side-menu"

export const truncateDescription = (description: string) => {
  const cleanDescription = description.replace(/<[^>]*>/g, "")
  if (cleanDescription.length > 20) {
    return `${cleanDescription.slice(0, 20)}...` // {{ edit_2 }}
  }
  return cleanDescription
}

// export const sortByDate = (items: MessageType[], order: SortByType) => {
//   return items.slice().sort((a, b) => {
//     const dateA = new Date(a.date).valueOf()
//     const dateB = new Date(b.date).valueOf()

//     return order === "asc" ? dateA - dateB : dateB - dateA
//   })
// }

export const removeHtmlTags = (description: string) => {
  return description.replace(/<[^>]*>/g, "")
}

export function DotSeparator({ ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="4"
      height="4"
      viewBox="0 0 4 4"
      fill="none"
      {...props}>
      <circle cx="2" cy="2" r="2" fill="#D9D9D9" />
    </svg>
  )
}

export const deleteItemById = atom(
  null, // Read function is not needed
  (get, set, id: string) => {
    const currentData = get(dataAtom)
    const updatedData = currentData.filter((item) => item.id !== Number(id))
    set(dataAtom, updatedData)
  }
)
