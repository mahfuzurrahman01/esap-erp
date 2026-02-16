"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import { Form } from "@core/ui/form"
import { useTranslations } from "next-intl"
import { SubmitHandler } from "react-hook-form"

import FormFooter from "@/components/base/form-footer"
import FormGroupContainer from "@/components/base/form-group-container"
import Box from "@/components/ui/box"
import { useCreateBill, useUpdateBill } from "@/modules/crm/hooks/use-bill"
import {
  Bill,
  BillCreationFormTypes,
  BillEditFormTypes,
} from "@/modules/crm/types/bill"
import { billFormSchema } from "@/modules/crm/validators/bill-schema"
import InformationFields from "./information-fields"

export default function BillForm({
  id,
  billData,
}: {
  id?: string
  billData?: Bill
}) {
  const t = useTranslations("form")
  const [file, setFile] = useState<File | string>("")
  const router = useRouter()

  const { mutateAsync: createBill, isPending: isCreating } = useCreateBill()
  const { mutateAsync: updateBill, isPending: isUpdating } = useUpdateBill()

  useEffect(() => {
    if (billData?.filePath) {
      setFile(billData.filePath)
    }
  }, [billData])

  const handleFormSubmit: SubmitHandler<BillCreationFormTypes> = async (
    formData
  ) => {
    const newFormData = {
      IncomeCategory: formData.incomeCategory,
      Type: formData.type,
      Amount: formData.amount,
      IssueDate: formData.issueDate,
      CustomerId: formData.customerId,
      PaymentMethod: formData.paymentMethod,
      ChartOfAccountId: formData.chartOfAccountId,
      Note: formData.note,
      File: file,
    }

    if (id) {
      await updateBill({
        id,
        data: newFormData,
      })
    } else {
      await createBill(newFormData)
    }
  }

  return (
    <Box>
      <Form<BillEditFormTypes>
        validationSchema={billFormSchema}
        onSubmit={handleFormSubmit}
        className="flex grow flex-col justify-between @container"
        useFormProps={{
          mode: "onChange",
          defaultValues: billData,
        }}>
        {({ register, control, formState: { errors } }) => {
          // console.log("errors", errors)
          return (
            <>
              <FormGroupContainer className="pt-5">
                <InformationFields
                register={register}
                control={control}
                errors={errors}
                file={file}
                setFile={setFile}
                 />
              </FormGroupContainer>
              <FormFooter
                isLoading={isCreating || isUpdating}
                altBtnText={t("form-back")}
                handleAltBtn={() => {
                  router.back()
                }}
              />
            </>
          )
        }}
      </Form>
    </Box>
  )
}
