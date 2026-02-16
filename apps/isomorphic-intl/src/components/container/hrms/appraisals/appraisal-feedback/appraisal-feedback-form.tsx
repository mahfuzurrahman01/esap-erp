"use client"

import React, { useEffect, useState } from "react"

import { useTranslations } from "next-intl"
import { Controller } from "react-hook-form"
import { PiStar, PiStarFill } from "react-icons/pi"
import { ActionIcon, Text, Title } from "rizzui"

import FormGroup from "@/components/base/form-group"
import FormGroupContainer from "@/components/base/form-group-container"
import { Input, Select, Textarea } from "@/components/ui"
import {
  useAppraisalList,
  useUpdateAppraisal,
} from "@/hooks/hrms/appraisal/use-appraisal"
import { useAppraisalTemplateById } from "@/hooks/hrms/appraisal/use-appraisal-templates"
import { useAppraisalTemplateList } from "@/hooks/hrms/appraisal/use-appraisal-templates"
import { useUpdateAppraisalTemplate } from "@/hooks/hrms/appraisal/use-appraisal-templates"
import { useSelectOptions } from "@/hooks/use-select-options"
import {
  AppraisalTemplate,
  FeedbackQuestion,
} from "@/types/hrms/appraisal/appraisal-templates.types"
import { Appraisal } from "@/types/hrms/appraisal/appraisals.types"
import { EmployeeShortInfo } from "@/types/hrms/common.types"

import TemplateUpdateStickyActions from "../appraisal-list/template-update-sticky-action"

