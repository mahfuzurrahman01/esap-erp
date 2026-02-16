"use client"

import { Form } from "@core/ui/form"
import { useTranslations } from "next-intl"
import { Controller } from "react-hook-form"

import { DatePicker } from "@/components/base/date-picker"
import FormGroup from "@/components/base/form-group"
import FormGroupContainer from "@/components/base/form-group-container"
import FormStickyActions from "@/components/base/form-sticky-actions"
import Box from "@/components/ui/box"
import { routes } from "@/config/routes"
import { MaterialRequirementsPlanning } from "@/modules/scm/types/production-control/materials-requirements-planning/material-requirements-planning-types"
import { MaterialAvailabilitySchema } from "@/modules/scm/validators/production-control/material-availiablity/material-availability.schema"

import { ItemsListTable } from "./items-list/items-list-table"
import { useMaterialAvailabilityForm } from "./use-material-availablity-form"

interface UseMaterialAvailabilityFormProps {
  id: number
  mode?: "create" | "edit" | "view"
}

export default function CreateEditMaterialAvailability({
  id,
  mode = "create",
}: UseMaterialAvailabilityFormProps) {
  const t = useTranslations("form")

  const {
    onSubmit,
    isLoading,
    isFieldDisabled,
    getFormValues,
    materialAvailabilityItems,
    handleMaterialAvailabilityItemsChange,
    handleMaterialAvailabilityItemsDelete,
    handleMaterialAvailabilityItemsAdd,
  } = useMaterialAvailabilityForm({ id, mode })

  return (
    <Box>
      <Form<MaterialRequirementsPlanning>
        validationSchema={MaterialAvailabilitySchema}
        onSubmit={onSubmit}
        className="flex grow flex-col justify-between pt-7 @container @2xl:pt-9 @3xl:pt-11"
        useFormProps={{
          mode: "onChange",
          reValidateMode: "onChange",
          defaultValues: getFormValues(),
          values: getFormValues(),
        }}>
        {({ control, formState: { errors }, setValue }) => (
          <>
            <FormGroupContainer>
              <FormGroup title={t("form-information")}>
                <div>
                  <Controller
                    control={control}
                    name="scheduledProductionStart"
                    render={({ field: { value, onChange } }) => (
                      <div className="relative">
                        <label
                          htmlFor="scheduledProductionStart"
                          className="mb-2 block text-sm font-medium text-title transition-colors duration-200">
                          {t("form-scheduled-from")}
                        </label>
                        <DatePicker
                          id="scheduledProductionStart"
                          value={value ? new Date(value) : null}
                          onChange={(date: any) =>
                            onChange(date ? date.toISOString() : "")
                          }
                          minDate={new Date()}
                          placeholderText={t("form-select-date")}
                          className="w-full"
                          disabled={isFieldDisabled || isLoading}
                        />
                      </div>
                    )}
                  />
                  {errors.scheduledProductionStart && (
                    <p className="text-sm text-red-500">
                      {t(errors.scheduledProductionStart.message)}
                    </p>
                  )}
                </div>
                <div>
                  <Controller
                    control={control}
                    name="scheduledProductionEnd"
                    render={({ field: { value, onChange } }) => (
                      <div className="relative">
                        <label
                          htmlFor="scheduledProductionEnd"
                          className="mb-2 block text-sm font-medium text-title transition-colors duration-200">
                          {t("form-scheduled-to")}
                        </label>
                        <DatePicker
                          id="scheduledProductionEnd"
                          value={value ? new Date(value) : null}
                          onChange={(date: any) =>
                            onChange(date ? date.toISOString() : "")
                          }
                          minDate={new Date()}
                          placeholderText={t("form-select-date")}
                          className="w-full"
                          disabled={isFieldDisabled || isLoading}
                        />
                      </div>
                    )}
                  />
                  {errors.scheduledProductionEnd && (
                    <p className="text-sm text-red-500">
                      {t(errors.scheduledProductionEnd.message)}
                    </p>
                  )}
                </div>
              </FormGroup>

              <FormGroup
                title={t("form-product-details")}
                className="pt-7 @2xl:pt-10 @3xl:pt-11"
                childrenContainerClassName="@2xl:grid-cols-1 @4xl:col-span-12">
                <ItemsListTable
                  data={materialAvailabilityItems}
                  onRowChange={handleMaterialAvailabilityItemsChange}
                  onRowDelete={handleMaterialAvailabilityItemsDelete}
                  onAddRow={handleMaterialAvailabilityItemsAdd}
                  setValue={setValue}
                  isFieldDisabled={isFieldDisabled}
                />
              </FormGroup>
            </FormGroupContainer>
            {mode !== "view" && (
              <FormStickyActions
                isEditForm={mode === "edit"}
                isLoading={isLoading}
                className="mt-7"
                backToListPath={
                  routes.scm.productionControl.materialAvailability
                    .materialAvailability
                }
              />
            )}
          </>
        )}
      </Form>
    </Box>
  )
}
