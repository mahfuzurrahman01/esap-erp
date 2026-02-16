"use client"

import React, { useState } from "react"

import { Form } from "@core/ui/form"
import { useAtom } from "jotai"
import { useTranslations } from "next-intl"
import { Controller, SubmitHandler } from "react-hook-form"

import FileUpload from "@/components/base/file-upload"
import FormGroup from "@/components/base/form-group"
import FormGroupContainer from "@/components/base/form-group-container"
import { Input, Select, Textarea } from "@/components/ui"
import Box from "@/components/ui/box"
import UploadPhoto from "@/components/ui/upload-photo"
import { useSelectOptions } from "@/hooks/use-select-options"
import { useSupplierList } from "@/modules/scm/hooks/procurement/supplier/use-supplier"
import { useCreateSupplierCollaboration } from "@/modules/scm/hooks/procurement/supplier/use-supplier-collaboration"
import { SupplierCollaboration } from "@/modules/scm/types/procurement/supplier/supplier-collaboration-types"
import { Supplier } from "@/modules/scm/types/procurement/supplier/supplier-types"
import { FindSelectOption } from "@/modules/scm/utils/select-options"
import { MessageSchema } from "@/modules/scm/validators/procurement/create-email-schema"

import { previewDataTemplate } from "../../requisition/create-requisition"
import SendMailStickyActions from "./send-mail-sticky-action"

const category = [
  { label: "Order Update", value: "order update" },
  { label: "Delivery Inquiry", value: "delivery inquiry" },
]

export default function CreateEmailMessage() {
  const [supplierEmail, setSupplierEmail] = useState<string>("")
  const [previewData, setPreviewData] = useAtom(previewDataTemplate)

  const t = useTranslations("form")

  const { data, isLoading } = useSupplierList()
  const supplierOptions = useSelectOptions<Supplier>(data?.data, "contactEmail")

  const {
    mutateAsync: createSupplierCollaboration,
    isPending: creatingSupplierCollaboration,
  } = useCreateSupplierCollaboration()

  const handleFileUpload = (files: File[]) => {
    if (files) {
      setPreviewData(files)
    }
  }

  const onSubmit: SubmitHandler<SupplierCollaboration> = async (data) => {
    const formData = {
      ...data,
      to: supplierEmail || "",
      attachmentFile: previewData,
    }
    await createSupplierCollaboration(formData)
  }

  return (
    <Box>
      <Form<SupplierCollaboration>
        validationSchema={MessageSchema}
        onSubmit={onSubmit}
        className="flex grow flex-col justify-between pt-7 @container @2xl:pt-9 @3xl:pt-11"
        // useFormProps={{
        //   defaultValues: getDefaultMessage(initialData),
        // }}
      >
        {({ register, control, formState: { errors } }) => {
          return (
            <FormGroupContainer>
              <div className="grid gap-7">
                <FormGroup title={t("form-email")}>
                  <Controller
                    control={control}
                    name="supplierId"
                    render={({ field: { onChange, value } }) => (
                      <Select
                        options={supplierOptions}
                        label={t("form-to")}
                        value={FindSelectOption(supplierOptions, value)}
                        onChange={(selectedValue: any) => {
                          setSupplierEmail(selectedValue?.label)
                          onChange(selectedValue?.value)
                        }}
                        className="text-gray-900 dark:text-gray-0"
                        isDisabled={isLoading}
                        isLoading={isLoading}
                        error={
                          errors.email?.message ? t(errors.email?.message) : ""
                        }
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="category"
                    render={({ field: { onChange, value } }) => (
                      <Select
                        placeholder={t("form-category")}
                        label={t("form-category")}
                        options={category}
                        onChange={(selectedValue: any) => {
                          onChange(selectedValue?.value)
                        }}
                        value={FindSelectOption(category, value)}
                        className="text-gray-900 dark:text-gray-0"
                        error={
                          errors.category?.message
                            ? t(errors.category?.message)
                            : ""
                        }
                      />
                    )}
                  />
                  <Input
                    labelClassName="bg-paper"
                    className="col-span-full"
                    label={t("form-subject")}
                    {...register("subject")}
                    error={
                      errors.subject?.message ? t(errors.subject?.message) : ""
                    }
                  />
                </FormGroup>
                <FormGroup
                  title={t("form-message")}
                  className="pt-7 @2xl:pt-10 @3xl:pt-11">
                  <Textarea
                    labelClassName="bg-paper"
                    label={t("form-message")}
                    {...register("messageBody")}
                    error={
                      errors.messageBody?.message
                        ? t(errors.messageBody?.message)
                        : ""
                    }
                    className="flex-grow text-title"
                  />
                </FormGroup>
                <FormGroup
                  title={t("form-attachment")}
                  className="pt-7 @2xl:pt-10 @3xl:pt-11">
                  <Controller
                    name="imageFile"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <UploadPhoto
                        onChange={(file) => onChange(file)}
                        value={value}
                      />
                    )}
                  />
                  <FileUpload
                    accept="pdf"
                    multiple={false}
                    onUpload={handleFileUpload}
                    btnLabel="upload"
                    className="col-span-full w-full @2xl:p-0"
                  />
                </FormGroup>
              </div>
              <SendMailStickyActions
                isLoading={creatingSupplierCollaboration}
              />
            </FormGroupContainer>
          )
        }}
      </Form>
    </Box>
  )
}
