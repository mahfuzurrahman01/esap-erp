import YearCalendar from "@/components/base/year-calendar"
import { LeaveStats } from "@/types/hrms/attendance-and-leave/common.types"

type Props = {
  leaveData: LeaveStats[]
}

const EventCalender = ({ leaveData }: Props) => {
  //console.log("leaveData", leaveData)
  // TODO: Map the leave data to the calendar , need further modification of the calendar
  return <YearCalendar leaveData={leaveData} />
}

export default EventCalender
