"use client"

import { useEffect, useState } from "react"

import { useTranslations } from "next-intl"

import {
  useBudgetById,
  useCreateBudget,
  useUpdateBudget,
} from "@/modules/fms/hooks/use-budget"
import { BudgetDetail, BudgetList, FiscalYearList } from "@/modules/fms/types"
import { BudgetFormInput } from "@/modules/fms/validators/budget-schema"

export function useBudgetForm(
  id?: number,
  mode: "create" | "edit" | "view" = "create"
) {
  const t = useTranslations("form")
  const [budgetDetails, setBudgetDetails] = useState<BudgetDetail[]>([])

  const { mutate: createBudget, isPending: isCreateBudgetPending } =
    useCreateBudget()
  const { mutate: updateBudget, isPending: isUpdateBudgetPending } =
    useUpdateBudget()
  const { data: budgetById } = useBudgetById(id!)

  useEffect(() => {
    if (budgetById?.budgetDetails && budgetById.budgetDetails.length > 0) {
      setBudgetDetails(
        budgetById.budgetDetails.map((detail) => ({
          ...detail,
          chartOfAccountId: detail.chartOfAccountId,
          budgetAmount: detail.budgetAmount,
        }))
      )
    } else if (mode === "create") {
      setBudgetDetails([
        {
          id: 0,
          budgetId: 0,
          chartOfAccountId: 0,
          budgetAmount: 0,
        },
      ])
    }
  }, [budgetById, mode])

  const addNewRow = () => {
    setBudgetDetails([
      ...budgetDetails,
      {
        id: 0,
        chartOfAccountId: 0,
        budgetAmount: 0,
      },
    ])
  }

  const handleRowChange = (index: number, field: string, value: any) => {
    const newBudgetDetails = [...budgetDetails]
    newBudgetDetails[index] = {
      ...newBudgetDetails[index],
      [field]: field === "budgetAmount" ? Number(value) : value,
    }
    setBudgetDetails(newBudgetDetails)
  }

  const handleRowDelete = (index: number) => {
    const newBudgetDetails = budgetDetails.filter((_, i) => i !== index)
    const updatedBudgetDetails = newBudgetDetails.map((entry, i) => ({
      ...entry,
      sn: i + 1,
    }))
    setBudgetDetails(updatedBudgetDetails)
  }

  const onSubmit = (data: BudgetFormInput) => {
    const transformedDetails = budgetDetails.map((detail) => ({
      ...detail,
      id: detail.id || 0,
      budgetId: data.id || 0,
    }))

    const budgetData: BudgetList = {
      ...data,
      costCenterId: data.costCenterId || 0,
      budgetDistributionId: data.budgetDistributionId || 0,
      budgetDetails: transformedDetails,
      fiscalYearId: data.fiscalYearId || 0,
      budgetAgainstId: data.budgetAgainstId || 0,
    }

    if (id) {
      updateBudget(budgetData)
    } else {
      createBudget(budgetData)
    }
  }

  const emptyFiscalYear: FiscalYearList = {
    yearRange: "",
    startDate: "",
    endDate: "",
  }

  const defaultValues: BudgetList = {
    budgetName: "",
    budgetAgainstId: 0,
    companyId: 0,
    fiscalYearId: 0,
    fiscalYear: emptyFiscalYear,
    budgetDistributionId: 0,
    costCenterId: 0,
    budgetDetails: [],
  }

  return {
    budgetDetails,
    isCreateBudgetPending,
    isUpdateBudgetPending,
    budgetById,
    defaultValues,
    addNewRow,
    handleRowChange,
    handleRowDelete,
    onSubmit,
  }
}
