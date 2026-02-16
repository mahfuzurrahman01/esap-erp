"use client";

import { useParams } from "next/navigation";



import { Form } from "@core/ui/form";
import { useAtom } from "jotai";
import { useTranslations } from "next-intl";
import { SubmitHandler } from "react-hook-form";



import FileUpload from "@/components/base/file-upload";
import FormGroup from "@/components/base/form-group";
import FormGroupContainer from "@/components/base/form-group-container";
import { Input, Textarea } from "@/components/ui";
import Box from "@/components/ui/box";
import { useRequisitionById } from "@/modules/scm/hooks/procurement/requisition/use-requisition";
import { useSendEmail } from "@/modules/scm/hooks/procurement/requisition/use-send-email";
import { useSupplierById } from "@/modules/scm/hooks/procurement/supplier/use-supplier";
import { Requisition } from "@/modules/scm/types/procurement/requisition/requisition-types";
import { SendEmailTypes } from "@/modules/scm/types/procurement/requisition/send-email-types";
import { Supplier } from "@/modules/scm/types/procurement/supplier/supplier-types";
import { SendEmailSchema } from "@/modules/scm/validators/procurement/send-email.schema";



import SendMailStickyActions from "../../supplier-collaboration/create-email-message/send-mail-sticky-action";
import { previewDataTemplate } from "../create-requisition";





export default function SendByEmail() {
  const { id } = useParams()
  const [previewData, setPreviewData] = useAtom(previewDataTemplate)
  const { data: requisition, isPending: isLoadingRequisition } =
    useRequisitionById(Number(id)) as { data: Requisition; isPending: boolean }

  const { data: supplier, isPending: isLoadingSupplier } = useSupplierById(
    requisition?.supplierId || 0
  ) as { data: Supplier; isPending: boolean }
  const { sendEmail, isLoading: isSendingEmail } = useSendEmail()
  const handleFileUpload = (files: File[]) => {
    if (files && files.length > 0) {
      // Store only the first file since we're handling single file upload
      setPreviewData([files[0]])
    }
  }
  const onSubmit: SubmitHandler<SendEmailTypes> = (data) => {
    sendEmail.mutateAsync({
      ...data,
      requisitionId: Number(id),
      attachmentFile: previewData[0],
      to: data.to || supplier?.contactEmail,
    })
  }
  const t = useTranslations("form")

  const defaultValues = {
    requisitionId: Number(id),
    to: supplier?.contactEmail || "",
    subject: "",
    messageBody: "",
    attachmentFile: undefined,
  }

  return (
    <Box>
      <Form<SendEmailTypes>
        validationSchema={SendEmailSchema}
        onSubmit={onSubmit}
        className="flex grow flex-col justify-between pt-7 @container @2xl:pt-9 @3xl:pt-11"
        useFormProps={{
          mode: "onChange",
          reValidateMode: "onChange",
          defaultValues: defaultValues,
          values: defaultValues,
        }}>
        {({ register, formState: { errors } }) => {
          return (
            <>
              <FormGroupContainer>
                <FormGroup title={t("form-email")}>
                  <Input
                    type="email"
                    // disabled={!!supplier?.contactEmail}
                    labelClassName="bg-paper"
                    className="col-span-full"
                    label={t("form-to")}
                    {...register("to")}
                    helperText="Example: alireza@gmail.com"
                    error={
                      errors.to?.message
                        ? t(errors.to?.message)
                        : ""
                    }
                  />
                  <Input
                    labelClassName="bg-paper"
                    className="col-span-full"
                    label={t("form-subject")}
                    {...register("subject")}
                    error={
                      errors.subject?.message
                        ? t(errors.subject?.message)
                        : ""
                    }
                  />
                </FormGroup>
                <FormGroup title={t("form-message")} className="col-span-full pt-4" childrenContainerClassName="@2xl:grid-cols-1">
                  <Textarea
                    labelClassName="bg-paper"
                    className="col-span-full w-full"
                    label={t("form-message-body")}
                    {...register("messageBody")}
                    error={
                      errors.messageBody?.message
                        ? t(errors.messageBody?.message)
                        : ""
                    }
                  />
                </FormGroup>
                <FormGroup
                  title={t("form-attachment")}
                  className="col-span-full pt-4">
                  <FileUpload
                    accept="pdf"
                    multiple={false}
                    onUpload={handleFileUpload}
                    btnLabel="upload"
                    className="col-span-full w-full @2xl:p-0"
                  />
                </FormGroup>
              </FormGroupContainer>
              <SendMailStickyActions
                isLoading={
                  isSendingEmail || isLoadingSupplier || isLoadingRequisition
                }
              />
            </>
          )
        }}
      </Form>
    </Box>
  )
}