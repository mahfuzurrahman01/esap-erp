"use client"

import { useState } from "react"

import { Form } from "@core/ui/form"
import SimpleBar from "@core/ui/simplebar"
import { useTranslations } from "next-intl"
import { Controller, SubmitHandler } from "react-hook-form"
import toast from "react-hot-toast"
import { Select, Text } from "rizzui"

import DrawerFormActions from "@/components/base/drawer-form-actions"
import DrawerHeader from "@/components/base/drawer-header"
import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import PlanActivityFieldArray from "@/components/container/hrms/employee-setting-items/plans/plan-activity-fields-array"
import { Input } from "@/components/ui"
import {
  PlanFormInput,
  planFormSchema,
} from "@/validators/hrms/activity-plan.schema"

type PlanFormDrawerViewProps = {
  isEditForm?: boolean
  initialData?: PlanFormInput
} & (
  | { isEditForm: true; initialData: PlanFormInput }
  | { isEditForm?: false; initialData?: PlanFormInput }
)

const defaultData = {
  planName: "",
  departmentId: null,
  activities: [],
}

const departmentOptions = [
  { value: 1, label: "HR Department" },
  { value: 2, label: "Software Department" },
  { value: 3, label: "Marketing Department" },
]

const PlanFormDrawerView = ({
  isEditForm = false,
  initialData = defaultData,
}: PlanFormDrawerViewProps) => {
  const { closeDrawer } = useDrawer()
  const [reset, setReset] = useState(initialData || {})
  const [isLoading, setLoading] = useState(false)
  const t = useTranslations("form")

  const handleCloseDrawer = () => {
    closeDrawer()
  }

  const onSubmit: SubmitHandler<PlanFormInput> = () => {
    toast.success(
      <Text as="b" className="font-semibold">
        {t(isEditForm ? "form-plan-updated" : "form-plan-added")}
      </Text>
    )
    setLoading(true)
    handleCloseDrawer()
    setTimeout(() => {
      setLoading(false)
      setReset({
        planName: "",
        activities: [],
      })
    }, 600)
  }

  return (
    <div className="flex h-full flex-col">
      <DrawerHeader
        heading={isEditForm ? t("form-edit-plan") : t("form-add-new-plan")}
        onClose={handleCloseDrawer}
        headerClassName="mb-0"
      />
      <Form<PlanFormInput>
        validationSchema={planFormSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: initialData,
        }}
        className="flex grow flex-col">
        {({ register, control, formState: { errors } }) => (
          <>
            <SimpleBar className="h-0 grow">
              <PlanForm register={register} control={control} errors={errors} />
            </SimpleBar>
            <DrawerFormActions
              handleCloseDrawer={handleCloseDrawer}
              isEditForm={isEditForm}
              isLoading={isLoading}
            />
          </>
        )}
      </Form>
    </div>
  )
}

export const PlanForm = ({ register, control, errors }: any) => {
  const t = useTranslations("form")

  return (
    <div className="flex flex-col gap-4 px-5 py-6">
      <Input
        type="text"
        label={t("form-name")}
        placeholder={t("form-plan-name")}
        {...register("planName")}
        error={errors?.planName?.message ? t(errors?.planName?.message) : ""}
      />
      <Controller
        control={control}
        name="departmentId"
        render={({ field: { onChange, value } }) => (
          <Select
            label={t("form-department")}
            placeholder={t("form-select-department")}
            options={departmentOptions}
            onChange={(selectedOption: { label: string; value: number }) => {
              onChange(selectedOption?.value)
            }}
            value={
              departmentOptions.find((option) => option.value === value) || null
            }
          />
        )}
      />
      <PlanActivityFieldArray
        control={control}
        register={register}
        errors={errors}
      />
    </div>
  )
}

export default PlanFormDrawerView
