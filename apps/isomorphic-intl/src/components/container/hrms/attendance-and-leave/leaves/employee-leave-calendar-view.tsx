"use client"

import { ChangeEvent, useMemo, useState } from "react"

import { useTranslations } from "next-intl"
import { Checkbox } from "rizzui"

import Spinner from "@/components/base/spinner"
import EventCalender from "@/components/container/hrms/event-calendar"
import { useOffDayList } from "@/hooks/hrms/attendance-and-leave/use-off-day"
import { LeaveType } from "@/types/hrms/attendance-and-leave/leave-type.types"

type LeaveStats = {
  id?: number
  offDayName: string
  leaveTypeId: number
  dateFrom: string
  dateTo: string
  description?: string | null
  leaveType?: LeaveType
}

const EmployeeLeaveCalendarView = () => {
  const tCommon = useTranslations("common")

  const { data: offDayList, isLoading: isOffDayListLoading } = useOffDayList()

  // Group leaves by type
  const groupedLeaves = useMemo(() => {
    return (
      offDayList?.data.reduce(
        (acc, leave) => {
          const typeId = leave.leaveType?.id
          if (typeId && leave.leaveType) {
            if (!acc[typeId]) {
              acc[typeId] = {
                type: leave.leaveType,
                leaves: [],
              }
            }
            acc[typeId].leaves.push(leave)
          }
          return acc
        },
        {} as Record<number, { type: LeaveType; leaves: LeaveStats[] }>
      ) || {}
    )
  }, [offDayList?.data])

  // Get unique leave types for checkboxes from grouped leaves
  const leaveTypes = useMemo(() => {
    return Object.values(groupedLeaves).map((group) => ({
      id: group.type.id,
      name: group.type.leaveTypeName,
    }))
  }, [groupedLeaves])

  const [selectedLeaveTypes, setSelectedLeaveTypes] = useState<number[]>([])

  // Filter leave data based on selected types from grouped leaves
  const filteredLeaveData = useMemo(() => {
    if (selectedLeaveTypes.length === 0) {
      // Show all leaves from grouped data when no filter is selected
      return Object.values(groupedLeaves).flatMap((group) => group.leaves)
    }

    // Filter and flatten the leaves from selected types
    return selectedLeaveTypes.flatMap(
      (typeId) => groupedLeaves[typeId]?.leaves || []
    )
  }, [groupedLeaves, selectedLeaveTypes])

  const handleChangeLeaveType = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    const leaveTypeId = parseInt(name)

    if (checked) {
      setSelectedLeaveTypes((prev) => [...prev, leaveTypeId])
    } else {
      setSelectedLeaveTypes((prev) => prev.filter((id) => id !== leaveTypeId))
    }
  }

  if (isOffDayListLoading)
    return (
      <div className="flex w-full items-center justify-center">
        <Spinner />
      </div>
    )
  //console.log(filteredLeaveData)
  return (
    <div className="flex flex-col-reverse gap-5 @xl:flex-row">
      <div className="flex-1">
        <EventCalender leaveData={filteredLeaveData} />
      </div>
      <div className="mt-16 flex flex-col gap-5 @xl:gap-6">
        <div className="card-shadow rounded-2xl">
          <div className="5 divider-color typography-primary border-b px-5 py-2 text-lg font-semibold">
            {tCommon("text-filters")}
          </div>
          <div className="min-w-[15rem] p-5">
            <div className="flex flex-col flex-wrap gap-4">
              {leaveTypes.map((type) => (
                <Checkbox
                  className="p-2"
                  key={type.id}
                  label={type.name}
                  name={type.id?.toString() || ""}
                  onChange={handleChangeLeaveType}
                  checked={selectedLeaveTypes.includes(type.id || 0)}
                />
              ))}
            </div>
          </div>
        </div>
        {/* <EventList events={dummyEventData} /> */}
      </div>
    </div>
  )
}

export default EmployeeLeaveCalendarView
