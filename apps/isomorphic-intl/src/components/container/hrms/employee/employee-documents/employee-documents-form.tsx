"use client"

import Link from "next/link"
import { useState } from "react"

import cn from "@core/utils/class-names"
import { useTranslations } from "next-intl"
import { PiMinusBold, PiPlusBold } from "react-icons/pi"

import FormGroup from "@/components/base/form-group"
import FormGroupContainer from "@/components/base/form-group-container"
import DocumentItemForm from "@/components/container/hrms/employee/employee-documents/document-item-form"
import { Button } from "@/components/ui"
import { routes } from "@/config/routes"

const documentItems: any[] = []

const EmployeeDocumentsForm = () => {
  const t = useTranslations("form")
  const tHrms = useTranslations("hrms")

  const hasDocuments = false

  return (
    <div className="flex grow flex-col justify-between @container">
      <FormGroupContainer className="px-0">
        <FormGroup
          className="px-5 pt-7"
          title={
            hasDocuments
              ? t("form-documents")
              : tHrms("text-no-documents-found")
          }
          childrenContainerClassName="gap-8">
          {documentItems.map((item) => (
            <DocumentItemForm key={item.id} isEditForm initialData={item} />
          ))}
          <NewDocumentForm />
        </FormGroup>
      </FormGroupContainer>

      <div className="sticky bottom-0 box-border flex w-auto justify-end gap-2 rounded-b-2xl border-t border-dashed border-gray-500/20 bg-gray-0 px-5 py-6 dark:bg-gray-800">
        <div className="flex gap-2">
          <Link href={routes.hr.employees}>
            <Button type="button" className="h-9 w-auto" variant="outline">
              {t("form-back-to-list")}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

const NewDocumentForm = () => {
  const t = useTranslations("form")
  const [isFormVisible, setFormVisible] = useState(false)

  const handleAddClick = () => {
    setFormVisible(true)
  }

  const handleRemoveClick = () => {
    // Logic to remove the form (e.g., API call)
    setFormVisible(false)
  }

  return (
    <>
      {isFormVisible ? (
        <>
          <DocumentItemForm />
          <div className="">
            <Button
              type="button"
              color="danger"
              variant="outline"
              className={cn("gap-2 font-bold")}
              onClick={handleRemoveClick}>
              <PiMinusBold /> {t("form-remove")}
            </Button>
          </div>
        </>
      ) : (
        <div className="">
          <Button
            type="button"
            color="primary"
            variant="outline"
            className={cn("gap-2 font-bold")}
            onClick={handleAddClick}>
            <PiPlusBold /> {t("form-add")}
          </Button>
        </div>
      )}
    </>
  )
}
export default EmployeeDocumentsForm
