"use client"

import { Form } from "@core/ui/form"
import { useAtom } from "jotai"
import { useTranslations } from "next-intl"
import { Controller } from "react-hook-form"

import { DatePicker } from "@/components/base/date-picker"
import FormGroup from "@/components/base/form-group"
import FormGroupContainer from "@/components/base/form-group-container"
import FormStickyActions from "@/components/base/form-sticky-actions"
import { Input, Textarea } from "@/components/ui"
import Box from "@/components/ui/box"
import Select from "@/components/ui/select"
import { routes } from "@/config/routes"
import { useSCMSharedDataHook } from "@/modules/scm/constants/shared-data-hooks"
import { assignedToName } from "@/modules/scm/store/global-store-state"
import { WorkOrder } from "@/modules/scm/types/production-control/work-order-tracking/work-order-types"
import {
  FindSelectOption,
  GetMenuListStyles,
} from "@/modules/scm/utils/select-options"
import { WorkOrderTrackingSchema } from "@/modules/scm/validators/production-control/work-order-tracking/work-order-tracking.schema"

import { workProgress } from "./form-utils"
import { ItemsListTable } from "./items-list/items-list-table"
import { useWorkOrderTrackingForm } from "./use-work-order-tracking-form"

interface UseWorkOrderTrackingFormProps {
  id: number
  mode?: "create" | "edit" | "view"
}

