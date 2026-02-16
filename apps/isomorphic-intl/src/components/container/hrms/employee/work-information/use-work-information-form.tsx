import { useEffect, useState } from "react"

import { SubmitHandler } from "react-hook-form"
import toast from "react-hot-toast"
import { Text } from "rizzui"

import { SelectOptionType } from "@/types/hrms/common.types"
import { COUNTRIES } from "@/utils/constants"
import { WorkInformationFormInputType } from "@/validators/hrms/work-information.schema"

const workingAddressData = {
  pageIndex: 1,
  pageSize: 10,
  count: 10,
  data: [
    {
      id: 1,
      addressName: "Main Office",
    },
    {
      id: 2,
      addressName: "IT",
    },
  ],
}

const workingScheduleData = {
  pageIndex: 1,
  pageSize: 10,
  count: 2,
  data: [
    { id: 1, scheduleName: "Standard 40 hours weekly" },
    { id: 2, scheduleName: "Flexible 35 hours weekly" },
  ],
}

const employeesData: any = {
  pageIndex: 1,
  pageSize: 10,
  count: 3,
  data: [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      createdDate: "2024-10-06T16:01:47.5559205",
      updatedDate: "2024-10-06T16:01:47.5559232",
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Doe",
      createdDate: "2024-10-06T16:01:47.5559205",
      updatedDate: "2024-10-06T16:01:47.5559232",
    },
    {
      id: 3,
      firstName: "Jim",
      lastName: "Beam",
      createdDate: "2024-10-06T16:01:47.5559205",
      updatedDate: "2024-10-06T16:01:47.5559232",
    },
  ],
}

export const useWorkInformationForm = () => {
  const [workAddressOptions, setWorkAddressOptions] = useState<
    SelectOptionType[]
  >([])
  const [workScheduleOptions, setWorkScheduleOptions] = useState<
    SelectOptionType[]
  >([])
  const [employeeOptions, setEmployeeOptions] = useState<SelectOptionType[]>([])

  const onSubmit: SubmitHandler<WorkInformationFormInputType> = (data) => {
    toast.success(<Text as="b">Work information successfully updated!</Text>)
    console.log(data)
  }

  useEffect(() => {
    const _workAddressOptions: SelectOptionType[] = workingAddressData.data.map(
      (address) => ({
        label: address.addressName,
        value: address.id,
      })
    )
    const _workScheduleOptions: SelectOptionType[] =
      workingScheduleData.data.map((schedule) => ({
        label: schedule.scheduleName,
        value: schedule.id,
      }))
    const _employeeOptions: SelectOptionType[] = employeesData.data.map(
      (employee: any) => ({
        label: `${employee.firstName} ${employee.lastName}`,
        value: employee.id,
      })
    )

    setEmployeeOptions(_employeeOptions)
    setWorkAddressOptions(_workAddressOptions)
    setWorkScheduleOptions(_workScheduleOptions)
  }, [])

  return {
    onSubmit,
    workAddressOptions,
    workScheduleOptions,
    employeeOptions,
    countryOptions: COUNTRIES,
  }
}
