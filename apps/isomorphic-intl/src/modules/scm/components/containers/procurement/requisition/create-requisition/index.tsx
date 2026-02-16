"use client"

import Link from "next/link"

import { Form } from "@core/ui/form"
import { atom, useAtom } from "jotai"
import { useTranslations } from "next-intl"
import { Controller } from "react-hook-form"
import { Empty } from "rizzui/empty"

import FileUpload from "@/components/base/file-upload"
import FormGroup from "@/components/base/form-group"
import FormGroupContainer from "@/components/base/form-group-container"
import FormStickyActions from "@/components/base/form-sticky-actions"
import PdfIcon from "@/components/icons/pdf-icon"
import { Button, Input } from "@/components/ui"
import Box from "@/components/ui/box"
import Select from "@/components/ui/select"
import { routes } from "@/config/routes"
import { useSharedDataHooks } from "@/modules/fms/constants/shared-data-hook"
import {
  RequisitionInput,
  RequisitionUpdate,
} from "@/modules/scm/types/procurement/requisition/requisition-types"
import { ProductItemsUtils } from "@/modules/scm/utils/items-calculation"
import {
  FindSelectOption,
  GetMenuListStyles,
} from "@/modules/scm/utils/select-options"
import {
  CreateRequisitionSchema,
  UpdateRequisitionSchema,
} from "@/modules/scm/validators/procurement/create-requisition-schema"

import { ItemsListTable } from "./items-list/items-list-table"
import RequisitionInformationForm from "./requisition-information-form"
import { useRequisitionForm } from "./use-requisition-form"

export const currencyNameTemplate = atom<string>("")
export const previewDataTemplate = atom<any>([])

interface UseRequisitionFormProps {
  id?: number
  mode?: "create" | "edit" | "view"
  requestFor?:
    | "requisition"
    | "stockReplenishment"
    | "salesOperationPlan"
    | "materialAvailability"
}
export default function CreateEditRequisition({
  id,
  mode,
  requestFor,
}: UseRequisitionFormProps) {
  const t = useTranslations("form")

  // console.log(id)

  const [, setPreviewData] = useAtom(previewDataTemplate)
  const [, setCurrencyName] = useAtom(currencyNameTemplate)

  const { currency } = useSharedDataHooks(["currency"])

  const { calculateTotalAmount, calculateTotalQuantity } = ProductItemsUtils()

  const { currencyOptions, isCurrenciesLoading } = currency

  const {
    productItems,
    handleProductItemChange,
    handleProductItemDelete,
    handleProductItemAdd,
    getFormValues,
    onSubmit,
    isFieldDisabled,
    isLoading,
    initialData,
  } = useRequisitionForm({
    id: id || 0,
    mode: mode,
    requestFor: requestFor,
  })

  const handleFileUpload = (files: File[]) => {
    if (files) {
      setPreviewData(files)
    }
  }

  return (
    <Box>
      <Form<RequisitionInput | RequisitionUpdate>
        validationSchema={
          mode === "edit" ? UpdateRequisitionSchema : CreateRequisitionSchema
        }
        onSubmit={onSubmit}
        className="flex grow flex-col justify-between pt-7 @container @2xl:pt-9 @3xl:pt-11"
        useFormProps={{
          mode: "onChange",
          reValidateMode: "onChange",
          defaultValues: getFormValues(),
          values: getFormValues(),
        }}>
        {({
          register,
          setValue,
          formState,
          control,
          watch,
          formState: { errors },
        }) => (
          <>
            <FormGroupContainer>
              <FormGroup title={t("form-information")}>
                <RequisitionInformationForm
                  isFieldDisabled={isFieldDisabled}
                  formMethods={{
                    register,
                    control,
                    formState,
                    setValue,
                    watch,
                  }}
                />
              </FormGroup>
              {mode !== "view" && (
                <FormGroup
                  title={t("form-document")}
                  className="pt-7 @2xl:pt-10 @3xl:pt-11">
                  <FileUpload
                    accept="pdf"
                    multiple={false}
                    onUpload={handleFileUpload}
                    btnLabel="upload"
                    className="col-span-full w-full @2xl:p-0"
                  />
                </FormGroup>
              )}
              {mode === "view" && (
                <FormGroup
                  title={t("form-document")}
                  className="pt-7 @2xl:pt-10 @3xl:pt-11">
                  {initialData?.documentUrl === "" ? (
                    <Empty text="No Data" textClassName="mt-2" />
                  ) : (
                    <div className="col-span-full flex items-center justify-between rounded-lg">
                      <div className="flex items-center">
                        <PdfIcon className="mr-2 h-8 w-8" />
                        <span className="font-base text-gray-900 dark:text-gray-0">
                          {t("form-document")}
                        </span>
                      </div>
                      <Button variant="outline">
                        <Link href={initialData?.documentUrl || ""} download>
                          {t("form-download")}
                        </Link>
                      </Button>
                    </div>
                  )}
                </FormGroup>
              )}
              <FormGroup
                title={t("form-currency-and-price-list")}
                className="pt-7 @2xl:pt-10 @3xl:pt-11">
                <Controller
                  control={control}
                  name="currencyId"
                  render={({ field: { onChange, value } }) => (
                    <Select
                      label={t("form-currency")}
                      labelClassName="text-title"
                      placeholder={t("form-select-currency")}
                      options={currencyOptions}
                      onChange={(option: any) => {
                        onChange(option?.value)
                        setCurrencyName(option?.label)
                      }}
                      value={FindSelectOption(currencyOptions, value)}
                      isLoading={isCurrenciesLoading}
                      error={
                        errors.currencyId?.message
                          ? t(errors.currencyId?.message)
                          : ""
                      }
                      menuPortalTarget={document.body}
                      styles={GetMenuListStyles(currencyOptions.length)}
                      isDisabled={isFieldDisabled}
                      isRequired
                    />
                  )}
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
                  isFieldDisabled={isFieldDisabled}
                />
              </FormGroup>
              <FormGroup
                title={t("form-total")}
                className="pt-7 @2xl:pt-10 @3xl:pt-11">
                <Input
                  label={t("form-total-quantity")}
                  value={calculateTotalQuantity(productItems)}
                  disabled
                />
                <Input
                  label={t("form-total-amount")}
                  value={calculateTotalAmount(productItems)}
                  disabled
                />
              </FormGroup>
            </FormGroupContainer>
            {mode !== "view" && (
              <FormStickyActions
                isEditForm={mode === "edit"}
                isLoading={isLoading}
                backToListPath={
                  routes.scm.procurement.requisitions.requisitions
                }
                className="mt-7"
              />
            )}
          </>
        )}
      </Form>
    </Box>
  )
}
