import { Dispatch, SetStateAction } from "react"

import { UseMutateFunction } from "@tanstack/react-query"

interface UseTableDeleteProps<T> {
  deleteMutation: UseMutateFunction<any, Error, number, unknown>
  bulkDeleteMutation?: UseMutateFunction<any, Error, number[], unknown>
  setData: Dispatch<SetStateAction<T[]>>
  resetRowSelection: () => void
}

export function useTableDelete<T extends { id?: number }>({
  deleteMutation,
  bulkDeleteMutation,
  setData,
  resetRowSelection,
}: UseTableDeleteProps<T>) {
  const handleDeleteRow = (row: T) => {
    if (row.id === undefined) return

    deleteMutation(row.id, {
      onSuccess: () => {
        setData((prev) => prev.filter((item) => item.id !== row.id))
      },
    })
  }

  const handleMultipleDelete = (selectedIds: number[]) => {
    if (!bulkDeleteMutation) return

    bulkDeleteMutation(selectedIds, {
      onSuccess: () => {
        setData((prev) =>
          prev.filter((item) => !selectedIds.includes(item.id as number))
        )
        resetRowSelection()
      },
    })
  }

  return {
    handleDeleteRow,
    handleMultipleDelete,
  }
}
