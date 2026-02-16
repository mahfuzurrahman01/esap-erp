"use client"

import { Form } from "@core/ui/form"
import SimpleBar from "@core/ui/simplebar"
import { useTranslations } from "next-intl"
import { Controller } from "react-hook-form"

import { DatePicker } from "@/components/base/date-picker"
import DrawerFormActions from "@/components/base/drawer-form-actions"
import DrawerHeader from "@/components/base/drawer-header"
import { Input, Select } from "@/components/ui"
import { messages } from "@/config/messages"
import { Machine } from "@/modules/scm/types/production-control/work-order-tracking/machine-types"
import { FindSelectOption } from "@/modules/scm/utils/select-options"
import { MachineSchema } from "@/modules/scm/validators/production-control/work-order-tracking/machine.schema"

import { machineStatusOptions } from "./status-option"
import { useMachineForm } from "./use-machine-form"

type MachineFormDrawerViewProps = {
  isEditForm?: boolean
  initialData?: Machine
} & (
  | { isEditForm: true; initialData: Machine }
  | { isEditForm?: false; initialData?: Machine }
)

const MachineFormDrawerView = ({
  isEditForm = false,
  initialData,
}: MachineFormDrawerViewProps) => {
  const t = useTranslations("form")

  const { isLoading, onSubmit, handleCloseDrawer } = useMachineForm(
    isEditForm,
    initialData?.id
  )

  const defaultValues = {
    machineName: "",
    description: "",
    registerDate: "",
    expireDate: "",
    cost: 0,
    status: "",
  }

  return (
    <div className="flex h-full flex-col">
      <DrawerHeader
        heading={
          isEditForm ? t(messages.editMachine) : t(messages.addNewMachine)
        }
        onClose={handleCloseDrawer}
        headerClassName="mb-0"
      />
      <Form<Machine>
        validationSchema={MachineSchema}
        onSubmit={onSubmit}
        useFormProps={{
          mode: "onChange",
          reValidateMode: "onChange",
          values: initialData,
          defaultValues: initialData ? initialData : defaultValues,
        }}
        className="flex grow flex-col">
        {({ register, control, formState: { errors } }) => (
          <>
            <SimpleBar className="h-full">
              <MachineForm
                register={register}
                control={control}
                errors={errors}
              />
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

export const MachineForm = ({ register, control, errors }: any) => {
  const t = useTranslations("form")
  return (
    <div className="flex flex-col gap-4 px-5 py-6">
      <Input
        isRequired
        type="text"
        label={t("form-machine-name")}
        placeholder={t("form-machine-name")}
        labelClassName="text-sm font-medium text-gray-900"
        {...register("machineName")}
        error={
          errors?.machineName?.message ? t(errors?.machineName?.message) : ""
        }
      />
      <Input
        type="text"
        isRequired
        label={t("form-description")}
        placeholder={t("form-description")}
        labelClassName="text-sm font-medium text-gray-900"
        {...register("description")}
        error={
          errors?.description?.message ? t(errors?.description?.message) : ""
        }
      />
      <div className="col-span-full">
        <Controller
          control={control}
          name="registerDate"
          render={({ field: { value, onChange } }) => (
            <div className="relative">
              <label
                htmlFor="registerDate"
                className="mb-2 block text-sm font-medium text-title transition-colors duration-200">
                {t("form-register-date")}{" "}
                <span className="text-orange-500">*</span>
              </label>
              <DatePicker
                id="registerDate"
                value={value ? new Date(value) : null}
                onChange={(date: any) =>
                  onChange(date ? date.toISOString() : "")
                }
                minDate={new Date()}
                placeholderText={t("form-select-date")}
                className="w-full"
              />
            </div>
          )}
        />
        {errors.registerDate && (
          <p className="text-sm text-red-500">
            {t(errors.registerDate.message)}
          </p>
        )}
      </div>
      <div className="col-span-full">
        <Controller
          control={control}
          name="expireDate"
          render={({ field: { value, onChange } }) => (
            <div className="relative">
              <label
                htmlFor="expireDate"
                className="mb-2 block text-sm font-medium text-title transition-colors duration-200">
                {t("form-expire-date")}{" "}
                <span className="text-orange-500">*</span>
              </label>
              <DatePicker
                id="expireDate"
                value={value ? new Date(value) : null}
                onChange={(date: any) =>
                  onChange(date ? date.toISOString() : "")
                }
                minDate={new Date()}
                placeholderText={t("form-select-date")}
                className="w-full"
              />
            </div>
          )}
        />
        {errors.expireDate && (
          <p className="text-sm text-red-500">{t(errors.expireDate.message)}</p>
        )}
      </div>
      <Controller
        control={control}
        name="status"
        render={({ field: { onChange, value } }) => (
          <Select
            options={machineStatusOptions}
            isRequired
            label={t("form-status")}
            {...register("status")}
            value={FindSelectOption(machineStatusOptions, value)}
            onChange={(selectedValue: any) => {
              onChange(selectedValue?.value)
            }}
            className="col-span-2 text-gray-900 dark:text-gray-0"
            error={errors.status?.message ? t(errors.status.message) : ""}
          />
        )}
      />
      <Input
        type="number"
        isRequired
        label={t("form-cost")}
        placeholder={t("form-cost")}
        labelClassName="text-sm font-medium text-gray-900"
        {...register("cost", { valueAsNumber: true })}
        error={errors?.cost?.message ? t(errors?.cost?.message) : ""}
      />
    </div>
  )
}

export default MachineFormDrawerView
