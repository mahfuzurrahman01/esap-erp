"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import { Form } from "@core/ui/form"
import { useTranslations } from "next-intl"
import { Controller, SubmitHandler } from "react-hook-form"
import { PiPlusBold } from "react-icons/pi"
import { Text, Title } from "rizzui"

import FormFooter from "@/components/base/form-footer"
import FormGroup from "@/components/base/form-group"
import FormGroupContainer from "@/components/base/form-group-container"
import { Badge, Button, Input, Select, Textarea } from "@/components/ui"
import Box from "@/components/ui/box"
import TableGrid from "@/components/ui/table-grid"
import { routes } from "@/config/routes"
import { useSalaryRuleList } from "@/hooks/hrms/payroll-configuration/use-salary-rules"
import { useSalaryStructureTypeList } from "@/hooks/hrms/payroll-configuration/use-salary-structure-type"
import {
  useCreateSalaryStructure,
  useSalaryStructureById,
  useUpdateSalaryStructure,
} from "@/hooks/hrms/payroll-configuration/use-salary-structures"
import { useSelectOptions } from "@/hooks/use-select-options"
import { SalaryRule } from "@/types/hrms/payroll-configuration/salary-rules.types"
import {
  SalaryStructureFormInput,
  salaryStructureFormSchema,
} from "@/validators/hrms/salary-structure-form.schema"

interface SalaryRuleRow {
  id?: number
  salaryRuleId: number
}

