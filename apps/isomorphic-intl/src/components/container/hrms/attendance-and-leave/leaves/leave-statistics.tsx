import Spinner from "@/components/base/spinner"
import { useOffDayList } from "@/hooks/hrms/attendance-and-leave/use-off-day"
import { LeaveType } from "@/types/hrms/attendance-and-leave/leave-type.types"

import LeaveStatisticCard from "./leave-stat-card"

type LeaveStats = {
  id?: number
  offDayName: string
  leaveTypeId: number
  leaveType?: {
    id?: number
    leaveTypeName: string
    description?: string | null
  }
  dateFrom: string
  dateTo: string
  description?: string | null
}

const LeaveStatistics = () => {
  const { data: offDayList, isLoading: isOffDayListLoading } = useOffDayList()
  //console.log(offDayList)
  if (isOffDayListLoading)
    return (
      <div className="flex w-full items-center justify-center">
        <Spinner />
      </div>
    )
  // Group leaves by type
  const groupedLeaves =
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
      {} as Record<
        number,
        { type: LeaveStats["leaveType"]; leaves: LeaveStats[] }
      >
    ) || {}
  //console.log("groupedLeaves", groupedLeaves)
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Object.values(groupedLeaves).map((groupedLeave) => (
        <LeaveStatisticCard
          key={groupedLeave?.type?.id}
          type={groupedLeave && (groupedLeave?.type as LeaveType)}
          leaves={groupedLeave?.leaves}
        />
      ))}
    </div>
  )
}

export default LeaveStatistics
