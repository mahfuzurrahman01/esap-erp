"use client"

import { Form } from "@core/ui/form"
import { useTranslations } from "next-intl"

import { FileInput } from "@/components/base/file-upload"
import { useEmployeeDocumentForm } from "@/components/container/hrms/employee/employee-documents/use-employee-document-form"
import { Button, Input } from "@/components/ui"
import { FormDefaultProps } from "@/types/hrms/common.types"
import {
  EmployeeDocumentInputType,
  employeeDocumentSchema,
} from "@/validators/hrms/employee-document.schema"

type Props = FormDefaultProps<EmployeeDocumentInputType>

const DocumentItemForm = ({ initialData, isEditForm }: Props) => {
  const t = useTranslations("form")
  const { onSubmit, onDelete, resetValues } =
    useEmployeeDocumentForm(initialData)

  return (
    <Form<EmployeeDocumentInputType>
      validationSchema={employeeDocumentSchema}
      resetValues={resetValues}
      onSubmit={onSubmit}
      className="col-span-full grid gap-4 border-b border-dashed border-gray-500/20 @2xl:grid-cols-2 @4xl:col-span-8 @4xl:gap-5 xl:gap-7"
      useFormProps={{
        mode: "all",
        defaultValues: initialData,
      }}>
      {({ register, formState: { errors, isDirty } }) => {
        return (
          <>
            <Input
              label={t("form-document-title")}
              {...register("documentName")}
              error={
                errors?.documentName?.message
                  ? t(errors?.documentName?.message)
                  : ""
              }
            />
            {!isEditForm && (
              <div className="col-span-full">
                <FileInput
                  label={t("form-documents")}
                  {...register("document")}
                />
              </div>
            )}
            <div className="col-span-full flex justify-end pb-4">
              <div className="flex gap-2">
                {isEditForm && (
                  <Button
                    type="button"
                    onClick={onDelete}
                    variant="outline"
                    color="danger">
                    {t("form-delete")}
                  </Button>
                )}
                <Button
                  type="submit"
                  color="primary"
                  className={isDirty || !isEditForm ? "mb-2" : "hidden"}>
                  {t("form-save")}
                </Button>
              </div>
            </div>
          </>
        )
      }}
    </Form>
  )
}

export default DocumentItemForm
