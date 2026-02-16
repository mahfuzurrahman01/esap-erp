"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import { Form } from "@core/ui/form"
import { useTranslations } from "next-intl"
import { Controller, SubmitHandler } from "react-hook-form"

import FormFooter from "@/components/base/form-footer"
import FormGroupContainer from "@/components/base/form-group-container"
import { Input, Select } from "@/components/ui"
import Box from "@/components/ui/box"
import UploadZone from "@/components/ui/crm/upload-zone"
import { quotationTypes } from "@/data/crm/quotation"
import { useSelectOptions } from "@/hooks/use-select-options"
import FormGroup from "@/modules/crm/components/base/form-group"
import { useCustomerList } from "@/modules/crm/hooks/use-customers"
import {
  useCreateTicket,
  useTicketList,
  useUpdateTicket,
} from "@/modules/crm/hooks/use-ticket"
import { CustomerList } from "@/modules/crm/types/customer"
import {
  Ticket,
  TicketCreationFormTypes,
  TicketList,
} from "@/modules/crm/types/ticket"
import { ticketFormSchema } from "@/modules/crm/validators/ticket-schema"

export default function TicketEditForm({
  id,
  ticketData,
}: {
  id?: string
  ticketData?: Ticket
}) {
  const t = useTranslations("form")
  const [file, setFile] = useState<File | string>("")
  const router = useRouter()

  const { data } = useTicketList()
  const ticketOptions = useSelectOptions<TicketList>(data?.data, "subject")

  const { data: customers, isLoading } = useCustomerList()
  const customerOptions = useSelectOptions<CustomerList>(
    customers?.data,
    "firstName"
  )

  const { mutateAsync: createTicket, isPending: isCreating } = useCreateTicket()
  const { mutateAsync: updateTicket, isPending: isUpdating } = useUpdateTicket()

  useEffect(() => {
    if (ticketData?.filePath) {
      setFile(ticketData.filePath)
    }
  }, [ticketData])

  const handleFormSubmit: SubmitHandler<TicketCreationFormTypes> = async (
    formData
  ) => {
    const newFormData = {
      Subject: formData.subject,
      Service: formData.service || "",
      DepartmentId: formData.departmentId,
      Email: formData.email,
      Project: formData.project,
      MergeTicketId: formData.mergeTicketId,
      Status: formData.status,
      File: file,
    }
    if (id) {
      await updateTicket({
        id,
        data: newFormData,
      })
    } else {
      await createTicket(newFormData)
    }
  }

  return (
    <Box className="md:mt-0">
      <Form<TicketCreationFormTypes>
        onSubmit={handleFormSubmit}
        validationSchema={ticketFormSchema}
        className="flex grow flex-col justify-between @container"
        useFormProps={{
          mode: "onChange",
          defaultValues: {...ticketData, status: "Active"},
        }}>
        {({
          register,
          control,
          formState: { errors },
        }) => {
          return (
            <>
              <FormGroupContainer>
                <FormGroup
                  title={t("form-information")}
                  className="grid-cols-12 pt-7 @2xl:pt-10 @3xl:pt-11">
                  <Input
                    type="text"
                    isRequired
                    label={t("form-subject")}
                    placeholder={t("form-enter-subject")}
                    {...register("subject", { required: true })}
                    error={
                      errors?.subject?.message
                        ? t("form-subject-is-required")
                        : undefined
                    }
                  />

                  <Controller
                    name="service"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Select
                        isSearchable={true}
                        isRequired
                        label={t("form-service")}
                        options={quotationTypes}
                        onChange={(selectedOption: any) =>
                          onChange(selectedOption?.value)
                        }
                        value={
                          quotationTypes?.find(
                            (option: any) => option.value === value
                          ) || null
                        }
                        error={
                          errors?.service?.message && t("form-service-is-required")
                        }
                      />
                    )}
                  />

                  <Controller
                    name="departmentId"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Select
                        isSearchable={true}
                        label={t("form-customer")}
                        isRequired
                        placeholder={
                          isLoading ? t("form-loading") : t("form-select")
                        }
                        options={customerOptions}
                        onChange={(selectedOption: any) =>
                          onChange(selectedOption?.value)
                        }
                        isLoading={isLoading}
                        isDisabled={isLoading}
                        value={
                          customerOptions?.find(
                            (option: any) => option.value === value
                          ) || null
                        }
                        error={
                          errors.departmentId?.message &&
                          t("form-customer-is-required")
                        }
                      />
                    )}
                  />

                  <Input
                    type="text"
                    label={t("form-email")}
                    placeholder={t("form-enter-email")}
                    {...register("email", { required: true })}
                    error={
                      errors?.email?.message
                        ? String(errors.email.message)
                        : undefined
                    }
                  />

                  <Input
                    type="text"
                    label={t("form-project")}
                    placeholder={t("form-enter-project-name")}
                    inputClassName="border-gray-500/20 ring-0"
                    {...register("project", { required: true })}
                  />

                  <Controller
                    name="mergeTicketId"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Select
                        label={t("form-merge-ticket")}
                        placeholder={t("form-select")}
                        isSearchable={true}
                        options={ticketOptions}
                        onChange={(selectedOption: any) =>
                          onChange(selectedOption?.value)
                        }
                        value={
                          ticketOptions?.find(
                            (option: any) => option.value === value
                          ) || null
                        }
                        error={errors?.mergeTicketId?.message}
                      />
                    )}
                  />

                  <Controller
                    name="status"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Select
                        isSearchable={true}
                        label={t("form-status")}
                        options={[
                          { label: "Active", value: "Active" },
                          { label: "Close", value: "Close" },
                        ]}
                        onChange={(selectedOption: any) =>
                          onChange(selectedOption?.value)
                        }
                        value={
                          [
                            { label: "Active", value: "Active" },
                            { label: "Close", value: "Close" },
                          ].find((option: any) => option.value === value) ||
                          null
                        }
                        error={errors?.status?.message}
                      />
                    )}
                  />

                  <Controller
                    name="file"
                    control={control}
                    render={() => (
                      <div className="grid gap-5 @3xl:grid-cols-1 lg:col-span-2">
                        <label
                          htmlFor="file"
                          className="block text-sm font-medium text-gray-700 dark:text-white">
                          {t("form-attachment")}
                        </label>
                        <UploadZone
                          multiple={false}
                          btnLabel="upload"
                          className="col-span-full w-full @2xl:p-0"
                          file={file}
                          setFile={setFile}
                        />
                      </div>
                    )}
                  />
                </FormGroup>
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
