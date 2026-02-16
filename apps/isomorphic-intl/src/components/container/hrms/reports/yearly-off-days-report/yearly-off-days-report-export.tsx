"use client"

import ExportButton from "@/components/ui/export-button"

const headers = [
  "Off Day Name",
  "Total Days",
  "Leave Type",
  "Date From",
  "Date To",
  "Description",
].join(", ")

const transformData = (data: any) =>
  data.map((item: any) => ({
    OffDayName: item.offDayName,
    TotalDays: item.totalDays,
    LeaveType: item.leaveType,
    DateFrom: item.dateFrom,
    DateTo: item.dateTo,
    Description: item.description,
  }))

export default function ExportYearlyOffDaysReports(data: any) {
  const leadsData = data.data || []
  //console.log('leadsData',leadsData)
  return (
    <ExportButton
      data={transformData(leadsData)}
      fileName="yearly-off-days-report-data"
      header={headers}
    />
  )
}
