"use client"

import { useState } from "react"

import { Form } from "@core/ui/form"
import { useTranslations } from "next-intl"
import { SubmitHandler } from "react-hook-form"
import { PiPlusBold } from "react-icons/pi"
import { Text } from "rizzui"

import FormFooter from "@/components/base/form-footer"
import FormGroup from "@/components/base/form-group"
import FormGroupContainer from "@/components/base/form-group-container"
import { Select } from "@/components/ui"
import { Badge, Button } from "@/components/ui"
import { Input } from "@/components/ui"
import Box from "@/components/ui/box"
import TableGrid from "@/components/ui/table-grid"
import {
  useBudgetTemplateById,
  useCreateBudgetTemplate,
  useUpdateBudgetTemplate,
} from "@/modules/fms/hooks/use-budget-template"
import { BudgetTemplateDetail } from "@/modules/fms/types"
import {
  BudgetTemplateFormInput,
  budgetTemplateFormSchema,
} from "@/modules/fms/validators/budget-template-schema"

import ViewBudgetTemplateTable from "./table/budget-template-table"

type MonthOption = {
  label: string
  value: string
}

const monthOptions: MonthOption[] = [
  { label: "January", value: "1" },
  { label: "February", value: "2" },
  { label: "March", value: "3" },
  { label: "April", value: "4" },
  { label: "May", value: "5" },
  { label: "June", value: "6" },
  { label: "July", value: "7" },
  { label: "August", value: "8" },
  { label: "September", value: "9" },
  { label: "October", value: "10" },
  { label: "November", value: "11" },
  { label: "December", value: "12" },
]

