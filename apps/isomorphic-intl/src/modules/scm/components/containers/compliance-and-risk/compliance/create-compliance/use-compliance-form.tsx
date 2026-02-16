"use client"

import { useMemo } from "react"

import { useEmployeeList } from "@/hooks/hrms/employee/use-employee"
import { useSelectOptions } from "@/hooks/use-select-options"
import { Employee } from "@/types/hrms/employee/employee.types"

import { complianceStatus } from "./form-utils"

export const useComplianceData = () => {
  const { data: employeeData, isLoading: isEmployeeLoading } = useEmployeeList({
    pageSize: 1000,
  })

  const assignedToOptions = useSelectOptions<Employee>(
    employeeData?.data,
    "firstName"
  )

  const complianceStatusOptions = useMemo(() => {
    return complianceStatus || []
  }, [])

  return {
    assignedToOptions,
    complianceStatusOptions,
    isLoading: isEmployeeLoading,
  }
}
