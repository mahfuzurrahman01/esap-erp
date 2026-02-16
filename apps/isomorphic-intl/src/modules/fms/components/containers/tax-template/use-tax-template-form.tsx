"use client"

import { useEffect, useState } from "react"

import {
  useCreateTaxTemplate,
  useTaxTemplateById,
  useUpdateTaxTemplate,
} from "@/modules/fms/hooks/use-tax-template"

import { TaxTemplateDetail, TaxTemplateFormInput } from "./template-form-types"

export function useTaxTemplateForm(
  id?: number,
  mode: "create" | "edit" | "view" = "create"
) {
  const [taxDetails, setTaxDetails] = useState<TaxTemplateDetail[]>([])

  const { mutate: createTaxTemplate, isPending: isCreateTaxTemplatePending } =
    useCreateTaxTemplate()
  const { mutate: updateTaxTemplate, isPending: isUpdateTaxTemplatePending } =
    useUpdateTaxTemplate()
  const { data: taxTemplateById } = useTaxTemplateById(id!)

  useEffect(() => {
    if (
      taxTemplateById?.taxTemplateDetails &&
      taxTemplateById.taxTemplateDetails.length > 0
    ) {
      setTaxDetails(taxTemplateById.taxTemplateDetails as TaxTemplateDetail[])
    } else if (mode === "create") {
      setTaxDetails([
        {
          id: 0,
          taxTemplateId: 0,
          taxType: "",
          taxRate: 0,
          taxAmount: 0,
          chartOfAccountId: 0,
        },
      ])
    }
  }, [taxTemplateById, mode])

  const handleSubmit = (data: TaxTemplateFormInput) => {
    const transformedDetails = taxDetails.map((detail) => ({
      id: detail.id || 0,
      taxTemplateId: Number(id) || 0,
      taxType: detail.taxType || "",
      taxRate: detail.taxRate || 0,
      taxAmount: detail.taxAmount || 0,
      chartOfAccountId: detail.chartOfAccountId || 0,
    }))

    const taxTemplateData = {
      ...data,
      id: Number(id) || 0,
      taxTemplateDetails: transformedDetails,
    }

    if (id) {
      updateTaxTemplate({ id, data: taxTemplateData })
    } else {
      createTaxTemplate(taxTemplateData)
    }
  }

  const addNewRow = () => {
    setTaxDetails([
      ...taxDetails,
      {
        id: 0,
        taxTemplateId: Number(id) || 0,
        chartOfAccountId: 0,
        taxRate: 0,
        taxAmount: 0,
        taxType: "",
      },
    ])
  }

  const defaultValues: TaxTemplateFormInput = {
    id: taxTemplateById?.id || 0,
    taxTemplateName: taxTemplateById?.taxTemplateName || "",
    templateType: taxTemplateById?.templateType || "",
    taxCategoryId: taxTemplateById?.taxCategoryId || 0,
    companyId: taxTemplateById?.companyId || 0,
    isActive: taxTemplateById?.isActive || false,
    taxTemplateDetails: (taxTemplateById?.taxTemplateDetails || []).map(
      (detail) => ({
        ...detail,
        id: detail.id || 0,
      })
    ) as TaxTemplateDetail[],
  }

  return {
    taxDetails,
    setTaxDetails,
    handleSubmit,
    addNewRow,
    isCreateTaxTemplatePending,
    isUpdateTaxTemplatePending,
    defaultValues,
  }
}
