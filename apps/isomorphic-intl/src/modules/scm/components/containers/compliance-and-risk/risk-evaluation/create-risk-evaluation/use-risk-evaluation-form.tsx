"use client"

import { useEmployeeList } from "@/hooks/hrms/employee/use-employee"
import { useSelectOptions } from "@/hooks/use-select-options"
import { Employee } from "@/types/hrms/employee/employee.types"

export const useRiskEvaluationData = () => {
  const { data: employeeData, isLoading: isEmployeeLoading } = useEmployeeList({
    pageSize: 1000
  })

  const employeeOptions = useSelectOptions<Employee>(
    employeeData?.data,
    "firstName"
  )

  return {
    employeeOptions,
    isLoading: isEmployeeLoading,
  }
}