export default function CreateEditBudgetTemplateForm({
  id,
  mode,
}: {
  id?: number
  mode?: "create" | "edit" | "view"
}) {
  const t = useTranslations("form")
  const { data: templateById } = useBudgetTemplateById(id!)

  const { mutate: createTemplate, isPending: isCreating } =
    useCreateBudgetTemplate()
  const { mutate: updateTemplate, isPending: isUpdating } =
    useUpdateBudgetTemplate()

  // Add new state to track used months
  const [usedMonths, setUsedMonths] = useState<Set<string>>(new Set())

  const isFieldDisabled = mode === "view"

  // Initialize with all 12 months with equal distribution
  const initializeDetails = () => {
    const initialPercentage = (100 / 12).toFixed(2)
    if (templateById?.budgetDistributionDetails) {
      // Use IDs from API response when editing
      return templateById.budgetDistributionDetails.map((detail) => ({
        id: detail.id,
        monthName: String(detail.monthId), // Convert back to string for select
        budgetPercentage: detail.budgetPercentage,
      }))
    }
    // For new creation, don't set IDs
    return monthOptions.map((month) => ({
      monthName: month.value,
      budgetPercentage: Number(initialPercentage),
    }))
  }

  // Initialize details with all 12 months
  const [details, setDetails] =
    useState<BudgetTemplateDetail[]>(initializeDetails())

  // Filter available months
  const getAvailableMonths = () => {
    return monthOptions.filter((month) => !usedMonths.has(month.value))
  }

  // Modified addNewRow function
  const addNewRow = () => {
    const availableMonths = getAvailableMonths()
    if (availableMonths.length === 0) return

    setDetails([
      ...details,
      {
        monthName: availableMonths[0].value,
        budgetPercentage: 0,
      },
    ])
  }

  // Modified handleRowChange function
  const handleRowChange = (index: number, field: string, value: any) => {
    const newDetails = [...details]

    // If changing month, update used months
    if (field === "monthName") {
      const oldMonth = newDetails[index].monthName
      if (oldMonth) {
        const updatedUsedMonths = new Set(usedMonths)
        updatedUsedMonths.delete(oldMonth)
        updatedUsedMonths.add(value)
        setUsedMonths(updatedUsedMonths)
      }
    }

    newDetails[index] = {
      ...newDetails[index],
      [field]: field === "budgetPercentage" ? Number(value) : value,
    }
    setDetails(newDetails)
  }

  // Modified handleRowDelete function
  const handleRowDelete = (index: number) => {
    const monthToRemove = details[index].monthName
    if (monthToRemove) {
      setUsedMonths((prev) => {
        const updated = new Set(prev)
        updated.delete(monthToRemove)
        return updated
      })
    }
    setDetails(details.filter((_, i) => i !== index))
  }

  // Define columns for budget template details table
  const baseColumns = [
    {
      id: "id",
      header: t("form-id"),
      accessorKey: "id",
      cell: (props: any) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {props.row.index + 1}
        </Text>
      ),
    },
  ]

  const viewColumns = [
    {
      id: "monthName",
      header: t("form-month-name"),
      accessorKey: "monthName",
      cell: (props: any) => {
        const month = monthOptions.find(
          (month) => month.value === props.row.original.monthName
        )
        return (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {month?.label || ""}
          </Text>
        )
      },
    },
    {
      id: "budgetPercentage",
      header: t("form-budget-percentage"),
      accessorKey: "budgetPercentage",
      cell: (props: any) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {props.row.original.budgetPercentage || ""}
        </Text>
      ),
    },
  ]

  const editColumns = [
    {
      id: "monthName",
      header: t("form-month-name"),
      accessorKey: "monthName",
      width: "300px",
      cell: (props: any) => {
        const availableMonths = monthOptions.filter(
          (month) =>
            !usedMonths.has(month.value) ||
            month.value === props.row.original.monthName
        )

        return (
          <Select
            labelClassName="text-title"
            options={availableMonths}
            menuPortalTarget={document.body}
            value={
              monthOptions.find(
                (option) => option.value === props.row.original.monthName
              ) || null
            }
            onChange={(option: any) =>
              props.table.options.meta?.updateData(
                props.row.index,
                "monthName",
                option?.value
              )
            }
            placeholder={t("form-select-month")}
          />
        )
      },
    },
    {
      id: "budgetPercentage",
      header: t("form-budget-percentage"),
      accessorKey: "budgetPercentage",
      width: "150px",
      cell: (props: any) => (
        <Input
          type="number"
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
          placeholder="0.00"
        />
      ),
    },
    {
      id: "actions",
      header: "",
      accessorKey: "actions",
      width: "80px",
      cell: (props: any) => (
        <Badge
          variant="flat"
          color="danger"
          rounded="lg"
          className="cursor-pointer"
          onClick={() => props.onDelete()}>
          {t("form-delete")}
        </Badge>
      ),
    },
  ]

  const templateDetailsColumns = [
    ...baseColumns,
    ...(isFieldDisabled ? viewColumns : editColumns),
  ]

  const onSubmit: SubmitHandler<BudgetTemplateFormInput> = (data) => {
    const transformedDetails = details.map((detail) => {
      const month = monthOptions.find(
        (month) => month.value === detail.monthName
      )

      if (id) {
        return {
          ...(detail.id
            ? {
              id: templateById?.budgetDistributionDetails.find(
                (d) => d.id === detail.id
              )?.id,
            }
            : { id: 0 }),
          budgetDistributionId: Number(id),
          monthId: Number(detail.monthName),
          monthName: month?.label,
          budgetPercentage: detail.budgetPercentage,
        }
      }

      // For create: don't include ids
      return {
        monthId: Number(detail.monthName),
        monthName: month?.label,
        budgetPercentage: detail.budgetPercentage,
      }
    })

    const templateData = {
      budgetDistributionName: data.budgetDistributionName,
      budgetDistributionDetails: transformedDetails,
    }

    if (id) {
      updateTemplate({
        id,
        budgetDistributionName: templateData.budgetDistributionName,
        budgetDistributionDetails: templateData.budgetDistributionDetails,
      })
    } else {
      createTemplate(templateData)
    }
  }

  const defaultValues: BudgetTemplateFormInput = {
    budgetDistributionName: templateById?.budgetDistributionName || "",
    // budgetDistributionDetails: [],
  }

  console.log(templateById, id)

  return (
    <Box>
      <Form<BudgetTemplateFormInput>
        validationSchema={budgetTemplateFormSchema}
        onSubmit={onSubmit}
        className="flex grow flex-col justify-between pt-7 @container"
        useFormProps={{
          defaultValues: templateById || defaultValues,
          mode: "onChange",
          values: templateById,
        }}>
        {({ register, formState: { errors } }) => {
          return (
            <>
              <FormGroupContainer>
                <FormGroup title={t("form-information")}>
                  <Input
                    {...register("budgetDistributionName")}
                    label={t("form-budget-distribution-name")}
                    placeholder={t("form-enter-budget-distribution-name")}
                    error={errors.budgetDistributionName?.message && t(errors.budgetDistributionName?.message)}
                    disabled={mode === "view"}
                  />
                </FormGroup>

                <FormGroup
                  title={t("form-budget-distribution-details")}
                  className="pt-7 @2xl:pt-10 @3xl:pt-11"
                  childrenContainerClassName="@2xl:grid-cols-1 @4xl:col-span-12">
                  <div className="space-y-4">
                    <TableGrid
                      columns={templateDetailsColumns}
                      data={details}
                      gridTemplateColumns="50px 1fr 150px 80px"
                      variant="modern"
                      onRowChange={handleRowChange}
                      onRowDelete={handleRowDelete}
                    />
                    {!isFieldDisabled && details.length < 12 && (
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

              {mode !== "view" && (
                <FormFooter
                  isLoading={isCreating || isUpdating}
                  altBtnText={t("form-cancel")}
                  submitBtnText={
                    id ? t("form-update-budget-distribution") : t("form-create-budget-distribution")
                  }
                  className="border-gray-500/20"
                />
              )}
            </>
          )
        }}
      </Form>
    </Box>
  )
}
