"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"

import { Form } from "@core/ui/form"
import dayjs from "dayjs"
import { useTranslations } from "next-intl"
import { Controller, SubmitHandler } from "react-hook-form"
import toast from "react-hot-toast"
import { Text, Title } from "rizzui"

import { DatePicker } from "@/components/base/date-picker"
import FormFooter from "@/components/base/form-footer"
import FormGroup from "@/components/base/form-group"
import FormGroupContainer from "@/components/base/form-group-container"
import { Input, Select, Textarea } from "@/components/ui"
import Box from "@/components/ui/box"
import BoxContainer from "@/components/ui/box-container"
import { Skeleton } from "@/components/ui/skeleton"
import TableGrid from "@/components/ui/table-grid"
import { DEFAULT_PAGE_SIZE_200 } from "@/config/constants"
import { routes } from "@/config/routes"
import {
  useEmployeeById,
  useEmployeeList,
  useEmployeeOptions,
} from "@/hooks/hrms/employee/use-employee"
import { useEmploymentTypeList } from "@/hooks/hrms/employee/use-employment-type"
import {
  useSalaryStructureById,
  useSalaryStructureList,
} from "@/hooks/hrms/payroll-configuration/use-salary-structures"
import {
  useCreateEmployeeContract,
  useEmployeeContractById,
  useUpdateEmployeeContract,
} from "@/hooks/hrms/payroll/use-employee-contract"
import { useSelectOptions } from "@/hooks/use-select-options"
import { Employee } from "@/types/hrms/employee/employee.types"
import { EmploymentType } from "@/types/hrms/employee/employment-types.types"
import { SalaryStructure } from "@/types/hrms/payroll-configuration/salary-structure.types"
import { EmployeeContract } from "@/types/hrms/payroll/employee-contract.types"
import { formatDate } from "@/utils/format-date"
import {
  EmployeeContractFormInput,
  employeeContractFormSchema,
} from "@/validators/hrms/employee-contract.schema"

type Mode = "create" | "edit" | "view"

interface CreateEditEmployeeContractFormProps {
  mode?: Mode
}

