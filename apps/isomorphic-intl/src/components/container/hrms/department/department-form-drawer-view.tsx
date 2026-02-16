"use client"

import { Form } from "@core/ui/form"
import SimpleBar from "@core/ui/simplebar"
import { useTranslations } from "next-intl"
import { Controller } from "react-hook-form"
import { PiCheck } from "react-icons/pi"
import { cn } from "rizzui"

import DrawerFormActions from "@/components/base/drawer-form-actions"
import DrawerHeader from "@/components/base/drawer-header"
import { useDepartmentForm } from "@/components/container/hrms/department/use-department-form"
import { Input, Select } from "@/components/ui"
import { DEFAULT_PAGE_SIZE_200 } from "@/config/constants"
import {
  useEmployeeList,
  useEmployeeOptions,
} from "@/hooks/hrms/employee/use-employee"
import { useSelectOptions } from "@/hooks/use-select-options"
import { EmployeeShortInfo } from "@/types/hrms/common.types"
import {
  DepartmentFormInput,
  departmentFormSchema,
} from "@/validators/hrms/department-form.schema"

const colors = [
  { label: "None", value: "" },
  { label: "Red", value: "#B71D18" },
  { label: "Blue", value: "#00B8D9" },
  { label: "Green", value: "#00A76F" },
  { label: "Orange", value: "#FFAB00" },
  { label: "Purple", value: "#003768" },
  { label: "Yellow", value: "#FFAC82" },
]

type DepartmentFormDrawerViewProps = {
  isEditForm?: boolean
  initialData?: any
} & (
  | { isEditForm: true; initialData: DepartmentFormInput }
  | { isEditForm?: false; initialData?: DepartmentFormInput }
)

const DepartmentFormDrawerView: React.FC<DepartmentFormDrawerViewProps> = ({
  isEditForm = false,
  initialData,
}) => {
  const t = useTranslations("form")

  const { onSubmit, isLoading, handleCloseDrawer } = useDepartmentForm(
    isEditForm,
    initialData?.id
  )

  return (
    <div className="flex h-full flex-col">
      <DrawerHeader
        heading={
          isEditForm ? t("form-edit-department") : t("form-add-new-department")
        }
        onClose={handleCloseDrawer}
        headerClassName="mb-0"
      />
      <Form<DepartmentFormInput>
        validationSchema={departmentFormSchema}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: initialData,
        }}
        className="flex grow flex-col">
        {({ register, control, formState: { errors } }) => {
          console.log(errors)
          return (
            <>
              <SimpleBar className="h-0 grow">
                <DepartmentForm
                  control={control}
                  register={register}
                  errors={errors}
                />
              </SimpleBar>
              <DrawerFormActions
                handleCloseDrawer={handleCloseDrawer}
                isLoading={isLoading}
                isEditForm={isEditForm}
              />
            </>
          )
        }}
      </Form>
    </div>
  )
}

export function DepartmentForm({ register, control, errors }: any) {
  const t = useTranslations("form")

  const { employeeOptions, isLoading: isEmployeeLoading } = useEmployeeOptions()

  return (
    <div className="flex h-[100vh] flex-col gap-4 px-5 py-6">
      <Input
        type="text"
        label={t("form-department-name")}
        placeholder={t("form-enter-department-name")}
        labelClassName="text-sm font-medium text-gray-900"
        {...register("departmentName")}
        error={
          errors?.departmentName?.message
            ? t(errors?.departmentName?.message)
            : ""
        }
      />

      <Controller
        name="managerId"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            label={t("form-manager")}
            placeholder={t("form-manager")}
            options={employeeOptions}
            onChange={(selectedOption: any) =>
              onChange(Number(selectedOption?.value))
            }
            value={
              employeeOptions.find((option) => option.value === value) || null // Set to null if no match found
            }
            isLoading={isEmployeeLoading}
          />
        )}
      />

      <Controller
        control={control}
        name="color"
        render={({ field: { value, onChange } }) => (
          <div>
            <label className="text-sm font-medium text-gray-900">
              {t("form-color")}
            </label>
            <div className="mt-2 flex flex-wrap gap-3">
              {colors.map((color) => (
                <div
                  key={color.value}
                  className={cn(
                    "relative h-6 w-6 cursor-pointer rounded-full transition-all duration-200",
                    {
                      "scale-125": value === color.value,
                      "border-2 border-gray-300": color.value === "",
                    }
                  )}
                  style={{
                    backgroundColor: color.value !== "" ? color.value : "#fff",
                    boxShadow:
                      value === color.value
                        ? `4px 4px 8px ${color.value}60`
                        : "none",
                  }}
                  onClick={() => onChange(color.value)}>
                  {color.value === "" && (
                    <div className="absolute inset-0 rounded-full">
                      <div className="absolute left-0 top-1/2 h-0.5 w-full -rotate-45 transform bg-gray-400"></div>
                    </div>
                  )}
                  {value === color.value && (
                    <PiCheck className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 transform text-white" />
                  )}
                </div>
              ))}
            </div>
            {errors?.color?.message && (
              <p className="mt-1 text-sm text-red-500">
                {errors.color.message as string}
              </p>
            )}
          </div>
        )}
      />
    </div>
  )
}

export default DepartmentFormDrawerView
