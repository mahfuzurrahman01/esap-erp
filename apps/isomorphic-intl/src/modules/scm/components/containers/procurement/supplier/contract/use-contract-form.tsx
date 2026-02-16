"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

import { useAtom } from "jotai"
import { SubmitHandler } from "react-hook-form"

import { DEFAULT_CONTRACT_VALUES } from "@/modules/scm/constants/service-level-agreement-constants"
import { useContractById, useCreateContract } from "@/modules/scm/hooks"
import { useServiceLevelAgreement } from "@/modules/scm/hooks/shared/use-service-level-agreemet"
import { Contract, ContractInput } from "@/modules/scm/types/procurement/supplier/contract-types"

import {
  currencyNameTemplate,
  previewDataTemplate,
} from "../../requisition/create-requisition"

interface UseContractFormProps {
  id: number
  mode?: "create" | "edit" | "view"
}

export const useContractForm = ({
  id,
  mode = "create",
}: UseContractFormProps) => {
  const { id: supplierId } = useParams()
  const isFieldDisabled = mode === "view"
  const [previewData] = useAtom(previewDataTemplate)
  const [currencyName] = useAtom(currencyNameTemplate)

  const [formValues, setFormValues] = useState(DEFAULT_CONTRACT_VALUES)

  const {
    serviceLevelAgreement,
    setServiceLevelAgreement,
    handleServiceLevelAgreementChange,
    handleServiceLevelAgreementDelete,
    handleServiceLevelAgreementAdd,
  } = useServiceLevelAgreement()

  const fileInput = document.querySelector(
    'input[type="file"]'
  ) as HTMLInputElement
  const file = fileInput?.files?.[0]

  const formData = new FormData()
  if (file) {
    formData.append("bsFile", file)
  }

  const { data: contract, isLoading: isContractLoading } = useContractById(id) as {
    data: Contract
    isLoading: boolean
  }


  useEffect(() => {
    if (formValues) {
      setServiceLevelAgreement((prevItems) => {
        return prevItems.map((item) => {
          return {
            criteria: item.criteria,
            metric: Number(item.metric),
          }
        })
      })
      setFormValues(formValues)
    }
  }, [formValues])

  useEffect(() => {
    if (contract && !isContractLoading) {
      setServiceLevelAgreement(contract.serviceLevelAgreements)
      setFormValues({
        ...formValues,
        contractName: contract.contractName,
        contractValue: contract.contractValue,
        startDate: contract.startDate,
        endDate: contract.endDate,
        paymentTermsId: contract.paymentTermsId,
        currencyId: contract.currencyId,
      })
    }
  }, [contract, isContractLoading])


  const getFormValues = () => formValues


  const { mutateAsync: createContract, isPending: isCreateContractLoading } =
    useCreateContract()

  const onSubmit: SubmitHandler<ContractInput> = async (data) => {
    const formattedData = {
      ...data,
      supplierId: Number(supplierId),
      status: true,
      currencyName: currencyName,
      contractDocumentFile: previewData[0],
      serviceLevelAgreements: serviceLevelAgreement.map((item) => ({
        criteria: item.criteria,
        metric: Number(item.metric),
      })),
    }
    await createContract(formattedData)

  }

  return {
    formValues,
    setFormValues,
    onSubmit,
    getFormValues,
    isFieldDisabled,
    formData,
    serviceLevelAgreement,
    handleServiceLevelAgreementChange,
    handleServiceLevelAgreementDelete,
    handleServiceLevelAgreementAdd,
    isLoading: isCreateContractLoading,
  }
}