export default function CreateEditEmployeeContractForm({
  mode = "create",
}: CreateEditEmployeeContractFormProps) {
  const t = useTranslations("form")
  const router = useRouter()
  const params = useParams()
  const contractId = params?.contractId as string

  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number>()

  const [selectedStructureId, setSelectedStructureId] = useState<number>()
  const setValueRef = useRef<any>(null)
  const { data: selectedEmployee, isLoading: isEmployeeLoading } =
    useEmployeeById(selectedEmployeeId as number)
  const { data: employmentTypeList } = useEmploymentTypeList()
  const { data: salaryStructureList } = useSalaryStructureList()
  const { data: employeeContract, isLoading: isEmployeeContractLoading } =
    useEmployeeContractById(Number(contractId))

  const { mutate: createContract, isPending: isCreatePending } =
    useCreateEmployeeContract()
  const { mutate: updateContract, isPending: isUpdatePending } =
    useUpdateEmployeeContract()

  const { data: selectedStructure, isLoading: isStructureLoading } =
    useSalaryStructureById(selectedStructureId as number)

  const isLoadingForm = isCreatePending || isUpdatePending
  const { employeeOptions, isLoading: employeeListLoading } =
    useEmployeeOptions()
  const employmentTypeOptions = useSelectOptions<EmploymentType>(
    employmentTypeList?.data,
    "employmentTypeName"
  )
  const salaryStructureOptions = useSelectOptions<SalaryStructure>(
    salaryStructureList?.data,
    "salaryStructureName"
  )

  const defaultValues = {
    employeeContractName: "",
    employeeId: 0,
    salaryStructureId: 0,
    startDate: "",
    endDate: null,
    employmentTypeId: 0,
    companyName: "",
    description: "",
    baseSalary: 0,
    grossSalary: 0,
    netSalary: 0,
    companyId: 0,
  }

  const calculateSalaryFromStructure = (structure: SalaryStructure) => {
    let baseSalary = 0
    let grossSalary = 0
    let totalDeductions = 0

    // Find basic salary from rules with basic category
    const basicRule = structure.salaryRules?.find(
      (rule) =>
        rule.salaryCategory?.salaryCategoryName.toLowerCase() === "basic"
    )

    if (!basicRule) {
      toast.error(<Text as="b">{t("form-basic-salary-rule-required")}</Text>)
      return { baseSalary: 0, grossSalary: 0, netSalary: 0 }
    }

    // Set basic salary
    if (basicRule.computationType === "FixedAmount") {
      baseSalary = basicRule.amount || 0
    } else if (basicRule.computationType === "Formula" && basicRule.formula) {
      // Handle formula for basic salary if needed
      baseSalary = parseFloat(basicRule.formula) || 0
    }

    // Initialize gross with basic salary
    grossSalary = baseSalary

    // Calculate additions (credits) and deductions (debits)
    structure.salaryRules?.forEach((rule) => {
      if (rule.salaryCategory?.salaryCategoryName.toLowerCase() !== "basic") {
        const amount =
          rule.computationType === "FixedAmount"
            ? rule.amount || 0
            : rule.formula
              ? calculateFormulaAmount(rule.formula, baseSalary)
              : 0

        if (rule.salaryCategory?.transactionType === "Credit") {
          grossSalary += amount
        } else if (rule.salaryCategory?.transactionType === "Debit") {
          totalDeductions += amount
        }
      }
    })

    const netSalary = grossSalary - totalDeductions

    return { baseSalary, grossSalary, netSalary }
  }

  // Helper function to calculate formula-based amounts
  const calculateFormulaAmount = (
    formula: string,
    baseSalary: number
  ): number => {
    try {
      const normalizedFormula = formula.toLowerCase()
      if (normalizedFormula.includes("basesalary")) {
        const multiplier = parseFloat(
          normalizedFormula.split("*")[1]?.trim() || "0"
        )
        return baseSalary * multiplier
      }
      return 0
    } catch (error) {
      console.error("Error calculating formula:", error)
      return 0
    }
  }

  const onSubmit: SubmitHandler<EmployeeContract> = async (data) => {
    if (contractId) {
      updateContract({ ...data, id: Number(employeeContract?.id) })
    } else {
      createContract({
        ...data,
        companyId: selectedEmployee?.workInformation?.workingAddress?.companyId,
      })
    }
  }

  const salaryRuleColumns = [
    {
      id: "id",
      header: "ID",
      accessorKey: "id",
      cell: ({ row }: { row: any }) => row.index + 1,
    },
    {
      id: "ruleName",
      header: t("form-rule-name"),
      accessorKey: "salaryRuleName",
    },
    {
      id: "computationType",
      header: t("form-computation-type"),
      accessorKey: "computationType",
    },
    {
      id: "amount",
      header: t("form-amount-or-formula"),
      accessorKey: "amount",
      cell: ({ row }: { row: any }) => {
        const rule = row.original
        return rule.computationType === "FixedAmount"
          ? rule.amount
          : rule.formula
      },
    },
  ]

  useEffect(() => {
    if (selectedStructure && setValueRef.current) {
      const { baseSalary, grossSalary, netSalary } =
        calculateSalaryFromStructure(selectedStructure)
      setValueRef.current("baseSalary", baseSalary)
      setValueRef.current("grossSalary", grossSalary)
      setValueRef.current("netSalary", netSalary)
    }
  }, [selectedStructure])

  useEffect(() => {
    if (employeeContract?.salaryStructure) {
      setSelectedStructureId(employeeContract?.salaryStructure?.id)
    }
  }, [employeeContract])

  useEffect(() => {
    if (selectedEmployee && setValueRef.current) {
      const hasWorkInfo = selectedEmployee.workInformation
      const hasCompany =
        selectedEmployee.workInformation?.workingAddress?.companyName

      if (!hasWorkInfo || !hasCompany) {
        console.log("no work info or company")
      } else {
        setValueRef.current("companyName", hasCompany)
      }
    }
  }, [selectedEmployee])

  useEffect(() => {
    if (
      selectedEmployee?.id &&
      !selectedEmployee?.workInformation?.workingAddress?.companyName
    ) {
      toast.error(t("form-employee-work-information-required"))
      return
    }
  }, [selectedEmployee])

  // Add state for calculated net salary

  // Add function to calculate net salary
  const calculateNetSalary = (salaryStructure: any, baseSalary: number) => {
    if (!salaryStructure?.salaryRules) return 0

    const totalCredits = salaryStructure.salaryRules
      .filter((rule: any) => rule.salaryCategory?.transactionType === "Credit")
      .reduce((total: number, rule: any) => {
        if (rule.computationType === "FixedAmount") {
          return total + Number(rule.amount || 0)
        } else if (rule.computationType === "Formula" && rule.formula) {
          return total + calculateFormulaAmount(rule.formula, baseSalary)
        }
        return total
      }, 0)

    const totalDebits = salaryStructure.salaryRules
      .filter((rule: any) => rule.salaryCategory?.transactionType === "Debit")
      .reduce((total: number, rule: any) => {
        if (rule.computationType === "FixedAmount") {
          return total + Number(rule.amount || 0)
        } else if (rule.computationType === "Formula" && rule.formula) {
          return total + calculateFormulaAmount(rule.formula, baseSalary)
        }
        return total
      }, 0)

    return totalCredits - totalDebits
  }

  // Modify useEffect for contract data
  useEffect(() => {
    if (employeeContract && setValueRef.current) {
      // Set form values
      setValueRef.current(
        "employeeContractName",
        employeeContract.employeeContractName
      )
      setValueRef.current(
        "salaryStructureId",
        employeeContract.salaryStructureId
      )
      setValueRef.current("startDate", employeeContract.startDate)
      setValueRef.current("endDate", employeeContract.endDate)
      setValueRef.current("baseSalary", employeeContract.baseSalary)
      setValueRef.current("grossSalary", employeeContract.grossSalary)
      setValueRef.current("employmentTypeId", employeeContract.employmentTypeId)
      setValueRef.current("companyName", employeeContract.companyName)
      setValueRef.current("companyId", employeeContract.companyId)
      setValueRef.current("description", employeeContract.description)

      // Calculate and set net salary
      const netSalary = calculateNetSalary(
        employeeContract.salaryStructure,
        employeeContract.baseSalary
      )

      setValueRef.current("netSalary", netSalary)
    }
  }, [employeeContract])

  const renderSkeleton = () => (
    <>
      <FormGroup title={t("form-contract-information")}>
        <ul className="grid grid-cols-2 gap-y-3">
          {Array.from({ length: 8 }).map((_, index) => (
            <li key={index} className="flex flex-col gap-2 pt-4">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-5 w-48" />
            </li>
          ))}
        </ul>
      </FormGroup>

      <FormGroup
        title={t("form-salary-information")}
        className="pt-4 @2xl:pt-7 @3xl:pt-9"
        childrenContainerClassName="@2xl:grid-cols-1 @4xl:col-span-12 pt-4">
        <div className="space-y-4">
          <div className="grid grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="flex flex-col gap-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
          <div className="space-y-3">
            <Skeleton className="h-6 w-48" />
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className="h-12 w-full" />
            ))}
          </div>
        </div>
      </FormGroup>
    </>
  )

  if (isEmployeeContractLoading) {
    return (
      <Box className="flex grow flex-col justify-between pt-7 @container">
        <BoxContainer className="pt-4">
          <div className="flex flex-col gap-3">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-6 w-48" />
          </div>
          {renderSkeleton()}
        </BoxContainer>
      </Box>
    )
  }

  return (
    <Box className="@container">
      <Form<EmployeeContractFormInput>
        validationSchema={employeeContractFormSchema}
        onSubmit={onSubmit}
        className="flex grow flex-col justify-between pt-7 @container"
        useFormProps={{
          defaultValues: contractId ? employeeContract : defaultValues,
          values: employeeContract,
        }}>
        {({ register, control, setValue, formState: { errors } }) => {
          setValueRef.current = setValue
          const isDisabled = mode === "view"

          return (
            <>
              <FormGroupContainer>
                <FormGroup title={t("form-contract-information")}>
                  <Input
                    {...register("employeeContractName")}
                    label={t("form-contract-name")}
                    placeholder={t("form-enter-contract-name")}
                    error={
                      errors.employeeContractName?.message
                        ? t(errors.employeeContractName?.message)
                        : ""
                    }
                  />

                  <Controller
                    name="employeeId"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Select
                        label={t("form-employee")}
                        options={employeeOptions}
                        value={employeeOptions.find(
                          (option) => option.value === value
                        )}
                        onChange={(option: any) => {
                          onChange(option?.value)
                          setSelectedEmployeeId(option?.value)
                          setValue("companyName", "")
                        }}
                        error={
                          errors.employeeId?.message
                            ? t(errors.employeeId?.message)
                            : ""
                        }
                        isLoading={employeeListLoading}
                        isDisabled={isDisabled}
                      />
                    )}
                  />

                  {/* Start Date */}
                  <Controller
                    name="startDate"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <div className="relative">
                        <DatePicker
                          inputProps={{
                            label: t("form-contract-start-date"),
                            clearable: false,
                          }}
                          placeholderText={t("form-select-date-from")}
                          value={value ? new Date(value) : null}
                          onChange={(date: any) => {
                            const formattedDate = date
                              ? dayjs(date).format("YYYY-MM-DD")
                              : null
                            onChange(formattedDate)
                          }}
                          popperPlacement="bottom-start"
                          disabled={isDisabled}
                        />
                        {errors?.startDate?.message && (
                          <p className="mt-1 text-xs text-red-500">
                            {t(errors?.startDate?.message)}
                          </p>
                        )}
                      </div>
                    )}
                  />

                  {/* End Date */}
                  <Controller
                    name="endDate"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <div className="relative">
                        <DatePicker
                          inputProps={{
                            label: t("form-contract-end-date"),
                            clearable: false,
                          }}
                          placeholderText={t("form-select-date-to")}
                          value={value ? new Date(value) : null}
                          onChange={(date: any) => {
                            const formattedDate = date
                              ? dayjs(date).format("YYYY-MM-DD")
                              : null
                            onChange(formattedDate)
                          }}
                          minDate={
                            control._formValues?.startDate
                              ? new Date(control._formValues?.startDate)
                              : undefined
                          }
                          popperPlacement="bottom-start"
                          disabled={isDisabled}
                        />
                        {errors.endDate?.message && (
                          <p className="mt-1 text-xs text-red-500">
                            {t(errors.endDate?.message)}
                          </p>
                        )}
                      </div>
                    )}
                  />

                  <Controller
                    name="employmentTypeId"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Select
                        placeholder={t("form-select-employment-type")}
                        label={t("form-employment-type")}
                        options={employmentTypeOptions}
                        value={employmentTypeOptions.find(
                          (option) => option.value === value
                        )}
                        onChange={(option: any) => onChange(option?.value)}
                        error={
                          errors.employmentTypeId?.message
                            ? t(errors.employmentTypeId?.message)
                            : ""
                        }
                        isDisabled={isDisabled}
                      />
                    )}
                  />

                  <Input
                    label={t("form-company-name")}
                    {...register("companyName")}
                    value={
                      selectedEmployee?.workInformation?.workingAddress
                        ?.companyName || ""
                    }
                    disabled={isDisabled}
                    error={
                      errors.companyName?.message
                        ? t(errors.companyName?.message)
                        : ""
                    }
                  />

                  <Textarea
                    label={t("form-description")}
                    placeholder={t("form-enter-description")}
                    {...register("description")}
                    error={
                      errors.description?.message
                        ? t(errors.description?.message)
                        : ""
                    }
                    disabled={isDisabled}
                  />
                </FormGroup>

                <FormGroup
                  title={t("form-salary-information")}
                  className="w-full pt-7"
                  childrenContainerClassName="@2xl:grid-cols-1 @4xl:col-span-12">
                  <div className="flex w-full flex-col gap-4">
                    <div className="grid w-full grid-cols-4 gap-4">
                      <Controller
                        name="salaryStructureId"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <Select
                            placeholder={t("form-select-salary-structure")}
                            label={t("form-salary-structure")}
                            options={salaryStructureOptions}
                            value={salaryStructureOptions.find(
                              (option) => option.value === value
                            )}
                            onChange={(option: any) => {
                              onChange(option?.value)
                              setSelectedStructureId(option?.value)
                              setValue("baseSalary", 0)
                              setValue("grossSalary", 0)
                            }}
                            error={
                              errors.salaryStructureId?.message
                                ? t(errors.salaryStructureId?.message)
                                : ""
                            }
                            isLoading={isStructureLoading}
                            isDisabled={isDisabled}
                            className="w-full"
                          />
                        )}
                      />
                      <Input
                        type="number"
                        label={t("form-basic-salary")}
                        {...register("baseSalary", { valueAsNumber: true })}
                        error={
                          errors.baseSalary?.message
                            ? t(errors.baseSalary?.message)
                            : ""
                        }
                        disabled={isDisabled || true}
                        className="w-full"
                      />

                      <Input
                        type="number"
                        label={t("form-gross-salary")}
                        {...register("grossSalary", { valueAsNumber: true })}
                        error={
                          errors.grossSalary?.message
                            ? t(errors.grossSalary?.message)
                            : ""
                        }
                        disabled={isDisabled}
                        className="w-full"
                      />

                      <Input
                        type="number"
                        label={t("form-net-salary")}
                        {...register("netSalary", { valueAsNumber: true })}
                        error={
                          errors.netSalary?.message
                            ? t(errors.netSalary?.message)
                            : ""
                        }
                        disabled={isDisabled}
                        className="w-full"
                      />
                    </div>

                    {selectedStructure?.salaryRules &&
                    selectedStructure?.salaryRules?.length > 0 ? (
                      <div className="w-full">
                        <Title as="h6" className="mb-4 font-medium">
                          {t("form-applied-salary-rules")}
                        </Title>
                        <TableGrid
                          data={
                            selectedStructure?.salaryRules ||
                            employeeContract?.salaryStructure?.salaryRules ||
                            []
                          }
                          columns={salaryRuleColumns}
                          gridTemplateColumns="50px 1.5fr 1fr 1fr 1fr"
                          className="w-full rounded-lg border"
                        />
                      </div>
                    ) : (
                      <Text>{t("form-no-salary-rules-applied")}</Text>
                    )}
                  </div>
                </FormGroup>
              </FormGroupContainer>

              {mode !== "view" && (
                <FormFooter
                  isLoading={isLoadingForm || isEmployeeLoading}
                  submitBtnText={
                    mode === "edit"
                      ? t("form-update-contract")
                      : t("form-create-contract")
                  }
                  altBtnText={t("form-back")}
                  handleAltBtn={() => router.push(routes.hr.employeeContracts)}
                />
              )}
            </>
          )
        }}
      </Form>
    </Box>
  )
}
