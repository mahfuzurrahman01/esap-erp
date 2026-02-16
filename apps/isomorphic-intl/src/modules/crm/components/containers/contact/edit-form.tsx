"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

import { Form } from "@core/ui/form"
import { useTranslations } from "next-intl"
import { SubmitHandler } from "react-hook-form"

import FormFooter from "@/components/base/form-footer"
import FormGroupContainer from "@/components/base/form-group-container"
import Box from "@/components/ui/box"
import {
  useCreateContact,
  useUpdateContact,
} from "@/modules/crm/hooks/use-contact"
import { Contact, ContactCreationFormTypes } from "@/modules/crm/types/contact"
import { contactFormSchema } from "@/modules/crm/validators/contact-schema"

import InformationFields from "./information-fields"
import OptionalFields from "./optional-fileds"

export default function ContactEditForm({
  id,
  contactData,
}: {
  id?: string
  contactData?: Contact
}) {
  const t = useTranslations("form")
  const router = useRouter()
  const [file, setFile] = useState<File | string>("")
  const searchParams = useSearchParams()
  const campaignId = searchParams.get("campaignId") || ""
  const leadId = searchParams.get("leadId") || ""
  const opportunityId = searchParams.get("opportunityId") || ""
  const salesOrdersId = searchParams.get("salesOrdersId") || ""
  const quotationId = searchParams.get("quotationId") || ""
  const invoiceId = searchParams.get("invoiceId") || ""

  const { mutateAsync: createContact, isPending: isCreating } =
    useCreateContact()
  const { mutateAsync: updateContact, isPending: isUpdating } =
    useUpdateContact()

  useEffect(() => {
    if (contactData?.filePath) {
      setFile(contactData.filePath)
    }
  }, [contactData])

  const handleFormSubmit: SubmitHandler<ContactCreationFormTypes> = async (
    formData
  ) => {
    const newFormData = {
      ...formData,
      File: file,
    }

    if (id) {
      await updateContact({
        id,
        data: newFormData,
      })
    } else {
      await createContact(newFormData)
    }
  }

  const selectedCampaignId = campaignId || contactData?.campaignId
  const selectedLeadId = leadId || contactData?.leadId
  const selectedOpportunityId = opportunityId || contactData?.opportunityId
  const selectedSalesOrdersId = salesOrdersId || contactData?.salesOrdersId
  const selectedQuotationId = quotationId || contactData?.quotationId
  const selectedInvoiceId = invoiceId || contactData?.invoiceId

  return (
    <Box className="md:mt-0">
      <Form<ContactCreationFormTypes>
        onSubmit={handleFormSubmit}
        validationSchema={contactFormSchema}
        className="flex grow flex-col justify-between @container"
        useFormProps={{
          mode: "onChange",
          defaultValues: { ...contactData, campaignId:selectedCampaignId, leadId:selectedLeadId, opportunityId:selectedOpportunityId, salesOrdersId:selectedSalesOrdersId, quotationId:selectedQuotationId, invoiceId:selectedInvoiceId },
        }}>
        {({ register, control, formState: { errors } }) => {
          return (
            <>
              <FormGroupContainer>
                <InformationFields
                  register={register}
                  control={control}
                  errors={errors}
                />
                <OptionalFields
                  register={register}
                  control={control}
                  errors={errors}
                  setFile={setFile}
                  file={file} 
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
