"use client"

import { useRouter, useSearchParams } from "next/navigation"

import { Form } from "@core/ui/form"
import { useTranslations } from "next-intl"
import { SubmitHandler } from "react-hook-form"

import FormFooter from "@/components/base/form-footer"
import FormGroupContainer from "@/components/base/form-group-container"
import Box from "@/components/ui/box"
import {
  useCreateMeeting,
  useUpdateMeeting,
} from "@/modules/crm/hooks/use-meeting"
import { Meeting, MeetingCreationFormTypes } from "@/modules/crm/types/meeting"
import { meetingFormSchema } from "@/modules/crm/validators/meeting-schema"

import InformationFields from "./information-fields"
import OptionalFields from "./optional-fileds"

export default function MeetingEditForm({
  id,
  meetingData,
}: {
  id?: string
  meetingData?: Meeting
}) {
  const t = useTranslations("form")
  const router = useRouter()
  const createmeeting = useCreateMeeting()
  const updatemeeting = useUpdateMeeting()
  const searchParams = useSearchParams()
  const meetingTime = searchParams.get("meetingTime") || ""
  const campaignId = searchParams.get("campaignId") || ""
  const leadId = searchParams.get("leadId") || ""
  const opportunityId = searchParams.get("opportunityId") || ""
  const salesOrdersId = searchParams.get("salesOrdersId") || ""
  const quotationId = searchParams.get("quotationId") || ""
  const invoiceId = searchParams.get("invoiceId") || ""
  const mutationFn = meetingData ? updatemeeting : createmeeting

  const onSubmit: SubmitHandler<MeetingCreationFormTypes> = async (data) => {
    await mutationFn.mutateAsync(meetingData ? { id, data } : data)
  }
  const selectedMeetingTime = meetingTime || meetingData?.meetingTime
  const selectedCampaignId = campaignId || meetingData?.campaignId
  const selectedLeadId = leadId || meetingData?.leadId
  const selectedOpportunityId = opportunityId || meetingData?.opportunityId
  const selectedSalesOrdersId = salesOrdersId || meetingData?.salesOrdersId
  const selectedQuotationId = quotationId || meetingData?.quotationId
  const selectedInvoiceId = invoiceId || meetingData?.invoiceId

  const initialValues = {
    ...meetingData,
    meetingTime: selectedMeetingTime,
    campaignId: selectedCampaignId,
    leadId: selectedLeadId,
    opportunityId: selectedOpportunityId,
    salesOrdersId: selectedSalesOrdersId,
    quotationId: selectedQuotationId,
    invoiceId: selectedInvoiceId,
    participantIds: meetingData?.participantIds
    ? meetingData.participantIds.split(',')
    : [],
  }

  return (
    <Box className="md:mt-0">
      <Form<MeetingCreationFormTypes>
        onSubmit={onSubmit}
        validationSchema={meetingFormSchema}
        className="flex grow flex-col justify-between @container"
        useFormProps={{
          mode: "onChange",
          defaultValues: initialValues,
          values: initialValues,
        }}>
        {({ register, control, formState: { errors } }) => {
          // console.log("errors", errors)
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
                />
              </FormGroupContainer>
              <FormFooter
                isLoading={mutationFn.isPending}
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
