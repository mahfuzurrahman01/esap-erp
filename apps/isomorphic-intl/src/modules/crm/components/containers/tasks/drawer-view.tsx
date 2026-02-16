"use client"

import { useEffect, useState } from "react"


import { Form } from "@core/ui/form"
import { useTranslations } from "next-intl"
import { Controller, SubmitHandler } from "react-hook-form"
import DrawerHeader from "@/components/base/drawer-header"
import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import { taskStatusOptions } from "@/data/crm/campaign"
import SkeletonLoader from "@/components/base/skeleton-loader"
import {
  useCreateTask,
  useDeleteTask,
  useTaskById,
  useUpdateTask,
} from "@/modules/crm/hooks/use-task"
import { useUserById } from "@/hooks/auth/use-user"
import { UserList } from "@/types/auth"
import { Task, TaskCreationFormTypes } from "@/modules/crm/types/task"
import { taskFormSchema } from "@/modules/crm/validators/task-schema"
import TaskViewDetails from "./task-view-details"
import TaskDrawerBody from "./task-drawer-body"
import DrawerFormActions from "./drawer-form-actions"
import Select from "./select"

export default function TaskDrawerView({
  id,
  view = false,
  activeStatus,
  campaignId,
  leadId,
  opportunityId,
  quotationId,
  salesOrdersId,
  invoiceId
}: {
  id?: string
  view?: boolean
  activeStatus?: string
  campaignId?: string
  leadId?: string
  opportunityId?: string
  quotationId?: string
  salesOrdersId?: string
  invoiceId?: string
}) {
  const { closeDrawer } = useDrawer()
  const t = useTranslations("crm")
  const deleteTask = useDeleteTask()
  const { data: dataById, isLoading } = useTaskById(id) as {
    data: Task | undefined
    isLoading: boolean
  }

  const [files, setFiles] = useState<File[]>([])
  const { mutateAsync: createTask, isPending: isCreating } = useCreateTask()
  const { mutateAsync: updateTask, isPending: isUpdating } = useUpdateTask()

  useEffect(() => {
    if (dataById?.filePath) {
      setFiles([dataById.filePath])
    }
  }, [dataById])

  const { data } = useUserById(dataById?.assignedTo) as {
    data: { data: UserList } | undefined
    isLoading: boolean
  }
  const assignedTo = data?.data?.firstName

  const handleCloseDrawer = () => {
    closeDrawer()
  }

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-3xl p-4">
        <SkeletonLoader />
      </div>
    )
  }

  if (view) {
    return (
      <TaskViewDetails
        dataById={dataById}
        assignedTo={assignedTo}
        handleCloseDrawer={handleCloseDrawer}
      />
    )
  }

  const onSubmit: SubmitHandler<TaskCreationFormTypes> = async (formData) => {
    const newFormData = {
      Subject: formData.subject,
      TicketId: formData.ticketId,
      AssignedTo: formData.assignedTo,
      StartDate: formData.startDate,
      DueDate: formData.dueDate,
      Priority: formData.priority,
      Description: formData.description,
      Status: formData.status,
      RepeatDate: formData.repeatDate,
      Reminder: formData.reminder,
      CampaignId: formData.campaignId,
      LeadId: formData.leadId,
      OpportunityId: formData.opportunityId,
      SalesOrdersId: formData.salesOrdersId,
      InvoiceId: formData.invoiceId,
      QuotationId: formData.quotationId,
      File: files[0],
    }
    if (id) {
      await updateTask(
        {
          id,
          data: newFormData,
        },
        {
          onSuccess: () => {
            handleCloseDrawer()
          },
        }
      )
    } else {
      await createTask(newFormData, {
        onSuccess: () => {
          handleCloseDrawer()
        },
      })
    }
  }

  const handleDeleteTask = async (id?: string) => {
    if (id == undefined) return
    deleteTask.mutate(id)
  }
  const status = activeStatus || dataById?.status
  const selectedCampaignId = campaignId || dataById?.campaignId
  const selectedLeadId = leadId || dataById?.leadId
  const selectedOpportunityId = opportunityId || dataById?.opportunityId
  const selectedSalesOrdersId = salesOrdersId || dataById?.salesOrdersId
  const selectedQuotationId = quotationId || dataById?.quotationId
  const selectedInvoiceId = invoiceId || dataById?.invoiceId

  return (
    <div className="flex h-full flex-col">
      <Form<TaskCreationFormTypes>
        onSubmit={onSubmit}
        validationSchema={taskFormSchema}
        className="flex grow flex-col justify-between container"
        useFormProps={{
          mode: "onChange",
          defaultValues: {...dataById, status, campaignId:selectedCampaignId, leadId:selectedLeadId, opportunityId:selectedOpportunityId, salesOrdersId:selectedSalesOrdersId, quotationId:selectedQuotationId, invoiceId:selectedInvoiceId}
        }}>
        {({
          register,
          control,
          getValues,
          formState: { errors },
        }) => {
          // console.log('errors', errors)
          return (
            <>
              <DrawerHeader
                onClose={handleCloseDrawer}
                headerClassName="mb-0 py-5 px-10">
                <Controller
                  name="status"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      className="flex rounded-lg bg-gray-200 text-xs"
                      containerClassName="dark:bg-gray-700 rounded-md"
                      placeholder={t("form-select-status")}
                      styles={{
                        control: () => ({
                          fontSize: "14px",
                          fontWeight: "bold",
                          padding: "5px 8px",
                          minHeight: "5px !important",
                          border: "0",
                        }),
                        menuList: (base: any) => ({
                          ...base,
                          maxHeight: taskStatusOptions.length > 4 ? "160px" : undefined,
                          overflow: "auto",
                        }),
                      }}
                      isSearchable={true}
                      options={taskStatusOptions}
                      onChange={(selectedOption: any) =>
                        onChange(selectedOption?.value)
                      }
                      value={
                        taskStatusOptions.find(
                          (option: any) => option.value === value
                        ) || null
                      }
                      error={errors?.status?.message}
                    />
                  )}
                />
              </DrawerHeader>
              <TaskDrawerBody
                register={register}
                control={control}
                errors={errors}
                setFiles={setFiles}
                files={files}
                getValues={getValues}
                setValue={getValues}
              />
              <DrawerFormActions
                handleCloseDrawer={handleCloseDrawer}
                isLoading={isCreating || isUpdating}
                isEditForm={!!id}
              />
            </>
          )
        }}
      </Form>
    </div>
  )
}
