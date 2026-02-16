import { useEffect, useState } from "react"

import { SubmitHandler } from "react-hook-form"

import { useDepartmentList } from "@/hooks/hrms/employee/use-department"
import { useEmployeeList } from "@/hooks/hrms/employee/use-employee"
import { COUNTRIES } from "@/utils/constants"
import { EmployeeBasicInformationPostData } from "@/validators/hrms/employee-basic-information.schema"

const jobPositionsData: any = {
  pageIndex: 1,
  pageSize: 10,
  count: 5,
  data: [
    {
      id: 1,
      jobPositionName: "Software Engineer",
      createdDate: "2024-10-06T16:01:47.5559205",
      updatedDate: "2024-10-06T16:01:47.5559232",
    },
    {
      id: 2,
      jobPositionName: "HR Manager",
      createdDate: "2024-10-06T16:01:47.5559205",
      updatedDate: "2024-10-06T16:01:47.5559232",
    },
    {
      id: 3,
      jobPositionName: "Full Stack Developer",
      createdDate: "2024-10-06T16:01:47.5559205",
      updatedDate: "2024-10-06T16:01:47.5559232",
    },
    {
      id: 4,
      jobPositionName: "UI/UX Designer",
      createdDate: "2024-10-06T16:01:47.5559205",
      updatedDate: "2024-10-06T16:01:47.5559232",
    },
    {
      id: 5,
      jobPositionName: "Product Manager",
      createdDate: "2024-10-06T16:01:47.5559205",
      updatedDate: "2024-10-06T16:01:47.5559232",
    },
  ],
}

type Option = {
  label: string
  value: number
}

export const useBasicInformationForm = () => {
  const [departmentOptions, setDepartmentOptions] = useState<Option[]>([])
  const [jobPositionOptions, setJobPositionOptions] = useState<Option[]>([])
  const [employeeOptions, setEmployeeOptions] = useState<Option[]>([])

  const { data: employeeList, isLoading: employeeListLoading } =
    useEmployeeList({
      search: "",
      pageIndex: 1,
      pageSize: 50,
    })

  const { data: departmentsData, isLoading: departmentsLoading } =
    useDepartmentList({
      search: "",
      pageIndex: 1,
      pageSize: 50,
    })

  const onSubmit: SubmitHandler<EmployeeBasicInformationPostData> = async (
    data
  ) => {
    console.log("data", data)
  }

  useEffect(() => {
    if (departmentsData && jobPositionsData && employeeList) {
      const _departmentOptions: Option[] = departmentsData.data.map(
        (department: any) => ({
          label: department.departmentName,
          value: Number(department.id),
        })
      )

      const _jobPositionOptions: Option[] = jobPositionsData.data.map(
        (jobPosition: any) => ({
          label: jobPosition.jobPositionName,
          value: Number(jobPosition.id),
        })
      )

      const _employeeOptions: Option[] = employeeList.data.map(
        (manager: any) => ({
          label: `${manager.firstName} ${manager.lastName}`,
          value: Number(manager.id),
        })
      )

      setEmployeeOptions(_employeeOptions)
      setJobPositionOptions(_jobPositionOptions)
      setDepartmentOptions(_departmentOptions)
    }
  }, [departmentsData, employeeList])

  const loading = departmentsLoading || employeeListLoading // TODO: add loading

  return {
    loading,
    onSubmit,
    departmentOptions,
    jobPositionOptions,
    employeeOptions,
    countryOptions: COUNTRIES,
  }
}
