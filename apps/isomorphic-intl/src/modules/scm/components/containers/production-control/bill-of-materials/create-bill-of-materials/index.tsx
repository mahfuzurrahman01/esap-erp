"use client"

import { Form } from "@core/ui/form"
import { useTranslations } from "next-intl"

import FormGroup from "@/components/base/form-group"
import FormGroupContainer from "@/components/base/form-group-container"
import FormStickyActions from "@/components/base/form-sticky-actions"
import Box from "@/components/ui/box"
import { BillOfMaterials } from "@/modules/scm/types/production-control/bill-of-materials/bill-of-materials-type"
import { BillOfMaterialsSchema } from "@/modules/scm/validators/production-control/bill-of-materials/bill-of-materials.schema"

import BillsOfMaterialsFormInformation from "./bills-of-materials-form-information"
import { ItemsListTable } from "./items-list/items-list-table"
import { useBillOfMaterialsForm } from "./use-bill-of-materials-form"

import { routes } from "@/config/routes"
import { Input } from "@/components/ui"
import { useEffect } from "react"

type IndexProps =
  | {
    initialData?: BillOfMaterials
    isEditForm?: true
    isViewForm?: false
  }
  | {
    initialData?: undefined
    isEditForm?: false
    isViewForm?: false
  }
  | {
    initialData?: BillOfMaterials
    isEditForm?: false
    isViewForm?: true
  }

export default function CreateEditBillOfMaterials({
  initialData,
  isEditForm,
  isViewForm,
}: IndexProps) {
  const {
    isFieldDisabled,
    productItems,
    handleProductItemChange,
    handleProductItemDelete,
    handleProductItemAdd,
    getFormValues,
    calculateMaterialCost,
    onSubmit,
    isLoading,
  } = useBillOfMaterialsForm({
    id: initialData?.id || 0,
    mode: isEditForm ? "edit" : "create",
  })

  const t = useTranslations("form")

  return (
    <Box>
      <Form<BillOfMaterials>
        validationSchema={BillOfMaterialsSchema}
        onSubmit={onSubmit}
        className="flex grow flex-col justify-between pt-7 @container @2xl:pt-9 @3xl:pt-11"
        useFormProps={{
          mode: "onChange",
          reValidateMode: "onChange",
          defaultValues: getFormValues(),
          values: getFormValues(),
        }}>
        {({ register, control, formState, setValue, watch }) => {
          useEffect(() => {
            if (setValue) {
              setValue("materialCost", calculateMaterialCost())
            }
          }, [productItems, setValue, calculateMaterialCost])
          return (
            <>
              <FormGroupContainer>
                <FormGroup title={t("form-information")}>
                  <BillsOfMaterialsFormInformation
                    isFieldDisabled={isFieldDisabled || isViewForm}
                    productItems={productItems}
                    calculateMaterialCost={calculateMaterialCost}
                    formMethods={{
                      register,
                      control,
                      formState,
                      setValue,
                      watch,
                    }}
                  />
                </FormGroup>
                <FormGroup
                  title={t("form-product-details")}
                  className="pt-7 @2xl:pt-10 @3xl:pt-11"
                  childrenContainerClassName="@2xl:grid-cols-1 @4xl:col-span-12">
                  <ItemsListTable
                    data={productItems}
                    onRowChange={handleProductItemChange}
                    onRowDelete={handleProductItemDelete}
                    onAddRow={handleProductItemAdd}
                    setValue={setValue}
                    isFieldDisabled={isViewForm}
                  />
                </FormGroup>
                <FormGroup title={t("form-material-total-cost")} className="pt-7 @2xl:pt-10 @3xl:pt-11"
                  childrenContainerClassName="@2xl:grid-cols-1 flex justify-end">
                  <Input
                    type="number"
                    placeholder="0.00"
                    label={t("form-material-cost")}
                    labelClassName="text-title"
                    className="w-1/3"
                    // {...register("materialCost", { valueAsNumber: true })}
                    value={calculateMaterialCost().toFixed(2)}
                    readOnly
                    disabled={isFieldDisabled}
                    error={
                      formState.errors.materialCost?.message ? t(formState.errors.materialCost.message) : ""
                    }
                  />
                </FormGroup>
              </FormGroupContainer>
              {!isViewForm && (
                <FormStickyActions
                  isEditForm={isEditForm}
                  isLoading={isLoading}
                  backToListPath={routes.scm.productionControl.billOfMaterials.billOfMaterials}
                  className="mt-7"
                />
              )}
            </>
          )
        }
        }
      </Form>
    </Box>
  )
}
