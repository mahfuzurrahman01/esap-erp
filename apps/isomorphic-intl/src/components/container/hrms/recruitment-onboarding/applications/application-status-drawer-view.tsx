"use client"

import { Form } from "@core/ui/form"
import SimpleBar from "@core/ui/simplebar"
import { useTranslations } from "next-intl"
import { Controller } from "react-hook-form"
import { z } from "zod"

import DrawerFormActions from "@/components/base/drawer-form-actions"
import DrawerHeader from "@/components/base/drawer-header"
import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import { Select } from "@/components/ui"
import { useUpdateApplicationStatus } from "@/hooks/hrms/recruitment/use-applications"
import { FormDefaultProps } from "@/types/hrms/common.types"
import { Application } from "@/types/hrms/recruitment/applications-type"

const APPLICATION_STAGES = [
  {
    key: "pending",
    label: "Pending",
    badgeColor: "warning",
    color: "text-[rgb(var(--orange-default))]",
    dotColor: "bg-[rgb(var(--orange-default))]",
  },
  {
    key: "screening",
    label: "Screening",
    badgeColor: "info",
    color: "text-[rgb(var(--blue-default))]",
    dotColor: "bg-[rgb(var(--blue-default))]",
  },
  {
    key: "interview",
    label: "Interview",
    badgeColor: "primary",
    color: "text-[rgb(var(--primary-default))]",
    dotColor: "bg-[rgb(var(--primary-default))]",
  },
  {
    key: "selected",
    label: "Selected",
    badgeColor: "success",
    color: "text-[rgb(var(--green-default))]",
    dotColor: "bg-[rgb(var(--green-default))]",
  },
  {
    key: "rejected",
    label: "Rejected",
    badgeColor: "danger",
    color: "text-[rgb(var(--red-default))]",
    dotColor: "bg-[rgb(var(--red-default))]",
  },
] as const

const statusSchema = z.object({
  status: z.enum(["pending", "screening", "interview", "selected", "rejected"]),
})

type StatusFormInput = z.infer<typeof statusSchema>

type ApplicationStatusFormDrawerViewProps = FormDefaultProps<Application>

const ApplicationStatusFormDrawerView = ({
  isEditForm = false,
  initialData,
}: ApplicationStatusFormDrawerViewProps) => {
  const t = useTranslations("form")
  const { closeDrawer } = useDrawer()
  const { mutate: updateStatus, isPending } = useUpdateApplicationStatus()

  const onSubmit = (data: StatusFormInput) => {
    updateStatus(
      { id: Number(initialData?.id), status: data.status },
      {
        onSuccess: () => {
          closeDrawer()
        },
      }
    )
  }

  return (
    <div className="flex h-full flex-col">
      <DrawerHeader
        heading={t("form-update-status")}
        onClose={closeDrawer}
        headerClassName="mb-0"
      />
      <Form<StatusFormInput>
        validationSchema={statusSchema}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: {
            status: initialData?.status || "pending",
          },
        }}
        className="flex grow flex-col">
        {({ control, formState: { errors } }) => (
          <>
            <SimpleBar className="h-0 grow">
              <div className="flex h-full min-h-[800px] flex-col gap-4 px-5 py-6">
                <Controller
                  name="status"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      label={t("form-status")}
                      placeholder={t("form-select-status")}
                      labelClassName="text-sm font-medium text-gray-900"
                      value={APPLICATION_STAGES.find(
                        (option) => option.key === value
                      )}
                      onChange={(selectedOption: any) =>
                        onChange(selectedOption?.key)
                      }
                      options={APPLICATION_STAGES.map((stage) => ({
                        label: stage.label,
                        key: stage.key,
                        className: stage.color,
                      }))}
                      error={errors?.status?.message}
                    />
                  )}
                />
              </div>
            </SimpleBar>
            <DrawerFormActions
              handleCloseDrawer={closeDrawer}
              isEditForm={isEditForm}
              isLoading={isPending}
            />
          </>
        )}
      </Form>
    </div>
  )
}

export default ApplicationStatusFormDrawerView
