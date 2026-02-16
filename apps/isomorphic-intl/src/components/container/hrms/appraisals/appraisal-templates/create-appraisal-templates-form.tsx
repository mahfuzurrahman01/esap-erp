"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import { Form } from "@core/ui/form"
import { useTranslations } from "next-intl"
import { PiPlusBold, PiTrashBold } from "react-icons/pi"
import { ActionIcon, Text, Title } from "rizzui"

import FormGroupContainer from "@/components/base/form-group-container"
import TrashIcon from "@/components/icons/trash"
import { Button, Input, Select, Textarea } from "@/components/ui"
import { Skeleton } from "@/components/ui/skeleton"
import {
  useAppraisalTemplateById,
  useCreateAppraisalTemplate,
  useUpdateAppraisalTemplate,
} from "@/hooks/hrms/appraisal/use-appraisal-templates"
import {
  AppraisalTemplate,
  AppraisalTemplateForm,
  FeedbackQuestion,
} from "@/types/hrms/appraisal/appraisal-templates.types"
import {
  AppraisalTemplateFormInput,
  appraisalTemplateSchema,
} from "@/validators/hrms/appraisal-templates.schema"

import AppraisalTemplateFormStickyActions from "./appraisal-template-form-sticky-options"

const answerTypeOptions = [
  { label: "Text Input", value: "text" },
  { label: "Rating", value: "rating" },
]

const defaultEmployeeQuestions: FeedbackQuestion[] = [
  {
    question: "What are your best achievement(s) since last appraisal?",
    answerType: "text",
    answer: null,
  },
  {
    question:
      "What has been the most challenging aspect of your work this past year and why?",
    answerType: "text",
    answer: null,
  },
  {
    question: "What would you need to improve your work?",
    answerType: "text",
    answer: null,
  },
  {
    question: "Which parts of your job do you most / least enjoy?",
    answerType: "text",
    answer: null,
  },
  {
    question: "How do you feel about the companies Culture?",
    answerType: "rating",
    answer: null,
  },
  {
    question: "How do you feel about the companies internal communication?",
    answerType: "rating",
    answer: null,
  },
]

const defaultManagerQuestions: FeedbackQuestion[] = [
  {
    question:
      "Give one positive achievement that convinced you of the employee's value.",
    answerType: "text",
    answer: null,
  },
  {
    question: "Rate about this employee's: Stress Resistance",
    answerType: "rating",
    answer: null,
  },
  {
    question: "Rate about this employee's: Time management",
    answerType: "rating",
    answer: null,
  },
  {
    question: "Rate about this employee's: Team work",
    answerType: "rating",
    answer: null,
  },
]

const defaultValues: AppraisalTemplateForm = {
  templateName: "",
  employeeFeedback: defaultEmployeeQuestions,
  managerFeedback: defaultManagerQuestions,
  description: "",
  isActive: true,
}

const renderSkeleton = () => (
  <FormGroupContainer>
    <div className="grid grid-cols-10 gap-7">
      <div className="col-span-4">
        <Skeleton className="h-7 w-48" />
      </div>
      <div className="col-span-6 flex flex-col gap-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    </div>

    <div className="mt-6">
      <div className="mb-6 flex gap-6">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-8 w-32" />
      </div>

      <div className="grid grid-cols-10 gap-7">
        <div className="col-span-4">
          <Skeleton className="h-7 w-32" />
        </div>
        <div className="col-span-6 space-y-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="w-48 space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
              <Skeleton className="mt-8 h-8 w-8" />
            </div>
          ))}
          <Skeleton className="mt-4 h-10 w-40" />
        </div>
      </div>
    </div>
  </FormGroupContainer>
)

