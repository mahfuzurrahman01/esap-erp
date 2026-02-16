"use client"

import { useRouter, useSearchParams } from "next/navigation"

import { Form } from "@core/ui/form"
import { useTranslations } from "next-intl"
import { SubmitHandler } from "react-hook-form"

import FormFooter from "@/components/base/form-footer"
import FormGroupContainer from "@/components/base/form-group-container"
import Box from "@/components/ui/box"
import {
  useCreateOpportunity,
  useUpdateOpportunity,
} from "@/modules/crm/hooks/use-opportunities"
import {
  Opportunity,
  OpportunityCreationFormTypes,
  OpportunityEditFormTypes,
} from "@/modules/crm/types/opportunity"
import { opportunityFormSchema } from "@/modules/crm/validators/opportunity-schema"

import { InformationFields } from "./information-fields"
import { useLeadById } from "@/modules/crm/hooks"
import { Lead } from "@/modules/crm/types/lead"

export default function OpportunityEditForm({
  id,
  opportunityData,
}: {
  id?: string
  opportunityData?: Opportunity
}) {
  const t = useTranslations("form")
  const router = useRouter()
  const searchParams = useSearchParams()
  const leadIdFromParams = searchParams.get("leadId")
  const createOpportunity = useCreateOpportunity()
  const updateOpportunity = useUpdateOpportunity()
  const mutationFn = opportunityData ? updateOpportunity : createOpportunity

  const { data: leadById } = useLeadById(leadIdFromParams) as {
    data: Lead | undefined
    isLoading: boolean
  }

  const onSubmit: SubmitHandler<OpportunityCreationFormTypes> = async (
    data
  ) => {
    await mutationFn.mutateAsync(opportunityData ? { id, data } : data)
  }

  const initialValues = {
    ...opportunityData,
    leadId: leadIdFromParams || opportunityData?.leadId,
    dealOwner: opportunityData?.dealOwner || leadById?.owner,
    name: opportunityData?.name || leadById?.title,
    leadSource: opportunityData?.leadSource || leadById?.leadSource,
    type: opportunityData?.type || "New Business",
    primaryContact: opportunityData?.primaryContact || leadById?.email,
    forecastedRevenue: opportunityData?.forecastedRevenue || leadById?.annualRevenue,
    description: opportunityData?.description || leadById?.description,
  }

  return (
    <Box className="md:mt-0">
      <Form<OpportunityEditFormTypes>
        onSubmit={onSubmit}
        validationSchema={opportunityFormSchema}
        className="flex grow flex-col justify-between @container"
        useFormProps={{
          mode: "onChange",
          defaultValues: initialValues,
          values: initialValues,
        }}>
        {({ register, control, formState: { errors } }) => {
          // console.log('errors', errors)
          return (
            <>
              <FormGroupContainer>
                <InformationFields
                  leadById={leadById}
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
