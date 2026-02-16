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
import {
  useCreatecampaign,
  useUpdatecampaign,
} from "@/modules/crm/hooks/use-campaign"
import { LeadDetail, OpportunityDetail } from "@/modules/crm/types/campaign"
import {
  CampaignCreationFormTypes,
  campaignFormSchema,
} from "@/modules/crm/validators/campaign-schema"

import { useCustomersColumns } from "./customer-column"
import { InformationFields } from "./information-fields"
import { useLeadsColumns } from "./lead-column"
import { useOpportinitiesColumns } from "./opportunity-column"

export default function CampaignEditForm({
  id,
  campaignData,
}: {
  id?: string
  campaignData?: any
}) {
  const t = useTranslations("form")
  const router = useRouter()
  const createCampaign = useCreatecampaign()
  const updateCampaign = useUpdatecampaign()
  const mutationFn = campaignData ? updateCampaign : createCampaign

  const [file, setFile] = useState<File | string>("")
  const leadColumns = useLeadsColumns()
  const opprotunityColumns = useOpportinitiesColumns()
  const customerColumns = useCustomersColumns()
  const [leads, setLeads] = useState<LeadDetail[]>([
    {
      id: 0,
      leadId: "",
      email: "",
      phone: "",
      company: "",
    },
  ])

  const [opportunities, setOpportunities] = useState<OpportunityDetail[]>([
    {
      id: 0,
      opportunityId: "",
      closingDate: "",
      amount: "",
      probability: "",
    },
  ])

  const [customers, setCustomers] = useState<any[]>([
    {
      id: 0,
      customerId: "",
      email: "",
      phone: "",
      company: "",
    },
  ])

  useEffect(() => {
    if (campaignData?.attachmentUrl) {
      setFile(campaignData.attachmentUrl)
    }
    if (campaignData?.leads) {
      const leadleads = campaignData?.leads?.map((detail: any) => ({
        id: 0,
        leadId: detail.id,
        email: detail.email,
        phone: detail.phone,
        company: detail.company,
      }))
      setLeads(leadleads)
    }
    if (campaignData?.opportunities) {
      const opportunityDetails = campaignData?.opportunities?.map(
        (detail: any) => ({
          id: 0,
          opportunityId: detail.id,
          closingDate: detail.closingDate,
          amount: detail.amount,
          probability: detail.probability,
        })
      )
      setOpportunities(opportunityDetails)
    }
    if (campaignData?.customers) {
      const customerDetails = campaignData?.customers?.map((detail: any) => ({
        id: 0,
        customerId: detail.id,
        email: detail.email,
        phone: detail.phone,
        company: detail.company,
      }))
      setCustomers(customerDetails)
    }
  }, [campaignData])

  const onSubmit: SubmitHandler<CampaignCreationFormTypes> = async (data) => {
    const newFormData : any = {
      ...data,
      Attachment: file,
    }
    if (leads.length > 0 && leads.some((entry) => entry.leadId && entry.leadId !== "")) {
      newFormData.LeadIds = leads.filter((entry) => entry.leadId && entry.leadId !== "").map((entry) => entry.leadId)
    }
    if (opportunities.length > 0 && opportunities.some((opportunity) => opportunity.opportunityId && opportunity.opportunityId !== "")) {
      newFormData.OpportunityIds = opportunities.filter((opportunity) => opportunity.opportunityId && opportunity.opportunityId !== "").map((opportunity) => opportunity.opportunityId)
    }
    if (customers.length > 0 && customers.some((customer) => customer.customerId && customer.customerId !== "")) {
      newFormData.CustomerIds = customers.filter((customer) => customer.customerId && customer.customerId !== "").map((customer) => customer.customerId)
    }
    // console.log("newFormData",newFormData)
    await mutationFn.mutateAsync(
      campaignData ? { id, data: newFormData } : newFormData
    )
  }

  const addNewRow = () => {
    const newEntry: LeadDetail = {
      id: 0,
      leadId: "",
      email: "",
      phone: "",
      company: "",
    }

    const updatedleads = [...leads, newEntry]
    setLeads(updatedleads)
  }

  const handleRowChange = (index: number, field: string, value: any) => {
    const newleads = [...leads]
    newleads[index] = {
      ...newleads[index],
      [field]: value,
    }
    setLeads(newleads)
  }

  const handleRowDelete = (index: number) => {
    const newleads = leads.filter((_, i) => i !== index)
    const updatedleads = newleads.map((entry, i) => ({
      ...entry,
      sn: i + 1,
    }))
    setLeads(updatedleads)
  }

  const addNewOpportunityRow = () => {
    const newEntry: any = {
      id: 0,
      opportunityId: "",
      closingDate: "",
      amount: "",
      probability: "",
    }

    const updatedOpportunities = [...opportunities, newEntry]
    setOpportunities(updatedOpportunities)
  }

  const handleOpportunityRowChange = (
    index: number,
    field: string,
    value: any
  ) => {
    const newOpportunities = [...opportunities]
    newOpportunities[index] = {
      ...newOpportunities[index],
      [field]: value,
    }
    setOpportunities(newOpportunities)
  }

  const handleOpportunityRowDelete = (index: number) => {
    const newOpportunities = opportunities.filter((_, i) => i !== index)
    const updatedOpportunities = newOpportunities.map((entry, i) => ({
      ...entry,
      sn: i + 1,
    }))
    setOpportunities(updatedOpportunities)
  }

  const addNewCustomerRow = () => {
    const newEntry: any = {
      id: 0,
      customerId: "",
      email: "",
      phone: "",
      company: "",
    }

    const updatedCustomers = [...customers, newEntry]
    setCustomers(updatedCustomers)
  }

  const handleCustomerRowChange = (
    index: number,
    field: string,
    value: any
  ) => {
    const newCustomers = [...customers]
    newCustomers[index] = {
      ...newCustomers[index],
      [field]: value,
    }
    setCustomers(newCustomers)
  }

  const handleCustomerRowDelete = (index: number) => {
    const newCustomers = customers.filter((_, i) => i !== index)
    const updatedCustomers = newCustomers.map((entry, i) => ({
      ...entry,
      sn: i + 1,
    }))
    setCustomers(updatedCustomers)
  }

  return (
    <Box className="md:mt-0">
      <Form<CampaignCreationFormTypes>
        onSubmit={onSubmit}
        validationSchema={campaignFormSchema}
        className="flex grow flex-col justify-between @container"
        useFormProps={{
          mode: "onChange",
          defaultValues: {
            ...campaignData,
            status: campaignData?.status ? campaignData?.status : 'Active'
          },
        }}>
        {({ register, control, setValue, formState: { errors }, watch, setError, clearErrors }) => {
          // console.log("errors", errors)
          return (
            <>
              <FormGroupContainer>
                <InformationFields
                  register={register}
                  control={control}
                  errors={errors}
                  setFile={setFile}
                  setValue={setValue}
                  file={file}
                  watch={watch}
                  setError={setError}
                  clearErrors={clearErrors}
                />
                <FormGroup
                  fullWidthHeader
                  title={
                    <div className="flex items-center justify-between">
                      <span>{t("form-leads")}</span>
                      <Link href={routes.crm.leadCreate}>
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
                      columns={leadColumns}
                      data={leads}
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

                <FormGroup
                  fullWidthHeader
                  title={
                    <div className="flex items-center justify-between">
                      <span>{t("form-opportunity")}</span>
                      <Link href={routes.crm.opportunityCreate}>
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
                      columns={opprotunityColumns}
                      data={opportunities}
                      gridTemplateColumns="50px 610px 220px 220px 220px 60px"
                      variant="modern"
                      onRowChange={handleOpportunityRowChange}
                      onRowDelete={handleOpportunityRowDelete}
                    />
                    <Button
                      variant="outline"
                      onClick={addNewOpportunityRow}
                      className="mt-4">
                      <PiPlusBold className="me-2 h-4 w-4" />
                      {t("form-add-row")}
                    </Button>
                  </div>
                </FormGroup>

                <FormGroup
                  fullWidthHeader
                  title={
                    <div className="flex items-center justify-between">
                      <span>{t("form-customers")}</span>
                      <Link href={routes.crm.createCustomer}>
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
                      columns={customerColumns}
                      data={customers}
                      gridTemplateColumns="50px 610px 220px 220px 220px 60px"
                      variant="modern"
                      onRowChange={handleCustomerRowChange}
                      onRowDelete={handleCustomerRowDelete}
                    />
                    <Button
                      variant="outline"
                      onClick={addNewCustomerRow}
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
