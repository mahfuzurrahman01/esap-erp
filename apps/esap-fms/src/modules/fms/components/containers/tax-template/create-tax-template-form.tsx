"use client"

import { useRouter } from "next/navigation"

import { Form } from "@core/ui/form"
import cn from "@core/utils/class-names"
import { useTranslations } from "next-intl"
import { PiPlusBold } from "react-icons/pi"

import FormFooter from "@/components/base/form-footer"
import FormGroup from "@/components/base/form-group"
import FormGroupContainer from "@/components/base/form-group-container"
import { Button } from "@/components/ui"
import Box from "@/components/ui/box"
import TableGrid from "@/components/ui/table-grid"
import { useSelectOptions } from "@/hooks/use-select-options"
import { useSharedDataHooks } from "@/modules/fms/constants/shared-data-hook"
import { useCOAList } from "@/modules/fms/hooks/use-coa"
import { COAList } from "@/modules/fms/types"
import { taxTemplateFormSchema } from "@/modules/fms/validators/tax-template-schema"

import { useTaxDetailsColumns } from "./columns"
import { TaxTemplateInformation } from "./tax-template-information"
import {
  TaxTemplateFormInput,
  TaxTemplateFormProps,
} from "./template-form-types"
import { useTaxTemplateForm } from "./use-tax-template-form"

export default function CreateEditTaxTemplateForm({
  id,
  mode = "create",
}: TaxTemplateFormProps) {
  const router = useRouter()
  const t = useTranslations("form")
  const isFieldDisabled = mode === "view"
  const { company, taxCategory } =
    useSharedDataHooks([
      "company",
      "taxCategory",
      "taxTemplateTypes"
    ])
  const { companyOptions, isCompanyLoading } = company
  const { taxCategoryOptions, isTaxCategoryLoading } = taxCategory

  const { data: coaList, isLoading: isCOALoading } = useCOAList()

  const {
    taxDetails,
    setTaxDetails,
    handleSubmit,
    addNewRow,
    isCreateTaxTemplatePending,
    isUpdateTaxTemplatePending,
    defaultValues,
  } = useTaxTemplateForm(id, mode)

  const handleRowChange = (index: number, field: string, value: any) => {
    const newTaxDetails = [...taxDetails]
    newTaxDetails[index] = {
      ...newTaxDetails[index],
      [field]: field === "taxType" ? value : Number(value),
    }
    setTaxDetails(newTaxDetails)
  }

  const handleRowDelete = (index: number) => {
    const newTaxDetails = taxDetails.filter((_, i) => i !== index)
    setTaxDetails(newTaxDetails)
  }

  const chartOfAccountOptions = useSelectOptions<COAList>(
    coaList?.data,
    "accountName"
  )

  const columns = useTaxDetailsColumns({
    chartOfAccountOptions,
    isFieldDisabled,
    isCOALoading,
    onDelete: handleRowDelete,
  })

  return (
    <Box>
      <Form<TaxTemplateFormInput>
        className="flex grow flex-col justify-between pt-7 @container @2xl:pt-9 @3xl:pt-11"
        validationSchema={taxTemplateFormSchema}
        onSubmit={handleSubmit}
        useFormProps={{
          defaultValues,
          mode: "onChange",
          values: defaultValues,
        }}>
        {({ register, control, formState: { errors } }) => {
          return (
            <>
              <FormGroupContainer>
                <TaxTemplateInformation
                  register={register}
                  control={control}
                  errors={errors}
                  isFieldDisabled={isFieldDisabled}
                  taxCategoryOptions={taxCategoryOptions}
                  companyOptions={companyOptions}
                  isTaxCategoryLoading={isTaxCategoryLoading}
                  isCompanyLoading={isCompanyLoading}
                />

                <FormGroup
                  title={t("form-table-data")}
                  className="pt-7 @2xl:pt-10 @3xl:pt-11"
                  childrenContainerClassName="@2xl:grid-cols-1 @4xl:col-span-12">
                  <div className="space-y-4">
                    <TableGrid
                      data={taxDetails}
                      columns={columns}
                      gridTemplateColumns={cn(
                        "50px 1fr 1fr 150px 150px",
                        !isFieldDisabled && "80px"
                      )}
                      variant="modern"
                      onRowChange={handleRowChange}
                      onRowDelete={handleRowDelete}
                    />
                    {!isFieldDisabled && (
                      <Button
                        variant="outline"
                        onClick={addNewRow}
                        className="mt-4">
                        <PiPlusBold className="me-2 h-4 w-4" />
                        {t("form-add-row")}
                      </Button>
                    )}
                  </div>
                </FormGroup>
              </FormGroupContainer>

              {!isFieldDisabled && (
                <FormFooter
                  isLoading={
                    isCreateTaxTemplatePending || isUpdateTaxTemplatePending
                  }
                  altBtnText={t("form-cancel")}
                  handleAltBtn={() => router.back()}
                  submitBtnText={
                    id
                      ? t("form-update-tax-template")
                      : t("form-create-tax-template")
                  }
                />
              )}
            </>
          )
        }}
      </Form>
    </Box>
  )
}