export default function CreateAppraisalTemplateForm() {
  const t = useTranslations("form")
  const router = useRouter()
  const { templateId } = useParams()
  const [isEmployeeFeedback, setIsEmployeeFeedback] = useState(true)
  const [employeeQuestions, setEmployeeQuestions] = useState<
    FeedbackQuestion[]
  >(defaultEmployeeQuestions)
  const [managerQuestions, setManagerQuestions] = useState<FeedbackQuestion[]>(
    defaultManagerQuestions
  )

  const { mutate: createTemplate, isPending: isCreatePending } =
    useCreateAppraisalTemplate()
  const { mutate: updateTemplate, isPending: isUpdatePending } =
    useUpdateAppraisalTemplate()
  const { data: templateData, isLoading } = useAppraisalTemplateById(
    Number(templateId)
  )

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

  const handleAddQuestion = (isEmployee: boolean) => {
    if (isEmployee) {
      setEmployeeQuestions([
        ...employeeQuestions,
        { question: "", answerType: "text", answer: null },
      ])
    } else {
      setManagerQuestions([
        ...managerQuestions,
        { question: "", answerType: "text", answer: null },
      ])
    }
  }

  const handleRemoveQuestion = (index: number, isEmployee: boolean) => {
    if (isEmployee) {
      const newQuestions = [...employeeQuestions]
      newQuestions.splice(index, 1)
      setEmployeeQuestions(newQuestions)
    } else {
      const newQuestions = [...managerQuestions]
      newQuestions.splice(index, 1)
      setManagerQuestions(newQuestions)
    }
  }

  const onSubmit = (data: AppraisalTemplateFormInput) => {
    const formData: AppraisalTemplate = {
      templateName: data.templateName,
      employeeFeedback: JSON.stringify(employeeQuestions),
      managerFeedback: JSON.stringify(managerQuestions),
      description: data.description || "",
      isActive: true,
    }

    if (templateId) {
      updateTemplate({ ...formData, id: Number(templateId) })
    } else {
      createTemplate(formData)
    }
  }

  if (templateId && isLoading) {
    return (
      <div className="flex h-full min-h-full grow @container">
        {renderSkeleton()}
      </div>
    )
  }

  return (
    <Form<AppraisalTemplateFormInput>
      validationSchema={appraisalTemplateSchema}
      onSubmit={onSubmit}
      className="flex h-full min-h-full grow @container"
      useFormProps={{
        defaultValues: templateData
          ? {
              ...templateData,
              employeeFeedback: JSON.parse(
                templateData.employeeFeedback
              ) as FeedbackQuestion[],
              managerFeedback: JSON.parse(
                templateData.managerFeedback
              ) as FeedbackQuestion[],
            }
          : defaultValues,
        mode: "onChange",
      }}>
      {({ register, formState: { errors } }) => {
        //console.log(errors)
        return (
          <>
            <FormGroupContainer>
              <div className="grid grid-cols-10 gap-7">
                <div className="col-span-4">
                  <Title
                    as="h6"
                    className="text-[18px] font-bold leading-normal text-gray-1000">
                    {t("form-entry-information")}
                  </Title>
                </div>
                <div className="col-span-6 flex flex-col gap-4">
                  <Input
                    label={t("form-template-name")}
                    placeholder={t("form-enter-template-name")}
                    {...register("templateName")}
                    error={
                      errors.templateName?.message
                        ? t(errors.templateName?.message)
                        : ""
                    }
                  />
                  <Textarea
                    label={t("form-description")}
                    placeholder={t("form-enter-description")}
                    {...register("description")}
                    error={
                      errors.description?.message
                        ? t(errors.description?.message)
                        : ""
                    }
                  />
                </div>
              </div>

              <div>
                <div className="mb-6 mt-6 flex gap-6">
                  <Text
                    className={`${isEmployeeFeedback ? "border-primary text-primary" : "border-transparent text-gray-1000 dark:text-white"} cursor-pointer border-b-2 pb-2 leading-normal`}
                    onClick={() => setIsEmployeeFeedback(true)}>
                    {t("form-employee-feedback")}
                  </Text>
                  <Text
                    className={`${!isEmployeeFeedback ? "border-primary text-primary" : "border-transparent text-gray-1000 dark:text-white"} cursor-pointer border-b-2 pb-2 leading-normal`}
                    onClick={() => setIsEmployeeFeedback(false)}>
                    {t("form-manager-feedback")}
                  </Text>
                </div>
                <div className="grid grid-cols-10 gap-7">
                  <div className="col-span-4">
                    <Title
                      as="h6"
                      className="text-[18px] font-bold leading-normal text-gray-1000">
                      {t("form-questions")}
                    </Title>
                  </div>
                  <div className="col-span-6">
                    {isEmployeeFeedback ? (
                      <>
                        {employeeQuestions.map((_, index) => (
                          <div
                            key={index}
                            className="mb-4 flex items-start gap-4">
                            <div className="flex-1">
                              <Input
                                label={`${t("form-question")} ${index + 1}`}
                                placeholder={t("form-enter-question")}
                                value={employeeQuestions[index].question}
                                onChange={(e) => {
                                  const newQuestions = [...employeeQuestions]
                                  newQuestions[index].question = e.target.value
                                  setEmployeeQuestions(newQuestions)
                                }}
                              />
                            </div>
                            <div className="w-48">
                              <Select
                                label={t("form-answer-type")}
                                options={answerTypeOptions}
                                value={answerTypeOptions.find(
                                  (opt) =>
                                    opt.value ===
                                    employeeQuestions[index].answerType
                                )}
                                onChange={(option: any) => {
                                  const newQuestions = [...employeeQuestions]
                                  newQuestions[index].answerType = option.value
                                  setEmployeeQuestions(newQuestions)
                                }}
                              />
                            </div>
                            {employeeQuestions.length > 1 && (
                              <ActionIcon
                                size="sm"
                                variant="flat"
                                color="danger"
                                className="mt-8"
                                onClick={() =>
                                  handleRemoveQuestion(index, true)
                                }>
                                <TrashIcon className="h-4 w-4" />
                              </ActionIcon>
                            )}
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          className="mt-4"
                          onClick={() => handleAddQuestion(true)}>
                          <PiPlusBold className="me-2 h-4 w-4" />
                          {t("form-add-question")}
                        </Button>
                      </>
                    ) : (
                      <>
                        {managerQuestions.map((_, index) => (
                          <div
                            key={index}
                            className="mb-4 flex items-start gap-4">
                            <div className="flex-1">
                              <Input
                                label={`${t("form-question")} ${index + 1}`}
                                placeholder={t("form-enter-question")}
                                value={managerQuestions[index].question}
                                onChange={(e) => {
                                  const newQuestions = [...managerQuestions]
                                  newQuestions[index].question = e.target.value
                                  setManagerQuestions(newQuestions)
                                }}
                              />
                            </div>
                            <div className="w-48">
                              <Select
                                label={t("form-answer-type")}
                                options={answerTypeOptions}
                                value={answerTypeOptions.find(
                                  (opt) =>
                                    opt.value ===
                                    managerQuestions[index].answerType
                                )}
                                onChange={(option: any) => {
                                  const newQuestions = [...managerQuestions]
                                  newQuestions[index].answerType = option.value
                                  setManagerQuestions(newQuestions)
                                }}
                              />
                            </div>
                            {managerQuestions.length > 1 && (
                              <ActionIcon
                                size="sm"
                                variant="flat"
                                color="danger"
                                className="mt-8"
                                onClick={() =>
                                  handleRemoveQuestion(index, false)
                                }>
                                <PiTrashBold className="h-4 w-4" />
                              </ActionIcon>
                            )}
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          className="mt-4"
                          onClick={() => handleAddQuestion(false)}>
                          <PiPlusBold className="me-2 h-4 w-4" />
                          {t("form-add-question")}
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <AppraisalTemplateFormStickyActions
                isEditForm={!!templateId}
                isLoading={isCreatePending || isUpdatePending}
              />
            </FormGroupContainer>
          </>
        )
      }}
    </Form>
  )
}