export default function CreateWorkOrderTrackingForm({
  id,
  mode = "create",
}: UseWorkOrderTrackingFormProps) {
  const t = useTranslations("form")

  const {
    onSubmit,
    isLoading,
    isFieldDisabled,
    getFormValues,
    workOrderItems,
    handleWorkOrderItemsChange,
    handleWorkOrderItemsDelete,
    handleWorkOrderItemsAdd,
  } = useWorkOrderTrackingForm({ id, mode })

  const [, setAssignedToNameTemplate] = useAtom(assignedToName)

  const { employee, workCenter, materialRequirementPlan } =
    useSCMSharedDataHook(["employee", "workCenter", "materialRequirementPlan"])

  const { employeeOptions, isEmployeeLoading } = employee
  const { workCenterOptions, isWorkCenterLoading } = workCenter
  const { materialRequirementPlanOptions, isMaterialRequirementPlanLoading } =
    materialRequirementPlan

  return (
    <Box>
      <Form<WorkOrder>
        validationSchema={WorkOrderTrackingSchema}
        onSubmit={onSubmit}
        className="flex grow flex-col justify-between pt-7 @container @2xl:pt-9 @3xl:pt-11"
        useFormProps={{
          mode: "onChange",
          reValidateMode: "onChange",
          defaultValues: getFormValues(),
          values: getFormValues(),
        }}>
        {({ register, control, formState: { errors }, setValue }) => (
          <>
            <FormGroupContainer>
              <FormGroup title={t("form-information")}>
                <Input
                  labelClassName="bg-paper"
                  label={t("form-work-order-name")}
                  type="text"
                  {...register("workOrderName")}
                  error={
                    errors.workOrderName?.message
                      ? t(errors.workOrderName.message)
                      : ""
                  }
                  disabled={isFieldDisabled}
                  className="flex-grow"
                  isRequired
                />
                <Controller
                  control={control}
                  name="materialRequirementPlanId"
                  render={({ field: { onChange, value } }) => (
                    <Select
                      label={t("form-material-requirement-plan-no")}
                      placeholder={t("form-material-requirement-plan-no")}
                      labelClassName="text-title"
                      showAddNewOption={true}
                      options={materialRequirementPlanOptions}
                      onChange={(option: any) => onChange(option?.value)}
                      value={FindSelectOption(
                        materialRequirementPlanOptions,
                        value
                      )}
                      isLoading={isMaterialRequirementPlanLoading || isLoading}
                      isDisabled={isFieldDisabled}
                      error={
                        errors?.materialRequirementPlanId?.message
                          ? t(errors.materialRequirementPlanId.message)
                          : ""
                      }
                      menuPortalTarget={document.body}
                      styles={GetMenuListStyles(
                        materialRequirementPlanOptions.length
                      )}
                      isRequired
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="workCenterId"
                  render={({ field: { onChange, value } }) => (
                    <Select
                      label={t("form-work-center")}
                      placeholder={t("form-work-center")}
                      labelClassName="text-title"
                      showAddNewOption={true}
                      options={workCenterOptions}
                      onChange={(option: any) => onChange(option?.value)}
                      value={FindSelectOption(workCenterOptions, value)}
                      isLoading={isWorkCenterLoading || isLoading}
                      isDisabled={isFieldDisabled}
                      error={
                        errors?.workCenterId?.message
                          ? t(errors.workCenterId.message)
                          : ""
                      }
                      menuPortalTarget={document.body}
                      styles={GetMenuListStyles(workCenterOptions.length)}
                      isRequired
                    />
                  )}
                />
                <Input
                  type="number"
                  placeholder="0.00"
                  label={t("form-quantity")}
                  labelClassName="text-title"
                  {...register("quantity", { valueAsNumber: true })}
                  error={
                    errors.quantity?.message ? t(errors.quantity.message) : ""
                  }
                  disabled={isFieldDisabled}
                  isRequired
                />
                <Controller
                  control={control}
                  name="assignedToId"
                  render={({ field: { onChange, value } }) => (
                    <Select
                      label={t("form-assigned-to")}
                      placeholder={t("form-assigned-to")}
                      labelClassName="text-title"
                      showAddNewOption={true}
                      options={employeeOptions}
                      onChange={(option: any) => {
                        onChange(option?.value)
                        setAssignedToNameTemplate(option?.label)
                      }}
                      value={FindSelectOption(employeeOptions, value)}
                      isLoading={isEmployeeLoading || isLoading}
                      isDisabled={isFieldDisabled}
                      error={
                        errors?.assignedToId?.message
                          ? t(errors.assignedToId.message)
                          : ""
                      }
                      menuPortalTarget={document.body}
                      styles={GetMenuListStyles(employeeOptions.length)}
                      isRequired
                    />
                  )}
                />
                <div>
                  <Controller
                    control={control}
                    name="estCompletionStart"
                    render={({ field: { value, onChange } }) => (
                      <div className="relative">
                        <label
                          htmlFor="estCompletionStart"
                          className="mb-2 block text-sm font-medium text-title transition-colors duration-200">
                          {t("form-est-completion-start")}
                        </label>
                        <DatePicker
                          id="estCompletionStart"
                          value={value ? new Date(value) : null}
                          onChange={(date: any) =>
                            onChange(date ? date.toISOString() : "")
                          }
                          minDate={new Date()}
                          placeholderText={t("form-select-date")}
                          className="w-full"
                          disabled={isFieldDisabled}
                        />
                      </div>
                    )}
                    disabled={isFieldDisabled}
                  />
                  {errors.estCompletionStart && (
                    <p className="text-sm text-red-500">
                      {t(errors.estCompletionStart.message)}
                    </p>
                  )}
                </div>
                <div>
                  <Controller
                    control={control}
                    name="estCompletionEnd"
                    render={({ field: { value, onChange } }) => (
                      <div className="relative">
                        <label
                          htmlFor="estCompletionEnd"
                          className="mb-2 block text-sm font-medium text-title transition-colors duration-200">
                          {t("form-est-completion-end")}
                        </label>
                        <DatePicker
                          id="estCompletionEnd"
                          value={value ? new Date(value) : null}
                          onChange={(date: any) =>
                            onChange(date ? date.toISOString() : "")
                          }
                          minDate={new Date()}
                          placeholderText={t("form-select-date")}
                          className="w-full"
                          disabled={isFieldDisabled}
                        />
                      </div>
                    )}
                  />
                  {errors.estCompletionEnd && (
                    <p className="text-sm text-red-500">
                      {t(errors.estCompletionEnd.message)}
                    </p>
                  )}
                </div>
                <Input
                  type="number"
                  placeholder="0.00"
                  label={t("form-expected-duration")}
                  labelClassName="text-title"
                  {...register("expectedDuration", { valueAsNumber: true })}
                  error={
                    errors.expectedDuration?.message
                      ? t(errors.expectedDuration.message)
                      : ""
                  }
                  disabled={isFieldDisabled}
                  isRequired
                />
                <Controller
                  control={control}
                  name="workProgress"
                  render={({ field: { onChange, value } }) => (
                    <Select
                      options={workProgress}
                      label={t("form-work-progress")}
                      {...register("workProgress")}
                      value={
                        workProgress.find((option) => option.value === value) ||
                        null
                      }
                      onChange={(selectedValue: any) => {
                        onChange(selectedValue?.value)
                      }}
                      className="text-gray-900 dark:text-gray-0"
                      error={
                        errors?.workProgress?.message
                          ? t(errors?.workProgress?.message)
                          : ""
                      }
                      isDisabled={isFieldDisabled}
                      isRequired
                    />
                  )}
                />
                <Textarea
                  labelClassName="bg-paper"
                  label={t("form-job-description")}
                  {...register("jobDescription", { required: false })}
                  error={
                    errors.jobDescription?.message
                      ? t(errors.jobDescription.message)
                      : ""
                  }
                  className="flex-grow text-title"
                  disabled={isFieldDisabled}
                />
              </FormGroup>

              <FormGroup
                title={t("form-product-details")}
                className="pt-7 @2xl:pt-10 @3xl:pt-11"
                childrenContainerClassName="@2xl:grid-cols-1 @4xl:col-span-12">
                <ItemsListTable
                  data={workOrderItems}
                  onRowChange={handleWorkOrderItemsChange}
                  onRowDelete={handleWorkOrderItemsDelete}
                  onAddRow={handleWorkOrderItemsAdd}
                  isFieldDisabled={isFieldDisabled}
                  setValue={setValue}
                />
              </FormGroup>
            </FormGroupContainer>
            <FormStickyActions
              isEditForm={mode === "edit"}
              backToListPath={
                routes.scm.productionControl.workOrderTracking.workOrderTracking
              }
              isLoading={isLoading}
              className="mt-7"
            />
          </>
        )}
      </Form>
    </Box>
  )
}
