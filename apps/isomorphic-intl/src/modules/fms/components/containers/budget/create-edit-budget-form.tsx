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
import {
  BudgetFormInput,
  budgetFormSchema,
} from "@/modules/fms/validators/budget-schema"

import BasicInformationForm from "./basic-information-form"
import { BudgetTableGridColumn } from "./budget-table-grid-column"
import { useBudgetForm } from "./use-budget-form"

interface CreateEditBudgetFormProps {
  id?: number
  mode?: "create" | "edit" | "view"
}

export default function CreateEditBudgetForm({
  id,
  mode = "create",
}: CreateEditBudgetFormProps) {
  const router = useRouter()
  const t = useTranslations("form")
  const isFieldDisabled = mode === "view"

  const {
    budgetDetails,
    isCreateBudgetPending,
    isUpdateBudgetPending,
    budgetById,
    defaultValues,
    addNewRow,
    handleRowChange,
    handleRowDelete,
    onSubmit,
  } = useBudgetForm(id, mode)

  const columns = BudgetTableGridColumn(isFieldDisabled)

  return (
    <Box>
      <Form<BudgetFormInput>
        validationSchema={budgetFormSchema}
        onSubmit={onSubmit}
        className="flex grow flex-col justify-between pt-7 @container @2xl:pt-9 @3xl:pt-11"
        useFormProps={{
          defaultValues: budgetById || defaultValues,
          mode: "onChange",
          values: budgetById as BudgetFormInput,
        }}>
        {({ register, control, formState: { errors } }) => {
          return (
            <>
              <FormGroupContainer>
                <BasicInformationForm
                  register={register}
                  control={control}
                  errors={errors}
                  isFieldDisabled={isFieldDisabled}
                />

                <FormGroup
                  title={t("form-budget-details")}
                  className="pt-7 @2xl:pt-10 @3xl:pt-11"
                  childrenContainerClassName="@2xl:grid-cols-1 @4xl:col-span-12">
                  <div className="space-y-4">
                    <TableGrid
                      columns={columns}
                      data={budgetDetails}
                      gridTemplateColumns={cn(
                        "50px 1fr 150px",
                        !isFieldDisabled && "100px"
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
                  isLoading={isCreateBudgetPending || isUpdateBudgetPending}
                  altBtnText={t("form-cancel")}
                  handleAltBtn={() => router.back()}
                  submitBtnText={
                    id ? t("form-update-budget") : t("form-create-budget")
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
