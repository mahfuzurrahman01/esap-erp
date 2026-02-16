"use client"

import { useRouter } from "next/navigation"

import { Form } from "@core/ui/form"
import { useAtom } from "jotai"
import { useTranslations } from "next-intl"
import { PiPlusBold } from "react-icons/pi"

import FormFooter from "@/components/base/form-footer"
import FormGroup from "@/components/base/form-group"
import FormGroupContainer from "@/components/base/form-group-container"
import { Button, Input } from "@/components/ui"
import Box from "@/components/ui/box"
import TableGrid from "@/components/ui/table-grid"
import { BankTransactionFormInput } from "@/modules/fms/validators/bank-transaction-schema"
import { bankTransactionFormSchema } from "@/modules/fms/validators/bank-transaction-schema"

import { totalAllocatedAmountAtom, totalUnAllocatedAmountAtom } from "./amount-allocation"
import { BankTransactionInformation } from "./bank-transaction-information"
import { BankTransactionPaymentDetails } from "./bank-transaction-payment-details"
import { usePaymentDetailsColumns } from "./payment-details-columns"
import { useBankTransactionForm } from "./use-bank-transaction-form"

export default function CreateEditBankTransactionForm({
  id,
  mode = "create",
}: {
  id?: number
  mode?: "create" | "edit" | "view"
}) {
  const router = useRouter()
  const t = useTranslations("form")

  const {
    transactionDetails,
    setTransactionDetails,
    handleSubmit,
    addNewRow,
    isLoading,
    defaultValues,
    isFieldDisabled,
    bankTransactionById,
  } = useBankTransactionForm(id, mode)

  const columns = usePaymentDetailsColumns({
    isFieldDisabled,
    data: transactionDetails,
  })

  const handleRowChange = (index: number, field: string, value: number) => {
    const newTransactionDetails = [...transactionDetails]
    newTransactionDetails[index] = {
      ...newTransactionDetails[index],
      [field]: Number(value),
    }
    setTransactionDetails(newTransactionDetails)

    // Update totalAllocatedAmount when allocatedAmount changes
    if (field === 'allocatedAmount') {
      const newTotalAllocated = newTransactionDetails.reduce(
        (sum, detail) => sum + (detail.allocatedAmount || 0),
        0
      )
      setTotalAllocatedAmount(newTotalAllocated)
    }
  }

  const handleRowDelete = (index: number) => {
    const newTransactionDetails = transactionDetails.filter(
      (_, i) => i !== index
    )
    setTransactionDetails(newTransactionDetails)

    // Update totalAllocatedAmount after row deletion
    const newTotalAllocated = newTransactionDetails.reduce(
      (sum, detail) => sum + (detail.allocatedAmount || 0),
      0
    )
    setTotalAllocatedAmount(newTotalAllocated)
  }

  const [totalAllocatedAmount, setTotalAllocatedAmount] = useAtom(totalAllocatedAmountAtom)
  const [totalUnAllocatedAmount] = useAtom(totalUnAllocatedAmountAtom)

  return (
    <Box>
      <Form<BankTransactionFormInput>
        validationSchema={bankTransactionFormSchema}
        onSubmit={handleSubmit}
        useFormProps={{
          defaultValues,
          mode: "onChange",
          values: bankTransactionById as BankTransactionFormInput,
        }}
        className="flex grow flex-col justify-between pt-7 @container @2xl:pt-9 @3xl:pt-11">
        {({ register, control, formState, setValue }) => {
          return (
            <>
              <FormGroupContainer>
                <BankTransactionInformation
                  formMethods={{ register, control, formState, setValue }}
                  isFieldDisabled={isFieldDisabled}
                />

                {bankTransactionById?.paymentEntries && bankTransactionById.paymentEntries.length > 0 && (
                  <FormGroup
                    title={t("form-payment-entries")}
                    className="pt-7 @2xl:pt-10 @3xl:pt-11"
                    childrenContainerClassName="@2xl:grid-cols-1 @4xl:col-span-12">
                    <div className="space-y-4">
                      <TableGrid
                        data={transactionDetails}
                        columns={columns}
                        gridTemplateColumns="50px 1fr 1fr 200px 80px"
                        variant="modern"
                        onRowChange={handleRowChange}
                        onRowDelete={handleRowDelete}
                      />
                      {!isFieldDisabled && (
                        <Button
                          variant="outline"
                          onClick={addNewRow}
                          className="mt-4">
                          <PiPlusBold className="me-2 h-4 w-4" />
                          {t("form-add-row")}
                        </Button>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-4 @2xl:grid-cols-12">
                      <Input
                        type="number"
                        label={t("form-total-allocated-amount")}
                        placeholder={t("form-enter-total-allocated-amount")}
                        className="@2xl:col-span-4 @2xl:col-start-5"
                        {...register("totalAllocatedAmount")}
                        value={totalAllocatedAmount}
                        readOnly
                        disabled
                      />

                      <Input
                        type="number"
                        label={t("form-total-unallocated-amount")}
                        placeholder={t("form-enter-total-unallocated-amount")}
                        className="@2xl:col-span-4"
                        {...register("totalUnAllocatedAmount")}
                        value={totalUnAllocatedAmount}
                        readOnly
                        disabled
                      />
                    </div>
                  </FormGroup>
                )}

                <BankTransactionPaymentDetails
                  formMethods={{ register, control, formState }}
                  isFieldDisabled={isFieldDisabled}
                />
              </FormGroupContainer>

              {!isFieldDisabled && (
                <FormFooter
                  isLoading={isLoading}
                  altBtnText={t("form-cancel")}
                  handleAltBtn={() => router.back()}
                  submitBtnText={
                    id
                      ? t("form-update-bank-transaction")
                      : t("form-create-bank-transaction")
                  }
                />
              )}
            </>
          )
        }}
      </Form>
    </Box>
  )
}
