"use client"

import ExportButton from "@/components/ui/export-button"

const headers = [
  "Employee Name",
  "Department",
  "Leave Type",
  "Start Date",
  "End Date",
  "Duration",
  "Status",
  "Description",
].join(", ")

const transformData = (data: any) =>
  data.map((item: any) => ({
    EmployeeName: `${item.firstName} ${item.lastName}`,
    Department: item.department,
    LeaveType: item.leaveType,
    StartDate: item.startDate,
    EndDate: item.endDate,
    Duration: item.duration,
    Status: item.status,
    Description: item.description,
  }))

export default function ExportLeaveRequestReport(data: any) {
  const leadsData = data.data || []
  //console.log('leadsData',leadsData)
  return (
    <ExportButton
      data={transformData(leadsData)}
      fileName="leave-request-data"
      header={headers}
    />
  )
}
