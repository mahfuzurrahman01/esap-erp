"use client"

import { useEffect, useState } from "react"

export const useEmployeeDocumentForm = (initialData: any) => {
  const [resetValues, setResetValues] = useState(initialData)

  const onSubmit = (data: any) => {
    console.log(data)
  }

  const onDelete = () => {
    //console.log("delete")
  }

  useEffect(() => {
    if (initialData) {
      setResetValues(initialData)
    }
  }, [initialData])

  return { onSubmit, onDelete, resetValues }
}
