import { Dispatch, SetStateAction } from "react"

import { UseMutateFunction } from "@tanstack/react-query"

interface UseTableDeleteProps<T> {
  deleteMutation: UseMutateFunction<any, Error, number, unknown>
  bulkDeleteMutation?: UseMutateFunction<any, Error, number[], unknown>
  setData: Dispatch<SetStateAction<T[]>>
  resetRowSelection: () => void
  onSuccess?: () => void
  onError?: (error: Error) => void
}

export function useTableDelete<T extends { id?: number }>({
  deleteMutation,
  bulkDeleteMutation,
  setData,
  resetRowSelection,
  onSuccess,
  onError,
}: UseTableDeleteProps<T>) {
  const handleDeleteRow = (row: T) => {
    if (row.id === undefined) return

    deleteMutation(row.id, {
      onSuccess: () => {
        setData((prev) => prev.filter((item) => item.id !== row.id))
        onSuccess?.()
      },
      onError: (error) => {
        onError?.(error)
      },
    })
  }

  const handleMultipleDelete = (selectedRows: T[]) => {
    const selectedIds = selectedRows
      .map((row) => row.id)
      .filter((id): id is number => id !== undefined)

    if (selectedIds.length === 0) return

    if (selectedIds.length === 1) {
      deleteMutation(selectedIds[0], {
        onSuccess: () => {
          setData((prev) => prev.filter((item) => item.id !== selectedIds[0]))
          resetRowSelection()
          onSuccess?.()
        },
        onError: (error) => {
          onError?.(error)
        },
      })
      return
    }

    bulkDeleteMutation?.(selectedIds, {
      onSuccess: () => {
        setData((prev) =>
          prev.filter(
            (item) => item.id !== undefined && !selectedIds.includes(item.id)
          )
        )
        resetRowSelection()
        onSuccess?.()
      },
      onError: (error) => {
        onError?.(error)
      },
    })

    // selectedIds.forEach((id) => {
    //   deleteMutation(id, {
    //     onSuccess: () => {
    //       setData((prev) => prev.filter((item) => item.id !== id))
    //     },
    //   })
    // })

    resetRowSelection()
  }

  return {
    handleDeleteRow,
    handleMultipleDelete,
  }
}