export default function AppraisalFeedbackForm() {
  const t = useTranslations("form")
  const [isEmployeeFeedback, setIsEmployeeFeedback] = useState(true)
  const [selectedAppraisalId, setSelectedAppraisalId] = useState<number>()
  const [selectedTemplateId, setSelectedTemplateId] = useState<number>()
  const [selectedAppraisal, setSelectedAppraisal] = useState<Appraisal>()
  const [employeeQuestions, setEmployeeQuestions] = useState<
    FeedbackQuestion[]
  >([])
  const [managerQuestions, setManagerQuestions] = useState<FeedbackQuestion[]>(
    []
  )

  const { data: appraisalList } = useAppraisalList()
  const { data: templateList } = useAppraisalTemplateList()
  const { data: templateData } = useAppraisalTemplateById(
    selectedTemplateId as number
  )
  const { mutate: updateTemplate, isPending: isTemplateUpdatePending } =
    useUpdateAppraisalTemplate()
  const { mutate: updateAppraisal, isPending: isAppraisalUpdatePending } =
    useUpdateAppraisal()

  const appraisalOptions = useSelectOptions<Appraisal>(
    appraisalList?.data,
    "appraisalName"
  )

  const templateOptions = useSelectOptions<AppraisalTemplate>(
    templateList?.data,
    "templateName"
  )

  // When appraisal is selected, set the template ID
  const handleAppraisalSelect = (appraisalId: number) => {
    setSelectedAppraisalId(appraisalId)
    const selectedAppraisal = appraisalList?.data?.find(
      (appraisal) => appraisal.id === appraisalId
    )
    setSelectedAppraisal(selectedAppraisal)
    if (selectedAppraisal?.templateId) {
      setSelectedTemplateId(selectedAppraisal.templateId)
    }
  }

  useEffect(() => {
    if (templateData) {
      try {
        const employeeFeedback = JSON.parse(templateData.employeeFeedback)
        const managerFeedback = JSON.parse(templateData.managerFeedback)
        setEmployeeQuestions(employeeFeedback as FeedbackQuestion[])
        setManagerQuestions(managerFeedback as FeedbackQuestion[])
      } catch (error) {
        console.error("Error parsing feedback data:", error)
      }
    }
  }, [templateData])

  const handleAnswerChange = (
    index: number,
    value: string | number,
    isEmployee: boolean
  ) => {
    if (isEmployee) {
      const newQuestions = [...employeeQuestions]
      newQuestions[index].answer = value.toString()
      setEmployeeQuestions(newQuestions)
    } else {
      const newQuestions = [...managerQuestions]
      newQuestions[index].answer = value.toString()
      setManagerQuestions(newQuestions)
    }
  }

  const RatingInput = ({
    value,
    onChange,
  }: {
    value: string | null
    onChange: (value: string) => void
  }) => {
    const rating = value ? parseInt(value) : 0
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <ActionIcon
            key={star}
            variant="text"
            onClick={() => onChange(star.toString())}
            className="text-orange-500">
            {star <= rating ? (
              <PiStarFill className="h-5 w-5" />
            ) : (
              <PiStar className="h-5 w-5" />
            )}
          </ActionIcon>
        ))}
      </div>
    )
  }

  const handleTemplateUpdate = () => {
    if (templateData && selectedTemplateId) {
      const hasAllAnswers = [...employeeQuestions, ...managerQuestions].every(
        (q) => q.answer !== null && q.answer !== ""
      )

      updateTemplate({
        id: selectedTemplateId,
        templateName: templateData.templateName,
        employeeFeedback: JSON.stringify(employeeQuestions),
        managerFeedback: JSON.stringify(managerQuestions),
        isActive: hasAllAnswers ? false : true,
        description: templateData.description,
      })

      // If all questions are answered, update appraisal status
      if (hasAllAnswers && selectedAppraisalId) {
        updateAppraisal({
          status: "Submitted",
          id: selectedAppraisalId,
          appraisalName: selectedAppraisal?.appraisalName as string,
          startDate: selectedAppraisal?.startDate as string,
          endDate: selectedAppraisal?.endDate as string,
          templateId: selectedTemplateId,
          employeeId: Number(selectedAppraisal?.employee?.id),
          managerId: Number(selectedAppraisal?.manager?.id),
          manager: selectedAppraisal?.manager as EmployeeShortInfo,
          description: selectedAppraisal?.description as string,
        })
      }
    }
  }

  return (
    <div className="card-shadow mt-8 flex flex-col border-none bg-gray-0 pt-6 dark:bg-gray-800">
      <FormGroupContainer>
        {/* Details Section */}
        <div className="grid grid-cols-10 gap-7">
          <div className="col-span-4">
            <Title
              as="h4"
              className="text-base font-medium md:text-xl md:font-semibold">
              {t("form-details")}
            </Title>
          </div>
          <div className="col-span-6 flex flex-col gap-4">
            <Select
              label={t("form-appraisal")}
              placeholder={t("form-select-appraisal")}
              options={appraisalOptions}
              onChange={(option: any) =>
                handleAppraisalSelect(Number(option?.value))
              }
            />
            <Select
              label={t("form-template")}
              placeholder={t("form-select-template")}
              options={templateOptions}
              value={templateOptions.find(
                (opt) => opt.value === selectedTemplateId
              )}
              isDisabled={selectedAppraisalId ? true : false}
            />
          </div>
        </div>

        {selectedTemplateId && (
          <>
            {/* Feedback Tabs */}
            <div className="mt-6 pt-5">
              <div className="mb-6 flex gap-6">
                <Text
                  className={`${
                    isEmployeeFeedback
                      ? "border-primary text-primary dark:text-primary"
                      : "border-transparent text-gray-1000 dark:text-white"
                  } cursor-pointer border-b-2 pb-2 leading-normal`}
                  onClick={() => setIsEmployeeFeedback(true)}>
                  {t("form-employee-feedback")}
                </Text>
                <Text
                  className={`${
                    !isEmployeeFeedback
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-1000 dark:text-white"
                  } cursor-pointer border-b-2 pb-2 leading-normal`}
                  onClick={() => setIsEmployeeFeedback(false)}>
                  {t("form-manager-feedback")}
                </Text>
              </div>

              {/* Questions Section */}
              <div className="grid grid-cols-10 gap-7">
                <div className="col-span-4">
                  <Title
                    as="h4"
                    className="text-base font-medium md:text-xl md:font-semibold">
                    {t("form-feedback")}
                  </Title>
                </div>
                <div className="col-span-6">
                  {isEmployeeFeedback
                    ? employeeQuestions.map((question, index) => (
                        <div key={index} className="mb-4">
                          <Text className="mb-2 font-medium">
                            {question.question}
                          </Text>
                          {question.answerType === "text" ? (
                            <Textarea
                              placeholder={t("form-enter-answer")}
                              value={question.answer || ""}
                              onChange={(e) =>
                                handleAnswerChange(index, e.target.value, true)
                              }
                            />
                          ) : (
                            <RatingInput
                              value={question.answer}
                              onChange={(value) =>
                                handleAnswerChange(index, value, true)
                              }
                            />
                          )}
                        </div>
                      ))
                    : managerQuestions.map((question, index) => (
                        <div key={index} className="mb-4">
                          <Text className="mb-2 font-medium">
                            {question.question}
                          </Text>
                          {question.answerType === "text" ? (
                            <Textarea
                              placeholder={t("form-enter-answer")}
                              value={question.answer || ""}
                              onChange={(e) =>
                                handleAnswerChange(index, e.target.value, false)
                              }
                            />
                          ) : (
                            <RatingInput
                              value={question.answer}
                              onChange={(value) =>
                                handleAnswerChange(index, value, false)
                              }
                            />
                          )}
                        </div>
                      ))}
                </div>
              </div>
            </div>
          </>
        )}

        {selectedTemplateId && (
          <TemplateUpdateStickyActions
            onUpdate={handleTemplateUpdate}
            isEmployeeFeedback={isEmployeeFeedback}
            isLoading={isAppraisalUpdatePending || isTemplateUpdatePending}
          />
        )}
      </FormGroupContainer>
    </div>
  )
}
