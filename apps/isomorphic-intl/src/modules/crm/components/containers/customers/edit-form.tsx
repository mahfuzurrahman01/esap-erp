"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

import { Form } from "@core/ui/form"
import { useTranslations } from "next-intl"
import { SubmitHandler } from "react-hook-form"

import FormFooter from "@/components/base/form-footer"
import FormGroupContainer from "@/components/base/form-group-container"
import Box from "@/components/ui/box"
import { useLeadById } from "@/modules/crm/hooks"
import {
  useCreateCustomer,
  useUpdateCustomer,
} from "@/modules/crm/hooks/use-customers"
import {
  Customer,
  CustomerCreationFormTypes,
  CustomerEditFormTypes,
} from "@/modules/crm/types/customer"
import { Lead } from "@/modules/crm/types/lead"
import { customerFormSchema } from "@/modules/crm/validators/customer-schema"
import InformationFields from "./information-fields"
import { AddressFields } from "./address-fields"
import { VerificationFields } from "./verification-fields"

export default function CustomerEditForm({
  id,
  customerData,
}: {
  id?: string
  customerData?: Customer
}) {
  const t = useTranslations("form")
  const router = useRouter()
  const searchParams = useSearchParams()
  const leadId = searchParams.get("leadId") || ""
  const { data: leadById } = useLeadById(leadId) as {
    data: Lead | undefined
    isLoading: boolean
  }
  const { mutateAsync: createCustomer, isPending: isCreating } = useCreateCustomer()
  const { mutateAsync: updateCustomer, isPending: isUpdating } = useUpdateCustomer()
  const [info, setInfo] = useState<any>({
    paymentTerms: 0,
    country: 0,
    currencyId: 0,
    chartOfAccountId: 0,
  })
  const [file, setFile] = useState<File | string>("")
  const [photo, setPhoto] = useState<File | string>("")

  useEffect(() => {
    if (customerData?.coverPhotoPath) {
      setFile(customerData?.coverPhotoPath)
    }
  }, [customerData])

  const handleFormSubmit: SubmitHandler<CustomerCreationFormTypes> = async (
    formData
  ) => {
    console.log("formData",formData)
    const newFormData = {
      FirstName: formData.firstName,
      LastName: formData.lastName,
      Email: formData.email,
      Phone: formData.phone,
      Street: formData.street,
      House: formData.house,
      Zip: formData.zip,
      City: formData.city,
      State: formData.state,
      AccountNo: formData.accountNo,
      BankName: formData.bankName,
      Company: formData.company,
      paymentTerms: formData.paymentTerms,
      Country: formData.country,
      Currency: formData.currencyId,
      ResidencePermitNo: formData.residencePermitNo,
      ChartOfAccountId: formData.chartOfAccountId,
      Photo: photo || formData.photo || null,
      CoverPhoto: file,
    }

    // console.log("newFormData", newFormData)

    if (id) {
      await updateCustomer({
        id,
        data: newFormData,
      })
    } else {
      await createCustomer(newFormData)
    }
  }

  // console.log("photo", photo)

  const initialValues = {
    ...customerData,
    company: leadById?.company || customerData?.company,
    country: info?.country || Number(leadById?.countryId) || Number(customerData?.country),
    city: leadById?.city || customerData?.city,
    street: leadById?.street || customerData?.street,
    house: leadById?.house || customerData?.house,
    zip: leadById?.zip || customerData?.zip,
    state: leadById?.state || customerData?.state,
    currencyId: info?.currencyId || customerData?.currencyId,
    paymentTerms: info?.paymentTerms || customerData?.paymentTerms,
    chartOfAccountId: info?.chartOfAccountId || customerData?.chartOfAccountId,
  }

  return (
    <Box className="md:mt-0">
      <Form<CustomerEditFormTypes>
        onSubmit={handleFormSubmit}
        validationSchema={customerFormSchema}
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
                  customerData={customerData}
                  leadById={leadById}
                  info={info}
                  setInfo={setInfo}
                  photo={photo}
                  setPhoto={setPhoto}
                />
                <AddressFields
                  register={register}
                  control={control}
                  errors={errors}
                  info={info}
                  setInfo={setInfo}
                />
                <VerificationFields
                  register={register}
                  control={control}
                  file={file}
                  setFile={setFile}
                  errors={errors}
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
