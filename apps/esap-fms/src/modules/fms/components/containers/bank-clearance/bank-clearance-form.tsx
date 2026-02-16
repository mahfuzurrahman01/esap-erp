"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { useQueryParams } from "@/hooks/use-query-params"

import { Form } from "@core/ui/form"
import { useTranslations } from "next-intl"
import { toast } from "react-hot-toast"

import FormFooter from "@/components/base/form-footer"
import FormGroup from "@/components/base/form-group"
import FormGroupContainer from "@/components/base/form-group-container"
import Box from "@/components/ui/box"
import TableGrid from "@/components/ui/table-grid"
import { BankClearanceFormInput } from "@/modules/fms/validators/bank-clearance-schema"
import { bankClearanceFormSchema } from "@/modules/fms/validators/bank-clearance-schema"
import { useBankClearanceList, useUpdateBankClearance, useUpdateBankClearanceBatch } from "@/modules/fms/hooks"
import { BankClearance, BankClearanceQueryOptions } from "@/modules/fms/types/bank-clearance"

import { BankClearanceInformation } from "./bank-clearance-information"
import { usePaymentDetailsColumns } from "./payment-details-columns"

export default function BankClearanceForm() {
  const router = useRouter()
  const t = useTranslations("form")

  const { params, updateParams } = useQueryParams<BankClearanceQueryOptions>({
    params: [
      {
        key: "bankAccountId",
        defaultValue: undefined,
        parse: (value) => Number(value) || undefined,
      },
      {
        key: "chartOfAccountId",
        defaultValue: undefined,
        parse: (value) => Number(value) || undefined,
      },
    ],
  })

  const { data: bankClearanceData, refetch } = useBankClearanceList({
    bankAccountId: params.bankAccountId,
    chartOfAccountId: params.chartOfAccountId,
  })
  const { mutate: updateBankClearance } = useUpdateBankClearance()
  const { mutate: updateBankClearanceBatch } = useUpdateBankClearanceBatch()
  const [localData, setLocalData] = useState<Record<number, string>>({})

  const handleDateChange = (id: number, date: string) => {
    setLocalData((prev) => ({
      ...prev,
      [id]: date,
    }))
  }

  const columns = usePaymentDetailsColumns({
    onDateChange: handleDateChange,
  })

  const handleSubmit = async (data: BankClearanceFormInput) => {
    const selectedItems = Object.entries(localData).map(([id, date]) => ({
      id: parseInt(id),
      bankClearenceDate: date,
    }))

    if (selectedItems.length === 0) {
      toast.error(t("form-bank-clearance-batch-failed-to-update"))
      return
    }

    if (selectedItems.length === 1) {
      await updateBankClearance({
        id: selectedItems[0].id,
        paymentStatus: "Cleared",
        bankClearenceDate: selectedItems[0].bankClearenceDate,
      })
    } else if (selectedItems.length > 1) {
      const batchUpdates = selectedItems.map(item => ({
        id: item.id,
        paymentStatus: "Cleared",
        bankClearenceDate: item.bankClearenceDate,
      }))
      await updateBankClearanceBatch(batchUpdates)
    }

    await refetch()
    setLocalData({})
  }

  // Merge local data with API data
  const mergedData = bankClearanceData?.map((item: BankClearance) => ({
    ...item,
    bankClearenceDate: localData[item.id] || item.bankClearenceDate,
  }))

  // Get the first selected date for form validation
  const firstSelectedDate = Object.values(localData)[0] || ""
  // Get the first item's id for default values
  const firstItemId = bankClearanceData?.[0]?.id

  return (
    <Box>
      <Form<BankClearanceFormInput>
        validationSchema={bankClearanceFormSchema}
        onSubmit={handleSubmit}
        useFormProps={{
          defaultValues: {
            id: firstItemId,
            bankClearenceDate: firstSelectedDate || new Date().toISOString(),
            paymentStatus: "Cleared",
            bankAccountId: params.bankAccountId,
            chartOfAccountId: params.chartOfAccountId,
          },
        }}
        className="flex grow flex-col justify-between pt-7 @container @2xl:pt-9 @3xl:pt-11">
        {({ register, control, formState }) => {
          return (
            <>
              <FormGroupContainer>
                <BankClearanceInformation
                  formMethods={{ register, control, formState }}
                  updateParams={updateParams}
                />

                <FormGroup
                  title={t("form-payment-entries")}
                  className="pt-7 @2xl:pt-10 @3xl:pt-11"
                  childrenContainerClassName="@2xl:grid-cols-1 @4xl:col-span-12">
                  <div className="space-y-4">
                    <TableGrid
                      data={mergedData || []}
                      columns={columns}
                      gridTemplateColumns="50px 1fr 1fr 1fr 1fr 1fr"
                      variant="modern"
                    />
                  </div>
                </FormGroup>
              </FormGroupContainer>

              <FormFooter
                isLoading={false}
                altBtnText={t("form-back")}
                handleAltBtn={() => router.back()}
                submitBtnText={t("form-update-bank-clearance")}
              />
            </>
          )
        }}
      </Form>
    </Box>
  )
}
