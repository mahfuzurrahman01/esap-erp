"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { useState } from "react"

import cn from "@core/utils/class-names"
import { useTranslations } from "next-intl"
import { PiMinusBold, PiPlusBold } from "react-icons/pi"

import FormGroup from "@/components/base/form-group"
import FormGroupContainer from "@/components/base/form-group-container"
import ResumeItemForm from "@/components/container/hrms/employee/resume/resume-item-form"
import { Button } from "@/components/ui"
import { routes } from "@/config/routes"
import { useResumeById } from "@/hooks/hrms/employee/use-resume"
import { ResumeDetails } from "@/types/hrms/employee/employee.types"
import { ResumeFormInputType } from "@/validators/hrms/resume.schema"

// const resumeItems: any[] = []

const ResumeFormsSections = () => {
  const t = useTranslations("form")
  const tHrms = useTranslations("hrms")
  const params = useParams()
  const temporaryEmployeeId = params.employeeId
  const { data: resumeInfo } = useResumeById(Number(temporaryEmployeeId))
  const createResumeDefaultData = (item: any): ResumeFormInputType => {
    return {
      id: item?.id,
      resumeName: item.resumeName,
      startDate: item.startDate ? new Date(item.startDate).toISOString() : "",
      endDate: item.endDate ? new Date(item.endDate).toISOString() : "",
      description: item.description,
      resumeTypeId: item.resumeType.id,
      employeeId: item.employeeId,
    }
  }

  return (
    <div className="flex grow flex-col justify-between @container">
      <FormGroupContainer className="pt-7">
        <FormGroup
          title={
            resumeInfo && resumeInfo?.length > 0
              ? t("form-details")
              : tHrms("text-no-resume-found")
          }
          childrenContainerClassName="gap-8">
          {resumeInfo &&
            resumeInfo?.length > 0 &&
            resumeInfo?.map((item: ResumeDetails) => (
              <ResumeItemForm
                key={item.id}
                isEditForm
                initialData={createResumeDefaultData(item)}
              />
            ))}
          <NewResumeForm />
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

const NewResumeForm = () => {
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
          <ResumeItemForm isEditForm={false} />
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
export default ResumeFormsSections
