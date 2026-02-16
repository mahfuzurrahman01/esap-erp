"use client"

import { useState } from "react"

import { calculateRowTotalScore } from "../../components/containers/supplier-relationship/supplier-evalutaion/create-supplier-evaluation/utils"
import { DEFAULT_EVALUATION_CRITERIA } from "../../constants/evaluation-criteria-constants"
import { EvaluationCriteria } from "../../types/supplier-relationship/supplier-evaluation/supplier-evaluation-types"

export const useEvaluationCriteria = (
  initialItems: EvaluationCriteria[] = []
) => {
  const [evaluationCriteria, setEvaluationCriteria] =
    useState<EvaluationCriteria[]>(initialItems)

  const handleEvaluationCriteriaChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const newItems = [...evaluationCriteria]
    newItems[index] = {
      ...newItems[index],
      [field]: field === "score" ? parseFloat(value) || 0 : value,
    }
    newItems[index].score = calculateRowTotalScore(index, newItems)
    setEvaluationCriteria(newItems)
  }

  const handleEvaluationCriteriaDelete = (index: number) => {
    setEvaluationCriteria((prevItems) =>
      prevItems.filter((_, i) => i !== index)
    )
  }

  const handleEvaluationCriteriaAdd = () => {
    setEvaluationCriteria((prevItems) => [
      ...prevItems,
      {
        ...DEFAULT_EVALUATION_CRITERIA,
      },
    ])
  }

  return {
    evaluationCriteria,
    setEvaluationCriteria,
    handleEvaluationCriteriaChange,
    handleEvaluationCriteriaDelete,
    handleEvaluationCriteriaAdd,
  }
}
