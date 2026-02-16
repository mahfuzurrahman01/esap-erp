"use client"

import { useEffect, useState } from "react"
import { useAtom } from "jotai"

import {
  useBankTransactionById,
  useCreateBankTransaction,
  useUpdateBankTransaction,
} from "@/modules/fms/hooks/use-bank-transaction"
import { BankTransactionList } from "@/modules/fms/types/bank-transaction"
import {
  BankTransactionDetail,
  BankTransactionFormInput,
} from "@/modules/fms/validators/bank-transaction-schema"
import { amountAtom, totalAllocatedAmountAtom } from "./amount-allocation"

export function useBankTransactionForm(
  id?: number,
  mode: "create" | "edit" | "view" = "create"
) {
  const isFieldDisabled = mode === "view"
  const [transactionDetails, setTransactionDetails] = useState<
    BankTransactionDetail[]
  >([])
  const [, setAmount] = useAtom(amountAtom)
  const [, setTotalAllocatedAmount] = useAtom(totalAllocatedAmountAtom)

  const {
    mutate: createBankTransaction,
    isPending: isCreateBankTransactionPending,
  } = useCreateBankTransaction()
  const {
    mutate: updateBankTransaction,
    isPending: isUpdateBankTransactionPending,
  } = useUpdateBankTransaction()
  const { data: bankTransactionById } = useBankTransactionById(id || 0)

  useEffect(() => {
    if (bankTransactionById) {
      // Set initial values from API
      setAmount(bankTransactionById.amount || 0)
      setTotalAllocatedAmount(bankTransactionById.totalAllocatedAmount || 0)

      const details = bankTransactionById.paymentEntries
      if (details && details.length > 0) {
        setTransactionDetails(
          details.map((detail) => ({
            id: detail.id || 0,
            paymentType: detail.paymentType || null,
            paymentCode: detail.paymentCode || null,
            allocatedAmount: detail.allocatedAmount || 0,
          }))
        )
      }
    } else if (mode === "create") {
      setTransactionDetails([
        {
          id: 0,
          paymentType: null,
          paymentCode: null,
          allocatedAmount: 0,
        },
      ])
      setAmount(0)
      setTotalAllocatedAmount(0)
    }
  }, [bankTransactionById, mode, setAmount, setTotalAllocatedAmount])

  const handleSubmit = (data: BankTransactionFormInput) => {
    const transformedDetails = transactionDetails.map((detail) => ({
      ...detail,
      id: detail.id || 0,
      paymentType: detail.paymentType || null,
      paymentCode: detail.paymentCode || null,
      allocatedAmount: detail.allocatedAmount || 0,
    }))

    const bankTransactionData = {
      ...data,
      id: Number(id) || null,
      transactionType: data.transactionType || "deposit",
      amount: Number(data.amount) || 0,
      description: data.description || "",
      partyAccountNumber: data.partyAccountNumber || "",
      partyIBAN: data.partyIBAN || "",
      totalUnAllocatedAmount: data.totalUnAllocatedAmount || Number(data.amount) || 0,
      paymentEntries: transformedDetails.length > 0 && transformedDetails.some(detail => detail.paymentType !== null)
        ? transformedDetails
        : [],
    } as BankTransactionList

    if (id) {
      updateBankTransaction(bankTransactionData)
    } else {
      createBankTransaction(bankTransactionData)
    }
  }

  const addNewRow = () => {
    setTransactionDetails([
      ...transactionDetails,
      {
        id: 0,
        paymentType: null,
        paymentCode: null,
        allocatedAmount: 0,
      },
    ])
  }

  const defaultValues: BankTransactionFormInput = {
    id: bankTransactionById?.id || 0,
    transactionType: bankTransactionById?.transactionType || "deposit",
    bankAccountId: bankTransactionById?.bankAccountId || 0,
    bankAccount: bankTransactionById?.bankAccount
      ? {
        bankAccountName: bankTransactionById.bankAccount.accountName,
      }
      : undefined,
    transactionDate: bankTransactionById?.transactionDate || "",
    companyId: bankTransactionById?.companyId || 0,
    company: bankTransactionById?.company
      ? {
        companyName: bankTransactionById.company.companyName,
      }
      : undefined,
    amount: bankTransactionById?.amount || 0,
    totalUnAllocatedAmount: bankTransactionById?.amount || 0,
    currencyId: bankTransactionById?.currencyId || 0,
    currency: bankTransactionById?.currency
      ? {
        currencyName: bankTransactionById.currency.currencyName,
      }
      : undefined,
    referenceNumber: bankTransactionById?.referenceNumber || "",
    partyType: bankTransactionById?.partyType || undefined,
    partyName: bankTransactionById?.partyName?.toString() || "",
    partyAccountNumber: bankTransactionById?.partyAccountNumber || "",
    partyIBAN: bankTransactionById?.partyIBAN || "",
    paymentEntries: (bankTransactionById?.paymentEntries || []).map((detail) => ({
      ...detail,
      id: detail.id || 0,
      paymentType: detail.paymentType || null,
      paymentCode: detail.paymentCode || null,
      allocatedAmount: detail.allocatedAmount || 0,
    })) as BankTransactionDetail[],
  }

  return {
    transactionDetails,
    setTransactionDetails,
    handleSubmit,
    addNewRow,
    isLoading: isCreateBankTransactionPending || isUpdateBankTransactionPending,
    defaultValues,
    isFieldDisabled,
    bankTransactionById,
  }
}
