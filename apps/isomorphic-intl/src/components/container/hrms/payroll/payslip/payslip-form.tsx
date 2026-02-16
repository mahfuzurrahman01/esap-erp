"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

import { Form } from "@core/ui/form"
import { useTranslations } from "next-intl"
import { Controller, SubmitHandler } from "react-hook-form"
import toast from "react-hot-toast"
import { Text, Title } from "rizzui"

import FormGroup from "@/components/base/form-group"
import FormGroupContainer from "@/components/base/form-group-container"
import Spinner from "@/components/base/spinner"
import { Input, Select } from "@/components/ui"
import Box from "@/components/ui/box"
import TableGrid from "@/components/ui/table-grid"
import { DEFAULT_PAGE_SIZE_200 } from "@/config/constants"
import {
  useEmployeeById,
  useEmployeeList,
} from "@/hooks/hrms/employee/use-employee"
import { useEmployeeContractByEmployeeId } from "@/hooks/hrms/payroll/use-employee-contract"
import {
  useCreatePayslip,
  usePayslipById,
  useUpdatePayslip,
} from "@/hooks/hrms/payroll/use-payslip"
import { useSelectOptions } from "@/hooks/use-select-options"
import { Employee } from "@/types/hrms/employee/employee.types"
import { Payslip } from "@/types/hrms/payroll/payslip.types"
import { payslipSchema } from "@/validators/hrms/payslip.schema"

import PayslipFormStickyActions from "./payslip-form-sticky-action"

const defaultValues: Payslip = {
  employeeId: 0,
  month: "",
  year: new Date().getFullYear(),
  status: "Draft",
  baseSalary: 0,
  grossSalary: 0,
  totalDeductions: 0,
  netPayableSalary: 0,
}

const months = [
  { value: "January", label: "January" },
  { value: "February", label: "February" },
  { value: "March", label: "March" },
  { value: "April", label: "April" },
  { value: "May", label: "May" },
  { value: "June", label: "June" },
  { value: "July", label: "July" },
  { value: "August", label: "August" },
  { value: "September", label: "September" },
  { value: "October", label: "October" },
  { value: "November", label: "November" },
  { value: "December", label: "December" },
]

const salaryRuleColumns = [
  {
    id: "id",
    header: "ID",
    accessorKey: "id",
    cell: ({ row }: { row: any }) => row.index + 1,
  },
  {
    id: "ruleName",
    header: "Rule Name",
    accessorKey: "salaryRuleName",
  },
  {
    id: "salaryCategoryName",
    header: "Category",
    accessorKey: "salaryCategory.salaryCategoryName",
    cell: ({ row }: { row: any }) =>
      row.original.salaryCategory.salaryCategoryName,
  },
  {
    id: "transactionType",
    header: "Type",
    accessorKey: "salaryCategory.transactionType",
    cell: ({ row }: { row: any }) =>
      row.original.salaryCategory.transactionType,
  },
  {
    id: "computationType",
    header: "Computation Type",
    accessorKey: "computationType",
    cell: ({ row }: { row: any }) => row.original.computationType,
  },
  {
    id: "amount",
    header: "Amount/Formula",
    accessorKey: "amount",
    cell: ({ row }: { row: any }) => {
      const rule = row.original
      return rule.computationType === "FixedAmount" ? rule.amount : rule.formula
    },
  },
]

interface PayslipFormProps {
  mode?: "create" | "edit" | "view"
}

