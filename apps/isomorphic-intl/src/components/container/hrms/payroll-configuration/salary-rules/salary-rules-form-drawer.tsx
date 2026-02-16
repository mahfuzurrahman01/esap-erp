"use client"

import { useEffect, useState } from "react"

import { Form } from "@core/ui/form"
import SimpleBar from "@core/ui/simplebar"
import { useTranslations } from "next-intl"
import { Controller } from "react-hook-form"
import { Switch } from "rizzui"

import DrawerFormActions from "@/components/base/drawer-form-actions"
import DrawerHeader from "@/components/base/drawer-header"
import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import { Input, Select, Textarea } from "@/components/ui"
import { useSalaryCategoryList } from "@/hooks/hrms/payroll-configuration/use-salary-category"
import {
  useCreateSalaryRule,
  useUpdateSalaryRule,
} from "@/hooks/hrms/payroll-configuration/use-salary-rules"
import { useSelectOptions } from "@/hooks/use-select-options"
import { SalaryCategory } from "@/types/hrms/payroll-configuration/salary-category.types"
import {
  ComputationType,
  SalaryRule,
} from "@/types/hrms/payroll-configuration/salary-rules.types"
import {
  SalaryRuleFormInput,
  salaryRuleFormSchema,
} from "@/validators/hrms/salary-rules-form-schema"

const computationTypeOptions = [
  { value: "FixedAmount", label: "Fixed Amount" },
  { value: "Formula", label: "Formula" },
  //   { value: "Percentage", label: "Percentage" },
]
const defaultSalaryRuleFormValues: SalaryRule = {
  salaryRuleName: "",
  salaryCategoryId: 0,
  sequence: null,
  computationType: "",
  amount: null,
  formula: null,
  isActive: true,
  quantity: 1,
}
type SalaryRuleFormDrawerViewProps = {
  isEditForm?: boolean
  initialData?: any
} & (
  | { isEditForm: true; initialData: SalaryRuleFormInput }
  | { isEditForm?: false; initialData?: SalaryRuleFormInput }
)

const SalaryRuleFormDrawerView: React.FC<SalaryRuleFormDrawerViewProps> = ({
  isEditForm = false,
  initialData,
}) => {
  const [reset] = useState(initialData || {})
  const { closeDrawer } = useDrawer()
  const t = useTranslations("form")
  const { data: salaryCategoryList, isLoading: isSalaryCategoryLoading } =
    useSalaryCategoryList()

  const {
    mutate: createSalaryRule,
    isPending: isCreatePending,
    isSuccess: isCreateSuccess,
  } = useCreateSalaryRule()
  const {
    mutate: updateSalaryRule,
    isPending: isUpdatePending,
    isSuccess: isUpdateSuccess,
  } = useUpdateSalaryRule()

  const salaryCategoryOptions = useSelectOptions<SalaryCategory>(
    salaryCategoryList?.data,
    "salaryCategoryName"
  )

  const onSubmit = async (data: SalaryRule) => {
    if (isEditForm) {
      updateSalaryRule({ ...data, id: initialData?.id })
    } else {
      createSalaryRule(data)
    }
  }

  useEffect(() => {
    if (isCreateSuccess || isUpdateSuccess) {
      closeDrawer()
    }
  }, [isCreateSuccess, isUpdateSuccess])

  return (
    <div className="flex h-full flex-col">
      <DrawerHeader
        heading={
          isEditForm
            ? t("form-edit-salary-rule")
            : t("form-add-new-salary-rule")
        }
        onClose={closeDrawer}
        headerClassName="mb-0"
      />
      <Form<SalaryRuleFormInput>
        validationSchema={salaryRuleFormSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: initialData || defaultSalaryRuleFormValues,
        }}
        className="flex grow flex-col">
        {({ register, control, watch, formState: { errors } }) => {
          const computationType = watch("computationType")
          //console.log(errors)
          return (
            <>
              <SimpleBar className="h-0 grow">
                <div className="flex h-[100vh] flex-col gap-4 px-5 py-6">
                  <Input
                    label={t("form-name")}
                    placeholder={t("form-enter-name")}
                    {...register("salaryRuleName")}
                    error={
                      errors?.salaryRuleName?.message &&
                      t(errors?.salaryRuleName?.message)
                    }
                  />
                  <Controller
                    name="salaryCategoryId"
                    control={control}
                    render={({ field: { onChange, value } }) => {
                      //console.log(value, salaryCategoryOptions)
                      return (
                        <Select
                          label={t("form-salary-category")}
                          placeholder={t("form-select-salary-category")}
                          options={salaryCategoryOptions}
                          value={
                            salaryCategoryOptions.find(
                              (option) => option.value === value
                            ) || null
                          }
                          onChange={(option: any) => onChange(option?.value)}
                          isLoading={isSalaryCategoryLoading}
                          error={
                            errors?.salaryCategoryId?.message &&
                            t(errors?.salaryCategoryId?.message as string)
                          }
                        />
                      )
                    }}
                  />
                  <Input
                    label={t("form-sequence")}
                    placeholder={t("form-enter-sequence")}
                    {...register("sequence")}
                    error={
                      errors?.sequence?.message && t(errors?.sequence?.message)
                    }
                  />
                  <Controller
                    name="computationType"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Select
                        label={t("form-computation-type")}
                        placeholder={t("form-select-computation-type")}
                        options={computationTypeOptions}
                        value={
                          computationTypeOptions.find(
                            (option) => option.value === value
                          ) || null
                        }
                        onChange={(option: any) =>
                          onChange(option?.value as ComputationType)
                        }
                        error={
                          errors?.computationType?.message &&
                          errors?.computationType?.message
                        }
                      />
                    )}
                  />
                  {computationType === "FixedAmount" && (
                    <Input
                      type="number"
                      label={t("form-amount")}
                      placeholder={t("form-enter-amount")}
                      {...register("amount", { valueAsNumber: true })}
                      error={
                        errors?.amount?.message && t(errors?.amount?.message)
                      }
                    />
                  )}
                  {computationType === "Formula" && (
                    <Input
                      label={t("form-formula")}
                      placeholder={t("form-enter-formula")}
                      {...register("formula")}
                      error={
                        errors?.formula?.message && t(errors?.formula?.message)
                      }
                    />
                  )}
                  <Input
                    type="number"
                    label={t("form-quantity")}
                    placeholder={t("form-enter-quantity")}
                    {...register("quantity", { valueAsNumber: true })}
                    defaultValue={1}
                    className="hidden"
                    error={
                      errors?.quantity?.message && errors?.quantity?.message
                    }
                  />
                  <Textarea
                    label={t("form-description")}
                    placeholder={t("form-enter-description")}
                    {...register("description")}
                    error={
                      errors?.description?.message &&
                      t(errors?.description?.message)
                    }
                  />
                  <Controller
                    name="isActive"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <Switch
                        label={t("form-status")}
                        checked={value}
                        onChange={onChange}
                      />
                    )}
                  />
                </div>
              </SimpleBar>
              <DrawerFormActions
                isLoading={isCreatePending || isUpdatePending}
                isEditForm={isEditForm}
                handleCloseDrawer={closeDrawer}
              />
            </>
          )
        }}
      </Form>
    </div>
  )
}

export default SalaryRuleFormDrawerView
