"use client"

import { usePathname } from "next/navigation"
import { useEffect, useMemo, useState } from "react"

import { SubmitHandler } from "react-hook-form"

import { DEFAULT_SUPPLIER_EVALUATION_VALUES } from "@/modules/scm/constants/evaluation-criteria-constants"
import { useCreateSupplierEvaluation, useSupplierEvaluationById, useUpdateSupplierEvaluation } from "@/modules/scm/hooks"
import { useEvaluationCriteria } from "@/modules/scm/hooks/shared/use-evaluation-criteria"
import { CreateSupplierEvaluationInput, SupplierEvaluation, UpdateSupplierEvaluationInput } from "@/modules/scm/types/supplier-relationship/supplier-evaluation/supplier-evaluation-types"
import { useCurrentUser } from "@/hooks/auth/use-auth"
import { calculateAverageScore } from "./utils"


interface UseSupplierEvaluationFormProps {
    id: number
    mode?: "create" | "edit" | "view"
}

export const useSupplierEvaluationForm = ({
    id,
    mode = "create",
}: UseSupplierEvaluationFormProps) => {
    // const { id: supplierId } = useParams()
    const pathname = usePathname()
    const { user } = useCurrentUser()
    const isFieldDisabled = mode === "view"

    // Get the base path before the ID
    const currentPath = useMemo(() => {
        const pathSegments = pathname?.split("/") || []
        const basePathIndex = pathSegments.findIndex((segment) =>
            ["suppliers", "evaluation-history"].includes(
                segment
            )
        )
        return basePathIndex !== -1 ? pathSegments[basePathIndex] : null
    }, [pathname])

    // Map the path to our internal types
    const pathType = useMemo(() => {
        switch (currentPath) {
            case "suppliers":
                return "suppliers"
            case "evaluation-history":
                return "evaluationHistory"
            default:
                return null

        }
    }, [currentPath])

    const [formValues, setFormValues] = useState(DEFAULT_SUPPLIER_EVALUATION_VALUES)

    const {
        evaluationCriteria,
        setEvaluationCriteria,
        handleEvaluationCriteriaChange,
        handleEvaluationCriteriaDelete,
        handleEvaluationCriteriaAdd,
    } = useEvaluationCriteria()

    const { data: supplierEvaluation, isLoading: isSupplierEvaluationLoading } = useSupplierEvaluationById(pathType === "evaluationHistory" ? Number(id) : 0) as {
        data: SupplierEvaluation
        isLoading: boolean
    }

    useEffect(() => {
        if (formValues) {
            setEvaluationCriteria((prevItems) => {
                return prevItems.map((item) => {
                    return {
                        criteriaName: item.criteriaName,
                        score: Number(item.score),
                    }
                })
            })
            setFormValues({
                ...formValues,
                evaluatorName: user?.name ?? "",
                supplierId: Number(id),
                overallScore: calculateAverageScore(evaluationCriteria, 1, 100).average,
            })
        }
    }, [])

    useEffect(() => {
        if (supplierEvaluation && !isSupplierEvaluationLoading) {
            setEvaluationCriteria(supplierEvaluation.evaluationCriteries || [])
            
            setFormValues({
                ...formValues,
                supplierId: supplierEvaluation.supplierId,
                overallScore: supplierEvaluation.overallScore || calculateAverageScore(evaluationCriteria, 1, 100).average,
                evaluationDate: supplierEvaluation.evaluationDate,
                evaluatorName: supplierEvaluation.evaluatorName,
                comments: supplierEvaluation.comments,
                evaluationCriteries: supplierEvaluation.evaluationCriteries,
            })
        }
    }, [supplierEvaluation, isSupplierEvaluationLoading])


    const getFormValues = () => formValues


    const { mutateAsync: createSupplierEvaluation, isPending: isCreateSupplierEvaluationLoading } =
        useCreateSupplierEvaluation()
    const { mutateAsync: updateSupplierEvaluation, isPending: isUpdateSupplierEvaluationLoading } =
        useUpdateSupplierEvaluation()

    const onSubmit: SubmitHandler<CreateSupplierEvaluationInput | UpdateSupplierEvaluationInput> = async (data) => {
        const formattedData = {
            ...data,
            // supplierId: Number(id),
            status: true,
            overallScore: calculateAverageScore(evaluationCriteria, 1, 100).average,
            evaluationCriteries: evaluationCriteria.map((item) => ({
                criteriaName: item.criteriaName,
                score: Number(item.score),
            })),
        }
        if (mode === "create") {
            await createSupplierEvaluation(formattedData)
        } else {
            await updateSupplierEvaluation({ data: {
                ...formattedData,
                id: id,
            } })
        }

    }

    return {
        formValues,
        setFormValues,
        onSubmit,
        getFormValues,
        isFieldDisabled,
        evaluationCriteria,
        handleEvaluationCriteriaChange,
        handleEvaluationCriteriaDelete,
        handleEvaluationCriteriaAdd,
        isLoading: isCreateSupplierEvaluationLoading || isUpdateSupplierEvaluationLoading,
    }
}
