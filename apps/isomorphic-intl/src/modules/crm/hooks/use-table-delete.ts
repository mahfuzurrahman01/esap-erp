import { Dispatch, SetStateAction } from "react"

import { UseMutateFunction } from "@tanstack/react-query"

interface UseTableDeleteProps<T> {
  deleteMutation: UseMutateFunction<any, Error, string, unknown>
  setData: Dispatch<SetStateAction<T[]>>
  resetRowSelection: () => void
}

export function useTableDelete<T extends { userId?: string }>({
  deleteMutation,
  setData,
  resetRowSelection,
}: UseTableDeleteProps<T>) {
  const handleDeleteRow = (row: T) => {
    if (row.userId === undefined) return

    deleteMutation(row.userId, {
      onSuccess: () => {
        setData((prev) => prev.filter((item) => item.userId !== row.userId))
      },
    })
  }

  const handleMultipleDelete = (selectedRows: T[]) => {
    const selectedIds = selectedRows
      .map((row) => row.userId)
      .filter((userId): userId is string => userId !== undefined)

    selectedIds.forEach((userId) => {
      deleteMutation(userId, {
        onSuccess: () => {
          setData((prev) => prev.filter((item) => item.userId !== userId))
        },
      })
    })

    resetRowSelection()
  }

  return {
    handleDeleteRow,
    handleMultipleDelete,
  }
}
