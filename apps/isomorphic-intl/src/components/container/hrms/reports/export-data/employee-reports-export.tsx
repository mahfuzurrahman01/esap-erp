"use client"

import React from "react"

import ExportButton from "@/components/ui/export-button"

const headers = [
  "Badge Id",
  "Employee Name",
  "Department",
  "Job Position",
  "Email",
  "Country",
  "Coach",
  "Manager",
].join(", ")

const transformData = (data: any) =>
  data.map((item: any) => ({
    badgeId: item.badgeId,
    employeeName: item.firstName + " " + item.lastName,
    department: item.department,
    jobPosition: item.jobPosition,
    email: item.email,
    country: item.country,
    coach: item.coach,
    manager: item.manager,
  }))

export default function ExportEmployeeReport(data: any) {
  const leadsData = data.data || []
  //console.log('leadsData',leadsData)
  return (
    <ExportButton
      data={transformData(leadsData)}
      fileName="attendance-data"
      header={headers}
    />
  )
}