export default function CreateEditSalaryStructureForm() {
  const t = useTranslations("form")
  const router = useRouter()
  const params = useParams()
  const salaryStructureId = params?.salaryStructureId as string
  const [salaryRules, setSalaryRules] = useState<SalaryRuleRow[]>([
    { salaryRuleId: 0 },
  ])

  const { data: salaryRulesList, isLoading: isSalaryRuleLoading } =
    useSalaryRuleList()
  const { data: structureTypeList, isLoading: isStructureTypeLoading } =
    useSalaryStructureTypeList()
  const { data: salaryStructure, isLoading: isStructureLoading } =
    useSalaryStructureById(Number(salaryStructureId))

  const { mutate: createStructure, isPending: isCreatePending } =
    useCreateSalaryStructure()
  const { mutate: updateStructure, isPending: isUpdatePending } =
    useUpdateSalaryStructure()

  const isLoading =
    isCreatePending ||
    isUpdatePending ||
    isStructureLoading ||
    isStructureTypeLoading

  useEffect(() => {
    if (salaryStructureId && salaryStructure?.salaryRules) {
      setSalaryRules(
        salaryStructure.salaryRules.map((rule) => ({
          salaryRuleId: rule.id as number,
        }))
      )
    }
  }, [salaryStructureId, salaryStructure])

  const salaryRuleOptions = useSelectOptions<SalaryRule>(
    salaryRulesList?.data,
    "salaryRuleName"
  )

  const structureTypeOptions = useSelectOptions(
    structureTypeList?.data,
    "salaryStructureTypeName"
  )

  const defaultValues = {
    salaryStructureName: "",
    salaryStructureTypeId: 0,
    description: "",
    salaryRuleIds: [],
  }

  const handleRowChange = (index: number, field: string, value: any) => {
    setSalaryRules((prev) => {
      const newRules = [...prev]
      newRules[index] = {
        ...newRules[index],
        [field]: value,
      }
      return newRules
    })
  }

  const handleRowDelete = (index: number) => {
    setSalaryRules((prev) => prev.filter((_, i) => i !== index))
  }

  const addNewRow = () => {
    setSalaryRules((prev) => [...prev, { salaryRuleId: 0 }])
  }

  const onSubmit: SubmitHandler<SalaryStructureFormInput> = async (data) => {
    const validRules = salaryRules
      .filter((rule) => rule.salaryRuleId !== 0)
      .map((rule) => rule.salaryRuleId)

    const formData = {
      ...data,
      salaryRuleIds: validRules,
    }

    if (salaryStructureId) {
      updateStructure({ ...formData, id: Number(salaryStructureId) })
    } else {
      createStructure(formData)
    }
  }

  const structureColumns = [
    {
      id: "id",
      header: "ID",
      accessorKey: "id",
      width: "50px",
      cell: ({ row }: { row: any }) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {row.index + 1}
        </Text>
      ),
    },
    {
      id: "salaryRuleId",
      header: "Salary Rule",
      accessorKey: "salaryRuleId",
      width: "300px",
      cell: (props: any) => (
        <div className="flex flex-col gap-1">
          <Select
            options={salaryRuleOptions}
            value={
              salaryRuleOptions.find(
                (option) => option.value === props.row.original.salaryRuleId
              ) || null
            }
            onChange={(option: any) =>
              props.table.options.meta?.updateData(
                props.row.index,
                "salaryRuleId",
                option?.value
              )
            }
            isLoading={isSalaryRuleLoading}
            placeholder="Select salary rule"
            menuPortalTarget={document.body}
            className={!props.row.original.salaryRuleId ? "border-red-500" : ""}
          />
          {/* {!props.row.original.chartOfAccountId && (
            <Text className="text-xs text-red-500">Account is required</Text>
          )} */}
        </div>
      ),
    },
    {
      id: "computationType",
      header: t("form-computation-type"),
      accessorKey: "computationType",
      width: "200px",
      cell: (props: any) => {
        const selectedRule = salaryRulesList?.data.find(
          (rule) => rule.id === props.row.original.salaryRuleId
        )
        return (
          <Text className="font-medium">
            {selectedRule?.computationType === "FixedAmount" ? (
              <span>Fixed Amount: {selectedRule?.amount}</span>
            ) : (
              <span>Formula: {selectedRule?.formula}</span>
            )}
          </Text>
        )
      },
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
          onClick={() => handleRowDelete(props.row.index)}>
          {t("form-delete")}
        </Badge>
      ),
    },
  ]

  return (
    <Box>
      <Form<SalaryStructureFormInput>
        validationSchema={salaryStructureFormSchema}
        onSubmit={onSubmit}
        className="flex grow flex-col justify-between pt-7 @container"
        useFormProps={{
          defaultValues: salaryStructureId ? salaryStructure : defaultValues,
          values: salaryStructure,
        }}>
        {({ register, control, formState: { errors } }) => (
          <>
            <FormGroupContainer>
              <FormGroup title={t("form-information")}>
                <Input
                  {...register("salaryStructureName")}
                  type="text"
                  label={t("form-name")}
                  placeholder={t("form-enter-name")}
                  error={
                    errors.salaryStructureName?.message &&
                    t(errors.salaryStructureName?.message)
                  }
                />
                <Controller
                  name="salaryStructureTypeId"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      label={t("form-salary-structure-type")}
                      labelClassName="text-title"
                      options={structureTypeOptions}
                      value={
                        structureTypeOptions.find(
                          (option) => option.value === value
                        ) || null
                      }
                      onChange={(option: any) => onChange(option?.value)}
                      placeholder={
                        isStructureTypeLoading
                          ? "Loading salary structure types..."
                          : "Select a salary structure type"
                      }
                      error={
                        errors.salaryStructureTypeId?.message &&
                        t(errors.salaryStructureTypeId?.message)
                      }
                    />
                  )}
                />
                <div className="col-span-2">
                  <Controller
                    control={control}
                    name="description"
                    render={() => (
                      <div>
                        <label className="mb-1.5 block font-medium text-gray-900 dark:text-gray-0">
                          {t("form-description")}
                        </label>
                        <Textarea
                          placeholder={t("form-enter-description")}
                          {...register("description")}
                          error={
                            errors?.description?.message &&
                            t(errors?.description?.message)
                          }
                          className="h-20"
                        />
                      </div>
                    )}
                  />
                </div>
              </FormGroup>

              <div className="grid grid-cols-12 gap-7 pt-7">
                <div className="col-span-4">
                  <Title as="h5" className="font-semibold">
                    {t("form-salary-rules")}
                  </Title>
                </div>
                <div className="col-span-8">
                  <div className="space-y-4">
                    <TableGrid
                      columns={structureColumns}
                      data={salaryRules}
                      gridTemplateColumns="50px minmax(300px, 1fr) 200px 80px"
                      variant="modern"
                      meta={{
                        updateData: handleRowChange,
                      }}
                      className="rounded-lg border"
                    />
                    <Button variant="outline" onClick={addNewRow}>
                      <PiPlusBold className="me-2 h-4 w-4" />
                      {t("form-add-salary-rule")}
                    </Button>
                  </div>
                </div>
              </div>
              {/* <FormGroup title={t("form-salary-rules")}>
                <div className="min-w-full space-y-4">
                  <>
                    <TableGrid
                      columns={structureColumns}
                      data={salaryRules}
                      gridTemplateColumns="50px 1fr 150px 150px 100px"
                      variant="modern"
                      onRowChange={handleRowChange}
                      onRowDelete={handleRowDelete}
                    />
                    <Button
                      variant="outline"
                      onClick={addNewRow}
                      className="mt-4">
                      <PiPlusBold className="me-2 h-4 w-4" />
                      {t("form-add-row")}
                    </Button>
                  </>
                </div>
              </FormGroup> */}
            </FormGroupContainer>
            <FormFooter
              isLoading={isLoading}
              submitBtnText={
                salaryStructureId
                  ? t("form-update-salary-structure")
                  : t("form-create-salary-structure")
              }
              altBtnText={t("form-back")}
              handleAltBtn={() => router.push(routes.hr.salaryStructures)}
            />
          </>
        )}
      </Form>
    </Box>
  )
}
