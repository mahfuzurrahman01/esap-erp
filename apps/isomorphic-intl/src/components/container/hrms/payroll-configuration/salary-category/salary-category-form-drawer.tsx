"use client"

import { useEffect, useState } from "react"

import { Form } from "@core/ui/form"
import SimpleBar from "@core/ui/simplebar"
import { useTranslations } from "next-intl"
import { Controller } from "react-hook-form"

import DrawerFormActions from "@/components/base/drawer-form-actions"
import DrawerHeader from "@/components/base/drawer-header"
import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import { Input, Select } from "@/components/ui"
import {
  useCreateSalaryCategory,
  useUpdateSalaryCategory,
} from "@/hooks/hrms/payroll-configuration/use-salary-category"
import { SalaryCategory } from "@/types/hrms/payroll-configuration/salary-category.types"
import {
  SalaryCategoryFormInput,
  salaryCategoryFormSchema,
} from "@/validators/hrms/salary-category-form.schema"

type SalaryCategoryFormDrawerViewProps = {
  isEditForm?: boolean
  initialData?: any
} & (
  | { isEditForm: true; initialData: SalaryCategoryFormInput }
  | { isEditForm?: false; initialData?: SalaryCategoryFormInput }
)

const SalaryCategoryFormDrawerView: React.FC<
  SalaryCategoryFormDrawerViewProps
> = ({ isEditForm = false, initialData }) => {
  const [reset] = useState(initialData || {})
  const { closeDrawer } = useDrawer()
  const handleCloseDrawer = () => {
    closeDrawer()
  }
  const t = useTranslations("form")
  const {
    mutate: createSalaryCategory,
    isPending: isCreatePending,
    isSuccess: isCreateSuccess,
  } = useCreateSalaryCategory()
  const {
    mutate: updateSalaryCategory,
    isPending: isUpdatePending,
    isSuccess: isUpdateSuccess,
  } = useUpdateSalaryCategory()

  const onSubmit = async (data: SalaryCategory) => {
    if (isEditForm) {
      updateSalaryCategory({ ...data, id: initialData?.id })
    } else {
      createSalaryCategory(data)
    }
  }

  useEffect(() => {
    if (isCreateSuccess || isUpdateSuccess) {
      handleCloseDrawer()
    }
  }, [isCreateSuccess, isUpdateSuccess])

  const transactionTypeOptions = [
    { label: "Debit", value: "Debit" },
    { label: "Credit", value: "Credit" },
  ]

  return (
    <div className="flex h-full flex-col">
      <DrawerHeader
        heading={
          isEditForm
            ? t("form-edit-salary-category")
            : t("form-add-new-salary-category")
        }
        onClose={handleCloseDrawer}
        headerClassName="mb-0"
      />
      <Form<SalaryCategoryFormInput>
        validationSchema={salaryCategoryFormSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: initialData,
        }}
        className="flex grow flex-col">
        {({ register, control, formState: { errors } }) => (
          <>
            <SimpleBar className="h-0 grow">
              <div className="flex h-[100vh] flex-col gap-4 px-5 py-6">
                <Input
                  label={t("form-name")}
                  placeholder={t("form-enter-name")}
                  {...register("salaryCategoryName")}
                  error={
                    errors?.salaryCategoryName?.message &&
                    t(errors?.salaryCategoryName?.message)
                  }
                />
                <Input
                  label={t("form-code")}
                  placeholder={t("form-enter-code")}
                  {...register("code")}
                  error={errors?.code?.message && t(errors?.code?.message)}
                />
                <Controller
                  name="transactionType"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      label={t("form-transaction-type")}
                      placeholder={t("form-select-transaction-type")}
                      options={transactionTypeOptions}
                      value={transactionTypeOptions.find(
                        (option) => option.value === value
                      )}
                      onChange={(option: any) => onChange(option?.value)}
                      error={
                        errors?.transactionType?.message
                          ? t(errors?.transactionType?.message)
                          : ""
                      }
                    />
                  )}
                />
                <Input
                  label={t("form-description")}
                  placeholder={t("form-enter-description")}
                  {...register("description")}
                  error={
                    errors?.description?.message &&
                    t(errors?.description?.message)
                  }
                />
              </div>
            </SimpleBar>
            <DrawerFormActions
              isLoading={isCreatePending || isUpdatePending}
              isEditForm={isEditForm}
              handleCloseDrawer={handleCloseDrawer}
            />
          </>
        )}
      </Form>
    </div>
  )
}

export default SalaryCategoryFormDrawerView
