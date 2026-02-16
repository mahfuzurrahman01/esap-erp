"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import { Form } from "@core/ui/form"
import { useTranslations } from "next-intl"
import { SubmitHandler } from "react-hook-form"
import { PiPlusBold } from "react-icons/pi"

import FormFooter from "@/components/base/form-footer"
import FormGroupContainer from "@/components/base/form-group-container"
import { Button } from "@/components/ui"
import Box from "@/components/ui/box"
import TableGrid from "@/components/ui/table-grid"
import { routes } from "@/config/routes"
import FormGroup from "@/modules/crm/components/base/form-group"
import { useCreateLead, useUpdateLead } from "@/modules/crm/hooks/use-leads"
import {
  CampaignDetail,
  LeadCreationFormTypes,
  LeadEditFormTypes,
} from "@/modules/crm/types/lead"
import { leadFormSchema } from "@/modules/crm/validators/lead-schema"

import { AddressFields } from "./address-fields"
import { useCampaignsColumns } from "./campaign-column"
import { InformationFields } from "./information-fields"

export default function LeadEditForm({
  id,
  leadData,
}: {
  id?: string
  leadData?: any
}) {
  const router = useRouter()
  const t = useTranslations("form")
  const campaignColumns = useCampaignsColumns()
  const [campaigns, setCampaigns] = useState<CampaignDetail[]>([
    {
      id: 0,
      campaignId: "",
      deadline: "",
      service: "",
      source: "",
    },
  ])
  const createLead = useCreateLead()
  const updateLead = useUpdateLead()
  const mutationFn = id ? updateLead : createLead

  useEffect(() => {
    if (leadData?.campaigns) {
      const campaignData = leadData?.campaigns?.map((detail: any) => ({
        id: 0,
        campaignId: detail.id,
        deadline: detail.deadline,
        service: detail.service,
        source: detail.source,
      }))
      setCampaigns(campaignData)
    }
  }, [leadData])

  const onSubmit: SubmitHandler<LeadCreationFormTypes> = async (data) => {
    const validCampaigns = campaigns
        ? campaigns.map((entry) => entry.campaignId).filter((id) => id && id.trim() !== "")
        : [];

    const formattedData = {
        ...data,
        ...(validCampaigns.length > 0 ? { CampaignIds: validCampaigns } : {}),
        countryId: String(data?.countryId),
        address: data?.city,
    };
    // console.log('formattedData',formattedData)
    await mutationFn.mutateAsync(id ? { id, data: formattedData } : formattedData)
  }

  const addNewRow = () => {
    const newEntry: CampaignDetail = {
      id: 0,
      campaignId: "",
      deadline: "",
      service: "",
      source: "",
    }

    const updatedcampaigns = [...campaigns, newEntry]
    setCampaigns(updatedcampaigns)
  }

  const handleRowChange = (index: number, field: string, value: any) => {
    const newCampaigns = [...campaigns]
    newCampaigns[index] = {
      ...newCampaigns[index],
      [field]: value,
    }
    setCampaigns(newCampaigns)
  }

  const handleRowDelete = (index: number) => {
    const newCampaigns = campaigns.filter((_, i) => i !== index)
    const updatedCampaigns = newCampaigns.map((entry, i) => ({
      ...entry,
      sn: i + 1,
    }))
    setCampaigns(updatedCampaigns)
  }

  return (
    <Box className="md:mt-0">
      <Form<LeadEditFormTypes>
        validationSchema={leadFormSchema}
        className="flex grow flex-col justify-between @container"
        onSubmit={onSubmit}
        useFormProps={{
          mode: "onChange",
          defaultValues: leadData,
        }}>
        {({ register, control, formState: { errors } }) => {
          // //console.log('errors', errors)
          return (
            <>
              <FormGroupContainer>
                <InformationFields
                  register={register}
                  control={control}
                  errors={errors}
                />
                <AddressFields register={register} control={control} />
                <FormGroup
                  fullWidthHeader
                  title={
                    <div className="flex items-center justify-between">
                      <span>{t("form-campaigns")}</span>
                      <Link href={routes.crm.campaignCreate}>
                        <Button
                          variant="outline"
                          className="flex items-center gap-2 text-sm">
                          <PiPlusBold className="h-4 w-4" />
                          {t("form-add-new")}
                        </Button>
                      </Link>
                    </div>
                  }
                  className="pt-7 @2xl:pt-10 @3xl:pt-11"
                  childrenContainerClassName="@2xl:grid-cols-1 @4xl:col-span-12">
                  <div className="space-y-4">
                    <TableGrid
                      columns={campaignColumns}
                      data={campaigns}
                      gridTemplateColumns="50px 610px 220px 220px 220px 60px"
                      variant="modern"
                      onRowChange={handleRowChange}
                      onRowDelete={handleRowDelete}
                    />
                    <Button
                      variant="outline"
                      onClick={addNewRow}
                      className="mt-4">
                      <PiPlusBold className="me-2 h-4 w-4" />
                      {t("form-add-row")}
                    </Button>
                  </div>
                </FormGroup>
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