export default function PayslipForm({ mode }: PayslipFormProps) {
  const t = useTranslations("form")
  const { payslipId } = useParams()
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number>()
  const [isCalculating, setIsCalculating] = useState(false)
  const [calculatedDeductions, setCalculatedDeductions] = useState(0)
  const [calculatedNetSalary, setCalculatedNetSalary] = useState(0)

  const { data: employeeList, isLoading: isEmployeeListLoading } =
    useEmployeeList({
      pageSize: DEFAULT_PAGE_SIZE_200,
    })
  const { data: selectedEmployee, isLoading: isSelectedEmployeeLoading } =
    useEmployeeById(selectedEmployeeId as number)
  const {
    data: employeeContract,
    isSuccess: isEmployeeContractSuccess,
    isLoading: isEmployeeContractLoading,
  } = useEmployeeContractByEmployeeId(selectedEmployeeId as number)
  const { data: payslipData, isLoading: isPayslipLoading } = usePayslipById(
    Number(payslipId)
  )
  //console.log(payslipData)
  const { mutate: createPayslip, isPending: isCreatePending } =
    useCreatePayslip()
  const { mutate: updatePayslip, isPending: isUpdatePending } =
    useUpdatePayslip()

  const employeeOptions = useSelectOptions<Employee>(
    employeeList?.data,
    "firstName"
  )

  useEffect(() => {
    if (payslipData) {
      setSelectedEmployeeId(payslipData?.employeeContract?.employee?.id)
    }
  }, [payslipData])

  useEffect(() => {
    if (selectedEmployee?.id && !employeeContract?.id) {
      toast.error(
        <Text>
          Please create contract for{" "}
          <Text as="b">
            {selectedEmployee?.firstName} {selectedEmployee?.lastName}
          </Text>
        </Text>
      )
    }
  }, [isEmployeeContractSuccess])

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

  const calculateTotalDeductions = () => {
    if (!employeeContract?.salaryStructure?.salaryRules) return 0

    const debitRules = employeeContract.salaryStructure.salaryRules.filter(
      (rule) => rule.salaryCategory?.transactionType === "Debit"
    )

    return debitRules.reduce((total, rule) => {
      if (rule.computationType === "FixedAmount") {
        return total + Number(rule.amount || 0)
      } else if (rule.computationType === "Formula" && rule.formula) {
        return (
          total +
          calculateFormulaAmount(rule.formula, employeeContract.baseSalary)
        )
      }
      return total
    }, 0)
  }

  const calculateNetSalary = () => {
    if (!employeeContract?.grossSalary) return 0
    const totalDeductions = calculateTotalDeductions()
    return Number(employeeContract.grossSalary) - totalDeductions
  }

  useEffect(() => {
    if (employeeContract?.id) {
      setIsCalculating(true)
      const deductions = calculateTotalDeductions()
      const netSalary = calculateNetSalary()

      setCalculatedDeductions(deductions)
      setCalculatedNetSalary(netSalary)
      setIsCalculating(false)
    }
  }, [employeeContract?.id, employeeContract?.salaryStructure])

  const onSubmit: SubmitHandler<Payslip> = async (data) => {
    if (!employeeContract?.id) {
      toast.error(
        <Text>
          Please create contract for{" "}
          <Text as="b">
            {selectedEmployee?.firstName} {selectedEmployee?.lastName}
          </Text>
        </Text>
      )
      return
    }

    if (payslipId) {
      updatePayslip({
        ...data,
        id: Number(payslipId),
        referenceId: payslipData?.referenceId,
        serialNumber: payslipData?.serialNumber,
      })
    } else {
      const newData = {
        ...data,
        baseSalary: employeeContract?.baseSalary,
        grossSalary: employeeContract?.grossSalary,
        totalDeductions: calculateTotalDeductions(),
        netPayableSalary: calculateNetSalary(),
        employeeContractId: Number(employeeContract?.id),
        firstName: selectedEmployee?.firstName,
        lastName: selectedEmployee?.lastName,
        badgeId: selectedEmployee?.badgeId,
      }
      createPayslip(newData)
    }
  }

  const getDefaultValues = () => {
    if (payslipData) {
      return {
        ...defaultValues,
        ...payslipData,
        employeeId: payslipData?.employeeContract?.employee?.id,
        month: payslipData?.month,
        year: payslipData?.year,
        status: payslipData?.status,
      }
    }
    return defaultValues
  }

  const isViewMode = mode === "view"
  const isEditMode = mode === "edit"

  if (payslipId && isPayslipLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner />
      </div>
    )
  }

  return (
    <Box>
      <Form<Payslip>
        validationSchema={payslipSchema}
        onSubmit={onSubmit}
        className="flex grow flex-col justify-between pt-7 @container @2xl:pt-9 @3xl:pt-11"
        useFormProps={{
          defaultValues: getDefaultValues(),
        }}>
        {({ register, control, formState: { errors } }) => {
          //console.log(errors)
          return (
            <>
              <FormGroupContainer>
                {isSelectedEmployeeLoading || isEmployeeContractLoading ? (
                  <div className="flex h-full items-center justify-center">
                    <Spinner />
                  </div>
                ) : (
                  <FormGroup title={t("form-employee-information")}>
                    <Controller
                      name="employeeId"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Select
                          label={t("form-employee")}
                          placeholder={t("form-select-employee")}
                          options={employeeOptions}
                          value={employeeOptions.find(
                            (option) =>
                              option.value === value ||
                              option.value === selectedEmployeeId
                          )}
                          isLoading={isEmployeeListLoading}
                          isDisabled={isViewMode || isEditMode}
                          onChange={(option: any) => {
                            onChange(option?.value)
                            setSelectedEmployeeId(option?.value)
                          }}
                          error={
                            errors?.employeeId?.message &&
                            t(errors?.employeeId?.message)
                          }
                        />
                      )}
                    />

                    <Input
                      label={t("form-department")}
                      value={selectedEmployee?.department?.departmentName || ""}
                      disabled
                    />

                    <Input
                      label={t("form-job-position")}
                      value={
                        selectedEmployee?.jobPosition?.jobPositionName || ""
                      }
                      disabled
                    />

                    <Input
                      label={t("form-manager")}
                      value={`${selectedEmployee?.manager?.firstName || ""} ${
                        selectedEmployee?.manager?.lastName || ""
                      }`}
                      disabled
                    />
                    <Controller
                      name="month"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Select
                          label={t("form-month")}
                          placeholder={t("form-select-month")}
                          options={months}
                          value={months.find((month) => month.value === value)}
                          onChange={(option: any) => onChange(option?.value)}
                          isDisabled={isViewMode}
                          error={
                            errors?.month?.message && t(errors?.month?.message)
                          }
                        />
                      )}
                    />

                    <Input
                      type="number"
                      label={t("form-year")}
                      {...register("year", { valueAsNumber: true })}
                      error={errors?.year?.message && t(errors?.year?.message)}
                      disabled={isViewMode}
                    />
                  </FormGroup>
                )}

                {selectedEmployee?.id && employeeContract?.id && (
                  <>
                    {isCalculating ? (
                      <div className="flex h-[200px] items-center justify-center">
                        <div className="text-center">
                          <Spinner className="mx-auto mb-4" />
                          <Text className="text-sm text-gray-500">
                            {t("form-calculating-salary")}
                          </Text>
                        </div>
                      </div>
                    ) : (
                      <div className="pt-7">
                        <FormGroup title={t("form-contract-information")}>
                          <Input
                            label={t("form-contract")}
                            value={employeeContract.employeeContractName}
                            disabled
                          />

                          <Input
                            label={t("form-basic-salary")}
                            value={employeeContract.baseSalary}
                            disabled
                          />

                          <Input
                            label={t("form-gross-salary")}
                            value={employeeContract.grossSalary}
                            disabled
                          />

                          <Input
                            label={t("form-total-deductions")}
                            value={calculatedDeductions}
                            disabled
                          />

                          <Input
                            label={t("form-net-salary")}
                            value={calculatedNetSalary}
                            disabled
                            {...register("netPayableSalary", {
                              value: calculatedNetSalary,
                            })}
                          />
                        </FormGroup>

                        <FormGroup
                          title={t("form-salary-information")}
                          className="pt-7">
                          {employeeContract.salaryStructure?.salaryRules &&
                          employeeContract.salaryStructure.salaryRules.length >
                            0 ? (
                            <div className="col-span-2">
                              <Title as="h6" className="mb-4 font-medium">
                                {t("form-applied-salary-rules")}
                              </Title>
                              {employeeContract.salaryStructure?.salaryRules &&
                              employeeContract.salaryStructure.salaryRules
                                .length > 0 ? (
                                <TableGrid
                                  data={
                                    employeeContract.salaryStructure.salaryRules
                                  }
                                  columns={salaryRuleColumns}
                                  gridTemplateColumns="50px 1.5fr 1fr 1fr 1fr 1fr"
                                  className="rounded-lg border"
                                />
                              ) : (
                                <Text>{t("form-no-salary-rules-applied")}</Text>
                              )}
                            </div>
                          ) : (
                            <Text>{t("form-no-salary-rules-applied")}</Text>
                          )}
                        </FormGroup>
                      </div>
                    )}
                  </>
                )}
              </FormGroupContainer>

              {!isViewMode && (
                <PayslipFormStickyActions
                  isEditForm={isEditMode}
                  disabled={isEmployeeContractLoading || isCalculating}
                  isLoading={isCreatePending || isUpdatePending}
                />
              )}
            </>
          )
        }}
      </Form>
    </Box>
  )
}
