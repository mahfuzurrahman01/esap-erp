"use client"

import ExportButton from "@/components/ui/export-button"

const headers = [
  "Badge Id",
  "Employee Name",
  "Check In",
  "Check Out",
  "Check In Mode",
  "Check Out Mode",
  "Worked Hours",
].join(", ")

const transformData = (data: any) =>
  data.map((item: any) => ({
    badgeId: item.badgeId,
    employeeName: item.firstName + " " + item.lastName,
    checkIn: item.checkIn,
    checkOut: item.checkOut,
    checkInMode: item.checkInMode,
    checkOutMode: item.checkOutMode,
    workedHours: item.workedHours,
  }))

export default function ExportAttendanceReport(data: any) {
  const leadsData = data.data || []
  //console.log('leadsData',leadsData)
  return (
    <ExportButton
      data={transformData(leadsData)}
      fileName="employee-data"
      header={headers}
    />
  )
}
